// ==========================================================================
// SIMFA MEDICINE LABEL DESIGNER - APPLICATION LOGIC (SKETCH GRID DESIGN)
// ==========================================================================

// 1. REFINED, DETAILED VECTOR GRAPHICS FOR MEDICINE SYMBOLS
const ICONS = {
  dosage: {
    "half": {
      label: "1/2 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke-linecap="round" stroke-linejoin="round">
          <!-- Base pill outline -->
          <circle cx="25" cy="25" r="17" fill="#FFFFFF" stroke="#0D47A1" stroke-width="3"/>
          <!-- Active left half (blue fill) -->
          <path d="M 25 25 L 25 8 A 17 17 0 0 0 25 42 Z" fill="#0D47A1"/>
          <!-- Base blue score lines -->
          <line x1="8" y1="25" x2="42" y2="25" stroke="#0D47A1" stroke-width="2"/>
          <line x1="25" y1="8" x2="25" y2="42" stroke="#0D47A1" stroke-width="2"/>
          <!-- White score lines on active left half -->
          <line x1="9" y1="25" x2="25" y2="25" stroke="#FFFFFF" stroke-width="2"/>
          <line x1="25" y1="9" x2="25" y2="41" stroke="#FFFFFF" stroke-width="2"/>
        </g>
      </svg>`
    },
    "1": {
      label: "1 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="17" fill="#0D47A1" stroke="#0D47A1" stroke-width="3"/>
        <line x1="9" y1="25" x2="41" y2="25" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <line x1="25" y1="9" x2="25" y2="41" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    "2": {
      label: "2 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g fill="#0D47A1" stroke="#0D47A1" stroke-width="2.5" stroke-linecap="round">
          <!-- Pill 1 -->
          <circle cx="16" cy="25" r="11"/>
          <line x1="6" y1="25" x2="26" y2="25" stroke="#FFFFFF" stroke-width="1.8"/>
          <line x1="16" y1="15" x2="16" y2="35" stroke="#FFFFFF" stroke-width="1.8"/>
          <!-- Pill 2 -->
          <circle cx="34" cy="25" r="11"/>
          <line x1="24" y1="25" x2="44" y2="25" stroke="#FFFFFF" stroke-width="1.8"/>
          <line x1="34" y1="15" x2="34" y2="35" stroke="#FFFFFF" stroke-width="1.8"/>
        </g>
      </svg>`
    },
    "3": {
      label: "3 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g fill="#0D47A1" stroke="#0D47A1" stroke-width="2.2" stroke-linecap="round">
          <!-- Pill 1 (Top Centered) -->
          <circle cx="25" cy="15" r="9"/>
          <line x1="17" y1="15" x2="33" y2="15" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="25" y1="7" x2="25" y2="23" stroke="#FFFFFF" stroke-width="1.5"/>
          <!-- Pill 2 (Bottom Left) -->
          <circle cx="14" cy="33" r="9"/>
          <line x1="6" y1="33" x2="22" y2="33" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="14" y1="25" x2="14" y2="41" stroke="#FFFFFF" stroke-width="1.5"/>
          <!-- Pill 3 (Bottom Right) -->
          <circle cx="36" cy="33" r="9"/>
          <line x1="28" y1="33" x2="44" y2="33" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="36" y1="25" x2="36" y2="41" stroke="#FFFFFF" stroke-width="1.5"/>
        </g>
      </svg>`
    },
    "3/4": {
      label: "3/4 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke-linecap="round" stroke-linejoin="round">
          <!-- Base pill outline -->
          <circle cx="25" cy="25" r="17" fill="#FFFFFF" stroke="#0D47A1" stroke-width="3"/>
          <!-- Active three quarters (blue fill) -->
          <path d="M 25 25 L 25 8 A 17 17 0 1 0 42 25 Z" fill="#0D47A1"/>
          <!-- Base blue score lines -->
          <line x1="8" y1="25" x2="42" y2="25" stroke="#0D47A1" stroke-width="2"/>
          <line x1="25" y1="8" x2="25" y2="42" stroke="#0D47A1" stroke-width="2"/>
          <!-- White score lines on active quarters -->
          <line x1="9" y1="25" x2="25" y2="25" stroke="#FFFFFF" stroke-width="2"/>
          <line x1="25" y1="25" x2="25" y2="41" stroke="#FFFFFF" stroke-width="2"/>
          <line x1="25" y1="25" x2="41" y2="25" stroke="#FFFFFF" stroke-width="2"/>
        </g>
      </svg>`
    },
    "1/4": {
      label: "1/4 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke-linecap="round" stroke-linejoin="round">
          <!-- Base pill outline -->
          <circle cx="25" cy="25" r="17" fill="#FFFFFF" stroke="#0D47A1" stroke-width="3"/>
          <!-- Active top-right quarter (blue fill) -->
          <path d="M 25 25 L 42 25 A 17 17 0 0 0 25 8 Z" fill="#0D47A1"/>
          <!-- Base blue score lines -->
          <line x1="8" y1="25" x2="42" y2="25" stroke="#0D47A1" stroke-width="2"/>
          <line x1="25" y1="8" x2="25" y2="42" stroke="#0D47A1" stroke-width="2"/>
          <!-- White score lines on active quarter -->
          <line x1="25" y1="25" x2="41" y2="25" stroke="#FFFFFF" stroke-width="2"/>
          <line x1="25" y1="9" x2="25" y2="25" stroke="#FFFFFF" stroke-width="2"/>
        </g>
      </svg>`
    },
    "1_half": {
      label: "1 1/2 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke-linecap="round">
          <!-- Pill 1 (Full, blue fill) -->
          <circle cx="16" cy="25" r="11" fill="#0D47A1" stroke="#0D47A1" stroke-width="2.5"/>
          <line x1="6" y1="25" x2="26" y2="25" stroke="#FFFFFF" stroke-width="1.8"/>
          <line x1="16" y1="15" x2="16" y2="35" stroke="#FFFFFF" stroke-width="1.8"/>
          <!-- Pill 2 (Half, active on right) -->
          <circle cx="34" cy="25" r="11" fill="#FFFFFF" stroke="#0D47A1" stroke-width="2.5"/>
          <path d="M 34 25 L 34 14 A 11 11 0 0 1 34 36 Z" fill="#0D47A1"/>
          <!-- Base blue score lines for Pill 2 -->
          <line x1="24" y1="25" x2="44" y2="25" stroke="#0D47A1" stroke-width="1.8"/>
          <line x1="34" y1="14" x2="34" y2="36" stroke="#0D47A1" stroke-width="1.8"/>
          <!-- White score lines on active right half of Pill 2 -->
          <line x1="34" y1="25" x2="43" y2="25" stroke="#FFFFFF" stroke-width="1.8"/>
          <line x1="34" y1="15" x2="34" y2="35" stroke="#FFFFFF" stroke-width="1.8"/>
        </g>
      </svg>`
    },
    "4": {
      label: "4 Biji",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g fill="#0D47A1" stroke="#0D47A1" stroke-width="2.2" stroke-linecap="round">
          <!-- Pill 1 -->
          <circle cx="15" cy="15" r="8"/>
          <line x1="8" y1="15" x2="22" y2="15" stroke="#FFFFFF" stroke-width="1.2"/>
          <line x1="15" y1="8" x2="15" y2="22" stroke="#FFFFFF" stroke-width="1.2"/>
          <!-- Pill 2 -->
          <circle cx="35" cy="15" r="8"/>
          <line x1="28" y1="15" x2="42" y2="15" stroke="#FFFFFF" stroke-width="1.2"/>
          <line x1="35" y1="8" x2="35" y2="22" stroke="#FFFFFF" stroke-width="1.2"/>
          <!-- Pill 3 -->
          <circle cx="15" cy="35" r="8"/>
          <line x1="8" y1="35" x2="22" y2="35" stroke="#FFFFFF" stroke-width="1.2"/>
          <line x1="15" y1="28" x2="15" y2="42" stroke="#FFFFFF" stroke-width="1.2"/>
          <!-- Pill 4 -->
          <circle cx="35" cy="35" r="8"/>
          <line x1="28" y1="35" x2="42" y2="35" stroke="#FFFFFF" stroke-width="1.2"/>
          <line x1="35" y1="28" x2="35" y2="42" stroke="#FFFFFF" stroke-width="1.2"/>
        </g>
      </svg>`
    },
    "cucuk": {
      label: "Cucuk",
      svg: `<svg class="table-dose-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#0D47A1" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Needle -->
          <line x1="12" y1="38" x2="19" y2="31" stroke-width="1.8" />
          <!-- Syringe Body -->
          <rect x="15" y="13" width="22" height="9" rx="1.5" transform="rotate(-45 26 17.5)" fill="#FFFFFF" />
          <!-- Plunger shaft -->
          <line x1="31" y1="19" x2="39" y2="11" stroke-width="3" />
          <!-- Plunger top -->
          <line x1="36" y1="8" x2="42" y2="14" stroke-width="3" />
          <!-- Measurement tick marks -->
          <line x1="21" y1="21" x2="23" y2="23" stroke-width="1.2" />
          <line x1="24" y1="18" x2="26" y2="20" stroke-width="1.2" />
          <line x1="27" y1="15" x2="29" y2="17" stroke-width="1.2" />
          <!-- Liquid level/fill -->
          <path d="M 17 31 L 25 23 L 29 27 L 21 35 Z" fill="#0D47A1" opacity="0.3" stroke="none" />
          <!-- Droplet at needle tip -->
          <path d="M 9 41 C 9 41 8 44 10 44 C 11 44 11 41 9 41 Z" fill="#0D47A1" stroke="none" />
        </g>
      </svg>`
    }
  },
  timing: {
    "pagi": {
      label: "Pagi",
      svg: `<svg class="table-time-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FFB300" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 6 36 L 44 36" stroke="#263238" stroke-width="2.5"/>
          <path d="M 16 36 A 9 9 0 0 1 34 36 Z" fill="#FFE082"/>
          <line x1="25" y1="22" x2="25" y2="18"/>
          <line x1="14" y1="27" x2="11" y2="24"/>
          <line x1="36" y1="27" x2="39" y2="24"/>
          <line x1="19" y1="22" x2="17" y2="19"/>
          <line x1="31" y1="22" x2="33" y2="19"/>
          <path d="M 25 12 L 25 3 M 21 7 L 25 3 L 29 7" stroke="#0D47A1" stroke-width="2.8"/>
        </g>
      </svg>`
    },
    "tengah_hari": {
      label: "Tengah Hari",
      svg: `<svg class="table-time-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FFB300" stroke-width="2.5" fill="none" stroke-linecap="round">
          <circle cx="25" cy="25" r="9" fill="#FFB300"/>
          <line x1="25" y1="11" x2="25" y2="6"/>
          <line x1="25" y1="39" x2="25" y2="44"/>
          <line x1="11" y1="25" x2="6" y2="25"/>
          <line x1="39" y1="25" x2="44" y2="25"/>
          <line x1="15" y1="15" x2="11" y2="11"/>
          <line x1="35" y1="35" x2="39" y2="39"/>
          <line x1="15" y1="35" x2="11" y2="39"/>
          <line x1="35" y1="15" x2="39" y2="11"/>
        </g>
      </svg>`
    },
    "petang": {
      label: "Petang",
      svg: `<svg class="table-time-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FFB300" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 6 36 L 44 36" stroke="#263238" stroke-width="2.5"/>
          <path d="M 16 36 A 9 9 0 0 1 34 36 Z" fill="#FFE082"/>
          <line x1="25" y1="23" x2="25" y2="19"/>
          <line x1="15" y1="27" x2="12" y2="24"/>
          <line x1="35" y1="27" x2="38" y2="24"/>
          <path d="M 25 3 L 25 12 M 21 8 L 25 12 L 29 8" stroke="#0D47A1" stroke-width="2.8"/>
        </g>
      </svg>`
    },
    "malam": {
      label: "Malam",
      svg: `<svg class="table-time-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 16 11 A 14 14 0 0 0 31 31 A 12 12 0 1 1 16 11 Z" fill="#0D47A1" stroke="#0D47A1" stroke-width="1.8"/>
          <path d="M 33 11 L 34.5 13.5 L 37 14.5 L 34.5 15.5 L 33 18 L 31.5 15.5 L 29 14.5 L 31.5 13.5 Z" fill="#FFB300"/>
          <path d="M 11 31 L 12 32.5 L 14 33 L 12 33.5 L 11 35 L 10 33.5 L 8 33 L 10 32.5 Z" fill="#FFB300"/>
        </g>
      </svg>`
    },
    "bila_perlu": {
      label: "Bila Perlu",
      svg: `<svg class="table-time-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#0D47A1" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 25 12 C 25 12, 16 18, 16 26 C 16 31, 20 35, 25 35 C 30 35, 34 31, 34 26 C 34 18, 25 12, 25 12 Z" fill="#FFE082" opacity="0.4" stroke="#263238" stroke-width="2" />
          <path d="M 10 26 L 18 26 L 21 17 L 25 33 L 28 23 L 31 26 L 40 26" stroke="#D32F2F" stroke-width="2.5" />
        </g>
      </svg>`
    },
    "sebelum": {
      label: "Sebelum Makan – ambil sebelum makan",
      svg: `<svg class="table-meal-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#263238" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Plate with food cover -->
          <path d="M 13 28 A 12 12 0 0 1 37 28 Z" fill="#ECEFF1" stroke="#263238" stroke-width="2.5"/>
          <circle cx="25" cy="14" r="2" fill="#263238"/>
          <path d="M 8 32 L 42 32" stroke="#263238" stroke-width="3"/>
          <!-- Thick Fork on the Left -->
          <path d="M 5 22 L 5 32" stroke="#263238" stroke-width="2.5"/>
          <path d="M 3 14 L 3 22 C 3 24, 7 24, 7 22 L 7 14" stroke="#263238" stroke-width="2.5"/>
          <line x1="5" y1="14" x2="5" y2="20" stroke="#263238" stroke-width="2.5"/>
          <!-- Thick Spoon on the Right -->
          <path d="M 45 22 L 45 32" stroke="#263238" stroke-width="2.5"/>
          <ellipse cx="45" cy="18" rx="4" ry="5.5" fill="#ECEFF1" stroke="#263238" stroke-width="2.5"/>
        </g>
      </svg>`
    },
    "selepas": {
      label: "Selepas Makan – ambil selepas makan",
      svg: `<svg class="table-meal-svg" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#263238" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Plate in the center -->
          <circle cx="25" cy="25" r="11" fill="#ECEFF1" stroke="#263238" stroke-width="2.5"/>
          <!-- Food item on plate -->
          <path d="M 21 25 C 21 23, 29 23, 29 25 Z" fill="#B0BEC5" stroke="#263238" stroke-width="2"/>
          <!-- Thick Fork on the Left -->
          <path d="M 7 22 L 7 32" stroke="#263238" stroke-width="2.5"/>
          <path d="M 5 14 L 5 22 C 5 24, 9 24, 9 22 L 9 14" stroke="#263238" stroke-width="2.5"/>
          <line x1="7" y1="14" x2="7" y2="20" stroke="#263238" stroke-width="2.5"/>
          <!-- Thick Spoon on the Right -->
          <path d="M 43 22 L 43 32" stroke="#263238" stroke-width="2.5"/>
          <ellipse cx="43" cy="18" rx="4" ry="5.5" fill="#ECEFF1" stroke="#263238" stroke-width="2.5"/>
        </g>
      </svg>`
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
};;

// 3. APPLICATION STATE
const state = {
  userEmail: "user@email.com",
  medicineName: "METFORMIN 500mg",
  schedule: [
    { dosage: "1", timing: "pagi", meal: "selepas" },
    { dosage: "1", timing: "malam", meal: "selepas" }
  ],
  warnings: ["gigit"]
};

// ==========================================================================
// INITIALIZATION AND SELECTOR GENERATORS
// ==========================================================================
function populatePresetsDropdown() {
  const dropdown = document.getElementById("medication-preset");
  if (!dropdown) return;

  // Clear existing options except custom
  dropdown.innerHTML = '<option value="custom">-- Pilihan Custom --</option>';

  // Sort presets alphabetically by medicineName
  const sortedKeys = Object.keys(PRESETS)
    .filter(key => !key.startsWith("custom_tpl_") && !key.startsWith("shared_tpl_"))
    .sort((a, b) => PRESETS[a].medicineName.localeCompare(PRESETS[b].medicineName));

  // Add all sorted presets
  sortedKeys.forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = PRESETS[key].medicineName;
    dropdown.appendChild(opt);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuthFlow();
  loadSavedUserSession();
  generateWarningsSelector();
  
  // Load shared templates from templates.json first
  loadSharedTemplatesFromFile().then(() => {
    populatePresetsDropdown();
    loadSharedTemplatesIntoDropdown();
    loadCustomTemplatesIntoDropdown();
    bindInputListeners();
    setupWalkthroughModal();
    setupForgotPasswordModal();
    setupActivityLogModal();
    renderDynamicRowCustomizer();
    updatePreview();
  });
});

// Mock Authentication Tab Switches and Submissions
function setupAuthFlow() {
  const tabSignup = document.getElementById("tab-signup");
  const tabLogin = document.getElementById("tab-login");
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const authContainer = document.getElementById("auth-container");
  const appContainer = document.getElementById("app-container");
  const btnLogout = document.getElementById("btn-logout");
  const errorMsg = document.getElementById("auth-error-msg");

  // GOV Email validator
  function isGovEmail(email) {
    const lower = email.toLowerCase().trim();
    return lower.endsWith('.gov.my') || lower.endsWith('.gov') || lower === 'sadiqrashid25@gmail.com';
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
    if (!isGovEmail(emailVal)) {
      showAuthError('⛔ E-mel mesti menggunakan domain kerajaan (.gov.my atau .gov). Contoh: nama@bahagian.gov.my');
      return;
    }
    state.userEmail = emailVal;
    saveUserSession(emailVal);
    transitionToWorkspace();
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginEmailVal = document.getElementById("login-email").value.trim();
    const loginPassVal = document.getElementById("login-password").value;

    if (!isGovEmail(loginEmailVal)) {
      showAuthError('⛔ E-mel mesti menggunakan domain kerajaan (.gov.my atau .gov). Contoh: nama@bahagian.gov.my');
      return;
    }

    // Hardcoded GOV credentials check
    const VALID_USERS = [
      { email: 'sadiq@moh.gov', password: '123' },
      { email: 'sadiqrashid25@gmail.com', password: '123' }
    ];

    const matched = VALID_USERS.find(u =>
      u.email.toLowerCase() === loginEmailVal.toLowerCase() && u.password === loginPassVal
    );

    if (!matched) {
      showAuthError('❌ E-mel atau kata laluan tidak tepat. Sila cuba semula.');
      return;
    }

    state.userEmail = loginEmailVal;
    saveUserSession(loginEmailVal);
    transitionToWorkspace();
  });

  btnLogout.addEventListener("click", () => {
    recordAuditLog(state.userEmail, 'logout');
    appContainer.classList.add("hidden");
    authContainer.classList.remove("hidden");
    localStorage.removeItem("simfa_active_login");
  });
}

function saveUserSession(email) {
  localStorage.setItem("simfa_user_email", email);
}

function loadSavedUserSession() {
  const savedEmail = localStorage.getItem("simfa_user_email");
  const activeLogin = localStorage.getItem("simfa_active_login");
  if (savedEmail) {
    state.userEmail = savedEmail;
    document.getElementById("reg-email").value = savedEmail;
    document.getElementById("login-email").value = savedEmail;
  }
  if (activeLogin === "true") {
    transitionToWorkspace();
  }
}

function transitionToWorkspace() {
  document.getElementById("auth-container").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  document.getElementById("user-email-display").textContent = state.userEmail;
  localStorage.setItem("simfa_active_login", "true");
  recordAuditLog(state.userEmail, 'login');
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
          <span class="table-cell-label">${doseLabel}</span>
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
          <span class="table-cell-label">${timeObj.label}</span>
        </div>
      `;
    } else {
      tdTime.innerHTML = "";
    }
    
    const mealObj = ICONS.timing[activeEntry.meal];
    if (mealObj) {
      const mealLabel = mealObj.label.split(" – ")[0];
      tdMeal.innerHTML = `
        <div class="table-cell-content">
          ${mealObj.svg}
          <span class="table-cell-label">${mealLabel}</span>
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
    
    // Caption text mapping (short Malay phrases for medical instruction)
    const captions = {
      "mengantuk": "Boleh menyebabkan mengantuk",
      "cahaya": "Jauhi dari cahaya matahari",
      "gigit": "Jangan digigit / dikunyah",
      "lidah": "Letak di bawah lidah",
      "kanak": "Jauhkan dari kanak-kanak",
      "potong": "Jangan dipotong",
      "sejuk": "Simpan di peti sejuk",
      "kunyah": "Jangan dikunyah"
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

// Load shared templates from file at startup
function loadSharedTemplatesFromFile() {
  return fetch('templates.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('templates.json fail to load or does not exist');
      }
      return response.json();
    })
    .then(sharedTemplates => {
      if (sharedTemplates && typeof sharedTemplates === 'object') {
        Object.keys(sharedTemplates).forEach(key => {
          const presetKey = `shared_tpl_${key}`;
          PRESETS[presetKey] = sharedTemplates[key];
        });
      }
    })
    .catch(err => {
      console.log('Shared templates from file could not be loaded:', err.message);
    });
}

// Populate shared templates into dropdown menu
function loadSharedTemplatesIntoDropdown() {
  const dropdown = document.getElementById("medication-preset");
  if (!dropdown) return;

  const sharedDivider = dropdown.querySelector('optgroup[label="Template Berkongsi"]');
  if (sharedDivider) {
    sharedDivider.remove();
  }

  const keys = Object.keys(PRESETS).filter(key => key.startsWith("shared_tpl_"));
  if (keys.length > 0) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = "Template Berkongsi";

    keys.forEach(key => {
      const opt = document.createElement("option");
      opt.value = key;
      const tplName = key.substring("shared_tpl_".length);
      opt.textContent = tplName;
      optgroup.appendChild(opt);
    });

    // Insert at the top of the option groups (before custom templates)
    const customDivider = dropdown.querySelector('optgroup[label="Template Disimpan"]');
    if (customDivider) {
      dropdown.insertBefore(optgroup, customDivider);
    } else {
      dropdown.appendChild(optgroup);
    }
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
    // Load preview icons in the symbols tab dynamically
    document.getElementById("preview-sym-1").innerHTML = ICONS.dosage["1"].svg;
    document.getElementById("preview-sym-half").innerHTML = ICONS.dosage["half"].svg;
    document.getElementById("preview-sym-2").innerHTML = ICONS.dosage["2"].svg;
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
  // Keep max 500 records
  if (logs.length > 500) logs.splice(500);
  localStorage.setItem('simfa_audit_log', JSON.stringify(logs));
}

function getAuditLogs() {
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
  const forgotSuccess = document.getElementById("forgot-pw-success");
  const forgotError = document.getElementById("forgot-pw-error");

  if (!btnForgot) return;

  btnForgot.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    if (forgotSuccess) forgotSuccess.style.display = "none";
    if (forgotError) forgotError.style.display = "none";
    if (forgotEmailInput) forgotEmailInput.value = "";
  });

  const closeModal = () => { modal.classList.add("hidden"); };
  closeBtn.addEventListener("click", closeModal);
  closeBtnFooter.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailVal = forgotEmailInput.value.trim();
      
      // Validation helper check
      const lower = emailVal.toLowerCase();
      const isValid = lower.endsWith('.gov.my') || lower.endsWith('.gov') || lower === 'sadiqrashid25@gmail.com';

      if (!isValid) {
        forgotError.textContent = "⛔ E-mel mesti menggunakan domain kerajaan (.gov.my / .gov) atau e-mel berdaftar.";
        forgotError.style.display = "block";
        forgotSuccess.style.display = "none";
        return;
      }

      forgotError.style.display = "none";
      forgotSuccess.textContent = `✅ Pautan set semula kata laluan telah dihantar ke e-mel: ${emailVal}`;
      forgotSuccess.style.display = "block";
      forgotEmailInput.value = "";
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

function renderActivityLogTable() {
  const tbody = document.getElementById('activity-log-tbody');
  const logs = getAuditLogs();

  if (logs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--color-text-muted); padding:32px;">⚠️ Tiada rekod aktiviti ditemui.</td></tr>';
    return;
  }

  tbody.innerHTML = logs.map((log, idx) => {
    const isLogin = log.action === 'login';
    const badge = isLogin
      ? `<span class="log-badge-login">▲ Log Masuk</span>`
      : `<span class="log-badge-logout">▼ Log Keluar</span>`;
    return `<tr>
      <td style="font-weight:600; color:var(--color-text-muted); font-size:12px;">${idx + 1}</td>
      <td style="font-family:'Inter',monospace; font-size:13px;">${log.datetime}</td>
      <td style="font-weight:600; color:var(--color-primary);">${log.email}</td>
      <td>${badge}</td>
    </tr>`;
  }).join('');
}
