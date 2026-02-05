const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const page1 = document.getElementById("page1");
const pageYes = document.getElementById("pageYes");

const loveSong = document.getElementById("loveSong");

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

// ✅ Put your slideshow photos here (names must exist in /photos)
const slides = [
  "photos/01.jpg",
  "photos/02.jpg",
  "photos/03.jpg",
  "photos/04.jpg",
];

let slideIndex = 0;
let slideTimer = null;

// --- NO button runs away 😈
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 260 - 130;
  const y = Math.random() * 220 - 110;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.addEventListener("click", () => {
  alert("No is not an option 😌💘 Try again!");
});

// --- YES click: show page 2 + start music + countdown + slideshow
yesBtn.addEventListener("click", async () => {
  page1.classList.add("hidden");
  pageYes.classList.remove("hidden");

  startCountdown();

  // Slideshow init
  initDots();
  showSlide(0);
  startAutoSlide();

  // Music: browsers allow audio after user interaction ✅
  try {
    await loveSong.play();
  } catch (e) {
    // If autoplay fails, user can tap again or you can add a "Play" button.
    console.log("Audio play blocked:", e);
  }
});

// --- Countdown to next Feb 14 (always future)
function getNextValentineDate() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 1, 14, 0, 0, 0); // Feb = 1
  if (now > target) target = new Date(year + 1, 1, 14, 0, 0, 0);
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
    requestAnimationFrame(() => {}); // tiny keep-alive
  };

  tick();
  setInterval(tick, 1000);
}

// --- Slideshow
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

// --- Restaurant
openRestBtn.addEventListener("click", () => {
  const url = restaurantSelect.value;
  if (!url) {
    alert("Pick a restaurant first 😄");
    return;
  }
  restChosen.textContent = `Chosen: ${restaurantSelect.options[restaurantSelect.selectedIndex].text}`;
  window.open(url, "_blank");
});

// --- Replay
replayBtn.addEventListener("click", () => {
  // Stop music
  loveSong.pause();
  loveSong.currentTime = 0;

  // Stop slideshow
  if (slideTimer) clearInterval(slideTimer);

  // Reset
  pageYes.classList.add("hidden");
  page1.classList.remove("hidden");
  noBtn.style.transform = "translate(0,0)";
});
