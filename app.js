// ==========================================================================
// SIMFA MEDICINE LABEL DESIGNER - APPLICATION LOGIC (SKETCH GRID DESIGN)
// ==========================================================================

// 1. REFINED, DETAILED VECTOR GRAPHICS FOR MEDICINE SYMBOLS
const ICONS = {
  dosage: {
    "half": {
      label: "1/2 Biji",
      svg: `<img class="table-dose-svg" src="icons/SETENGAH BIJI.svg" alt="1/2 Biji">`
    },
    "1": {
      label: "1 Biji",
      svg: `<img class="table-dose-svg" src="icons/SATU BIJI.svg" alt="1 Biji">`
    },
    "2": {
      label: "2 Biji",
      svg: `<img class="table-dose-svg" src="icons/DUA BIJI.svg" alt="2 Biji">`
    },
    "3": {
      label: "3 Biji",
      svg: `<img class="table-dose-svg" src="icons/TIGA BIJI.svg" alt="3 Biji">`
    },
    "3/4": {
      label: "3/4 Biji",
      svg: `<img class="table-dose-svg" src="icons/TIGA PEREMPAT BIJI.svg" alt="3/4 Biji">`
    },
    "1/4": {
      label: "1/4 Biji",
      svg: `<img class="table-dose-svg" src="icons/SUKU BIJI.svg" alt="1/4 Biji">`
    },
    "1_half": {
      label: "1 1/2 Biji",
      svg: `<img class="table-dose-svg" src="icons/SATU BIJI SETENGAH.svg" alt="1 1/2 Biji">`
    },
    "4": {
      label: "4 Biji",
      svg: `<img class="table-dose-svg" src="icons/EMPAT BIJI.svg" alt="4 Biji">`
    },
    "1_sedut": {
      label: "1 Sedutan",
      svg: `<img class="table-dose-svg" src="icons/SEDUT.svg" alt="1 Sedutan">`
    },
    "2_sedut": {
      label: "2 Sedutan",
      svg: `<img class="table-dose-svg" src="icons/DUA_SEDUT.svg" alt="2 Sedutan">`
    },
    "sedut": {
      label: "1 Sedutan",
      svg: `<img class="table-dose-svg" src="icons/SEDUT.svg" alt="1 Sedutan">`
    },
    "dua_sedut": {
      label: "2 Sedutan",
      svg: `<img class="table-dose-svg" src="icons/DUA_SEDUT.svg" alt="2 Sedutan">`
    },
    "1_sembur": {
      label: "1 Semburan",
      svg: `<img class="table-dose-svg" src="icons/SEMBUR_HIDUNG.svg" alt="1 Semburan">`
    },
    "2_sembur": {
      label: "2 Semburan",
      svg: `<img class="table-dose-svg" src="icons/SEMBUR_HIDUNG.svg" alt="2 Semburan">`
    },
    "sembur_hidung": {
      label: "1 Semburan",
      svg: `<img class="table-dose-svg" src="icons/SEMBUR_HIDUNG.svg" alt="1 Semburan">`
    },
    "1_titis_mata": {
      label: "1 Titis Mata",
      svg: `<img class="table-dose-svg" src="icons/TITIS_MATA.svg" alt="1 Titis Mata">`
    },
    "2_titis_mata": {
      label: "2 Titis Mata",
      svg: `<img class="table-dose-svg" src="icons/TITIS_MATA.svg" alt="2 Titis Mata">`
    },
    "titis_mata": {
      label: "1 Titis Mata",
      svg: `<img class="table-dose-svg" src="icons/TITIS_MATA.svg" alt="1 Titis Mata">`
    },
    "1_titis_telinga": {
      label: "1 Titis Telinga",
      svg: `<img class="table-dose-svg" src="icons/TITIS_TELINGA.svg" alt="1 Titis Telinga">`
    },
    "2_titis_telinga": {
      label: "2 Titis Telinga",
      svg: `<img class="table-dose-svg" src="icons/TITIS_TELINGA.svg" alt="2 Titis Telinga">`
    },
    "3_titis_telinga": {
      label: "3 Titis Telinga",
      svg: `<img class="table-dose-svg" src="icons/TITIS_TELINGA.svg" alt="3 Titis Telinga">`
    },
    "titis_telinga": {
      label: "2 Titis Telinga",
      svg: `<img class="table-dose-svg" src="icons/TITIS_TELINGA.svg" alt="2 Titis Telinga">`
    },
    "1_titis_hidung": {
      label: "1 Titis Hidung",
      svg: `<img class="table-dose-svg" src="icons/TITIS_HIDUNG.svg" alt="1 Titis Hidung">`
    },
    "2_titis_hidung": {
      label: "2 Titis Hidung",
      svg: `<img class="table-dose-svg" src="icons/TITIS_HIDUNG.svg" alt="2 Titis Hidung">`
    },
    "titis_hidung": {
      label: "1 Titis Hidung",
      svg: `<img class="table-dose-svg" src="icons/TITIS_HIDUNG.svg" alt="1 Titis Hidung">`
    },
    "sapu": {
      label: "Sapu (Krim / Salap)",
      svg: `<img class="table-dose-svg" src="icons/SAPU.svg" alt="Sapu">`
    },
    "plaster": {
      label: "1 Keping (Pelekat)",
      svg: `<img class="table-dose-svg" src="icons/PLASTER.svg" alt="1 Keping">`
    },
    "kunyah": {
      label: "Kunyah",
      svg: `<img class="table-dose-svg" src="icons/KUNYAH.svg" alt="Kunyah">`
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
      svg: `<img class="table-time-svg" src="icons/PAGI.svg" alt="Pagi">`
    },
    "tengah_hari": {
      label: "Tengah Hari",
      svg: `<img class="table-time-svg" src="icons/TENGAH HARI.svg" alt="Tengah Hari">`
    },
    "petang": {
      label: "Petang",
      svg: `<img class="table-time-svg" src="icons/PETANG.svg" alt="Petang">`
    },
    "malam": {
      label: "Malam",
      svg: `<img class="table-time-svg" src="icons/MALAM VERSI 1.svg" alt="Malam">`
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
      svg: `<img class="table-meal-svg" src="icons/SEBELUM MAKAN VERSI 1.svg" alt="Sebelum Makan – ambil sebelum makan">`
    },
    "selepas": {
      label: "Selepas Makan – ambil selepas makan",
      svg: `<img class="table-meal-svg" src="icons/SELEPAS MAKAN VERSI 2.svg" alt="Selepas Makan – ambil selepas makan">`
    }
  },
  warning: {
    "mengantuk": {
      label: "MENGANTUK",
      svg: `<img class="warning-icon-svg" src="icons/MENGANTUK.svg" alt="MENGANTUK">`
    },
    "cahaya": {
      label: "JAUHI CAHAYA",
      svg: `<img class="warning-icon-svg" src="icons/JAUHI DARI CAHAYA.svg" alt="JAUHI CAHAYA">`
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
      svg: `<img class="warning-icon-svg" src="icons/BAWAH LIDAH.svg" alt="BAWAH LIDAH">`
    },
    "kanak": {
      label: "JAUHI KANAK²",
      svg: `<img class="warning-icon-svg" src="icons/JAUHI DARI KANAK-KANAK.svg" alt="JAUHI KANAK²">`
    },
    "potong": {
      label: "JANGAN POTONG",
      svg: `<img class="warning-icon-svg" src="icons/JANGAN POTONG.svg" alt="JANGAN POTONG">`
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
  insulin_actrapid: {
    "medicineName": "INSULIN HUMAN REGULAR (Actrapid / Insuman Rapid)",
    "schedule": [
      {
        "dosage": "cucuk",
        "timing": "pagi",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      },
      {
        "dosage": "cucuk",
        "timing": "petang",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      },
      {
        "dosage": "cucuk",
        "timing": "malam",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      }
    ],
    "warnings": [
      "sejuk",
      "kanak"
    ]
  },
  insulin_insulatard: {
    "medicineName": "INSULIN NPH / ISOPHANE (Insulatard / Insuman Basal)",
    "schedule": [
      {
        "dosage": "cucuk",
        "timing": "malam",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      }
    ],
    "warnings": [
      "sejuk",
      "kanak"
    ]
  },
  insulin_mixtard: {
    "medicineName": "INSULIN PREMIXED 30/70 (Mixtard 30 / Insuman Comb 30)",
    "schedule": [
      {
        "dosage": "cucuk",
        "timing": "pagi",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      },
      {
        "dosage": "cucuk",
        "timing": "malam",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      }
    ],
    "warnings": [
      "sejuk",
      "kanak"
    ]
  },
  insulin_glargine: {
    "medicineName": "INSULIN GLARGINE (Lantus / Basaglar)",
    "schedule": [
      {
        "dosage": "cucuk",
        "timing": "malam",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      }
    ],
    "warnings": [
      "sejuk",
      "kanak"
    ]
  },
  insulin_aspart: {
    "medicineName": "INSULIN ASPART (NovoRapid)",
    "schedule": [
      {
        "dosage": "cucuk",
        "timing": "pagi",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      },
      {
        "dosage": "cucuk",
        "timing": "tengah_hari",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      },
      {
        "dosage": "cucuk",
        "timing": "malam",
        "customDoseText": "10 Unit",
        "useCucukIcon": true
      }
    ],
    "warnings": [
      "sejuk",
      "kanak"
    ]
  },
  metformin_500: {
    "medicineName": "METFORMIN HCl 500mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  gliclazide_80: {
    "medicineName": "GLICLAZIDE 80mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  gliclazide_30_mr: {
    "medicineName": "GLICLAZIDE 30mg MR Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "potong",
      "kanak"
    ]
  },
  linagliptin_5: {
    "medicineName": "LINAGLIPTIN 5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  empagliflozin_10: {
    "medicineName": "EMPAGLIFLOZIN 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  empagliflozin_25: {
    "medicineName": "EMPAGLIFLOZIN 25mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  dapagliflozin_10: {
    "medicineName": "DAPAGLIFLOZIN 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  amlodipine_5: {
    "medicineName": "AMLODIPINE 5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  amlodipine_10: {
    "medicineName": "AMLODIPINE 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  perindopril_4: {
    "medicineName": "PERINDOPRIL 4mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  perindopril_8: {
    "medicineName": "PERINDOPRIL 8mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  enalapril_5: {
    "medicineName": "ENALAPRIL 5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  enalapril_10: {
    "medicineName": "ENALAPRIL 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  losartan_50: {
    "medicineName": "LOSARTAN 50mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  losartan_100: {
    "medicineName": "LOSARTAN 100mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  telmisartan_40: {
    "medicineName": "TELMISARTAN 40mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  telmisartan_80: {
    "medicineName": "TELMISARTAN 80mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  atenolol_50: {
    "medicineName": "ATENOLOL 50mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  atenolol_100: {
    "medicineName": "ATENOLOL 100mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  bisoprolol_2_5: {
    "medicineName": "BISOPROLOL 2.5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  bisoprolol_5: {
    "medicineName": "BISOPROLOL 5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  metoprolol_50: {
    "medicineName": "METOPROLOL TARTRATE 50mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  metoprolol_100: {
    "medicineName": "METOPROLOL TARTRATE 100mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  frusemide_40: {
    "medicineName": "FRUSEMIDE 40mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  hctz_25: {
    "medicineName": "HYDROCHLOROTHIAZIDE 25mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  spironolactone_25: {
    "medicineName": "SPIRONOLACTONE 25mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  gtn_0_5: {
    "medicineName": "GLYCERYL TRINITRATE 0.5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "bila_perlu"
      }
    ],
    "warnings": [
      "cahaya",
      "lidah"
    ]
  },
  simvastatin_10: {
    "medicineName": "SIMVASTATIN 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  simvastatin_20: {
    "medicineName": "SIMVASTATIN 20mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  simvastatin_40: {
    "medicineName": "SIMVASTATIN 40mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  atorvastatin_20: {
    "medicineName": "ATORVASTATIN 20mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  atorvastatin_40: {
    "medicineName": "ATORVASTATIN 40mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  aspirin_100: {
    "medicineName": "ACETYLSALICYLIC ACID (Aspirin) 100mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kunyah",
      "kanak"
    ]
  },
  aspirin_300: {
    "medicineName": "ACETYLSALICYLIC ACID 300mg Soluble Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kunyah",
      "kanak"
    ]
  },
  clopidogrel_75: {
    "medicineName": "CLOPIDOGREL 75mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  salbutamol_100: {
    "medicineName": "SALBUTAMOL 100mcg/dose Inhalation",
    "schedule": [
      {
        "dosage": "2_sedut",
        "timing": "bila_perlu",
        "customDoseText": "2 Sedutan"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  budesonide_64_nasal: {
    "medicineName": "BUDESONIDE 64mcg Nasal Spray",
    "schedule": [
      {
        "dosage": "1_sembur",
        "timing": "pagi",
        "customDoseText": "1 Semburan"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  symbicort_160: {
    "medicineName": "BUDESONIDE / FORMOTEROL (Symbicort) Inhaler",
    "schedule": [
      {
        "dosage": "1_sedut",
        "timing": "pagi",
        "customDoseText": "1 Sedutan"
      },
      {
        "dosage": "1_sedut",
        "timing": "malam",
        "customDoseText": "1 Sedutan"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  seretide_250: {
    "medicineName": "FLUTICASONE / SALMETEROL (Seretide) Inhaler",
    "schedule": [
      {
        "dosage": "1_sedut",
        "timing": "pagi",
        "customDoseText": "1 Sedutan"
      },
      {
        "dosage": "1_sedut",
        "timing": "malam",
        "customDoseText": "1 Sedutan"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ipratropium_mdi: {
    "medicineName": "IPRATROPIUM BROMIDE MDI Inhaler",
    "schedule": [
      {
        "dosage": "2_sedut",
        "timing": "bila_perlu",
        "customDoseText": "2 Sedutan"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  salbutamol_2mg_tab: {
    "medicineName": "SALBUTAMOL 2mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  salbutamol_4mg_tab: {
    "medicineName": "SALBUTAMOL 4mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  theophylline_125: {
    "medicineName": "THEOPHYLLINE 125mg PR Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "potong",
      "kanak"
    ]
  },
  theophylline_250: {
    "medicineName": "THEOPHYLLINE 250mg PR Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "potong",
      "kanak"
    ]
  },
  betamethasone_0_1_cream: {
    "medicineName": "BETAMETHASONE 17-VALERATE 0.1% Cream",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu Nipis"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu Nipis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  betamethasone_0_1_ointment: {
    "medicineName": "BETAMETHASONE 17-VALERATE 0.1% Ointment",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu Nipis"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu Nipis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  betamethasone_0_01_0_05_cream: {
    "medicineName": "BETAMETHASONE 17-VALERATE 0.01-0.05% Cream",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu Nipis"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu Nipis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  hydrocortisone_1_cream: {
    "medicineName": "HYDROCORTISONE 1% Cream",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu Nipis"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu Nipis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  fusidic_acid_2_cream: {
    "medicineName": "FUSIDIC ACID 2% Cream",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu"
      },
      {
        "dosage": "sapu",
        "timing": "petang",
        "customDoseText": "Sapu"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  clotrimazole_1_cream: {
    "medicineName": "CLOTRIMAZOLE 1% Cream",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  miconazole_2_cream: {
    "medicineName": "MICONAZOLE 2% Cream",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "pagi",
        "customDoseText": "Sapu"
      },
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  aqueous_cream: {
    "medicineName": "AQUEOUS CREAM",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "bila_perlu",
        "customDoseText": "Sapu Kerap"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  calamine_lotion: {
    "medicineName": "CALAMINE LOTION",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "bila_perlu",
        "customDoseText": "Goncang & Sapu"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  benzyl_benzoate_ebb: {
    "medicineName": "BENZYL BENZOATE 25% Emulsion (EBB)",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu Seluruh Badan"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  chloramphenicol_0_5_eye: {
    "medicineName": "CHLORAMPHENICOL 0.5% Eye Drops",
    "schedule": [
      {
        "dosage": "1_titis_mata",
        "timing": "pagi",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "tengah_hari",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "petang",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "malam",
        "customDoseText": "1 Titis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  chloramphenicol_1_eye_ointment: {
    "medicineName": "CHLORAMPHENICOL 1% Eye Ointment",
    "schedule": [
      {
        "dosage": "sapu",
        "timing": "malam",
        "customDoseText": "Sapu Mata"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  chloramphenicol_5_ear: {
    "medicineName": "CHLORAMPHENICOL 5% Ear Drops",
    "schedule": [
      {
        "dosage": "2_titis_telinga",
        "timing": "pagi",
        "customDoseText": "2 Titis"
      },
      {
        "dosage": "2_titis_telinga",
        "timing": "tengah_hari",
        "customDoseText": "2 Titis"
      },
      {
        "dosage": "2_titis_telinga",
        "timing": "malam",
        "customDoseText": "2 Titis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  gentamicin_0_3_eye_ear: {
    "medicineName": "GENTAMICIN 0.3% Eye/Ear Drops",
    "schedule": [
      {
        "dosage": "1_titis_mata",
        "timing": "pagi",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "tengah_hari",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "petang",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "malam",
        "customDoseText": "1 Titis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ciprofloxacin_0_3_eye: {
    "medicineName": "CIPROFLOXACIN 0.3% Eye Drops",
    "schedule": [
      {
        "dosage": "1_titis_mata",
        "timing": "pagi",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "tengah_hari",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "petang",
        "customDoseText": "1 Titis"
      },
      {
        "dosage": "1_titis_mata",
        "timing": "malam",
        "customDoseText": "1 Titis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  artificial_tears: {
    "medicineName": "ARTIFICIAL TEARS Eye Drops",
    "schedule": [
      {
        "dosage": "1_titis_mata",
        "timing": "bila_perlu",
        "customDoseText": "1 Titis"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  amoxicillin_250: {
    "medicineName": "AMOXICILLIN 250mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  amoxicillin_500: {
    "medicineName": "AMOXICILLIN 500mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  augmentin_625: {
    "medicineName": "AUGMENTIN (Amoxicillin/Clavulanate) 625mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  augmentin_1g: {
    "medicineName": "AUGMENTIN (Amoxicillin/Clavulanate) 1g Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  cloxacillin_250: {
    "medicineName": "CLOXACILLIN 250mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "petang",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  cloxacillin_500: {
    "medicineName": "CLOXACILLIN 500mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "petang",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  cephalexin_250: {
    "medicineName": "CEPHALEXIN 250mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  cephalexin_500: {
    "medicineName": "CEPHALEXIN 500mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ciprofloxacin_500: {
    "medicineName": "CIPROFLOXACIN 500mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  azithromycin_250: {
    "medicineName": "AZITHROMYCIN 250mg Tablet",
    "schedule": [
      {
        "dosage": "2",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  doxycycline_100: {
    "medicineName": "DOXYCYCLINE 100mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  metronidazole_200: {
    "medicineName": "METRONIDAZOLE 200mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  metronidazole_400: {
    "medicineName": "METRONIDAZOLE 400mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  bactrim_480: {
    "medicineName": "BACTRIM (Co-trimoxazole) 480mg Tablet",
    "schedule": [
      {
        "dosage": "2",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "2",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  bactrim_960: {
    "medicineName": "BACTRIM FORTE 960mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  omeprazole_20: {
    "medicineName": "OMEPRAZOLE 20mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  pantoprazole_40: {
    "medicineName": "PANTOPRAZOLE 40mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  mmt_tablet: {
    "medicineName": "MAGNESIUM TRISILICATE (MMT) Tablet",
    "schedule": [
      {
        "dosage": "kunyah",
        "timing": "pagi",
        "meal": "sebelum"
      },
      {
        "dosage": "kunyah",
        "timing": "tengah_hari",
        "meal": "sebelum"
      },
      {
        "dosage": "kunyah",
        "timing": "malam",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  metoclopramide_10: {
    "medicineName": "METOCLOPRAMIDE 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "sebelum"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  buscopan_10: {
    "medicineName": "HYOSCINE BUTYLBROMIDE (Buscopan) 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "bila_perlu",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  bisacodyl_5: {
    "medicineName": "BISACODYL 5mg Tablet",
    "schedule": [
      {
        "dosage": "2",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  charcoal_250: {
    "medicineName": "ACTIVATED CHARCOAL 250mg Tablet",
    "schedule": [
      {
        "dosage": "2",
        "timing": "bila_perlu",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ors_sachet: {
    "medicineName": "ORAL REHYDRATION SALTS (ORS) Sachet",
    "schedule": [
      {
        "dosage": "free",
        "timing": "bila_perlu",
        "customDoseText": "1 Bungkus (250ml air)"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  paracetamol_500: {
    "medicineName": "PARACETAMOL 500mg Tablet",
    "schedule": [
      {
        "dosage": "2",
        "timing": "bila_perlu",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  mefenamic_250: {
    "medicineName": "MEFENAMIC ACID 250mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "bila_perlu",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  mefenamic_500: {
    "medicineName": "MEFENAMIC ACID 500mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "bila_perlu",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ibuprofen_200: {
    "medicineName": "IBUPROFEN 200mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ibuprofen_400: {
    "medicineName": "IBUPROFEN 400mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "tengah_hari",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  meloxicam_7_5: {
    "medicineName": "MELOXICAM 7.5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  meloxicam_15: {
    "medicineName": "MELOXICAM 15mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  celecoxib_200: {
    "medicineName": "CELECOXIB 200mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  tramadol_50: {
    "medicineName": "TRAMADOL 50mg Capsule",
    "schedule": [
      {
        "dosage": "1",
        "timing": "bila_perlu",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  colchicine_0_5: {
    "medicineName": "COLCHICINE 0.5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  allopurinol_100: {
    "medicineName": "ALLOPURINOL 100mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  allopurinol_300: {
    "medicineName": "ALLOPURINOL 300mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  chlorpheniramine_4: {
    "medicineName": "CHLORPHENIRAMINE (Piriton) 4mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  cetirizine_10: {
    "medicineName": "CETIRIZINE 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  loratadine_10: {
    "medicineName": "LORATADINE 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  amitriptyline_10: {
    "medicineName": "AMITRIPTYLINE 10mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  amitriptyline_25: {
    "medicineName": "AMITRIPTYLINE 25mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  diazepam_2: {
    "medicineName": "DIAZEPAM 2mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  diazepam_5: {
    "medicineName": "DIAZEPAM 5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "mengantuk",
      "kanak"
    ]
  },
  carbamazepine_200: {
    "medicineName": "CARBAMAZEPINE 200mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  sodium_valproate_200: {
    "medicineName": "SODIUM VALPROATE 200mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      },
      {
        "dosage": "1",
        "timing": "malam",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  folic_acid_5: {
    "medicineName": "FOLIC ACID 5mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  ferrous_fumarate_200: {
    "medicineName": "FERROUS FUMARATE 200mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  iberet_folic: {
    "medicineName": "IBERET FOLIC 500 Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "sebelum"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  vitamin_b_complex: {
    "medicineName": "VITAMIN B COMPLEX Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  vitamin_c_100: {
    "medicineName": "VITAMIN C 100mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  calcium_carbonate_500: {
    "medicineName": "CALCIUM CARBONATE 500mg Tablet",
    "schedule": [
      {
        "dosage": "1",
        "timing": "pagi",
        "meal": "selepas"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  nicotine_15_patch: {
    "medicineName": "NICOTINE 15mg/16hr Transdermal Patch",
    "schedule": [
      {
        "dosage": "plaster",
        "timing": "pagi",
        "customDoseText": "1 Keping"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  nicotine_25_patch: {
    "medicineName": "NICOTINE 25mg/16hr Transdermal Patch",
    "schedule": [
      {
        "dosage": "plaster",
        "timing": "pagi",
        "customDoseText": "1 Keping"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  nicotine_2_gum: {
    "medicineName": "NICOTINE 2mg Chewing Gum",
    "schedule": [
      {
        "dosage": "kunyah",
        "timing": "bila_perlu",
        "customDoseText": "Kunyah"
      }
    ],
    "warnings": [
      "kanak"
    ]
  },
  nicotine_4_gum: {
    "medicineName": "NICOTINE 4mg Chewing Gum",
    "schedule": [
      {
        "dosage": "kunyah",
        "timing": "bila_perlu",
        "customDoseText": "Kunyah"
      }
    ],
    "warnings": [
      "kanak"
    ]
  }
};

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
  
  populatePresetsDropdown();
  loadCustomTemplatesIntoDropdown();
  bindInputListeners();
  setupWalkthroughModal();
  setupForgotPasswordModal();
  setupActivityLogModal();
  setupFeedbackModal();
  renderDynamicRowCustomizer();
  updatePreview();
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

  // GOV Email validator - Hanya domain rasmi kerajaan (.gov.my / .gov)
  function isGovEmail(email) {
    const lower = email.toLowerCase().trim();
    return lower.endsWith('.gov.my') || lower.endsWith('.gov');
  }

  function showAuthError(msg, isSuccess = false) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
    if (isSuccess) {
      errorMsg.style.background = '#ECFDF5';
      errorMsg.style.borderColor = '#A7F3D0';
      errorMsg.style.color = '#065F46';
    } else {
      errorMsg.style.background = '#FEE2E2';
      errorMsg.style.borderColor = '#FECACA';
      errorMsg.style.color = '#991B1B';
    }
    setTimeout(() => { errorMsg.style.display = 'none'; }, 6000);
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

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailVal = document.getElementById("reg-email").value.trim();
    const passVal = document.getElementById("reg-password").value;

    if (!isGovEmail(emailVal)) {
      showAuthError('⛔ E-mel mesti menggunakan domain kerajaan (.gov.my atau .gov). Contoh: nama@bahagian.gov.my');
      return;
    }

    if (passVal.length < 6) {
      showAuthError('⚠️ Kata laluan mestilah sekurang-kurangnya 6 aksara.');
      return;
    }

    const submitBtn = signupForm.querySelector("button[type='submit']");
    const origText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "⏳ Mendaftar akaun...";

    try {
      if (typeof simfaRegisterUser === 'function') {
        const res = await simfaRegisterUser(emailVal, passVal);
        if (res.success) {
          state.userEmail = emailVal;
          saveUserSession(emailVal);
          transitionToWorkspace();
          return;
        } else {
          showAuthError(`❌ Gagal mendaftar: ${res.error || 'Sila cuba lagi'}`);
        }
      } else {
        state.userEmail = emailVal;
        saveUserSession(emailVal);
        transitionToWorkspace();
      }
    } catch (err) {
      showAuthError(`❌ Ralat: ${err.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginEmailVal = document.getElementById("login-email").value.trim();
    const loginPassVal = document.getElementById("login-password").value;

    if (!isGovEmail(loginEmailVal)) {
      showAuthError('⛔ E-mel mesti menggunakan domain kerajaan (.gov.my atau .gov). Contoh: nama@bahagian.gov.my');
      return;
    }

    const submitBtn = loginForm.querySelector("button[type='submit']");
    const origText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "⏳ Mengesahkan...";

    try {
      if (typeof simfaLoginUser === 'function') {
        const res = await simfaLoginUser(loginEmailVal, loginPassVal);
        if (res.success) {
          state.userEmail = loginEmailVal;
          saveUserSession(loginEmailVal);
          transitionToWorkspace();
          return;
        } else {
          showAuthError(res.error || '❌ E-mel atau kata laluan tidak tepat. Sila semak semula.');
        }
      } else {
        // Fallback hardcoded
        const VALID_USERS = [
          { email: 'sadiq@moh.gov.my', password: '123' },
          { email: 'admin@moh.gov.my', password: '123' }
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
      }
    } catch (err) {
      showAuthError(`❌ Ralat semasa log masuk: ${err.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }
  });

  btnLogout.addEventListener("click", async () => {
    recordAuditLog(state.userEmail, 'logout');
    appContainer.classList.add("hidden");
    authContainer.classList.remove("hidden");
    localStorage.removeItem("simfa_active_login");
    
    // Log keluar dari Firebase Auth jika aktif
    if (typeof firebase !== 'undefined' && firebase.auth) {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.warn("Firebase signout error:", err);
      }
    }
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
    const regInp = document.getElementById("reg-email");
    const logInp = document.getElementById("login-email");
    if (regInp) regInp.value = savedEmail;
    if (logInp) logInp.value = savedEmail;
  }

  // Semak sesi Firebase Auth atau sesi aktif tersimpan
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.email) {
        state.userEmail = user.email;
        saveUserSession(user.email);
        transitionToWorkspace(false);
      } else if (activeLogin === "true" && savedEmail) {
        transitionToWorkspace(false);
      }
    });
  } else if (activeLogin === "true" && savedEmail) {
    transitionToWorkspace(false);
  }
}

function transitionToWorkspace(recordLog = true) {
  document.getElementById("auth-container").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  document.getElementById("user-email-display").textContent = state.userEmail;
  localStorage.setItem("simfa_active_login", "true");
  if (recordLog && typeof recordAuditLog === 'function') {
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
    medNameInput.addEventListener("change", (e) => {
      state.medicineName = e.target.value;
      renderDynamicRowCustomizer();
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

  // Carian Pantas Ubat (Taip 2-3 huruf terus cari)
  const searchInput = document.getElementById("preset-search-input");
  const searchResults = document.getElementById("preset-search-results");
  const clearSearchBtn = document.getElementById("btn-clear-search");
  let activeSearchIdx = -1;

  if (searchInput && searchResults) {
    function renderSearchMatches(query) {
      const q = query.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = q.length > 0 ? "block" : "none";
      }
      if (q.length < 1) {
        searchResults.classList.add("hidden");
        searchResults.innerHTML = "";
        activeSearchIdx = -1;
        return;
      }

      const allKeys = Object.keys(PRESETS).filter(k => PRESETS[k] && PRESETS[k].medicineName);
      // Susun: yang bermula dengan huruf carian diutamakan, diikuti yang mengandungi huruf carian
      const startsWithMatches = [];
      const containsMatches = [];

      allKeys.forEach(k => {
        const name = PRESETS[k].medicineName;
        const lower = name.toLowerCase();
        if (lower.startsWith(q)) {
          startsWithMatches.push({ key: k, name });
        } else if (lower.includes(q)) {
          containsMatches.push({ key: k, name });
        }
      });

      startsWithMatches.sort((a, b) => a.name.localeCompare(b.name));
      containsMatches.sort((a, b) => a.name.localeCompare(b.name));
      const matches = [...startsWithMatches, ...containsMatches];

      if (matches.length === 0) {
        searchResults.innerHTML = `<div class="preset-search-empty">Tiada ubat dijumpai untuk "${query}"</div>`;
        searchResults.classList.remove("hidden");
        activeSearchIdx = -1;
        return;
      }

      const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQ})`, 'ig');

      searchResults.innerHTML = matches.map((m, idx) => {
        const highlighted = m.name.replace(regex, '<mark>$1</mark>');
        return `<div class="preset-search-item ${idx === 0 ? 'active' : ''}" data-preset-key="${m.key}" data-idx="${idx}">${highlighted}</div>`;
      }).join("");

      activeSearchIdx = 0;
      searchResults.classList.remove("hidden");

      searchResults.querySelectorAll(".preset-search-item").forEach(item => {
        item.addEventListener("click", () => {
          const key = item.dataset.presetKey;
          presetDropdown.value = key;
          presetDropdown.dispatchEvent(new Event("change"));
          searchInput.value = PRESETS[key].medicineName;
          searchResults.classList.add("hidden");
        });
      });
    }

    searchInput.addEventListener("input", (e) => {
      renderSearchMatches(e.target.value);
    });

    searchInput.addEventListener("focus", (e) => {
      if (e.target.value.trim().length >= 1) {
        renderSearchMatches(e.target.value);
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      const items = searchResults.querySelectorAll(".preset-search-item");
      if (searchResults.classList.contains("hidden") || items.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeSearchIdx = (activeSearchIdx + 1) % items.length;
        items.forEach((el, i) => el.classList.toggle("active", i === activeSearchIdx));
        items[activeSearchIdx].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeSearchIdx = (activeSearchIdx - 1 + items.length) % items.length;
        items.forEach((el, i) => el.classList.toggle("active", i === activeSearchIdx));
        items[activeSearchIdx].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeSearchIdx >= 0 && items[activeSearchIdx]) {
          items[activeSearchIdx].click();
        }
      } else if (e.key === "Escape") {
        searchResults.classList.add("hidden");
      }
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        searchResults.classList.add("hidden");
        searchInput.focus();
      });
    }

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && e.target !== clearSearchBtn) {
        searchResults.classList.add("hidden");
      }
    });
  }

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
    const baseRow = state.schedule[0] || { dosage: "1", timing: "pagi", meal: "selepas" };
    for (let i = currentCount; i < count; i++) {
      state.schedule.push({
        dosage: baseRow.dosage,
        timing: i === 1 ? "malam" : (i === 2 ? "petang" : "tengah_hari"),
        meal: baseRow.meal || "selepas",
        customDoseText: baseRow.customDoseText || "",
        useCucukIcon: baseRow.useCucukIcon || false
      });
    }
  } else if (count < currentCount) {
    state.schedule = state.schedule.slice(0, count);
  }
}

// Detect medicine category for dynamic customizer options
function getMedicineCategory(medName, firstDose) {
  const n = (medName || '').toUpperCase();
  const d = (firstDose || '').toLowerCase();

  if (n.includes('EYE') || n.includes('MATA') || d.includes('mata')) return 'eye';
  if (n.includes('EAR') || n.includes('TELINGA') || n.includes('OTIC') || d.includes('telinga')) return 'ear';
  if (n.includes('NASAL') || n.includes('HIDUNG') || n.includes('SPRAY') || d.includes('sembur') || d.includes('hidung')) return 'nasal';
  if (n.includes('INHAL') || n.includes('MDI') || n.includes('SEDUT') || n.includes('SALBUTAMOL') || n.includes('SYMBICORT') || n.includes('SERETIDE') || n.includes('IPRATROPIUM') || n.includes('AEROHALER') || n.includes('TURBUHALER') || d.includes('sedut')) return 'inhaler';
  if (n.includes('CREAM') || n.includes('KRIM') || n.includes('OINTMENT') || n.includes('SALAP') || n.includes('LOTION') || n.includes('GEL') || n.includes('EMULSION') || d === 'sapu') return 'topical';
  if (n.includes('PATCH') || n.includes('PLASTER') || n.includes('PELEKAT') || d === 'plaster') return 'patch';
  if (n.includes('GUM')) return 'gum';
  if (n.includes('INSULIN') || n.includes('ACTRAPID') || n.includes('INSULATARD') || n.includes('MIXTARD') || n.includes('LANTUS') || n.includes('BASAGLAR') || n.includes('NOVORAPID') || d === 'cucuk') return 'insulin';

  return 'oral';
}

function getDosageOptionsHTML(category, currentDosage) {
  let options = [];
  if (category === 'eye') {
    options = [
      { val: '1_titis_mata', label: '1 Titis Mata' },
      { val: '2_titis_mata', label: '2 Titis Mata' },
      { val: 'sapu', label: 'Sapu (Salap Mata)' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'ear') {
    options = [
      { val: '1_titis_telinga', label: '1 Titis Telinga' },
      { val: '2_titis_telinga', label: '2 Titis Telinga' },
      { val: '3_titis_telinga', label: '3 Titis Telinga' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'nasal') {
    options = [
      { val: '1_sembur', label: '1 Semburan Hidung' },
      { val: '2_sembur', label: '2 Semburan Hidung' },
      { val: '1_titis_hidung', label: '1 Titis Hidung' },
      { val: '2_titis_hidung', label: '2 Titis Hidung' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'inhaler') {
    options = [
      { val: '1_sedut', label: '1 Sedutan' },
      { val: '2_sedut', label: '2 Sedutan' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'topical') {
    options = [
      { val: 'sapu', label: 'Sapu (Krim / Salap)' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'patch') {
    options = [
      { val: 'plaster', label: '1 Keping Pelekat' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'gum') {
    options = [
      { val: 'kunyah', label: 'Kunyah (Gum / Kunyah)' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else if (category === 'insulin') {
    options = [
      { val: 'cucuk', label: 'Unit (Cucuk)' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  } else {
    // Oral / Default (Biji & Tablet Kunyah)
    options = [
      { val: 'half', label: '1/2 Biji' },
      { val: '1', label: '1 Biji' },
      { val: '2', label: '2 Biji' },
      { val: '3', label: '3 Biji' },
      { val: '3/4', label: '3/4 Biji' },
      { val: '1/4', label: '1/4 Biji' },
      { val: '1_half', label: '1 1/2 Biji' },
      { val: '4', label: '4 Biji' },
      { val: 'kunyah', label: 'Kunyah (Tablet Kunyah)' },
      { val: 'free', label: 'Teks Bebas' }
    ];
  }

  function isSelected(val) {
    if (val === currentDosage) return true;
    if (val === '1_sedut' && currentDosage === 'sedut') return true;
    if (val === '2_sedut' && currentDosage === 'dua_sedut') return true;
    if (val === '1_sembur' && currentDosage === 'sembur_hidung') return true;
    if (val === '1_titis_mata' && currentDosage === 'titis_mata') return true;
    if (val === '2_titis_telinga' && currentDosage === 'titis_telinga') return true;
    if (val === '1_titis_hidung' && currentDosage === 'titis_hidung') return true;
    return false;
  }

  const hasCurrent = options.some(opt => isSelected(opt.val));
  if (!hasCurrent && currentDosage) {
    options.unshift({ val: currentDosage, label: currentDosage });
  }

  return options.map(opt => `<option value="${opt.val}" ${isSelected(opt.val) ? 'selected' : ''}>${opt.label}</option>`).join('');
}

// Generate inputs for each active schedule row inside left customizer
function renderDynamicRowCustomizer() {
  const container = document.getElementById("dynamic-rows-container");
  container.innerHTML = "";

  const firstDose = state.schedule[0] ? state.schedule[0].dosage : '';
  const category = getMedicineCategory(state.medicineName, firstDose);
  const isGTN = state.medicineName && (state.medicineName.toUpperCase().includes("GLYCERYL TRINITRATE") || state.medicineName.toUpperCase().includes("GTN"));
  const isNonOral = category !== 'oral' || state.schedule.some(r => ['sedut', 'dua_sedut', '1_sedut', '2_sedut', 'sapu', 'sembur_hidung', '1_sembur', '2_sembur', 'titis_hidung', '1_titis_hidung', '2_titis_hidung', 'titis_mata', '1_titis_mata', '2_titis_mata', 'titis_telinga', '1_titis_telinga', '2_titis_telinga', '3_titis_telinga', 'plaster', 'cucuk'].includes(r.dosage));
  const hideMeal = isGTN || isNonOral;

  state.schedule.forEach((row, index) => {
    const rowCard = document.createElement("div");
    rowCard.className = "config-card row-customizer-card";
    rowCard.style.marginTop = "15px";
    rowCard.style.padding = "15px";
    rowCard.style.border = index === 0 ? "1.5px solid var(--color-primary)" : "1.5px dashed var(--color-accent)";
    rowCard.style.backgroundColor = index === 0 ? "rgba(13, 71, 161, 0.02)" : "rgba(0, 172, 193, 0.01)";

    // Meal select dropdown HTML (only for oral medicines)
    let mealSelectHTML = "";
    if (!hideMeal) {
      mealSelectHTML = `
        <div class="form-group" style="margin-bottom: 0;">
          <label style="font-size: 11.5px;">Makan</label>
          <select class="custom-select row-meal-select" data-row-idx="${index}">
            <option value="sebelum" ${row.meal === 'sebelum' ? 'selected' : ''}>Sebelum Makan</option>
            <option value="selepas" ${row.meal === 'selepas' ? 'selected' : ''}>Selepas Makan</option>
          </select>
        </div>
      `;
    }

    if (index === 0) {
      // CARD 1: Cara Pengambilan & Waktu 1 (Dos dikawal di sini sahaja)
      let extraInputsHTML = "";
      if (row.dosage === 'cucuk') {
        extraInputsHTML = `
          <div class="form-group row-dose-text-group-0" style="margin-top: 10px; margin-bottom: 12px;">
            <label style="font-size: 11.5px; color: var(--color-accent);">Bilangan Unit (Contoh: 10)</label>
            <input type="text" class="custom-select row-dose-text-input" data-row-idx="0" value="${row.customDoseText || ''}" placeholder="Masukkan unit ubat">
          </div>
        `;
      } else if (row.dosage === 'free') {
        extraInputsHTML = `
          <div class="form-group row-dose-text-group-0" style="margin-top: 10px; margin-bottom: 12px;">
            <label style="font-size: 11.5px; color: var(--color-accent);">Teks Bebas / Custom</label>
            <input type="text" class="custom-select row-dose-text-input" data-row-idx="0" value="${row.customDoseText || ''}" placeholder="Contoh: Sapu tipis">
          </div>
          <div class="form-group row-dose-icon-group-0" style="margin-bottom: 12px; display: flex; flex-direction: row; align-items: center; gap: 8px; padding-left: 6px;">
            <input type="checkbox" class="row-dose-icon-checkbox" data-row-idx="0" ${row.useCucukIcon ? 'checked' : ''} style="width: auto; height: 16px; margin: 0;">
            <label style="font-size: 12.5px; text-transform: none; margin-bottom: 0; cursor: pointer; color: var(--color-text-body);">Guna Simbol Cucuk (Syringe)?</label>
          </div>
        `;
      }

      const doseOptions = getDosageOptionsHTML(category, row.dosage);

      rowCard.innerHTML = `
        <h4 style="font-size: 14px; margin-bottom: 12px; color: var(--color-primary); font-weight: 700;">📋 Cara Pengambilan & Waktu 1</h4>
        
        <!-- Dose Pill Select (HANYA PADA KAD 1) -->
        <div class="form-group" style="margin-bottom: 12px;">
          <label style="font-size: 11.5px; font-weight: 600;">Jumlah Ubat (Dos / Cara Pengambilan)</label>
          <select class="custom-select row-dose-select" data-row-idx="0">
            ${doseOptions}
          </select>
        </div>

        ${extraInputsHTML}

        <!-- Time select -->
        <div class="form-group" style="margin-bottom: ${mealSelectHTML ? '12px' : '0'};">
          <label style="font-size: 11.5px;">Waktu 1</label>
          <select class="custom-select row-time-select" data-row-idx="0">
            <option value="pagi" ${row.timing === 'pagi' ? 'selected' : ''}>Pagi</option>
            <option value="tengah_hari" ${row.timing === 'tengah_hari' ? 'selected' : ''}>Tengah Hari</option>
            <option value="petang" ${row.timing === 'petang' ? 'selected' : ''}>Petang</option>
            <option value="malam" ${row.timing === 'malam' ? 'selected' : ''}>Malam</option>
            <option value="bila_perlu" ${row.timing === 'bila_perlu' ? 'selected' : ''}>Bila Perlu</option>
          </select>
        </div>

        ${mealSelectHTML}
      `;

      // Dose select listener on Card 1
      rowCard.querySelector(".row-dose-select").addEventListener("change", (e) => {
        const newDose = e.target.value;
        state.schedule.forEach(r => {
          r.dosage = newDose;
          if (newDose === '1_sedut' || newDose === 'sedut') {
            r.customDoseText = "1 Sedutan";
            r.useCucukIcon = false;
          } else if (newDose === '2_sedut' || newDose === 'dua_sedut') {
            r.customDoseText = "2 Sedutan";
            r.useCucukIcon = false;
          } else if (newDose === '1_sembur' || newDose === 'sembur_hidung') {
            r.customDoseText = "1 Semburan";
            r.useCucukIcon = false;
          } else if (newDose === '2_sembur') {
            r.customDoseText = "2 Semburan";
            r.useCucukIcon = false;
          } else if (newDose === '1_titis_mata' || newDose === 'titis_mata') {
            r.customDoseText = "1 Titis";
            r.useCucukIcon = false;
          } else if (newDose === '2_titis_mata') {
            r.customDoseText = "2 Titis";
            r.useCucukIcon = false;
          } else if (newDose === '1_titis_telinga') {
            r.customDoseText = "1 Titis";
            r.useCucukIcon = false;
          } else if (newDose === '2_titis_telinga' || newDose === 'titis_telinga') {
            r.customDoseText = "2 Titis";
            r.useCucukIcon = false;
          } else if (newDose === '3_titis_telinga') {
            r.customDoseText = "3 Titis";
            r.useCucukIcon = false;
          } else if (newDose === '1_titis_hidung' || newDose === 'titis_hidung') {
            r.customDoseText = "1 Titis";
            r.useCucukIcon = false;
          } else if (newDose === '2_titis_hidung') {
            r.customDoseText = "2 Titis";
            r.useCucukIcon = false;
          } else if (newDose === 'sapu') {
            r.customDoseText = "Sapu Nipis";
            r.useCucukIcon = false;
          } else if (newDose === 'plaster') {
            r.customDoseText = "1 Keping";
            r.useCucukIcon = false;
          } else if (newDose === 'kunyah') {
            r.customDoseText = "Kunyah";
            r.useCucukIcon = false;
          } else if (newDose === 'cucuk') {
            r.customDoseText = r.customDoseText || "10";
            r.useCucukIcon = true;
          } else if (newDose === 'free') {
            r.customDoseText = r.customDoseText || "";
            r.useCucukIcon = false;
          } else {
            r.customDoseText = "";
            r.useCucukIcon = false;
          }
        });
        renderDynamicRowCustomizer();
        updatePreview();
      });

      const textInput = rowCard.querySelector(".row-dose-text-input");
      if (textInput) {
        textInput.addEventListener("input", (e) => {
          state.schedule.forEach(r => r.customDoseText = e.target.value);
          updatePreview();
        });
      }

      const iconCheckbox = rowCard.querySelector(".row-dose-icon-checkbox");
      if (iconCheckbox) {
        iconCheckbox.addEventListener("change", (e) => {
          state.schedule.forEach(r => r.useCucukIcon = e.target.checked);
          updatePreview();
        });
      }

    } else {
      // CARDS 2+: HANYA PILIH WAKTU (DAN MAKAN JIKA ORAL) - TIADA ARAHAN DOS / SAPUAN BERULANG
      rowCard.innerHTML = `
        <h4 style="font-size: 14px; margin-bottom: 12px; color: var(--color-primary); font-weight: 700;">📅 Waktu Pengambilan ${index + 1}</h4>
        
        <!-- Time select -->
        <div class="form-group" style="margin-bottom: ${mealSelectHTML ? '12px' : '0'};">
          <label style="font-size: 11.5px;">Waktu ${index + 1}</label>
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
    }

    // Time select listener
    rowCard.querySelector(".row-time-select").addEventListener("change", (e) => {
      state.schedule[index].timing = e.target.value;
      updatePreview();
    });

    // Meal select listener (if present)
    const mealSelect = rowCard.querySelector(".row-meal-select");
    if (mealSelect) {
      mealSelect.addEventListener("change", (e) => {
        state.schedule[index].meal = e.target.value;
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
  // Check if current drug is GTN or Inhaler/Non-Oral (no meal row needed)
  const isGTN = state.medicineName && (state.medicineName.toUpperCase().includes("GLYCERYL TRINITRATE") || state.medicineName.toUpperCase().includes("GTN"));
  const isNonOral = state.schedule.some(r => ['sedut', 'dua_sedut', '1_sedut', '2_sedut', 'sapu', 'sembur_hidung', '1_sembur', '2_sembur', 'titis_hidung', '1_titis_hidung', '2_titis_hidung', 'titis_mata', '1_titis_mata', '2_titis_mata', 'titis_telinga', '1_titis_telinga', '2_titis_telinga', '3_titis_telinga', 'plaster', 'cucuk'].includes(r.dosage)) ||
    (state.medicineName && (
      state.medicineName.toUpperCase().includes("INHAL") ||
      state.medicineName.toUpperCase().includes("DROPS") ||
      state.medicineName.toUpperCase().includes("SPRAY") ||
      state.medicineName.toUpperCase().includes("PATCH") ||
      state.medicineName.toUpperCase().includes("PLASTER") ||
      state.medicineName.toUpperCase().includes("TITIS") ||
      state.medicineName.toUpperCase().includes("CREAM") ||
      state.medicineName.toUpperCase().includes("OINTMENT") ||
      state.medicineName.toUpperCase().includes("KRIM") ||
      state.medicineName.toUpperCase().includes("SALAP") ||
      state.medicineName.toUpperCase().includes("SALBUTAMOL") ||
      state.medicineName.toUpperCase().includes("GUM")
    ));
  const hideMeal = isGTN || isNonOral;

  // 1. Render Top Header: Drug Name (Auto-fit supaya nama panjang nampak penuh & tidak terpotong)
  const drugNameEl = document.getElementById("label-out-drugname");
  const medText = state.medicineName || "-";
  drugNameEl.textContent = medText;

  const len = medText.length;
  drugNameEl.style.whiteSpace = "nowrap";
  drugNameEl.style.lineHeight = "1.15";
  if (len <= 22) {
    drugNameEl.style.fontSize = "4.6mm";
    drugNameEl.style.letterSpacing = "0.6px";
  } else if (len <= 28) {
    drugNameEl.style.fontSize = "3.9mm";
    drugNameEl.style.letterSpacing = "0.4px";
  } else if (len <= 35) {
    drugNameEl.style.fontSize = "3.3mm";
    drugNameEl.style.letterSpacing = "0.2px";
  } else if (len <= 43) {
    drugNameEl.style.fontSize = "2.85mm";
    drugNameEl.style.letterSpacing = "0px";
  } else {
    // Nama sangat panjang (>43 aksara): benarkan 2 baris supaya jelas & nampak semua
    drugNameEl.style.whiteSpace = "normal";
    drugNameEl.style.fontSize = len <= 55 ? "2.9mm" : "2.6mm";
    drugNameEl.style.letterSpacing = "0px";
    drugNameEl.style.lineHeight = "1.1";
  }

  // Semakan tambahan DOM: jika masih terlebih lebar pada 1 baris, kecilkan atau benarkan 2 baris
  if (drugNameEl.style.whiteSpace === "nowrap" && drugNameEl.scrollWidth > drugNameEl.clientWidth && drugNameEl.clientWidth > 0) {
    drugNameEl.style.whiteSpace = "normal";
    drugNameEl.style.fontSize = "2.85mm";
    drugNameEl.style.letterSpacing = "0px";
    drugNameEl.style.lineHeight = "1.1";
  }

  // 2. Render transposed schedule grid table (Dose | Time | Meal relation as rows, timings as columns)
  const table = document.getElementById("label-schedule-table");
  table.innerHTML = "";
  table.classList.toggle("schedule-table-2rows", hideMeal);

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
    
    if (activeEntry.dosage === '1_sedut' || activeEntry.dosage === 'sedut') {
      doseSvg = ICONS.dosage["1_sedut"].svg;
      doseLabel = activeEntry.customDoseText || "1 Sedutan";
    } else if (activeEntry.dosage === '2_sedut' || activeEntry.dosage === 'dua_sedut') {
      doseSvg = ICONS.dosage["2_sedut"].svg;
      doseLabel = activeEntry.customDoseText || "2 Sedutan";
    } else if (activeEntry.dosage === '1_sembur' || activeEntry.dosage === 'sembur_hidung') {
      doseSvg = ICONS.dosage["1_sembur"].svg;
      doseLabel = activeEntry.customDoseText || "1 Semburan";
    } else if (activeEntry.dosage === '2_sembur') {
      doseSvg = ICONS.dosage["2_sembur"].svg;
      doseLabel = activeEntry.customDoseText || "2 Semburan";
    } else if (activeEntry.dosage === '1_titis_mata' || activeEntry.dosage === 'titis_mata') {
      doseSvg = ICONS.dosage["1_titis_mata"].svg;
      doseLabel = activeEntry.customDoseText || "1 Titis";
    } else if (activeEntry.dosage === '2_titis_mata') {
      doseSvg = ICONS.dosage["2_titis_mata"].svg;
      doseLabel = activeEntry.customDoseText || "2 Titis";
    } else if (activeEntry.dosage === '1_titis_telinga') {
      doseSvg = ICONS.dosage["1_titis_telinga"].svg;
      doseLabel = activeEntry.customDoseText || "1 Titis";
    } else if (activeEntry.dosage === '2_titis_telinga' || activeEntry.dosage === 'titis_telinga') {
      doseSvg = ICONS.dosage["2_titis_telinga"].svg;
      doseLabel = activeEntry.customDoseText || "2 Titis";
    } else if (activeEntry.dosage === '3_titis_telinga') {
      doseSvg = ICONS.dosage["3_titis_telinga"].svg;
      doseLabel = activeEntry.customDoseText || "3 Titis";
    } else if (activeEntry.dosage === '1_titis_hidung' || activeEntry.dosage === 'titis_hidung') {
      doseSvg = ICONS.dosage["1_titis_hidung"].svg;
      doseLabel = activeEntry.customDoseText || "1 Titis";
    } else if (activeEntry.dosage === '2_titis_hidung') {
      doseSvg = ICONS.dosage["2_titis_hidung"].svg;
      doseLabel = activeEntry.customDoseText || "2 Titis";
    } else if (activeEntry.dosage === 'sapu') {
      doseSvg = ICONS.dosage.sapu.svg;
      doseLabel = activeEntry.customDoseText || "Sapu Nipis";
    } else if (activeEntry.dosage === 'plaster') {
      doseSvg = ICONS.dosage.plaster.svg;
      doseLabel = activeEntry.customDoseText || "1 Keping";
    } else if (activeEntry.dosage === 'kunyah') {
      doseSvg = ICONS.dosage.kunyah.svg;
      doseLabel = activeEntry.customDoseText || "Kunyah";
    } else if (activeEntry.dosage === 'cucuk') {
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

    const noTextDoses = ['1_sedut', '2_sedut', 'sedut', 'dua_sedut', 'sapu', '1_sembur', '2_sembur', 'sembur_hidung', 'kunyah'];
    const hideDoseText = noTextDoses.includes(activeEntry.dosage);
    const isSprayDose = ['1_sembur', '2_sembur', 'sembur_hidung'].includes(activeEntry.dosage);

    if (doseSvg) {
      tdDose.innerHTML = `
        <div class="table-cell-content ${hideDoseText ? 'table-cell-content-large-icon' : ''} ${isSprayDose ? 'table-cell-content-spray-icon' : ''}">
          ${doseSvg}
          ${hideDoseText ? '' : `<span class="table-cell-label">${doseLabel}</span>`}
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
  if (!hideMeal) {
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
      "kunyah": "Jangan dikunyah",
      "sedut": "Sedut melalui mulut (Inhaler)",
      "sembur_hidung": "Sembur ke dalam hidung",
      "titis_hidung": "Titis ke dalam hidung",
      "titis_mata": "Titis ke dalam mata",
      "titis_telinga": "Titis ke dalam telinga",
      "plaster": "Tampal pada bahagian berkenaan"
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

// Save Custom Template to Local Storage & Cloud Firestore
async function saveCustomTemplate() {
  const templateName = prompt("Sila masukkan nama template untuk disimpan:", state.medicineName);
  if (!templateName || !templateName.trim()) return;

  const cleanName = templateName.trim();
  const templatePayload = {
    medicineName: state.medicineName,
    schedule: state.schedule.map(row => ({ ...row })),
    warnings: [...state.warnings],
    updatedAt: new Date().toISOString(),
    createdBy: state.userEmail || "Pegawai"
  };

  // 1. Simpan ke Local Storage
  const savedTemplates = JSON.parse(localStorage.getItem("simfa_saved_templates") || "{}");
  savedTemplates[cleanName] = templatePayload;
  localStorage.setItem("simfa_saved_templates", JSON.stringify(savedTemplates));

  // 2. Simpan ke Cloud Firestore (Sync satu PKD Sik)
  if (typeof firebase !== 'undefined' && firebase.apps.length && firebase.firestore) {
    try {
      await firebase.firestore().collection('templates').doc(cleanName).set(templatePayload, { merge: true });
      console.log(`[SiMFa Cloud] Template "${cleanName}" berjaya diselaraskan ke Cloud Firestore.`);
    } catch (err) {
      console.warn("[SiMFa Cloud] Firestore template save error:", err);
    }
  }

  alert(`✅ Template "${cleanName}" telah berjaya disimpan ke Cloud dan Storan Tempatan!`);
  loadCustomTemplatesIntoDropdown();
}

// Load Custom Saved Templates into Medication Presets dropdown (From Local + Cloud Firestore)
async function loadCustomTemplatesIntoDropdown() {
  const dropdown = document.getElementById("medication-preset");
  let savedTemplates = JSON.parse(localStorage.getItem("simfa_saved_templates") || "{}");

  // Sync dari Cloud Firestore jika online
  if (typeof firebase !== 'undefined' && firebase.apps.length && firebase.firestore) {
    try {
      const snap = await firebase.firestore().collection('templates').get();
      if (!snap.empty) {
        snap.forEach(doc => {
          savedTemplates[doc.id] = doc.data();
        });
        localStorage.setItem("simfa_saved_templates", JSON.stringify(savedTemplates));
      }
    } catch (err) {
      console.warn("[SiMFa Cloud] Gagal memuat turun template Cloud:", err.message);
    }
  }

  const customDivider = dropdown.querySelector('optgroup[label="Template Disimpan (Cloud & Lokal)"]');
  if (customDivider) {
    customDivider.remove();
  }

  const oldDivider = dropdown.querySelector('optgroup[label="Template Disimpan"]');
  if (oldDivider) {
    oldDivider.remove();
  }

  const keys = Object.keys(savedTemplates);
  if (keys.length > 0) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = "Template Disimpan (Cloud & Lokal)";

    keys.forEach(key => {
      const opt = document.createElement("option");
      opt.value = `custom_tpl_${key}`;
      opt.textContent = `☁️ ${key}`;
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
  const searchInput = document.getElementById("preset-search-input");
  const clearSearchBtn = document.getElementById("btn-clear-search");
  const searchResults = document.getElementById("preset-search-results");
  if (searchInput) searchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.style.display = "none";
  if (searchResults) searchResults.classList.add("hidden");

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
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailVal = forgotEmailInput.value.trim();
      
      // Validation helper check - Hanya domain kerajaan
      const lower = emailVal.toLowerCase();
      const isValid = lower.endsWith('.gov.my') || lower.endsWith('.gov');

      if (!isValid) {
        forgotError.textContent = "⛔ E-mel mesti menggunakan domain kerajaan (.gov.my / .gov) atau e-mel berdaftar.";
        forgotError.style.display = "block";
        forgotSuccess.style.display = "none";
        return;
      }

      if (typeof simfaResetPassword === 'function') {
        const res = await simfaResetPassword(emailVal);
        if (res.success) {
          forgotError.style.display = "none";
          forgotSuccess.textContent = res.message || `✅ Pautan set semula kata laluan telah dihantar ke e-mel: ${emailVal}`;
          forgotSuccess.style.display = "block";
          forgotEmailInput.value = "";
        } else {
          forgotError.textContent = res.error || "Ralat menghantar emel reset kata laluan.";
          forgotError.style.display = "block";
          forgotSuccess.style.display = "none";
        }
      } else {
        forgotError.style.display = "none";
        forgotSuccess.textContent = `✅ Pautan set semula kata laluan telah dihantar ke e-mel: ${emailVal}`;
        forgotSuccess.style.display = "block";
        forgotEmailInput.value = "";
      }
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
  
  // Render serta-merta daripada log lokal dahulu
  let logs = getAuditLogs();
  updateTableRows(logs);

  // Kemudian tarik log berpusat daripada Firebase Firestore secara masa nyata (Cloud)
  if (typeof simfaFetchCentralAuditLogs === 'function') {
    simfaFetchCentralAuditLogs().then(centralLogs => {
      if (centralLogs && centralLogs.length > 0) {
        updateTableRows(centralLogs);
      }
    }).catch(e => console.warn(e));
  }

  function updateTableRows(logList) {
    if (!tbody) return;
    if (!logList || logList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--color-text-muted); padding:32px;">⚠️ Tiada rekod aktiviti ditemui.</td></tr>';
      return;
    }

    tbody.innerHTML = logList.map((log, idx) => {
      const isLogin = (log.action || '').toLowerCase().includes('masuk') || log.action === 'login';
      const badge = isLogin
        ? `<span class="log-badge-login">▲ ${log.action === 'login' ? 'Log Masuk' : log.action}</span>`
        : `<span class="log-badge-logout">▼ ${log.action === 'logout' ? 'Log Keluar' : log.action}</span>`;
      return `<tr>
        <td style="font-weight:600; color:var(--color-text-muted); font-size:12px;">${idx + 1}</td>
        <td style="font-family:'Inter',monospace; font-size:13px;">${log.datetime || log.timestamp}</td>
        <td style="font-weight:600; color:var(--color-primary);">${log.email}</td>
        <td>${badge}</td>
      </tr>`;
    }).join('');
  }
}

// ==========================================================================
// FEEDBACK SYSTEM (MODAL & CLOUD FIRESTORE)
// ==========================================================================
function setupFeedbackModal() {
  const btnFeedback = document.getElementById("btn-feedback");
  const modal = document.getElementById("feedback-modal");
  const fbText = document.getElementById("fb-text");
  const fbDiscard = document.getElementById("fb-discard");
  const fbDone = document.getElementById("fb-done");
  const fbAlert = document.getElementById("fb-alert");

  if (!btnFeedback || !modal) return;

  btnFeedback.addEventListener("click", () => {
    modal.classList.remove("hidden");
    fbText.value = "";
    if (fbAlert) fbAlert.style.display = "none";
    const senderSpan = document.getElementById("fb-sender-email");
    if (senderSpan) senderSpan.textContent = state.userEmail || "Pegawai PKD";
    setTimeout(() => fbText.focus(), 100);
  });

  const closeModal = () => {
    modal.classList.add("hidden");
    fbText.value = "";
  };

  fbDiscard.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  fbDone.addEventListener("click", async () => {
    const content = fbText.value.trim();
    if (!content) {
      fbText.focus();
      return;
    }

    fbDone.disabled = true;
    fbDone.textContent = "Sending...";

    const feedbackPayload = {
      message: content,
      userEmail: state.userEmail || "Anonymous",
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' })
    };

    // 1. Simpan ke Cloud Firestore (supaya pencipta aplikasi boleh baca di mana-mana)
    if (typeof firebase !== 'undefined' && firebase.apps.length && firebase.firestore) {
      try {
        await firebase.firestore().collection('feedbacks').add(feedbackPayload);
      } catch (err) {
        console.warn("[Feedback] Firestore save error:", err);
      }
    }

    // 2. Sandaran lokal
    const localFeedbacks = JSON.parse(localStorage.getItem('simfa_feedbacks') || '[]');
    localFeedbacks.unshift(feedbackPayload);
    localStorage.setItem('simfa_feedbacks', JSON.stringify(localFeedbacks));

    if (fbAlert) {
      fbAlert.style.display = "block";
      fbAlert.style.background = "#064E3B";
      fbAlert.style.color = "#A7F3D0";
      fbAlert.textContent = "Terima kasih atas maklum balas anda!";
    }

    setTimeout(() => {
      fbDone.disabled = false;
      fbDone.textContent = "Done";
      closeModal();
    }, 1200);
  });
}
