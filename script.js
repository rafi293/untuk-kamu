/* ============================================
   CONFIG — GANTI SESUAI KEBUTUHAN
   ============================================ */
const letterText = "Hai Reisya Sayang...\n\nAku cuma mau bilang,\nterima kasih sudah jadi alasan\nbahagiaku setiap hari.\n\nMeskipun jarak memisahkan,\nkamu tetap yang paling dekat\ndi hatiku.\n\nAku rindu kamu. Setiap detik.\nDan aku janji,\nsuatu hari nanti kita\ngak akan LDR lagi.\n\nTunggu aku ya? ❤️";
const subtitleText = "Aku bikin ini khusus untukmu, dari jauh...";
const phoneNumber = "62895379879428";
const waMessage = "Aku mau kok sayang, aku juga sayang kamu ❤️ makasih udah bikin ini buat aku, aku terharu 🥺✨";
const togetherSince = new Date(2024, 0, 1); // GANTI tanggal jadian
const nextMeetDate = new Date(2024, 11, 25); // GANTI tanggal ketemu (null jika belum tau)

// Quiz questions
const quizData = [
  { q: "Kapan pertama kali kita ngobrol?", opts: ["Lewat DM Instagram", "Lewat WhatsApp", "Dikenalin temen", "Ketemu langsung"], ans: 0 },
  { q: "Makanan favorit aku apa?", opts: ["Nasi goreng", "Mie ayam", "Ayam geprek", "Bakso"], ans: 2 },
  { q: "Lagu yang selalu ingetin aku sama kamu?", opts: ["Bernadya - Untungnya, Hidup Harus Tetap Berjalan", "Mitski - My Love Mine All Mine", "Fiersa Besari - Celengan Rindu", "Semua bener 💕"], ans: 3 },
  { q: "Hal yang paling aku suka dari kamu?", opts: ["Senyummu", "Suaramu", "Perhatianmu", "Semuanya dong! 🥰"], ans: 3 },
  { q: "Apa yang paling aku pengen lakuin bareng kamu?", opts: ["Nonton bareng", "Jalan-jalan ke pantai", "Peluk kamu erat-erat", "Semua! Pokoknya bareng kamu ❤️"], ans: 3 }
];

/* ============================================
   SPARKLE PARTICLES
   ============================================ */
const cvs = document.getElementById('sparkle');
const cx = cvs.getContext('2d');
let pts = [];

function resizeCvs() {
  cvs.width = window.innerWidth;
  cvs.height = document.documentElement.scrollHeight;
}
function makePts() {
  pts = [];
  const n = Math.min(Math.floor(window.innerWidth / 14), 70);
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * cvs.width, y: Math.random() * cvs.height,
      r: Math.random() * 2 + .5, dx: (Math.random() - .5) * .3, dy: -Math.random() * .35 - .1,
      a: Math.random() * .5 + .2, p: Math.random() * Math.PI * 2
    });
  }
}
function drawPts() {
  cx.clearRect(0, 0, cvs.width, cvs.height);
  pts.forEach(p => {
    p.x += p.dx; p.y += p.dy; p.pulse += 0.02;
    if (p.y < -10) p.y = cvs.height + 10;
    if (p.x < -10) p.x = cvs.width + 10;
    if (p.x > cvs.width + 10) p.x = -10;
    const al = p.a * (.6 + .4 * Math.sin(p.p));
    cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    cx.fillStyle = `rgba(255,182,193,${al})`; cx.fill();
    cx.beginPath(); cx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
    cx.fillStyle = `rgba(255,133,162,${al * .12})`; cx.fill();
  });
  requestAnimationFrame(drawPts);
}
window.addEventListener('resize', () => { resizeCvs(); makePts(); });
window.addEventListener('load', () => { resizeCvs(); makePts(); drawPts(); });

let resizeT;
window.addEventListener('scroll', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    const h = document.documentElement.scrollHeight;
    if (cvs.height !== h) cvs.height = h;
  }, 200);
}, { passive: true });

/* ============================================
   START PAGE
   ============================================ */
let musicOn = false;
const audio = document.getElementById('bgm');

function startPage() {
  document.getElementById('overlay').classList.add('hide');
  audio.volume = .45;
  audio.play().then(() => {
    musicOn = true;
    document.getElementById('mu').classList.add('play');
  }).catch(() => { });
  document.getElementById('mu').classList.add('show');

  setTimeout(() => {
    document.getElementById('hPhoto').classList.add('a');
    document.getElementById('hBadge').classList.add('a');
    document.getElementById('hTitle').classList.add('a');
    document.getElementById('hFor').classList.add('a');
    document.getElementById('sArrow').classList.add('a');
  }, 200);
  setTimeout(() => heroType(), 900);
  updateLDR(); setInterval(updateLDR, 1000);
  updateMeet(); setInterval(updateMeet, 60000); // Check every minute
  startCarousel();
  generateStars();
}

