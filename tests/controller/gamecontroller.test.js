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
  it("switches to the other player's marker after a valid round", () => {
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
    GameController.start();
    expect(GameController.playRound(0).valid).toBe(true);
  });
  it("reports an ordinary move as playing",()=>{
    const result=GameController.playRound(0)
    expect(result).toEqual({
      valid:true,
      status:"playing",
      winner:null
    })
  })
});
