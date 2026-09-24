import { generatedQuestions } from "./generatedQuestions";
import type { Question, QuizCategory, QuizQuestion, QuizRound } from "./types";
import { QUESTIONS_PER_ROUND } from "./catalog";

const QUESTIONS: Question[] = [
  { id: "m1", category: "math", prompt: "3 + 2 = ?", options: ["4", "5", "6"], answer: "5", explain: "3 再數 2 下就係 5。" },
  { id: "m2", category: "math", prompt: "7 + 5 = ?", options: ["10", "12", "15"], answer: "12", explain: "7 + 3 = 10，再加 2 就 12。" },
  { id: "m3", category: "math", prompt: "10 - 4 = ?", options: ["5", "6", "7"], answer: "6", explain: "10 減 4 剩 6。" },
  { id: "m4", category: "math", prompt: "8 + 2 = ?", options: ["9", "10", "12"], answer: "10", explain: "8 加 2 就夠 10。" },
  { id: "m5", category: "math", prompt: "6 + 6 = ?", options: ["11", "12", "16"], answer: "12", explain: "兩個 6 加埋係 12。" },
  { id: "m6", category: "math", prompt: "9 - 3 = ?", options: ["5", "6", "7"], answer: "6", explain: "9 減 3 係 6。" },
  { id: "m7", category: "math", prompt: "1 + 9 = ?", options: ["9", "10", "11"], answer: "10", explain: "1 加 9 等於 10。" },
  { id: "m8", category: "math", prompt: "15 - 5 = ?", options: ["5", "10", "20"], answer: "10", explain: "15 減 5 係 10。" },
  { id: "m9", category: "math", prompt: "4 + 8 = ?", options: ["11", "12", "14"], answer: "12", explain: "4 + 6 = 10，再加 2。" },
  { id: "m10", category: "math", prompt: "20 - 1 = ?", options: ["19", "21", "18"], answer: "19", explain: "20 減 1 係 19。" },
  { id: "m11", category: "math", prompt: "哪個較大？", options: ["9", "6", "3"], answer: "9", explain: "9 大過 6 同 3。" },
  { id: "m12", category: "math", prompt: "圖有 5 個蘋果，再加 2 個，一共幾個？", options: ["6", "7", "8"], answer: "7", explain: "5 + 2 = 7。" },
  { id: "m13", category: "math", prompt: "2 + 2 + 2 = ?", options: ["4", "6", "8"], answer: "6", explain: "三個 2 加埋係 6。" },
  { id: "m14", category: "math", prompt: "10 - 10 = ?", options: ["0", "1", "10"], answer: "0", explain: "全部減走就係 0。" },
  { id: "m15", category: "math", prompt: "11 + 4 = ?", options: ["14", "15", "16"], answer: "15", explain: "11 加 4 係 15。" },
  { id: "m16", category: "math", prompt: "18 - 8 = ?", options: ["8", "10", "12"], answer: "10", explain: "18 減 8 係 10。" },
  { id: "m17", category: "math", prompt: "0 + 7 = ?", options: ["0", "7", "8"], answer: "7", explain: "加 0 唔會變。" },
  { id: "m18", category: "math", prompt: "13 - 3 = ?", options: ["9", "10", "11"], answer: "10", explain: "13 減 3 係 10。" },
  { id: "m19", category: "math", prompt: "5 個再 5 個係幾多？", options: ["5", "10", "15"], answer: "10", explain: "兩個 5 係 10。" },
  { id: "m20", category: "math", prompt: "16 + 2 = ?", options: ["17", "18", "19"], answer: "18", explain: "16 加 2 係 18。" },
  { id: "c1", category: "chinese", prompt: "太陽可以用邊個字？", options: ["日", "月", "水"], answer: "日", explain: "日間有太陽，用「日」。" },
  { id: "c2", category: "chinese", prompt: "夜晚天上亮亮嘅係？", options: ["日", "月", "火"], answer: "月", explain: "夜晚見到月。" },
  { id: "c3", category: "chinese", prompt: "口渴要飲？", options: ["火", "水", "土"], answer: "水", explain: "要飲水。" },
  { id: "c4", category: "chinese", prompt: "一＿書，量詞係邊個？", options: ["隻", "本", "條"], answer: "本", explain: "一本書。" },
  { id: "c5", category: "chinese", prompt: "「朋友」邊個先寫啱？", options: ["朋友", "朋反", "朋有"], answer: "朋友", explain: "正確寫法係朋友。" },
  { id: "c6", category: "chinese", prompt: "人用邊樣寫字同攞嘢？", options: ["手", "腳", "耳"], answer: "手", explain: "用手寫同攞。" },
  { id: "c7", category: "chinese", prompt: "食嘢用邊個字？", options: ["口", "目", "耳"], answer: "口", explain: "用口食。" },
  { id: "c8", category: "chinese", prompt: "好高好大嘅天然嘢，常常係？", options: ["山", "刀", "尺"], answer: "山", explain: "山好高。" },
  { id: "c9", category: "chinese", prompt: "樹用邊個字？", options: ["木", "金", "石"], answer: "木", explain: "樹係木。" },
  { id: "c10", category: "chinese", prompt: "邊個字表示大過細？", options: ["小", "大", "少"], answer: "大", explain: "「大」即係大。" },
  { id: "c11", category: "chinese", prompt: "上樓係邊個方向？", options: ["上", "下", "左"], answer: "上", explain: "上樓向上。" },
  { id: "c12", category: "chinese", prompt: "一＿魚？", options: ["條", "本", "朵"], answer: "條", explain: "一條魚。" },
  { id: "c13", category: "chinese", prompt: "花用邊個量詞？", options: ["朵", "本", "輛"], answer: "朵", explain: "一朵花。" },
  { id: "c14", category: "chinese", prompt: "爸爸媽媽係我哋嘅？", options: ["家人", "家具", "家課"], answer: "家人", explain: "爸爸媽媽係家人。" },
  { id: "c15", category: "chinese", prompt: "用眼睇，邊個字？", options: ["目", "口", "手"], answer: "目", explain: "目即係眼。" },
  { id: "c16", category: "chinese", prompt: "火好熱，邊個先啱？", options: ["火", "冰", "風"], answer: "火", explain: "火係熱嘅。" },
  { id: "c17", category: "chinese", prompt: "學校裏教書嘅人係？", options: ["老師", "老市", "老是"], answer: "老師", explain: "教書叫老師。" },
  { id: "c18", category: "chinese", prompt: "一＿車？", options: ["輛", "本", "隻"], answer: "輛", explain: "一輛車。" },
  { id: "c19", category: "chinese", prompt: "細過「大」嘅字係？", options: ["小", "多", "高"], answer: "小", explain: "大嘅相反係小。" },
  { id: "c20", category: "chinese", prompt: "下雨天地上好多？", options: ["水", "火", "煙"], answer: "水", explain: "雨係水。" },
  { id: "e1", category: "english", prompt: "邊個係字母 A？", options: ["A", "B", "C"], answer: "A", explain: "第一個字母係 A。" },
  { id: "e2", category: "english", prompt: "B 嘅細楷係邊個？", options: ["b", "d", "p"], answer: "b", explain: "B 配 b。" },
  { id: "e3", category: "english", prompt: "🐕 英文係？", options: ["cat", "dog", "pig"], answer: "dog", explain: "狗係 dog。" },
  { id: "e4", category: "english", prompt: "🐱 英文係？", options: ["cat", "cow", "car"], answer: "cat", explain: "貓係 cat。" },
  { id: "e5", category: "english", prompt: "Apple 開頭字母係？", options: ["A", "E", "P"], answer: "A", explain: "Apple 由 A 開始。" },
  { id: "e6", category: "english", prompt: "邊個係字母 Z？", options: ["X", "Y", "Z"], answer: "Z", explain: "最後一個字母係 Z。" },
  { id: "e7", category: "english", prompt: "Bus 開頭係？", options: ["B", "D", "P"], answer: "B", explain: "Bus 由 B 開始。" },
  { id: "e8", category: "english", prompt: "☀️ sun 開頭字母？", options: ["S", "C", "N"], answer: "S", explain: "sun 由 s 開始。" },
  { id: "e9", category: "english", prompt: "C 後面係邊個字母？", options: ["B", "D", "E"], answer: "D", explain: "A B C D。" },
  { id: "e10", category: "english", prompt: "🐷 英文係？", options: ["pig", "pen", "pin"], answer: "pig", explain: "豬係 pig。" },
  { id: "e11", category: "english", prompt: "I 嘅細楷？", options: ["i", "l", "j"], answer: "i", explain: "I 配 i。" },
  { id: "e12", category: "english", prompt: "Red 係咩意思？", options: ["紅色", "藍色", "綠色"], answer: "紅色", explain: "red = 紅色。" },
  { id: "e13", category: "english", prompt: "Book 係？", options: ["書", "包", "筆"], answer: "書", explain: "book 係書。" },
  { id: "e14", category: "english", prompt: "邊個係字母 M？", options: ["N", "M", "W"], answer: "M", explain: "睇兩座山形就係 M。" },
  { id: "e15", category: "english", prompt: "Fish 係？", options: ["魚", "鳥", "蟲"], answer: "魚", explain: "fish 係魚。" },
  { id: "e16", category: "english", prompt: "E 後面係？", options: ["D", "F", "G"], answer: "F", explain: "E 之後係 F。" },
  { id: "e17", category: "english", prompt: "Mum 係？", options: ["媽媽", "爸爸", "老師"], answer: "媽媽", explain: "mum 係媽媽。" },
  { id: "e18", category: "english", prompt: "School 係？", options: ["學校", "公園", "商場"], answer: "學校", explain: "school 係學校。" },
  { id: "e19", category: "english", prompt: "邊個係字母 O？", options: ["O", "Q", "D"], answer: "O", explain: "圓圓嘅係 O。" },
  { id: "e20", category: "english", prompt: "Blue 係？", options: ["藍色", "黃色", "白色"], answer: "藍色", explain: "blue = 藍色。" },
  { id: "g1", category: "gs", prompt: "紅燈應該點？", options: ["停", "跑", "跳"], answer: "停", explain: "紅燈要停。" },
  { id: "g2", category: "gs", prompt: "綠燈先可以？", options: ["行", "瞓", "爬窗"], answer: "行", explain: "綠燈先過馬路。" },
  { id: "g3", category: "gs", prompt: "落雨應該帶？", options: ["雨傘", "太陽眼鏡", "雪糕"], answer: "雨傘", explain: "落雨帶傘。" },
  { id: "g4", category: "gs", prompt: "保護牙齒要？", options: ["刷牙", "食糖", "唔沖涼"], answer: "刷牙", explain: "朝晚刷牙。" },
  { id: "g5", category: "gs", prompt: "垃圾應該丟去？", options: ["垃圾桶", "地下", "海"], answer: "垃圾桶", explain: "垃圾入桶。" },
  { id: "g6", category: "gs", prompt: "過馬路要行？", options: ["斑馬線", "車路中間", "隧道頂"], answer: "斑馬線", explain: "行斑馬線安全。" },
  { id: "g7", category: "gs", prompt: "好熱嘅天氣要飲？", options: ["水", "洗衣液", "膠水"], answer: "水", explain: "熱就要飲水。" },
  { id: "g8", category: "gs", prompt: "香港巴士多數係？", options: ["交通工具", "玩具飛機", "雪櫃"], answer: "交通工具", explain: "巴士載人去學校同屋企。" },
  { id: "g9", category: "gs", prompt: "夜晚要瞓覺，因為身體要？", options: ["休息", "跑步", "曬太陽"], answer: "休息", explain: "瞓覺先有氣力。" },
  { id: "g10", category: "gs", prompt: "食飯前應該？", options: ["洗手", "玩泥", "唔洗"], answer: "洗手", explain: "洗手先食，減少病菌。" },
  { id: "g11", category: "gs", prompt: "真槍係邊個先應該用？", options: ["警察等受訓大人", "小朋友", "任何人"], answer: "警察等受訓大人", explain: "小朋友只用玩具，唔好掂真槍。" },
  { id: "g12", category: "gs", prompt: "火警應該？", options: ["叫大人同離開", "匿喺房玩", "用被遮火"], answer: "叫大人同離開", explain: "有火要通知大人，快走。" },
  { id: "g13", category: "gs", prompt: "身體唔舒服要話俾邊個知？", options: ["爸爸媽媽或老師", "陌生人", "唔好講"], answer: "爸爸媽媽或老師", explain: "唔舒服要話大人知。" },
  { id: "g14", category: "gs", prompt: "太陽好猛要？", options: ["戴帽／遮陰", "望實太陽", "著厚褸"], answer: "戴帽／遮陰", explain: "保護皮膚同眼睛。" },
  { id: "g15", category: "gs", prompt: "公園玩完玩具應該？", options: ["執好", "丟低", "掟走"], answer: "執好", explain: "玩具要執好。" },
  { id: "g16", category: "gs", prompt: "過馬路可不可以玩電話？", options: ["唔可以", "可以", "要睇片先"], answer: "唔可以", explain: "過路要睇車。" },
  { id: "g17", category: "gs", prompt: "耳朵入面唔好？", options: ["塞細嘢", "洗手", "戴帽"], answer: "塞細嘢", explain: "細物件唔好入耳。" },
  { id: "g18", category: "gs", prompt: "陌生人請你上车應該？", options: ["拒絕同找大人", "即刻上车", "保密"], answer: "拒絕同找大人", explain: "唔跟陌生人走。" },
  { id: "g19", category: "gs", prompt: "運動之後應該？", options: ["休息同飲水", "即食十隻雪糕", "唔出聲"], answer: "休息同飲水", explain: "運動後休息飲水。" },
  { id: "g20", category: "gs", prompt: "書包太重應該？", options: ["話俾大人知", "自己忍", "掉書包"], answer: "話俾大人知", explain: "大人可以幫你。" },
];

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(list: T[], rand: () => number): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const current = copy[i];
    const swap = copy[j];
    if (current === undefined || swap === undefined) continue;
    copy[i] = swap;
    copy[j] = current;
  }
  return copy;
}

