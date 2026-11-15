import { Gameboard } from "../model/gameboard.js";
import { createPlayer } from "../model/player.js";
import { GameRules } from "../model/gamerules.js";
export const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let status = "idle";
  let scores = { X: 0, O: 0, draws: 0 };
  let winningLine = null;
  const resetRound = () => {
    Gameboard.reset();
    currentPlayerIndex = 0;
    status = "playing";
    winningLine = null;
  };
  const start = (name1, name2) => {
    players = [createPlayer(name1, "X"), createPlayer(name2, "O")];
    scores = { X: 0, O: 0, draws: 0 };
    resetRound();
  };
  const newRound = () => {
    resetRound();
  };
  const getStatus = () => status;
  const getBoard = () => Gameboard.getBoard();
  const getPlayers = () => [...players];
  const getCurrentPlayer = () => players[currentPlayerIndex];
  const getScores = () => ({ ...scores });
  const getWinningLine = () => (winningLine ? [...winningLine] : null);
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
    const line = GameRules.getWinningLine(board);
    if (line) {
      const winner = board[line[0]];
      status = "won";
      winningLine = line;
      scores[winner] += 1;
      return {
        valid: true,
        status,
        winner,
      };
    }
    const draw = GameRules.isDraw(board);
    if (draw) {
      status = "draw";
      scores.draws += 1;
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
  return {
    start,
    newRound,
    getStatus,
    getBoard,
    getPlayers,
    getCurrentPlayer,
    getScores,
    getWinningLine,
    playRound,
  };
})();
