import "./style.css";
import { GameController } from "./controller/gamecontroller.js";
const status = document.querySelector("#status");
GameController.start("Ibrahim", "Ayo");
GameController.playRound(0);

status.textContent = "Playing";
/*app.textContent = GameController.getBoard()
  .map((cell) => cell || ".")
  .join(" | ");
app.className = "p-4 text-3xl font-bold text-red-500";
*/
