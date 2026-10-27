import { describe, it, expect, beforeEach } from "vitest";
import { Gameboard } from "../../src/model/gameboard.js";

describe("Gameboard", () => {
  beforeEach(() => Gameboard.reset());
  it("starts with 9 empty boxes", () => {
    expect(Gameboard.getBoard()).toEqual(["", "", "", "", "", "", "", "", ""]);
  });
});
