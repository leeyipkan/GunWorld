import { AMMO_PACKS, COINS_PER_CORRECT, GUNS, PERFECT_BONUS, QUESTIONS_PER_ROUND, STREAK_BONUS, XP_PER_CORRECT, getAmmoPack, getGun, isGunUnlocked } from "./catalog";
import { canEnterRange, refreshLevel } from "./state";
import type { ActionResult, GameState, RangeBalloon } from "./types";

export function hasThreeStreak(results: boolean[]): boolean {
  for (let i = 0; i <= results.length - 3; i += 1) {
    if (results[i] && results[i + 1] && results[i + 2]) return true;
  }
  return false;
}

export function scoreQuiz(results: boolean[]): { coins: number; xp: number; correct: number } {
  const correct = results.filter(Boolean).length;
  let coins = correct * COINS_PER_CORRECT;
  if (hasThreeStreak(results)) coins += STREAK_BONUS;
  if (correct === QUESTIONS_PER_ROUND) coins += PERFECT_BONUS;
  return { coins, xp: correct * XP_PER_CORRECT, correct };
}

export function applyQuizReward(state: GameState, results: boolean[]): ActionResult {
  const { coins, xp, correct } = scoreQuiz(results);
  const next = refreshLevel({
    ...state,
    coins: state.coins + coins,
    xp: state.xp + xp,
    quizCorrectTotal: state.quizCorrectTotal + correct,
  });
  return {
    ok: true,
    state: next,
    coinsDelta: coins,
    message: correct === 0 ? "今輪未賺到金幣，再試過！" : `你賺到 ${coins} 金幣！`,
  };
}

export function buyGun(state: GameState, gunId: string): ActionResult {
  const gun = getGun(gunId);
  if (!gun) {
    return { ok: false, code: "unknown_item", message: "搵唔到呢把槍", state };
  }
  if (state.ownedGunIds.includes(gunId)) {
    return { ok: false, code: "already_owned", message: "你已經有呢把槍", state };
  }
  if (!isGunUnlocked(gun, state.level)) {
    return { ok: false, code: "locked", message: `升到 ${gun.unlockLevel} 級先買到`, state };
  }
  if (state.coins < gun.price) {
    return { ok: false, code: "need_coins", message: "金幣唔夠，去答題賺錢", state };
  }
  const next: GameState = {
    ...state,
    coins: state.coins - gun.price,
    ownedGunIds: [...state.ownedGunIds, gunId],
    equippedGunId: state.equippedGunId ?? gunId,
  };
  return { ok: true, state: next, message: `買咗${gun.nameZh}！` };
}

export function buyAmmo(state: GameState, packId: string): ActionResult {
  const pack = getAmmoPack(packId);
  if (!pack) {
    return { ok: false, code: "unknown_item", message: "搵唔到呢包子彈", state };
  }
  if (state.coins < pack.price) {
    return { ok: false, code: "need_coins", message: "金幣唔夠，去答題賺錢", state };
  }
  const next: GameState = {
    ...state,
    coins: state.coins - pack.price,
    ammo: state.ammo + pack.amount,
  };
  return { ok: true, state: next, message: `買咗${pack.label}！` };
}

export function equipGun(state: GameState, gunId: string): ActionResult {
  if (!state.ownedGunIds.includes(gunId)) {
    return { ok: false, code: "not_owned", message: "要先買呢把槍", state };
  }
  return { ok: true, state: { ...state, equippedGunId: gunId }, message: "換好槍喇" };
}

export function fireAtBalloons(state: GameState, balloons: RangeBalloon[], targetId?: string): ActionResult & { balloons: RangeBalloon[] } {
  const gate = canEnterRange(state);
  if (!gate.ok) {
    return { ...gate, state, balloons };
  }
  const gun = getGun(state.equippedGunId ?? "");
  if (!gun) {
    return { ok: false, code: "need_gun", message: "要先買一把槍", state, balloons };
  }
  const alive = balloons.filter((b) => !b.popped);
  if (alive.length === 0) {
    return { ok: false, code: "need_target", message: "氣球未準備好", state, balloons };
  }
  const targeted = targetId ? alive.find((b) => b.id === targetId) : alive[0];
  if (targetId && !targeted) {
    const missState = { ...state, ammo: state.ammo - 1, shotsFired: state.shotsFired + 1 };
    return {
      ok: true,
      state: missState,
      balloons,
      popped: 0,
      coinsDelta: 0,
      message: "打唔中！子彈 -1",
    };
  }
  const start = targeted ?? alive[0];
  if (!start) {
    return { ok: false, code: "need_target", message: "氣球未準備好", state, balloons };
  }
  const startIndex = alive.findIndex((b) => b.id === start.id);
  const poppedIds = new Set(alive.slice(startIndex, startIndex + gun.popCount).map((b) => b.id));
  const nextBalloons = balloons.map((b) => (poppedIds.has(b.id) ? { ...b, popped: true } : b));
  const popped = poppedIds.size;
  const coinsDelta = popped * gun.bonusCoins;
  const nextState: GameState = {
    ...state,
    ammo: state.ammo - 1,
    shotsFired: state.shotsFired + 1,
    balloonsPopped: state.balloonsPopped + popped,
    coins: state.coins + coinsDelta,
  };
  return {
    ok: true,
    state: nextState,
    balloons: nextBalloons,
    popped,
    coinsDelta,
    message: popped > 0 ? `打中 ${popped} 個氣球！+${coinsDelta} 金幣` : "打唔中！",
  };
}

export function createBalloons(count = 5): RangeBalloon[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `b${i + 1}`,
    x: 12 + ((i * 17) % 70),
    y: 6 + (i % 3) * 12,
    popped: false,
  }));
}

export function refillBalloons(balloons: RangeBalloon[]): RangeBalloon[] {
  if (balloons.some((b) => !b.popped)) return balloons;
  return createBalloons(balloons.length || 5);
}

export { GUNS, AMMO_PACKS };
