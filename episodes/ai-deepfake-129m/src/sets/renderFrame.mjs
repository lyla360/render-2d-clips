// Master 45-Beat Frame Renderer (1920x1080 @ 30fps, Pure SVG 2D/2.5D)
// Implements: T1 Hard Cuts, T2 Progressive Splits (1->2 & 1->2->3), T3 Directional Whip-Pan (8f),
// T4 Continuous Pipe Travel, T5 Rack-Focus DoF, T6 CCTV Marquee Zoom, T7 Dynamic Skit Cuts, T8 2.5D Sets.
import { BEATS, FPS, HEIGHT, WIDTH, getBeatAtFrame } from "../beats.mjs";
import { PALETTE, renderHeroMaskObject, renderStickChar } from "../rig/cast_2d.mjs";
import {
  clamp,
  easeInOutCubic,
  easeOutCubic,
  renderBunker25DBg,
  renderEuropeMapBg,
  renderFerrariOfficeBg,
  renderFinanceOfficeBg,
  renderLawLibraryBg,
  renderPipeTravelWorld,
  renderVignette,
} from "./worldSets.mjs";

function mouthForFrame(f, loudnessArr, activeSpeaker) {
  if (!activeSpeaker) return null;
  const bandF = Math.floor(f / 3) * 3; // hold min 3 frames per mouth shape
  const amp = loudnessArr[Math.min(bandF, loudnessArr.length - 1)] ?? 0;
  if (amp < 0.14) return 0;
  if (amp < 0.34) return 1;
  if (amp < 0.56) return 4;
  if (amp < 0.78) return 3;
  return 5;
}

function charAnim(f, seed, isSpeaking, loudnessArr) {
  const t = f / FPS;
  const amp = isSpeaking ? (loudnessArr[f] ?? 0.5) : 0;
  const mouthShape = isSpeaking ? mouthForFrame(f, loudnessArr, true) : null;
  const headTiltDeg = isSpeaking ? Math.sin(t * 8.2 + seed) * (3.0 + amp * 4.5) : Math.sin(t * 1.4 + seed) * 0.8;
  const torsoLeanDeg = isSpeaking ? Math.sin(t * 4.1 + seed) * 2.0 : 0;
  const blinkMod = (f + Math.floor(seed * 31)) % 96;
  const isBlinking = f > 0 && blinkMod >= 91;
  return { mouthShape, headTiltDeg, torsoLeanDeg, isBlinking };
}

function renderBlackCard(f, beat) {
  const wStart = beat.wipeStart ?? beat.startSec + 0.1;
  const wEnd = beat.wipeEnd ?? beat.endSec - 0.3;
  const tSec = f / FPS;
  const lines = beat.cardLines || [beat.narration];
  const nLines = lines.length;
  const dur = Math.max(0.4, wEnd - wStart);

  let linesSvg = "";
  lines.forEach((ln, idx) => {
    const lStart = wStart + (idx / nLines) * dur;
    const lEnd = wStart + ((idx + 1) / nLines) * dur;
    const prog = clamp((tSec - lStart) / Math.max(0.15, lEnd - lStart));
    const clipW = Math.round(1600 * prog);
    const y = nLines === 1 ? 555 : 495 + idx * 115;
    linesSvg += `
      <clipPath id="cardClip_${idx}_f${f}">
        <rect x="160" y="${y - 95}" width="${clipW}" height="135"/>
      </clipPath>
      <text x="960" y="${y}" text-anchor="middle" font-family="'Aref Ruqaa', 'Cairo', serif" font-weight="700" font-size="84" fill="#FFFFFF" clip-path="url(#cardClip_${idx}_f${f})">${ln}</text>
    `;
  });

  return `
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#000000"/>
    ${linesSvg}
  `;
}

function renderChapterCard(f, beat) {
  const localT = (f - beat.startFrame) / FPS;
  const op = clamp(localT / 0.15);
  return `
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#000000"/>
    <text x="960" y="555" text-anchor="middle" font-family="'Aref Ruqaa', 'Cairo', serif" font-weight="700" font-size="96" fill="#FFFFFF" opacity="${op.toFixed(2)}">${beat.chapterTitle}</text>
  `;
}

