import type { Gun, GunArt } from "../game/types";
import { escapeHtml } from "./html";

const INK = "#16324f";

function barrelExtra(length: GunArt["length"]): number {
  if (length === "short") return 0;
  if (length === "long") return 110;
  return 50;
}

function cssColor(value: string): string {
  return /^#[0-9a-fA-F]{3,8}$/.test(value) ? value : "#64748b";
}

function paint(art: GunArt, empty: boolean): { fill: string; accent: string } {
  if (empty) return { fill: "#cbd5e1", accent: "#94a3b8" };
  if (art.extras.includes("gold")) return { fill: "#f4c430", accent: "#b45309" };
  if (art.extras.includes("camo")) return { fill: "#4d7c0f", accent: "#1f2937" };
  return { fill: cssColor(art.fill), accent: cssColor(art.accent) };
}

function muzzleX(template: GunArt["template"], length: GunArt["length"]): number {
  const extra = barrelExtra(length);
  if (template === "pistol") return 560 + extra;
  if (template === "smg") return 620 + extra * 0.6;
  if (template === "shotgun") return 700 + extra * 0.5;
  if (template === "rifle") return 720 + extra * 0.45;
  if (template === "special") return 680 + extra * 0.5;
  return 640 + extra * 0.7;
}

function extrasSvg(art: GunArt, empty: boolean, mx: number): string {
  const { accent, fill } = paint(art, empty);
  const bits: string[] = [];
  if (art.extras.includes("scope")) {
    bits.push(
      `<rect x="${mx - 220}" y="68" width="120" height="28" rx="8" fill="${accent}" stroke="${INK}" stroke-width="7"/>`,
      `<rect x="${mx - 188}" y="46" width="56" height="26" rx="8" fill="#e2e8f0" stroke="${INK}" stroke-width="7"/>`,
    );
  }
  if (art.extras.includes("silencer")) {
    bits.push(`<rect x="${mx - 8}" y="142" width="90" height="28" rx="12" fill="${accent}" stroke="${INK}" stroke-width="7"/>`);
  }
  if (art.extras.includes("camo")) {
    bits.push(
      `<circle cx="${mx - 260}" cy="150" r="16" fill="${accent}" opacity="0.7"/>`,
      `<circle cx="${mx - 330}" cy="128" r="12" fill="${fill}" opacity="0.9"/>`,
      `<circle cx="${mx - 400}" cy="160" r="14" fill="${accent}" opacity="0.55"/>`,
    );
  }
  if (art.extras.includes("rainbow")) {
    bits.push(
      `<path d="M${mx - 80} 108 Q ${mx - 20} 70 ${mx + 40} 108" fill="none" stroke="#ff5c8a" stroke-width="10"/>`,
      `<path d="M${mx - 80} 120 Q ${mx - 20} 86 ${mx + 40} 120" fill="none" stroke="#ffe066" stroke-width="10"/>`,
      `<path d="M${mx - 80} 132 Q ${mx - 20} 102 ${mx + 40} 132" fill="none" stroke="#7b5cff" stroke-width="10"/>`,
    );
  }
  return bits.join("");
}

function toySvg(art: GunArt, empty: boolean): string {
  const { fill, accent } = paint(art, empty);
  const extra = barrelExtra(art.length);
  const tank = art.extras.includes("bubble")
    ? `<ellipse cx="310" cy="108" rx="78" ry="70" fill="#c9f0ff" stroke="${INK}" stroke-width="8"/>`
    : `<ellipse cx="300" cy="118" rx="86" ry="62" fill="${art.extras.includes("water") ? "#7dd3fc" : accent}" stroke="${INK}" stroke-width="8"/>`;
  const foam = art.extras.includes("foam")
    ? `<rect x="430" y="118" width="${170 + extra}" height="86" rx="28" fill="${accent}" stroke="${INK}" stroke-width="8"/>`
    : `<rect x="430" y="138" width="${160 + extra}" height="44" rx="16" fill="${accent}" stroke="${INK}" stroke-width="8"/>`;
  return `
    <rect x="168" y="150" width="280" height="78" rx="28" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    ${tank}
    <path d="M210 228 L210 300 L270 300 L292 228 Z" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="232" y="214" width="46" height="22" rx="8" fill="#f8fafc" stroke="${INK}" stroke-width="6"/>
    ${foam}
    <circle cx="${620 + extra}" cy="160" r="16" fill="${fill}" stroke="${INK}" stroke-width="7"/>
  `;
}

function pistolSvg(art: GunArt, empty: boolean): string {
  const { fill, accent } = paint(art, empty);
  const extra = barrelExtra(art.length);
  const cylinder = art.extras.includes("cylinder")
    ? `<circle cx="360" cy="168" r="46" fill="${accent}" stroke="${INK}" stroke-width="8"/><circle cx="360" cy="168" r="16" fill="#f8fafc" stroke="${INK}" stroke-width="6"/>`
    : `<rect x="300" y="132" width="210" height="58" rx="14" fill="${fill}" stroke="${INK}" stroke-width="8"/>`;
  return `
    <path d="M250 188 L238 292 L318 304 L348 188 Z" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="236" y="150" width="150" height="52" rx="16" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    ${cylinder}
    <rect x="470" y="146" width="${90 + extra}" height="36" rx="10" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    <path d="M300 200 H360 Q372 228 336 232 H292 Z" fill="none" stroke="${INK}" stroke-width="8"/>
    <rect x="318" y="206" width="18" height="28" rx="6" fill="${accent}" stroke="${INK}" stroke-width="6"/>
  `;
}

