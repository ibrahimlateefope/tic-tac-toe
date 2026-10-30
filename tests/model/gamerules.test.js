import { describe, it, expect } from "vitest";
import { GameRules } from "../../src/model/gamerules.js";

describe("GameRules.getWinner", () => {
  it("returns null on a empty board", () => {
    const board = ["", "", "", "", "", "", "", "", ""];
    expect(GameRules.getWinner(board)).toBe(null);
  });
  it.each([
    [[0, 1, 2]],
    [[3, 4, 5]],
    [[6, 7, 8]],
    [[0, 3, 6]],
    [[1, 4, 7]],
    [[2, 5, 8]],
    [[0, 4, 8]],
    [[2, 4, 6]],
  ])("detects wins in line %j", (winningPosition) => {
    const board = Array(9).fill("");
    winningPosition.forEach((i) => (board[i] = "X"));
    expect(GameRules.getWinner(board)).toBe("X");
  });
  it("detects a win by O", () => {
    const board = ["O", "X", "X", "O", "", "", "O", "", ""];
    expect(GameRules.getWinner(board)).toBe("O");
  });
  it("does not choose a winner mid game", () => {
    const board = ["", "X", "X", "O", "", "", "O", "", ""];
    expect(GameRules.getWinner(board)).toBe(null);
  });
});
