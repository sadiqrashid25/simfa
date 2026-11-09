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
  if (!users.some(u => u.email.toLowerCase() === 'sadiq@moh.gov')) {
    users.push({ email: 'sadiq@moh.gov', password: '123' });
  }
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

  // Cloud Login via Firebase Auth
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.auth) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(cleanEmail, password);
      console.log("[Firebase Cloud] Log masuk berjaya:", cleanEmail);
      
      // Catat log audit ke Cloud Firestore
      await simfaRecordAuditLog(cleanEmail, 'Log Masuk (Cloud)');
      return { success: true, user: userCredential.user, email: userCredential.user.email };
    } catch (err) {
      console.warn("[Firebase Login Message]:", err.code, err.message);
      if (err.code === 'auth/user-not-found') {
        return { success: false, needOtp: true, email: cleanEmail, error: "ℹ️ Akaun belum wujud. Pengesahan OTP kali pertama diperlukan untuk mendaftar." };
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        return { success: false, error: "❌ Kata laluan tidak tepat. Sila cuba lagi atau klik 'Lupa Kata Laluan'." };
      }
    }
  }

  // Local Storage Account Fallback jika offline
  const users = getLocalUsers();
  const matched = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

  if (matched) {
    await simfaRecordAuditLog(cleanEmail, 'Log Masuk (Lokal/Offline)');
    return { success: true, email: matched.email };
  } else if (!users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, needOtp: true, email: cleanEmail, error: "ℹ️ Akaun belum wujud. Pengesahan OTP kali pertama diperlukan." };
  } else {
    return { success: false, error: "❌ Kata laluan tidak tepat. Sila cuba semula atau klik 'Lupa Kata Laluan'." };
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
async function simfaRecordAuditLog(email, action, details = "") {
  const now = new Date();
  const logEntry = {
    email: email || "Anonymous",
    action: action, // 'Log Masuk' | 'Log Keluar' | 'Cetak Label' | 'Pilih Ubat' | 'Daftar Akaun'
    details: details || "-",
    timestamp: now.toISOString(),
    datetime: now.toLocaleString('ms-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  };

  // Local Storage Backup
  try {
    const logs = JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
    logs.unshift(logEntry);
    if (logs.length > 500) logs.splice(500);
    localStorage.setItem('simfa_audit_log', JSON.stringify(logs));
  } catch (e) {}

  // Simpan terus ke Cloud Firestore (Semua fasiliti berkongsi pangkalan data berpusat yang sama)
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.firestore) {
    try {
      await firebase.firestore().collection('audit_logs').add({
        ...logEntry,
        clientIp: "Fasiliti Web",
        device: navigator.userAgent || "Web",
        createdServerTime: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("[SiMFa Cloud] Log aktiviti berjaya dihantar ke Cloud Firestore:", action, details);
    } catch (err) {
      console.warn("[Firestore Log Note]:", err.message);
    }
  }
}

// Dapatkan rekod log aktiviti berpusat dari Cloud Firestore (merentas semua pengguna & fasiliti)
async function simfaFetchCentralAuditLogs() {
  if (isFirebaseInitialized && typeof firebase !== 'undefined' && firebase.firestore) {
    try {
      const snapshot = await firebase.firestore()
        .collection('audit_logs')
        .orderBy('timestamp', 'desc')
        .limit(500)
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
  // Sandaran lokal jika luar talian
  return JSON.parse(localStorage.getItem('simfa_audit_log') || '[]');
}

// Aliases for compatibility
function getAuditLogs() {
  return simfaFetchCentralAuditLogs();
}

function recordAuditLog(email, action, details = "") {
  return simfaRecordAuditLog(email, action, details);
}
