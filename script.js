
//  2.1 DATA 

const kedai = {
  nama: "Kedai Senja",
  pemilik: "Ibu Rina",
  kota: "Yogyakarta",
  tahunBerdiri: 2020,             // number: tahun adalah angka
  sedangBuka: true,               // boolean
  nomorWhatsApp: "08123456789",   // string: nomor telepon tidak dihitung
  website: null,                  // null: sengaja belum ada
  jamOperasional: { buka: "08:00", tutup: "22:00" }
};

const menu = [
  { nama: "Kopi Susu",      kategori: "Minuman", harga: 18000, stok: 20 },
  { nama: "Es Teh Manis",   kategori: "Minuman", harga: 7500,  stok: 30 },
  { nama: "Matcha Latte",   kategori: "Minuman", harga: 22000, stok: 0  },
  { nama: "Roti Bakar",     kategori: "Makanan", harga: 15000, stok: 15 },
  { nama: "Nasi Goreng",    kategori: "Makanan", harga: 25000, stok: 10 },
  { nama: "Pisang Goreng",  kategori: "Makanan", harga: 10000, stok: 25 },
  { nama: "Kentang Goreng", kategori: "Camilan", harga: 12000, stok: 18 },
  { nama: "Donat Gula",     kategori: "Camilan", harga: 8000,  stok: 12 }
];

const transaksiMentah = [
  { kode: "trx-001", pelanggan: " rina WULANDARI ", hari: "Sabtu", uangBayar: "150.000", voucher: " diskon10 ",
    pesanan: [ { menu: " kopi SUSU", jumlah: "2" }, { menu: "roti BAKAR", jumlah: "1" } ] },
  { kode: "trx-002", pelanggan: " budi SANTOso ",  hari: "Jumat", uangBayar: "75000",     voucher: "PROMO5",
    pesanan: [ { menu: "es teh MANIS", jumlah: "3" }, { menu: "nasi GORENG", jumlah: "1" } ] },
  { kode: "trx-003", pelanggan: "  ",              hari: "Minggu", uangBayar: "50000",    voucher: "",
    pesanan: [ { menu: "kopi SUSU", jumlah: "1" } ] },
  { kode: "trx-004", pelanggan: "  ",              hari: "Senin",  uangBayar: "30000",    voucher: "",
    pesanan: [] },
  { kode: "trx-005", pelanggan: " siti AISYAH ",   hari: "Rabu",   uangBayar: "20000",    voucher: " diskon10 ",
    pesanan: [ { menu: "matcha LATTE", jumlah: "2" }, { menu: "donat GULA", jumlah: "0" } ] },
  { kode: "trx-006", pelanggan: " ahmad FAUZI ",   hari: "Kamis",  uangBayar: "50000",    voucher: "",
    pesanan: [ { menu: "kentang GORENG", jumlah: "2" }, { menu: "pisang GORENG", jumlah: "1" } ] }
];

// 2.2 FUNCTION PEMBERSIH

// Function declaration: dipakai untuk fungsi inti pembersih nama.
function bersihkanNama(teks) {
  const dirapikan = teks.trim().replace(/\s+/g, " ").toLowerCase();
  return dirapikan
    .split(" ")
    .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
    .join(" ");
}

// Function expression: konversi angka, karena hanya dipakai sebagai utilitas.
const ubahKeAngka = function (teks) {
  const bersih = String(teks).replace(/\./g, "").replace(/\s/g, "");
  const angka = Number(bersih);
  return Number.isNaN(angka) ? 0 : angka;
};

// Arrow function: singkat dan sekali pakai.
const ambilPersenVoucher = (kode) => {
  const bersih = String(kode).trim().toUpperCase();
  if (!bersih.startsWith("DISKON")) return 0;
  const angka = Number(bersih.replace("DISKON", ""));
  return Number.isNaN(angka) ? 0 : angka;
};

// Arrow function: format rupiah tanpa toLocaleString.
const formatRupiah = (angka) => {
  const teks = String(Math.round(angka));
  let hasil = "";
  for (let i = 0; i < teks.length; i++) {
    const sisa = teks.length - i;
    hasil += teks[i];
    if (sisa > 1 && sisa % 3 === 1) hasil += ".";
  }
  return "Rp " + hasil;
};

