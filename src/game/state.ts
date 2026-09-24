import { STORAGE_KEY, getGun, levelFromXp } from "./catalog";
import type { GameState } from "./types";

export function createInitialState(): GameState {
  return {
    coins: 0,
    ammo: 0,
    ownedGunIds: [],
    equippedGunId: null,
    xp: 0,
    level: 1,
    quizCorrectTotal: 0,
    balloonsPopped: 0,
    shotsFired: 0,
  };
}

export function refreshLevel(state: GameState): GameState {
  return { ...state, level: levelFromXp(state.xp) };
}

function asCount(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export function loadState(storage: Pick<Storage, "getItem"> | null = globalThis.localStorage): GameState {
  if (!storage) return createInitialState();
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as Partial<GameState>;
    const ownedGunIds = Array.isArray(parsed.ownedGunIds)
      ? parsed.ownedGunIds.filter((id): id is string => typeof id === "string" && Boolean(getGun(id)))
      : [];
    const equippedGunId =
      typeof parsed.equippedGunId === "string" && ownedGunIds.includes(parsed.equippedGunId)
        ? parsed.equippedGunId
        : (ownedGunIds[0] ?? null);
    return refreshLevel({
      ...createInitialState(),
      ownedGunIds,
      equippedGunId,
      coins: asCount(parsed.coins),
      ammo: asCount(parsed.ammo),
      xp: asCount(parsed.xp),
      quizCorrectTotal: asCount(parsed.quizCorrectTotal),
      balloonsPopped: asCount(parsed.balloonsPopped),
      shotsFired: asCount(parsed.shotsFired),
    });
  } catch {
    return createInitialState();
  }
}

export function saveState(
  state: GameState,
  storage: Pick<Storage, "setItem"> | null = globalThis.localStorage,
): void {
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function canEnterRange(state: GameState): { ok: true } | { ok: false; code: "need_gun" | "need_ammo"; message: string } {
  const equipped = state.equippedGunId ? getGun(state.equippedGunId) : undefined;
  if (!equipped || !state.ownedGunIds.includes(equipped.id)) {
    return { ok: false, code: "need_gun", message: "要先買一把槍" };
  }
  if (state.ammo < 1) {
    return { ok: false, code: "need_ammo", message: "槍有喇，要買子彈先射得" };
  }
  return { ok: true };
}
