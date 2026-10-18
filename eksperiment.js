// 7.1 TEBAK 

// Potongan A 

console.log("  Hai Kawan  ".trim().length);
// Tebakan: 11
// Hasil asli: 11

console.log("Kopi Susu".toUpperCase().slice(0, 4));
// Tebakan: "KOPI"
// Hasil asli: "KOPI"

console.log("a,b,c".split(",").length);
// Tebakan: 3
// Hasil asli: 3

console.log("banana".replace("a", "o"));
// Tebakan: "bonana"
// Hasil asli: "bonana"

console.log("banana".replaceAll("a", "o"));
// Tebakan: "bonono"
// Hasil asli: "bonono"

console.log(parseInt("42px"));
// Tebakan: 42
// Hasil asli: 42

console.log(Number("42px"));
// Tebakan: NaN
// Hasil asli: NaN

console.log(parseInt("3.99"));
// Tebakan: 3
// Hasil asli: 3

console.log(typeof (3.14159).toFixed(2));
// Tebakan: "string"
// Hasil asli: "string"

console.log((0.1 + 0.2).toFixed(2));
// Tebakan: "0.30"
// Hasil asli: "0.30"

console.log("10" + 5 * 2);
// Tebakan: "1010"
// Hasil asli: "1010"

console.log(!0 && !"");
// Tebakan: true
// Hasil asli: true

// Potongan B

let angka = [10, 20, 30, 40];
let potongan = angka.slice(1, 3);
let hapus = angka.splice(1, 2);

console.log(potongan);
// Tebakan: [20, 30]
// Hasil asli: [20, 30]

console.log(hapus);
// Tebakan: [20, 30]
// Hasil asli: [20, 30]

console.log(angka);
// Tebakan: [10, 40]
// Hasil asli: [10, 40]

function ganda(n) {
  return n * 2;
}
function cetak(n) {
  console.log(n * 2);
}

console.log(ganda(4) + ganda(1));
// Tebakan: 10
// Hasil asli: 10

console.log(cetak(4));
// Tebakan: 8, lalu undefined
// Hasil asli: 8, lalu undefined

const toko = {
  nama: "Senja",
  stok: 5,
  jual(n) {
    this.stok -= n;
    return this.stok;
  },
};

toko.jual(2);

console.log(toko.jual(1));
// Tebakan: 2
// Hasil asli: 2

console.log("stok" in toko);
// Tebakan: true
// Hasil asli: true

for (let k in toko) {
  console.log(k);
}
// Tebakan: nama, stok, jual
// Hasil asli: nama, stok, jual

//  Potongan C

let hasil = "";
for (let i = 1; i <= 6; i++) {
  if (i === 2) {
    continue;
  }
  if (i === 5) {
    break;
  }
  hasil += i;
}
console.log(hasil);
// Tebakan: "134"
// Hasil asli: "134"

let n = 3;
let kali = 1;
while (n > 0) {
  kali *= n;
  n--;
}
console.log(kali);
// Tebakan: 6
// Hasil asli: 6

let x = 0;
do {
  x += 5;
} while (x < 3);
console.log(x);
// Tebakan: 5
// Hasil asli: 5

for (let huruf of "ABC") {
  console.log(huruf + huruf.toLowerCase());
}
// Tebakan: Aa, Bb, Cc (tiap baris)
// Hasil asli: Aa, Bb, Cc (tiap baris)

// 7.2 EKSPERIMEN 

// 1. Hoisting function declaration vs function expression

console.log(panggilDuluan());
// Tebakan: "dari declaration"
// Hasil asli: "dari declaration"

function panggilDuluan() {
  return "dari declaration";
}

// console.log(panggilBelakangan());
// Tebakan: error ReferenceError
// Pesan error jika diaktifkan: "ReferenceError: Cannot access 'panggilBelakangan' before initialization"

const panggilBelakangan = function () {
  return "dari expression";
};

console.log(panggilBelakangan());
// Tebakan: "dari expression"
// Hasil asli: "dari expression"

//  2. slice vs splice 

const arrAsli = [1, 2, 3, 4];
const hasilSlice = arrAsli.slice(1, 3);
console.log(`slice    to hasil=${hasilSlice}, asli=${arrAsli}`);
// Tebakan: hasil=[2,3], asli tetap [1,2,3,4]
// Hasil asli: hasil=2,3, asli=1,2,3,4

const arrAsli2 = [1, 2, 3, 4];
const hasilSplice = arrAsli2.splice(1, 2);
console.log(`splice   to hasil=${hasilSplice}, asli=${arrAsli2}`);
// Tebakan: hasil=[2,3], asli berubah jadi [1,4]
// Hasil asli: hasil=2,3, asli=1,4

//  3. for...in vs for...of pada array 

const buah = ["apel", "mangga"];

for (const k in buah) {
  console.log(`for...in  to ${k} (typeof ${typeof k})`);
}
// Tebakan: "0", "1" (string)
// Hasil asli: "0" (string), "1" (string)

for (const v of buah) {
  console.log(`for...of  to ${v}`);
}
// Tebakan: "apel", "mangga"
// Hasil asli: "apel", "mangga"

// 4. toFixed menghasilkan teks 
console.log(`toFixed to ${(5).toFixed(1) + 1}`);
// Tebakan: "5.11" (bukan 6.1)
// Hasil asli: "5.11"

console.log(`typeof toFixed to ${typeof (5).toFixed(1)}`);
// Tebakan: "string"
// Hasil asli: "string"

// 5. Falsy vs Truthy di dalam if 

const nilaiFalsy = [false, 0, "", null, undefined, NaN];
for (const nilai of nilaiFalsy) {
  if (nilai) {
    console.log(`${String(nilai)} to MASUK if`);
  } else {
    console.log(`${String(nilai)} to TIDAK masuk if`);
  }
}
// Tebakan: semua TIDAK masuk if
// Hasil asli: semua TIDAK masuk if

const nilaiTruthy = ["0", [], {}];
for (const nilai of nilaiTruthy) {
  if (nilai) {
    console.log(`${JSON.stringify(nilai)} to MASUK if`);
  } else {
    console.log(`${JSON.stringify(nilai)} to TIDAK masuk if`);
  }
}
// Tebakan: semua MASUK if
// Hasil asli: semua MASUK if

//  7.3 JAWABAN 

// 1. "10" + 5 * 2 = "1010". Urutan: * lebih tinggi dari +, jadi 5*2=10  dihitung dulu. Lalu "10" + 10 → karena operand kiri string, terjadi concat → "1010".

// 2. potongan & hapus isinya sama-sama [20,30], TAPI:
//    - slice mengembalikan potongan BARU tanpa mengubah angka.
//    - splice mengembalikan elemen yang DIHAPUS dan MENGUBAH angka menjadi [10,40].

// 3. cetak(4) mencetak "8" di dalam fungsi, lalu mengembalikan undefined (tidak ada return). console.log(undefined) mencetak "undefined" — itulah baris kedua.

// 4. hasil = "134" karena:
//    - i=1: hasil = "1"
//    - i=2: continue (lewati)
//    - i=3: hasil = "13"
//    - i=4: hasil = "134"
//    - i=5: break (keluar)
//    - i=6: tidak dieksekusi

// 5. do...while menjalankan blok DULU, baru cek kondisi. x += 5 → x=5, cek 5 < 3 = false → berhenti. Hasil x=5.