/* ============================================
   MUSIC
   ============================================ */
function toggleMusic() {
  const b = document.getElementById('mu');
  if (musicOn) { audio.pause(); b.classList.remove('play'); musicOn = false; }
  else { audio.play().then(() => { b.classList.add('play'); musicOn = true; }).catch(() => { }); }
}

/* ============================================
   HERO TYPING
   ============================================ */
function heroType() {
  const el = document.getElementById('hTyp');
  let i = 0;
  el.innerHTML = '<span class="tc"></span>';
  const iv = setInterval(() => {
    if (i < subtitleText.length) {
      el.insertBefore(document.createTextNode(subtitleText[i]), el.querySelector('.tc'));
      i++;
    } else {
      clearInterval(iv);
      setTimeout(() => { const c = el.querySelector('.tc'); if (c) c.remove(); }, 3500);
    }
  }, 60);
}

/* ============================================
   LDR COUNTER
   ============================================ */
function updateLDR() {
  const diff = Date.now() - togetherSince.getTime();
  document.getElementById('ld').textContent = Math.floor(diff / (864e5));
  document.getElementById('lh').textContent = Math.floor((diff % (864e5)) / (36e5));
  document.getElementById('lm').textContent = Math.floor((diff % (36e5)) / (6e4));
  document.getElementById('ls').textContent = Math.floor((diff % (6e4)) / 1e3);
}

/* ============================================
   NEXT MEET COUNTDOWN
   ============================================ */
function updateMeet() {
  if (!nextMeetDate) {
    document.getElementById('meetCount').textContent = "Belum tau nih... 🥺";
    return;
  }
  const diff = nextMeetDate.getTime() - Date.now();
  if (diff < 0) {
    document.getElementById('meetCount').textContent = "Hari ini kita ketemu! ❤️";
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById('meetCount').textContent = `${d} Hari Lagi!`;
}

/* ============================================
   OPEN WHEN CARDS
   ============================================ */
function openCard(type) {
  document.getElementById('owOverlay').classList.add('active');
  const card = document.getElementById(`ow-${type}`);
  if (card) {
    card.style.display = 'block';
    // Small timeout to allow display:block to apply before opacity transition
    setTimeout(() => card.classList.add('active'), 10);
  }
}

function closeCard(type) {
  closeAllCards();
}

function closeAllCards() {
  document.getElementById('owOverlay').classList.remove('active');
  document.querySelectorAll('.ow-content').forEach(el => {
    el.classList.remove('active');
    setTimeout(() => el.style.display = 'none', 400); // Wait for transition
  });
}

/* ============================================
   REASONS CAROUSEL
   ============================================ */
const rTrack = document.getElementById('rTrk');
const rDots = document.getElementById('rDots');
const rSlides = rTrack.querySelectorAll('.r-sl');
let curS = 0, autoI;

rSlides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'rd' + (i === 0 ? ' on' : '');
  d.onclick = () => goSlide(i);
  rDots.appendChild(d);
});

function goSlide(n) {
  curS = n;
  rTrack.style.transform = `translateX(-${n * 100}%)`;
  rDots.querySelectorAll('.rd').forEach((d, i) => d.classList.toggle('on', i === n));
}
function startCarousel() {
  autoI = setInterval(() => goSlide((curS + 1) % rSlides.length), 4000);
}

// Swipe
let tsx = 0;
const rCar = document.getElementById('rCar');
rCar.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; }, { passive: true });
rCar.addEventListener('touchend', e => {
  const d = tsx - e.changedTouches[0].clientX;
  if (Math.abs(d) > 50) {
    clearInterval(autoI);
    if (d > 0 && curS < rSlides.length - 1) goSlide(curS + 1);
    else if (d < 0 && curS > 0) goSlide(curS - 1);
    startCarousel();
  }
}, { passive: true });

/* ============================================
   SECRET MESSAGE
   ============================================ */
function revealSecret() {
  document.getElementById('sCover').style.display = 'none';
  const msg = document.getElementById('sMsg');
  msg.style.display = 'block';
  requestAnimationFrame(() => msg.classList.add('show'));
}

/* ============================================
   LOVE QUIZ
   ============================================ */
let qIdx = 0, qScore = 0;
const qEl = document.getElementById('qQ');
const qOpts = document.getElementById('qOpts');
const qProg = document.getElementById('qProg');

