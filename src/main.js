import { GameController } from "./controller/gamecontroller.js";
const app = document.querySelector("#app");
GameController.start("Ibrahim", "Ayo");
GameController.playRound(0);

app.textContent = GameController.getBoard()
  .map((cell) => cell || ".")
  .join(" | ");
