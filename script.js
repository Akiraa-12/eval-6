
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
