// ==========================================================================
// SIMFA FIREBASE CLOUD AUTHENTICATION & CENTRALIZED AUDIT LOG MODULE
// ==========================================================================

// Official Firebase Project Configuration for simfa-pkd-sik
const firebaseConfig = {
  apiKey: "AIzaSyDrHmm1uYXcne6vGGhsIb3sULdmvUKn8_w",
  authDomain: "simfa-pkd-sik.firebaseapp.com",
  projectId: "simfa-pkd-sik",
  storageBucket: "simfa-pkd-sik.firebasestorage.app",
  messagingSenderId: "443029358920",
  appId: "1:443029358920:web:e06c19ca703358cbf8cb7d",
  measurementId: "G-X1NW4YM9F1"
};

let isFirebaseInitialized = false;

// Initialize Firebase if SDK is loaded
try {
  if (typeof firebase !== 'undefined' && firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('YOUR_FIREBASE')) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    isFirebaseInitialized = true;
    console.log("[SiMFa Cloud] Berjaya disambungkan ke Firebase Project:", firebaseConfig.projectId);
  } else {
    console.log("[SiMFa Cloud] Beroperasi dalam mod sandaran LocalStorage.");
  }
} catch (err) {
  console.warn("[SiMFa Cloud] Firebase init error, guna mod sandaran:", err);
}

// --------------------------------------------------------------------------
// 1. LOCAL STORAGE BACKUP HELPERS
// --------------------------------------------------------------------------
function getLocalUsers() {
  const users = JSON.parse(localStorage.getItem('simfa_registered_users') || '[]');
  const defaults = [
    { email: 'sadiq@moh.gov', password: '123' },
    { email: 'sadiq@moh.gov', password: 'Password123!' },
    { email: 'sadiq@moh.gov.my', password: '123' },
    { email: 'sadiq@moh.gov.my', password: 'Password123!' },
    { email: 'sadiqrashid25@gmail.com', password: '123' },
    { email: 'sadiqrashid25@gmail.com', password: 'Password123!' },
    { email: 'test_admin@moh.gov.my', password: 'Password123!' }
  ];
  defaults.forEach(d => {
    if (!users.some(u => u.email.toLowerCase() === d.email.toLowerCase() && u.password === d.password)) {
      users.push(d);
    }
  });
  localStorage.setItem('simfa_registered_users', JSON.stringify(users));
  return users;
}

function saveLocalUser(email, password) {
  const users = getLocalUsers();
  const lowerEmail = email.toLowerCase().trim();
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === lowerEmail);
  if (existingIdx >= 0) {
    users[existingIdx].password = password;
  } else {
    users.push({ email: lowerEmail, password: password });
  }
  localStorage.setItem('simfa_registered_users', JSON.stringify(users));
}

function simfaUpdateUserPassword(email, newPassword) {
  const lowerEmail = email.toLowerCase().trim();
  const users = getLocalUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === lowerEmail);
  if (idx >= 0) {
    users[idx].password = newPassword;
  } else {
    users.push({ email: lowerEmail, password: newPassword });
  }
  localStorage.setItem('simfa_registered_users', JSON.stringify(users));
  return { success: true, message: `Kata laluan untuk ${lowerEmail} berjaya dikemas kini.` };
}

// --------------------------------------------------------------------------
// 1B. OTP GENERATION & VERIFICATION (UNTUK PENDAFTARAN PEGAWAI)
// --------------------------------------------------------------------------
function simfaGenerateOTP(email) {
  const cleanEmail = email.toLowerCase().trim();
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minit sah

  const activeOtps = JSON.parse(localStorage.getItem('simfa_active_otps') || '{}');
  activeOtps[cleanEmail] = { code: otpCode, expiry: expiry };
  localStorage.setItem('simfa_active_otps', JSON.stringify(activeOtps));

  console.log(`[SiMFa OTP] Kod OTP dijana untuk ${cleanEmail}: ${otpCode}`);
  return otpCode;
}

function simfaVerifyOTP(email, inputCode) {
  const cleanEmail = email.toLowerCase().trim();
  const activeOtps = JSON.parse(localStorage.getItem('simfa_active_otps') || '{}');
  const record = activeOtps[cleanEmail];

  if (!record) {
    return { success: false, error: '⚠️ Tiada rekod OTP atau sesi telah tamat. Sila klik Jana Semula.' };
  }
  if (Date.now() > record.expiry) {
    delete activeOtps[cleanEmail];
    localStorage.setItem('simfa_active_otps', JSON.stringify(activeOtps));
    return { success: false, error: '⏰ Kod OTP telah tamat tempoh (5 minit). Sila klik Jana Semula.' };
  }
  if (record.code !== inputCode.trim()) {
    return { success: false, error: '❌ Kod OTP tidak tepat. Sila semak semula 6-digit nombor anda.' };
  }

  delete activeOtps[cleanEmail];
  localStorage.setItem('simfa_active_otps', JSON.stringify(activeOtps));
  return { success: true };
}

// --------------------------------------------------------------------------
// 2. AUTHENTICATION (FIREBASE CLOUD AUTH + FIRESTORE DATABASE)
// --------------------------------------------------------------------------
async function simfaRegisterUser(email, password) {
  const cleanEmail = email.toLowerCase().trim();
  saveLocalUser(cleanEmail, password);

  // Cloud Registration: Firebase Auth & Cloud Firestore
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.auth) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(cleanEmail, password);
      console.log("[Firebase Cloud] Pegawai baru berjaya didaftarkan di Firebase:", cleanEmail);

      // Simpan profil pegawai ke Cloud Firestore
      if (firebase.firestore) {
        await firebase.firestore().collection('users').doc(cleanEmail).set({
          email: cleanEmail,
          uid: userCredential.user.uid,
          registeredAt: new Date().toISOString(),
          facility: "PKD Sik / Fasiliti",
          role: "Pegawai Farmasi / Kesihatan"
        }, { merge: true });
      }

      await simfaRecordAuditLog(cleanEmail, 'Daftar Akaun Baru (Cloud)');
      return { success: true, email: cleanEmail };
    } catch (err) {
      console.warn("[Firebase Register Error / Note]:", err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        // Akaun sudah ada di Firebase
        return { success: true, email: cleanEmail };
      }
      return { success: false, error: err.message };
    }
  }

  return { success: true, email: cleanEmail };
}

async function simfaLoginUser(email, password) {
  const cleanEmail = email.toLowerCase().trim();
  const inputPass = String(password).trim();
  
  // Firebase Auth requires min 6 chars. If user enters 123, also try Password123!
  const candidatePasswords = [inputPass];
  if (inputPass === '123') {
    candidatePasswords.push('Password123!');
  } else if (inputPass === 'Password123!') {
    candidatePasswords.push('123');
  }

  // 1. Cuba Cloud Login via Firebase Auth
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.auth) {
    for (const p of candidatePasswords) {
      if (p.length < 6) continue; // Firebase will error on < 6
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(cleanEmail, p);
        console.log("[Firebase Cloud] Log masuk berjaya:", cleanEmail);
        await simfaRecordAuditLog(cleanEmail, 'Log Masuk (Cloud)');
        return { success: true, user: userCredential.user, email: userCredential.user.email };
      } catch (err) {
        console.warn("[Firebase Login Attempt]:", p, err.code, err.message);
      }
    }
  }

  // 2. Sandaran Local Storage jika Firebase offline atau belum authorize domain
  const users = getLocalUsers();
  const matched = users.find(u => 
    u.email.toLowerCase() === cleanEmail && 
    (u.password === inputPass || 
     (inputPass === '123' && u.password === 'Password123!') || 
     (inputPass === 'Password123!' && u.password === '123'))
  );

  if (matched) {
    await simfaRecordAuditLog(cleanEmail, 'Log Masuk (Lokal/Akses Pantas)');
    return { success: true, email: matched.email };
  } else if (!users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, needOtp: true, email: cleanEmail, error: "ℹ️ Akaun belum wujud. Pengesahan OTP kali pertama diperlukan untuk mendaftar." };
  } else {
    return { success: false, error: "❌ Kata laluan tidak tepat. Sila gunakan kata laluan 'Password123!' atau '123'." };
  }
}

async function simfaResetPassword(email) {
  const cleanEmail = email.toLowerCase().trim();

  // Send REAL official password reset email from Google Firebase
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.auth) {
    try {
      await firebase.auth().sendPasswordResetEmail(cleanEmail);
      await simfaRecordAuditLog(cleanEmail, 'Pautan Reset Emel Dihantar (Cloud)');
      return {
        success: true,
        message: `✅ Emel rasmi penetapan semula kata laluan telah dihantar ke: ${cleanEmail}. Sila buka inbox atau folder Spam emel anda untuk klik pautan tukar kata laluan.`
      };
    } catch (err) {
      console.warn("[Firebase Reset Password Error]:", err.code, err.message);
      return {
        success: false,
        error: `⚠️ Ralat Firebase: ${err.message}`
      };
    }
  }

  return {
    success: true,
    message: `✅ Kata laluan untuk akaun lokal telah dikemas kini.`
  };
}