function renderSingleBeatContent(f, beat, loudnessArr) {
  const lf = f - beat.startFrame;
  const span = Math.max(1, beat.endFrame - beat.startFrame);
  const p = clamp(lf / span);
  const tSec = f / FPS;
  const uid = (tag) => `${beat.id}_${tag}_f${f}`;

  if (beat.type === "card") return renderBlackCard(f, beat);
  if (beat.type === "chapter") return renderChapterCard(f, beat);

  switch (beat.id) {
    case "B01": {
      const z = 1.0 + 0.12 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, -20 * p, false, false)}
          <!-- Desk & Incoming CEO Video Call Monitor -->
          <rect x="440" y="540" width="460" height="260" rx="10" fill="#18202C" stroke="#141414" stroke-width="6"/>
          <rect x="460" y="560" width="420" height="205" rx="4" fill="#123047"/>
          <text x="670" y="615" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="${PALETTE.cyan}">INCOMING VIDEO CALL</text>
          <rect x="570" y="650" width="200" height="58" rx="28" fill="#1FA855" stroke="#141414" stroke-width="4"/>
          <text x="670" y="688" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">CEO — ACCEPT</text>
          <rect x="340" y="795" width="760" height="285" fill="#7D5636" stroke="#141414" stroke-width="6"/>
          ${renderStickChar({ charId: "accountant", x: 1180, y: 900, scale: 2.05, view: "three_quarter", mirror: true, expression: "surprised", pose: "pointing", ...charAnim(f, 1, false, loudnessArr), uid: uid("acc") })}
        </g>
        ${renderVignette(f, 0.15)}
      `;
    }

    case "B03": {
      const lightsOff = tSec >= 7.75;
      const z = lightsOff ? 1.16 + 0.08 * clamp((tSec - 7.75) / 1.9) : 1.04;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, -35 * p, false, lightsOff)}
          <!-- Large Desk Monitor showing Fake CEO Hologram -->
          <rect x="380" y="420" width="540" height="330" rx="12" fill="#141A24" stroke="#141414" stroke-width="6"/>
          <rect x="402" y="442" width="496" height="276" rx="4" fill="#0F2537"/>
          <clipPath id="scrB3_${uid("c")}"><rect x="402" y="442" width="496" height="276"/></clipPath>
          <g clip-path="url(#scrB3_${uid("c")})">
            ${renderStickChar({ charId: "fake_ceo_lawyer", x: 650, y: 880, scale: 1.55, view: "front", expression: "neutral", pose: "talking", holoMode: true, ...charAnim(f, 2, true, loudnessArr), uid: uid("fceo") })}
          </g>
          <rect x="310" y="750" width="680" height="330" fill="#7D5636" stroke="#141414" stroke-width="6"/>
          <g transform="translate(820, 790) rotate(-6)">
            <rect x="-110" y="-28" width="220" height="56" rx="6" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="4"/>
            <text x="0" y="10" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="25" fill="#FFFFFF">SECRET M&amp;A</text>
          </g>
          ${renderStickChar({ charId: "accountant", x: 1230, y: 900, scale: 2.05, view: "three_quarter", mirror: true, expression: "worried", pose: "idle", ...charAnim(f, 1, false, loudnessArr), uid: uid("acc") })}
        </g>
        ${renderVignette(f, lightsOff ? 0.34 : 0.16)}
      `;
    }

    case "B04": {
      // T2 Progressive Split 1 -> 2 at 11.10s!
      const splitStart = 11.10;
      const splitP = easeOutCubic(clamp((tSec - splitStart) / 0.35));
      const divX = Math.round(1920 - 960 * splitP);
      const stampOp = tSec >= 13.81 ? 1 : 0;
      return `
        <!-- Left Panel: CEO Call -->
        <g clip-path="url(#leftB4_${uid("cl")})">
          <clipPath id="leftB4_${uid("cl")}"><rect x="0" y="0" width="${divX}" height="1080"/></clipPath>
          ${renderFinanceOfficeBg(f, -15 * p, false, false)}
          <g transform="translate(${(-300 * splitP).toFixed(1)}, 0)">
            ${renderStickChar({ charId: "fake_ceo_lawyer", x: 820, y: 890, scale: 2.05, view: "three_quarter", expression: "happy", pose: "pointing", holoMode: true, ...charAnim(f, 3, tSec < 12.2, loudnessArr), uid: uid("ceo") })}
          </g>
          <rect x="64" y="64" width="320" height="54" rx="8" fill="#0F172A" stroke="#141414" stroke-width="4"/>
          <text x="224" y="100" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="${PALETTE.cyan}">CALL 1: CEO</text>
        </g>
        <!-- Right Panel: Fake Lawyer Law Firm Library w/ Sunbeams -->
        ${splitP > 0.01 ? `
          <g clip-path="url(#rightB4_${uid("cr")})">
            <clipPath id="rightB4_${uid("cr")}"><rect x="${divX}" y="0" width="${1920 - divX}" height="1080"/></clipPath>
            <g transform="translate(${(divX - 420).toFixed(1)}, 0)">
              ${renderLawLibraryBg(f)}
              ${renderStickChar({ charId: "fake_ceo_lawyer", x: 920, y: 890, scale: 2.05, view: "three_quarter", mirror: true, expression: "neutral", pose: "talking", lawyerMode: true, holoMode: true, ...charAnim(f, 5, tSec >= 12.2, loudnessArr), uid: uid("law") })}
            </g>
            <rect x="${divX + 44}" y="64" width="390" height="54" rx="8" fill="#1E293B" stroke="#141414" stroke-width="4"/>
            <text x="${divX + 239}" y="100" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="#F2C14E">CALL 2: LAW PARTNER</text>
            ${stampOp ? `
              <g transform="translate(${divX + 490}, 280) rotate(-10)">
                <rect x="-130" y="-34" width="260" height="68" rx="8" fill="#1FA855" stroke="#141414" stroke-width="5"/>
                <text x="0" y="12" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">APPROVED</text>
              </g>
            ` : ""}
          </g>
          <line x1="${divX}" y1="0" x2="${divX}" y2="1080" stroke="#141414" stroke-width="8"/>
        ` : ""}
        ${renderVignette(f, 0.20)}
      `;
    }

    case "B06": {
      // T8 2.5D Dark Bunker Pull-Out Reveal
      const z = 1.24 - 0.24 * easeOutCubic(p);
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderBunker25DBg(f, tSec * 3)}
          <!-- Three Criminals at Glowing Control Desk -->
          ${renderStickChar({ charId: "sharon_hazan", x: 640, y: 850, scale: 1.85, view: "three_quarter", expression: "happy", pose: "talking", ...charAnim(f, 1, false, loudnessArr), uid: uid("sh") })}
          ${renderStickChar({ charId: "jacob_soall", x: 960, y: 860, scale: 1.92, view: "front", expression: "manic", pose: "talking", ...charAnim(f, 2, true, loudnessArr), uid: uid("js") })}
          ${renderStickChar({ charId: "guy_sheetrit", x: 1290, y: 850, scale: 1.85, view: "three_quarter", mirror: true, expression: "neutral", pose: "holding_phone", ...charAnim(f, 3, false, loudnessArr), uid: uid("gs") })}
          <!-- Long Bunker Console -->
          <rect x="440" y="720" width="1040" height="190" rx="10" fill="#1C2436" stroke="#141414" stroke-width="6"/>
          <rect x="520" y="590" width="210" height="130" rx="6" fill="#0F172A" stroke="${PALETTE.cyan}" stroke-width="4"/>
          <rect x="845" y="580" width="230" height="140" rx="6" fill="#0F172A" stroke="${PALETTE.cyan}" stroke-width="4"/>
          <rect x="1190" y="590" width="210" height="130" rx="6" fill="#0F172A" stroke="${PALETTE.cyan}" stroke-width="4"/>
          <!-- Glowing Hero Mask Floating Above -->
          ${renderHeroMaskObject({ x: 960, y: 300 + Math.sin(tSec * 2.5) * 10, scale: 1.35, pulse: tSec * 4, uid: uid("hm") })}
        </g>
        ${renderVignette(f, 0.42)}
      `;
    }

    case "B07": {
      // Skit 1 Wide Setup
      const z = 1.0 + 0.05 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, 0, false, false)}
          <rect x="340" y="450" width="440" height="290" rx="10" fill="#141B29" stroke="#141414" stroke-width="6"/>
          <rect x="360" y="470" width="400" height="240" fill="#0D2235"/>
          <clipPath id="s1c_${uid("c")}"><rect x="360" y="470" width="400" height="240"/></clipPath>
          <g clip-path="url(#s1c_${uid("c")})">
            ${renderStickChar({ charId: "fake_ceo_lawyer", x: 560, y: 840, scale: 1.4, view: "front", expression: "neutral", pose: "idle", holoMode: true, uid: uid("fceo") })}
          </g>
          <rect x="280" y="740" width="560" height="340" fill="#7D5636" stroke="#141414" stroke-width="6"/>
          ${renderStickChar({ charId: "accountant", x: 1220, y: 900, scale: 2.08, view: "three_quarter", mirror: true, expression: "worried", pose: "holding_phone", ...charAnim(f, 1, tSec >= 26.4, loudnessArr), uid: uid("acc") })}
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B08": {
      // Skit 1 +45% Punch-In on Jacob Soall (Speaker B)
      const z = 1.42 + 0.06 * p;
      return `
        <g transform="translate(${(960 - 960 * z).toFixed(1)}, ${(540 - 440 * z).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderBunker25DBg(f, tSec * 2)}
          ${renderStickChar({ charId: "jacob_soall", x: 960, y: 840, scale: 2.05, view: "three_quarter", expression: "deadpan", pose: "talking", ...charAnim(f, 2, true, loudnessArr), uid: uid("js") })}
          <!-- Transparent CEO Mask floating right in front of his mouth -->
          <rect x="1090" y="430" width="220" height="160" rx="8" fill="#0F1F33" stroke="${PALETTE.cyan}" stroke-width="4" opacity="0.9"/>
          <text x="1200" y="520" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="${PALETTE.cyan}">CEO VOICE</text>
        </g>
        ${renderVignette(f, 0.40)}
      `;
    }

    case "B09": {
      // Skit 1 Reverse Close-Up on Claire (Deadpan)
      const z = 1.55 + 0.05 * p;
      return `
        <g transform="translate(${(960 - 1100 * z).toFixed(1)}, ${(540 - 470 * z).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, 0, false, false)}
          ${renderStickChar({ charId: "accountant", x: 1100, y: 900, scale: 2.1, view: "three_quarter", mirror: true, expression: "deadpan", pose: "holding_phone", ...charAnim(f, 1, true, loudnessArr), uid: uid("acc") })}
        </g>
        ${renderVignette(f, 0.18)}
      `;
    }

    case "B10": {
      // Skit 1 Slapstick Punchline: Jacob switching masks + Sharon thumbs-up
      return `
        ${renderBunker25DBg(f, tSec * 3)}
        ${renderStickChar({ charId: "sharon_hazan", x: 640, y: 880, scale: 2.0, view: "three_quarter", expression: "happy", pose: "pointing", ...charAnim(f, 1, false, loudnessArr), uid: uid("sh") })}
        ${renderStickChar({ charId: "jacob_soall", x: 1080, y: 890, scale: 2.2, view: "three_quarter", mirror: true, expression: "deadpan", pose: "switching_mask", ...charAnim(f, 2, true, loudnessArr), uid: uid("js") })}
        <g transform="translate(1320, 420) rotate(8)">
          <rect x="-125" y="-28" width="250" height="56" rx="8" fill="#1E293B" stroke="${PALETTE.cyan}" stroke-width="4"/>
          <text x="0" y="9" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="23" fill="#FFFFFF">LAWYER MASK</text>
        </g>
        ${renderVignette(f, 0.40)}
      `;
    }

    case "B11": {
      // Staged Build + Rolling Counter $0 -> $129,000,000
      const countP = easeOutCubic(clamp((tSec - 35.64) / 4.2));
      const val = Math.round(129000000 * countP);
      const formatted = "$" + val.toLocaleString("en-US");
      const showTowers = clamp((tSec - 39.2) / 0.8);
      return `
        ${renderBunker25DBg(f, tSec * 3)}
        <!-- Big Glowing Counter Plate -->
        <rect x="520" y="130" width="880" height="170" rx="18" fill="#0B1324" stroke="${PALETTE.cyan}" stroke-width="6"/>
        <text x="960" y="242" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="108" fill="${PALETTE.cyan}">${formatted}</text>
        <!-- Victim Mini-Towers (Bank, Hospital, Tech) -->
        <g transform="translate(0, ${((1 - showTowers) * 260).toFixed(1)})" opacity="${showTowers.toFixed(2)}">
          <rect x="260" y="540" width="260" height="360" fill="#2A3B55" stroke="#141414" stroke-width="5"/>
          <text x="390" y="610" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#F2C14E">BANK</text>
          <rect x="830" y="490" width="260" height="410" fill="#266468" stroke="#141414" stroke-width="5"/>
          <text x="960" y="560" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF">HOSPITAL +</text>
          <rect x="1400" y="520" width="260" height="380" fill="#3B4863" stroke="#141414" stroke-width="5"/>
          <text x="1530" y="590" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="${PALETTE.cyan}">TECH FIRM</text>
        </g>
        <rect x="0" y="900" width="1920" height="180" fill="#131926" stroke="#141414" stroke-width="5"/>
        ${renderHeroMaskObject({ x: 960, y: 395, scale: 0.95, pulse: tSec * 4, uid: uid("hm") })}
        ${renderVignette(f, 0.36)}
      `;
    }

    case "B13": {
      // T5 Rack-Focus DoF Pull: Foreground Office -> Sharp Bunker Laptops & AI Mask
      const blurFg = (p * 6.5).toFixed(2);
      const blurBg = ((1 - p) * 6.5).toFixed(2);
      return `
        <defs>
          <filter id="rfBg_${uid("f")}"><feGaussianBlur stdDeviation="${blurBg}"/></filter>
          <filter id="rfFg_${uid("f")}"><feGaussianBlur stdDeviation="${blurFg}"/></filter>
        </defs>
        <g filter="url(#rfBg_${uid("f")})">
          ${renderBunker25DBg(f, tSec * 3)}
          ${renderStickChar({ charId: "sharon_hazan", x: 640, y: 840, scale: 1.75, view: "three_quarter", expression: "neutral", pose: "talking", uid: uid("sh") })}
          ${renderStickChar({ charId: "jacob_soall", x: 960, y: 840, scale: 1.80, view: "front", expression: "happy", pose: "talking", uid: uid("js") })}
          ${renderStickChar({ charId: "guy_sheetrit", x: 1280, y: 840, scale: 1.75, view: "three_quarter", mirror: true, expression: "neutral", pose: "idle", uid: uid("gs") })}
          ${renderHeroMaskObject({ x: 960, y: 310, scale: 1.25, pulse: tSec * 4, uid: uid("hm") })}
        </g>
        <!-- Foreground Framing Desks & Accountant Silhouette -->
        <g filter="url(#rfFg_${uid("f")})" opacity="0.92">
          <rect x="-40" y="760" width="520" height="360" fill="#6E4E32" stroke="#141414" stroke-width="6"/>
          <rect x="1440" y="760" width="520" height="360" fill="#6E4E32" stroke="#141414" stroke-width="6"/>
          ${renderStickChar({ charId: "accountant", x: 240, y: 1020, scale: 2.35, view: "back", expression: "neutral", pose: "idle", uid: uid("acc_fg") })}
        </g>
        ${renderVignette(f, 0.35)}
      `;
    }

    case "B14": {
      // [TITLE] Over Live 2.5D Laser Grid Hero Scene
      const z = 1.0 + 0.08 * p;
      const line1Op = clamp((lf + 2) / 5);
      const badgeScale = lf > 8 ? 1 + 0.06 * Math.exp(-(lf - 8) * 0.25) : clamp(lf / 8);
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderBunker25DBg(f, tSec * 4)}
          <!-- Laser Grid Accent -->
          <g stroke="${PALETTE.crimson}" stroke-width="3" opacity="0.65">
            <line x1="0" y1="220" x2="1920" y2="860"/><line x1="1920" y1="220" x2="0" y2="860"/>
          </g>
          ${renderHeroMaskObject({ x: 1380, y: 520, scale: 1.85, pulse: tSec * 5, uid: uid("hm") })}
        </g>
        <!-- Bold Outlined English Title + Slanted Crimson Badge -->
        <g opacity="${line1Op.toFixed(2)}">
          <text x="150" y="390" font-family="Lalezar, Cairo, sans-serif" font-size="118" fill="#FFFFFF" stroke="#141414" stroke-width="14" paint-order="stroke">HOW THREE AI VOICES</text>
          <text x="150" y="535" font-family="Lalezar, Cairo, sans-serif" font-size="122" fill="#FFFFFF" stroke="#141414" stroke-width="14" paint-order="stroke">STOLE</text>
        </g>
        <g transform="translate(650, 625) rotate(-5) scale(${badgeScale.toFixed(3)})">
          <rect x="-290" y="-68" width="580" height="136" rx="16" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="8"/>
          <text x="0" y="38" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="112" fill="#FFFFFF">$129 MILLION</text>
        </g>
        ${renderVignette(f, 0.35)}
      `;
    }

    case "B16": {
      // Unmirrored UK-Spain-Israel Map + Swinging Stamp + Trio Pop-in
      const panX = -160 * p;
      const localT = lf / FPS;
      const swing = Math.sin(localT * 6.5) * 16 * Math.exp(-localT * 1.1);
      const showSoall = tSec >= 61.05;
      const showHazan = tSec >= 62.05;
      const showSheetrit = tSec >= 63.05;
      return `
        ${renderEuropeMapBg(f, panX)}
        <g transform="translate(${panX.toFixed(1)}, 0)">
          <!-- Connecting Arcs -->
          <path d="M 465 260 Q 470 420 510 560" fill="none" stroke="${PALETTE.crimson}" stroke-width="6" stroke-dasharray="12,8"/>
          <path d="M 510 560 Q 1020 380 1515 710" fill="none" stroke="${PALETTE.crimson}" stroke-width="6" stroke-dasharray="12,8"/>
          ${showSoall ? renderStickChar({ charId: "jacob_soall", x: 560, y: 400, scale: 1.05, view: "three_quarter", expression: "happy", pose: "idle", uid: uid("js") }) : ""}
          ${showHazan ? renderStickChar({ charId: "sharon_hazan", x: 740, y: 740, scale: 1.05, view: "three_quarter", expression: "neutral", pose: "idle", uid: uid("sh") }) : ""}
          ${showSheetrit ? renderStickChar({ charId: "guy_sheetrit", x: 1640, y: 840, scale: 1.05, view: "three_quarter", mirror: true, expression: "neutral", pose: "idle", uid: uid("gs") }) : ""}
        </g>
        <!-- Swinging Yellow Date Stamp (Top-Left for English) -->
        <g transform="translate(260, 0)">
          <line x1="0" y1="0" x2="0" y2="95" stroke="#141414" stroke-width="4"/>
          <g transform="translate(0, 95) rotate(${swing.toFixed(2)})">
            <rect x="-125" y="0" width="250" height="62" rx="8" fill="${PALETTE.gold}" stroke="#141414" stroke-width="5"/>
            <text x="0" y="42" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="32" fill="#141414">JULY 2024</text>
          </g>
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B17": {
      const z = 1.04 + 0.10 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderBunker25DBg(f, tSec * 2)}
          <rect x="380" y="160" width="1160" height="680" rx="22" fill="#121B2E" stroke="${PALETTE.cyan}" stroke-width="7"/>
          <rect x="380" y="160" width="1160" height="84" rx="18" fill="#1E293B"/>
          <text x="960" y="216" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">ENCRYPTED GROUP CHAT</text>
          <!-- Chat Bubbles -->
          <rect x="460" y="300" width="600" height="90" rx="18" fill="#2A394A" stroke="#141414" stroke-width="4"/>
          <text x="500" y="356" font-family="Cairo, sans-serif" font-weight="800" font-size="30" fill="${PALETTE.cyan}">User_01: Next target wired?</text>
          <rect x="860" y="430" width="600" height="90" rx="18" fill="#D93829" stroke="#141414" stroke-width="4"/>
          <text x="900" y="486" font-family="Cairo, sans-serif" font-weight="800" font-size="30" fill="#FFFFFF">User_02: Check the handle...</text>
          <rect x="460" y="570" width="540" height="90" rx="18" fill="#2A394A" stroke="#141414" stroke-width="4"/>
          <text x="500" y="626" font-family="Cairo, sans-serif" font-weight="800" font-size="30" fill="${PALETTE.gold}">[NICKNAMES LOADING...]</text>
        </g>
        ${renderVignette(f, 0.34)}
      `;
    }

    case "B19": {
      // Sepia Flashback: NY 2008 Bank Fraud
      const stampP = easeOutCubic(clamp((tSec - 73.2) / 0.25));
      return `
        <rect width="1920" height="1080" fill="#B9A580"/>
        <!-- Police Height Chart Lines -->
        <g stroke="#5A4A38" stroke-width="3">${[240, 320, 400, 480, 560, 640, 720].map((y) => `<line x1="160" y1="${y}" x2="1760" y2="${y}"/>`).join("")}</g>
        <rect x="0" y="840" width="1920" height="240" fill="#7D684C" stroke="#141414" stroke-width="5"/>
        ${renderStickChar({ charId: "sharon_hazan", x: 960, y: 880, scale: 2.25, view: "front", expression: "deadpan", pose: "idle", uid: uid("sh") })}
        <!-- Mugshot Board -->
        <rect x="835" y="545" width="250" height="145" rx="6" fill="#F4EFE2" stroke="#141414" stroke-width="5"/>
        <text x="960" y="595" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="28" fill="#141414">NEW YORK 2008</text>
        <text x="960" y="645" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="32" fill="${PALETTE.crimson}">BANK FRAUD</text>
        ${stampP > 0.05 ? `
          <g transform="translate(1320, 310) rotate(-12) scale(${(1.6 - 0.6 * stampP).toFixed(2)})">
            <rect x="-185" y="-44" width="370" height="88" rx="10" fill="none" stroke="${PALETTE.crimson}" stroke-width="10"/>
            <text x="0" y="16" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="52" fill="${PALETTE.crimson}">CONVICTED</text>
          </g>
        ` : ""}
        ${renderVignette(f, 0.36)}
      `;
    }

    case "B20": {
      // Wide Travel Pan: Bank Vault (X'd out) -> Accountant holding Golden Wire Keys
      const panX = -860 * easeInOutCubic(p);
      return `
        <g transform="translate(${panX.toFixed(1)}, 0)">
          <!-- Vault Side (x=0..1100) -->
          <rect x="0" y="0" width="2800" height="760" fill="#E3DED2" stroke="#141414" stroke-width="4"/>
          <rect x="0" y="760" width="2800" height="320" fill="#B69062" stroke="#141414" stroke-width="5"/>
          <circle cx="520" cy="430" r="240" fill="#7D8794" stroke="#141414" stroke-width="8"/>
          <circle cx="520" cy="430" r="185" fill="#9AA4B2" stroke="#141414" stroke-width="5"/>
          <!-- Red X over Vault -->
          <line x1="340" y1="250" x2="700" y2="610" stroke="${PALETTE.crimson}" stroke-width="26" stroke-linecap="round"/>
          <line x1="700" y1="250" x2="340" y2="610" stroke="${PALETTE.crimson}" stroke-width="26" stroke-linecap="round"/>
          <!-- Wall Divider & Corporate Posters -->
          <rect x="1150" y="160" width="340" height="220" rx="8" fill="#F8FAFC" stroke="#141414" stroke-width="5"/>
          <text x="1320" y="280" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#1E293B">WIRE PROTOCOL</text>
          <!-- Right Side: Accountant + Glowing Golden Wire Keys -->
          ${renderStickChar({ charId: "accountant", x: 1960, y: 890, scale: 2.15, view: "three_quarter", mirror: true, expression: "neutral", pose: "pointing", ...charAnim(f, 1, false, loudnessArr), uid: uid("acc") })}
          <!-- Glowing Golden Key -->
          <g transform="translate(1740, 480) rotate(-18)">
            <circle cx="-42" cy="0" r="36" fill="${PALETTE.gold}" stroke="#141414" stroke-width="6"/>
            <circle cx="-42" cy="0" r="12" fill="#E3DED2" stroke="#141414" stroke-width="4"/>
            <rect x="-8" y="-12" width="125" height="24" rx="6" fill="${PALETTE.gold}" stroke="#141414" stroke-width="6"/>
            <rect x="75" y="12" width="18" height="26" fill="${PALETTE.gold}" stroke="#141414" stroke-width="5"/>
          </g>
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B21": {
      // Top-Down Desk: Step 1 e-Sign NDA Tablet Slide
      const slideX = (1 - easeOutCubic(clamp(p / 0.35))) * 900;
      return `
        <rect width="1920" height="1080" fill="#8C6239"/>
        ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 150}" x2="1920" y2="${i * 150}" stroke="#6E4B2A" stroke-width="3"/>`).join("")}
        <!-- Coffee Cup Top-Down -->
        <circle cx="320" cy="820" r="78" fill="#FFFFFF" stroke="#141414" stroke-width="6"/>
        <circle cx="320" cy="820" r="56" fill="#4B2E1E"/>
        <!-- Step 1 Badge -->
        <rect x="130" y="95" width="290" height="68" rx="10" fill="${PALETTE.cyan}" stroke="#141414" stroke-width="5"/>
        <text x="275" y="142" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="40" fill="#141414">STEP 1: NDA</text>
        <!-- Sliding Electronic Tablet -->
        <g transform="translate(${slideX.toFixed(1)}, 0)">
          <rect x="520" y="140" width="880" height="800" rx="28" fill="#1E293B" stroke="#141414" stroke-width="8"/>
          <rect x="560" y="195" width="800" height="690" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="4"/>
          <rect x="560" y="195" width="800" height="90" fill="#2563EB"/>
          <text x="610" y="254" font-family="Cairo, sans-serif" font-weight="900" font-size="36" fill="#FFFFFF">e-SIGN: CONFIDENTIAL M&amp;A</text>
          ${[340, 410, 480, 550].map((ly) => `<line x1="620" y1="${ly}" x2="1280" y2="${ly}" stroke="#CBD5E1" stroke-width="10" stroke-linecap="round"/>`).join("")}
          <rect x="640" y="650" width="640" height="140" rx="12" fill="#FEF3C7" stroke="${PALETTE.crimson}" stroke-width="5" stroke-dasharray="14,8"/>
          <text x="960" y="732" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="38" fill="${PALETTE.crimson}">STRICT NON-DISCLOSURE</text>
        </g>
        ${renderVignette(f, 0.22)}
      `;
    }

    case "B23": {
      // Step 2: Real CEO Voice -> AI Cloner -> Ringing Accountant Screen
      const waveX = (f * 8) % 180;
      return `
        <rect width="1920" height="1080" fill="#182235"/>
        <rect x="0" y="760" width="1920" height="320" fill="#111827" stroke="#141414" stroke-width="5"/>
        <rect x="120" y="70" width="290" height="64" rx="10" fill="${PALETTE.cyan}" stroke="#141414" stroke-width="5"/>
        <text x="265" y="114" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="38" fill="#141414">STEP 2: CLONE</text>
        <!-- Left: Real CEO Podium -->
        <rect x="240" y="610" width="210" height="220" fill="#475569" stroke="#141414" stroke-width="5"/>
        ${renderStickChar({ charId: "fake_ceo_lawyer", x: 345, y: 830, scale: 1.7, view: "three_quarter", expression: "happy", pose: "talking", ...charAnim(f, 2, true, loudnessArr), uid: uid("real_ceo") })}
        <!-- Middle: AI Cloner Machine -->
        <rect x="740" y="340" width="440" height="400" rx="20" fill="#0F172A" stroke="${PALETTE.cyan}" stroke-width="7"/>
        <text x="960" y="410" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="32" fill="${PALETTE.cyan}">AI VOICE CLONER</text>
        <polyline points="780,530 840,${480 + Math.sin(tSec * 12) * 35} 900,${580 - Math.cos(tSec * 10) * 35} 960,${460 + Math.sin(tSec * 14) * 40} 1020,${570 - Math.sin(tSec * 9) * 30} 1080,${490 + Math.cos(tSec * 11) * 35} 1140,530" fill="none" stroke="${PALETTE.cyan}" stroke-width="7" stroke-linecap="round"/>
        <!-- Flowing Sound Arrows -->
        <line x1="480" y1="530" x2="720" y2="530" stroke="${PALETTE.cyan}" stroke-width="8" stroke-dasharray="18,16" stroke-dashoffset="${-waveX}"/>
        <line x1="1200" y1="530" x2="1440" y2="530" stroke="${PALETTE.crimson}" stroke-width="8" stroke-dasharray="18,16" stroke-dashoffset="${-waveX}"/>
        <!-- Right: Accountant Receiving Clone Call -->
        ${renderStickChar({ charId: "accountant", x: 1580, y: 860, scale: 1.85, view: "three_quarter", mirror: true, expression: "worried", pose: "holding_phone", uid: uid("acc") })}
        ${renderVignette(f, 0.28)}
      `;
    }

    case "B24": {
      // Earned Close-Up: Step 3 The Trap
      const z = 1.0 + 0.14 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderBunker25DBg(f, tSec * 4)}
          ${renderHeroMaskObject({ x: 960, y: 510, scale: 2.35, pulse: tSec * 5, uid: uid("hm") })}
        </g>
        <g transform="translate(320, 145) rotate(-4)">
          <rect x="-215" y="-42" width="430" height="84" rx="12" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="6"/>
          <text x="0" y="16" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="52" fill="#FFFFFF">STEP 3: THE TRAP</text>
        </g>
        ${renderVignette(f, 0.42)}
      `;
    }

    case "B25": {
      // Literal Puppeteer Metaphor: Gang pulling strings on BOTH Clones flanking Claire
      const z = 1.15 - 0.15 * easeOutCubic(p);
      const bob1 = Math.sin(tSec * 4) * 10;
      const bob2 = Math.cos(tSec * 4) * 10;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          <rect width="1920" height="1080" fill="#131B2E"/>
          <!-- Upper Catwalk (inside safe box y>=54) -->
          <rect x="200" y="340" width="1520" height="26" fill="#334155" stroke="#141414" stroke-width="5"/>
          ${renderStickChar({ charId: "sharon_hazan", x: 540, y: 340, scale: 0.94, view: "three_quarter", expression: "happy", pose: "talking", uid: uid("sh") })}
          ${renderStickChar({ charId: "jacob_soall", x: 1380, y: 340, scale: 0.94, view: "three_quarter", mirror: true, expression: "manic", pose: "talking", uid: uid("js") })}
          <!-- Cyan Puppeteer Strings down to Clones -->
          <g stroke="${PALETTE.cyan}" stroke-width="3.5" stroke-dasharray="9,6">
            <line x1="540" y1="295" x2="500" y2="${430 + bob1}"/>
            <line x1="600" y1="295" x2="580" y2="${480 + bob1}"/>
            <line x1="1380" y1="295" x2="1420" y2="${430 + bob2}"/>
            <line x1="1320" y1="295" x2="1340" y2="${480 + bob2}"/>
          </g>
          <!-- Stage Floor -->
          <rect x="0" y="880" width="1920" height="200" fill="#1E293B" stroke="#141414" stroke-width="5"/>
          <!-- Two AI Puppet Clones Flanking Accountant -->
          ${renderStickChar({ charId: "fake_ceo_lawyer", x: 540, y: 880 + bob1, scale: 1.95, view: "three_quarter", expression: "happy", pose: "pointing", holoMode: true, uid: uid("p1") })}
          ${renderStickChar({ charId: "accountant", x: 960, y: 900, scale: 1.85, view: "front", expression: "worried", pose: "idle", ...charAnim(f, 1, false, loudnessArr), uid: uid("acc") })}
          ${renderStickChar({ charId: "fake_ceo_lawyer", x: 1380, y: 880 + bob2, scale: 1.95, view: "three_quarter", mirror: true, expression: "neutral", pose: "pointing", lawyerMode: true, holoMode: true, uid: uid("p2") })}
        </g>
        ${renderVignette(f, 0.35)}
      `;
    }

    case "B27": {
      // T4 Continuous Physical-Connector Pipe Travel across 3840px (USA -> Spain -> Portugal -> Greece -> Crypto)
      const camX = 1920 * easeInOutCubic(p);
      return `
        ${renderPipeTravelWorld(f, camX)}
        ${renderVignette(f, 0.25)}
      `;
    }

    case "B28": {
      const z = 1.0 + 0.08 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          <rect width="1920" height="1080" fill="#BBD6EA"/>
          <rect x="0" y="820" width="1920" height="260" fill="#4B5563" stroke="#141414" stroke-width="5"/>
          <rect x="220" y="210" width="380" height="610" fill="#2A405E" stroke="#141414" stroke-width="6"/>
          <rect x="770" y="130" width="380" height="690" fill="#36574C" stroke="#141414" stroke-width="6"/>
          <rect x="1320" y="240" width="380" height="580" fill="#5D4B3B" stroke="#141414" stroke-width="6"/>
          <text x="410" y="310" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">FINTECH</text>
          <text x="960" y="230" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">PET CORP</text>
          <text x="1510" y="340" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">BANK</text>
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B29": {
      // T2 Progressive 1 -> 2 -> 3 Victim Triptych
      // Col 1 (0s): UK FINTECH -$11.6M | Col 2 (120.62s): FL PET FOOD -$5.0M | Col 3 (123.21s): RI BANK -$2.7M
      const p2 = easeOutCubic(clamp((tSec - 120.5) / 0.35));
      const p3 = easeOutCubic(clamp((tSec - 123.1) / 0.35));
      const slipY = ((lf * 5) % 90);
      return `
        <!-- Panel 1: UK Fintech -->
        <g>
          <rect x="0" y="0" width="640" height="1080" fill="#1D2B44"/>
          <rect x="0" y="770" width="640" height="310" fill="#131B2E" stroke="#141414" stroke-width="4"/>
          <rect x="90" y="90" width="460" height="86" rx="10" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="5"/>
          <text x="320" y="148" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="44" fill="#FFFFFF">UK FINTECH -$11.6M</text>
          <!-- Spitting Wire Printer -->
          <rect x="190" y="420" width="260" height="220" rx="12" fill="#F6F3EC" stroke="#141414" stroke-width="5"/>
          <rect x="240" y="640" width="160" height="${60 + slipY}" fill="#FFFFFF" stroke="#141414" stroke-width="4"/>
          <text x="320" y="685" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="22" fill="${PALETTE.crimson}">WIRE OUT</text>
        </g>
        <!-- Panel 2: Florida Pet Food -->
        ${p2 > 0.01 ? `
          <g clip-path="url(#p2c_${uid("c")})">
            <clipPath id="p2c_${uid("c")}"><rect x="640" y="0" width="${Math.round(640 * p2)}" height="1080"/></clipPath>
            <rect x="640" y="0" width="640" height="1080" fill="#D9C7A3"/>
            <rect x="640" y="770" width="640" height="310" fill="#8C6239" stroke="#141414" stroke-width="4"/>
            <rect x="730" y="90" width="460" height="86" rx="10" fill="#1E293B" stroke="#141414" stroke-width="5"/>
            <text x="960" y="148" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="44" fill="#F2C14E">FL PET FOOD -$5.0M</text>
            ${[760, 920, 1080].map((bx) => `<rect x="${bx}" y="610" width="110" height="160" rx="8" fill="#C94A38" stroke="#141414" stroke-width="5"/><text x="${bx + 55}" y="695" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">KIBBLE</text>`).join("")}
            ${renderStickChar({ charId: "auditor_boss", x: 960, y: 880, scale: 1.85, view: "front", expression: "worried", pose: "talking", uid: uid("ab") })}
          </g>
        ` : ""}
        <!-- Panel 3: Rhode Island Bank -->
        ${p3 > 0.01 ? `
          <g clip-path="url(#p3c_${uid("c")})">
            <clipPath id="p3c_${uid("c")}"><rect x="1280" y="0" width="${Math.round(640 * p3)}" height="1080"/></clipPath>
            <rect x="1280" y="0" width="640" height="1080" fill="#4A382B"/>
            <rect x="1280" y="770" width="640" height="310" fill="#322319" stroke="#141414" stroke-width="4"/>
            <rect x="1370" y="90" width="460" height="86" rx="10" fill="#1E293B" stroke="#141414" stroke-width="5"/>
            <text x="1600" y="148" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="44" fill="${PALETTE.cyan}">RI BANK -$2.7M</text>
            <rect x="1390" y="620" width="420" height="150" fill="#8C6D53" stroke="#141414" stroke-width="5"/>
            ${renderStickChar({ charId: "accountant", x: 1600, y: 880, scale: 1.85, view: "three_quarter", mirror: true, expression: "surprised", pose: "holding_phone", uid: uid("ri") })}
          </g>
        ` : ""}
        <line x1="640" y1="0" x2="640" y2="1080" stroke="#141414" stroke-width="8"/>
        <line x1="1280" y1="0" x2="1280" y2="1080" stroke="#141414" stroke-width="8"/>
        ${renderVignette(f, 0.22)}
      `;
    }

    case "B31": {
      // Skit 2 Wide: Pet Food Office
      const z = 1.0 + 0.05 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, 0, false, false)}
          <rect x="220" y="610" width="180" height="220" rx="8" fill="#C94A38" stroke="#141414" stroke-width="5"/>
          <text x="310" y="720" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">DOG FOOD</text>
          ${renderStickChar({ charId: "auditor_boss", x: 1220, y: 900, scale: 2.05, view: "three_quarter", mirror: true, expression: "angry", pose: "pointing", ...charAnim(f, 4, true, loudnessArr), uid: uid("ab") })}
          ${renderStickChar({ charId: "arup_staff", x: 640, y: 900, scale: 2.05, view: "three_quarter", expression: "deadpan", pose: "idle", ...charAnim(f, 2, false, loudnessArr), uid: uid("st") })}
        </g>
        ${renderVignette(f, 0.15)}
      `;
    }

    case "B32": {
      // Skit 2 +45% Punch-In on Staffer ("The chief executive.")
      const z = 1.48 + 0.04 * p;
      return `
        <g transform="translate(${(960 - 660 * z).toFixed(1)}, ${(540 - 460 * z).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, 0, false, false)}
          ${renderStickChar({ charId: "arup_staff", x: 660, y: 900, scale: 2.05, view: "three_quarter", expression: "deadpan", pose: "pointing", ...charAnim(f, 2, true, loudnessArr), uid: uid("st") })}
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B33": {
      // Skit 2 Reverse ("Did legal verify it?")
      const z = 1.48 + 0.04 * p;
      return `
        <g transform="translate(${(960 - 1220 * z).toFixed(1)}, ${(540 - 460 * z).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, 0, false, false)}
          ${renderStickChar({ charId: "auditor_boss", x: 1220, y: 900, scale: 2.05, view: "three_quarter", mirror: true, expression: "worried", pose: "talking", ...charAnim(f, 4, true, loudnessArr), uid: uid("ab") })}
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B34": {
      // Skit 2 Slapstick Punchline: Rocky Balboa Stamp Slam + Paper Drop
      const slamP = easeOutCubic(clamp(p / 0.25));
      const dropY = 180 + Math.min(350, lf * 9);
      return `
        ${renderFinanceOfficeBg(f, 0, false, false)}
        ${renderStickChar({ charId: "auditor_boss", x: 1240, y: 900, scale: 2.0, view: "three_quarter", mirror: true, expression: "deadpan", pose: "idle", uid: uid("ab") })}
        <!-- Paper Slip Falling onto Auditor's Head -->
        <rect x="1190" y="${dropY}" width="110" height="45" rx="4" fill="#FFFFFF" stroke="#141414" stroke-width="3" transform="rotate(${Math.sin(f * 0.2) * 14}, 1245, ${dropY})"/>
        <!-- Giant Invoice with Slammed Crimson Rocky Balboa Stamp -->
        <rect x="330" y="190" width="600" height="680" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="6"/>
        <text x="630" y="290" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="44" fill="#141414">INVOICE: $5,000,000</text>
        <text x="630" y="365" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="800" font-size="30" fill="#475569">ITEM: DOG FOOD</text>
        <g transform="translate(630, 560) rotate(-10) scale(${(1.7 - 0.7 * slamP).toFixed(2)})">
          <rect x="-240" y="-70" width="480" height="140" rx="14" fill="none" stroke="${PALETTE.crimson}" stroke-width="11"/>
          <text x="0" y="-6" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="${PALETTE.crimson}">APPROVED BY:</text>
          <text x="0" y="44" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="48" fill="${PALETTE.crimson}">ROCKY BALBOA, ESQ.</text>
        </g>
        ${renderVignette(f, 0.18)}
      `;
    }

    case "B36": {
      // Hong Kong 2024 Arup $25M Call: 2x2 Grid glitches into Cyan Wireframes at 147.0s
      const glitched = tSec >= 147.0;
      return `
        <rect width="1920" height="1080" fill="#0F172A"/>
        <rect x="0" y="800" width="1920" height="280" fill="#1E293B" stroke="#141414" stroke-width="5"/>
        <!-- Big Wall 2x2 Video Call Screen -->
        <rect x="440" y="100" width="1180" height="650" rx="14" fill="#09111E" stroke="#141414" stroke-width="8"/>
        ${[0, 1, 2, 3].map((q) => {
          const qx = 460 + (q % 2) * 580;
          const qy = 120 + Math.floor(q / 2) * 315;
          return `
            <rect x="${qx}" y="${qy}" width="560" height="295" rx="6" fill="${glitched ? "#082838" : "#25344B"}" stroke="${glitched ? PALETTE.cyan : "#141414"}" stroke-width="4"/>
            <clipPath id="arQ_${q}_${uid("c")}"><rect x="${qx}" y="${qy}" width="560" height="295"/></clipPath>
            <g clip-path="url(#arQ_${q}_${uid("c")})">
              ${renderStickChar({ charId: "arup_staff", x: qx + 280, y: qy + 390, scale: 1.35, view: "front", expression: "happy", pose: "talking", holoMode: glitched, uid: uid(`q${q}`) })}
            </g>
          `;
        }).join("")}
        <!-- Stamp -->
        <rect x="130" y="90" width="320" height="62" rx="8" fill="${PALETTE.gold}" stroke="#141414" stroke-width="5"/>
        <text x="290" y="132" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="28" fill="#141414">HONG KONG 2024</text>
        ${glitched ? `
          <g transform="translate(1030, 425) rotate(-5)">
            <rect x="-185" y="-44" width="370" height="88" rx="10" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="6"/>
            <text x="0" y="18" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="52" fill="#FFFFFF">ALL AI: -$25M</text>
          </g>
        ` : ""}
        <!-- Foreground OTS Hong Kong Clerk -->
        ${renderStickChar({ charId: "arup_staff", x: 310, y: 1030, scale: 2.15, view: "back", expression: "neutral", pose: "idle", uid: uid("ots") })}
        ${renderVignette(f, 0.34)}
      `;
    }

    case "B37": {
      // Ferrari CEO Lookalike (Benedetto Vigna) + Voice Cloner
      const panX = -160 * p;
      const waveX = (f * 9) % 180;
      return `
        ${renderFerrariOfficeBg(f, panX)}
        <g transform="translate(${panX.toFixed(1)}, 0)">
          ${renderStickChar({ charId: "benedetto_vigna", x: 640, y: 900, scale: 2.12, view: "three_quarter", expression: "happy", pose: "talking", ...charAnim(f, 7, true, loudnessArr), uid: uid("bv") })}
          <!-- Nameplate -->
          <rect x="465" y="920" width="350" height="58" rx="8" fill="#141414"/>
          <text x="640" y="958" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">BENEDETTO VIGNA (CEO)</text>
          <!-- Italian Voice Waves into Scammer Cloner on Right -->
          <line x1="780" y1="500" x2="1280" y2="500" stroke="${PALETTE.cyan}" stroke-width="8" stroke-dasharray="16,16" stroke-dashoffset="${-waveX}"/>
          <rect x="1300" y="370" width="360" height="270" rx="16" fill="#0F172A" stroke="${PALETTE.cyan}" stroke-width="6"/>
          <text x="1480" y="435" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="${PALETTE.cyan}">VOICE CLONE</text>
          ${renderStickChar({ charId: "jacob_soall", x: 1480, y: 900, scale: 1.9, view: "three_quarter", mirror: true, expression: "manic", pose: "holding_phone", uid: uid("js") })}
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B38": {
      // Ferrari Manager Holding Book
      const z = 1.0 + 0.12 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFerrariOfficeBg(f, 0)}
          ${renderStickChar({ charId: "ferrari_exec", x: 960, y: 900, scale: 2.15, view: "three_quarter", expression: "deadpan", pose: "holding_book", ...charAnim(f, 3, false, loudnessArr), uid: uid("fe") })}
        </g>
        ${renderVignette(f, 0.16)}
      `;
    }

    case "B39": {
      // Skit 3 Split Call: Left Jacob w/ Benedetto Holo-Clone | Right Ferrari Exec
      return `
        <g>
          <rect x="0" y="0" width="960" height="1080" fill="#0F172A"/>
          <rect x="0" y="780" width="960" height="300" fill="#1E293B" stroke="#141414" stroke-width="5"/>
          ${renderStickChar({ charId: "benedetto_vigna", x: 480, y: 890, scale: 2.05, view: "three_quarter", expression: "neutral", pose: "talking", holoMode: true, ...charAnim(f, 7, true, loudnessArr), uid: uid("bv_h") })}
          <rect x="64" y="64" width="320" height="54" rx="8" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="4"/>
          <text x="224" y="100" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF">CLONED VOICE CALL</text>
        </g>
        <g>
          <rect x="960" y="0" width="960" height="1080" fill="#F2ECE1"/>
          <rect x="960" y="780" width="960" height="300" fill="#8C6543" stroke="#141414" stroke-width="5"/>
          ${renderStickChar({ charId: "ferrari_exec", x: 1440, y: 890, scale: 2.05, view: "three_quarter", mirror: true, expression: "deadpan", pose: "holding_phone", uid: uid("fe") })}
        </g>
        <line x1="960" y1="0" x2="960" y2="1080" stroke="#141414" stroke-width="10"/>
        ${renderVignette(f, 0.22)}
      `;
    }

    case "B40": {
      // Skit 3 T5 Rack-Focus Punchline: Ferrari Exec holds up BOOK ? while Scammer panics (404)
      const z = 1.0 + 0.14 * p;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          <rect width="1920" height="1080" fill="#F2ECE1"/>
          <!-- Blurred Scammer Window Inset in Back -->
          <defs><filter id="rfS3_${uid("f")}"><feGaussianBlur stdDeviation="${(p * 5.0).toFixed(2)}"/></filter></defs>
          <g filter="url(#rfS3_${uid("f")})">
            <rect x="180" y="140" width="560" height="440" rx="18" fill="#0F172A" stroke="#141414" stroke-width="6"/>
            <clipPath id="scS3_${uid("c")}"><rect x="180" y="140" width="560" height="440"/></clipPath>
            <g clip-path="url(#scS3_${uid("c")})">
              ${renderStickChar({ charId: "jacob_soall", x: 460, y: 690, scale: 1.85, view: "front", expression: "manic", pose: "idle", uid: uid("js") })}
            </g>
            <rect x="330" y="175" width="260" height="58" rx="8" fill="${PALETTE.crimson}" stroke="#141414" stroke-width="4"/>
            <text x="460" y="214" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="26" fill="#FFFFFF">404 NOT FOUND</text>
          </g>
          <rect x="0" y="780" width="1920" height="300" fill="#8C6543" stroke="#141414" stroke-width="5"/>
          ${renderStickChar({ charId: "ferrari_exec", x: 1260, y: 900, scale: 2.25, view: "three_quarter", mirror: true, expression: "happy", pose: "holding_book", ...charAnim(f, 3, true, loudnessArr), uid: uid("fe") })}
          <!-- Crisp Book Question Prop -->
          <g transform="translate(1030, 420) rotate(-6)">
            <rect x="-110" y="-42" width="220" height="84" rx="10" fill="${PALETTE.gold}" stroke="#141414" stroke-width="5"/>
            <text x="0" y="14" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="44" fill="#141414">BOOK?</text>
          </g>
        </g>
        ${renderVignette(f, 0.18)}
      `;
    }

    case "B42": {
      // T6 CCTV Stepped Marquee Zoom (first 3.5s) -> Street Arrest in Spain & UK
      const isCctv = p < 0.42;
      if (isCctv) {
        const stepZ = p < 0.21 ? 1.0 : 1.75;
        return `
          <g transform="translate(${(960 * (1 - stepZ)).toFixed(1)}, ${(540 * (1 - stepZ)).toFixed(1)}) scale(${stepZ.toFixed(3)})">
            <rect width="1920" height="1080" fill="#2A323D"/>
            <rect x="0" y="760" width="1920" height="320" fill="#1C222B" stroke="#141414" stroke-width="5"/>
            ${renderStickChar({ charId: "jacob_soall", x: 760, y: 880, scale: 1.7, view: "three_quarter", expression: "worried", pose: "walk", walkPhase: tSec * 6, uid: uid("js") })}
            ${renderStickChar({ charId: "sharon_hazan", x: 1120, y: 880, scale: 1.7, view: "three_quarter", expression: "worried", pose: "walk", walkPhase: tSec * 6 + 1, uid: uid("sh") })}
          </g>
          <!-- Animated Green Dashed CCTV Marquee Box -->
          <rect x="520" y="210" width="880" height="580" fill="none" stroke="#22C55E" stroke-width="6" stroke-dasharray="22,12" stroke-dashoffset="${-(f * 6)}"/>
          <text x="110" y="100" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#22C55E">REC ● NOV 2026 — SPAIN / UK</text>
          ${renderVignette(f, 0.45)}
        `;
      }
      // Clear Police Arrest Scene
      const sirenRed = (f % 16) < 8 ? 0.28 : 0.05;
      const sirenBlue = (f % 16) >= 8 ? 0.28 : 0.05;
      return `
        <rect width="1920" height="1080" fill="#182338"/>
        <rect x="0" y="770" width="1920" height="310" fill="#2A313D" stroke="#141414" stroke-width="5"/>
        <circle cx="320" cy="240" r="320" fill="#EF4444" opacity="${sirenRed}"/>
        <circle cx="1600" cy="240" r="320" fill="#3B82F6" opacity="${sirenBlue}"/>
        ${renderStickChar({ charId: "euro_police", x: 480, y: 890, scale: 2.0, view: "back", expression: "neutral", pose: "pointing", uid: uid("p1") })}
        ${renderStickChar({ charId: "jacob_soall", x: 780, y: 890, scale: 1.95, view: "three_quarter", expression: "worried", pose: "idle", uid: uid("js") })}
        ${renderStickChar({ charId: "sharon_hazan", x: 1030, y: 890, scale: 1.95, view: "three_quarter", expression: "manic", pose: "idle", uid: uid("sh") })}
        ${renderStickChar({ charId: "guy_sheetrit", x: 1280, y: 890, scale: 1.95, view: "three_quarter", mirror: true, expression: "worried", pose: "idle", uid: uid("gs") })}
        ${renderStickChar({ charId: "euro_police", x: 1550, y: 890, scale: 2.0, view: "back", expression: "neutral", pose: "pointing", uid: uid("p2") })}
        ${renderVignette(f, 0.34)}
      `;
    }

    case "B43": {
      // Holding Cell — Iron Bars Slam Down
      const drop = easeOutCubic(clamp(lf / 8));
      const barY = -980 + 980 * drop;
      return `
        <rect width="1920" height="1080" fill="#262B34"/>
        <rect x="0" y="770" width="1920" height="310" fill="#181C23" stroke="#141414" stroke-width="5"/>
        ${renderStickChar({ charId: "jacob_soall", x: 640, y: 890, scale: 1.95, view: "front", expression: "deadpan", pose: "idle", uid: uid("js") })}
        ${renderStickChar({ charId: "sharon_hazan", x: 960, y: 890, scale: 1.95, view: "front", expression: "deadpan", pose: "idle", uid: uid("sh") })}
        ${renderStickChar({ charId: "guy_sheetrit", x: 1280, y: 890, scale: 1.95, view: "front", expression: "deadpan", pose: "idle", uid: uid("gs") })}
        <g transform="translate(0, ${barY.toFixed(1)})">
          ${Array.from({ length: 12 }, (_, i) => `<rect x="${120 + i * 155}" y="0" width="20" height="1080" fill="#0F131A" stroke="#141414" stroke-width="4"/>`).join("")}
          <rect x="0" y="210" width="1920" height="24" fill="#0F131A"/>
          <rect x="0" y="720" width="1920" height="24" fill="#0F131A"/>
        </g>
        ${renderVignette(f, 0.40)}
      `;
    }

    case "B45": {
      // Closing Return to Opening Finance Office at Dusk: Unattended Ringing Phone + Book + Glowing AI Mask Outside
      const z = 1.12 - 0.12 * easeOutCubic(p);
      const ringShake = Math.sin(tSec * 28) * 5;
      return `
        <g transform="translate(${(960 * (1 - z)).toFixed(1)}, ${(540 * (1 - z)).toFixed(1)}) scale(${z.toFixed(3)})">
          ${renderFinanceOfficeBg(f, 0, true, false)}
          <!-- Glowing AI Mask Hovering Outside Dusk Window -->
          ${renderHeroMaskObject({ x: 640, y: 315 + Math.sin(tSec * 2) * 8, scale: 1.25, pulse: tSec * 4, uid: uid("hm") })}
          <!-- Empty Office Desk with Forgotten Book & Ringing Phone -->
          <rect x="360" y="750" width="1200" height="330" fill="#634328" stroke="#141414" stroke-width="6"/>
          <g transform="translate(${(860 + ringShake).toFixed(1)}, 680)">
            <rect x="-130" y="-75" width="260" height="145" rx="12" fill="#141C2B" stroke="#141414" stroke-width="5"/>
            <text x="0" y="-12" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="22" fill="${PALETTE.cyan}">INCOMING CALL</text>
            <text x="0" y="28" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="26" fill="#FFFFFF">CEO</text>
          </g>
          <!-- Forgotten Hardcover Book on Desk Corner -->
          <g transform="translate(1280, 725) rotate(-8)">
            <rect x="-80" y="-50" width="160" height="100" rx="6" fill="#9E2A2B" stroke="#141414" stroke-width="5"/>
            <rect x="-60" y="-32" width="120" height="24" rx="2" fill="#F6F3EC"/>
          </g>
        </g>
        ${renderVignette(f, 0.28)}
      `;
    }

    default:
      return `<rect width="1920" height="1080" fill="#000000"/>`;
  }
}

