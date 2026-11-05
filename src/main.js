import "./style.css";
import { GameController } from "./controller/gamecontroller.js";
const app = document.querySelector("#app");
GameController.start("Ibrahim", "Ayo");
GameController.playRound(0);

app.textContent = GameController.getBoard()
  .map((cell) => cell || ".")
  .join(" | ");
app.className = "p-4 text-3xl font-bold text-red-500";