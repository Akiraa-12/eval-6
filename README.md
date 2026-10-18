$ git log --oneline --graph
* d9ef437 (HEAD -> docs/tebak-tebakan, origin/docs/tebak-tebakan) selesai langkah ke 7
* 77031e5 (origin/feat/latihan-logika, feat/latihan-logika) selesai langkah ke 5
* ceb6a22 (origin/feat/laporan-harian, feat/laporan-harian) selesai langkah ke 4
* 8fc3558 (origin/feat/data-dan-pembersihan, feat/data-dan-pembersihan) selesai langkag ke 2
* 629b288 (origin/fix/perbaikan-kode, fix/perbaikan-kode) langkah ke 6 selesai
* 7a8ec5c (origin/master, master) selesai membuat folder eval-6

1. Agar main tidak terganggu ketika ada pengujian fitur. Tiap fitur diuji di branch sendiri, 
    jadi kalau ada yang salah bisa dibatalkantanpa merusak main.

2. Menandai file yang tidak perlu dilacak Git (sampah, rahasia, atau bisa di-generate ulang). Isinya:

text
node_modules/
.env
.DS_Store
Thumbs.db

3.  Merge lokal (git merge): di komputer sendiri, tanpa review, cocok untuk proyek pribadi.
    Pull Request: di GitHub, ada review & diskusi dulu sebelum digabung, cocok untuk tim.