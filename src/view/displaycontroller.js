export const DisplayController = (() => {
  const welcomeScreen = document.querySelector("#welcome-screen");
  const gameScreen = document.querySelector("#game-screen");
  const boardHtml = document.querySelector("#board");
  const statusHtml = document.querySelector("#status");
  const firstPlayer = document.querySelector(".first-player");
  const secondPlayer = document.querySelector(".second-player");
  const playerOneCard = document.querySelector(".player-card-one");
  const playerTwoCard = document.querySelector(".player-card-two");
  const playerOneTurn = document.querySelector(".player-one-turn");
  const playerTwoTurn = document.querySelector(".player-two-turn");
  const scoreboardPlayerOne = document.querySelector(".scoreboard-player-one");
  const scoreboardPlayerTwo = document.querySelector(".scoreboard-player-two");
  const scoreboardPlayerOneScore = document.querySelector(
    ".scoreboard-player-one-score",
  );
  const scoreboardPlayerTwoScore = document.querySelector(
    ".scoreboard-player-two-score",
  );
  const scoreboardDraw = document.querySelector(".scoreboard-draw");
  const CELL_BASE =
    "flex aspect-square items-center justify-center rounded-2xl border text-4xl font-bold uppercase shadow-sm transition duration-150 enabled:hover:-translate-y-0.5 enabled:hover:shadow-md enabled:active:translate-y-0 enabled:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-bloom-200 disabled:cursor-default sm:text-5xl";
  const CELL_IDLE =
    "border-lavender-mist-100 bg-white enabled:hover:border-indigo-bloom-200 enabled:hover:bg-lavender-mist-50";
  const CELL_WON =
    "border-indigo-bloom-300 bg-indigo-bloom-100 ring-2 ring-indigo-bloom-300";
  const MARK_COLORS = {
    X: "text-azure-blue-500",
    O: "text-deep-pink-500",
  };
  const clearBoard = () => {
    boardHtml.textContent = "";
  };
  const renderBoard = (board, winningLine, status) => {
    clearBoard();
    const finished = status === "won" || status === "draw";
    board.forEach((cell, index) => {
      const row = Math.floor(index / 3) + 1;
      const column = (index % 3) + 1;
      const winning = winningLine ? winningLine.includes(index) : false;
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.index = index;
      button.className = [
        CELL_BASE,
        winning ? CELL_WON : CELL_IDLE,
        MARK_COLORS[cell] ?? "text-indigo-bloom-600",
      ].join(" ");
      button.textContent = cell;
      button.disabled = finished || cell !== "";
      button.setAttribute(
        "aria-label",
        cell
          ? `${cell} at row ${row}, column ${column}`
          : `Row ${row}, column ${column}`,
      );
      boardHtml.append(button);
    });
  };
  const renderPlayers = (players, currentPlayer, status) => {
    const [playerOne, playerTwo] = players;
    firstPlayer.textContent = playerOne.getName();
    secondPlayer.textContent = playerTwo.getName();
    const activeMarker = status === "playing" ? currentPlayer.getMarker() : null;
    const setActive = (card, label, active) => {
      card.setAttribute("aria-current", active ? "true" : "false");
      card.classList.toggle("ring-2", active);
      label.classList.toggle("invisible", !active);
    };
    setActive(playerOneCard, playerOneTurn, activeMarker === "X");
    setActive(playerTwoCard, playerTwoTurn, activeMarker === "O");
  };
  const renderScores = (players, scores) => {
    const [playerOne, playerTwo] = players;
    scoreboardPlayerOne.textContent = playerOne.getName();
    scoreboardPlayerTwo.textContent = playerTwo.getName();
    scoreboardPlayerOneScore.textContent = scores.X;
    scoreboardPlayerTwoScore.textContent = scores.O;
    scoreboardDraw.textContent = scores.draws;
  };
  const renderStatus = (status, currentPlayer) => {
    const messages = {
      playing: `${currentPlayer.getName()}'s turn`,
      won: `${currentPlayer.getName()} wins!`,
      draw: "It's a draw!",
    };
    statusHtml.dataset.status = status;
    statusHtml.textContent = messages[status] ?? "";
  };
  const renderGame = ({
    board,
    players,
    currentPlayer,
    status,
    scores,
    winningLine,
  }) => {
    renderBoard(board, winningLine, status);
    renderPlayers(players, currentPlayer, status);
    renderScores(players, scores);
    renderStatus(status, currentPlayer);
  };
  const show = (screen) => {
    screen.classList.remove("hidden");
    screen.classList.add("flex");
  };
  const hide = (screen) => {
    screen.classList.remove("flex");
    screen.classList.add("hidden");
  };
  const showGame = () => {
    hide(welcomeScreen);
    show(gameScreen);
    boardHtml.querySelector("button")?.focus({ preventScroll: true });
  };
  const showWelcome = () => {
    hide(gameScreen);
    show(welcomeScreen);
  };
  const onCellClick = (handler) => {
    boardHtml.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      handler(Number(button.dataset.index));
    });
  };
  return { renderGame, onCellClick, showGame, showWelcome };
})();
