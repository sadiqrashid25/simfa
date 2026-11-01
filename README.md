# 🏥 SiMFa - Sistem Pelabelan Ubat Berpiktogram (PKD Sik)

Sistem pereka dan percetakan label ubat pintar berasaskan piktogram (**PictoPharma / SiMFa**) yang direka khas untuk memudahkan pesakit memahami arahan dos, masa, cara pengambilan ubat, dan amaran keselamatan dengan tepat dan jelas.

Disediakan oleh **Pejabat Kesihatan Daerah Sik (PKD Sik)**, Kedah Darul Aman.

---

## 🌟 Ciri-Ciri Utama Sistem

### 1. 💊 Integrasi Penuh Formulari Ubat KKM (FUKKM)
* Mengandungi **1,169 formulasi ubat standard KKM** yang diintegrasikan terus dari portal rasmi Program Perkhidmatan Farmasi KKM.
* Ubat suntikan/infusi intravena ditapis keluar secara automatik, namun **semua 16 jenis insulin klinikal dikekalkan** (*Novomix, Lantus, Toujeo, Insulatard, Actrapid, Mixtard, dsb.*).
* Fungsi pencarian dinamik (*real-time search & filter*) untuk memilih ubat dengan cepat.

### 2. 🎨 Diagram Vektor & Piktogram Dos Lengkap
Sistem menyokong diagram visual berdefinisi tinggi untuk pelbagai bentuk dos ubat:
* **💊 Tablet & Kapsul (Biji)**: Scored tablet (1/2, 1, 2, 3, 3/4, 1/4, 1 1/2, 4 biji).
* **💧 Ubat Titis Mata (*Eye Drops*)**: Diagram mata terbuka dan titisan ubat jatuh ke atas mata.
* **👃 Ubat Titis Hidung (*Nasal Drops*)**: Diagram profil hidung bersama penitis titisan hidung.
* **💨 Semburan Hidung (*Nasal Spray*)**: Diagram botol penyembur *pump spray* dengan semburan kabus (*fine mist*).
* **🫁 Sedutan Inhaler (*MDI*)**: Diagram alat sedutan inhaler bentuk-L dengan kepulan aerosol.
* **🌀 Sedutan Turbuhaler**: Diagram silinder Turbuhaler dengan tapak pemutar (*twist base*) dan kaunter dos.
* **💉 Suntikan / Insulin (*Cucuk*)**: Diagram picagari dengan paparan unit dos kustom.
* **📝 Teks Bebas**: Kebebasan memasukkan arahan khas mengikut preskripsi doktor/pegawai farmasi.

### 3. 📐 Pelarasan Alignment Cetakan Printer Hardware
Menyelesaikan masalah percetakan yang lari atau tersasar pada pelbagai model printer label:
* Pilihan profil printer pantas:
  * **PhIS / eHIS** (Standard Hospital/Klinik Kesihatan KKM)
  * **FiSiCien (L)**
  * **FiSiCien (S)**
* Kawalan gelongsor (*sliders*) paksi **X** dan **Y** dalam milimeter (mm) dari `-25mm` hingga `+25mm`.
* Status badge interaktif pada paparan cetakan untuk akses pantas buka/tutup pelarasan.
* Tetapan disimpan secara automatik dalam simpanan tempatan (*LocalStorage*).

### 4. ⚠️ Label Piktogram Amaran Khas
* Mengantuk (*Drowsy*)
* Jauhi Dari Cahaya (*Protect from Light*)
* Jangan Gigit (*Do not Chew/Bite*)
* Bawah Lidah (*Sublingual*)
* Jauhi Kanak-Kanak (*Keep Away from Children*)
* Jangan Potong (*Do not Crush/Cut*)
* Simpan Sejuk / Peti Sejuk (*Keep Refrigerated 2°C - 8°C*)
* Kunyah Dulu (*Chew Before Swallowing*)
* Larut Dalam Air (*Dissolve in Water*)

### 5. 💾 Pengurusan Templat & Keserasian Luar Talian (PWA)
* Simpan, muat turun, dan eksport/import templat label dalam format JSON.
* Menyokong mod *Offline PWA* (Progressive Web App) dengan *Service Worker* dan *Manifest*.

---

## 📁 Struktur Fail Projek

```text
projek-simfa/
├── index.html              # Antara muka web utama (Responsif & Cetakan 90mm x 60mm)
├── app.js                  # Logik aplikasi, pengurusan state, enjin render label & SVG
├── styles.css              # Sistem reka bentuk CSS, tema moden & gaya @media print
├── fukkm-data.js           # Pangkalan data 1,169 ubat FUKKM lengkap dengan dos & amaran
├── manifest.json           # Konfigurasi PWA (Progressive Web App)
├── sw.js                   # Service Worker untuk mod luar talian (offline)
├── RunServer.bat           # Skrip pantas Windows untuk melancarkan server tempatan
├── fast_server.py          # Server HTTP ringan Python
├── icons/                  # Koleksi ikon SVG piktogram rasmi SiMFa
├── templates.json          # Contoh templat ubat sedia ada
└── README.md               # Dokumentasi lengkap sistem
```

---

## 🚀 Cara Menjalankan Projek

### Pilihan 1: Melalui Skrip Windows (Paling Mudah)
Dwi-klik fail `RunServer.bat`. Pelayar web anda akan dibuka secara automatik pada:
```
http://localhost:8080/
```

### Pilihan 2: Menggunakan Python
Buka terminal dalam direktori projek dan jalankan:
```bash
python fast_server.py 8080
```
Kemudian buka `http://localhost:8080/` pada mana-mana pelayar web (Chrome, Edge, Firefox).

---

## 🖨️ Panduan Cetakan Label (90mm x 60mm)
1. Tekan butang **"Cetak Label (90mm x 60mm)"** atau pintasan `Ctrl + P`.
2. Pada tetapan cetakan pelayar:
   * **Saiz Kertas**: 90mm x 60mm (atau saiz label pencetak Zebra / Toshiba anda).
   * **Margin**: **Tiada (None)**.
   * **Grafik Latar Belakang (Background Graphics)**: **Aktifkan (Checked)**.
3. Sekiranya kedudukan cetakan sedikit tersasar pada printer anda, klik butang **"📐 Alignment Printer"** dan laraskan nilai **X** atau **Y** mengikut keperluan.

---

## 📜 Hak Cipta
&copy; 2026 **Pejabat Kesihatan Daerah Sik (PKD Sik)**. Hak Cipta Terpelihara.
Direka untuk Inovasi KIK & Transformasi Digital Farmasi KKM.
