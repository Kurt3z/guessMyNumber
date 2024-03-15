"use strict";

const usernameSubmitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const usernameInputEl = document.querySelector(".username-input");
const playerLabelEl = document.querySelector(".player");
const secretNumberEl = document.querySelector(".number");

const guessBtn = document.querySelector(".btn--guess");
const guessInputEl = document.querySelector(".guess");

const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");

const messagesBox = document.querySelector(".messages");

const triesBox = document.querySelector(".tries");

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const createHearts = function (num) {
  for (let i = 0; i < num; i++) {
    const hearthSpan = document.createElement("span");
    hearthSpan.textContent = "❤️";
    hearthSpan.classList.add(`try-${i}`);
    triesBox.appendChild(hearthSpan);
  }
};

const appendMessage = function (message) {
  messagesBox.insertBefore(message, messagesBox.firstChild);
};

let secretNumber = generateSecretNumber();
let score = 20;
let highscore = 0;

createHearts(20);

usernameSubmitBtn.addEventListener("click", function () {
  if (username) {
    const username = usernameInputEl.value;
    usernameInputEl.value = "";
    playerLabelEl.textContent = username;
  }
});

guessBtn.addEventListener("click", function () {
  const guess = Number(guessInputEl.value);
  const message = document.createElement("p");
  const username = playerLabelEl.textContent;

  if (!username) {
    alert("Please insert a username to start playing!");
  } else {
    if (!guess) {
      message.classList.add("message");
      message.textContent = "⛔ Please insert a number";
      appendMessage(message);
    } else if (guess === secretNumber) {
      message.textContent = "🏆 You won";
      appendMessage(message);
      if (score > highscore) {
        highscore = score;
      }
      highscoreEl.textContent = score;
      guessBtn.disabled = true;
      secretNumberEl.textContent = secretNumber;
    } else {
      if (score > 1) {
        message.textContent = guess > secretNumber ? "📈 Too high" : "📉 Too low";
        appendMessage(message);
        score--;
        scoreEl.textContent = score;

        const hearth = document.querySelector(`.try-${score}`);
        hearth.remove();
      } else {
        guessBtn.disabled = true;
        score = 0;
        scoreEl.textContent = score;
        const hearth = document.querySelector(`.try-${score}`);
        hearth.remove();
        message.textContent = "🧨 You lost. Reset the game to try again!";
        appendMessage(message);
      }
    }
  }
});

resetBtn.addEventListener("click", function () {
  // Generate new secret number
  secretNumber = generateSecretNumber();

  // Hide secret number again
  secretNumberEl.textContent = "?";

  // Reset hearths
  for (let i = score; i <= 20; i++) {
    const hearthSpan = document.createElement("span");
    hearthSpan.textContent = "❤️";
    hearthSpan.classList.add(`try-${i}`);
    triesBox.appendChild(hearthSpan);
  }

  // Reset score
  score = 20;
  scoreEl.textContent = 20;

  // Reset messages box
  while (messagesBox.lastElementChild) {
    messagesBox.removeChild(messagesBox.lastElementChild);
  }
  const initialParagraph = document.createElement("p");
  initialParagraph.innerHTML = "<span class='prompt'> &raquo;</span>Start by trying to guess the number";
  messagesBox.appendChild(initialParagraph);

  // Make guess button available again
  guessBtn.disabled = false;

  // Clear input box
  guessInputEl.value = "";
});
