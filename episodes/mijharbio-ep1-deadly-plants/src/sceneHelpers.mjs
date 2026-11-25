import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderExplorerMascot } from "./explorerMascot.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EP_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(EP_DIR, "assets");

export const PLANT_LIST = [
  { key: "nettle", num: "01", name: "القُرّاص", color: "#2EE89E", danger: 2 },
  { key: "poison_ivy", num: "02", name: "اللَّبْلاب السام", color: "#7ED957", danger: 4 },
  { key: "giant_hogweed", num: "03", name: "عشبة الخنزير", color: "#FFD43B", danger: 6 },
  { key: "oleander", num: "04", name: "الدِّفلى", color: "#FF9F1C", danger: 7 },
  { key: "castor", num: "05", name: "الخِروَع", color: "#FF6B35", danger: 8 },
  { key: "gympie", num: "06", name: "جِيمبي-جِيمبي", color: "#F72585", danger: 9 },
  { key: "manchineel", num: "07", name: "المانشينيل", color: "#E63946", danger: 10 },
];

export const PLANT_URIS = {};
export const WIKI_URIS = {};

for (const p of PLANT_LIST) {
  const jp = path.join(ASSETS_DIR, `${p.key}.jpg`);
  const wp = path.join(ASSETS_DIR, `wiki_${p.key}.jpg`);
  PLANT_URIS[p.key] = fs.existsSync(jp) ? `data:image/jpeg;base64,${fs.readFileSync(jp).toString("base64")}` : "";
  WIKI_URIS[p.key] = fs.existsSync(wp) ? `data:image/jpeg;base64,${fs.readFileSync(wp).toString("base64")}` : "";
}

