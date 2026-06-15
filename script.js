// =====================================================
// CONFIG — set your timer and banner text here
// =====================================================
const TARGET_DATE = new Date("2026-06-16T00:00:00"); // ← Change this date/time
const BANNER_TEXT = "Happy Birthday Harshiiiii";          // ← Change the banner text

// =====================================================
// Elements
// =====================================================
const hoursEl      = document.getElementById("hours");
const minutesEl    = document.getElementById("minutes");
const secondsEl    = document.getElementById("seconds");
const celebrateBtn = document.getElementById("celebrate-btn");


const countdownPage = document.getElementById("countdown-page");
const decoratePage  = document.getElementById("decorate-page");
const envelopePage  = document.getElementById("envelope-page");

const modal1 = document.getElementById("modal-1");
const modal2 = document.getElementById("modal-2");

// =====================================================
// Countdown logic
// =====================================================
function pad(num) {
  return String(num).padStart(2, "0");
}

function updateCountdown() {
  const now  = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    hoursEl.textContent   = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    celebrateBtn.textContent = "🎉 It's Time — Celebrate!";

    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours        = Math.floor(totalSeconds / 3600);
  const minutes      = Math.floor((totalSeconds % 3600) / 60);
  const seconds      = totalSeconds % 60;

  hoursEl.textContent   = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =====================================================
// Page switching helper
// =====================================================
function showPage(page) {
  [countdownPage, decoratePage, envelopePage].forEach((p) =>
    p.classList.remove("active")
  );
  page.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================================================
// Modal flow
// =====================================================
const modalEarly = document.getElementById("modal-early");

celebrateBtn.addEventListener("click", () => {
  const now = new Date();
  if (TARGET_DATE - now > 0) {
    modalEarly.classList.add("active");
    return;
  }
  modal1.classList.add("active");
});

document.getElementById("modal-early-close").addEventListener("click", () => {
  modalEarly.classList.remove("active");
});
document.getElementById("modal-early-ok").addEventListener("click", () => {
  modalEarly.classList.remove("active");
});

document.getElementById("modal-1-yes").addEventListener("click", () => {
  modal1.classList.remove("active");
  modal2.classList.add("active");
});

document.getElementById("modal-1-no").addEventListener("click", () => {
  modal1.classList.remove("active");
});

document.getElementById("modal-2-go").addEventListener("click", () => {
  modal2.classList.remove("active");
  showPage(decoratePage);
});

// =====================================================
// Decorate page — build static decorations
// =====================================================
const decorateBg    = document.getElementById("decorate-bg");
const fairyLights   = document.getElementById("fairy-lights");
const bannerWrap    = document.getElementById("banner-wrap");
const bunting       = document.getElementById("bunting");
const bannerLetters = document.getElementById("banner-letters");
const decoBalloons  = document.getElementById("deco-balloons");

const btnLights   = document.getElementById("btn-lights");
const btnBalloons = document.getElementById("btn-balloons");
const btnCake     = document.getElementById("btn-cake");
const btnMessage  = document.getElementById("btn-message");

const cakeCard  = document.getElementById("cake-card");
const candlesRow = document.getElementById("candles-row");
const btnBlow   = document.getElementById("btn-blow");
const musicNote = document.getElementById("music-note");
const bgMusic   = document.getElementById("bg-music");

// Build fairy light bulbs
const bulbColors = ["#ff6b81", "#ffd166", "#5ad6ff", "#9b59ff", "#7CFC9B"];
for (let i = 0; i < 22; i++) {
  const bulb = document.createElement("div");
  bulb.className = "bulb";
  bulb.style.left       = `${(i / 21) * 100}%`;
  bulb.style.background = bulbColors[i % bulbColors.length];
  bulb.style.boxShadow  = `0 0 12px ${bulbColors[i % bulbColors.length]}`;
  bulb.style.animationDelay = `${(i % 5) * 0.2}s`;
  fairyLights.appendChild(bulb);
}

// Build bunting flags + banner letters
const flagColors = ["#5ad6ff", "#ffd166", "#7CFC9B", "#ff6b81"];
const letters    = BANNER_TEXT.split("");
letters.forEach((ch, i) => {
  const flag = document.createElement("div");
  flag.className = "flag";
  flag.style.borderTopColor  = flagColors[i % flagColors.length];
  flag.style.animationDelay  = `${(i % 4) * 0.15}s`;
  bunting.appendChild(flag);

  const span = document.createElement("span");
  span.textContent = ch === " " ? "\u00A0" : ch;
  bannerLetters.appendChild(span);
});

// Build floating balloons
["🎈","🎈","🎈","🎈","🎈","🎈"].forEach((emoji, i) => {
  const b = document.createElement("span");
  b.className = "balloon-rise";
  b.textContent = emoji;
  b.style.left = `${5 + i * 16}%`;
  b.style.animationDelay = `${i * 1.3}s`;
  b.style.fontSize = `${2 + (i % 3) * 0.5}rem`;
  decoBalloons.appendChild(b);
});

// =====================================================
// Build realistic SVG candles
// =====================================================
const CANDLE_COLORS = [
  { body: "#ff6b81", stripe: "#ff8fab" },
  { body: "#ffd166", stripe: "#ffe599" },
  { body: "#5ad6ff", stripe: "#9eeaff" },
  { body: "#9b59ff", stripe: "#c49bff" },
  { body: "#7CFC9B", stripe: "#b2ffc6" },
];

const candleSVGs = [];

CANDLE_COLORS.forEach((col, i) => {
  const wrapper = document.createElement("div");
  wrapper.className = "candle-wrap";
  wrapper.dataset.index = i;

  wrapper.innerHTML = `
    <svg class="candle-svg" viewBox="0 0 28 72" xmlns="http://www.w3.org/2000/svg" width="28" height="72">
      <!-- Flame glow -->
      <ellipse class="flame-glow" cx="14" cy="12" rx="9" ry="11" fill="${col.body}" opacity="0.28" filter="url(#blur${i})"/>
      <defs>
        <filter id="blur${i}" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4"/>
        </filter>
      </defs>
      <!-- Flame outer -->
      <path class="flame-outer" d="M14 2 C10 6 8 10 9 15 C10 19 12 21 14 21 C16 21 18 19 19 15 C20 10 18 6 14 2Z" fill="#ffd166"/>
      <!-- Flame inner -->
      <path class="flame-inner" d="M14 7 C12 10 11 13 12 16 C12.5 18 13.2 19 14 19 C14.8 19 15.5 18 16 16 C17 13 16 10 14 7Z" fill="#fff3b0"/>
      <!-- Wick -->
      <line class="wick" x1="14" y1="21" x2="14" y2="26" stroke="#5a3a1a" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Wax drip left -->
      <path class="wax-drip" d="M9 30 Q8 35 9 39 Q10 40 11 39 Q11 35 11 30Z" fill="${col.stripe}" opacity="0.7"/>
      <!-- Candle body -->
      <rect class="candle-body" x="7" y="26" width="14" height="40" rx="3" fill="${col.body}"/>
      <!-- Stripe highlight -->
      <rect x="9"  y="30" width="3" height="5" rx="1.5" fill="${col.stripe}" opacity="0.7"/>
      <rect x="9"  y="38" width="3" height="5" rx="1.5" fill="${col.stripe}" opacity="0.7"/>
      <rect x="9"  y="46" width="3" height="5" rx="1.5" fill="${col.stripe}" opacity="0.7"/>
      <!-- Highlight shine -->
      <rect x="17" y="28" width="2" height="34" rx="1" fill="white" opacity="0.22"/>
      <!-- Smoke (hidden until blown) -->
      <g class="smoke-group" opacity="0">
        <circle class="smoke1" cx="14" cy="20" r="2.5" fill="#ccc" opacity="0.6"/>
        <circle class="smoke2" cx="12" cy="14" r="3"   fill="#bbb" opacity="0.4"/>
        <circle class="smoke3" cx="16" cy="8"  r="2"   fill="#aaa" opacity="0.3"/>
      </g>
    </svg>
  `;

  candlesRow.appendChild(wrapper);
  candleSVGs.push(wrapper);
});

// =====================================================
// Step 1: Lights on
// =====================================================
btnLights.addEventListener("click", () => {
  decorateBg.classList.add("lights-on");
  decoratePage.classList.add("lights-on");
  fairyLights.classList.add("on");
  bannerWrap.classList.add("on");

  btnLights.classList.add("hidden");
  btnBalloons.classList.remove("hidden");
});

// =====================================================
// Step 2: Fly the balloons — THEN show cake button
// =====================================================
btnBalloons.addEventListener("click", () => {
  decoBalloons.classList.add("on");
  btnBalloons.classList.add("hidden");
  btnCake.classList.remove("hidden");  // cake button appears after balloons
  launchConfetti();
});

// =====================================================
// Step 3: Bring out the cake
// =====================================================
btnCake.addEventListener("click", () => {
  cakeCard.classList.remove("hidden");
  cakeCard.classList.add("appear");
  btnCake.classList.add("hidden");
  launchConfetti();
});

// =====================================================
// Step 4: Blow candles — realistic blow-out with smoke
// =====================================================
let candlesBlown = false;

btnBlow.addEventListener("click", () => {
  if (candlesBlown) return;
  candlesBlown = true;

  candleSVGs.forEach((wrapper, i) => {
    setTimeout(() => {
      wrapper.classList.add("blown");
    }, i * 140);
  });

  setTimeout(() => {
    btnBlow.textContent = "🎂 Candles Blown! Make a Wish 🌟";
    btnBlow.classList.add("blown");
    btnMessage.classList.remove("hidden");
  }, candleSVGs.length * 140 + 100);

  bgMusic.volume = 0.6;
  bgMusic.play().catch(() => {});
  musicNote.classList.remove("hidden");

  launchConfetti();
});

// Open message envelope
btnMessage.addEventListener("click", () => {
  showPage(envelopePage);
});

// Back from envelope
document.getElementById("back-to-decorate-btn").addEventListener("click", () => {
  showPage(decoratePage);
});

// =====================================================
// Envelope open
// =====================================================
const envelope        = document.getElementById("envelope");
const envelopeOpenBtn = document.getElementById("envelope-open-btn");

envelopeOpenBtn.addEventListener("click", () => {
  envelope.classList.add("open");
  launchConfetti();
});

// =====================================================
// Confetti
// =====================================================
const canvas = document.getElementById("confetti-canvas");
const ctx    = canvas.getContext("2d");
let confettiPieces      = [];
let confettiAnimationId = null;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const confettiColors = ["#ff6b81","#ffd166","#ff8fa3","#6a2c5e","#fff0f3","#ffb3c1","#5ad6ff","#9b59ff"];

function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    size: 6 + Math.random() * 8,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  };
}

function launchConfetti() {
  confettiPieces = Array.from({ length: 140 }, createConfettiPiece);
  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  let frame = 0;
  const maxFrames = 240;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      ctx.restore();

      if (p.y > canvas.height + 30) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    frame++;
    if (frame < maxFrames) {
      confettiAnimationId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}
