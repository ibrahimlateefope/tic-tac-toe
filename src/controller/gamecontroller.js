import { Gameboard } from "../model/gameboard.js";
import { createPlayer } from "../model/player.js";
export const GameController = (() => {
  let player = [];
  let currentPlayerIndex = 0;
  const start = (name1, name2) => {
    player = [createPlayer(name1, "X"), createPlayer(name2, "O")];
    Gameboard.reset();
    currentPlayerIndex = 0;
  };
  const getCurrentPlayer = () => player[currentPlayerIndex];
  const getMarker = () => {
    return player[currentPlayerIndex].getMarker();
  };
  const playRound = (index) => {
    const success = Gameboard.placeMark(
      index,
      player[currentPlayerIndex].getMarker(),
    );
    if (!success) return;
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };
  return {
    start,
    getCurrentPlayer,
    getMarker,
    playRound,
  };
})();
