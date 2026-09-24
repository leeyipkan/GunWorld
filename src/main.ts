import "./style.css";
import { applyQuizReward, buyAmmo, buyGun, createBalloons, equipGun, fireAtBalloons, refillBalloons } from "./game/actions";
import { createQuizRound, answerQuestion, advanceQuestion, currentQuestion } from "./game/quiz";
import { createInitialState, loadState, saveState } from "./game/state";
import type { GameState } from "./game/types";
import { renderApp, type ShopFilter, type UiState } from "./ui/render";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("缺少 #app");

const params = new URLSearchParams(location.search);
const e2e = params.has("e2e");
const quizSeed = params.get("seed") ?? (e2e ? "e2e" : "play");
let recoilTimer = 0;

let state: GameState = loadState();
let ui: UiState = {
  screen: "home",
  shopTab: "guns",
  shopFilter: "all",
  quiz: null,
  lastAnswer: null,
  quizSummary: null,
  balloons: createBalloons(),
  toast: "",
  e2e,
  recoil: false,
};

function setState(next: GameState): void {
  state = next;
  saveState(state);
}

function toast(message: string): void {
  ui = { ...ui, toast: message };
  render();
}

function render(): void {
  app.innerHTML = renderApp(state, ui);
}

function startQuiz(): void {
  ui = {
    ...ui,
    screen: "quiz",
    quiz: createQuizRound(`${quizSeed}-${Date.now()}-${state.quizCorrectTotal}`),
    lastAnswer: null,
    quizSummary: null,
    toast: "",
  };
  if (e2e) {
    ui = { ...ui, quiz: createQuizRound("e2e") };
  }
  render();
}

function finishQuizIfNeeded(): void {
  const round = ui.quiz;
  if (!round?.finished || ui.quizSummary) return;
  const result = applyQuizReward(state, round.results);
  if (result.ok) {
    setState(result.state);
    ui = {
      ...ui,
      quizSummary: { coins: result.coinsDelta ?? 0, correct: round.results.filter(Boolean).length },
      lastAnswer: null,
      toast: result.message,
    };
  }
}

app.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest<HTMLElement>("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id ?? "";
  const value = button.dataset.value ?? "";

  if (action === "go-home") {
    ui = { ...ui, screen: "home", toast: "" };
    render();
    return;
  }
  if (action === "go-quiz") {
    startQuiz();
    return;
  }
  if (action === "go-shop") {
    ui = { ...ui, screen: "shop", toast: "" };
    render();
    return;
  }
  if (action === "go-range") {
    ui = { ...ui, screen: "range", balloons: refillBalloons(createBalloons()), toast: "", recoil: false };
    render();
    return;
  }
  if (action === "shop-tab") {
    ui = { ...ui, shopTab: id === "ammo" ? "ammo" : "guns" };
    render();
    return;
  }
  if (action === "shop-filter") {
    ui = { ...ui, shopFilter: id as ShopFilter };
    render();
    return;
  }
  if (action === "buy-gun") {
    const result = buyGun(state, id);
    if (result.ok) setState(result.state);
    toast(result.message);
    return;
  }
  if (action === "buy-ammo") {
    const result = buyAmmo(state, id);
    if (result.ok) setState(result.state);
    toast(result.message);
    return;
  }
  if (action === "equip-gun") {
    const result = equipGun(state, id);
    if (result.ok) setState(result.state);
    toast(result.message);
    return;
  }
  if (action === "quiz-answer") {
    if (!ui.quiz || ui.lastAnswer) return;
    const answered = answerQuestion(ui.quiz, value);
    const question = currentQuestion(ui.quiz);
    ui = {
      ...ui,
      quiz: answered.round,
      lastAnswer: {
        correct: answered.correct,
        explain: question?.explain ?? "",
      },
    };
    render();
    return;
  }
  if (action === "quiz-next") {
    if (!ui.quiz) return;
    const advanced = advanceQuestion(ui.quiz);
    ui = { ...ui, quiz: advanced, lastAnswer: null };
    if (advanced.finished) {
      finishQuizIfNeeded();
    }
    render();
    return;
  }
  if (action === "fire" || action === "fire-balloon") {
    const targetId = action === "fire-balloon" ? id : undefined;
    const result = fireAtBalloons(state, ui.balloons, targetId);
    if (result.ok) {
      setState(result.state);
      ui = { ...ui, balloons: refillBalloons(result.balloons), toast: result.message, recoil: true };
      render();
      window.clearTimeout(recoilTimer);
      recoilTimer = window.setTimeout(() => {
        ui = { ...ui, recoil: false };
        if (ui.screen === "range") render();
      }, 140);
    } else {
      toast(result.message);
    }
    return;
  }
  if (action === "reset-save") {
    if (!window.confirm("確定清進度？金幣、槍同子彈都會冇。")) return;
    localStorage.removeItem("gunworld-save-v1");
    setState(createInitialState());
    ui = { ...ui, screen: "home", quiz: null, quizSummary: null, balloons: createBalloons(), toast: "已重設" };
    render();
  }
});

render();

declare global {
  interface Window {
    __GUNWORLD__?: { getState: () => GameState };
  }
}

window.__GUNWORLD__ = {
  getState: () => state,
};
