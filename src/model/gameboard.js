export const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => [...board];
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, reset };
})();
