export const GameRules = (() => {
  const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const getWinningLine = (board) => {
    for (const [a, b, c] of WINNING_LINES) {
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return [a, b, c];
      }
    }

    return null;
  };
  const getWinner = (board) => {
    const line = getWinningLine(board);
    return line ? board[line[0]] : null;
  };
  const isBoardFull = (board) => {
    return board.every((cell) => cell !== "");
  };
  const isDraw = (board) => {
    return isBoardFull(board) && getWinner(board) === null;
  };
  return {
    getWinner,
    getWinningLine,
    isDraw,
  };
})();
