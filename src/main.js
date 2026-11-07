import "./style.css";
import { DisplayController } from "./view/displaycontroller.js";
import { GameController } from "./controller/gamecontroller.js";
const status = document.querySelector("#status");
GameController.start("Ibrahim", "Ayo");
GameController.playRound(0);
DisplayController.renderBoard(GameController.getBoard());
status.textContent = "Playing";
