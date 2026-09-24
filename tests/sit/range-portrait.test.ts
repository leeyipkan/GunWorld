import { describe, expect, it } from "vitest";
import { applyQuizReward, buyAmmo, buyGun, createBalloons, equipGun, fireAtBalloons } from "../../src/game/actions";
import { getGun } from "../../src/game/catalog";
import { canEnterRange, createInitialState } from "../../src/game/state";
import { renderGunPortrait } from "../../src/ui/gunPortrait";

function armed() {
  let state = createInitialState();
  state = applyQuizReward(state, [true, true, true, true, true]).state;
  state = applyQuizReward(state, [true, true, true, true, true]).state;
  state = applyQuizReward(state, [true, true, true, true, true]).state;
  state = buyGun(state, "toy_water").state;
  state = buyGun(state, "toy_bubble").state;
  state = buyAmmo(state, "ammo10").state;
  return state;
}

describe("SIT: equip, portrait, and shotgun fire", () => {
  it("changes the range portrait when a bought gun is equipped", () => {
    let state = armed();
    expect(canEnterRange(state).ok).toBe(true);
    expect(renderGunPortrait(getGun(state.equippedGunId ?? ""))).toContain('data-gun="toy_water"');

    const swapped = equipGun(state, "toy_bubble");
    expect(swapped.ok).toBe(true);
    state = swapped.state;
    expect(state.equippedGunId).toBe("toy_bubble");
    const html = renderGunPortrait(getGun(state.equippedGunId));
    expect(html).toContain('data-gun="toy_bubble"');
    expect(html).toContain("泡泡槍 全圖");
  });

  it("uses the equipped shotgun pop count against live balloons", () => {
    let state = createInitialState();
    state = { ...state, coins: 5000, level: 5, xp: 400 };
    state = buyGun(state, "sg_pump").state;
    state = buyAmmo(state, "ammo10").state;
    const shot = fireAtBalloons(state, createBalloons(), "b1");
    expect(shot.ok).toBe(true);
    expect(shot.popped).toBe(3);
    expect(shot.balloons.filter((b) => b.popped)).toHaveLength(3);
    expect(shot.state.ammo).toBe(9);
  });
});