export function renderFrameSvg(frame, loudnessArr = [], opts = {}) {
  const beat = getBeatAtFrame(frame);
  const idx = BEATS.indexOf(beat);
  const nextBeat = BEATS[idx + 1] || null;
  const prevBeat = BEATS[idx - 1] || null;

  let sceneContent = "";

  // T3 Directional Motion-Blurred Whip-Pan strictly on the 8 transition frames!
  const isWhipOut = beat.transitionOut.startsWith("T3") && nextBeat && (beat.endFrame - frame) <= 4;
  const isWhipIn = prevBeat && prevBeat.transitionOut.startsWith("T3") && (frame - beat.startFrame) < 4;

  if (isWhipOut && nextBeat) {
    const k = 1 - (beat.endFrame - frame) / 4; // 0.25 .. 1.0 (at endFrame-1) -> 0..0.5 of whip
    const prog = k * 0.5;
    const outX = Math.round(-1920 * prog);
    const inX = Math.round(1920 * (1 - prog));
    sceneContent = `
      <defs><filter id="whip_f${frame}"><feGaussianBlur stdDeviation="42,0"/></filter></defs>
      <g filter="url(#whip_f${frame})">
        <g transform="translate(${outX}, 0)">${renderSingleBeatContent(frame, beat, loudnessArr)}</g>
        <g transform="translate(${inX}, 0)">${renderSingleBeatContent(frame, nextBeat, loudnessArr)}</g>
      </g>
    `;
  } else if (isWhipIn && prevBeat) {
    const k = (frame - beat.startFrame + 1) / 4; // 0.25 .. 1.0
    const prog = 0.5 + k * 0.5;
    const blur = Math.round(42 * (1 - k * 0.85));
    const inX = Math.round(1920 * (1 - prog));
    sceneContent = `
      <defs><filter id="whip_f${frame}"><feGaussianBlur stdDeviation="${blur},0"/></filter></defs>
      <g filter="url(#whip_f${frame})" transform="translate(${inX}, 0)">
        ${renderSingleBeatContent(frame, beat, loudnessArr)}
      </g>
    `;
  } else {
    sceneContent = renderSingleBeatContent(frame, beat, loudnessArr);
  }

  const safeGuide = opts.showSafeBox
    ? `<rect x="96" y="54" width="1728" height="972" fill="none" stroke="#FACC15" stroke-width="3" stroke-dasharray="16,10" opacity="0.85" pointer-events="none"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${sceneContent}
    ${safeGuide}
  </svg>`;
}
