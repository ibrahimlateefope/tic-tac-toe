import "./style.css";
import { DisplayController } from "./view/displaycontroller.js";
import { GameController } from "./controller/gamecontroller.js";

const playerForm = document.querySelector("#player-form");
const firstPlayerInput = document.querySelector("#player-one");
const secondPlayerInput = document.querySelector("#player-two");
const restartBtn = document.querySelector("#restart");
const newGameBtn = document.querySelector("#new-game");

const render = () => {
  DisplayController.renderGame({
    board: GameController.getBoard(),
    players: GameController.getPlayers(),
    currentPlayer: GameController.getCurrentPlayer(),
    status: GameController.getStatus(),
    scores: GameController.getScores(),
    winningLine: GameController.getWinningLine(),
  });
};

const readName = (input) => {
  const name = input.value.trim().toUpperCase();
  if (name) return name;
  input.value = "";
  input.reportValidity();
  return null;
};

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerOneName = readName(firstPlayerInput);
  const playerTwoName = readName(secondPlayerInput);
  if (!playerOneName || !playerTwoName) return;
  GameController.start(playerOneName, playerTwoName);
  render();
  DisplayController.showGame();
});

DisplayController.onCellClick((index) => {
  const result = GameController.playRound(index);
  if (result.valid) render();
});

restartBtn.addEventListener("click", () => {
  GameController.newRound();
  render();
});

newGameBtn.addEventListener("click", () => {
  DisplayController.showWelcome();
  firstPlayerInput.focus();
});
