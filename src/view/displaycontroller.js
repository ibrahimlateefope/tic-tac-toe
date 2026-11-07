export const DisplayController = (() => {
  const boardHtml = document.querySelector("#board");
  const emptyBoard = () => {
    boardHtml.textContent = "";
  };
  const renderBoard = (board) => {
    emptyBoard();
    board.forEach((cell, index) => {
      const button = document.createElement("button");
      button.dataset.index = index;
      button.className =
        "w-12 h-12 bg-red-400 uppercase text-white text-lg font-extrabold rounded-xs";
      button.textContent = cell;
      boardHtml.append(button);
    });
  };
  const onCellClick = (handler) => {
    boardHtml.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      const index = Number(button.dataset.index);
      handler(index);
    });
  };
  return { emptyBoard, renderBoard, onCellClick };
})();
