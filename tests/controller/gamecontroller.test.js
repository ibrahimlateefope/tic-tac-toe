import { describe, it, expect, beforeEach } from "vitest";
import { GameController } from "../../src/controller/gamecontroller.js";
import { Gameboard } from "../../src/model/gameboard.js";
describe("GameController", () => {
  const play = (...moves) => {
    moves.forEach((m) => GameController.playRound(m));
  };
  beforeEach(() => {
    GameController.start("Ibrahim", "Ayo");
  });
  it("gets current player's marker", () => {
    expect(GameController.getCurrentPlayer().getMarker()).toBe("X");
  });
  it("plays current player's marker", () => {
    GameController.playRound(0);
    expect(Gameboard.getBoard()[0]).toBe("X");
  });
  it("switches to the other playern's marker after a valid round", () => {
    GameController.playRound(3);
    GameController.playRound(0);
    expect(Gameboard.getBoard()[0]).toBe("O");
  });
  it("keeps the same player's turn after an invalid move", () => {
    GameController.playRound(0);
    GameController.playRound(0);
    expect(GameController.getCurrentPlayer().getMarker()).toBe("O");
  });
  it("confirms a win for X", () => {
    play(0, 4, 3, 5);
    const result = GameController.playRound(6);
    expect(result).toEqual({
      valid: true,
      status: "won",
      winner: "X",
    });
  });
  it("confirms a draw", () => {
    play(0, 1, 2, 4, 3, 5, 7, 6);
    const result = GameController.playRound(8);
    expect(result).toEqual({
      valid: true,
      status: "draw",
      winner: null,
    });
  });
  it("rejects moves after the game is over", () => {
    play(0, 4, 3, 5, 6);
    const result = GameController.playRound(8);
    expect(result).toEqual({ valid: false });
    expect(Gameboard.getBoard()[8]).toBe("");
  });
  it("starts a fresh game after start()", () => {
    play(0, 4, 3, 5, 6);
    GameController.start("A", "B");
    expect(GameController.playRound(0).valid).toBe(true);
  });
  it("reports an ordinary move as playing", () => {
    const result = GameController.playRound(0);
    expect(result).toEqual({
      valid: true,
      status: "playing",
      winner: null,
    });
  });
  it("exposes the current board", () => {
    GameController.playRound(0);
    expect(GameController.getBoard()[0]).toBe("X");
  });
  it("keeps the winner as the current player after a win", () => {
    play(0, 4, 3, 5);
    const result = GameController.playRound(6);
    expect(GameController.getCurrentPlayer().getName()).toBe("Ibrahim");
  });
  describe("scores", () => {
    it("starts every score at zero", () => {
      expect(GameController.getScores()).toEqual({ X: 0, O: 0, draws: 0 });
    });
    it("adds one to the winner's score", () => {
      play(0, 4, 3, 5, 6);
      expect(GameController.getScores()).toEqual({ X: 1, O: 0, draws: 0 });
    });
    it("adds one to the draw count", () => {
      play(0, 1, 2, 4, 3, 5, 7, 6, 8);
      expect(GameController.getScores()).toEqual({ X: 0, O: 0, draws: 1 });
    });
    it("does not score moves after the game is over", () => {
      play(0, 4, 3, 5, 6);
      GameController.playRound(8);
      GameController.playRound(7);
      expect(GameController.getScores()).toEqual({ X: 1, O: 0, draws: 0 });
    });
    it("newRound clears the board and status but keeps the scores", () => {
      play(0, 4, 3, 5, 6);
      GameController.newRound();
      expect(GameController.getBoard()).toEqual([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
      expect(GameController.getStatus()).toBe("playing");
      expect(GameController.getScores()).toEqual({ X: 1, O: 0, draws: 0 });
    });
    it("start resets the scores for a brand-new game", () => {
      play(0, 4, 3, 5, 6);
      GameController.start("Ibrahim", "Ayo");
      expect(GameController.getScores()).toEqual({ X: 0, O: 0, draws: 0 });
    });
  });
});
