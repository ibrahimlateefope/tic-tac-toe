import "./style.css";
import { DisplayController } from "./view/displaycontroller.js";
import { GameController } from "./controller/gamecontroller.js";
const status = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");
const getCurrentName = () => GameController.getCurrentPlayer().getName();
const render = () => {
  DisplayController.renderBoard(GameController.getBoard());
};
const gameStart = () => {
  GameController.start("Ibrahim", "Ayo");
  status.textContent = `${getCurrentName()} is playing`;
  render();
};

gameStart();
DisplayController.onCellClick((index) => {
  const result = GameController.playRound(index);
  if (result.valid) {
    render();
    if (result.status === "won") {
      status.textContent = `${getCurrentName()} Won!`;
    } else if (result.status === "draw") {
      status.textContent = "It's a Draw!";
    } else {
      status.textContent = `${getCurrentName()} is playing`;
    }
  }
});
restartBtn.addEventListener("click", () => {
  gameStart();
});