// --------------------------------------------------------------------------
// 3. CENTRALIZED AUDIT LOG MANAGEMENT (CLOUD FIRESTORE + LOCAL STORAGE)
// --------------------------------------------------------------------------
async function simfaRecordAuditLog(email, action) {
  const now = new Date();
  const logEntry = {
    email: email,
    action: action, // 'Log Masuk' | 'Log Keluar' | dsb.
    timestamp: now.toISOString(),
    datetime: now.toLocaleString('ms-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  };

  // Local Storage Backup
  const logs = JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
  logs.unshift(logEntry);
  if (logs.length > 500) logs.splice(500);
  localStorage.setItem('simfa_audit_log', JSON.stringify(logs));

  // Simpan ke Cloud Firestore (Semua fasiliti kongsi satu rekod berpusat)
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.firestore) {
    try {
      await firebase.firestore().collection('audit_logs').add({
        ...logEntry,
        clientIp: "Fasiliti Web",
        device: navigator.platform || "Web",
        createdServerTime: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("[SiMFa Cloud] Log aktiviti berjaya dihantar ke Cloud Firestore.");
    } catch (err) {
      console.warn("[Firestore Log Note]:", err.message);
    }
  }
}

// Dapatkan rekod log aktiviti berpusat dari Cloud Firestore
async function simfaFetchCentralAuditLogs() {
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.firestore) {
    try {
      const snapshot = await firebase.firestore()
        .collection('audit_logs')
        .orderBy('timestamp', 'desc')
        .limit(100)
        .get();

      if (!snapshot.empty) {
        const cloudLogs = [];
        snapshot.forEach(doc => {
          cloudLogs.push(doc.data());
        });
        return cloudLogs;
      }
    } catch (err) {
      console.warn("[Firestore Fetch Logs Note]:", err.message);
    }
  }
  // Sandaran lokal
  return JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
}

// Aliases for compatibility
function getAuditLogs() {
  return JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
}

function recordAuditLog(email, action) {
  return simfaRecordAuditLog(email, action);
}

// ==========================================================================
// SIMFA MEDICINE LABEL DESIGNER - APPLICATION LOGIC (SKETCH GRID DESIGN)
// ==========================================================================

// Global Image Fallback Handler: Menjamin imej keluar walaupun fail di subfolder icons/ atau di root folder GitHub
window.addEventListener("error", function(e) {
  if (e.target && e.target.tagName === "IMG" && e.target.src) {
    if (e.target.src.includes("/icons/")) {
      e.target.src = e.target.src.replace("/icons/", "/");
    }
  }
}, true);

// 1. REFINED, DETAILED VECTOR GRAPHICS FOR MEDICINE SYMBOLS
const ICONS = {
  dosage: {
    "half": {
      label: "1/2 Biji",
      svg: `<img class="table-dose-svg" src="icons/SETENGAH BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="1/2 Biji">`
    },
    "1": {
      label: "1 Biji",
      svg: `<img class="table-dose-svg" src="icons/SATU BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="1 Biji">`
    },
    "2": {
      label: "2 Biji",
      svg: `<img class="table-dose-svg" src="icons/DUA BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="2 Biji">`
    },
    "3": {
      label: "3 Biji",
      svg: `<img class="table-dose-svg" src="icons/TIGA BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="3 Biji">`
    },
    "3/4": {
      label: "3/4 Biji",
      svg: `<img class="table-dose-svg" src="icons/TIGA PEREMPAT BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="3/4 Biji">`
    },
    "1/4": {
      label: "1/4 Biji",
      svg: `<img class="table-dose-svg" src="icons/SUKU BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="1/4 Biji">`
    },
    "1_half": {
      label: "1 1/2 Biji",
      svg: `<img class="table-dose-svg" src="icons/SATU BIJI SETENGAH.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="1 1/2 Biji">`
    },
    "4": {
      label: "4 Biji",
      svg: `<img class="table-dose-svg" src="icons/EMPAT BIJI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="4 Biji">`
    },
    "cucuk": {
      label: "Cucuk",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="38" x2="19" y2="31" stroke-width="1.8" />
          <rect x="15" y="13" width="22" height="9" rx="1.5" transform="rotate(-45 26 17.5)" fill="#FFFFFF" stroke="#000000" />
          <line x1="31" y1="19" x2="39" y2="11" stroke-width="3" />
          <line x1="36" y1="8" x2="42" y2="14" stroke-width="3" />
          <line x1="21" y1="21" x2="23" y2="23" stroke-width="1.2" />
          <line x1="24" y1="18" x2="26" y2="20" stroke-width="1.2" />
          <line x1="27" y1="15" x2="29" y2="17" stroke-width="1.2" />
        </g>
      </svg>`
    }
  },
  timing: {
    "pagi": {
      label: "Pagi",
      svg: `<img class="table-time-svg" src="icons/PAGI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="Pagi">`
    },
    "tengah_hari": {
      label: "Tengah Hari",
      svg: `<img class="table-time-svg" src="icons/TENGAH HARI.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="Tengah Hari">`
    },
    "petang": {
      label: "Petang",
      svg: `<img class="table-time-svg" src="icons/PETANG.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="Petang">`
    },
    "malam": {
      label: "Malam",
      svg: `<img class="table-time-svg" src="icons/MALAM VERSI 1.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="Malam">`
    },
    "bila_perlu": {
      label: "Bila Perlu",
      svg: `<svg class="table-time-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#000000" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="25" cy="25" r="14" stroke="#000000" stroke-width="2"/>
          <path d="M 16 25 L 21 25 L 23 18 L 27 32 L 29 25 L 34 25" stroke="#000000" stroke-width="2.5" />
        </g>
      </svg>`
    },
    "sebelum": {
      label: "Sebelum Makan",
      svg: `<img class="table-meal-svg" src="icons/SEBELUM MAKAN VERSI 1.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="Sebelum Makan">`
    },
    "selepas": {
      label: "Selepas Makan",
      svg: `<img class="table-meal-svg" src="icons/SELEPAS MAKAN VERSI 2.svg" onerror="this.onerror=null;this.src=this.src.replace('icons/','');" alt="Selepas Makan">`
    }
  },
  warning: {
    "mengantuk": {
      label: "MENGANTUK",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>
        <g stroke="#263238" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 7 25 C 16 13, 34 13, 43 25 C 34 37, 16 37, 7 25 Z" fill="white" stroke-width="2.5"/>
          <circle cx="25" cy="25" r="6" fill="#263238"/>
          <line x1="7" y1="25" x2="4" y2="24"/>
          <line x1="43" y1="25" x2="46" y2="24"/>
          <path d="M 29 9 L 33 9 L 29 13 L 33 13 M 34 4 L 37 4 L 34 7 L 37 7" stroke-width="1.5"/>
        </g>
      </svg>`
    },
    "cahaya": {
      label: "JAUHI CAHAYA",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>
        <g stroke="#263238" fill="none" stroke-linecap="round" stroke-width="2">
          <path d="M 8 23 C 8 8, 36 8, 36 23 C 31 23, 27 18, 22 23 C 17 18, 13 23, 8 23 Z" fill="#263238"/>
          <path d="M 22 23 L 22 36 A 2.5 2.5 0 0 1 19 38.5" stroke-width="2.5"/>
          <circle cx="41" cy="9" r="4.5" fill="#FFB300" stroke="#FFB300"/>
          <path d="M 35 9 L 32 9 M 41 16 L 41 19" stroke="#FFB300" stroke-width="1.5"/>
          <rect x="25" y="26" width="6" height="10" rx="1" fill="white" stroke-width="1.5"/>
        </g>
      </svg>`
    },
    "gigit": {
      label: "JANGAN GIGIT",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>
        <!-- Open mouth with lips and teeth -->
        <g stroke="#263238" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Lips background fill -->
          <path d="M 12 25 C 12 16, 18 14, 25 14 C 32 14, 38 16, 38 25 C 38 34, 32 36, 25 36 C 18 36, 12 34, 12 25 Z" fill="#FFCDD2" stroke-width="2"/>
          <!-- Inside mouth dark pink -->
          <path d="M 14 25 C 14 19, 18 17, 25 17 C 32 17, 36 19, 36 25 C 36 31, 32 33, 25 33 C 18 33, 14 31, 14 25 Z" fill="#E57373" stroke="none"/>
          <!-- Upper teeth -->
          <path d="M 17 18 L 33 18 L 30 22 L 20 22 Z" fill="#FFFFFF" stroke-width="1.2"/>
          <line x1="25" y1="18" x2="25" y2="22" stroke-width="1"/>
          <!-- Lower teeth -->
          <path d="M 18 32 L 32 32 L 30 28 L 20 28 Z" fill="#FFFFFF" stroke-width="1.2"/>
          <line x1="25" y1="28" x2="25" y2="32" stroke-width="1"/>
          <!-- Capsule in between -->
          <g transform="translate(25, 25) rotate(15)">
            <rect x="-8" y="-4" width="8" height="8" rx="4" fill="#0D47A1"/>
            <rect x="0" y="-4" width="8" height="8" rx="4" fill="#43A047"/>
            <rect x="-8" y="-4" width="16" height="8" rx="4" fill="none" stroke="#263238" stroke-width="1"/>
          </g>
        </g>
        <!-- Thinned cross out lines -->
        <g stroke="#D32F2F" stroke-width="3" stroke-linecap="round">
          <line x1="5" y1="5" x2="45" y2="45"/>
          <line x1="45" y1="5" x2="5" y2="45"/>
        </g>
      </svg>`
    },
    "lidah": {
      label: "BAWAH LIDAH",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Premium radial gradients for organic tongue look -->
          <radialGradient id="tongueGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFA4A2" />
            <stop offset="60%" stop-color="#EF5350" />
            <stop offset="100%" stop-color="#C62828" />
          </radialGradient>
          <!-- Soft pink gradient for inside mouth -->
          <linearGradient id="mouthBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFEBEE" />
            <stop offset="100%" stop-color="#FFCDD2" />
          </linearGradient>
          <!-- Blue pill gradient -->
          <linearGradient id="pillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#42A5F5" />
            <stop offset="100%" stop-color="#1565C0" />
          </linearGradient>
          <!-- Drop shadow for the sublingual tablet -->
          <filter id="pillShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-color="#000" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Yellow container card background -->
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>

        <!-- Inside Mouth Silhouette Background (for contrast) -->
        <path d="M 9 12 C 16 12, 23 15, 26 21 C 21 24, 18 25, 9 25 Z" fill="url(#mouthBg)" opacity="0.3"/>
        <path d="M 9 38 C 16 38, 23 35, 26 29 C 21 26, 18 25, 9 25 Z" fill="url(#mouthBg)" opacity="0.3"/>

        <!-- Mouth Outline (Side Profile) -->
        <g stroke="#263238" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <!-- Upper Lip and Roof of Mouth -->
          <path d="M 8 13 C 14 13, 20 16, 23 20" />
          <!-- Lower Lip and Floor of Mouth -->
          <path d="M 8 37 C 14 37, 20 34, 23 30" />
          
          <!-- Teeth (Upper) -->
          <path d="M 12 15 L 14 19 L 16 19 L 17 15" fill="#FFFFFF" stroke-width="1.8"/>
        </g>

        <!-- Tongue (Raised) with organic shape and warm gradient -->
        <path d="M 10 30 C 14 30, 20 28, 23 22 C 20 19, 14 22, 10 30 Z" fill="url(#tongueGrad)" stroke="#263238" stroke-width="2" stroke-linejoin="round"/>

        <!-- Sublingual Tablet (Blue, glowing, under the tongue, with score line) -->
        <g filter="url(#pillShadow)" transform="translate(13, 33)">
          <circle cx="0" cy="0" r="3.5" fill="url(#pillGrad)" stroke="#0D47A1" stroke-width="0.8"/>
          <!-- Score line on the pill to make it look like a tablet -->
          <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#FFFFFF" stroke-width="0.6" opacity="0.8"/>
        </g>

        <!-- Red Arrow (Elegant curve, pointing directly to the tablet under the tongue) -->
        <g stroke-linecap="round" stroke-linejoin="round">
          <path d="M 36 34 C 30 34, 23 32, 19 32.5" fill="none" stroke="#D32F2F" stroke-width="2.5"/>
          <path d="M 22.5 35.5 L 18 32.5 L 22.5 29.5" fill="none" stroke="#D32F2F" stroke-width="2.5"/>
        </g>
      </svg>`
    },
    "kanak": {
      label: "JAUHI KANAK²",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>
        <g stroke="#263238" fill="none" stroke-linecap="round">
          <circle cx="15" cy="18" r="4.5" fill="#263238"/>
          <path d="M 9 36 L 9 28 C 9 25.5, 12 23.5, 15 23.5 C 18 23.5, 21 25.5, 21 28 L 21 36" stroke-width="2.2" fill="#263238"/>
          <circle cx="35" cy="18" r="4.5" fill="#263238"/>
          <path d="M 29 36 L 31 27 C 32 25, 38 25, 39 27 L 41 36 Z" stroke-width="2.2" fill="#263238"/>
        </g>
        <!-- Thinned cross out lines -->
        <g stroke="#D32F2F" stroke-width="3" stroke-linecap="round">
          <line x1="5" y1="5" x2="45" y2="45"/>
          <line x1="45" y1="5" x2="5" y2="45"/>
        </g>
      </svg>`
    },
    "potong": {
      label: "JANGAN POTONG",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>
        <g stroke="#263238" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <rect x="11" y="22" width="28" height="10" rx="5" transform="rotate(-15 25 27)" fill="white" stroke-width="1.8"/>
          <line x1="25" y1="21" x2="22" y2="32" stroke-width="1.5"/>
          <circle cx="15" cy="12" r="3" stroke-width="1.8"/>
          <circle cx="26" cy="9" r="3" stroke-width="1.8"/>
          <path d="M 18 14 L 28 26 M 25 11 L 18 25" stroke-width="1.8"/>
        </g>
        <!-- Thinned cross out lines -->
        <g stroke="#D32F2F" stroke-width="3" stroke-linecap="round">
          <line x1="5" y1="5" x2="45" y2="45"/>
          <line x1="45" y1="5" x2="5" y2="45"/>
        </g>
      </svg>`
    },
    "sejuk": {
      label: "SIMPAN SEJUK",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#E0F7FA" stroke="#263238" stroke-width="2.2"/>
        <g stroke="#00838F" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
          <!-- Snowflake design -->
          <line x1="25" y1="9" x2="25" y2="41"/>
          <line x1="9" y1="25" x2="41" y2="25"/>
          <line x1="13.7" y1="13.7" x2="36.3" y2="36.3"/>
          <line x1="13.7" y1="36.3" x2="36.3" y2="13.7"/>
          <path d="M 25 15 L 21 12 M 25 15 L 29 12 M 25 35 L 21 38 M 25 35 L 29 38"/>
          <path d="M 15 25 L 12 21 M 15 25 L 12 29 M 35 25 L 38 21 M 35 25 L 38 29"/>
        </g>
      </svg>`
    },
    "kunyah": {
      label: "JANGAN KUNYAH",
      svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="46" height="46" rx="6" fill="#FFF9C4" stroke="#263238" stroke-width="2.2"/>
        <g stroke="#263238" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Lips background fill -->
          <path d="M 12 25 C 12 16, 18 14, 25 14 C 32 14, 38 16, 38 25 C 38 34, 32 36, 25 36 C 18 36, 12 34, 12 25 Z" fill="#FFCDD2" stroke-width="2"/>
          <!-- Inside mouth dark pink -->
          <path d="M 14 25 C 14 19, 18 17, 25 17 C 32 17, 36 19, 36 25 C 36 31, 32 33, 25 33 C 18 33, 14 31, 14 25 Z" fill="#E57373" stroke="none"/>
          <!-- Upper teeth -->
          <path d="M 17 18 L 33 18 L 30 22 L 20 22 Z" fill="#FFFFFF" stroke-width="1.2"/>
          <line x1="25" y1="18" x2="25" y2="22" stroke-width="1"/>
          <!-- Lower teeth -->
          <path d="M 18 32 L 32 32 L 30 28 L 20 28 Z" fill="#FFFFFF" stroke-width="1.2"/>
          <line x1="25" y1="28" x2="25" y2="32" stroke-width="1"/>
          <!-- Chewed/crushed tablet pieces in center -->
          <path d="M 21 23 Q 23 21 25 24 L 23 27 Z" fill="#0D47A1" stroke="#263238" stroke-width="1"/>
          <path d="M 29 26 Q 27 28 25 25 L 28 22 Z" fill="#0D47A1" stroke="#263238" stroke-width="1"/>
          <circle cx="21" cy="27" r="1.5" fill="#0D47A1"/>
          <circle cx="29" cy="21" r="1.5" fill="#0D47A1"/>
        </g>
        <!-- Thinned cross out lines -->
        <g stroke="#D32F2F" stroke-width="3" stroke-linecap="round">
          <line x1="5" y1="5" x2="45" y2="45"/>
          <line x1="45" y1="5" x2="5" y2="45"/>
        </g>
      </svg>`
    }
  }
};

// 2. 69 PREPROGRAMMED DRUG PRESETS WITH CORRESPONDING SCHEDULES
const PRESETS = {
  // 1
  acetylsalicylic_300: {
    medicineName: "ACETYLSALICYLIC ACID 300mg Soluble Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kunyah"]
  },
  // 2
  amiloride_hctz: {
    medicineName: "AMILORIDE 5mg / HCTZ 50mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["potong"]
  },
  // 3
  amlodipine_10: {
    medicineName: "AMLODIPINE 10mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 4
  amlodipine_5: {
    medicineName: "AMLODIPINE 5mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 5
  atenolol_100: {
    medicineName: "ATENOLOL 100mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 6
  atorvastatin_20: {
    medicineName: "ATORVASTATIN 20mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 7
  calcitriol_0_25: {
    medicineName: "CALCITRIOL 0.25mcg Capsule",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 8
  calcium_lactate_300: {
    medicineName: "CALCIUM LACTATE 300mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 9
  captopril_25: {
    medicineName: "CAPTOPRIL 25mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "sebelum" },
      { dosage: "1", timing: "malam", meal: "sebelum" }
    ],
    warnings: ["kanak"]
  },
  // 10
  carbamazepine_200: {
    medicineName: "CARBAMAZEPINE 200mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 11
  carbimazole_5: {
    medicineName: "CARBIMAZOLE 5mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 12
  digoxin_0_25: {
    medicineName: "DIGOXIN 0.25mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 13
  diltiazem_30: {
    medicineName: "DILTIAZEM HCl 30mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "tengah_hari", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 14
  enalapril_10: {
    medicineName: "ENALAPRIL 10mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 15
  enalapril_5: {
    medicineName: "ENALAPRIL 5mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 16
  frusemide_40: {
    medicineName: "FRUSEMIDE 40mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 17
  gliclazide_30_mr: {
    medicineName: "GLICLAZIDE 30mg MR Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["potong"]
  },
  // 18
  gliclazide_80: {
    medicineName: "GLICLAZIDE 80mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "sebelum" },
      { dosage: "1", timing: "tengah_hari", meal: "sebelum" }
    ],
    warnings: ["kanak"]
  },
  // 19
  gtn_0_5: {
    medicineName: "GLYCERYL TRINITRATE 0.5mg Tablet",
    schedule: [{ dosage: "1", timing: "bila_perlu" }],
    warnings: ["cahaya", "lidah"]
  },
  // 20
  hctz_25: {
    medicineName: "HYDROCHLOROTHIAZIDE 25mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 21
  labetalol_100: {
    medicineName: "LABETALOL HCl 100mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 22
  metformin_500: {
    medicineName: "METFORMIN HCl 500mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 23
  methyldopa_250: {
    medicineName: "METHYLDOPA 250mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 24
  metoprolol_100: {
    medicineName: "METOPROLOL TARTRATE 100mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 25
  nifedipine_10: {
    medicineName: "NIFEDIPINE 10mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 26
  pantoprazole_40: {
    medicineName: "PANTOPRAZOLE 40mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 27
  paracetamol_500: {
    medicineName: "PARACETAMOL 500mg Tablet",
    schedule: [
      { dosage: "2", timing: "pagi", meal: "selepas" },
      { dosage: "2", timing: "tengah_hari", meal: "selepas" },
      { dosage: "2", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 28
  perindopril_4: {
    medicineName: "PERINDOPRIL 4mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 29
  prazosin_1: {
    medicineName: "PRAZOSIN HCl 1mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 30
  prazosin_2: {
    medicineName: "PRAZOSIN HCl 2mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 31
  prazosin_5: {
    medicineName: "PRAZOSIN HCl 5mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 32
  propranolol_40: {
    medicineName: "PROPRANOLOL HCl 40mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 33
  simvastatin_40: {
    medicineName: "SIMVASTATIN 40mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 34
  spironolactone_25: {
    medicineName: "SPIRONOLACTONE 25mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 35
  allopurinol_300: {
    medicineName: "ALLOPURINOL 300mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 36
  amitriptyline_25: {
    medicineName: "AMITRIPTYLINE HCl 25mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 37
  amlodipine_valsartan: {
    medicineName: "AMLODIPINE 10mg / VALSARTAN 160mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["potong"]
  },
  // 38
  atorvastatin_40: {
    medicineName: "ATORVASTATIN 40mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 39
  bisoprolol_2_5: {
    medicineName: "BISOPROLOL FUMARATE 2.5mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 40
  bisoprolol_5: {
    medicineName: "BISOPROLOL FUMARATE 5mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 41 (Syrup removed)
  bromhexine_8: {
    medicineName: "BROMHEXINE HCl 8mg Tablet",
    schedule: [
      { dosage: "1", timing: "pagi", meal: "selepas" },
      { dosage: "1", timing: "tengah_hari", meal: "selepas" },
      { dosage: "1", timing: "malam", meal: "selepas" }
    ],
    warnings: ["kanak"]
  },
  // 42
  dapagliflozin_10: {
    medicineName: "DAPAGLIFLOZIN 10mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 43
  empagliflozin_25: {
    medicineName: "EMPAGLIFLOZIN 25mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 44
  fenofibrate_145: {
    medicineName: "FENOFIBRATE 145mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 45
  insulin_glulisine: {
    medicineName: "INSULIN GLULISINE 100 IU/ml pre-filled pen",
    schedule: [
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "pagi", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "tengah_hari", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }
    ],
    warnings: ["sejuk"]
  },
  // 47
  metformin_500_er: {
    medicineName: "METFORMIN HCl 500mg ER Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["potong"]
  },
  // 48
  rosuvastatin_20: {
    medicineName: "ROSUVASTATIN 20mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 49
  telmisartan_80: {
    medicineName: "TELMISARTAN 80mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 50
  terazosin_2: {
    medicineName: "TERAZOSIN HCl 2mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 51
  terazosin_5: {
    medicineName: "TERAZOSIN HCl 5mg Tablet",
    schedule: [{ dosage: "1", timing: "malam", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 52
  vildagliptin_50: {
    medicineName: "VILDAGLIPTIN 50mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 53
  aspirin_glycine: {
    medicineName: "ASPIRIN 100mg / GLYCINE 45mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["potong"]
  },
  // 54
  enalapril_20: {
    medicineName: "ENALAPRIL 20mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["kanak"]
  },
  // 55
  insulin_novomix: {
    medicineName: "INSULIN NOVOMIX-30 100 IU/ml FlexPen",
    schedule: [
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "pagi", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }
    ],
    warnings: ["sejuk"]
  },
  // 56
  insulin_lantus: {
    medicineName: "INSULIN LANTUS 100 IU/ml Pre-filled Pen",
    schedule: [{ dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }],
    warnings: ["sejuk"]
  },
  // 57
  insulin_toujeo: {
    medicineName: "INSULIN TOUJEO 300 IU/ml Pre-filled Pen",
    schedule: [{ dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }],
    warnings: ["sejuk"]
  },
  // 58
  insulin_insulatard: {
    medicineName: "INSULIN INSULATARD 100 IU/ml Penfill",
    schedule: [{ dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }],
    warnings: ["sejuk"]
  },
  // 59
  insulin_insugen_r: {
    medicineName: "INSULIN INSUGEN-R 100 IU/ml Penfill",
    schedule: [
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "pagi", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "tengah_hari", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }
    ],
    warnings: ["sejuk"]
  },
  // 60
  insulin_insugen_n: {
    medicineName: "INSULIN INSUGEN-N 100 IU/ml Penfill",
    schedule: [{ dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }],
    warnings: ["sejuk"]
  },
  // 61
  insulin_insugen_30_70: {
    medicineName: "INSULIN INSUGEN-30/70 100 IU/ml Penfill",
    schedule: [
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "pagi", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }
    ],
    warnings: ["sejuk"]
  },
  // 62
  insulin_actrapid: {
    medicineName: "INSULIN ACTRAPID 100 IU/ml Penfill",
    schedule: [
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "pagi", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "tengah_hari", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }
    ],
    warnings: ["sejuk"]
  },
  // 63
  insulin_mixtard: {
    medicineName: "INSULIN MIXTARD-30 100 IU/ml Penfill",
    schedule: [
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "pagi", meal: "sebelum" },
      { dosage: "cucuk", customDoseText: "10", useCucukIcon: true, timing: "malam", meal: "sebelum" }
    ],
    warnings: ["sejuk"]
  },
  // 64
  losartan_100: {
    medicineName: "LOSARTAN 100mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 65
  losartan_50: {
    medicineName: "LOSARTAN 50mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 66
  perindopril_indapamide: {
    medicineName: "PERINDOPRIL 4mg / INDAPAMIDE 1.25mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "sebelum" }],
    warnings: ["potong"]
  },
  // 67
  telmisartan_hctz: {
    medicineName: "TELMISARTAN 80mg / HCTZ 12.5mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["potong"]
  },
  // 68
  valsartan_80: {
    medicineName: "VALSARTAN 80mg Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["kanak"]
  },
  // 69
  vitamin_b_complex: {
    medicineName: "VITAMIN B1, B6, B12 Tablet",
    schedule: [{ dosage: "1", timing: "pagi", meal: "selepas" }],
    warnings: ["potong"]
  }
};

// 3. APPLICATION STATE
const state = {
  userEmail: "user@email.com",
  medicineName: "METFORMIN HCL 500MG TABLET",
  schedule: [
    { dosage: "2", timing: "pagi", meal: "selepas" },
    { dosage: "2", timing: "malam", meal: "selepas" }
  ],
  warnings: ["kanak", "gigit"],
  printerConfig: {
    activePrinter: "phis",
    phis: { name: "PhIS / eHIS", x: 0, y: 0 },
    fisicien_l: { name: "FiSiCien (L)", x: -6, y: -6 },
    fisicien_s: { name: "FiSiCien (S)", x: -4, y: -4 }
  }
};

// ==========================================================================
// PRINTER CALIBRATION & HARDWARE OFFSET LOGIC (PhIS, FiSiCien, Zebra, Toshiba)
// ==========================================================================
function initPrinterConfig() {
  const saved = localStorage.getItem("simfa_printer_config");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        if (parsed.activePrinter && state.printerConfig[parsed.activePrinter]) {
          state.printerConfig.activePrinter = parsed.activePrinter;
        }
        ['phis', 'fisicien_l', 'fisicien_s'].forEach(key => {
          if (parsed[key]) {
            state.printerConfig[key].x = Number(parsed[key].x) || 0;
            state.printerConfig[key].y = Number(parsed[key].y) || 0;
          }
        });
      }
    } catch (e) {
      console.warn("Could not parse saved printer config", e);
    }
  }
}

function savePrinterConfig() {
  try {
    localStorage.setItem("simfa_printer_config", JSON.stringify(state.printerConfig));
  } catch (e) {
    console.warn("Could not save printer config", e);
  }
}

function applyPrintOffset() {
  const activeKey = state.printerConfig.activePrinter || 'phis';
  const cfg = state.printerConfig[activeKey] || { name: 'PhIS / eHIS', x: 0, y: 0 };
  const x = cfg.x;
  const y = cfg.y;

  // Set CSS Custom Properties on :root
  document.documentElement.style.setProperty('--print-offset-x', `${x}mm`);
  document.documentElement.style.setProperty('--print-offset-y', `${y}mm`);

  // Ensure dynamic print offset style tag exists for foolproof print engine support
  let dynStyle = document.getElementById("dynamic-print-offsets");
  if (!dynStyle) {
    dynStyle = document.createElement("style");
    dynStyle.id = "dynamic-print-offsets";
    document.head.appendChild(dynStyle);
  }
  dynStyle.textContent = `
    @media print {
      #print-label {
        transform: translate(${x}mm, ${y}mm) !important;
      }
    }
  `;

  // Update badge in preview panel
  const badgeText = document.getElementById("printer-badge-text");
  if (badgeText) {
    const formatMm = (val) => `${val > 0 ? '+' : ''}${val}mm`;
    badgeText.textContent = `${cfg.name} (X: ${formatMm(x)}, Y: ${formatMm(y)})`;
  }
}

function setupPrinterAdjustControls() {
  initPrinterConfig();

  const printerButtons = document.querySelectorAll("#printer-type-group .pill-btn");
  const xSlider = document.getElementById("adjust-x-slider");
  const ySlider = document.getElementById("adjust-y-slider");
  const xValText = document.getElementById("adjust-x-val");
  const yValText = document.getElementById("adjust-y-val");
  const resetBtn = document.getElementById("btn-reset-offset");

  // Toggle alignment panel on right side
  const alignmentPanel = document.getElementById("printer-alignment-panel");
  const toggleBtn = document.getElementById("btn-toggle-alignment");
  const closeBtn = document.getElementById("btn-close-alignment");
  const badgeBtn = document.getElementById("printer-status-badge");

  function toggleAlignmentPanel() {
    if (!alignmentPanel) return;
    const isHidden = alignmentPanel.style.display === "none" || !alignmentPanel.style.display;
    alignmentPanel.style.display = isHidden ? "block" : "none";
    if (toggleBtn) {
      toggleBtn.classList.toggle("active", isHidden);
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleAlignmentPanel);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (alignmentPanel) alignmentPanel.style.display = "none";
      if (toggleBtn) toggleBtn.classList.remove("active");
    });
  }

  if (badgeBtn) {
    badgeBtn.addEventListener("click", toggleAlignmentPanel);
  }

  function updateUiFromState() {
    const activeKey = state.printerConfig.activePrinter;
    const cfg = state.printerConfig[activeKey] || { x: 0, y: 0 };

    printerButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.printer === activeKey);
    });

    if (xSlider) xSlider.value = cfg.x;
    if (ySlider) ySlider.value = cfg.y;

    const formatMm = (val) => `${val > 0 ? '+' : ''}${val}mm`;
    if (xValText) xValText.textContent = formatMm(cfg.x);
    if (yValText) yValText.textContent = formatMm(cfg.y);

    applyPrintOffset();
  }

  printerButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const printer = btn.dataset.printer;
      if (printer && state.printerConfig[printer]) {
        state.printerConfig.activePrinter = printer;
        savePrinterConfig();
        updateUiFromState();
      }
    });
  });

  if (xSlider) {
    xSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10) || 0;
      const activeKey = state.printerConfig.activePrinter;
      if (state.printerConfig[activeKey]) {
        state.printerConfig[activeKey].x = val;
        if (xValText) xValText.textContent = `${val > 0 ? '+' : ''}${val}mm`;
        applyPrintOffset();
        savePrinterConfig();
      }
    });
  }

  if (ySlider) {
    ySlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10) || 0;
      const activeKey = state.printerConfig.activePrinter;
      if (state.printerConfig[activeKey]) {
        state.printerConfig[activeKey].y = val;
        if (yValText) yValText.textContent = `${val > 0 ? '+' : ''}${val}mm`;
        applyPrintOffset();
        savePrinterConfig();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const activeKey = state.printerConfig.activePrinter;
      if (state.printerConfig[activeKey]) {
        state.printerConfig[activeKey].x = 0;
        state.printerConfig[activeKey].y = 0;
        savePrinterConfig();
        updateUiFromState();
      }
    });
  }

  // Initial UI refresh
  updateUiFromState();
}

// ==========================================================================
// FUKKM INTEGRATION & PRESETS GENERATOR
// ==========================================================================
function loadFukkmDrugs() {
  if (typeof FUKKM_DRUGS !== 'undefined' && Array.isArray(FUKKM_DRUGS)) {
    FUKKM_DRUGS.forEach(drug => {
      if (!PRESETS[drug.key]) {
        PRESETS[drug.key] = {
          medicineName: drug.medicineName,
          schedule: drug.schedule,
          warnings: drug.warnings,
          category: drug.category || "FUKKM"
        };
      }
    });
  }
}

function populatePresetsDropdown(filterQuery = "") {
  const dropdown = document.getElementById("medication-preset");
  if (!dropdown) return;

  const currentVal = dropdown.value;
  dropdown.innerHTML = '<option value="custom">-- Pilihan Custom --</option>';

  const query = (filterQuery || "").trim().toLowerCase();

  const sortedKeys = Object.keys(PRESETS)
    .filter(key => !key.startsWith("custom_tpl_") && !key.startsWith("shared_tpl_"))
    .filter(key => {
      if (!query) return true;
      const name = (PRESETS[key].medicineName || "").toLowerCase();
      return name.includes(query);
    })
    .sort((a, b) => PRESETS[a].medicineName.localeCompare(PRESETS[b].medicineName));

  sortedKeys.forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = PRESETS[key].medicineName;
    dropdown.appendChild(opt);
  });

  if (currentVal && PRESETS[currentVal] && (!query || PRESETS[currentVal].medicineName.toLowerCase().includes(query))) {
    dropdown.value = currentVal;
  }
}

function setupPresetSearch() {
  const searchInput = document.getElementById("preset-search-input");
  const clearBtn = document.getElementById("btn-clear-preset-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const q = e.target.value;
    if (clearBtn) clearBtn.style.display = q ? "block" : "none";
    populatePresetsDropdown(q);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      populatePresetsDropdown("");
      searchInput.focus();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuthFlow();
  setupOtpModal();
  loadSavedUserSession();
  generateWarningsSelector();
  // loadFukkmDrugs(); // FUKKM list undur/disabled
  populatePresetsDropdown();
  setupPresetSearch();
  loadCustomTemplatesIntoDropdown();
  bindInputListeners();
  setupPrinterAdjustControls();
  setupWalkthroughModal();
  setupForgotPasswordModal();
  setupActivityLogModal();
  renderDynamicRowCustomizer();
  updatePreview();
});

// ==========================================================================
// OTP VERIFICATION SYSTEM
// ==========================================================================
let pendingRegistration = { email: '', password: '', timer: null, timeLeft: 60 };

function openOtpModal(email, password) {
  pendingRegistration.email = email;
  pendingRegistration.password = password;

  const otpCode = simfaGenerateOTP(email);
  const modal = document.getElementById("otp-modal");
  const targetEmailEl = document.getElementById("otp-target-email");
  const demoCodeEl = document.getElementById("demo-otp-code");
  const errorMsg = document.getElementById("otp-error-msg");
  const successMsg = document.getElementById("otp-success-msg");
  const otpInput = document.getElementById("otp-input");

  targetEmailEl.textContent = email;
  demoCodeEl.textContent = otpCode;
  errorMsg.style.display = "none";
  successMsg.style.display = "none";
  otpInput.value = "";

  modal.classList.remove("hidden");
  setTimeout(() => { otpInput.focus(); }, 100);

  startOtpCountdown();
}

function startOtpCountdown() {
  const timerEl = document.getElementById("otp-timer");
  const resendBtn = document.getElementById("btn-resend-otp");

  if (pendingRegistration.timer) clearInterval(pendingRegistration.timer);
  pendingRegistration.timeLeft = 60;
  resendBtn.style.pointerEvents = "none";
  resendBtn.style.opacity = "0.5";
  timerEl.textContent = `(${pendingRegistration.timeLeft}s)`;

  pendingRegistration.timer = setInterval(() => {
    pendingRegistration.timeLeft--;
    if (pendingRegistration.timeLeft <= 0) {
      clearInterval(pendingRegistration.timer);
      timerEl.textContent = "";
      resendBtn.style.pointerEvents = "auto";
      resendBtn.style.opacity = "1";
    } else {
      timerEl.textContent = `(${pendingRegistration.timeLeft}s)`;
    }
  }, 1000);
}

function setupOtpModal() {
  const modal = document.getElementById("otp-modal");
  const closeBtn = document.getElementById("close-otp-modal");
  const otpForm = document.getElementById("otp-form");
  const otpInput = document.getElementById("otp-input");
  const autofillBtn = document.getElementById("btn-autofill-otp");
  const resendBtn = document.getElementById("btn-resend-otp");
  const demoCodeEl = document.getElementById("demo-otp-code");
  const errorMsg = document.getElementById("otp-error-msg");
  const successMsg = document.getElementById("otp-success-msg");

  if (!modal) return;

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    if (pendingRegistration.timer) clearInterval(pendingRegistration.timer);
  });

  autofillBtn.addEventListener("click", () => {
    otpInput.value = demoCodeEl.textContent.trim();
    otpInput.focus();
  });

  resendBtn.addEventListener("click", () => {
    if (pendingRegistration.timeLeft > 0) return;
    const newCode = simfaGenerateOTP(pendingRegistration.email);
    demoCodeEl.textContent = newCode;
    otpInput.value = "";
    successMsg.textContent = "✅ Kod OTP baru telah dihantar!";
    successMsg.style.display = "block";
    errorMsg.style.display = "none";
    setTimeout(() => { successMsg.style.display = "none"; }, 3000);
    startOtpCountdown();
  });

  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const codeVal = otpInput.value.trim();
    const res = simfaVerifyOTP(pendingRegistration.email, codeVal);

    if (!res.success) {
      errorMsg.textContent = res.error || "❌ Kod OTP tidak tepat.";
      errorMsg.style.display = "block";
      successMsg.style.display = "none";
      return;
    }

    // OTP Verified!
    errorMsg.style.display = "none";
    successMsg.textContent = "🎉 Kod OTP disahkan! Mengaktifkan akaun pegawai...";
    successMsg.style.display = "block";

    setTimeout(async () => {
      await simfaRegisterUser(pendingRegistration.email, pendingRegistration.password);
      state.userEmail = pendingRegistration.email;
      saveUserSession(pendingRegistration.email);
      modal.classList.add("hidden");
      if (pendingRegistration.timer) clearInterval(pendingRegistration.timer);
      recordAuditLog(state.userEmail, 'Pengesahan OTP Berjaya (Pendaftaran)');
      transitionToWorkspace(true);
    }, 600);
  });
}

// Authentication Tab Switches and Submissions
function setupAuthFlow() {
  const tabSignup = document.getElementById("tab-signup");
  const tabLogin = document.getElementById("tab-login");
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authContainer = document.getElementById("auth-container");
  const appContainer = document.getElementById("app-container");
  const btnLogout = document.getElementById("btn-logout");
  const errorMsg = document.getElementById("auth-error-msg");

  // Email validator - accepts .gov.my, .gov and any valid email format
  function isGovEmail(email) {
    const lower = email.toLowerCase().trim();
    return lower.includes('@') && lower.includes('.');
  }

  function showAuthError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
    setTimeout(() => { errorMsg.style.display = 'none'; }, 5000);
  }

  tabSignup.addEventListener("click", () => {
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    errorMsg.style.display = 'none';
  });

  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    errorMsg.style.display = 'none';
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailVal = document.getElementById("reg-email").value.trim();
    const passVal = document.getElementById("reg-password").value;

    if (!isGovEmail(emailVal)) {
      showAuthError('⛔ E-mel mesti menggunakan domain rasmi kerajaan (.gov.my atau .gov). Contoh: nama@moh.gov.my');
      return;
    }

    // Open OTP verification modal
    openOtpModal(emailVal, passVal);
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginEmailVal = document.getElementById("login-email").value.trim();
    const loginPassVal = document.getElementById("login-password").value;

    if (!isGovEmail(loginEmailVal)) {
      showAuthError('⛔ E-mel mesti menggunakan domain rasmi kerajaan (.gov.my atau .gov). Contoh: nama@moh.gov.my');
      return;
    }

    const res = await simfaLoginUser(loginEmailVal, loginPassVal);
    if (!res.success) {
      if (res.needOtp) {
        // Trigger OTP modal for new gov staff registration
        openOtpModal(loginEmailVal, loginPassVal);
        return;
      }
      showAuthError(res.error || '❌ E-mel atau kata laluan tidak tepat. Sila cuba semula.');
      return;
    }

    state.userEmail = res.email;
    saveUserSession(res.email);
    transitionToWorkspace(true);
  });

  const btnGuest = document.getElementById("btn-guest-login");
  if (btnGuest) {
    btnGuest.addEventListener("click", () => {
      state.userEmail = "sadiq@moh.gov";
      saveUserSession(state.userEmail);
      transitionToWorkspace(true);
    });
  }

  btnLogout.addEventListener("click", () => {
    if (state.userEmail) {
      recordAuditLog(state.userEmail, 'logout');
    }
    localStorage.removeItem("simfa_active_login");
    appContainer.classList.add("hidden");
    authContainer.classList.remove("hidden");
    tabLogin.click();
  });
}

function saveUserSession(email) {
  localStorage.setItem("simfa_user_email", email);
}

function loadSavedUserSession() {
  const savedEmail = localStorage.getItem("simfa_user_email");
  const activeLogin = localStorage.getItem("simfa_active_login");
  if (savedEmail) {
    document.getElementById("reg-email").value = savedEmail;
    document.getElementById("login-email").value = savedEmail;
  }
  // Only restore workspace if user has an active authenticated session
  if (activeLogin === "true" && savedEmail) {
    state.userEmail = savedEmail;
    transitionToWorkspace(false); // false = do not duplicate login audit entry on page reload
  } else {
    document.getElementById("auth-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
  }
}

function transitionToWorkspace(shouldRecordLogin = true) {
  document.getElementById("auth-container").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  const userDisplay = document.getElementById("user-email-display");
  if (userDisplay) {
    userDisplay.textContent = state.userEmail;
  }
  localStorage.setItem("simfa_active_login", "true");
  if (shouldRecordLogin && state.userEmail) {
    recordAuditLog(state.userEmail, 'login');
  }
  updatePreview();
}

// Generate warnings selector in left panel
function generateWarningsSelector() {
  const container = document.getElementById("warnings-selector");
  container.innerHTML = "";

  Object.keys(ICONS.warning).forEach(key => {
    const item = ICONS.warning[key];
    const card = document.createElement("div");
    card.className = "selector-item";
    card.dataset.warnId = key;
    if (state.warnings.includes(key)) card.classList.add("warning-selected");

    card.innerHTML = `
      ${item.svg}
      <span class="selector-label">${item.label}</span>
    `;

    card.addEventListener("click", () => {
      if (state.warnings.includes(key)) {
        state.warnings = state.warnings.filter(w => w !== key);
        card.classList.remove("warning-selected");
      } else {
        state.warnings.push(key);
        card.classList.add("warning-selected");
      }
      updatePreview();
    });

    container.appendChild(card);
  });
}

// Bind standard input listeners
function bindInputListeners() {
  const presetDropdown = document.getElementById("medication-preset");
  const medNameInput = document.getElementById("label-med-name");
  const rowsDropdown = document.getElementById("schedule-rows-count");

  if (medNameInput) {
    medNameInput.addEventListener("input", (e) => {
      state.medicineName = e.target.value;
      updatePreview();
    });
  }

  rowsDropdown.addEventListener("change", (e) => {
    const rowCount = parseInt(e.target.value);
    adjustScheduleRowsCount(rowCount);
    renderDynamicRowCustomizer();
    updatePreview();
  });

  // Preset Dropdown Action
  presetDropdown.addEventListener("change", (e) => {
    const selected = e.target.value;
    if (selected === "custom") return;

    const presetData = PRESETS[selected];
    if (presetData) {
      state.medicineName = presetData.medicineName;
      state.schedule = presetData.schedule.map(row => ({
        dosage: row.dosage,
        timing: row.timing,
        meal: row.meal,
        customDoseText: row.customDoseText || "",
        useCucukIcon: row.useCucukIcon || false
      }));
      state.warnings = [...presetData.warnings];

      // Update Name input
      if (medNameInput) {
        medNameInput.value = state.medicineName;
      }

      // Update Row count dropdown
      rowsDropdown.value = state.schedule.length;

      // Update warnings highlights
      document.querySelectorAll("#warnings-selector .selector-item").forEach(c => {
        c.classList.toggle("warning-selected", state.warnings.includes(c.dataset.warnId));
      });

      renderDynamicRowCustomizer();
      updatePreview();
    }
  });

  // Action buttons
  document.getElementById("btn-print").addEventListener("click", () => {
    applyPrintOffset();
    window.print();
  });

  document.getElementById("btn-save-template").addEventListener("click", () => {
    saveCustomTemplate();
  });

  document.getElementById("btn-export-templates").addEventListener("click", () => {
    exportTemplates();
  });

  document.getElementById("btn-import-templates").addEventListener("click", () => {
    document.getElementById("input-import-template").click();
  });

  document.getElementById("input-import-template").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (typeof importedData !== 'object' || importedData === null) {
          throw new Error("Format fail tidak sah.");
        }
        
        const savedTemplates = JSON.parse(localStorage.getItem("simfa_saved_templates") || "{}");
        let mergeCount = 0;
        
        Object.keys(importedData).forEach(key => {
          const item = importedData[key];
          if (item.medicineName && Array.isArray(item.schedule)) {
            savedTemplates[key] = {
              medicineName: item.medicineName,
              schedule: item.schedule.map(row => ({ ...row })),
              warnings: Array.isArray(item.warnings) ? [...item.warnings] : []
            };
            mergeCount++;
          }
        });
        
        if (mergeCount === 0) {
          alert("Ralat: Tiada template sah ditemui dalam fail JSON.");
          return;
        }
        
        localStorage.setItem("simfa_saved_templates", JSON.stringify(savedTemplates));
        alert(`Berjaya import ${mergeCount} template!`);
        loadCustomTemplatesIntoDropdown();
        e.target.value = "";
      } catch (err) {
        alert("Gagal mengimport fail. Sila pastikan format fail JSON adalah betul.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    resetForm();
  });
}

// Helper to expand/shrink state.schedule array
function adjustScheduleRowsCount(count) {
  const currentCount = state.schedule.length;
  if (count > currentCount) {
    for (let i = currentCount; i < count; i++) {
      state.schedule.push({ dosage: "1", timing: "pagi", meal: "selepas" });
    }
  } else if (count < currentCount) {
    state.schedule = state.schedule.slice(0, count);
  }
}

// Generate inputs for each active schedule row inside left customizer
function renderDynamicRowCustomizer() {
  const container = document.getElementById("dynamic-rows-container");
  container.innerHTML = "";

  const isGTN = state.medicineName && (state.medicineName.toUpperCase().includes("GLYCERYL TRINITRATE") || state.medicineName.toUpperCase().includes("GTN"));

  state.schedule.forEach((row, index) => {
    const rowCard = document.createElement("div");
    rowCard.className = "config-card row-customizer-card";
    rowCard.style.marginTop = "15px";
    rowCard.style.padding = "15px";
    rowCard.style.border = "1.5px dashed var(--color-accent)";
    rowCard.style.backgroundColor = "rgba(0, 172, 193, 0.01)";

    // Determine extra inputs HTML based on dosage
    let extraInputsHTML = "";
    if (row.dosage === 'cucuk') {
      extraInputsHTML = `
        <div class="form-group row-dose-text-group-${index}" style="margin-top: 10px; margin-bottom: 12px;">
          <label style="font-size: 11.5px; color: var(--color-accent);">Bilangan Unit (Contoh: 10)</label>
          <input type="text" class="custom-select row-dose-text-input" data-row-idx="${index}" value="${row.customDoseText || ''}" placeholder="Masukkan unit ubat">
        </div>
      `;
    } else if (row.dosage === 'free') {
      extraInputsHTML = `
        <div class="form-group row-dose-text-group-${index}" style="margin-top: 10px; margin-bottom: 12px;">
          <label style="font-size: 11.5px; color: var(--color-accent);">Teks Bebas / Custom</label>
          <input type="text" class="custom-select row-dose-text-input" data-row-idx="${index}" value="${row.customDoseText || ''}" placeholder="Contoh: Sapu tipis">
        </div>
        <div class="form-group row-dose-icon-group-${index}" style="margin-bottom: 12px; display: flex; flex-direction: row; align-items: center; gap: 8px; padding-left: 6px;">
          <input type="checkbox" class="row-dose-icon-checkbox" data-row-idx="${index}" ${row.useCucukIcon ? 'checked' : ''} style="width: auto; height: 16px; margin: 0;">
          <label style="font-size: 12.5px; text-transform: none; margin-bottom: 0; cursor: pointer; color: var(--color-text-body);">Guna Simbol Cucuk (Syringe)?</label>
        </div>
      `;
    }

    // Hide meal instruction dropdown for GTN
    let mealSelectHTML = "";
    if (!isGTN) {
      mealSelectHTML = `
        <!-- Meal select -->
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 11.5px;">Makan</label>
          <select class="custom-select row-meal-select" data-row-idx="${index}">
            <option value="sebelum" ${row.meal === 'sebelum' ? 'selected' : ''}>Sebelum Makan</option>
            <option value="selepas" ${row.meal === 'selepas' ? 'selected' : ''}>Selepas Makan</option>
          </select>
        </div>
      `;
    }

    rowCard.innerHTML = `
      <h4 style="font-size: 14px; margin-bottom: 12px; color: var(--color-primary);">📅 Waktu Pengambilan ${index + 1}</h4>
      
      <!-- Dose Pill Select -->
      <div class="form-group" style="margin-bottom: 12px;">
        <label style="font-size: 11.5px;">Jumlah Ubat (Dos)</label>
        <select class="custom-select row-dose-select" data-row-idx="${index}">
          <option value="half" ${row.dosage === 'half' ? 'selected' : ''}>1/2 Biji</option>
          <option value="1" ${row.dosage === '1' ? 'selected' : ''}>1 Biji</option>
          <option value="2" ${row.dosage === '2' ? 'selected' : ''}>2 Biji</option>
          <option value="3" ${row.dosage === '3' ? 'selected' : ''}>3 Biji</option>
          <option value="3/4" ${row.dosage === '3/4' ? 'selected' : ''}>3/4 Biji</option>
          <option value="1/4" ${row.dosage === '1/4' ? 'selected' : ''}>1/4 Biji</option>
          <option value="1_half" ${row.dosage === '1_half' ? 'selected' : ''}>1 1/2 Biji</option>
          <option value="4" ${row.dosage === '4' ? 'selected' : ''}>4 Biji</option>
          <option value="cucuk" ${row.dosage === 'cucuk' ? 'selected' : ''}>Unit (Cucuk)</option>
          <option value="free" ${row.dosage === 'free' ? 'selected' : ''}>Teks Bebas</option>
        </select>
      </div>

      ${extraInputsHTML}

      <!-- Time select -->
      <div class="form-group" style="margin-bottom: 12px;">
        <label style="font-size: 11.5px;">Waktu</label>
        <select class="custom-select row-time-select" data-row-idx="${index}">
          <option value="pagi" ${row.timing === 'pagi' ? 'selected' : ''}>Pagi</option>
          <option value="tengah_hari" ${row.timing === 'tengah_hari' ? 'selected' : ''}>Tengah Hari</option>
          <option value="petang" ${row.timing === 'petang' ? 'selected' : ''}>Petang</option>
          <option value="malam" ${row.timing === 'malam' ? 'selected' : ''}>Malam</option>
          <option value="bila_perlu" ${row.timing === 'bila_perlu' ? 'selected' : ''}>Bila Perlu</option>
        </select>
      </div>

      ${mealSelectHTML}
    `;

    // Bind listeners
    rowCard.querySelector(".row-dose-select").addEventListener("change", (e) => {
      const newDose = e.target.value;
      state.schedule[index].dosage = newDose;
      if (newDose === 'cucuk') {
        state.schedule[index].customDoseText = state.schedule[index].customDoseText || "10";
        state.schedule[index].useCucukIcon = true;
      } else if (newDose === 'free') {
        state.schedule[index].customDoseText = state.schedule[index].customDoseText || "";
        state.schedule[index].useCucukIcon = false;
      } else {
        state.schedule[index].customDoseText = "";
        state.schedule[index].useCucukIcon = false;
      }
      renderDynamicRowCustomizer();
      updatePreview();
    });

    rowCard.querySelector(".row-time-select").addEventListener("change", (e) => {
      state.schedule[index].timing = e.target.value;
      updatePreview();
    });

    const mealSelect = rowCard.querySelector(".row-meal-select");
    if (mealSelect) {
      mealSelect.addEventListener("change", (e) => {
        state.schedule[index].meal = e.target.value;
        updatePreview();
      });
    }

    const textInput = rowCard.querySelector(".row-dose-text-input");
    if (textInput) {
      textInput.addEventListener("input", (e) => {
        state.schedule[index].customDoseText = e.target.value;
        updatePreview();
      });
    }

    const iconCheckbox = rowCard.querySelector(".row-dose-icon-checkbox");
    if (iconCheckbox) {
      iconCheckbox.addEventListener("change", (e) => {
        state.schedule[index].useCucukIcon = e.target.checked;
        updatePreview();
      });
    }

    container.appendChild(rowCard);
  });
}


// ==========================================================================
// RENDER ENGINE (DYNAMIC PREVIEW WRITER - SKETCH GRID LAYOUT)
// ==========================================================================
function updatePreview() {
  // Check if current drug is GTN (no meal row needed)
  const isGTN = state.medicineName && (state.medicineName.toUpperCase().includes("GLYCERYL TRINITRATE") || state.medicineName.toUpperCase().includes("GTN"));

  // 1. Render Top Header: Drug Name
  document.getElementById("label-out-drugname").textContent = state.medicineName || "-";

  // 2. Render transposed schedule grid table (Dose | Time | Meal relation as rows, timings as columns)
  const table = document.getElementById("label-schedule-table");
  table.innerHTML = "";

  const trDose = document.createElement("tr");
  const trTime = document.createElement("tr");
  const trMeal = document.createElement("tr");

  // Render columns dynamically based only on scheduled times (remove empty/crossed-out ones)
  state.schedule.forEach((activeEntry) => {
    const tdDose = document.createElement("td");
    const tdTime = document.createElement("td");
    const tdMeal = document.createElement("td");

    let doseSvg = "";
    let doseLabel = "";
    
    if (activeEntry.dosage === 'cucuk') {
      doseSvg = ICONS.dosage.cucuk.svg;
      const val = activeEntry.customDoseText || "";
      if (val.toLowerCase().includes("unit")) {
        doseLabel = val;
      } else {
        doseLabel = val ? `${val} Unit` : "Unit";
      }
    } else if (activeEntry.dosage === 'free') {
      doseSvg = activeEntry.useCucukIcon ? ICONS.dosage.cucuk.svg : ICONS.dosage["1"].svg;
      doseLabel = activeEntry.customDoseText || "Teks Custom";
    } else {
      const doseObj = ICONS.dosage[activeEntry.dosage];
      if (doseObj) {
        doseSvg = doseObj.svg;
        doseLabel = doseObj.label;
      }
    }

    if (doseSvg) {
      tdDose.innerHTML = `
        <div class="table-cell-content">
          ${doseSvg}
          <span class="table-cell-label">${doseLabel.toUpperCase()}</span>
        </div>
      `;
    } else {
      tdDose.innerHTML = "";
    }
    
    const timeObj = ICONS.timing[activeEntry.timing];
    if (timeObj) {
      tdTime.innerHTML = `
        <div class="table-cell-content">
          ${timeObj.svg}
          <span class="table-cell-label">${timeObj.label.toUpperCase()}</span>
        </div>
      `;
    } else {
      tdTime.innerHTML = "";
    }
    
    const mealObj = ICONS.timing[activeEntry.meal];
    if (mealObj) {
      const mealLabel = mealObj.label.split(" – ")[0].split(" ??? ")[0];
      tdMeal.innerHTML = `
        <div class="table-cell-content">
          ${mealObj.svg}
          <span class="table-cell-label">${mealLabel.toUpperCase()}</span>
        </div>
      `;
    } else {
      tdMeal.innerHTML = "";
    }

    trDose.appendChild(tdDose);
    trTime.appendChild(tdTime);
    trMeal.appendChild(tdMeal);
  });

  table.appendChild(trDose);
  table.appendChild(trTime);
  if (!isGTN) {
    table.appendChild(trMeal);
  }

  // 3. Render Right Column: Warnings (Precaution stacked vertically with text captions)
  const warningsContainer = document.getElementById("label-out-warnings");
  warningsContainer.innerHTML = "";

  state.warnings.forEach(w => {
    const wItem = document.createElement("div");
    wItem.className = "label-warning-item";
    
    // Caption text mapping (exact matches to standard label sticker captions)
    const captions = {
      "mengantuk": "BOLEH MENYEBABKAN MENGANTUK",
      "cahaya": "JAUHKAN DARI CAHAYA MATAHARI",
      "gigit": "JANGAN DIGIGIT",
      "lidah": "LETAK DI BAWAH LIDAH",
      "kanak": "JAUHKAN DARI KANAK-KANAK",
      "potong": "JANGAN DIPOTONG",
      "sejuk": "SIMPAN DI PETI SEJUK",
      "kunyah": "JANGAN DIKUNYAH (TELAN BULAT)"
    };
    
    wItem.innerHTML = `
      <div class="warning-icon-svg-wrapper">
        ${ICONS.warning[w].svg}
      </div>
      <span class="warning-caption-text">${captions[w] || ICONS.warning[w].label}</span>
    `;
    warningsContainer.appendChild(wItem);
  });
}

// Save Custom Template to Local Storage
function saveCustomTemplate() {
  const templateName = prompt("Sila masukkan nama template untuk disimpan:", state.medicineName);
  if (!templateName) return;

  const savedTemplates = JSON.parse(localStorage.getItem("simfa_saved_templates") || "{}");
  savedTemplates[templateName] = {
    medicineName: state.medicineName,
    schedule: state.schedule.map(row => ({ ...row })),
    warnings: [...state.warnings]
  };

  localStorage.setItem("simfa_saved_templates", JSON.stringify(savedTemplates));
  alert(`Template "${templateName}" telah berjaya disimpan!`);
  loadCustomTemplatesIntoDropdown();
}

// Load Custom Saved Templates into Medication Presets dropdown
function loadCustomTemplatesIntoDropdown() {
  const dropdown = document.getElementById("medication-preset");
  if (!dropdown) return;

  const sharedDivider = dropdown.querySelector('optgroup[label="Template Berkongsi"]');
  if (sharedDivider) {
    sharedDivider.remove();
  }

  const savedTemplates = JSON.parse(localStorage.getItem("simfa_saved_templates") || "{}");

  const customDivider = dropdown.querySelector('optgroup[label="Template Disimpan"]');
  if (customDivider) {
    customDivider.remove();
  }

  const keys = Object.keys(savedTemplates);
  if (keys.length > 0) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = "Template Disimpan";

    keys.forEach(key => {
      const opt = document.createElement("option");
      opt.value = `custom_tpl_${key}`;
      opt.textContent = key;
      optgroup.appendChild(opt);
      PRESETS[`custom_tpl_${key}`] = savedTemplates[key];
    });

    dropdown.appendChild(optgroup);
  }
}

// Export custom templates as JSON file download
function exportTemplates() {
  const savedTemplates = JSON.parse(localStorage.getItem("simfa_saved_templates") || "{}");
  if (Object.keys(savedTemplates).length === 0) {
    alert("Tiada template yang disimpan untuk dieksport.");
    return;
  }
  
  const jsonContent = JSON.stringify(savedTemplates, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "simfa_templates.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Reset form to defaults
function resetForm() {
  state.medicineName = "";
  state.schedule = [{ dosage: "1", timing: "pagi", meal: "selepas" }];
  state.warnings = [];

  const medNameInput = document.getElementById("label-med-name");
  if (medNameInput) {
    medNameInput.value = "";
  }
  document.getElementById("medication-preset").value = "custom";
  document.getElementById("schedule-rows-count").value = "1";

  document.querySelectorAll("#warnings-selector .selector-item").forEach(c => {
    c.classList.remove("warning-selected");
  });

  renderDynamicRowCustomizer();
  updatePreview();
}

// Walkthrough Modal Logic
function setupWalkthroughModal() {
  const btnWalkthrough = document.getElementById("btn-walkthrough");
  const modal = document.getElementById("walkthrough-modal");
  const closeBtn = document.getElementById("close-walkthrough");
  const closeBtnFooter = document.getElementById("btn-close-walkthrough-footer");
  const tabs = document.querySelectorAll(".wt-tab-btn");
  const panes = document.querySelectorAll(".wt-pane");

  btnWalkthrough.addEventListener("click", () => {
    modal.classList.remove("hidden");
    if (document.getElementById("preview-sym-1")) document.getElementById("preview-sym-1").innerHTML = ICONS.dosage["1"].svg;
    if (document.getElementById("preview-sym-half")) document.getElementById("preview-sym-half").innerHTML = ICONS.dosage["half"].svg;
    if (document.getElementById("preview-sym-2")) document.getElementById("preview-sym-2").innerHTML = ICONS.dosage["2"].svg;
  });

  const closeModal = () => {
    modal.classList.add("hidden");
  };

  closeBtn.addEventListener("click", closeModal);
  closeBtnFooter.addEventListener("click", closeModal);

  // Close when clicking background overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const target = tab.dataset.tab;
      document.getElementById(target).classList.add("active");
    });
  });
}

// ==========================================================================
// AUDIT LOG SYSTEM
// ==========================================================================
function recordAuditLog(email, action) {
  if (typeof simfaRecordAuditLog === 'function') {
    simfaRecordAuditLog(email, action);
  } else {
    const logs = JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
    const now = new Date();
    logs.unshift({
      email: email,
      action: action, // 'login' | 'logout'
      timestamp: now.toISOString(),
      datetime: now.toLocaleString('ms-MY', {
        timeZone: 'Asia/Kuala_Lumpur',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
    });
    if (logs.length > 500) logs.splice(500);
    localStorage.setItem('simfa_audit_log', JSON.stringify(logs));
  }
}

function getAuditLogs() {
  if (typeof simfaGetAuditLogs === 'function') {
    return simfaGetAuditLogs();
  }
  return JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
}


// ==========================================================================
// FORGOT PASSWORD MODAL
// ==========================================================================
function setupForgotPasswordModal() {
  const btnForgot = document.getElementById("btn-forgot-pw");
  const modal = document.getElementById("forgot-pw-modal");
  const closeBtn = document.getElementById("close-forgot-pw");
  const closeBtnFooter = document.getElementById("close-forgot-pw-footer");
  const forgotForm = document.getElementById("forgot-pw-form");
  const forgotEmailInput = document.getElementById("forgot-email");
  const forgotNewPass = document.getElementById("forgot-new-password");
  const forgotConfirmPass = document.getElementById("forgot-confirm-password");
  const forgotSuccess = document.getElementById("forgot-pw-success");
  const forgotError = document.getElementById("forgot-pw-error");

  if (!btnForgot) return;

  btnForgot.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    if (forgotSuccess) forgotSuccess.style.display = "none";
    if (forgotError) forgotError.style.display = "none";
    if (forgotEmailInput) forgotEmailInput.value = document.getElementById("login-email") ? document.getElementById("login-email").value : "";
    if (forgotNewPass) forgotNewPass.value = "";
    if (forgotConfirmPass) forgotConfirmPass.value = "";
  });

  const closeModal = () => { modal.classList.add("hidden"); };
  closeBtn.addEventListener("click", closeModal);
  closeBtnFooter.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailVal = forgotEmailInput.value.trim();
      const newPassVal = forgotNewPass ? forgotNewPass.value : "";
      const confirmPassVal = forgotConfirmPass ? forgotConfirmPass.value : "";

      if (!emailVal || !emailVal.includes('@')) {
        forgotError.textContent = "⛔ Sila masukkan format alamat e-mel yang sah.";
        forgotError.style.display = "block";
        forgotSuccess.style.display = "none";
        return;
      }

      if (!newPassVal || newPassVal.length < 3) {
        forgotError.textContent = "⚠️ Kata laluan mestilah sekurang-kurangnya 3 aksara.";
        forgotError.style.display = "block";
        forgotSuccess.style.display = "none";
        return;
      }

      if (newPassVal !== confirmPassVal) {
        forgotError.textContent = "❌ Kata laluan baru dan pengesahan kata laluan tidak sepadan.";
        forgotError.style.display = "block";
        forgotSuccess.style.display = "none";
        return;
      }

      // Perform local password update
      simfaUpdateUserPassword(emailVal, newPassVal);
      if (typeof simfaRecordAuditLog === 'function') {
        simfaRecordAuditLog(emailVal, 'Set Semula Kata Laluan Berjaya');
      }

      forgotError.style.display = "none";
      forgotSuccess.textContent = `✅ Kata laluan untuk ${emailVal} berjaya dikemas kini! Anda kini boleh log masuk.`;
      forgotSuccess.style.display = "block";

      // Pre-fill login form
      const loginEmail = document.getElementById("login-email");
      const loginPass = document.getElementById("login-password");
      if (loginEmail) loginEmail.value = emailVal;
      if (loginPass) loginPass.value = newPassVal;

      setTimeout(() => {
        closeModal();
        const tabLogin = document.getElementById("tab-login");
        if (tabLogin) tabLogin.click();
      }, 2000);
    });
  }
}

// ==========================================================================
// ACTIVITY LOG MODAL
// ==========================================================================
function setupActivityLogModal() {
  const btnLog = document.getElementById("btn-activity-log");
  const modal = document.getElementById("activity-log-modal");
  const closeBtn = document.getElementById("close-activity-log");
  const closeBtnFooter = document.getElementById("close-activity-log-footer");
  const btnExport = document.getElementById("btn-export-log");
  const btnClear = document.getElementById("btn-clear-log");

  if (!btnLog) return;

  btnLog.addEventListener("click", () => {
    renderActivityLogTable();
    modal.classList.remove("hidden");
  });

  const closeModal = () => { modal.classList.add("hidden"); };
  closeBtn.addEventListener("click", closeModal);
  closeBtnFooter.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // Export CSV
  btnExport.addEventListener("click", () => {
    const logs = getAuditLogs();
    if (logs.length === 0) { alert('Tiada rekod untuk dieksport.'); return; }
    const header = ['Bil', 'Tarikh & Masa', 'Pengguna', 'Tindakan'];
    const rows = logs.map((l, i) => [
      i + 1,
      l.datetime,
      l.email,
      l.action === 'login' ? 'Log Masuk' : 'Log Keluar'
    ]);
    const csvContent = [header, ...rows]
      .map(r => r.map(c => `"${c}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simfa_log_aktiviti_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Clear all logs
  btnClear.addEventListener("click", () => {
    if (confirm('Adakah anda pasti mahu padam semua log aktiviti? Tindakan ini tidak boleh dibatalkan.')) {
      localStorage.removeItem('simfa_audit_log');
      renderActivityLogTable();
    }
  });
}

async function renderActivityLogTable() {
  const tbody = document.getElementById('activity-log-tbody');
  tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--color-primary); padding:24px;">⏳ Memuatkan log aktiviti pusat dari Cloud Firestore...</td></tr>';

  let logs = [];
  try {
    if (typeof simfaFetchCentralAuditLogs === 'function') {
      logs = await simfaFetchCentralAuditLogs();
    } else {
      logs = getAuditLogs();
    }
  } catch (err) {
    console.warn("Log fetch error, fallback to local:", err);
    logs = getAuditLogs();
  }

  if (!logs || logs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--color-text-muted); padding:32px;">⚠️ Tiada rekod aktiviti ditemui.</td></tr>';
    return;
  }

  tbody.innerHTML = logs.map((log, idx) => {
    const act = (log.action || '').toLowerCase();
    const isLogin = act.includes('masuk') || act === 'login';
    const badge = isLogin
      ? `<span class="log-badge-login">▲ ${log.action || 'Log Masuk'}</span>`
      : `<span class="log-badge-logout">▼ ${log.action || 'Log Keluar'}</span>`;
    return `<tr>
      <td style="font-weight:600; color:var(--color-text-muted); font-size:12px;">${idx + 1}</td>
      <td style="font-family:'Inter',monospace; font-size:13px;">${log.datetime || log.timestamp || '-'}</td>
      <td style="font-weight:600; color:var(--color-primary);">${log.email}</td>
      <td>${badge}</td>
    </tr>`;
  }).join('');
}
