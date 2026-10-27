import { describe, it, expect, beforeEach } from "vitest";
import { Gameboard } from "../../src/model/gameboard.js";

describe("Gameboard", () => {
  beforeEach(() => Gameboard.reset());
  it("starts with 9 empty boxes", () => {
    expect(Gameboard.getBoard()).toEqual(["", "", "", "", "", "", "", "", ""]);
  });
  describe("placeMark", () => {
    it("places a mark on an empty cell", () => {
      const result = Gameboard.placeMark(0, "X");
      expect(result).toBe(true);
    });
    it("shows the mark on the board", () => {
      Gameboard.placeMark(0, "X");
      const markedBox = Gameboard.getBoard()[0];
      expect(markedBox).toBe("X");
    });
    it("does not allow marking a marked cell", () => {
      Gameboard.placeMark(0, "X");
      const retry = Gameboard.placeMark(0, "O");
      expect(retry).toBe(false);
      expect(Gameboard.getBoard()[0]).toBe("X");
    });
    it("does not mark out of range index", () => {
      expect(Gameboard.placeMark(-1, "O")).toBe(false);
      expect(Gameboard.placeMark(9, "O")).toBe(false);
    });
  });
});
/*
 [✓]Placing a mark on an empty cell works and returns true.
[✓]The mark actually shows up on the board.
[✓]Placing on a taken cell returns false and does not overwrite.
[✓]An out-of-range index returns false.
 */
