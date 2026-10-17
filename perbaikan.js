// langkah ke-6
const TARIF_PAJAK = 0.11;
const harga = { kopi: 20000, teh: 7500, roti: 15000 };
let keranjang = ["kopi", "teh", "roti", "teh"];
let jumlahMember = 5;                    // FIX: "5" to 5 (string bikin concat)

const pelanggan = {
  nama: "rina",
  saldo: 100000,
  bayar(jumlah) {
    this.saldo -= jumlah;                // FIX: tambah this.
    return this.saldo;                   // FIX: tambah this.
  },
};

let subtotal = 0;
for (let i = 0; i < keranjang.length; i++) {   // FIX: <= to <
  subtotal += harga[keranjang[i]];
}

let persen;
if (subtotal >= 50000) { persen = 10; }        // FIX: urutan if dibalik
else if (subtotal >= 25000) { persen = 5; }
else { persen = 0; }
let diskon = (subtotal * persen) / 100;

let hari = "jumat";
let promo;
switch (hari) {
  case "jumat":
    promo = 3000;
    break;                               // FIX: tambah break
  case "sabtu":
  case "minggu":
    promo = 5000;
    break;
  default:
    promo = 0;
}

let pajak = (subtotal - diskon - promo) * TARIF_PAJAK;   // FIX: tambah kurung
let total = subtotal - diskon - promo + pajak;

let uangBayarTeks = "100.000";
let uangBayar = Number(uangBayarTeks.replace(".", ""));  // FIX: parseInt to Number + replace
let kembalian = uangBayar - total;

let status;
if (uangBayar >= total) { status = "Lunas"; }            // FIX: = to >=
else { status = "Kurang"; }

let namaRapi = pelanggan.nama.slice(0, 1).toUpperCase() + pelanggan.nama.slice(1);   // FIX: slice(0) to slice(1)

keranjang.splice(1, 1);   // FIX: slice to splice
keranjang.push("air");    // FIX: unshift to push

let jumlahMemberBaru = jumlahMember + 1;

let rataRata = total / 4;                 // FIX: jangan toFixed di sini
let rataRataTotal = rataRata + 10;

function formatRupiah(angka) {
  return "Rp " + angka;                   // FIX: tambah return
}

console.log(subtotal, diskon, promo, pajak, total);
console.log(uangBayar, kembalian, status);
console.log(namaRapi);
console.log(keranjang);
console.log(jumlahMemberBaru);
console.log(rataRataTotal.toFixed(2));
console.log(formatRupiah(kembalian));
console.log(pelanggan.bayar(30000));
for (let kunci in harga) {                // FIX: of to in
  console.log(kunci + ": " + harga[kunci]);
}

// Catatan Bug : 15 Kesalahan 
// 1. jumlahMember = "5" — Tidak error, hasil salah. String membuat "5" + 1 jadi "51". Perbaikan: ubah ke number 5.

// 2. saldo -= jumlah — Error (ReferenceError). saldo bukan variabel global, harus this.saldo. Perbaikan: tambah this..

// 3. return saldo — Error (ReferenceError). Sama seperti no.2. Perbaikan: return this.saldo.

// 4. i <= keranjang.length — Tidak error, hasil NaN. Indeks terakhir di luar array. Perbaikan: ganti <= jadi <.

// 5. Urutan if diskon — Tidak error, hasil salah. >=25000 dicek dulu padahal 50000 juga memenuhinya. Perbaikan: cek >=50000 dulu.

// 6. case "jumat" tanpa break — Tidak error, hasil salah. Fall-through ke case berikutnya. Perbaikan: tambah break.

// 7. promo * TARIF_PAJAK — Tidak error, hasil salah. * lebih tinggi prioritas dari -. Perbaikan: bungkus (subtotal - diskon - promo).

// 8. parseInt("100.000") — Tidak error, hasil salah (100). parseInt berhenti di titik. Perbaikan: Number(str.replace(".", "")).

// 9. if (uangBayar = total) — Tidak error, hasil salah. = itu assignment, bukan perbandingan. Perbaikan: ganti >=.

// 10. slice(0) bagian kedua — Tidak error, hasil salah ("RRina"). Ambil semua huruf. Perbaikan: slice(1).

// 11. keranjang.slice(1,1) — Tidak error, hasil salah. slice tidak mengubah array. Perbaikan: splice(1,1).

// 12. keranjang.unshift("air") — Tidak error, hasil salah. unshift tambah di awal. Perbaikan: push("air").

// 13. (total/4).toFixed(2) + 10 — Tidak error, hasil salah. toFixed hasilkan string. Perbaikan: simpan number, toFixed saat cetak.

// 14. formatRupiah tanpa return — Tidak error, hasil undefined. Perbaikan: tambah return.

// 15. for...of harga — Error (TypeError). Object tidak iterable dengan for...of. Perbaikan: ganti for...in.    

// Jawaban Pertanyaan
// 1. Kenapa if (uangBayar = total) tidak error?
// Karena = adalah assignment. uangBayar diubah jadi total, dan expression-nya bernilai truthy sehingga kondisi true.

// 2. Kenapa parseInt("100.000") = 100?
// Karena parseInt berhenti membaca saat menemukan titik (bukan digit). Perbaikan: hapus titik dulu to Number("100.000".replace(".", "")).