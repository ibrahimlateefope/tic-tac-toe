import { Gameboard } from "../model/gameboard.js";
import { createPlayer } from "../model/player.js";
import { GameRules } from "../model/gamerules.js";
export const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let status = "playing";
  const start = (name1, name2) => {
    players = [createPlayer(name1, "X"), createPlayer(name2, "O")];
    Gameboard.reset();
    currentPlayerIndex = 0;
    status = "playing";
  };
  const getCurrentPlayer = () => players[currentPlayerIndex];
  const playRound = (index) => {
    if (status !== "playing") {
      return { valid: false };
    }
    const success = Gameboard.placeMark(
      index,
      players[currentPlayerIndex].getMarker(),
    );
    if (!success) return { valid: false };
    const board = Gameboard.getBoard();
    const winner = GameRules.getWinner(board);
    if (winner) {
      status = "won";
      return {
        valid: true,
        status,
        winner,
      };
    }
    const draw = GameRules.isDraw(board);
    if (draw) {
      status = "draw";
      return {
        valid: true,
        status,
        winner: null,
      };
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    return {
      valid: true,
      status: "playing",
      winner: null,
    };
  };
  const getStatus = () => status;
  return {
    start,
    getCurrentPlayer,
    playRound,
    getStatus,
  };
})();