function loadQ() {
  if (qIdx >= quizData.length) { showResult(); return; }
  const q = quizData[qIdx];
  qEl.textContent = q.q;
  qProg.textContent = `Pertanyaan ${qIdx + 1} dari ${quizData.length}`;
  qOpts.innerHTML = '';
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-opt';
    btn.textContent = o;
    btn.onclick = () => answerQ(i, btn);
    qOpts.appendChild(btn);
  });
}
function answerQ(i, btn) {
  const correct = quizData[qIdx].ans;
  document.querySelectorAll('.q-opt').forEach(b => b.classList.add('disabled'));
  if (i === correct) { btn.classList.add('correct'); qScore++; }
  else { btn.classList.add('wrong'); qOpts.children[correct].classList.add('correct'); }
  setTimeout(() => { qIdx++; loadQ(); }, 1200);
}
function showResult() {
  const box = document.getElementById('qBox');
  const pct = Math.round((qScore / quizData.length) * 100);
  let emoji, msg;
  if (pct >= 80) { emoji = '🥰'; msg = 'Kamu emang paling kenal aku! Gak salah pilih kamu, Reisya ❤️'; }
  else if (pct >= 60) { emoji = '😊'; msg = 'Lumayan kenal aku ya! Tapi masih banyak yang harus kita explore bareng~'; }
  else { emoji = '🥺'; msg = 'Kayaknya kita harus lebih sering ngobrol ya, biar makin kenal... tapi gapapa, yang penting kamu ada ❤️'; }
  box.innerHTML = `<div class="q-result" style="display:block"><div class="q-emoji">${emoji}</div><h3>Skor: ${qScore}/${quizData.length}</h3><p>${msg}</p></div>`;
}
loadQ();

/* ============================================
   BUCKET LIST
   ============================================ */
document.querySelectorAll('.bl-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('done');
    const chk = item.querySelector('.bl-check');
    chk.textContent = item.classList.contains('done') ? '✓' : '';
  });
});

/* ============================================
   NIGHT SKY STARS
   ============================================ */
function generateStars() {
  const sky = document.getElementById('nightSky');
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.width = s.style.height = (Math.random() * 2.5 + 1) + 'px';
    s.style.animationDuration = (Math.random() * 3 + 2) + 's';
    s.style.animationDelay = Math.random() * 3 + 's';
    sky.appendChild(s);
  }
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: .15 });
document.querySelectorAll('.rv,.gc,.fin-q,.fin-sub').forEach(e => obs.observe(e));

/* ============================================
   TYPEWRITER
   ============================================ */
let twS = false, twI = 0;
const twE = document.getElementById('tw-t');
const paperE = document.getElementById('paper');

const twObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      paperE.classList.add('v');
      if (!twS) { twS = true; setTimeout(runTw, 600); }
    }
  });
}, { threshold: .25 });
twObs.observe(document.getElementById('twSec'));

function runTw() {
  if (twI < letterText.length) {
    twE.innerHTML += letterText[twI] === '\n' ? '<br>' : letterText[twI];
    twI++; setTimeout(runTw, 40);
  } else {
    const c = document.createElement('span'); c.className = 'twb';
    twE.appendChild(c); setTimeout(() => c.remove(), 3500);
  }
}

/* ============================================
   YES + CONFETTI
   ============================================ */
function sayYes() {
  fireConf();
  setTimeout(() => document.getElementById('suc').classList.add('show'), 900);
  setTimeout(() => {
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
  }, 2800);
}
function fireConf() {
  const box = document.getElementById('cfl');
  const em = ['❤️', '💕', '✨', '🌸', '💖', '🎉', '💗', '♥', '🥰'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const p = document.createElement('div'); p.className = 'cfp';
      p.textContent = em[Math.floor(Math.random() * em.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.fontSize = (Math.random() * 18 + 12) + 'px';
      p.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
      box.appendChild(p); setTimeout(() => p.remove(), 5000);
    }, i * 40);
  }
}

/* ============================================
   NO BUTTON
   ============================================ */
const btnNo = document.getElementById('bNo');
let nC = 0;
const nT = ["Gak mau", "Serius??", "Beneran?? 😳", "Pikir lagi...", "Jangan dong 😢", "Pliiis Reisya 🥺", "Aku sedih 💔", "😭😭😭"];

function flee() {
  nC++;
  btnNo.textContent = nC < nT.length ? nT[nC] : "Gak bisa ❌";
  const p = 10, mX = window.innerWidth - btnNo.offsetWidth - p, mY = window.innerHeight - btnNo.offsetHeight - p;
  btnNo.style.position = 'fixed';
  btnNo.style.left = Math.max(p, Math.random() * mX) + 'px';
  btnNo.style.top = Math.max(p, Math.random() * mY) + 'px';
  btnNo.style.zIndex = '9000';
  btnNo.style.transition = 'left .35s cubic-bezier(.16,1,.3,1),top .35s cubic-bezier(.16,1,.3,1)';
  if (nC >= 8) {
    btnNo.style.opacity = '0'; btnNo.style.pointerEvents = 'none';
    setTimeout(() => btnNo.style.display = 'none', 400);
  }
}
btnNo.addEventListener('mouseover', flee);
btnNo.addEventListener('touchstart', e => { e.preventDefault(); flee(); }, { passive: false });
btnNo.addEventListener('click', e => { e.preventDefault(); flee(); });