let allQuestions: Question[] | null = null;

export function getQuestions(): Question[] {
  if (!allQuestions) {
    const prompts = new Set(QUESTIONS.map((item) => item.prompt));
    const generated = generatedQuestions(prompts);
    allQuestions = [...QUESTIONS, ...generated];
  }
  return allQuestions;
}

export function createQuizRound(seed = "play"): QuizRound {
  const rand = mulberry32(hashSeed(seed));
  const bank = getQuestions();
  const byCategory: Record<QuizCategory, Question[]> = {
    math: bank.filter((item) => item.category === "math"),
    chinese: bank.filter((item) => item.category === "chinese"),
    english: bank.filter((item) => item.category === "english"),
    gs: bank.filter((item) => item.category === "gs"),
  };
  const categories: QuizCategory[] = ["math", "chinese", "english", "gs"];
  const picked: Question[] = [];
  for (const category of categories) {
    const pool = shuffle(byCategory[category], rand);
    const first = pool[0];
    if (first) picked.push(first);
  }
  const remaining = shuffle(
    bank.filter((item) => !picked.some((p) => p.id === item.id)),
    rand,
  );
  while (picked.length < QUESTIONS_PER_ROUND) {
    const next = remaining.shift();
    if (!next) break;
    picked.push(next);
  }
  const questions: QuizQuestion[] = shuffle(picked, rand).slice(0, QUESTIONS_PER_ROUND).map((q) => ({
    ...q,
    shuffledOptions: shuffle(q.options, rand),
  }));
  return {
    questions,
    index: 0,
    results: [],
    finished: false,
  };
}

export function currentQuestion(round: QuizRound): QuizQuestion | undefined {
  return round.questions[round.index];
}

export function answerQuestion(round: QuizRound, option: string): { round: QuizRound; correct: boolean } {
  const question = currentQuestion(round);
  if (!question || round.finished) {
    return { round, correct: false };
  }
  if (round.results.length > round.index) {
    return { round, correct: round.results[round.index] === true };
  }
  const correct = option === question.answer;
  return {
    correct,
    round: {
      ...round,
      results: [...round.results, correct],
    },
  };
}

export function advanceQuestion(round: QuizRound): QuizRound {
  if (round.finished || round.results.length <= round.index) return round;
  const nextIndex = round.index + 1;
  if (nextIndex >= round.questions.length) {
    return { ...round, finished: true };
  }
  return { ...round, index: nextIndex };
}
