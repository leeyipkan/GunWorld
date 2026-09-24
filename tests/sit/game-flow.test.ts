import { describe, expect, it } from "vitest";
import { applyQuizReward, buyAmmo, buyGun, createBalloons, equipGun, fireAtBalloons } from "../../src/game/actions";
import { canEnterRange, createInitialState } from "../../src/game/state";

describe("SIT: earn → buy gun → buy ammo → test fire", () => {
  it("blocks the range until both gun and ammo are paid for, then consumes ammo", () => {
    let state = createInitialState();
    expect(canEnterRange(state).ok).toBe(false);
    if (!canEnterRange(state).ok) {
      expect(canEnterRange(state).code).toBe("need_gun");
    }

    const paid = buyGun(state, "toy_water");
    expect(paid.ok).toBe(false);
    if (!paid.ok) expect(paid.code).toBe("need_coins");

    const quiz = applyQuizReward(state, [true, true, true, true, true]);
    expect(quiz.ok).toBe(true);
    state = quiz.state;
    expect(state.coins).toBe(115);
    expect(buyGun(state, "toy_water").ok).toBe(false);

    state = applyQuizReward(state, [true, true, true, true, true]).state;
    expect(state.coins).toBe(230);

    const gun = buyGun(state, "toy_water");
    expect(gun.ok).toBe(true);
    state = gun.state;
    expect(state.ownedGunIds).toContain("toy_water");
    expect(state.equippedGunId).toBe("toy_water");
    expect(state.coins).toBe(110);
    expect(canEnterRange(state).ok).toBe(false);
    if (!canEnterRange(state).ok) {
      expect(canEnterRange(state).code).toBe("need_ammo");
    }

    const ammoPack = buyAmmo(state, "ammo50");
    expect(ammoPack.ok).toBe(true);
    state = ammoPack.state;
    expect(state.ammo).toBe(50);
    expect(state.coins).toBe(30);

    expect(canEnterRange(state).ok).toBe(true);

    const balloons = createBalloons(5);
    const shot = fireAtBalloons(state, balloons, "b1");
    expect(shot.ok).toBe(true);
    state = shot.state;
    expect(state.ammo).toBe(49);
    expect(state.shotsFired).toBe(1);
    expect(state.balloonsPopped).toBeGreaterThanOrEqual(1);
    expect(shot.balloons.find((b) => b.id === "b1")?.popped).toBe(true);

    const miss = fireAtBalloons(state, shot.balloons, "missing");
    expect(miss.ok).toBe(true);
    state = miss.state;
    expect(state.ammo).toBe(48);
    expect(state.balloonsPopped).toBe(shot.state.balloonsPopped);
  });

  it("cannot equip a gun that was not bought", () => {
    const state = createInitialState();
    const result = equipGun(state, "toy_water");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("not_owned");
  });

  it("cannot fire with a gun but zero ammo", () => {
    let state = createInitialState();
    state = applyQuizReward(state, [true, true, true, true, true]).state;
    state = applyQuizReward(state, [true, true, true, true, true]).state;
    state = buyGun(state, "toy_water").state;
    const shot = fireAtBalloons(state, createBalloons(), "b1");
    expect(shot.ok).toBe(false);
    if (!shot.ok) expect(shot.code).toBe("need_ammo");
  });

  it("rejects locked, duplicate, and unknown purchases", () => {
    let state = createInitialState();
    state = { ...state, coins: 5000, level: 1 };
    const locked = buyGun(state, "sr_awp");
    expect(locked.ok).toBe(false);
    if (!locked.ok) expect(locked.code).toBe("locked");

    const first = buyGun(state, "toy_water");
    expect(first.ok).toBe(true);
    const again = buyGun(first.state, "toy_water");
    expect(again.ok).toBe(false);
    if (!again.ok) expect(again.code).toBe("already_owned");

    const unknown = buyGun(state, "nope");
    expect(unknown.ok).toBe(false);
    if (!unknown.ok) expect(unknown.code).toBe("unknown_item");
  });

  it("stops firing when the last bullet is spent", () => {
    let state = createInitialState();
    state = applyQuizReward(state, [true, true, true, true, true]).state;
    state = applyQuizReward(state, [true, true, true, true, true]).state;
    state = buyGun(state, "toy_water").state;
    state = buyAmmo(state, "ammo10").state;
    state = { ...state, ammo: 1 };
    const balloons = createBalloons();
    const last = fireAtBalloons(state, balloons, "b1");
    expect(last.ok).toBe(true);
    state = last.state;
    expect(state.ammo).toBe(0);
    expect(canEnterRange(state).ok).toBe(false);
    const blocked = fireAtBalloons(state, last.balloons, "b2");
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.code).toBe("need_ammo");
  });
});
