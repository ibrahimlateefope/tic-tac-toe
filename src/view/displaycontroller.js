export const DisplayController = (() => {
  const boardHtml = document.querySelector("#board");
  const renderBoard = (board) => {
    boardHtml.textContent = "";
    board.forEach((cell, index) => {
      const button = document.createElement("button");
      button.dataset.index = index;
      button.className =
        "w-12 h-12 bg-red-400 uppercase text-white text-lg font-extrabold rounded-xs";
      button.textContent = cell;
      boardHtml.append(button);
    });
  };
  return { renderBoard };
})();
