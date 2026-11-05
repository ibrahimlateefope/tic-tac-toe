import { GameController } from "../src/controller/gamecontroller.js";
GameController.start("Ibrahim", "Ayo");
const play = (...moves) => {
  moves.forEach((m) => {
    const result = GameController.playRound(m);
    console.log(`Moves ${m}`, result);
  });
};
const printBoard = (board) => {
  [0, 3, 6].forEach((start) => {
    const row = board.slice(start, start + 3);
    console.log(row.map((cell) => cell || ".").join("|"));
  });
};
printBoard(GameController.getBoard());
play(0, 3, 1, 4, 2, 5);
printBoard(GameController.getBoard());
