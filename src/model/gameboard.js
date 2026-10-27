export const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const placeMark = (index, marker) => {
    if (marker !== "X" && marker !== "O") return false;
    if (board[index] !== "") {
      return false;
    }
    if (index > 0 && index >= board.length) return false;
    board[index] = marker;
    return true;
  };
  const getBoard = () => [...board];
  return { reset, placeMark, getBoard };
})();
