const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const page1 = document.getElementById("page1");
const pageYes = document.getElementById("pageYes");

const musicPage1 = document.getElementById("musicPage1");
const musicYes = document.getElementById("musicYes");

const playMusicBtn = document.getElementById("playMusicBtn");

// Countdown
const countdownEl = document.getElementById("countdown");
const valentineDateEl = document.getElementById("valentineDate");

// Slideshow
const slideImg = document.getElementById("slideImg");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsEl = document.getElementById("slideDots");

// Restaurant chooser
const restaurantSelect = document.getElementById("restaurantSelect");
const openRestBtn = document.getElementById("openRest");
const restChosen = document.getElementById("restChosen");

// Replay
const replayBtn = document.getElementById("replay");

// Photos
const slides = [
  "photos/01.jpeg",
  "photos/02.jpeg",
  "photos/03.jpeg"
];

let slideIndex = 0;
let slideTimer = null;

// -----------------------------
// 🎵 AUTO PLAY PAGE 1 MUSIC
// -----------------------------
async function tryAutoPlayPage1Music() {
  musicPage1.volume = 0.6;

  try {
    await musicPage1.play();
    console.log("Page1 music started automatically ✅");
  } catch (e) {
    console.log("Autoplay blocked ❌ Showing button...");
    playMusicBtn.classList.remove("hidden");
  }
}

// If autoplay blocked, user clicks this button
playMusicBtn.addEventListener("click", async () => {
  try {
    await musicPage1.play();
    playMusicBtn.classList.add("hidden");
  } catch (e) {
    alert("Tap again 😅 your browser blocked autoplay.");
  }
});

// Try autoplay when page loads
window.addEventListener("load", () => {
  tryAutoPlayPage1Music();
});

// -----------------------------
// 😈 NO button runs away
// -----------------------------
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 260 - 130;
  const y = Math.random() * 220 - 110;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.addEventListener("click", () => {
  alert("No is not an option 😌💘 Try again!");
});

// -----------------------------
// ✅ YES click
// -----------------------------
yesBtn.addEventListener("click", async () => {
  // Stop Page1 music
  musicPage1.pause();
  musicPage1.currentTime = 0;

  // Start YES music
  musicYes.volume = 0.75;
  try {
    await musicYes.play();
  } catch (e) {
    console.log("YES music blocked, user may need second click.");
  }

  page1.classList.add("hidden");
  pageYes.classList.remove("hidden");

  startCountdown();

  initDots();
  showSlide(0);
  startAutoSlide();
});

// -----------------------------
// ⏳ Countdown to Feb 14
// -----------------------------
function getNextValentineDate() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 1, 14, 0, 0, 0);

  if (now > target) {
    target = new Date(year + 1, 1, 14, 0, 0, 0);
  }

  return target;
}

function startCountdown() {
  const target = getNextValentineDate();
  valentineDateEl.textContent = `Target: ${target.toDateString()}`;

  const tick = () => {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      countdownEl.textContent = "It’s Valentine’s Day 💘";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  tick();
  setInterval(tick, 1000);
}

// -----------------------------
// 📸 Slideshow
// -----------------------------
function initDots() {
  dotsEl.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === slideIndex ? " active" : "");
    dot.addEventListener("click", () => {
      showSlide(i);
      restartAutoSlide();
    });
    dotsEl.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsEl.querySelectorAll(".dot");
  dots.forEach((d, i) => d.classList.toggle("active", i === slideIndex));
}

function showSlide(i) {
  if (!slides.length) return;

  slideIndex = (i + slides.length) % slides.length;
  slideImg.src = slides[slideIndex];
  updateDots();
}

prevBtn.addEventListener("click", () => {
  showSlide(slideIndex - 1);
  restartAutoSlide();
});

nextBtn.addEventListener("click", () => {
  showSlide(slideIndex + 1);
  restartAutoSlide();
});

function startAutoSlide() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(slideIndex + 1), 3500);
}

function restartAutoSlide() {
  startAutoSlide();
}

// -----------------------------
// 🍽️ Restaurant chooser
// -----------------------------
openRestBtn.addEventListener("click", () => {
  const url = restaurantSelect.value;

  if (!url) {
    alert("Pick a restaurant first 😄");
    return;
  }

  restChosen.textContent = `Chosen: ${restaurantSelect.options[restaurantSelect.selectedIndex].text}`;
  window.open(url, "_blank");
});

// -----------------------------
// 🔁 Replay button
// -----------------------------
replayBtn.addEventListener("click", () => {
  // Stop YES music
  musicYes.pause();
  musicYes.currentTime = 0;

  // Restart Page1 music
  tryAutoPlayPage1Music();

  // Stop slideshow
  if (slideTimer) clearInterval(slideTimer);

  // Reset UI
  pageYes.classList.add("hidden");
  page1.classList.remove("hidden");
  noBtn.style.transform = "translate(0,0)";
});