// Uji function 
console.log(" UJI FUNCTION ");
console.log(`bersihkanNama("  rina   WULANDARI ") to "${bersihkanNama("  rina   WULANDARI ")}"`);
console.log(`bersihkanNama("")                   to "${bersihkanNama("")}"`);
console.log(`bersihkanNama("budi SANTOso")       to "${bersihkanNama("budi SANTOso")}"`);
console.log(`ubahKeAngka("150.000")              to ${ubahKeAngka("150.000")}`);
console.log(`ubahKeAngka("75000")                to ${ubahKeAngka("75000")}`);
console.log(`ubahKeAngka("abc")                  to ${ubahKeAngka("abc")}`);
console.log(`ambilPersenVoucher(" diskon10 ")    to ${ambilPersenVoucher(" diskon10 ")}`);
console.log(`ambilPersenVoucher("PROMO5")        to ${ambilPersenVoucher("PROMO5")}`);
console.log(`ambilPersenVoucher("")              to ${ambilPersenVoucher("")}`);
console.log(`formatRupiah(1250000)               to "${formatRupiah(1250000)}"`);
console.log(`formatRupiah(500)                   to "${formatRupiah(500)}"`);
console.log(`formatRupiah(0)                     to "${formatRupiah(0)}"`);

//2.3 DATA BERSIH 
const transaksiBersih = [];

for (const trx of transaksiMentah) {
  const pesananBersih = [];
  for (const item of trx.pesanan) {
    pesananBersih.push({
      menu: bersihkanNama(item.menu),
      jumlah: ubahKeAngka(item.jumlah)
    });
  }

  transaksiBersih.push({
    kode: trx.kode.toUpperCase(),
    pelanggan: bersihkanNama(trx.pelanggan),
    hari: trx.hari.trim().toLowerCase(),
    uangBayar: ubahKeAngka(trx.uangBayar),
    persenVoucher: ambilPersenVoucher(trx.voucher),
    pesanan: pesananBersih
  });
}

console.log("\n== TRANSAKSI BERSIH ==");
console.log(transaksiBersih);

 //JAWABAN

// 1. parseInt membaca hanya bagian integer lalu berhenti pada karakter bukan angka. parseFloat membaca sampai desimal. Number mengonversi
//    seluruh string dan mengembalikan NaN jika ada karakter aneh. ubahKeAngka harus menghapus titik karena parseInt("150.000") = 150
//    (berhenti di titik), padahal maksudnya 150000.

// 2. toFixed mengembalikan teks(string). Bukti: typeof (1.5).toFixed(2) = "string". Jika hasil toFixed langsung dijumlahkan dengan angka,
//    terjadi penggabungan string, misal "1.50" + 10 = "1.5010" (bukan 11.5).

// 3. replace mengganti kemunculan pertama saja, replaceAll mengganti semua. Di ubahKeAngka, titik ribuan bisa muncul berkali-kali ("1.250.000"), jadi butuh replaceAll .

// 4. toUpperCase mengembalikan string BARU; string di JavaScript bersifat immutable (tidak bisa diubah). Variabel asli tetap sama sampai di-assign ulang.

// 5. Function declaration: bersihkanNama — dipakai berulang, butuh hoisting.
//    Function expression: ubahKeAngka — utilitas yang cukup disimpan di const.
//    Arrow function: ambilPersenVoucher dan formatRupiah — singkat, tidak butuh this sendiri, dan mudah dibaca sebagai expression.

// BAGIAN 4: LAPORAN HARIAN 

const laporan = {
  jumlahTransaksi: kasir.riwayat.length,
  jumlahLunas: 0,
  jumlahKurang: 0,
  jumlahDitolak: 0,
  pendapatan: 0,
  rataRata: 0,
  transaksiTerbesar: null,
  penjualanPerMenu: {},
  menuTerlaris: "",
  daftarDitolak: [],
  kodeLunas: [],
  ringkasanKode: "",
  menuStokMenipis: []
};

// Hitung status, pendapatan, transaksi terbesar, penjualan per menu, kodeLunas.
for (const trx of kasir.riwayat) {
  if (trx.status === "LUNAS") {
    laporan.jumlahLunas++;
    laporan.pendapatan += trx.total;
    laporan.kodeLunas.push(trx.kode);

    if (laporan.transaksiTerbesar === null || trx.total > laporan.transaksiTerbesar.total) {
      laporan.transaksiTerbesar = trx;
    }

    for (const item of trx.itemValid) {
      const namaMenu = item.menu.nama;
      if (namaMenu in laporan.penjualanPerMenu) {
        laporan.penjualanPerMenu[namaMenu] += item.jumlah;
      } else {
        laporan.penjualanPerMenu[namaMenu] = item.jumlah;
      }
    }
  } else if (trx.status === "KURANG") {
    laporan.jumlahKurang++;
  } else {
    laporan.jumlahDitolak++;
    laporan.daftarDitolak.push({ kode: trx.kode, alasan: trx.alasan });
  }
}

