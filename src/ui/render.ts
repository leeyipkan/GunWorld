import { AMMO_PACKS, CATEGORY_LABEL, GUNS, QUESTIONS_PER_ROUND, getGun } from "../game/catalog";
import { canEnterRange } from "../game/state";
import type { GameState, Gun, QuizRound, RangeBalloon, Screen, ShopTab } from "../game/types";
import { renderGunPortrait } from "./gunPortrait";
import { escapeHtml } from "./html";

export type ShopFilter = "all" | Gun["category"];

export type UiState = {
  screen: Screen;
  shopTab: ShopTab;
  shopFilter: ShopFilter;
  quiz: QuizRound | null;
  lastAnswer: { correct: boolean; explain: string } | null;
  quizSummary: { coins: number; correct: number } | null;
  balloons: RangeBalloon[];
  toast: string;
  e2e: boolean;
  recoil: boolean;
};

function hud(state: GameState): string {
  const gun = state.equippedGunId ? getGun(state.equippedGunId) : undefined;
  return `<div class="hud">
    <div class="stat" data-testid="coins">金幣 ${state.coins}</div>
    <div class="stat" data-testid="ammo">子彈 ${state.ammo}</div>
    <div class="stat" data-testid="gun">${gun ? escapeHtml(gun.nameZh) : "未有槍"}</div>
  </div>`;
}

function home(state: GameState, ui: UiState): string {
  const range = canEnterRange(state);
  return `${hud(state)}
    <section class="hero">
      <h1>答題小勇士</h1>
      <p class="hint">香港小一：數學、認字、英文、常識。賺金幣買槍同子彈，先可以去試槍場打氣球。</p>
      <p class="hint">等級 ${state.level} ｜ 累積答對 ${state.quizCorrectTotal} 題</p>
    </section>
    <div class="actions">
      <button class="btn-accent" data-action="go-quiz" data-testid="btn-quiz">📚 答題賺錢</button>
      <button data-action="go-shop" data-testid="btn-shop">🛒 商店（買槍／買子彈）</button>
      <button class="btn-good" data-action="go-range" data-testid="btn-range">🎯 試槍場</button>
    </div>
    ${range.ok ? "" : `<div class="block" data-testid="range-lock">${escapeHtml(range.message)}</div>`}
    ${ui.quizSummary ? `<div class="feedback good" data-testid="quiz-summary">${escapeHtml(`上一輪答對 ${ui.quizSummary.correct}/${QUESTIONS_PER_ROUND}，+${ui.quizSummary.coins} 金幣`)}</div>` : ""}
    <button class="tiny" data-action="reset-save" data-testid="btn-reset">重設進度（家長）</button>`;
}

function quizView(state: GameState, ui: UiState): string {
  const round = ui.quiz;
  if (!round) return home(state, ui);
  if (round.finished && ui.quizSummary) {
    return `${hud(state)}
      <section class="hero">
        <h2>答完喇！</h2>
        <p class="prompt" data-testid="quiz-done">答對 ${ui.quizSummary.correct}/${QUESTIONS_PER_ROUND}</p>
        <p>賺到 ${ui.quizSummary.coins} 金幣。記住：槍同子彈都要去商店買。</p>
      </section>
      <div class="actions">
        <button class="btn-accent" data-action="go-shop" data-testid="btn-to-shop">去商店買嘢</button>
        <button class="btn-ghost" data-action="go-quiz" data-testid="btn-quiz-again">再答一輪</button>
        <button class="btn-ghost" data-action="go-home" data-testid="btn-quiz-home">返主頁</button>
      </div>`;
  }
  const q = round.questions[round.index];
  if (!q) return home(state, ui);
  const cat = { math: "數學", chinese: "認字", english: "英文", gs: "常識" }[q.category];
  const options = q.shuffledOptions
    .map((option) => {
      const correctAttr = ui.e2e && option === q.answer ? ' data-correct="true"' : "";
      return `<button class="btn-ghost" data-action="quiz-answer" data-value="${escapeHtml(option)}" data-testid="quiz-option"${correctAttr}>${escapeHtml(option)}</button>`;
    })
    .join("");
  const feedback = ui.lastAnswer
    ? `<div class="feedback ${ui.lastAnswer.correct ? "good" : "bad"}" data-testid="quiz-feedback">${
        ui.lastAnswer.correct ? "好叻！" : "差少少"
      } ${escapeHtml(ui.lastAnswer.explain)}</div>
      <button data-action="quiz-next" data-testid="quiz-next">下一題</button>`
    : "";
  return `${hud(state)}
    <p class="tag">${escapeHtml(cat)} ｜ ${round.index + 1}/${round.questions.length}</p>
    <p class="prompt" data-testid="quiz-prompt">${escapeHtml(q.prompt)}</p>
    <div class="options ${ui.lastAnswer ? "muted" : ""}">${ui.lastAnswer ? "" : options}</div>
    ${feedback}`;
}

