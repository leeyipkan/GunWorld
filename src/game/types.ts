export type GunCategory = "toy" | "pistol" | "smg" | "shotgun" | "rifle" | "special";

export type QuizCategory = "math" | "chinese" | "english" | "gs";

export type Screen = "home" | "quiz" | "shop" | "range";

export type ShopTab = "guns" | "ammo";

export type GunArtTemplate = "toy" | "pistol" | "smg" | "shotgun" | "rifle" | "special";
export type GunArtLength = "short" | "mid" | "long";
export type GunArtExtra = "scope" | "silencer" | "gold" | "camo" | "rainbow" | "water" | "bubble" | "foam" | "cylinder" | "twin";

export type GunArt = {
  template: GunArtTemplate;
  fill: string;
  accent: string;
  length: GunArtLength;
  extras: GunArtExtra[];
};

export type Gun = {
  id: string;
  nameZh: string;
  category: GunCategory;
  price: number;
  unlockLevel: number;
  popCount: number;
  bonusCoins: number;
  emoji: string;
  blurb: string;
  art: GunArt;
};

export type AmmoPack = {
  id: string;
  label: string;
  amount: number;
  price: number;
};

export type Question = {
  id: string;
  category: QuizCategory;
  prompt: string;
  options: string[];
  answer: string;
  explain: string;
};

export type QuizQuestion = Question & {
  shuffledOptions: string[];
};

export type QuizRound = {
  questions: QuizQuestion[];
  index: number;
  results: boolean[];
  finished: boolean;
};

export type RangeBalloon = {
  id: string;
  x: number;
  y: number;
  popped: boolean;
};

export type GameState = {
  coins: number;
  ammo: number;
  ownedGunIds: string[];
  equippedGunId: string | null;
  xp: number;
  level: number;
  quizCorrectTotal: number;
  balloonsPopped: number;
  shotsFired: number;
};

export type ActionOk<T = GameState> = {
  ok: true;
  state: T;
  message: string;
  coinsDelta?: number;
  popped?: number;
};

export type ActionErr = {
  ok: false;
  code:
    | "need_coins"
    | "already_owned"
    | "locked"
    | "need_gun"
    | "need_ammo"
    | "not_owned"
    | "need_target"
    | "unknown_item";
  message: string;
  state: GameState;
};

export type ActionResult = ActionOk | ActionErr;
