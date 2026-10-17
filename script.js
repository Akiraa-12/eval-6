
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

console.log(" TRANSAKSI BERSIH");
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

// BAGIAN 3: MESIN KASIR

const kasir = {
  menu: menu,
  saldoKas: 0,
  riwayat: [],
  pecahan: [50000, 20000, 10000, 5000, 2000, 1000],

  cariMenu(nama) {
    for (const item of this.menu) {
      if (item.nama === nama) return item;
    }
    return null;
  },

  hitungSubtotal(pesanan) {
    let subtotal = 0;
    const itemValid = [];
    const itemTidakValid = [];

    for (const item of pesanan) {
      const menuDitemukan = this.cariMenu(item.menu);

      if (!menuDitemukan) {
        itemTidakValid.push({ menu: item.menu, alasan: "Menu tidak ada" });
        continue;
      }
      if (item.jumlah <= 0) {
        itemTidakValid.push({ menu: item.menu, alasan: "Jumlah tidak valid" });
        continue;
      }
      if (menuDitemukan.stok < item.jumlah) {
        itemTidakValid.push({ menu: item.menu, alasan: "Stok tidak cukup" });
        continue;
      }

      subtotal += menuDitemukan.harga * item.jumlah;
      itemValid.push({ menu: menuDitemukan, jumlah: item.jumlah, harga: menuDitemukan.harga });
    }

    return { subtotal, itemValid, itemTidakValid };
  },

  hitungPromoHari(hari) {
    let promo;
    switch (hari) {
      case "jumat":
        promo = 3000;
        break;
      case "sabtu":
      case "minggu":
        promo = 5000;
        break;
      default:
        promo = 0;
        break;
    }
    return promo;
  },

  hitungDiskon(subtotal, persenVoucher) {
    let persenSubtotal;
    if (subtotal >= 100000) persenSubtotal = 15;
    else if (subtotal >= 50000) persenSubtotal = 10;
    else if (subtotal >= 25000) persenSubtotal = 5;
    else persenSubtotal = 0;

    const persenDipakai = Math.max(persenSubtotal, persenVoucher);
    return Math.round((subtotal * persenDipakai) / 100);
  },

  hitungPajak(nilai, tarif = 0.11) {
    return Math.round(nilai * tarif);
  },

  hitungKembalianPecahan(kembalian) {
    if (kembalian < 0) return null;

    const hasil = {};
    let sisa = kembalian;

    for (const nilaiPecahan of this.pecahan) {
      let jumlahLembar = 0;
      while (sisa >= nilaiPecahan) {
        sisa -= nilaiPecahan;
        jumlahLembar++;
      }
      if (jumlahLembar > 0) hasil[nilaiPecahan] = jumlahLembar;
    }

    hasil.sisa = sisa;
    return hasil;
  },

  prosesTransaksi(trx) {
    if (!trx.pelanggan) {
      const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status: "ditolak", alasan: "Nama pelanggan kosong" };
      this.riwayat.push(hasil);
      return hasil;
    }
    if (!trx.pesanan.length) {
      const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status: "ditolak", alasan: "Pesanan kosong" };
      this.riwayat.push(hasil);
      return hasil;
    }

    const { subtotal, itemValid, itemTidakValid } = this.hitungSubtotal(trx.pesanan);

    if (!itemValid.length) {
      const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status: "ditolak", alasan: "Tidak ada item valid" };
      this.riwayat.push(hasil);
      return hasil;
    }

    const promoHari = this.hitungPromoHari(trx.hari);
    const diskon = this.hitungDiskon(subtotal, trx.persenVoucher);
    const nilaiSetelahDiskon = Math.max(subtotal - diskon - promoHari, 0);
    const pajak = this.hitungPajak(nilaiSetelahDiskon);
    const total = nilaiSetelahDiskon + pajak;
    const kembalian = trx.uangBayar - total;
    const status = kembalian >= 0 ? "lunas" : "kurang";

    let pecahanKembalian = null;
    if (status === "lunas") {
      for (const item of itemValid) {
        item.menu.stok -= item.jumlah;
      }
      this.saldoKas += total;
      pecahanKembalian = this.hitungKembalianPecahan(kembalian);
    }

    const hasil = {
      kode: trx.kode, pelanggan: trx.pelanggan, status,
      subtotal, promoHari, diskon, pajak, total,
      uangBayar: trx.uangBayar, kembalian, pecahanKembalian,
      itemValid, itemTidakValid
    };
    this.riwayat.push(hasil);
    return hasil;
  },

  cetakStruk(hasil) {
    if (hasil.status === "ditolak") {
      console.log(`Kode      : ${hasil.kode}`);
      console.log(`Pelanggan : ${hasil.pelanggan}`);
      console.log(`Status    :ditolak`);
      console.log(`Alasan    : ${hasil.alasan}`);
      return;
    }

    console.log(`Kode      : ${hasil.kode}`);
    console.log(`Pelanggan : ${hasil.pelanggan}`);
    console.log("Item Valid");
    hasil.itemValid.forEach((item, i) => {
      console.log(`${i + 1}. ${item.menu.nama} x${item.jumlah} = ${formatRupiah(item.harga * item.jumlah)}`);
    });
    if (hasil.itemTidakValid.length) {
      console.log("Item Tidak Valid");
      hasil.itemTidakValid.forEach((item) => {
        console.log(`- ${item.menu}: ${item.alasan}`);
      });
    }
    console.log(`Subtotal  : ${formatRupiah(hasil.subtotal)}`);
    console.log(`Promo Hari: ${formatRupiah(hasil.promoHari)}`);
    console.log(`Diskon    : ${formatRupiah(hasil.diskon)}`);
    console.log(`Pajak     : ${formatRupiah(hasil.pajak)}`);
    console.log(`Total     : ${formatRupiah(hasil.total)}`);
    console.log(`Uang Bayar: ${formatRupiah(hasil.uangBayar)}`);
    console.log(`Kembalian : ${formatRupiah(hasil.kembalian)}`);
    console.log(`Status    : ${hasil.status}`);
    if (hasil.pecahanKembalian) {
      console.log(" Pecahan Kembalian");
      for (const kunci in hasil.pecahanKembalian) {
        console.log(`${kunci}: ${hasil.pecahanKembalian[kunci]}`);
      }
    }
  }
};