export const clamp01 = (v) => Math.max(0, Math.min(1, v));
export const lerp = (a, b, t) => a + (b - a) * clamp01(t);
export const easeOutCubic = (t) => 1 - Math.pow(1 - clamp01(t), 3);
export const easeInOutCubic = (t) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const easeInExpo = (t) => {
  const x = clamp01(t);
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};
export const springOut = (t) => {
  const x = clamp01(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

export function impactShake(localF, triggerF, mag = 14) {
  const dt = localF - triggerF;
  if (dt < 0 || dt > 8) return { dx: 0, dy: 0 };
  const amp = mag * Math.pow(0.66, dt);
  return { dx: Math.sin(dt * 2.7) * amp, dy: Math.cos(dt * 3.1) * amp * 0.7 };
}

export function dotGridPattern(id, color = "#DDD6C7", step = 48, r = 1.9) {
  return `<pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse">
    <circle cx="${step / 2}" cy="${step / 2}" r="${r}" fill="${color}"/>
  </pattern>`;
}

export function renderCornerBadge(num, label, accentColor = "#2EE89E") {
  return `
    <g transform="translate(1545, 28)">
      <rect x="0" y="0" width="335" height="62" rx="31" fill="#0F3528" stroke="${accentColor}" stroke-width="3" opacity="0.96"/>
      <circle cx="299" cy="31" r="22" fill="${accentColor}"/>
      <text x="299" y="39" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="21" fill="#071A14" direction="ltr">${num}</text>
      <text x="262" y="41" text-anchor="start" font-family="Cairo, sans-serif" font-weight="900" font-size="25" fill="#FAF7F0" direction="rtl" xml:lang="ar">${label}</text>
    </g>
  `;
}

export function renderSubdermalCutawayBase(frame, { x = 520, y = 110, w = 1310, h = 860, skinY = 415, accentColor = "#2EE89E" } = {}) {
  const rbc = Array.from({ length: 14 }, (_, i) => {
    const rx = x + 35 + ((i * 92 + frame * 5.2) % (w - 70));
    const ry = skinY + 285 + Math.sin(rx * 0.012) * 20 + (i % 2 === 0 ? -5 : 5);
    return `<ellipse cx="${rx.toFixed(1)}" cy="${ry.toFixed(1)}" rx="14" ry="8" fill="#FF4D5A" stroke="#7A0912" stroke-width="2"/>`;
  }).join("");
  const nerveY = y + h - 85;
  return `
    <g>
      <defs><clipPath id="subCutClip_${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36"/></clipPath></defs>
      <g clip-path="url(#subCutClip_${y})">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0E1D19"/>
        <!-- Epidermis -->
        <rect x="${x}" y="${skinY}" width="${w}" height="155" fill="#F2BEA0"/>
        <rect x="${x}" y="${skinY}" width="${w}" height="24" fill="#D99873"/>
        <line x1="${x}" y1="${skinY + 60}" x2="${x + w}" y2="${skinY + 60}" stroke="#CF8E6B" stroke-width="2.5" opacity="0.6"/>
        <line x1="${x}" y1="${skinY + 110}" x2="${x + w}" y2="${skinY + 110}" stroke="#CF8E6B" stroke-width="2.5" opacity="0.6"/>
        <!-- Dermis -->
        <rect x="${x}" y="${skinY + 155}" width="${w}" height="225" fill="#D97E73"/>
        <!-- Subcutaneous -->
        <rect x="${x}" y="${skinY + 380}" width="${w}" height="${y + h - (skinY + 380)}" fill="#B5564C"/>
        <!-- Capillary Blood Vessel -->
        <path d="M ${x - 10} ${skinY + 285} Q ${x + w * 0.35} ${skinY + 255} ${x + w * 0.65} ${skinY + 285} T ${x + w + 10} ${skinY + 285}"
              fill="none" stroke="#6E0A14" stroke-width="46"/>
        <path d="M ${x - 10} ${skinY + 285} Q ${x + w * 0.35} ${skinY + 255} ${x + w * 0.65} ${skinY + 285} T ${x + w + 10} ${skinY + 285}"
              fill="none" stroke="#B01524" stroke-width="30"/>
        ${rbc}
        <!-- Golden Nerve Pathway -->
        <path d="M ${x} ${nerveY} Q ${x + w * 0.5} ${nerveY - 22} ${x + w} ${nerveY} M ${x + w * 0.5} ${nerveY - 12} L ${x + w * 0.5} ${skinY + 175}"
              fill="none" stroke="#FFE066" stroke-width="7.5" stroke-linecap="round"/>
        <path d="M ${x + w * 0.5} ${skinY + 295} L ${x + w * 0.4} ${skinY + 185} M ${x + w * 0.5} ${skinY + 295} L ${x + w * 0.6} ${skinY + 185}"
              fill="none" stroke="#FFE066" stroke-width="6.5" stroke-linecap="round"/>
      </g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36" fill="none" stroke="${accentColor}" stroke-width="5"/>
    </g>
  `;
}

export function renderBriefTitleBanner(num, title, subtitle, localF, accentColor = "#E63946") {
  if (localF < 0 || localF > 106) return "";
  const enterT = springOut(localF / 16);
  const exitT = localF > 88 ? clamp01(1 - (localF - 88) / 18) : 1;
  const alpha = clamp01(localF / 8) * exitT;
  const ty = lerp(-90, 96, enterT);
  return `
    <g transform="translate(960, ${ty.toFixed(1)})" opacity="${alpha.toFixed(3)}">
      <rect x="-320" y="-58" width="640" height="122" rx="30" fill="#071A14" stroke="#141414" stroke-width="5"/>
      <circle cx="262" cy="3" r="32" fill="${accentColor}"/>
      <text x="262" y="15" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#071A14" direction="ltr">${num}</text>
      <text x="212" y="-3" text-anchor="start" font-family="Lalezar, sans-serif" font-size="52" fill="#FAF7F0" direction="rtl" xml:lang="ar">${title}</text>
      <rect x="-56" y="18" width="268" height="34" rx="17" fill="${accentColor}"/>
      <text x="78" y="42" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="20" fill="#071A14" direction="rtl" xml:lang="ar">${subtitle}</text>
    </g>
  `;
}

export function renderDangerGauge(x, y, scale, targetLevel, animT, frame, label = "مقياس الخطورة") {
  const frac = clamp01((targetLevel / 10) * clamp01(animT));
  const val = Math.max(1, Math.min(10, Math.round(lerp(1, targetLevel, clamp01(animT)))));
  const angleDeg = lerp(-90, 90, frac);
  const col = val <= 3 ? "#2EE89E" : val <= 6 ? "#FFD43B" : val <= 8 ? "#FF9F1C" : "#E63946";
  const pulse = val >= 9 ? 1 + 0.09 * Math.sin(frame * 0.35) : 1;

  return `
    <g transform="translate(${x}, ${y}) scale(${scale})">
      <rect x="-185" y="-230" width="370" height="460" rx="34" fill="#0A221A" stroke="${col}" stroke-width="${val >= 9 ? 6 : 4}"/>
      <text x="0" y="-168" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FAF7F0" direction="rtl" xml:lang="ar">${label}</text>
      <g transform="translate(0, -10)">
        <path d="M -130 0 A 130 130 0 0 1 130 0" fill="none" stroke="#183D31" stroke-width="24" stroke-linecap="round"/>
        <path d="M -130 0 A 130 130 0 0 1 130 0" fill="none" stroke="${col}" stroke-width="24" stroke-linecap="round"
              stroke-dasharray="408" stroke-dashoffset="${(408 * (1 - frac)).toFixed(1)}"/>
        <g transform="rotate(${angleDeg.toFixed(1)})">
          <polygon points="-7,0 0,-115 7,0" fill="#FAF7F0"/>
          <circle cx="0" cy="0" r="16" fill="${col}" stroke="#141414" stroke-width="4.5"/>
        </g>
      </g>
      <text x="0" y="106" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="80" fill="${col}" direction="ltr" unicode-bidi="isolate">${val}/10</text>
      ${val >= 9 ? `
        <g transform="translate(0, 174) scale(${pulse.toFixed(3)})">
          <rect x="-112" y="-32" width="224" height="64" rx="32" fill="#E63946"/>
          <text x="0" y="12" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FAF7F0" direction="rtl" xml:lang="ar">خطر فتاك</text>
        </g>
      ` : `
        <text x="0" y="176" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="800" font-size="25" fill="#2EE89E" direction="rtl" xml:lang="ar">مستوى السُّمية</text>
      `}
    </g>
  `;
}

export function renderSpectrumLadder(frame, activeIdx = -1, { y = 520, hideLast = false, localF = 30 } = {}) {
  const colW = 208;
  const gap = 16;
  const startX = 1920 - 178 - colW; // RTL: col 0 on right
  return PLANT_LIST.map((p, idx) => {
    const x = startX - idx * (colW + gap);
    const pop = springOut((localF - idx * 3) / 14);
    const isAct = idx === activeIdx;
    const isMystery = hideLast && idx === 6;
    const scale = (isAct ? 1.06 : 1.0) * pop;
    const cx = x + colW / 2;
    const cy = y;
    return `
      <g transform="translate(${cx}, ${cy}) scale(${scale.toFixed(3)}) translate(${-cx}, ${-cy})">
        <rect x="${x}" y="${y - 220}" width="${colW}" height="430" rx="22" fill="${isMystery ? "#111412" : "#FFFFFF"}" stroke="${isAct ? "#E63946" : "#141414"}" stroke-width="${isAct ? 7 : 4.5}"/>
        <rect x="${x}" y="${y - 220}" width="${colW}" height="56" rx="16" fill="${isMystery ? "#1F2421" : p.color}" stroke="#141414" stroke-width="4.5"/>
        <text x="${cx}" y="${y - 181}" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="${isMystery ? "#E63946" : "#071A14"}" direction="ltr">${p.num}</text>
        ${isMystery ? `
          <text x="${cx}" y="${y + 30}" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="132" fill="#E63946">؟</text>
          <rect x="${x + 14}" y="${y + 146}" width="${colW - 28}" height="48" rx="24" fill="#E63946"/>
          <text x="${cx}" y="${y + 178}" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" direction="rtl" xml:lang="ar">الأخطر عالمياً</text>
        ` : `
          <image href="${PLANT_URIS[p.key]}" x="${x + 12}" y="${y - 146}" width="${colW - 24}" height="262" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode: multiply;"/>
          <rect x="${x + 12}" y="${y + 146}" width="${colW - 24}" height="48" rx="24" fill="#FFD43B" stroke="#141414" stroke-width="3.5"/>
          <text x="${cx}" y="${y + 178}" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="21" fill="#141414" direction="rtl" xml:lang="ar">${p.name}</text>
        `}
      </g>
    `;
  }).join("\n");
}

export function renderHeroSpecimenStage({
  frame,
  localF,
  plantKey,
  num,
  shortLabel,
  title,
  subtitle,
  dangerVal,
  accentColor,
  mascotPose,
  mouthOpen,
  extraOverlay = "",
}) {
  const enter = easeOutCubic(localF / 14);
  const breathe = 1 + 0.032 * Math.sin(localF * 0.045);
  const polaroidPop = springOut((localF - 22) / 16);
  const polaroidAngle = lerp(-8, -3, easeOutCubic((localF - 22) / 16));

  return `
    <defs>${dotGridPattern("heroDots")}</defs>
    <rect width="1920" height="1080" fill="#FAF7F0"/>
    <rect width="1920" height="1080" fill="url(#heroDots)"/>

    <!-- Hero Specimen Circle -->
    <g transform="translate(690, 540) scale(${(enter * breathe).toFixed(4)})">
      <circle cx="0" cy="0" r="326" fill="none" stroke="${accentColor}" stroke-width="5" stroke-dasharray="30 18" opacity="0.55" transform="rotate(${(frame * 0.35).toFixed(1)})"/>
      <circle cx="0" cy="0" r="302" fill="#FFFFFF" stroke="#141414" stroke-width="7"/>
      <image href="${PLANT_URIS[plantKey]}" x="-252" y="-252" width="504" height="504" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode: multiply;"/>
    </g>

    <!-- Wikimedia Real Specimen Polaroid Card (lower-left) -->
    ${localF >= 20 ? `
      <g transform="translate(230, 745) rotate(${polaroidAngle.toFixed(2)}) scale(${polaroidPop.toFixed(3)})">
        <defs><clipPath id="wikiCardClip"><rect x="-135" y="-120" width="270" height="206" rx="14"/></clipPath></defs>
        <rect x="-152" y="-138" width="304" height="278" rx="20" fill="#FFFFFF" stroke="#141414" stroke-width="5.5"/>
        <g clip-path="url(#wikiCardClip)">
          <image href="${WIKI_URIS[plantKey]}" x="-135" y="-120" width="270" height="206" preserveAspectRatio="xMidYMid slice"/>
        </g>
        <rect x="-135" y="-120" width="270" height="206" rx="14" fill="none" stroke="#141414" stroke-width="3.5"/>
        <rect x="-102" y="96" width="204" height="32" rx="16" fill="#0F3D2E"/>
        <text x="0" y="119" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="18" fill="#2EE89E" direction="rtl" xml:lang="ar">عينة طبيعية حقيقية</text>
      </g>
    ` : ""}

    <!-- Compact Top-Left Danger Level Pill -->
    <g transform="translate(52, 28)">
      <rect x="0" y="0" width="248" height="62" rx="31" fill="#071A14" stroke="${accentColor}" stroke-width="4"/>
      <text x="155" y="40" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="23" fill="#FAF7F0" direction="rtl" xml:lang="ar">الخطورة</text>
      <text x="62" y="41" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="27" fill="${accentColor}" direction="ltr" unicode-bidi="isolate">${dangerVal}/10</text>
    </g>

    ${extraOverlay}

    <!-- Animated Explorer Host Mascot (Right Side) -->
    ${renderExplorerMascot({ x: 1525, y: 585, scale: 1.48, pose: mascotPose, frame, mouthOpen, flipX: false })}

    ${renderCornerBadge(num, shortLabel, accentColor)}
    ${renderBriefTitleBanner(num, title, subtitle, localF, accentColor)}
  `;
}

export function renderSurvivalSplit({
  frame,
  localF,
  num,
  shortLabel,
  accentColor,
  badLabel,
  goodLabel,
  badIconSvg,
  goodIconSvg,
  mouthOpen,
}) {
  const wipeT = easeOutCubic(localF / 16);
  const badPop = springOut((localF - 10) / 14);
  const goodPop = springOut((localF - 22) / 14);
  const leftTop = lerp(0, 1050, wipeT);
  const leftBot = lerp(0, 870, wipeT);

  return `
    <defs>
      <clipPath id="survLeftClip">
        <polygon points="0,0 ${leftTop.toFixed(1)},0 ${leftBot.toFixed(1)},1080 0,1080"/>
      </clipPath>
    </defs>

    <!-- RIGHT HALF (RTL First Read): WRONG ACTION ❌ -->
    <rect width="1920" height="1080" fill="#FFF0F1"/>
    <g transform="translate(1430, 520)">
      <g transform="translate(0, 10)">${badIconSvg}</g>
      <g transform="translate(0, -315) scale(${badPop.toFixed(3)})">
        <circle cx="0" cy="0" r="64" fill="#E63946" stroke="#141414" stroke-width="6.5"/>
        <path d="M -24 -24 L 24 24 M 24 -24 L -24 24" fill="none" stroke="#FFFFFF" stroke-width="13" stroke-linecap="round"/>
      </g>
      <rect x="-265" y="220" width="530" height="90" rx="45" fill="#E63946" stroke="#141414" stroke-width="6"/>
      <text x="0" y="280" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="42" fill="#FFFFFF" direction="rtl" xml:lang="ar">${badLabel}</text>
    </g>

    <!-- LEFT HALF: CORRECT SURVIVAL ACTION ✅ -->
    <g clip-path="url(#survLeftClip)">
      <rect width="1920" height="1080" fill="#ECFDF5"/>
      <g transform="translate(470, 520)">
        <g transform="translate(0, 10)">${goodIconSvg}</g>
        <g transform="translate(0, -315) scale(${goodPop.toFixed(3)})">
          <circle cx="0" cy="0" r="64" fill="#10B981" stroke="#141414" stroke-width="6.5"/>
          <path d="M -26 2 L -6 23 L 28 -18" fill="none" stroke="#FFFFFF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <rect x="-265" y="220" width="530" height="90" rx="45" fill="#0D7A4E" stroke="#141414" stroke-width="6"/>
        <text x="0" y="280" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="42" fill="#FFFFFF" direction="rtl" xml:lang="ar">${goodLabel}</text>
      </g>
    </g>

    <line x1="${leftTop.toFixed(1)}" y1="0" x2="${leftBot.toFixed(1)}" y2="1080" stroke="#141414" stroke-width="13"/>

    <!-- Explorer Mascot Medallion Tucked at Bottom-Center -->
    <g transform="translate(960, 895)">
      <defs><clipPath id="medClip"><circle cx="0" cy="0" r="118"/></clipPath></defs>
      <circle cx="0" cy="0" r="124" fill="#071A14" stroke="#141414" stroke-width="7"/>
      <g clip-path="url(#medClip)">
        <circle cx="0" cy="0" r="118" fill="#FAF7F0"/>
        ${renderExplorerMascot({ x: 0, y: 40, scale: 0.78, pose: "warn", frame, mouthOpen })}
      </g>
      <circle cx="0" cy="0" r="118" fill="none" stroke="${accentColor}" stroke-width="5"/>
    </g>

    ${renderCornerBadge(num, shortLabel, accentColor)}
  `;
}
