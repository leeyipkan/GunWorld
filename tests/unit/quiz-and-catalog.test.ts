import { describe, expect, it } from "vitest";
import { COINS_PER_CORRECT, GUNS, PERFECT_BONUS, QUESTIONS_PER_ROUND, STREAK_BONUS, getGun, levelFromXp } from "../../src/game/catalog";
import { hasThreeStreak, scoreQuiz } from "../../src/game/actions";
import { advanceQuestion, answerQuestion, createQuizRound, currentQuestion, getQuestions } from "../../src/game/quiz";
import { escapeHtml } from "../../src/ui/html";

describe("quiz bank", () => {
  it("covers four HK P1 subjects with unique ids", () => {
    const questions = getQuestions();
    const cats = new Set(questions.map((q) => q.category));
    expect(cats).toEqual(new Set(["math", "chinese", "english", "gs"]));
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
    expect(questions.length).toBeGreaterThanOrEqual(1080);
    const generated = questions.filter((q) => q.id.startsWith("gen_"));
    expect(generated.length).toBeGreaterThanOrEqual(1000);
    for (const q of questions) {
      expect(q.options).toContain(q.answer);
      expect(new Set(q.options).size).toBe(q.options.length);
    }
  });

  it("builds a mixed 5-question round from a seed", () => {
    const round = createQuizRound("e2e");
    expect(round.questions).toHaveLength(QUESTIONS_PER_ROUND);
    expect(new Set(round.questions.map((q) => q.category)).size).toBeGreaterThanOrEqual(4);
    const again = createQuizRound("e2e");
    expect(again.questions.map((q) => q.id)).toEqual(round.questions.map((q) => q.id));
  });

  it("keeps the current prompt until the player taps next", () => {
    const round = createQuizRound("e2e");
    const first = round.questions[0];
    if (!first) throw new Error("missing first question");
    const answered = answerQuestion(round, first.answer);
    expect(answered.correct).toBe(true);
    expect(answered.round.index).toBe(0);
    expect(currentQuestion(answered.round)?.id).toBe(first.id);
    const next = advanceQuestion(answered.round);
    expect(next.index).toBe(1);
    expect(next.finished).toBe(false);
  });
});

describe("scoring", () => {
  it("pays coins, streak and perfect bonus", () => {
    const perfect = [true, true, true, true, true];
    expect(hasThreeStreak(perfect)).toBe(true);
    expect(scoreQuiz(perfect)).toEqual({
      coins: 5 * COINS_PER_CORRECT + STREAK_BONUS + PERFECT_BONUS,
      xp: 50,
      correct: 5,
    });
    expect(scoreQuiz([true, false, true, false, true])).toEqual({
      coins: 3 * COINS_PER_CORRECT,
      xp: 30,
      correct: 3,
    });
  });
});

describe("catalog", () => {
  it("has unique guns including toys and realistic names", () => {
    expect(new Set(GUNS.map((g) => g.id)).size).toBe(GUNS.length);
    expect(GUNS.some((g) => g.category === "toy")).toBe(true);
    expect(GUNS.some((g) => g.id === "ar_ak")).toBe(true);
    expect(getGun("toy_water")?.price).toBe(120);
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(50)).toBe(2);
  });
});

describe("escapeHtml", () => {
  it("escapes markup so quiz text cannot break the page", () => {
    expect(escapeHtml(`<img src=x onerror=alert(1)>`)).toBe("&lt;img src=x onerror=alert(1)&gt;");
  });
});
