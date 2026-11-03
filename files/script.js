// JavaScript murni (vanilla), tanpa library atau framework.

// 1. Progress bar baca
const bar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const maks = h.scrollHeight - h.clientHeight;
  bar.style.width = (maks > 0 ? (h.scrollTop / maks) * 100 : 0) + '%';
}, { passive: true });

// 2. Menu mobile
const tombolMenu = document.getElementById('tombol-menu');
const menu = document.getElementById('menu');
tombolMenu.addEventListener('click', () => {
  const buka = menu.classList.toggle('buka');
  tombolMenu.setAttribute('aria-expanded', buka);
  tombolMenu.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
});

// 3. Slider hutan sehat vs terbakar (halaman budaya)
const banding = document.getElementById('banding');
if (banding) {
  banding.querySelector('input').addEventListener('input', e => {
    banding.style.setProperty('--pos', e.target.value + '%');
  });
}

// 4. Daftar isi: tandai bagian yang sedang dibaca
const tautanToc = document.querySelectorAll('#toc a');
if (tautanToc.length) {
  const pengamat = new IntersectionObserver(entri => {
    entri.forEach(en => {
      if (en.isIntersecting) {
        tautanToc.forEach(a => a.classList.toggle('aktif', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '0px 0px -65% 0px' });
  tautanToc.forEach(a => {
    const el = document.querySelector(a.getAttribute('href'));
    if (el) pengamat.observe(el);
  });
}

// 5. Kuis mitos atau fakta (halaman pendidikan)
const soalSemua = document.querySelectorAll('.soal');
if (soalSemua.length) {
  const skorEl = document.getElementById('skor');
  let benar = 0, terjawab = 0;
  soalSemua.forEach(soal => {
    soal.querySelectorAll('button').forEach(tombol => {
      tombol.addEventListener('click', () => {
        const kunci = soal.dataset.jawab;
        const benarIni = tombol.dataset.pilih === kunci;
        soal.querySelectorAll('button').forEach(b => {
          b.disabled = true;
          if (b.dataset.pilih === kunci) b.classList.add('benar');
        });
        if (!benarIni) tombol.classList.add('salah');
        const umpan = soal.querySelector('.umpan');
        umpan.textContent = (benarIni ? 'Benar. ' : 'Belum tepat. ') + umpan.dataset.teks;
        umpan.hidden = false;
        if (benarIni) benar++;
        terjawab++;
        if (terjawab === soalSemua.length) {
          skorEl.textContent = 'Skor Anda: ' + benar + ' dari ' + soalSemua.length + '.';
          skorEl.hidden = false;
        }
      });
    });
  });
}