function smgSvg(art: GunArt, empty: boolean): string {
  const { fill, accent } = paint(art, empty);
  const extra = barrelExtra(art.length);
  return `
    <path d="M150 168 L150 214 L236 214 L250 168 Z" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="220" y="128" width="300" height="70" rx="18" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    <rect x="320" y="196" width="46" height="92" rx="10" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="510" y="146" width="${100 + extra}" height="32" rx="10" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    <rect x="248" y="108" width="90" height="28" rx="10" fill="${accent}" stroke="${INK}" stroke-width="7"/>
    <path d="M300 198 H360 Q372 230 338 234 H292 Z" fill="none" stroke="${INK}" stroke-width="8"/>
  `;
}

function shotgunSvg(art: GunArt, empty: boolean): string {
  const { fill, accent } = paint(art, empty);
  const extra = barrelExtra(art.length);
  const twin = art.extras.includes("twin");
  const barrels = twin
    ? `<rect x="360" y="128" width="${330 + extra}" height="28" rx="10" fill="${fill}" stroke="${INK}" stroke-width="8"/>
       <rect x="360" y="164" width="${330 + extra}" height="28" rx="10" fill="${fill}" stroke="${INK}" stroke-width="8"/>`
    : `<rect x="360" y="138" width="${340 + extra}" height="40" rx="12" fill="${fill}" stroke="${INK}" stroke-width="8"/>`;
  return `
    <path d="M120 150 L108 230 L210 238 L236 150 Z" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="200" y="132" width="180" height="70" rx="16" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    ${barrels}
    <rect x="430" y="176" width="120" height="28" rx="10" fill="${accent}" stroke="${INK}" stroke-width="7"/>
    <path d="M250 202 H320 Q334 236 300 240 H236 Z" fill="none" stroke="${INK}" stroke-width="8"/>
  `;
}

function rifleSvg(art: GunArt, empty: boolean): string {
  const { fill, accent } = paint(art, empty);
  const extra = barrelExtra(art.length);
  return `
    <path d="M90 146 L78 236 L196 246 L230 146 Z" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="200" y="126" width="260" height="68" rx="16" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    <rect x="450" y="140" width="${250 + extra}" height="34" rx="10" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    <rect x="330" y="192" width="40" height="88" rx="8" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="248" y="198" width="70" height="22" rx="8" fill="#f8fafc" stroke="${INK}" stroke-width="6"/>
    <path d="M250 194 H320 Q334 228 298 232 H236 Z" fill="none" stroke="${INK}" stroke-width="8"/>
  `;
}

function specialSvg(art: GunArt, empty: boolean): string {
  const { fill, accent } = paint(art, empty);
  const extra = barrelExtra(art.length);
  return `
    <path d="M130 160 L122 250 L214 258 L246 160 Z" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <rect x="210" y="118" width="250" height="82" rx="26" fill="${fill}" stroke="${INK}" stroke-width="8"/>
    <polygon points="${470},150 ${700 + extra},132 ${700 + extra},186 ${470},176" fill="${accent}" stroke="${INK}" stroke-width="8"/>
    <circle cx="330" cy="158" r="22" fill="#f8fafc" stroke="${INK}" stroke-width="7"/>
    <rect x="300" y="200" width="52" height="70" rx="12" fill="${fill}" stroke="${INK}" stroke-width="8"/>
  `;
}

function bodySvg(art: GunArt, empty: boolean): string {
  if (art.template === "pistol") return pistolSvg(art, empty);
  if (art.template === "smg") return smgSvg(art, empty);
  if (art.template === "shotgun") return shotgunSvg(art, empty);
  if (art.template === "rifle") return rifleSvg(art, empty);
  if (art.template === "special") return specialSvg(art, empty);
  return toySvg(art, empty);
}

function viewBoxFor(template: GunArt["template"]): string {
  if (template === "pistol") return "200 70 540 250";
  if (template === "smg") return "110 70 680 250";
  if (template === "shotgun") return "70 70 800 250";
  if (template === "rifle") return "40 60 860 260";
  if (template === "special") return "90 70 760 250";
  return "140 70 600 250";
}

const EMPTY_ART: GunArt = {
  template: "pistol",
  fill: "#cbd5e1",
  accent: "#94a3b8",
  length: "mid",
  extras: [],
};

export function gunSvgMarkup(gun: Gun | undefined, flash = false): string {
  const empty = !gun;
  const art = gun?.art ?? EMPTY_ART;
  const mx = muzzleX(art.template, art.length);
  const flashDot = flash
    ? `<g data-testid="muzzle-flash">
        <ellipse cx="${mx + 28}" cy="160" rx="46" ry="28" fill="#ffe566" opacity="0.95"/>
        <ellipse cx="${mx + 58}" cy="160" rx="24" ry="14" fill="#fff7cc"/>
      </g>`
    : "";
  return `<svg viewBox="${viewBoxFor(art.template)}" role="img" aria-label="${escapeHtml(gun?.nameZh ?? "未有槍")}" preserveAspectRatio="xMidYMax meet">
    ${bodySvg(art, empty)}
    ${extrasSvg(art, empty, mx)}
    ${flashDot}
  </svg>`;
}

export function renderGunPortrait(gun: Gun | undefined, recoil = false): string {
  const empty = !gun;
  const name = gun ? gun.nameZh : "未有槍";
  return `<div class="gun-stage${recoil ? " recoil" : ""}${empty ? " is-empty" : ""}" data-testid="gun-portrait" data-gun="${gun?.id ?? "none"}">
    ${gunSvgMarkup(gun, recoil)}
    <p class="gun-label">${escapeHtml(name)} 全圖</p>
  </div>`;
}
