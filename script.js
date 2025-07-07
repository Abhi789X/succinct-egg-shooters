
const playBtn = document.getElementById("play-btn");
const replayBtn = document.getElementById("replay-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const bulletsEl = document.getElementById("bullets");
const gameArea = document.getElementById("game-area");
const finalScoreEl = document.getElementById("final-score");
const gameOverEl = document.getElementById("game-over");

let score = 0;
let timeLeft = 30;
let bullets = 0;
let eggCount = 10;
let eggs = [];
let timerInterval;

const shootSound = document.getElementById("shoot-sound");
const crackSound = document.getElementById("crack-sound");
const clickSound = document.getElementById("click-sound");
const endSound = document.getElementById("end-sound");

function startGame() {
  clickSound.play();
  score = 0;
  timeLeft = 30;
  bullets = eggCount + 3;
  updateUI();
  gameArea.innerHTML = "";
  gameOverEl.classList.add("hidden");
  eggs = [];

  for (let i = 0; i < eggCount; i++) {
    spawnEgg();
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    updateUI();
    if (timeLeft <= 0 || bullets <= 0) {
      endGame();
    }
  }, 1000);
}

function spawnEgg() {
  const egg = document.createElement("div");
  egg.classList.add("egg");
  egg.style.backgroundColor = getRandomColor();
  egg.style.top = `${Math.random() * 240}px`;
  egg.style.left = `${Math.random() * 90}%`;
  egg.onclick = () => shootEgg(egg);
  gameArea.appendChild(egg);
  eggs.push(egg);
}

function shootEgg(egg) {
  if (bullets <= 0) return;
  shootSound.play();
  crackSound.play();
  egg.remove();
  score++;
  bullets--;
  spawnEgg();
  updateUI();
}

function endGame() {
  clearInterval(timerInterval);
  endSound.play();
  gameOverEl.classList.remove("hidden");
  finalScoreEl.textContent = `You hunted ${score} EGGs!`;
}

function updateUI() {
  scoreEl.textContent = `Score: ${score}`;
  timerEl.textContent = `Time: ${timeLeft}s`;
  bulletsEl.textContent = `Bullets: ${bullets}`;
}

function getRandomColor() {
  const colors = ["pink", "green", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

playBtn.onclick = startGame;
replayBtn.onclick = startGame;
