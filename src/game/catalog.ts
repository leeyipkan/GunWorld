import type { AmmoPack, Gun, GunArt, GunArtExtra, GunArtLength, GunArtTemplate } from "./types";

function art(
  template: GunArtTemplate,
  fill: string,
  accent: string,
  length: GunArtLength = "mid",
  extras: GunArtExtra[] = [],
): GunArt {
  return { template, fill, accent, length, extras };
}

export const COINS_PER_CORRECT = 15;
export const STREAK_BONUS = 10;
export const PERFECT_BONUS = 30;
export const QUESTIONS_PER_ROUND = 5;
export const XP_PER_CORRECT = 10;
export const XP_PER_LEVEL = 50;
export const RANGE_BALLOON_COUNT = 5;
export const MISS_BONUS_COINS = 0;
export const STORAGE_KEY = "gunworld-save-v1";

export const AMMO_PACKS: AmmoPack[] = [
  { id: "ammo10", label: "子彈 ×10", amount: 10, price: 20 },
  { id: "ammo30", label: "子彈 ×30", amount: 30, price: 50 },
  { id: "ammo50", label: "子彈 ×50", amount: 50, price: 80 },
];

export const GUN_PRICE_MULTIPLIER = 4;

const BASE_GUNS: Gun[] = [
  { id: "toy_water", nameZh: "水槍", category: "toy", price: 30, unlockLevel: 1, popCount: 1, bonusCoins: 2, emoji: "🔫", blurb: "入門玩具，射水爆氣球", art: art("toy", "#3ec6ff", "#ff5f7a", "mid", ["water"]) },
  { id: "toy_bubble", nameZh: "泡泡槍", category: "toy", price: 40, unlockLevel: 1, popCount: 1, bonusCoins: 2, emoji: "🫧", blurb: "慢慢射，特效好靚", art: art("toy", "#c9f0ff", "#ff8ad4", "short", ["bubble"]) },
  { id: "toy_nerf", nameZh: "軟彈槍", category: "toy", price: 60, unlockLevel: 1, popCount: 1, bonusCoins: 3, emoji: "🎯", blurb: "吸盤軟彈", art: art("toy", "#ff9f1c", "#16324f", "mid") },
  { id: "toy_cap", nameZh: "紙炮槍", category: "toy", price: 80, unlockLevel: 1, popCount: 1, bonusCoins: 3, emoji: "💥", blurb: "嘭一聲好威", art: art("pistol", "#c45c26", "#f3d39a", "short") },
  { id: "toy_pingpong", nameZh: "乒乓球槍", category: "toy", price: 90, unlockLevel: 1, popCount: 1, bonusCoins: 3, emoji: "🏓", blurb: "彈彈彈", art: art("toy", "#ff4d4d", "#ffffff", "mid") },
  { id: "toy_sling", nameZh: "彈弓", category: "toy", price: 70, unlockLevel: 1, popCount: 1, bonusCoins: 3, emoji: "🪀", blurb: "拉一拉再射", art: art("toy", "#8b5a2b", "#ffd56a", "short") },
  { id: "toy_laser_toy", nameZh: "玩具雷射槍", category: "toy", price: 120, unlockLevel: 2, popCount: 1, bonusCoins: 4, emoji: "✨", blurb: "光點好準", art: art("special", "#7b5cff", "#00f0ff", "mid") },
  { id: "toy_snow", nameZh: "雪球槍", category: "toy", price: 100, unlockLevel: 2, popCount: 1, bonusCoins: 4, emoji: "❄️", blurb: "冰冰涼涼", art: art("toy", "#e8f6ff", "#7ecbff", "mid", ["water"]) },
  { id: "toy_confetti", nameZh: "彩紙槍", category: "toy", price: 110, unlockLevel: 2, popCount: 1, bonusCoins: 4, emoji: "🎉", blurb: "慶祝爆發", art: art("toy", "#ff4d6d", "#ffe066", "short", ["rainbow"]) },
  { id: "toy_dart", nameZh: "飛鏢槍", category: "toy", price: 130, unlockLevel: 2, popCount: 1, bonusCoins: 4, emoji: "🪁", blurb: "黏喺靶上面", art: art("pistol", "#2dd4bf", "#16324f", "mid") },
  { id: "toy_foam", nameZh: "泡棉火箭筒", category: "toy", price: 180, unlockLevel: 3, popCount: 2, bonusCoins: 5, emoji: "🚀", blurb: "大範圍卡通爆炸", art: art("special", "#7ad151", "#ff7a18", "long", ["foam"]) },
  { id: "toy_rainbow", nameZh: "彩虹槍", category: "toy", price: 250, unlockLevel: 3, popCount: 2, bonusCoins: 6, emoji: "🌈", blurb: "彩虹氣球", art: art("rifle", "#ff5c8a", "#7b5cff", "long", ["rainbow"]) },
  { id: "p_revolver", nameZh: "左輪手槍", category: "pistol", price: 150, unlockLevel: 2, popCount: 1, bonusCoins: 4, emoji: "🔫", blurb: "六發裝彈動畫", art: art("pistol", "#6b7280", "#c9a227", "short", ["cylinder"]) },
  { id: "p_m1911", nameZh: "1911 手槍", category: "pistol", price: 200, unlockLevel: 2, popCount: 1, bonusCoins: 5, emoji: "🔫", blurb: "經典外型", art: art("pistol", "#4b5563", "#8b5a2b", "short") },
  { id: "p_glock", nameZh: "格洛克", category: "pistol", price: 220, unlockLevel: 2, popCount: 1, bonusCoins: 5, emoji: "🔫", blurb: "彈匣較多手感", art: art("pistol", "#1f2937", "#9ca3af", "short") },
  { id: "p_usp", nameZh: "USP", category: "pistol", price: 240, unlockLevel: 3, popCount: 1, bonusCoins: 5, emoji: "🔫", blurb: "穩定好瞄", art: art("pistol", "#374151", "#111827", "mid", ["silencer"]) },
  { id: "p_deagle", nameZh: "沙漠之鷹", category: "pistol", price: 320, unlockLevel: 3, popCount: 2, bonusCoins: 6, emoji: "🦅", blurb: "一發可爆兩個氣球", art: art("pistol", "#9ca3af", "#d97706", "mid") },
  { id: "p_p226", nameZh: "P226", category: "pistol", price: 260, unlockLevel: 3, popCount: 1, bonusCoins: 5, emoji: "🔫", blurb: "準星穩定", art: art("pistol", "#4b5563", "#2563eb", "short") },
  { id: "p_beretta", nameZh: "貝雷塔", category: "pistol", price: 250, unlockLevel: 3, popCount: 1, bonusCoins: 5, emoji: "🔫", blurb: "銀白塗裝", art: art("pistol", "#e5e7eb", "#6b7280", "mid") },
  { id: "p_python", nameZh: "蟒蛇左輪", category: "pistol", price: 300, unlockLevel: 3, popCount: 1, bonusCoins: 6, emoji: "🐍", blurb: "金色收藏", art: art("pistol", "#eab308", "#92400e", "short", ["gold", "cylinder"]) },
  { id: "p_five_seven", nameZh: "Five-seveN", category: "pistol", price: 280, unlockLevel: 3, popCount: 1, bonusCoins: 5, emoji: "7️⃣", blurb: "射得快", art: art("pistol", "#f8fafc", "#475569", "short") },
  { id: "p_magnum", nameZh: "麥格農", category: "pistol", price: 400, unlockLevel: 4, popCount: 2, bonusCoins: 7, emoji: "💫", blurb: "好大聲（可關）", art: art("pistol", "#111827", "#f59e0b", "mid") },
  { id: "smg_mp5", nameZh: "MP5", category: "smg", price: 380, unlockLevel: 3, popCount: 2, bonusCoins: 6, emoji: "🔫", blurb: "連射好穩", art: art("smg", "#4b5563", "#1f2937", "mid") },
  { id: "smg_uzi", nameZh: "烏茲", category: "smg", price: 350, unlockLevel: 3, popCount: 2, bonusCoins: 5, emoji: "🔫", blurb: "射速極快", art: art("smg", "#6b7280", "#111827", "short") },
  { id: "smg_p90", nameZh: "P90", category: "smg", price: 420, unlockLevel: 4, popCount: 2, bonusCoins: 6, emoji: "🔫", blurb: "子彈好多", art: art("smg", "#374151", "#f97316", "mid") },
  { id: "smg_vector", nameZh: "Vector", category: "smg", price: 450, unlockLevel: 4, popCount: 2, bonusCoins: 6, emoji: "⚡", blurb: "短點射好準", art: art("smg", "#1e293b", "#22d3ee", "short") },
  { id: "sg_pump", nameZh: "泵動散彈", category: "shotgun", price: 360, unlockLevel: 3, popCount: 3, bonusCoins: 6, emoji: "💥", blurb: "近距離爆一排", art: art("shotgun", "#57534e", "#b45309", "long") },
  { id: "sg_double", nameZh: "雙管散彈", category: "shotgun", price: 340, unlockLevel: 3, popCount: 2, bonusCoins: 6, emoji: "💥", blurb: "兩發就裝彈", art: art("shotgun", "#44403c", "#a8a29e", "long", ["twin"]) },
  { id: "sg_spas", nameZh: "SPAS-12", category: "shotgun", price: 480, unlockLevel: 4, popCount: 3, bonusCoins: 7, emoji: "💥", blurb: "半自動散彈", art: art("shotgun", "#292524", "#16a34a", "long") },
  { id: "sg_aa12", nameZh: "AA-12", category: "shotgun", price: 550, unlockLevel: 5, popCount: 3, bonusCoins: 8, emoji: "💥", blurb: "連射散彈好耗彈", art: art("shotgun", "#1f2937", "#f97316", "mid") },
  { id: "ar_m4", nameZh: "M4", category: "rifle", price: 500, unlockLevel: 4, popCount: 2, bonusCoins: 7, emoji: "🔫", blurb: "全能步槍", art: art("rifle", "#4b5563", "#111827", "long") },
  { id: "ar_ak", nameZh: "AK-47", category: "rifle", price: 520, unlockLevel: 4, popCount: 2, bonusCoins: 8, emoji: "🔫", blurb: "打中金幣多少少", art: art("rifle", "#6b7280", "#92400e", "long") },
  { id: "ar_scar", nameZh: "SCAR", category: "rifle", price: 560, unlockLevel: 4, popCount: 2, bonusCoins: 7, emoji: "🔫", blurb: "又穩又貴", art: art("rifle", "#57534e", "#ea580c", "long") },
  { id: "ar_aug", nameZh: "AUG", category: "rifle", price: 540, unlockLevel: 4, popCount: 2, bonusCoins: 7, emoji: "🔭", blurb: "自帶瞄具", art: art("rifle", "#3f3f46", "#22c55e", "long", ["scope"]) },
  { id: "ar_g36", nameZh: "G36", category: "rifle", price: 530, unlockLevel: 4, popCount: 2, bonusCoins: 7, emoji: "🔫", blurb: "射速均衡", art: art("rifle", "#d6d3d1", "#44403c", "long", ["scope"]) },
  { id: "sr_kar98", nameZh: "Kar98k", category: "rifle", price: 480, unlockLevel: 4, popCount: 2, bonusCoins: 8, emoji: "🎯", blurb: "栓動好準", art: art("rifle", "#7c2d12", "#1f2937", "long") },
  { id: "sr_awp", nameZh: "AWP", category: "rifle", price: 700, unlockLevel: 5, popCount: 4, bonusCoins: 10, emoji: "🎯", blurb: "一發爆一排氣球", art: art("rifle", "#0f766e", "#111827", "long", ["scope"]) },
  { id: "sr_m24", nameZh: "M24", category: "rifle", price: 620, unlockLevel: 5, popCount: 3, bonusCoins: 9, emoji: "🎯", blurb: "精準步槍", art: art("rifle", "#365314", "#111827", "long", ["scope"]) },
  { id: "lmg_m249", nameZh: "M249", category: "rifle", price: 650, unlockLevel: 5, popCount: 3, bonusCoins: 8, emoji: "🔫", blurb: "彈多、射得耐", art: art("rifle", "#52525b", "#f59e0b", "long") },
  { id: "rail_laser", nameZh: "遊戲雷射步槍", category: "special", price: 800, unlockLevel: 5, popCount: 3, bonusCoins: 10, emoji: "🟣", blurb: "科幻收藏", art: art("special", "#6d28d9", "#22d3ee", "long", ["scope"]) },
  { id: "hk_police_toy", nameZh: "玩具警察槍", category: "special", price: 200, unlockLevel: 2, popCount: 1, bonusCoins: 5, emoji: "👮", blurb: "只係玩具，真槍係大人工作用", art: art("pistol", "#1d4ed8", "#f8fafc", "short") },
  { id: "hk_watercannon", nameZh: "水炮車玩具", category: "special", price: 280, unlockLevel: 3, popCount: 3, bonusCoins: 6, emoji: "🚒", blurb: "灑水清好多氣球", art: art("toy", "#dc2626", "#facc15", "long", ["water", "foam"]) },
  { id: "gold_ak", nameZh: "金 AK", category: "special", price: 900, unlockLevel: 5, popCount: 2, bonusCoins: 12, emoji: "🥇", blurb: "炫耀用", art: art("rifle", "#f4c430", "#92400e", "long", ["gold"]) },
  { id: "gold_deagle", nameZh: "金沙鷹", category: "special", price: 850, unlockLevel: 5, popCount: 2, bonusCoins: 12, emoji: "🥇", blurb: "金色收藏", art: art("pistol", "#f4c430", "#b45309", "mid", ["gold"]) },
  { id: "camo_m4", nameZh: "迷彩 M4", category: "special", price: 580, unlockLevel: 4, popCount: 2, bonusCoins: 8, emoji: "🌿", blurb: "迷彩塗裝", art: art("rifle", "#4d7c0f", "#1f2937", "long", ["camo"]) },
  { id: "starter_look", nameZh: "練習標靶槍", category: "special", price: 45, unlockLevel: 1, popCount: 1, bonusCoins: 3, emoji: "🎪", blurb: "專門打紙靶", art: art("pistol", "#fb7185", "#ffffff", "short") },
];

export const GUNS: Gun[] = BASE_GUNS.map((gun) => ({ ...gun, price: gun.price * GUN_PRICE_MULTIPLIER }));

export const CATEGORY_LABEL: Record<Gun["category"], string> = {
  toy: "玩具槍",
  pistol: "手槍",
  smg: "衝鋒槍",
  shotgun: "散彈槍",
  rifle: "步槍",
  special: "特別收藏",
};

export function getGun(id: string): Gun | undefined {
  return GUNS.find((gun) => gun.id === id);
}

export function getAmmoPack(id: string): AmmoPack | undefined {
  return AMMO_PACKS.find((pack) => pack.id === id);
}

export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export function isGunUnlocked(gun: Gun, level: number): boolean {
  return level >= gun.unlockLevel;
}
