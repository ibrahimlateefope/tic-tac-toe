import { Gameboard } from "../model/gameboard.js";
import { createPlayer } from "../model/player.js";
import { GameRules } from "../model/gamerules.js";
export const GameController = (() => {
  let player = [];
  let currentPlayerIndex = 0;
  let status = "playing";
  const start = (name1, name2) => {
    player = [createPlayer(name1, "X"), createPlayer(name2, "O")];
    Gameboard.reset();
    currentPlayerIndex = 0;
    status = "playing";
  };
  const getCurrentPlayer = () => player[currentPlayerIndex];
  const getMarker = () => {
    return player[currentPlayerIndex].getMarker();
  };
  const playRound = (index) => {
    if (status !== "playing") {
      return { valid: false };
    }
    const success = Gameboard.placeMark(
      index,
      player[currentPlayerIndex].getMarker(),
    );
    if (!success) return { valid: false };
    const winner = GameRules.getWinner(Gameboard.getBoard());
    if (winner) {
      status = "won";
      return {
        valid: true,
        status,
        winner,
      };
    }
    const draw = GameRules.isDraw(Gameboard.getBoard());
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
    getMarker,
    playRound,
    getStatus,
  };
})();