function gunCard(state: GameState, gun: Gun): string {
  const owned = state.ownedGunIds.includes(gun.id);
  const equipped = state.equippedGunId === gun.id;
  const locked = state.level < gun.unlockLevel;
  let action = `<button class="btn-small btn-accent" data-action="buy-gun" data-id="${gun.id}" data-testid="buy-gun-${gun.id}">買 ${gun.price} 金幣</button>`;
  if (owned) {
    action = equipped
      ? `<button class="btn-small btn-good" disabled>使用中</button>`
      : `<button class="btn-small" data-action="equip-gun" data-id="${gun.id}" data-testid="equip-gun-${gun.id}">裝備</button>`;
  } else if (locked) {
    action = `<button class="btn-small" disabled>Lv${gun.unlockLevel} 解鎖</button>`;
  }
  return `<article class="card" data-testid="gun-card-${gun.id}">
    <div class="card-top">
      <strong>${gun.emoji} ${escapeHtml(gun.nameZh)}</strong>
      <span class="muted">${escapeHtml(CATEGORY_LABEL[gun.category])}</span>
    </div>
    <p class="hint">${escapeHtml(gun.blurb)}</p>
    <p class="muted">打中金幣 +${gun.bonusCoins} ｜ 一次最多爆 ${gun.popCount} 個氣球</p>
    ${action}
  </article>`;
}

function shop(state: GameState, ui: UiState): string {
  const tabs = `<div class="shop-tabs">
    <button class="chip ${ui.shopTab === "guns" ? "active" : ""}" data-action="shop-tab" data-id="guns" data-testid="tab-guns">買槍</button>
    <button class="chip ${ui.shopTab === "ammo" ? "active" : ""}" data-action="shop-tab" data-id="ammo" data-testid="tab-ammo">買子彈</button>
  </div>`;
  if (ui.shopTab === "ammo") {
    const packs = AMMO_PACKS.map(
      (pack) => `<article class="card">
        <strong data-testid="ammo-pack-${pack.id}">${escapeHtml(pack.label)}</strong>
        <p class="hint">用金幣買。試槍場每一槍扣 1 發。</p>
        <button class="btn-small btn-accent" data-action="buy-ammo" data-id="${pack.id}" data-testid="buy-ammo-${pack.id}">買 ${pack.price} 金幣</button>
      </article>`,
    ).join("");
    return `${hud(state)}<h2>商店</h2>${tabs}<div class="list">${packs}</div>
      <div class="actions"><button class="btn-ghost" data-action="go-home">返主頁</button></div>`;
  }
  const filters: ShopFilter[] = ["all", "toy", "pistol", "smg", "shotgun", "rifle", "special"];
  const chips = filters
    .map((id) => {
      const label = id === "all" ? "全部" : CATEGORY_LABEL[id];
      return `<button class="chip ${ui.shopFilter === id ? "active" : ""}" data-action="shop-filter" data-id="${id}">${label}</button>`;
    })
    .join("");
  const guns = GUNS.filter((g) => ui.shopFilter === "all" || g.category === ui.shopFilter)
    .map((g) => gunCard(state, g))
    .join("");
  return `${hud(state)}<h2>商店</h2>${tabs}<div class="filters">${chips}</div><div class="list">${guns}</div>
    <div class="actions"><button class="btn-ghost" data-action="go-home">返主頁</button></div>`;
}

function rangeView(state: GameState, ui: UiState): string {
  const gate = canEnterRange(state);
  const gun = state.equippedGunId ? getGun(state.equippedGunId) : undefined;
  const balloons = ui.balloons
    .map(
      (b) =>
        `<button class="balloon ${b.popped ? "popped" : ""}" data-action="fire-balloon" data-id="${b.id}" data-testid="balloon" style="left:${b.x}%; top:${b.y}%" ${b.popped ? "disabled" : ""}>🎈</button>`,
    )
    .join("");
  return `${hud(state)}
    <h2>試槍場</h2>
    <p class="hint">點氣球或者撳開火。下面係你而家裝備嗰把槍嘅全圖。</p>
    ${gate.ok ? "" : `<div class="block" data-testid="range-block">${escapeHtml(gate.message)}</div>`}
    <div class="sky" data-testid="range-sky">
      ${balloons}
      ${renderGunPortrait(gun, ui.recoil)}
    </div>
    <div class="fire-wrap">
      <button class="btn-accent" data-action="fire" data-testid="btn-fire" ${gate.ok ? "" : "disabled"}>開火</button>
    </div>
    <div class="row">
      <button class="btn-ghost btn-small" data-action="go-shop" data-testid="btn-range-shop">買槍／子彈</button>
      <button class="btn-ghost btn-small" data-action="go-quiz">去答題</button>
    </div>
    <button class="tiny" data-action="go-home">返主頁</button>`;
}

export function renderApp(state: GameState, ui: UiState): string {
  const toast = ui.toast ? `<div class="toast" data-testid="toast">${escapeHtml(ui.toast)}</div>` : "";
  const body =
    ui.screen === "quiz" ? quizView(state, ui) : ui.screen === "shop" ? shop(state, ui) : ui.screen === "range" ? rangeView(state, ui) : home(state, ui);
  return `<main data-testid="screen-${ui.screen}">${body}${toast}</main>`;
}