// JALANKAN SEMUA TRANSAKSI

const TARGET_KAS = 1000000000;   // besar: semua diproses. Percobaan kedua: 60000.

for (const trx of transaksiBersih) {
  const hasil = kasir.prosesTransaksi(trx);
  kasir.cetakStruk(hasil);

  if (kasir.saldoKas >= TARGET_KAS) {
    console.log("Target kas tercapai");
    break;
  }
}

console.log(`\nSaldo Kasir : ${formatRupiah(kasir.saldoKas)}`);

//JAWABAN

// 1. this.menu merujuk pada properti "menu" MILIK object kasir saat methoddipanggil. Kalau menulis "menu" saja, JavaScript mencari variabel
//    global bernama "menu" — meski sekarang ada, lebih aman dan eksplisitmemakai this agar tidak bergantung variabel luar.

// 2. Switch lebih cocok karena hanya membandingkan satu nilai (hari) dengan banyak kemungkinan. Tanpa break di antara "sabtu" dan "minggu" sengaja dibuat agar keduanya berbagi hasil promo yang sama (5000).

// 3. Array kosong punya .length = 0, dan 0 adalah Falsy. Maka!trx.pesanan.length = !0 = true (pesanan kosong). Tiga nilai Falsy:0, "", null (atau undefined, NaN, false).

// 4. break: menghentikan seluruh perulangan (dipakai saat target kas tercapai di loop transaksi). continue: melewati satu iterasi saja
//    (dipakai di hitungSubtotal saat item tidak valid, lanjut ke itemberikutnya).

// 5. hitungSubtotal mengembalikan object agar pemanggil juga tahu itemmana yang valid (perlu untuk kurangi stok & cetak struk) dan mana
//    yang tidak valid (perlu ditampilkan alasannya). Kalau hanya angka,informasi itu hilang.

// 6. for...of memilih pecahan satu per satu; while menghitung berapa lembar yang bisa diambil dari sisa (kurangi sisa sampai < pecahan). Bisa diganti dengan % dan / — misal lembar = Math.floor(sisa / p),
//    sisa = sisa % p. Hasilnya sama; while lebih mudah dibaca sebagai "ulang selama masih bisa diambil".

