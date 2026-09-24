import { describe, expect, it } from "vitest";
import { loadState } from "../../src/game/state";

describe("loadState", () => {
  it("drops an equipped gun that is not owned", () => {
    const storage = {
      getItem: () =>
        JSON.stringify({
          coins: 10,
          ammo: 2,
          ownedGunIds: ["toy_water"],
          equippedGunId: "ar_ak",
          xp: 50,
        }),
    };
    const state = loadState(storage);
    expect(state.equippedGunId).toBe("toy_water");
    expect(state.level).toBe(2);
    expect(state.coins).toBe(10);
  });

  it("drops unknown catalog guns and junk numbers", () => {
    const storage = {
      getItem: () =>
        JSON.stringify({
          coins: -20,
          ammo: "3",
          ownedGunIds: ["toy_water", "not_a_gun"],
          equippedGunId: "not_a_gun",
          xp: 50,
          quizCorrectTotal: "7",
          balloonsPopped: -1,
        }),
    };
    const state = loadState(storage);
    expect(state.ownedGunIds).toEqual(["toy_water"]);
    expect(state.equippedGunId).toBe("toy_water");
    expect(state.coins).toBe(0);
    expect(state.ammo).toBe(3);
    expect(state.quizCorrectTotal).toBe(7);
    expect(state.balloonsPopped).toBe(0);
  });

  it("returns a fresh save when JSON is broken", () => {
    const storage = { getItem: () => "{not-json" };
    expect(loadState(storage).coins).toBe(0);
    expect(loadState({ getItem: () => null }).ownedGunIds).toEqual([]);
  });
});