// Rata-rata: hanya dari transaksi LUNAS.
laporan.rataRata = Math.round(laporan.pendapatan / laporan.jumlahLunas);

// Cari menu terlaris dari penjualanPerMenu.
let jumlahTerbanyak = 0;
for (const nama in laporan.penjualanPerMenu) {
  if (laporan.penjualanPerMenu[nama] > jumlahTerbanyak) {
    jumlahTerbanyak = laporan.penjualanPerMenu[nama];
    laporan.menuTerlaris = nama;
  }
}

// Ringkasan kode memakai perulangan dan +=.
for (let i = 0; i < laporan.kodeLunas.length; i++) {
  if (i > 0) laporan.ringkasanKode += ", ";
  laporan.ringkasanKode += laporan.kodeLunas[i];
}

// Menu stok menipis (< 3).
for (const item of kasir.menu) {
  if (item.stok < 3) laporan.menuStokMenipis.push(item.nama);
}

// CETAK LAPORAN


console.log(`LAPORAN HARIAN ${kedai.nama.toUpperCase()}`);
console.log(`Jumlah Transaksi : ${laporan.jumlahTransaksi}`);
console.log(`Lunas            : ${laporan.jumlahLunas}`);
console.log(`Kurang           : ${laporan.jumlahKurang}`);
console.log(`Ditolak          : ${laporan.jumlahDitolak}`);
console.log(`Pendapatan       : ${formatRupiah(laporan.pendapatan)}`);
console.log(`Rata-rata Lunas  : ${formatRupiah(laporan.rataRata)}`);
console.log(`Transaksi Terbesar: ${laporan.transaksiTerbesar.kode} (${formatRupiah(laporan.transaksiTerbesar.total)})`);
console.log(`Menu Terlaris    : ${laporan.menuTerlaris}`);
console.log(`Stok Menipis     : ${laporan.menuStokMenipis.join(", ")}`);
console.log(`Kode Lunas       : ${laporan.ringkasanKode}`);

console.log(" Penjualan per Menu");
for (const nama in laporan.penjualanPerMenu) {
  console.log(`${nama}: ${laporan.penjualanPerMenu[nama]}`);
}

console.log("Object.keys   :", Object.keys(laporan.penjualanPerMenu));
console.log("Object.values :", Object.values(laporan.penjualanPerMenu));

// Cek jumlah kode lunas.
const jumlahKodeDariRingkasan = laporan.ringkasanKode.split(", ").length;
console.log(`Cek jumlah kode: ${jumlahKodeDariRingkasan} vs jumlahLunas ${laporan.jumlahLunas} to ${jumlahKodeDariRingkasan === laporan.jumlahLunas}`);

// Demo array method pada kodeLunas.
console.log(" Demo Array Method");
console.log(`includes("TRX-001"): ${laporan.kodeLunas.includes("TRX-001")}`);
console.log(`indexOf("TRX-002") : ${laporan.kodeLunas.indexOf("TRX-002")}`);
console.log(`slice(0, 2)        : ${laporan.kodeLunas.slice(0, 2)}`);

const salinanKodeLunas = laporan.kodeLunas.slice();
salinanKodeLunas.splice(0, 1);
console.log(`Setelah splice salinan: ${salinanKodeLunas}`);
console.log(`kodeLunas asli        : ${laporan.kodeLunas} (tidak berubah)`);

// JAWABAN

// 1. penjualanPerMenu dibuat object karena setiap nama menu menjadi KUNCI yang unik,  dan kita hanya perlu nilai jumlah per menu — bukan urutan.
//    Bracket notation dipakai karena nama menu berisi spasi (misal "Kopi Susu") yang tidak valid sebagai nama properti dengan dot notation.

// 2. Object.keys menghasilkan array KUNCI, Object.values menghasilkanarray NILAI. Dari kode: Object.keys = ["Kopi Susu", "Roti Bakar", ...], Object.values = [2, 1, ...].

// 3. Yang mengubah array asli: splice. Yang tidak: includes, indexOf,slice. 
//    Bukti: setelah splice pada salinan, isi kodeLunas asli tetap sama saat dicetak.

// 4. rataRata diubah ke angka kembali (Math.round) karena pembagian bisa menghasilkan desimal, dan toFixed mengembalikan STRING. Kalau tidakdiubah,
//    operasi aritmatika berikutnya akan jadi penggabungan string(bug tersembunyi).

// 5. Hasil pengecekan: TRUE — jumlah potongan ringkasanKode.split(", ") sama dengan jumlahLunas. Karena setiap transaksi LUNAS mendorongsatu kode ke kodeLunas, 
//    dan ringkasanKode dibangun dengan memisahkan kode-kode itu memakai ", " — jumlahnya pasti cocok.
