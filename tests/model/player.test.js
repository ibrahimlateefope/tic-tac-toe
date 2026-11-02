import { describe, it, expect } from "vitest";
import { createPlayer } from "../../src/model/player.js";

describe("createPlayer", () => {
  it("remembers the created players", () => {
    const player = createPlayer("Ibrahim", "X");
    expect(player.getName()).toBe("Ibrahim");
    expect(player.getMarker()).toBe("X");
  });
  it("keeps each player's data separate", () => {
    const player1 = createPlayer("Ibrahim", "X");
    const player2 = createPlayer("Ayo", "O");
    expect(player1.getName()).toBe("Ibrahim");
    expect(player1.getMarker()).toBe("X");
    expect(player2.getName()).toBe("Ayo");
    expect(player2.getMarker()).toBe("O");
  });
});
