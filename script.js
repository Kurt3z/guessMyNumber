"use strict";

const usernameSubmitBtn = document.querySelector(".submit");
const usernameInputEl = document.querySelector(".username-input");
const playerLabelEl = document.querySelector(".player");
const secretNumberEl = document.querySelector(".number");

const guessBtn = document.querySelector(".btn--guess");
const guessInputEl = document.querySelector(".guess");

const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");

const messagesBox = document.querySelector(".messages");

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = generateSecretNumber();
let score = 20;
let highscore = 0;
console.log(secretNumber);

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
  console.log(guess, secretNumber);

  if (!guess) {
    message.classList.add("message");
    message.textContent = "⛔ Please insert a number";
    messagesBox.appendChild(message);
  }

  if (guess === secretNumber) {
    message.textContent = "🏆 You won";
    messagesBox.appendChild(message);
    if (score > highscore) {
      highscore = score;
    }
    highscoreEl.textContent = score;
    guessBtn.disabled = true;
    secretNumberEl.textContent = secretNumber;
  } else {
    if (score > 1) {
      message.textContent = guess > secretNumber ? "📈 Too high" : "📉 Too low";
      messagesBox.appendChild(message);
      score--;
      scoreEl.textContent = score;
    } else {
      guessBtn.disabled = true;
      message.textContent = "🧨 You lost. Reset the game to try again!";
      messagesBox.appendChild(message);
    }
  }
});
