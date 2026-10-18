// FUNCTION TAMBAHAN 

// 1) hitungFaktorial: rekursif, sederhana dan mudah dibaca.
function hitungFaktorial(n) {
  if (n < 0) return null;
  if (n === 0 || n === 1) return 1;
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

// 2) cekPalindrom: dua pointer dari depan & belakang, tanpa reverse.
function cekPalindrom(teks) {
  const bersih = teks.trim().toLowerCase();
  if (bersih === "") return false;

  let kiri = 0;
  let kanan = bersih.length - 1;
  while (kiri < kanan) {
    if (bersih[kiri] !== bersih[kanan]) return false;
    kiri++;
    kanan--;
  }
  return true;
}

// 3) hitungVokal: hitung huruf vokal dengan for...of.
function hitungVokal(teks) {
  const vokal = "aiueo";
  let jumlah = 0;
  for (const huruf of teks.toLowerCase()) {
    if (vokal.includes(huruf)) jumlah++;
  }
  return jumlah;
}

// 4) cariTerbesar: for biasa untuk melacak indeks, tanpa Math.max.
function cariTerbesar(daftar) {
  if (daftar.length === 0) return null;

  let nilai = daftar[0];
  let indeks = 0;

  for (let i = 1; i < daftar.length; i++) {
    if (daftar[i] > nilai) {
      nilai = daftar[i];
      indeks = i;
    }
  }
  return { nilai, indeks };
}

// 5) hapusDuplikat: for...of + includes, tidak mengubah array asli.
function hapusDuplikat(daftar) {
  const hasil = [];
  for (const item of daftar) {
    if (!hasil.includes(item)) {
      hasil.push(item);
    }
  }
  return hasil;
}

// 6) cekBilanganPrima: while untuk pembagi, break saat sudah pasti bukan prima.
function cekBilanganPrima(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  let pembagi = 3;
  while (pembagi * pembagi <= n) {
    if (n % pembagi === 0) return false;
    pembagi += 2;
  }
  return true;
}

//  UJI

console.log("== hitungFaktorial ==");
console.log(`5  to ${hitungFaktorial(5)}`);
console.log(`0  to ${hitungFaktorial(0)}`);
console.log(`1  to ${hitungFaktorial(1)}`);
console.log(`-3 to ${hitungFaktorial(-3)}`);

console.log("\n== cekPalindrom ==");
console.log(`"Katak"  to ${cekPalindrom("Katak")}`);
console.log(`" Malam " to ${cekPalindrom(" Malam ")}`);
console.log(`"Kopi"   to ${cekPalindrom("Kopi")}`);
console.log(`""       to ${cekPalindrom("")}`);

console.log("\n== hitungVokal ==");
console.log(`"Kedai Senja" to ${hitungVokal("Kedai Senja")}`);
console.log(`"RHYTHM"      to ${hitungVokal("RHYTHM")}`);
console.log(`"Aiueo"       to ${hitungVokal("Aiueo")}`);

console.log("\n== cariTerbesar ==");
console.log(`[12,45,7,45,30] to`, cariTerbesar([12, 45, 7, 45, 30]));
console.log(`[3]             to`, cariTerbesar([3]));
console.log(`[]              to`, cariTerbesar([]));

console.log("\n== hapusDuplikat ==");
const asli1 = [1, 2, 2, 3, 1];
console.log(`[1,2,2,3,1] to ${JSON.stringify(hapusDuplikat(asli1))}`);
console.log(`Array asli  to ${JSON.stringify(asli1)}`);
const asli2 = ["a", "b", "a"];
console.log(`["a","b","a"] to ${JSON.stringify(hapusDuplikat(asli2))}`);
console.log(`Array asli    to ${JSON.stringify(asli2)}`);
console.log(`[]            to ${JSON.stringify(hapusDuplikat([]))}`);

console.log("\n== cekBilanganPrima ==");
console.log(`2  to ${cekBilanganPrima(2)}`);
console.log(`17 to ${cekBilanganPrima(17)}`);
console.log(`15 to ${cekBilanganPrima(15)}`);
console.log(`1  to ${cekBilanganPrima(1)}`);
console.log(`0  to ${cekBilanganPrima(0)}`);

//JAWABAN

// 1. Contoh: hitungFaktorial(5).
//    - n=5 tidak negatif, tidak 0/1 → hasil=1.
//    - i=2: hasil = 1*2 = 2
//    - i=3: hasil = 2*3 = 6
//    - i=4: hasil = 6*4 = 24
//    - i=5: hasil = 24*5 = 120
//    - loop berhenti (i=6), return 120.

// 2. hapusDuplikat tidak mengubah array asli karena kita membuat array baru "hasil" dan hanya push ke situ. Array asli tidak disentuh.
//    Saya memakai includes() karena sederhana dan langsung menjawab "apakah item ini sudah ada di hasil?".

// 3. cekBilanganPrima TIDAK memakai break, tapi return false di dalamloop — efeknya sama (keluar fungsi lebih awal). Kalau baris itudihapus, 
//    loop akan lanjut mengecek seluruh pembagi, hasilnya tetap benar tapi lebih lambat.

// 4. cariTerbesar([]) mengembalikan null, bukan 0, karena 0 adalah nilai
//    yang sah untuk array berisi angka. Mengembalikan 0 akan ambigu: apakah array kosong atau berisi angka 0? Null menandakan "tidak ada".

// 5. Perulangan berbeda:
//    - cariTerbesar memakai for biasa karena butuh INDEKS (untuk melacak posisi nilai terbesar).
//    - hapusDuplikat memakai for...of karena hanya butuh NILAI, tidak butuh indeks.
//    - cekBilanganPrima memakai while karena jumlah iterasi tidak pasti (berhenti saat pembagi*pembagi > n).
