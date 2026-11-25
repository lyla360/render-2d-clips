import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EP_DIR = path.resolve(__dirname, "../..");
const ASSETS_DIR = path.join(EP_DIR, "assets");

const PLANT_SPECS = [
  { key: "nettle", num: "01", label: "القُرّاص", col: 0, row: 0, color: "#2EE89E" },
  { key: "poison_ivy", num: "02", label: "اللبلاب السام", col: 1, row: 0, color: "#7ED957" },
  { key: "oleander", num: "03", label: "الدفلى", col: 2, row: 0, color: "#FFD43B" },
  { key: "gympie", num: "04", label: "جيمبي-جيمبي", col: 0, row: 1, color: "#FF9F1C" },
  { key: "castor", num: "05", label: "الخروع", col: 1, row: 1, color: "#FF5C35" },
  { key: "manchineel", num: "06", label: "شجرة المانشينيل", col: 2, row: 1, color: "#E63946", hero: true },
];

const plantUris = {};
for (const p of PLANT_SPECS) {
  const jp = path.join(ASSETS_DIR, `${p.key}.jpg`);
  plantUris[p.key] = fs.existsSync(jp)
    ? `data:image/jpeg;base64,${fs.readFileSync(jp).toString("base64")}`
    : "";
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * clamp01(t);
const easeOutCubic = (t) => 1 - Math.pow(1 - clamp01(t), 3);
const easeInOutCubic = (t) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const easeInExpo = (t) => {
  const x = clamp01(t);
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
};
const springOut = (t) => {
  const x = clamp01(t);
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

function dotGridPattern(id, color = "#DDD6C7", step = 48, r = 2) {
  return `
    <pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse">
      <circle cx="${step / 2}" cy="${step / 2}" r="${r}" fill="${color}"/>
    </pattern>
  `;
}

function renderMasterGridContent(frame, opts = {}) {
  const { dimOthers = false, showChecks = false, popProgress = true } = opts;
  const colX = [1250, 720, 190]; // RTL: Right, Center, Left
  const rowY = [128, 568];
  const cardW = 480;
  const cardH = 400;

  return PLANT_SPECS.map((p, idx) => {
    const x = colX[p.col];
    const y = rowY[p.row];
    const cx = x + cardW / 2;
    const cy = y + cardH / 2;

    const pScale = popProgress ? springOut((frame - (4 + idx * 4)) / 15) : 1;
    const pOpacity = popProgress ? clamp01((frame - (4 + idx * 4)) / 6) : 1;
    const cardOpacity = dimOthers && !p.hero ? 0.58 : pOpacity;
    const borderColor = p.hero ? "#E63946" : "#141414";
    const borderWidth = p.hero ? 7 : 5;
    const cardBg = p.hero ? "#FFF5F5" : "#FFFFFF";
    const uri = plantUris[p.key];

    return `
      <g transform="translate(${cx}, ${cy}) scale(${pScale}) translate(${-cx}, ${-cy})" opacity="${cardOpacity.toFixed(3)}">
        ${p.hero ? `<rect x="${x - 8}" y="${y - 8}" width="${cardW + 16}" height="${cardH + 16}" rx="34" fill="#E63946" opacity="0.22"/>` : ""}
        <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="28" fill="${cardBg}" stroke="${borderColor}" stroke-width="${borderWidth}"/>
        ${uri ? `<image href="${uri}" x="${x + 70}" y="${y + 18}" width="340" height="310" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode: multiply;"/>` : ""}

        <circle cx="${x + cardW - 36}" cy="${y + 36}" r="23" fill="${p.hero ? "#E63946" : "#141414"}"/>
        <text x="${x + cardW - 36}" y="${y + 45}" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" direction="ltr">${p.num}</text>

        ${showChecks && !p.hero ? `
          <circle cx="${x + 42}" cy="${y + 42}" r="22" fill="#2EE89E" stroke="#141414" stroke-width="3.5"/>
          <path d="M ${x + 31} ${y + 42} L ${x + 39} ${y + 50} L ${x + 54} ${y + 33}" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        ` : ""}

        <rect x="${x + 54}" y="${y + cardH - 48}" width="${cardW - 108}" height="62" rx="31" fill="#FFD43B" stroke="#141414" stroke-width="5"/>
        <text x="${cx}" y="${y + cardH - 7}" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="33" fill="#141414" direction="rtl" xml:lang="ar">${p.label}</text>
      </g>
    `;
  }).join("\n");
}

function renderBeat1(frame) {
  // 0..119: Master 3x2 Grid + Target Lock + Whip-Zoom-Through onto Card #6 (cx=430, cy=768)
  const targetX = 430;
  const targetY = 768;

  const lockT = easeOutCubic((frame - 64) / 16);
  const zoomT = easeInExpo((frame - 82) / 37);
  const camScale = lerp(1, 4.7, zoomT);
  const focusX = lerp(960, targetX, zoomT);
  const focusY = lerp(540, targetY, zoomT);

  const badgeAlpha = frame < 60
    ? easeOutCubic((frame - 4) / 10)
    : clamp01(1 - (frame - 60) / 14);

  const fadeToBeat2 = clamp01((frame - 108) / 11);

  return `
    <defs>${dotGridPattern("gridB1")}</defs>
    <rect width="1920" height="1080" fill="#FAF7F0"/>
    <rect width="1920" height="1080" fill="url(#gridB1)"/>

    <g transform="translate(960, 540) scale(${camScale.toFixed(4)}) translate(${-focusX.toFixed(2)}, ${-focusY.toFixed(2)})">
      ${renderMasterGridContent(frame, { popProgress: true })}

      ${frame >= 62 ? `
        <g transform="translate(${targetX}, ${targetY})" opacity="${lockT.toFixed(3)}">
          <circle cx="0" cy="0" r="${lerp(240, 185, lockT).toFixed(1)}" fill="none" stroke="#E63946" stroke-width="7" stroke-dasharray="44 22" transform="rotate(${(frame * 3.5) % 360})"/>
          <circle cx="0" cy="0" r="${lerp(200, 152, lockT).toFixed(1)}" fill="none" stroke="#2EE89E" stroke-width="4" stroke-dasharray="16 14" transform="rotate(${(-frame * 4.5) % 360})"/>
        </g>
      ` : ""}
    </g>

    ${badgeAlpha > 0.01 ? `
      <g opacity="${badgeAlpha.toFixed(3)}" transform="translate(960, ${lerp(-40, 58, easeOutCubic((frame - 4) / 10)).toFixed(1)})">
        <rect x="-260" y="-34" width="520" height="68" rx="34" fill="#E63946" stroke="#141414" stroke-width="5"/>
        <text x="0" y="12" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FAF7F0" direction="rtl" xml:lang="ar">تدرّج أخطر النباتات</text>
      </g>
    ` : ""}

    ${fadeToBeat2 > 0 ? `<rect width="1920" height="1080" fill="#FAF7F0" opacity="${fadeToBeat2.toFixed(3)}"/>` : ""}
  `;
}

function renderBeat2(frame) {
  // 120..263: Hero Manchineel Showcase + Live Corrosive Rain + Gliding Microscope Loupe -> Optical Dive
  const f = frame - 120; // 0..143
  const enter = easeOutCubic(f / 14);
  const breathe = 1 + 0.055 * (f / 143);
  const uri = plantUris.manchineel;

  // Brief ~3s intro banner (f=4..94) per minimal-onscreen-text
  const bannerIn = springOut((f - 4) / 14);
  const bannerOut = f > 82 ? clamp01(1 - (f - 82) / 14) : 1;
  const bannerAlpha = clamp01(f / 8) * bannerOut;

  // Diagonal rain streaks (18 lines animated continuously)
  const rainLines = [];
  for (let i = 0; i < 18; i++) {
    const baseX = (i * 124 + (i % 3) * 35) % 1980;
    const speed = 22 + (i % 4) * 5;
    const yOff = ((f * speed + i * 130) % 1240) - 140;
    const len = 58 + (i % 3) * 20;
    rainLines.push(
      `<line x1="${baseX}" y1="${yOff}" x2="${baseX - 18}" y2="${yOff + len}" stroke="#4D9DE0" stroke-width="3.5" stroke-linecap="round" opacity="0.45"/>`
    );
  }

  // Corrosive sap droplets dripping from plant canopy onto illustrated forearm below
  const dropPositions = [
    { x: 520, startY: 660, phase: 0 },
    { x: 635, startY: 690, phase: 18 },
    { x: 750, startY: 675, phase: 32 },
    { x: 840, startY: 645, phase: 10 },
    { x: 585, startY: 710, phase: 44 },
  ];
  const dropsMarkup = dropPositions.map((d, idx) => {
    const cycle = (f + d.phase) % 42;
    const p = cycle / 42;
    const dy = lerp(d.startY, 905, p * p);
    const ripple = p > 0.85 ? (p - 0.85) / 0.15 : 0;
    return `
      <g>
        <path d="M ${d.x} ${dy - 18} C ${d.x + 10} ${dy - 4}, ${d.x + 13} ${dy + 6}, ${d.x} ${dy + 14} C ${d.x - 13} ${dy + 6}, ${d.x - 10} ${dy - 4}, ${d.x} ${dy - 18} Z"
              fill="${idx % 2 === 0 ? "#B8E828" : "#E63946"}" stroke="#141414" stroke-width="3" opacity="${(1 - ripple).toFixed(2)}"/>
        ${ripple > 0 ? `<ellipse cx="${d.x}" cy="908" rx="${(12 + ripple * 34).toFixed(1)}" ry="${(4 + ripple * 11).toFixed(1)}" fill="none" stroke="#E63946" stroke-width="3.5" opacity="${(1 - ripple).toFixed(2)}"/>` : ""}
      </g>
    `;
  }).join("\n");

  // Gliding Microscope Loupe (f=46..143) locking directly onto the oozing bark sap drop
  const loupeEnter = easeOutCubic((f - 46) / 14);
  const trackT = easeInOutCubic((f - 54) / 40);
  const loupeX = lerp(1440, 530, trackT);
  const loupeY = lerp(420, 622, trackT);
  const diveT = easeInExpo((f - 122) / 21);
  const loupeScale = lerp(1, 6.2, diveT);
  const loupeR = 148;

  return `
    <defs>
      <pattern id="labGrid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2EE89E" stroke-width="1.5" opacity="0.16"/>
      </pattern>
      <radialGradient id="acidGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#E63946" stop-opacity="0.38"/>
        <stop offset="60%" stop-color="#B8E828" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#FAF7F0" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="loupeClip">
        <circle cx="0" cy="0" r="${loupeR}"/>
      </clipPath>
    </defs>

    <rect width="1920" height="1080" fill="#FAF7F0"/>
    <rect width="1920" height="1080" fill="url(#labGrid)"/>

    <!-- Hero Botanical Specimen Panel -->
    <g transform="translate(680, 480) scale(${(enter * breathe).toFixed(4)})">
      <circle cx="0" cy="0" r="355" fill="none" stroke="#2EE89E" stroke-width="5" stroke-dasharray="32 20" opacity="0.55" transform="rotate(${(f * 0.4).toFixed(1)})"/>
      <circle cx="0" cy="0" r="330" fill="#FFFFFF" stroke="#141414" stroke-width="7"/>
      ${uri ? `<image href="${uri}" x="-270" y="-270" width="540" height="540" preserveAspectRatio="xMidYMid meet" style="mix-blend-mode: multiply;"/>` : ""}
    </g>

    <!-- Illustrated Forearm Silhouette Below Receiving Toxic Drops -->
    <g opacity="${enter.toFixed(3)}">
      <path d="M 280 980 C 440 895, 760 885, 1080 915 L 1140 1080 L 240 1080 Z" fill="#EDB895" stroke="#141414" stroke-width="6"/>
      <ellipse cx="640" cy="910" rx="145" ry="18" fill="#E63946" opacity="0.28"/>
      <ellipse cx="750" cy="908" rx="95" ry="14" fill="#E63946" opacity="0.35"/>
    </g>

    ${rainLines.join("\n    ")}
    ${dropsMarkup}

    <!-- Brief Right Intro Banner (~3s) -->
    ${bannerAlpha > 0.01 ? `
      <g opacity="${bannerAlpha.toFixed(3)}" transform="translate(${lerp(1950, 1780, bannerIn).toFixed(1)}, 170)">
        <rect x="-560" y="-65" width="560" height="150" rx="28" fill="#071A14" stroke="#141414" stroke-width="5"/>
        <circle cx="-62" cy="10" r="36" fill="#E63946"/>
        <text x="-62" y="23" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FAF7F0" direction="ltr">06</text>
        <text x="-118" y="8" text-anchor="start" font-family="Lalezar, sans-serif" font-size="60" fill="#FAF7F0" direction="rtl" xml:lang="ar">شجرة المانشينيل</text>
        <rect x="-320" y="34" width="202" height="40" rx="20" fill="#E63946"/>
        <text x="-219" y="63" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="23" fill="#FAF7F0" direction="rtl" xml:lang="ar">شجرة الموت</text>
      </g>
    ` : ""}

    <!-- Gliding Animated Microscope Loupe -->
    ${f >= 46 ? `
      <g transform="translate(${loupeX.toFixed(1)}, ${loupeY.toFixed(1)}) scale(${(loupeEnter * loupeScale).toFixed(3)})" opacity="${loupeEnter.toFixed(3)}">
        <circle cx="0" cy="0" r="${loupeR + 34}" fill="none" stroke="#2EE89E" stroke-width="5" stroke-dasharray="28 18" transform="rotate(${(f * 3) % 360})"/>
        <circle cx="0" cy="0" r="${loupeR + 18}" fill="none" stroke="#E63946" stroke-width="4" stroke-dasharray="12 16" transform="rotate(${(-f * 4) % 360})"/>
        <g clip-path="url(#loupeClip)">
          <rect x="${-loupeR}" y="${-loupeR}" width="${loupeR * 2}" height="${loupeR * 2}" fill="#0B261E"/>
          <circle cx="0" cy="0" r="120" fill="url(#acidGlow)"/>
          <!-- Magnified Glowing Toxic Sap Droplet & Molecular Hazard Rings -->
          <circle cx="0" cy="12" r="${(58 + Math.sin(f * 0.25) * 6).toFixed(1)}" fill="#E63946" opacity="0.28"/>
          <path d="M 0 -74 C 34 -22, 54 6, 54 34 C 54 66, 30 88, 0 88 C -30 88, -54 66, -54 34 C -54 6, -34 -22, 0 -74 Z"
                fill="#E63946" stroke="#141414" stroke-width="7"/>
          <path d="M -25 14 C -28 36, -20 54, -7 62" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
          <circle cx="0" cy="-16" r="12" fill="#B8E828" opacity="0.85"/>
        </g>
        <circle cx="0" cy="0" r="${loupeR}" fill="none" stroke="#141414" stroke-width="11"/>
        <circle cx="0" cy="0" r="${loupeR - 7}" fill="none" stroke="#2EE89E" stroke-width="3.5" opacity="0.7"/>
      </g>
    ` : ""}

    ${diveT > 0.35 ? `<rect width="1920" height="1080" fill="#071A14" opacity="${((diveT - 0.35) / 0.65).toFixed(3)}"/>` : ""}
  `;
}

function renderBeat3(frame) {
  // 264..404: Live Subdermal X-Ray Cutaway + Climbing Danger Gauge (1/10 -> 10/10)
  const f = frame - 264; // 0..140
  const enter = easeOutCubic(f / 12);

  // Gauge climbs from f=12 to f=90 (frame 354), then damped 6-frame impact shake!
  const gaugeT = easeInOutCubic((f - 12) / 78);
  const gaugeVal = Math.max(1, Math.min(10, Math.round(lerp(1, 10, gaugeT))));
  const angleDeg = lerp(-90, 90, gaugeT); // -90 left to +90 right
  const gaugeColor = gaugeVal <= 3 ? "#2EE89E" : gaugeVal <= 7 ? "#FFD43B" : "#E63946";

  // Damped 6-frame camera impact shake at f=90..96
  let shakeX = 0;
  let shakeY = 0;
  if (f >= 90 && f <= 97) {
    const sf = f - 90;
    const mag = 16 * Math.pow(0.68, sf);
    shakeX = Math.sin(sf * 2.7) * mag;
    shakeY = Math.cos(sf * 3.1) * mag * 0.7;
  }

  // Acid drop falling & blister swelling
  const dropProgress = clamp01((f - 4) / 34);
  const dropY = lerp(135, 336, dropProgress * dropProgress);
  const blisterT = easeOutCubic((f - 36) / 78);
  const blisterH = lerp(0, 92, blisterT);
  const blisterW = lerp(18, 178, blisterT);
  const pulse = 1 + 0.14 * Math.sin(f * 0.35);

  // 14 animated Red Blood Cells flowing inside capillary
  const rbcDots = [];
  for (let i = 0; i < 14; i++) {
    const bx = 590 + ((i * 88 + f * 5.2) % 1210);
    const by = 635 + Math.sin(bx * 0.012) * 26 + ((i % 2 === 0) ? -6 : 6);
    rbcDots.push(`<ellipse cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" rx="14" ry="8" fill="#FF4D5A" stroke="#7A0912" stroke-width="2"/>`);
  }

  // Nerve electric pain sparks
  const sparkAlpha = f >= 54 ? (0.45 + 0.55 * Math.abs(Math.sin(f * 0.6))) : 0;
  const sparkX = 1195 + Math.sin(f * 0.9) * 140;

  return `
    <defs>
      <linearGradient id="cutBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#071A14"/>
        <stop offset="100%" stop-color="#0D2B21"/>
      </linearGradient>
      <clipPath id="cutawayClip">
        <rect x="565" y="100" width="1260" height="880" rx="36"/>
      </clipPath>
    </defs>

    <rect width="1920" height="1080" fill="url(#cutBg)"/>

    <g transform="translate(${shakeX.toFixed(1)}, ${shakeY.toFixed(1)})" opacity="${enter.toFixed(3)}">
      <!-- LEFT: LIVE DANGER GAUGE PANEL -->
      <rect x="95" y="140" width="415" height="800" rx="38" fill="#0A221A" stroke="${gaugeVal === 10 ? "#E63946" : "#2EE89E"}" stroke-width="${gaugeVal === 10 ? 6 : 3.5}"/>
      <text x="302" y="235" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="40" fill="#FAF7F0" direction="rtl" xml:lang="ar">مقياس الخطورة</text>

      <!-- Semicircular Speedometer Arc -->
      <g transform="translate(302, 465)">
        <path d="M -145 0 A 145 145 0 0 1 145 0" fill="none" stroke="#183D31" stroke-width="26" stroke-linecap="round"/>
        <path d="M -145 0 A 145 145 0 0 1 -68 -128" fill="none" stroke="#2EE89E" stroke-width="18" stroke-linecap="round" opacity="0.35"/>
        <path d="M -68 -128 A 145 145 0 0 1 68 -128" fill="none" stroke="#FFD43B" stroke-width="18" stroke-linecap="round" opacity="0.35"/>
        <path d="M 68 -128 A 145 145 0 0 1 145 0" fill="none" stroke="#E63946" stroke-width="18" stroke-linecap="round" opacity="0.45"/>

        <!-- Dynamic Progress Arc -->
        <path d="M -145 0 A 145 145 0 0 1 145 0" fill="none" stroke="${gaugeColor}" stroke-width="26" stroke-linecap="round"
              stroke-dasharray="456" stroke-dashoffset="${(456 * (1 - gaugeT)).toFixed(1)}"/>

        <!-- Needle -->
        <g transform="rotate(${angleDeg.toFixed(1)})">
          <polygon points="-8,0 0,-132 8,0" fill="#FAF7F0"/>
          <circle cx="0" cy="0" r="18" fill="${gaugeColor}" stroke="#141414" stroke-width="5"/>
        </g>
      </g>

      <!-- Numeric Readout -->
      <text x="302" y="618" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="94" fill="${gaugeColor}" direction="ltr" unicode-bidi="isolate">${gaugeVal}/10</text>

      ${gaugeVal >= 10 ? `
        <g transform="translate(302, 742) scale(${pulse.toFixed(3)})">
          <rect x="-135" y="-44" width="270" height="88" rx="44" fill="#E63946"/>
          <text x="0" y="16" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="46" fill="#FAF7F0" direction="rtl" xml:lang="ar">قاتل</text>
        </g>
      ` : `
        <text x="302" y="756" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="800" font-size="30" fill="#2EE89E" direction="rtl" xml:lang="ar">تآكل خلوي فوري</text>
      `}

      <!-- RIGHT: ANIMATED SUBDERMAL X-RAY CUTAWAY -->
      <g clip-path="url(#cutawayClip)">
        <rect x="565" y="100" width="1260" height="880" fill="#0E1D19"/>
        <!-- Epidermis -->
        <rect x="565" y="335" width="1260" height="145" fill="#F2BEA0"/>
        <rect x="565" y="335" width="1260" height="24" fill="#D99873"/>
        <!-- Dermis -->
        <rect x="565" y="480" width="1260" height="275" fill="#D97E73"/>
        <!-- Subcutaneous Tissue -->
        <rect x="565" y="755" width="1260" height="225" fill="#B5564C"/>

        <!-- Cellular Grid Lines in Epidermis -->
        <path d="M 565 390 L 1825 390 M 565 435 L 1825 435" stroke="#CF8E6B" stroke-width="3" opacity="0.6"/>

        <!-- Capillary Blood Vessel -->
        <path d="M 555 635 Q 890 600 1195 635 T 1835 635" fill="none" stroke="#6E0A14" stroke-width="50" stroke-linecap="round"/>
        <path d="M 555 635 Q 890 600 1195 635 T 1835 635" fill="none" stroke="#B01524" stroke-width="34" stroke-linecap="round"/>
        ${rbcDots.join("\n        ")}

        <!-- Golden Nerve Fibers -->
        <path d="M 565 845 Q 880 820 1195 845 T 1825 845 M 1195 845 L 1195 520 M 1195 690 L 1060 540 M 1195 690 L 1330 540"
              fill="none" stroke="#FFE066" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.88"/>

        <!-- Falling Corrosive Droplets -->
        ${dropProgress < 1 ? `
          <path d="M 1195 ${dropY - 38} C 1216 ${dropY - 8}, 1226 ${dropY + 8}, 1226 ${dropY + 26} C 1226 ${dropY + 46}, 1212 ${dropY + 58}, 1195 ${dropY + 58} C 1178 ${dropY + 58}, 1164 ${dropY + 46}, 1164 ${dropY + 26} C 1164 ${dropY + 8}, 1174 ${dropY - 8}, 1195 ${dropY - 38} Z"
                fill="#E63946" stroke="#141414" stroke-width="5"/>
        ` : ""}

        <!-- Chemical Burn Penetration Cone & Swelling Blister Dome -->
        ${blisterT > 0.01 ? `
          <ellipse cx="1195" cy="410" rx="${(blisterW * 1.15).toFixed(1)}" ry="${(80 + blisterT * 75).toFixed(1)}" fill="#E63946" opacity="0.34"/>
          <circle cx="1195" cy="340" r="${(blisterW * pulse * 0.95).toFixed(1)}" fill="none" stroke="#FF4D5A" stroke-width="5" opacity="${(0.55 * (1 - 0.3 * Math.sin(f * 0.3))).toFixed(2)}"/>
          <path d="M ${(1195 - blisterW).toFixed(1)} 338 Q 1195 ${(338 - blisterH * 1.75).toFixed(1)} ${(1195 + blisterW).toFixed(1)} 338 Z"
                fill="#FF7B88" fill-opacity="0.86" stroke="#141414" stroke-width="6"/>
          <path d="M ${(1195 - blisterW * 0.52).toFixed(1)} ${(332 - blisterH * 0.45).toFixed(1)} Q 1195 ${(332 - blisterH * 1.15).toFixed(1)} ${(1195 + blisterW * 0.2).toFixed(1)} ${(332 - blisterH * 0.72).toFixed(1)}"
                fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity="0.88"/>
        ` : ""}

        <!-- Pain Signal Lightning Pulse on Nerve -->
        ${sparkAlpha > 0 ? `
          <circle cx="${sparkX.toFixed(1)}" cy="845" r="22" fill="#E63946" opacity="${sparkAlpha.toFixed(2)}"/>
          <circle cx="1195" cy="${lerp(520, 845, (f % 18) / 18).toFixed(1)}" r="15" fill="#FFFFFF" opacity="${sparkAlpha.toFixed(2)}"/>
        ` : ""}

        <!-- Crisp Minimal Anatomical Tags (only 2 single-word tags) -->
        <g>
          <rect x="1600" y="378" width="180" height="52" rx="26" fill="#071A14" opacity="0.88"/>
          <text x="1690" y="413" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="27" fill="#FAF7F0" direction="rtl" xml:lang="ar">البشرة</text>
          <rect x="1600" y="818" width="180" height="52" rx="26" fill="#071A14" opacity="0.88"/>
          <text x="1690" y="853" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="27" fill="#FFE066" direction="rtl" xml:lang="ar">الأعصاب</text>
        </g>
      </g>

      <!-- Viewport Outer Ink Frame -->
      <rect x="565" y="100" width="1260" height="880" rx="36" fill="none" stroke="#FAF7F0" stroke-width="6"/>
    </g>
  `;
}

function renderBeat4(frame) {
  // 405..518: Kinetic Split-Screen Survival Wipe (❌ لا تحتمِ تحتها vs ✅ ابتعد فوراً)
  const f = frame - 405; // 0..113
  const wipeT = easeOutCubic(f / 16);
  const badPop = springOut((f - 10) / 14);
  const goodPop = springOut((f - 24) / 14);
  const badShake = Math.sin(f * 0.6) * 4;
  const shieldPulse = 1 + 0.05 * Math.sin(f * 0.25);

  // Diagonal split polygon for left half: (0,0) -> (1050,0) -> (870,1080) -> (0,1080)
  const leftClipXTop = lerp(0, 1050, wipeT);
  const leftClipXBot = lerp(0, 870, wipeT);

  return `
    <defs>
      <clipPath id="leftHalfClip">
        <polygon points="0,0 ${leftClipXTop.toFixed(1)},0 ${leftClipXBot.toFixed(1)},1080 0,1080"/>
      </clipPath>
    </defs>

    <!-- RIGHT HALF (RTL First Read): DANGER ❌ -->
    <rect width="1920" height="1080" fill="#FFF0F1"/>
    <g transform="translate(1430, 500)">
      <!-- Simplified Stylized Tree Canopy Dripping Red Drops onto Person -->
      <g transform="translate(${badShake.toFixed(1)}, 48) scale(0.92)">
        <rect x="-24" y="-75" width="48" height="215" rx="14" fill="#6E473B" stroke="#141414" stroke-width="7"/>
        <ellipse cx="0" cy="-152" rx="215" ry="112" fill="#1F7A4D" stroke="#141414" stroke-width="8"/>
        <!-- Rain/Sap Drops Falling Clear of Head -->
        ${[-145, 55, 118].map((dx, i) => {
          const dy = -48 + ((f * 7 + i * 32) % 160);
          return `<circle cx="${dx}" cy="${dy}" r="10" fill="#E63946" stroke="#141414" stroke-width="3"/>`;
        }).join("")}
        <!-- Person Silhouette Under Canopy -->
        <circle cx="-72" cy="48" r="27" fill="#141414"/>
        <path d="M -108 142 C -108 88, -36 88, -36 142 Z" fill="#E63946" stroke="#141414" stroke-width="6"/>
      </g>

      <!-- Big Red X Badge (clear above canopy) -->
      <g transform="translate(0, -330) scale(${badPop.toFixed(3)})">
        <circle cx="0" cy="0" r="66" fill="#E63946" stroke="#141414" stroke-width="7"/>
        <path d="M -25 -25 L 25 25 M 25 -25 L -25 25" fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round"/>
      </g>

      <!-- 2-Word Punch Label -->
      <rect x="-235" y="245" width="470" height="92" rx="46" fill="#E63946" stroke="#141414" stroke-width="6"/>
      <text x="0" y="307" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" direction="rtl" xml:lang="ar">لا تحتمِ تحتها</text>
    </g>

    <!-- LEFT HALF: SAFE SOLUTION ✅ -->
    <g clip-path="url(#leftHalfClip)">
      <rect width="1920" height="1080" fill="#ECFDF5"/>
      <g transform="translate(470, 500)">
        <!-- Safe Shield Shifted Up Cleanly Above Distance Pill -->
        <g transform="translate(0, -36) scale(${shieldPulse.toFixed(3)})">
          <path d="M 0 -175 L 138 -118 L 138 -10 C 138 82, 74 148, 0 178 C -74 148, -138 82, -138 -10 L -138 -118 Z"
                fill="#10B981" stroke="#141414" stroke-width="8" stroke-linejoin="round"/>
          <path d="M -48 2 L -10 42 L 60 -38" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        <!-- Distance Marker Pill Cleanly Below Shield -->
        <rect x="-92" y="156" width="184" height="54" rx="27" fill="#071A14" stroke="#2EE89E" stroke-width="4"/>
        <text x="0" y="193" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="32" fill="#2EE89E" direction="ltr" unicode-bidi="isolate">10m+</text>

        <!-- Big Emerald Check Badge -->
        <g transform="translate(0, -330) scale(${goodPop.toFixed(3)})">
          <circle cx="0" cy="0" r="66" fill="#10B981" stroke="#141414" stroke-width="7"/>
          <path d="M -27 2 L -6 24 L 29 -19" fill="none" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        <!-- 2-Word Punch Label -->
        <rect x="-215" y="245" width="430" height="92" rx="46" fill="#0D7A4E" stroke="#141414" stroke-width="6"/>
        <text x="0" y="307" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" direction="rtl" xml:lang="ar">ابتعد فوراً</text>
      </g>
    </g>

    <!-- Diagonal Ink Divider Bar -->
    <line x1="${leftClipXTop.toFixed(1)}" y1="0" x2="${leftClipXBot.toFixed(1)}" y2="1080" stroke="#141414" stroke-width="14"/>
  `;
}

function renderBeat5(frame) {
  // 519..599: Zoom-Out to Master Grid + Crimson Stamp Slam (f=536) + Iris Wipe to @MijharBio Sting (f=558..599)
  const f = frame - 519; // 0..80
  const zoomOutT = easeOutCubic(f / 16);
  const camScale = lerp(1.35, 1.0, zoomOutT);

  // Stamp slams at f=17 (frame 536) with 5-frame impact shake
  const stampT = springOut((f - 17) / 10);
  const stampScale = f >= 17 ? lerp(2.2, 1.0, clamp01((f - 17) / 8)) : 0;
  let shakeX = 0;
  let shakeY = 0;
  if (f >= 18 && f <= 24) {
    const sf = f - 18;
    const mag = 12 * Math.pow(0.65, sf);
    shakeX = Math.sin(sf * 2.5) * mag;
    shakeY = Math.cos(sf * 3.0) * mag;
  }

  // Iris wipe into dark-emerald @MijharBio sting at f=39..80 (frames 558..599)
  const irisT = easeInOutCubic((f - 39) / 16);
  const irisR = lerp(0, 1200, irisT);
  const stingIn = springOut((f - 48) / 14);

  return `
    <defs>
      ${dotGridPattern("gridB5")}
      <radialGradient id="stingBg" cx="50%" cy="46%" r="65%">
        <stop offset="0%" stop-color="#144636"/>
        <stop offset="60%" stop-color="#092119"/>
        <stop offset="100%" stop-color="#04100C"/>
      </radialGradient>
      <clipPath id="irisClip">
        <circle cx="960" cy="540" r="${irisR.toFixed(1)}"/>
      </clipPath>
    </defs>

    <rect width="1920" height="1080" fill="#FAF7F0"/>
    <rect width="1920" height="1080" fill="url(#gridB5)"/>

    <g transform="translate(${(960 + shakeX).toFixed(1)}, ${(540 + shakeY).toFixed(1)}) scale(${camScale.toFixed(4)}) translate(-960, -540)">
      ${renderMasterGridContent(frame, { dimOthers: true, showChecks: true, popProgress: false })}

      ${f >= 17 ? `
        <g transform="translate(430, 745) rotate(-9) scale(${(stampScale * clamp01(stampT)).toFixed(3)})">
          <rect x="-155" y="-38" width="310" height="76" rx="18" fill="#E63946" stroke="#141414" stroke-width="7"/>
          <text x="0" y="14" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="38" fill="#FAF7F0" direction="rtl" xml:lang="ar">الأخطر 10/10</text>
        </g>
      ` : ""}
    </g>

    ${irisT > 0.005 ? `
      <g clip-path="url(#irisClip)">
        <rect width="1920" height="1080" fill="url(#stingBg)"/>
        <g transform="translate(960, 415) scale(${(0.92 * stingIn).toFixed(3)})">
          <circle cx="0" cy="0" r="222" fill="none" stroke="#2EE89E" stroke-width="9" stroke-dasharray="70 28 18 28" stroke-linecap="round" opacity="0.82"/>
          <circle cx="0" cy="0" r="188" fill="none" stroke="#FFD43B" stroke-width="5" stroke-dasharray="32 22" opacity="0.72"/>
          <g transform="rotate(38)">
            <rect x="-16" y="132" width="32" height="114" rx="16" fill="#0F3A2C" stroke="#141414" stroke-width="8"/>
            <rect x="-22" y="128" width="44" height="20" rx="7" fill="#FFD43B" stroke="#141414" stroke-width="6"/>
          </g>
          <circle cx="0" cy="0" r="136" fill="#FAF7F0" stroke="#141414" stroke-width="12"/>
          <g transform="translate(-14, 6) rotate(-18)">
            <path d="M -52 78 C -58 24, -44 -48, 22 -86 C 58 -40, 56 32, 8 76 C -14 88, -38 88, -52 78 Z"
                  fill="#18A367" stroke="#141414" stroke-width="8" stroke-linejoin="round"/>
            <path d="M -58 92 C -34 40, -6 -22, 18 -72 M -22 30 L 18 14 M -10 -4 L 28 -18"
                  fill="none" stroke="#141414" stroke-width="6" stroke-linecap="round"/>
          </g>
          <g transform="translate(52, 24)">
            <path d="M 0 -52 C 26 -14, 42 8, 42 28 C 42 52, 23 68, 0 68 C -23 68, -42 52, -42 28 C -42 8, -26 -14, 0 -52 Z"
                  fill="#E63946" stroke="#141414" stroke-width="8" stroke-linejoin="round"/>
            <path d="M -20 14 C -22 28, -17 42, -6 47" fill="none" stroke="#FFFFFF" stroke-width="6.5" stroke-linecap="round"/>
          </g>
        </g>

        <g opacity="${clamp01((f - 50) / 10).toFixed(3)}">
          <text x="960" y="758" text-anchor="middle" font-family="Lalezar, sans-serif" font-size="118" fill="#FAF7F0" direction="rtl" xml:lang="ar">مِجهر الطبيعة</text>
          <rect x="790" y="805" width="340" height="66" rx="33" fill="#0F3528" stroke="#2EE89E" stroke-width="3.5"/>
          <text x="960" y="849" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="36" fill="#2EE89E" direction="ltr" unicode-bidi="isolate">@MijharBio</text>
        </g>
      </g>
    ` : ""}
  `;
}

export function renderFrameSvg(frame, _timings = {}) {
  let body = "";
  if (frame < 120) body = renderBeat1(frame);
  else if (frame < 264) body = renderBeat2(frame);
  else if (frame < 405) body = renderBeat3(frame);
  else if (frame < 519) body = renderBeat4(frame);
  else body = renderBeat5(frame);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" dir="rtl">${body}</svg>`;
}
