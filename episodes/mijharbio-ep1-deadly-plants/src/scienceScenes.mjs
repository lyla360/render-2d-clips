import { renderExplorerMascot } from "./explorerMascot.mjs";
import {
  PLANT_URIS,
  WIKI_URIS,
  clamp01,
  lerp,
  easeOutCubic,
  easeInOutCubic,
  easeInExpo,
  springOut,
  impactShake,
  dotGridPattern,
  renderCornerBadge,
  renderBriefTitleBanner,
  renderDangerGauge,
  renderSpectrumLadder,
  renderHeroSpecimenStage,
  renderSurvivalSplit,
  renderSubdermalCutawayBase,
} from "./sceneHelpers.mjs";

export function renderHook({ frame, localF, subBeat, subF, subDur, mouthOpen }) {
  if (subBeat.id === "acid_rain_tease") {
    const enter = easeOutCubic(subF / 12);
    const rainLines = [];
    for (let i = 0; i < 20; i++) {
      const rx = (i * 105 + 40) % 1920;
      const ry = ((subF * (20 + (i % 4) * 5) + i * 110) % 1180) - 100;
      rainLines.push(`<line x1="${rx}" y1="${ry}" x2="${rx - 16}" y2="${ry + 60}" stroke="#4D9DE0" stroke-width="3.5" opacity="0.45" stroke-linecap="round"/>`);
    }
    const dropY = lerp(470, 880, ((subF % 34) / 34) ** 2);
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <ellipse cx="640" cy="480" rx="520" ry="380" fill="#144636" opacity="0.45"/>
      ${rainLines.join("")}
      <!-- Tree Canopy & Forearm -->
      <g opacity="${enter.toFixed(3)}">
        <rect x="572" y="410" width="66" height="225" rx="18" fill="#5A3D2E" stroke="#141414" stroke-width="7"/>
        <circle cx="465" cy="335" r="145" fill="#135A3D"/>
        <circle cx="745" cy="340" r="140" fill="#135A3D"/>
        <circle cx="605" cy="255" r="175" fill="#18734E" stroke="#141414" stroke-width="7"/>
        <circle cx="485" cy="405" r="24" fill="#90D938" stroke="#141414" stroke-width="5"/>
        <circle cx="710" cy="410" r="24" fill="#90D938" stroke="#141414" stroke-width="5"/>
        <path d="M 180 940 C 360 855, 740 855, 1020 910 L 1060 1080 L 140 1080 Z" fill="#EBB58F" stroke="#141414" stroke-width="7"/>
        <ellipse cx="610" cy="882" rx="140" ry="20" fill="#E63946" opacity="0.55"/>
        <path d="M 610 ${dropY - 22} C 624 ${dropY}, 626 ${dropY + 14}, 610 ${dropY + 22} C 594 ${dropY + 14}, 596 ${dropY}, 610 ${dropY - 22} Z"
              fill="#E63946" stroke="#141414" stroke-width="4"/>
      </g>
      ${renderExplorerMascot({ x: 1520, y: 600, scale: 1.48, pose: "shocked", frame, mouthOpen })}
      ${renderCornerBadge("00", "تدرّج الأخطر", "#E63946")}
    `;
  }

  if (subBeat.id === "smoke_fruit_tease") {
    const wipe = easeOutCubic(subF / 12);
    const pulse = 1 + 0.08 * Math.sin(subF * 0.35);
    return `
      <rect width="1920" height="1080" fill="#0B231B"/>
      <line x1="960" y1="60" x2="960" y2="1020" stroke="#2EE89E" stroke-width="4" stroke-dasharray="18 16" opacity="0.35"/>
      <!-- Right: Toxic Smoke & Irritated Eye -->
      <g transform="translate(1440, 520)" opacity="${wipe.toFixed(3)}">
        <circle cx="0" cy="-120" r="145" fill="#4E6B5D" opacity="0.35"/>
        <path d="M -180 40 Q 0 -70 180 40 Q 0 150 -180 40 Z" fill="#FFFFFF" stroke="#141414" stroke-width="8"/>
        <circle cx="0" cy="40" r="56" fill="#E63946" stroke="#141414" stroke-width="6"/>
        <circle cx="0" cy="40" r="24" fill="#141414"/>
        <rect x="-150" y="210" width="300" height="68" rx="34" fill="#E63946" stroke="#141414" stroke-width="5"/>
        <text x="0" y="255" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" direction="rtl" xml:lang="ar">دخان مُعمي</text>
      </g>
      <!-- Left: Death Apple & Burning Throat -->
      <g transform="translate(480, 520)" opacity="${wipe.toFixed(3)}">
        <circle cx="0" cy="-20" r="${(175 * pulse).toFixed(1)}" fill="#E63946" opacity="0.22"/>
        <image href="${PLANT_URIS.manchineel}" x="-210" y="-230" width="420" height="420" preserveAspectRatio="xMidYMid meet" style="clip-path: circle(195px at 210px 210px);"/>
        <rect x="-150" y="210" width="300" height="68" rx="34" fill="#FFD43B" stroke="#141414" stroke-width="5"/>
        <text x="0" y="255" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#141414" direction="rtl" xml:lang="ar">ثمرة حارقة</text>
      </g>
      ${renderCornerBadge("00", "تدرّج الأخطر", "#E63946")}
    `;
  }

  // scale_intro: 7-Tier Rainbow Spectrum + Whip-Zoom onto Card 01 (right side x=1638, y=515)
  const zoomT = easeInExpo((subF - Math.max(0, subDur - 34)) / 34);
  const camScale = lerp(1, 3.8, zoomT);
  const focusX = lerp(960, 1638, zoomT);
  const focusY = lerp(540, 515, zoomT);
  return `
    <defs>${dotGridPattern("hookDots")}</defs>
    <rect width="1920" height="1080" fill="#FAF7F0"/>
    <rect width="1920" height="1080" fill="url(#hookDots)"/>
    <g transform="translate(960, 540) scale(${camScale.toFixed(4)}) translate(${-focusX.toFixed(2)}, ${-focusY.toFixed(2)})">
      <rect x="610" y="54" width="700" height="78" rx="39" fill="#071A14" stroke="#141414" stroke-width="5"/>
      <text x="960" y="106" text-anchor="middle" font-family="Lalezar, sans-serif" font-size="48" fill="#FFD43B" direction="rtl" xml:lang="ar">تدرّج أخطر 7 نباتات على الأرض</text>
      ${renderSpectrumLadder(frame, -1, { y: 515, hideLast: true, localF: subF })}
      ${renderExplorerMascot({ x: 960, y: 905, scale: 0.92, pose: "explain", frame, mouthOpen })}
    </g>
  `;
}

export function renderLevel1({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "title_and_intro") {
    return renderHeroSpecimenStage({
      frame, localF, plantKey: "nettle", num: "01", shortLabel: "القُرّاص",
      title: "القُرّاص اللاذع", subtitle: "إبر السيليكا الزجاجية", dangerVal: 2,
      accentColor: "#2EE89E", mascotPose: "explain", mouthOpen,
    });
  }
  if (subBeat.id === "microscope_needles") {
    const pierceT = easeInOutCubic((subF - 20) / 36);
    const snap = subF > 46;
    const dropY = lerp(470, 620, clamp01((subF - 48) / 28));
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <rect x="520" y="110" width="1310" height="860" rx="38" fill="#0C241D" stroke="#2EE89E" stroke-width="5"/>
      <!-- Skin Surface -->
      <rect x="525" y="590" width="1300" height="375" rx="20" fill="#F2BEA0"/>
      <rect x="525" y="590" width="1300" height="32" fill="#D99873"/>
      <!-- Giant Glass Silica Trichome Needle -->
      <g transform="translate(${lerp(980, 1130, pierceT).toFixed(1)}, ${lerp(240, 585, pierceT).toFixed(1)}) rotate(32)">
        <polygon points="-24,-180 24,-180 6,40 -6,40" fill="#E8FFF5" fill-opacity="0.88" stroke="#141414" stroke-width="6"/>
        <line x1="-10" y1="-150" x2="-3" y2="20" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
        ${snap ? `<polygon points="-14,42 14,42 2,95" fill="#FF6B78" stroke="#141414" stroke-width="4" transform="translate(18, 12) rotate(22)"/>` : ""}
      </g>
      ${subF > 48 ? `<circle cx="1165" cy="${dropY.toFixed(1)}" r="16" fill="#E63946" stroke="#141414" stroke-width="3.5"/>
                     <ellipse cx="1165" cy="635" rx="${(40 + (subF - 48) * 1.4).toFixed(1)}" ry="34" fill="#E63946" opacity="0.4"/>` : ""}
      <rect x="1030" y="148" width="280" height="52" rx="26" fill="#071A14" stroke="#2EE89E" stroke-width="3"/>
      <text x="1170" y="182" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="25" fill="#2EE89E" direction="rtl" xml:lang="ar">إبر السيليكا</text>
      ${renderDangerGauge(265, 365, 0.92, 2, easeOutCubic(subF / 24), frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "inspect", frame, mouthOpen })}
      ${renderCornerBadge("01", "القُرّاص", "#2EE89E")}
    `;
  }
  if (subBeat.id === "capillary_rash") {
    const dilate = easeOutCubic(subF / 40);
    const vesselW = lerp(24, 58, dilate);
    const rbc = Array.from({ length: 12 }, (_, i) => {
      const rx = 560 + ((i * 104 + subF * 6) % 1240);
      return `<ellipse cx="${rx}" cy="690" rx="15" ry="9" fill="#FF4D5A" stroke="#7A0912" stroke-width="2"/>`;
    }).join("");
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <rect x="520" y="110" width="1310" height="860" rx="38" fill="#D97E73" stroke="#FAF7F0" stroke-width="5"/>
      <rect x="520" y="110" width="1310" height="270" rx="28" fill="#0E1D19"/>
      <rect x="520" y="370" width="1310" height="160" fill="#F2BEA0"/>
      <!-- Swelling Itchy Hive Bumps -->
      <path d="M 880 370 Q 1040 ${(370 - 65 * dilate).toFixed(1)} 1190 370 Q 1340 ${(370 - 52 * dilate).toFixed(1)} 1480 370 Z"
            fill="#FF7B88" stroke="#141414" stroke-width="5"/>
      <!-- Dilating Blood Vessel -->
      <path d="M 520 690 Q 950 660 1180 690 T 1830 690" fill="none" stroke="#6E0A14" stroke-width="${(vesselW + 14).toFixed(1)}"/>
      <path d="M 520 690 Q 950 660 1180 690 T 1830 690" fill="none" stroke="#C1121F" stroke-width="${vesselW.toFixed(1)}"/>
      ${rbc}
      ${renderDangerGauge(265, 365, 0.92, 2, 1, frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "explain", frame, mouthOpen })}
      ${renderCornerBadge("01", "القُرّاص", "#2EE89E")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "01", shortLabel: "القُرّاص", accentColor: "#2EE89E",
    badLabel: "لا تحكّها أبداً", goodLabel: "شريط لاصق + ماء بارد", mouthOpen,
    badIconSvg: `<circle cx="0" cy="-10" r="135" fill="#FFE0E3" stroke="#141414" stroke-width="6"/>
                 <path d="M -55 45 C -30 -35, 30 -35, 55 45" fill="none" stroke="#E63946" stroke-width="14" stroke-linecap="round"/>
                 <line x1="-22" y1="-22" x2="-5" y2="35" stroke="#141414" stroke-width="7" stroke-linecap="round"/>
                 <line x1="22" y1="-22" x2="5" y2="35" stroke="#141414" stroke-width="7" stroke-linecap="round"/>`,
    goodIconSvg: `<rect x="-125" y="-58" width="250" height="72" rx="16" transform="rotate(-12)" fill="#FFD43B" stroke="#141414" stroke-width="6"/>
                  <path d="M 0 60 C 26 92, 34 114, 34 128 C 34 148, 18 162, 0 162 C -18 162, -34 148, -34 128 C -34 114, -26 92, 0 60 Z" fill="#4D9DE0" stroke="#141414" stroke-width="5"/>`,
  });
}

export function renderLevel2({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "title_and_three_leaves") {
    return renderHeroSpecimenStage({
      frame, localF, plantKey: "poison_ivy", num: "02", shortLabel: "اللَّبْلاب السام",
      title: "اللَّبْلاب السام", subtitle: "زيت اليوروشيول الخفي", dangerVal: 4,
      accentColor: "#7ED957", mascotPose: "inspect", mouthOpen,
    });
  }
  if (subBeat.id === "urushiol_oil") {
    const pulse = 0.65 + 0.35 * Math.sin(subF * 0.16);
    const items = [
      { x: 1460, label: "النبتة" },
      { x: 1120, label: "الحذاء" },
      { x: 780, label: "الملابس" },
      { x: 440, label: "الحيوان" },
    ];
    return `
      <defs>${dotGridPattern("l2Dots")}</defs>
      <rect width="1920" height="1080" fill="#FAF7F0"/>
      <rect width="1920" height="1080" fill="url(#l2Dots)"/>
      <rect x="640" y="88" width="640" height="72" rx="36" fill="#071A14"/>
      <text x="960" y="135" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFD43B" direction="rtl" xml:lang="ar">زيت اليوروشيول لا يتبخر</text>
      ${items.map((it, idx) => {
        const sc = springOut((subF - idx * 8) / 14);
        return `
          <g transform="translate(${it.x}, 430) scale(${sc.toFixed(3)})">
            <circle cx="0" cy="0" r="120" fill="#FFF8E1" stroke="#F59E0B" stroke-width="6" opacity="${pulse.toFixed(2)}"/>
            ${idx === 0 ? `<image href="${PLANT_URIS.poison_ivy}" x="-82" y="-82" width="164" height="164" style="mix-blend-mode:multiply;"/>`
              : idx === 1 ? `<path d="M -55 30 L -55 -40 L -15 -40 L -10 5 L 55 10 L 60 40 L -55 40 Z" fill="#5C4033" stroke="#141414" stroke-width="5.5" stroke-linejoin="round"/>`
              : idx === 2 ? `<path d="M -52 -42 L -20 -55 L 20 -55 L 52 -42 L 66 -8 L 42 4 L 36 -18 L 36 52 L -36 52 L -36 -18 L -42 4 L -66 -8 Z" fill="#2B6CB0" stroke="#141414" stroke-width="5.5" stroke-linejoin="round"/>`
              : `<circle cx="-18" cy="-22" r="24" fill="#8B5A2B" stroke="#141414" stroke-width="5"/><ellipse cx="14" cy="14" rx="44" ry="26" fill="#8B5A2B" stroke="#141414" stroke-width="5"/>`}
            <rect x="-86" y="140" width="172" height="48" rx="24" fill="#FFD43B" stroke="#141414" stroke-width="4"/>
            <text x="0" y="172" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="#141414" direction="rtl" xml:lang="ar">${it.label}</text>
          </g>
        `;
      }).join("")}
      <!-- Persistence Clock Badge -->
      <g transform="translate(760, 775)">
        <rect x="-250" y="-44" width="500" height="88" rx="44" fill="#071A14" stroke="#FFD43B" stroke-width="5"/>
        <text x="0" y="14" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFD43B" direction="rtl" xml:lang="ar">يبقى نشطاً: أشهر إلى سنوات</text>
      </g>
      ${renderExplorerMascot({ x: 1580, y: 810, scale: 1.05, pose: "inspect", frame, mouthOpen })}
      ${renderCornerBadge("02", "اللَّبْلاب السام", "#7ED957")}
    `;
  }
  if (subBeat.id === "immune_attack") {
    const attackT = easeOutCubic(subF / 44);
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      ${renderSubdermalCutawayBase(frame, { skinY: 380, accentColor: "#7ED957" })}
      <!-- Amber Urushiol Coating -->
      <ellipse cx="1175" cy="445" rx="230" ry="56" fill="#F59E0B" opacity="0.5"/>
      <!-- Immune T-Cells Firing Red Target Blasts -->
      ${[860, 1175, 1490].map((cx, i) => {
        const cy = lerp(760, 495, attackT);
        return `<circle cx="${cx}" cy="${cy.toFixed(1)}" r="32" fill="#E0FBFC" stroke="#141414" stroke-width="5"/>
                <circle cx="${cx}" cy="465" r="${(28 + Math.sin(subF * 0.3 + i) * 10).toFixed(1)}" fill="none" stroke="#E63946" stroke-width="5"/>`;
      }).join("")}
      <rect x="975" y="150" width="400" height="62" rx="31" fill="#E63946"/>
      <text x="1175" y="191" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" direction="rtl" xml:lang="ar">هجوم جهازك المناعي</text>
      ${renderDangerGauge(265, 365, 0.92, 4, 1, frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "shocked", frame, mouthOpen })}
      ${renderCornerBadge("02", "اللَّبْلاب السام", "#7ED957")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "02", shortLabel: "اللَّبْلاب السام", accentColor: "#7ED957",
    badLabel: "لا ماء ساخن ولا حرق", goodLabel: "ماء بارد خلال 10 دقائق", mouthOpen,
    badIconSvg: `<path d="M 0 -100 C 55 -25, 78 30, 78 65 C 78 108, 42 135, 0 135 C -42 135, -78 108, -78 65 C -78 30, -55 -25, 0 -100 Z" fill="#FF5C35" stroke="#141414" stroke-width="6"/>
                 <path d="M 0 -20 C 26 20, 38 50, 38 72 C 38 98, 20 112, 0 112 C -20 112, -38 98, -38 72 C -38 50, -26 20, 0 -20 Z" fill="#FFD43B"/>`,
    goodIconSvg: `<circle cx="0" cy="0" r="110" fill="#FFFFFF" stroke="#141414" stroke-width="6"/>
                  <text x="0" y="20" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="56" fill="#0D7A4E" direction="ltr" unicode-bidi="isolate">10m</text>`,
  });
}

export function renderLevel3({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "title_and_size") {
    const rulerOverlay = `
      <g transform="translate(1155, 220)">
        <rect x="0" y="0" width="84" height="580" rx="18" fill="#071A14" stroke="#FFD43B" stroke-width="4.5"/>
        <text x="42" y="305" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#FFD43B" direction="ltr" unicode-bidi="isolate">3–5m</text>
      </g>`;
    return renderHeroSpecimenStage({
      frame, localF, plantKey: "giant_hogweed", num: "03", shortLabel: "عشبة الخنزير",
      title: "عشبة الخنزير العملاقة", subtitle: "حروق ضوء الشمس", dangerVal: 6,
      accentColor: "#FFD43B", mascotPose: "shiver", mouthOpen, extraOverlay: rulerOverlay,
    });
  }
  if (subBeat.id === "furanocoumarins_uv_burn") {
    const blisterH = lerp(0, 88, clamp01((subF - 24) / 50));
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      ${renderSubdermalCutawayBase(frame, { skinY: 455, accentColor: "#FFD43B" })}
      <!-- Pulsing Sun Rays Pouring onto Stripped UV Shield -->
      <circle cx="1175" cy="185" r="76" fill="#FFD43B" stroke="#FF9F1C" stroke-width="8"/>
      <polygon points="1095,255 1255,255 1380,455 970,455" fill="#FF9F1C" opacity="${(0.32 + 0.14 * Math.sin(subF * 0.25)).toFixed(2)}"/>
      <!-- Stripped Cyan UV Shield Broken -->
      <path d="M 650 385 Q 920 335 1030 355" fill="none" stroke="#3BF5D8" stroke-width="10" stroke-linecap="round"/>
      <path d="M 1320 355 Q 1440 335 1700 385" fill="none" stroke="#3BF5D8" stroke-width="10" stroke-linecap="round"/>
      <path d="M 990 455 Q 1175 ${(455 - blisterH * 1.65).toFixed(1)} 1360 455 Z" fill="#FF5C35" stroke="#141414" stroke-width="6"/>
      <rect x="1030" y="505" width="290" height="58" rx="29" fill="#E63946" stroke="#141414" stroke-width="4"/>
      <text x="1175" y="544" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="27" fill="#FFFFFF" direction="rtl" xml:lang="ar">حروق الدرجة الثالثة</text>
      ${renderDangerGauge(265, 365, 0.92, 6, easeOutCubic(subF / 24), frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "shiver", frame, mouthOpen })}
      ${renderCornerBadge("03", "عشبة الخنزير", "#FFD43B")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "03", shortLabel: "عشبة الخنزير", accentColor: "#FFD43B",
    badLabel: "لا تتعرّض للشمس", goodLabel: "غسل وتغطية 48 ساعة", mouthOpen,
    badIconSvg: `<circle cx="0" cy="0" r="88" fill="#FFD43B" stroke="#141414" stroke-width="6"/>
                 ${Array.from({ length: 8 }, (_, i) => {
                   const a = (i / 8) * Math.PI * 2;
                   return `<line x1="${(Math.cos(a) * 105).toFixed(0)}" y1="${(Math.sin(a) * 105).toFixed(0)}" x2="${(Math.cos(a) * 138).toFixed(0)}" y2="${(Math.sin(a) * 138).toFixed(0)}" stroke="#E63946" stroke-width="10" stroke-linecap="round"/>`;
                 }).join("")}`,
    goodIconSvg: `<path d="M 0 -125 L 115 -78 L 115 10 C 115 76, 60 128, 0 152 C -60 128, -115 76, -115 10 L -115 -78 Z" fill="#0F3D2E" stroke="#141414" stroke-width="7"/>
                  <text x="0" y="32" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="56" fill="#2EE89E" direction="ltr" unicode-bidi="isolate">48h</text>`,
  });
}

export function renderLevel4({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "arab_streets_shock") {
    const enter = easeOutCubic(subF / 12);
    return `
      <rect width="1920" height="1080" fill="#FFF7E2"/>
      <!-- Stylized City Skyline & Date Palms -->
      <g opacity="0.22" fill="#2A5443">
        <rect x="90" y="340" width="140" height="300" rx="8"/><rect x="255" y="290" width="180" height="350" rx="8"/>
        <rect x="880" y="320" width="160" height="320" rx="8"/><rect x="1065" y="260" width="210" height="380" rx="8"/>
      </g>
      <!-- Streetlamps & Palm Silhouettes -->
      <path d="M 1080 640 L 1080 280 L 1140 280" fill="none" stroke="#141414" stroke-width="10" stroke-linecap="round"/>
      <circle cx="1140" cy="295" r="18" fill="#FFD43B" stroke="#141414" stroke-width="5"/>
      <!-- City Boulevard Sidewalk & Road -->
      <rect x="0" y="610" width="1920" height="45" fill="#CBD5E1" stroke="#141414" stroke-width="4"/>
      <rect x="0" y="655" width="1920" height="425" fill="#4B5557"/>
      <rect x="0" y="845" width="1920" height="22" fill="#FFD43B" stroke="#141414" stroke-width="3"/>
      <!-- Oleander Shrub Median -->
      <ellipse cx="640" cy="610" rx="280" ry="110" fill="#1E7B48" stroke="#141414" stroke-width="6"/>
      <image href="${PLANT_URIS.oleander}" x="405" y="235" width="470" height="470" style="mix-blend-mode:multiply;" opacity="${enter.toFixed(3)}"/>
      <!-- Wikimedia Polaroid -->
      <g transform="translate(215, 700) rotate(-4)">
        <rect x="-140" y="-120" width="280" height="235" rx="18" fill="#FFFFFF" stroke="#141414" stroke-width="5"/>
        <image href="${WIKI_URIS.oleander}" x="-124" y="-104" width="248" height="175" preserveAspectRatio="xMidYMid slice"/>
        <text x="0" y="98" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="20" fill="#0F3D2E" direction="rtl" xml:lang="ar">في شوارعنا وحدائقنا</text>
      </g>
      ${renderExplorerMascot({ x: 1525, y: 585, scale: 1.48, pose: "shocked", frame, mouthOpen })}
      ${renderCornerBadge("04", "الدِّفلى", "#FF9F1C")}
      ${renderBriefTitleBanner("04", "شجرة الدِّفلى", "سُمّ القلب في شوارعنا", localF, "#FF9F1C")}
    `;
  }
  if (subBeat.id === "heart_pump_oleandrin") {
    const beat = 1 + 0.12 * Math.abs(Math.sin(subF * 0.45));
    const ecgPts = [];
    for (let i = 0; i <= 50; i++) {
      const px = 620 + i * 22;
      const chaos = Math.sin((i + subF * 0.9) * 1.4) * 58 + Math.cos((i + subF) * 2.7) * 28;
      ecgPts.push(`${px},${(760 + chaos).toFixed(1)}`);
    }
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <rect x="520" y="110" width="1310" height="860" rx="38" fill="#0B1F19" stroke="#FF9F1C" stroke-width="5"/>
      <!-- Pulsing Heart -->
      <g transform="translate(1175, 360) scale(${beat.toFixed(3)})">
        <path d="M 0 120 C -140 20, -165 -95, -75 -125 C -20 -142, 0 -90, 0 -75 C 0 -90, 20 -142, 75 -125 C 165 -95, 140 20, 0 120 Z"
              fill="#E63946" stroke="#141414" stroke-width="8" stroke-linejoin="round"/>
        <text x="0" y="6" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" direction="rtl" xml:lang="ar">اضطراب النبض</text>
      </g>
      <!-- Arrhythmia ECG Monitor -->
      <rect x="600" y="610" width="1150" height="290" rx="22" fill="#05100C" stroke="#2EE89E" stroke-width="4"/>
      <polyline points="${ecgPts.join(" ")}" fill="none" stroke="#E63946" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${renderDangerGauge(265, 365, 0.92, 7, 1, frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "shocked", frame, mouthOpen })}
      ${renderCornerBadge("04", "الدِّفلى", "#FF9F1C")}
    `;
  }
  if (subBeat.id === "napoleon_1809_skewers") {
    const flicker = 1 + 0.08 * Math.sin(subF * 0.55);
    const vaporY = ((subF * 4) % 90);
    return `
      <rect width="1920" height="1080" fill="#211712"/>
      <ellipse cx="860" cy="650" rx="680" ry="370" fill="#F59E0B" opacity="0.16"/>
      <!-- 1809 Historical Badge -->
      <rect x="780" y="66" width="360" height="72" rx="36" fill="#FFD43B" stroke="#141414" stroke-width="5"/>
      <text x="960" y="114" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="36" fill="#141414" direction="rtl" xml:lang="ar">إسبانيا — 1809</text>
      <!-- Two Stylized French Soldier Silhouettes Roasting Over Campfire -->
      <g transform="translate(420, 620)">
        <circle cx="0" cy="-70" r="46" fill="#1C273A" stroke="#141414" stroke-width="5"/>
        <path d="M -78 -88 Q 0 -145 78 -88 L 42 -66 L -42 -66 Z" fill="#121826" stroke="#141414" stroke-width="5"/>
        <path d="M -58 95 C -58 -15, 58 -15, 58 95 Z" fill="#1E3A5F" stroke="#141414" stroke-width="6"/>
      </g>
      <g transform="translate(1240, 620)">
        <circle cx="0" cy="-70" r="46" fill="#1C273A" stroke="#141414" stroke-width="5"/>
        <path d="M -78 -88 Q 0 -145 78 -88 L 42 -66 L -42 -66 Z" fill="#121826" stroke="#141414" stroke-width="5"/>
        <path d="M -58 95 C -58 -15, 58 -15, 58 95 Z" fill="#1E3A5F" stroke="#141414" stroke-width="6"/>
      </g>
      <!-- Campfire Logs, Flames & Green Oleander Skewers Leaching Toxin -->
      <g transform="translate(830, 735)">
        <rect x="-135" y="45" width="270" height="34" rx="14" transform="rotate(-10)" fill="#4E3122" stroke="#141414" stroke-width="5"/>
        <rect x="-135" y="45" width="270" height="34" rx="14" transform="rotate(10)" fill="#3E251A" stroke="#141414" stroke-width="5"/>
        <g transform="scale(${flicker.toFixed(3)})">
          <path d="M 0 -225 C 90 -115, 130 -20, 98 62 C 62 115, -62 115, -98 62 C -130 -20, -90 -115, 0 -225 Z" fill="#FF6B35" stroke="#141414" stroke-width="6"/>
          <path d="M 0 -140 C 50 -65, 65 0, 48 52 C 20 82, -20 82, -48 52 C -65 0, -50 -65, 0 -140 Z" fill="#FFD43B"/>
        </g>
        <line x1="-355" y1="-135" x2="355" y2="-195" stroke="#1E7B48" stroke-width="18" stroke-linecap="round"/>
        <rect x="-95" y="-215" width="190" height="92" rx="26" fill="#8B3A2B" stroke="#141414" stroke-width="6"/>
        <circle cx="-25" cy="-168" r="22" fill="#2EE89E" opacity="0.82"/>
        <circle cx="32" cy="-174" r="18" fill="#2EE89E" opacity="0.72"/>
        <circle cx="0" cy="${(-245 - vaporY).toFixed(1)}" r="16" fill="#2EE89E" opacity="${(1 - vaporY / 90).toFixed(2)}"/>
      </g>
      ${renderExplorerMascot({ x: 1620, y: 690, scale: 1.25, pose: "warn", frame, mouthOpen })}
      ${renderCornerBadge("04", "الدِّفلى", "#FF9F1C")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "04", shortLabel: "الدِّفلى", accentColor: "#FF9F1C",
    badLabel: "لا للشواء أو الحطب", goodLabel: "طوارئ فورية عند البلع", mouthOpen,
    badIconSvg: `<line x1="-130" y1="60" x2="130" y2="-60" stroke="#1E7B48" stroke-width="18" stroke-linecap="round"/>
                 <path d="M 0 -110 C 45 -50, 65 0, 45 40 C 15 65, -15 65, -45 40 C -65 0, -45 -50, 0 -110 Z" fill="#FF6B35" stroke="#141414" stroke-width="5"/>`,
    goodIconSvg: `<rect x="-110" y="-110" width="220" height="220" rx="34" fill="#FFFFFF" stroke="#141414" stroke-width="6.5"/>
                  <rect x="-24" y="-75" width="48" height="150" rx="10" fill="#E63946"/>
                  <rect x="-75" y="-24" width="150" height="48" rx="10" fill="#E63946"/>`,
  });
}

export function renderLevel5({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "oil_safe_vs_seeds") {
    return `
      <defs>${dotGridPattern("l5Dots")}</defs>
      <rect width="1920" height="1080" fill="#FAF7F0"/>
      <rect width="1920" height="1080" fill="url(#l5Dots)"/>
      <!-- RIGHT: SAFE COMMERCIAL OIL ✅ -->
      <rect x="1030" y="210" width="490" height="650" rx="34" fill="#ECFDF5" stroke="#10B981" stroke-width="6"/>
      <rect x="1220" y="310" width="110" height="230" rx="20" fill="#FDE68A" stroke="#141414" stroke-width="6"/>
      <rect x="1248" y="275" width="54" height="42" rx="8" fill="#141414"/>
      <rect x="1095" y="655" width="360" height="70" rx="35" fill="#0D7A4E"/>
      <text x="1275" y="701" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" direction="rtl" xml:lang="ar">الزيت التجاري آمن</text>
      <!-- LEFT: DEADLY RAW SEEDS ☠️ -->
      <rect x="400" y="210" width="490" height="650" rx="34" fill="#FFF0F1" stroke="#E63946" stroke-width="6"/>
      <image href="${PLANT_URIS.castor}" x="465" y="245" width="360" height="360" style="mix-blend-mode:multiply;"/>
      <rect x="465" y="655" width="360" height="70" rx="35" fill="#E63946"/>
      <text x="645" y="701" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" direction="rtl" xml:lang="ar">البذرة الخام: سُمّ الريسين</text>
      ${renderExplorerMascot({ x: 1685, y: 625, scale: 1.25, pose: "explain", frame, mouthOpen })}
      ${renderCornerBadge("05", "الخِروَع", "#FF6B35")}
      ${renderBriefTitleBanner("05", "نبتة الخِروَع", "سُمّ الريسين بلا ترياق", localF, "#FF6B35")}
    `;
  }
  if (subBeat.id === "ricin_ribosomes") {
    const jam = clamp01(subF / 48);
    const spin = jam < 0.7 ? (subF * 6) % 360 : 42;
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <rect x="520" y="110" width="1310" height="860" rx="38" fill="#0B1F19" stroke="#FF6B35" stroke-width="5"/>
      <!-- Ribosome Factory Gears Jammed by Ricin -->
      <g transform="translate(1050, 520) rotate(${spin})">
        <circle cx="0" cy="0" r="135" fill="#185C45" stroke="#2EE89E" stroke-width="10" stroke-dasharray="28 16"/>
        <circle cx="0" cy="0" r="55" fill="#071A14" stroke="#2EE89E" stroke-width="6"/>
      </g>
      <g transform="translate(1330, 560) rotate(${(-spin * 0.8).toFixed(1)})">
        <circle cx="0" cy="0" r="105" fill="#185C45" stroke="#FFD43B" stroke-width="9" stroke-dasharray="22 14"/>
        <circle cx="0" cy="0" r="42" fill="#071A14" stroke="#FFD43B" stroke-width="5"/>
      </g>
      ${jam >= 0.6 ? `
        <circle cx="1180" cy="535" r="95" fill="#E63946" opacity="0.92" stroke="#141414" stroke-width="7"/>
        <path d="M 1142 497 L 1218 573 M 1218 497 L 1142 573" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/>
      ` : ""}
      <rect x="920" y="165" width="520" height="68" rx="34" fill="#E63946"/>
      <text x="1180" y="210" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF" direction="rtl" xml:lang="ar">توقف مصانع البروتين • بلا ترياق</text>
      ${renderDangerGauge(265, 365, 0.92, 8, 1, frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "warn", frame, mouthOpen })}
      ${renderCornerBadge("05", "الخِروَع", "#FF6B35")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "05", shortLabel: "الخِروَع", accentColor: "#FF6B35",
    badLabel: "لا تمضغ البذور الخام", goodLabel: "طوارئ فورية فوراً", mouthOpen,
    badIconSvg: `<ellipse cx="-35" cy="0" rx="40" ry="56" fill="#5A301F" stroke="#141414" stroke-width="6"/>
                 <ellipse cx="38" cy="14" rx="40" ry="56" fill="#5A301F" stroke="#141414" stroke-width="6"/>`,
    goodIconSvg: `<rect x="-110" y="-110" width="220" height="220" rx="34" fill="#FFFFFF" stroke="#141414" stroke-width="6.5"/>
                  <rect x="-24" y="-75" width="48" height="150" rx="10" fill="#E63946"/>
                  <rect x="-75" y="-24" width="150" height="48" rx="10" fill="#E63946"/>`,
  });
}

export function renderLevel6({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "suicide_plant_velvet") {
    return renderHeroSpecimenStage({
      frame, localF, plantKey: "gympie", num: "06", shortLabel: "جِيمبي-جِيمبي",
      title: "نبتة جِيمبي-جِيمبي", subtitle: "نبتة الانتحار الأسترالية", dangerVal: 9,
      accentColor: "#F72585", mascotPose: "shiver", mouthOpen,
    });
  }
  if (subBeat.id === "spider_cone_snail_venom") {
    const pulse = 1 + 0.1 * Math.sin(subF * 0.3);
    const sparkX = 680 + ((subF * 18) % 1050);
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <rect x="520" y="110" width="1310" height="860" rx="38" fill="#0E1D19" stroke="#F72585" stroke-width="5"/>
      <!-- Spider & Cone Snail Venom Match Cards + 3D Cystine-Knot Molecular Links -->
      <g transform="translate(1525, 360)">
        <circle cx="0" cy="0" r="95" fill="#182C26" stroke="#F72585" stroke-width="4.5"/>
        <!-- Comic Spider Silhouette -->
        <circle cx="0" cy="18" r="28" fill="#141414" stroke="#F72585" stroke-width="4"/>
        <circle cx="0" cy="-16" r="18" fill="#141414" stroke="#F72585" stroke-width="4"/>
        <path d="M -18 -10 L -54 -35 L -66 -12 M 18 -10 L 54 -35 L 66 -12 M -20 4 L -62 0 L -70 28 M 20 4 L 62 0 L 70 28 M -16 20 L -52 44 L -56 72 M 16 20 L 52 44 L 56 72"
              fill="none" stroke="#F72585" stroke-width="6" stroke-linecap="round"/>
      </g>
      <g transform="translate(825, 360)">
        <circle cx="0" cy="0" r="95" fill="#182C26" stroke="#FFD43B" stroke-width="4.5"/>
        <!-- Comic Cone Snail Shell -->
        <polygon points="-58,-22 58,-22 8,62 -8,62" fill="#FF9F1C" stroke="#141414" stroke-width="5.5" stroke-linejoin="round"/>
        <path d="M -40 -22 Q 0 -55 40 -22 Z" fill="#FFD43B" stroke="#141414" stroke-width="5"/>
        <line x1="-26" y1="6" x2="26" y2="6" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
        <line x1="-16" y1="28" x2="16" y2="28" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
      </g>
      <!-- Central Cystine-Knot Molecule Feeding Down into Na+ Channel -->
      <line x1="925" y1="360" x2="1425" y2="360" stroke="#2EE89E" stroke-width="6" stroke-dasharray="14 12"/>
      <line x1="1175" y1="400" x2="1175" y2="620" stroke="#F72585" stroke-width="8" stroke-dasharray="16 10"/>
      <polygon points="1175,305 1230,338 1230,402 1175,435 1120,402 1120,338" fill="#0A221A" stroke="#2EE89E" stroke-width="6"/>
      <circle cx="1175" cy="370" r="22" fill="#F72585"/>
      <g transform="translate(1175, 190)">
        <rect x="-415" y="-38" width="830" height="76" rx="38" fill="#132B23" stroke="#F72585" stroke-width="4.5"/>
        <text x="0" y="13" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="31" fill="#FFD43B" direction="rtl" xml:lang="ar">جيمبيتايدز ≈ سُمّ العنكبوت والحلزون</text>
      </g>
      <!-- Nerve Axon Locked Wide Open Shooting Lightning Pain Bolts -->
      <path d="M 590 740 L 1760 740" stroke="#FFE066" stroke-width="28" stroke-linecap="round"/>
      <polygon points="910,635 885,700 925,700 895,775 965,685 925,685" fill="#E63946"/>
      <polygon points="1450,635 1425,700 1465,700 1435,775 1505,685 1465,685" fill="#E63946"/>
      <circle cx="1175" cy="740" r="${(58 * pulse).toFixed(1)}" fill="#E63946" stroke="#141414" stroke-width="6"/>
      <text x="1175" y="752" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF" direction="ltr">Na+</text>
      <circle cx="${sparkX}" cy="740" r="24" fill="#FFFFFF"/>
      ${renderDangerGauge(265, 365, 0.92, 9, 1, frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "shocked", frame, mouthOpen })}
      ${renderCornerBadge("06", "جِيمبي-جِيمبي", "#F72585")}
    `;
  }
  if (subBeat.id === "cold_shower_pain") {
    const shake = impactShake(subF, 24, 15);
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <g transform="translate(${shake.dx.toFixed(1)}, ${shake.dy.toFixed(1)})">
        <rect x="520" y="110" width="1310" height="860" rx="38" fill="#0E2226" stroke="#4D9DE0" stroke-width="5"/>
        <!-- Cold Shower Spraying onto Forearm Triggering Electric Pain -->
        <path d="M 1050 205 L 1300 205 L 1245 275 L 1105 275 Z" fill="#94A3B8" stroke="#141414" stroke-width="6"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const sx = 1090 + (i % 4) * 58;
          const sy = 295 + ((subF * 14 + i * 38) % 340);
          return `<line x1="${sx}" y1="${sy}" x2="${sx}" y2="${sy + 28}" stroke="#60A5FA" stroke-width="5" stroke-linecap="round"/>`;
        }).join("")}
        <path d="M 760 720 C 960 645, 1380 645, 1580 710 L 1620 960 L 720 960 Z" fill="#EBB58F" stroke="#141414" stroke-width="7"/>
        <polygon points="1165,560 1125,650 1175,650 1140,745 1235,630 1180,630" fill="#FFD43B" stroke="#E63946" stroke-width="5"/>
        <rect x="945" y="805" width="460" height="68" rx="34" fill="#E63946"/>
        <text x="1175" y="850" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" direction="rtl" xml:lang="ar">الماء البارد يشعل الألم</text>
        ${renderDangerGauge(265, 365, 0.92, 9, 1, frame)}
        ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "shiver", frame, mouthOpen })}
      </g>
      ${renderCornerBadge("06", "جِيمبي-جِيمبي", "#F72585")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "06", shortLabel: "جِيمبي-جِيمبي", accentColor: "#F72585",
    badLabel: "لا تفرك ولا تغسل بالماء", goodLabel: "شرائح الشمع + الطبيب", mouthOpen,
    badIconSvg: `<circle cx="0" cy="0" r="105" fill="#60A5FA" stroke="#141414" stroke-width="6"/>
                 <text x="0" y="18" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="52" fill="#141414" direction="rtl" xml:lang="ar">ماء</text>`,
    goodIconSvg: `<rect x="-125" y="-54" width="250" height="96" rx="18" transform="rotate(-8)" fill="#FFE066" stroke="#141414" stroke-width="6"/>`,
  });
}

export function renderLevel7({ frame, localF, subBeat, subF, mouthOpen }) {
  if (subBeat.id === "guinness_death_apple") {
    return renderHeroSpecimenStage({
      frame, localF, plantKey: "manchineel", num: "07", shortLabel: "المانشينيل",
      title: "شجرة المانشينيل", subtitle: "الأخطر في غينيس 10/10", dangerVal: 10,
      accentColor: "#E63946", mascotPose: "warn", mouthOpen,
    });
  }
  if (subBeat.id === "phorbol_throat_blisters") {
    const pulse = 1 + 0.1 * Math.sin(subF * 0.35);
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <rect x="520" y="110" width="1310" height="860" rx="38" fill="#140D10" stroke="#E63946" stroke-width="6"/>
      <!-- Airway & Throat Inflammation -->
      <path d="M 1030 200 C 1030 330, 1105 390, 1105 520 L 1105 880 M 1320 200 C 1320 330, 1245 390, 1245 520 L 1245 880"
            fill="none" stroke="#FF8FA3" stroke-width="26" stroke-linecap="round"/>
      <ellipse cx="1175" cy="540" rx="${(68 * pulse).toFixed(1)}" ry="125" fill="#E63946" opacity="0.72"/>
      <rect x="925" y="795" width="500" height="72" rx="36" fill="#E63946"/>
      <text x="1175" y="843" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF" direction="rtl" xml:lang="ar">التهاب وبثور الحلق</text>
      ${renderDangerGauge(265, 365, 0.92, 10, 1, frame)}
      ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "warn", frame, mouthOpen })}
      ${renderCornerBadge("07", "المانشينيل", "#E63946")}
    `;
  }
  if (subBeat.id === "acid_rain_and_smoke") {
    const shake = impactShake(subF, 28, 16);
    const blisterH = lerp(12, 92, easeOutCubic(subF / 46));
    const rainDrops = Array.from({ length: 10 }, (_, i) => {
      const rx = 640 + i * 70;
      const ry = 140 + ((subF * 12 + i * 37) % 270);
      return `<line x1="${rx}" y1="${ry}" x2="${rx - 8}" y2="${ry + 32}" stroke="#B8E828" stroke-width="4.5" stroke-linecap="round"/>`;
    }).join("");
    return `
      <rect width="1920" height="1080" fill="#071A14"/>
      <g transform="translate(${shake.dx.toFixed(1)}, ${shake.dy.toFixed(1)})">
        ${renderSubdermalCutawayBase(frame, { skinY: 435, accentColor: "#E63946" })}
        ${rainDrops}
        <path d="M 880 435 Q 1060 ${(435 - blisterH * 1.75).toFixed(1)} 1240 435 Z" fill="#FF7B88" stroke="#141414" stroke-width="6"/>
        <!-- Caustic Smoke & Stinging Eye Inset (Right) -->
        <g transform="translate(1580, 275)">
          <circle cx="0" cy="0" r="115" fill="#182C26" stroke="#E63946" stroke-width="5"/>
          <path d="M -78 12 Q 0 -42 78 12 Q 0 66 -78 12 Z" fill="#FFFFFF" stroke="#141414" stroke-width="5"/>
          <circle cx="0" cy="12" r="24" fill="#E63946"/>
          <circle cx="0" cy="12" r="10" fill="#141414"/>
        </g>
        <rect x="770" y="165" width="510" height="68" rx="34" fill="#E63946" stroke="#141414" stroke-width="4"/>
        <text x="1025" y="210" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" direction="rtl" xml:lang="ar">مطر الفوربول + دخان مُعمي</text>
        ${renderDangerGauge(265, 365, 0.92, 10, 1, frame)}
        ${renderExplorerMascot({ x: 265, y: 805, scale: 1.05, pose: "shiver", frame, mouthOpen })}
      </g>
      ${renderCornerBadge("07", "المانشينيل", "#E63946")}
    `;
  }
  return renderSurvivalSplit({
    frame, localF: subF, num: "07", shortLabel: "المانشينيل", accentColor: "#E63946",
    badLabel: "لا تلمس ولا تحتمِ بالمطر", goodLabel: "شطف 15 دقيقة + طوارئ", mouthOpen,
    badIconSvg: `<circle cx="0" cy="0" r="115" fill="#1F7A4D" stroke="#141414" stroke-width="7"/>
                 <line x1="-80" y1="-80" x2="80" y2="80" stroke="#E63946" stroke-width="18" stroke-linecap="round"/>`,
    goodIconSvg: `<circle cx="0" cy="0" r="115" fill="#FFFFFF" stroke="#141414" stroke-width="6.5"/>
                  <text x="0" y="22" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="56" fill="#0D7A4E" direction="ltr" unicode-bidi="isolate">15m</text>`,
  });
}

export function renderOutro({ frame, localF, subF, subDur, mouthOpen }) {
  const irisStart = Math.max(240, subDur - 190);
  const irisT = easeInOutCubic((subF - irisStart) / 28);
  const irisR = lerp(0, 1250, irisT);
  const stingIn = springOut((subF - irisStart - 10) / 16);

  return `
    <defs>
      ${dotGridPattern("outDots")}
      <radialGradient id="outStingBg" cx="50%" cy="46%" r="65%">
        <stop offset="0%" stop-color="#144636"/><stop offset="60%" stop-color="#092119"/><stop offset="100%" stop-color="#04100C"/>
      </radialGradient>
      <clipPath id="outIrisClip"><circle cx="960" cy="540" r="${irisR.toFixed(1)}"/></clipPath>
    </defs>

    <rect width="1920" height="1080" fill="#FAF7F0"/>
    <rect width="1920" height="1080" fill="url(#outDots)"/>
    ${renderSpectrumLadder(frame, 6, { y: 400, hideLast: false, localF: localF + 40 })}

    <!-- Next Episode Marine Creatures Teaser + Explorer Mascot -->
    <g transform="translate(690, 810)">
      <rect x="-460" y="-76" width="920" height="152" rx="34" fill="#071A14" stroke="#2EE89E" stroke-width="5"/>
      <text x="0" y="-12" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFD43B" direction="rtl" xml:lang="ar">أي نبتة صدمتك أكثر في التعليقات؟</text>
      <text x="0" y="42" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="28" fill="#2EE89E" direction="rtl" xml:lang="ar">الحلقة القادمة: أخطر كائنات البحار تحت المجهر</text>
    </g>
    ${renderExplorerMascot({ x: 1525, y: 805, scale: 1.15, pose: "explain", frame, mouthOpen })}

    ${irisT > 0.005 ? `
      <g clip-path="url(#outIrisClip)">
        <rect width="1920" height="1080" fill="url(#outStingBg)"/>
        <g transform="translate(960, 415) scale(${(0.95 * stingIn).toFixed(3)})">
          <circle cx="0" cy="0" r="222" fill="none" stroke="#2EE89E" stroke-width="9" stroke-dasharray="70 28 18 28" stroke-linecap="round" opacity="0.82"/>
          <circle cx="0" cy="0" r="188" fill="none" stroke="#FFD43B" stroke-width="5" stroke-dasharray="32 22" opacity="0.72"/>
          <g transform="rotate(38)"><rect x="-16" y="132" width="32" height="114" rx="16" fill="#0F3A2C" stroke="#141414" stroke-width="8"/><rect x="-22" y="128" width="44" height="20" rx="7" fill="#FFD43B" stroke="#141414" stroke-width="6"/></g>
          <circle cx="0" cy="0" r="136" fill="#FAF7F0" stroke="#141414" stroke-width="12"/>
          <g transform="translate(-14, 6) rotate(-18)">
            <path d="M -52 78 C -58 24, -44 -48, 22 -86 C 58 -40, 56 32, 8 76 C -14 88, -38 88, -52 78 Z" fill="#18A367" stroke="#141414" stroke-width="8" stroke-linejoin="round"/>
            <path d="M -58 92 C -34 40, -6 -22, 18 -72 M -22 30 L 18 14 M -10 -4 L 28 -18" fill="none" stroke="#141414" stroke-width="6" stroke-linecap="round"/>
          </g>
          <g transform="translate(52, 24)">
            <path d="M 0 -52 C 26 -14, 42 8, 42 28 C 42 52, 23 68, 0 68 C -23 68, -42 52, -42 28 C -42 8, -26 -14, 0 -52 Z" fill="#E63946" stroke="#141414" stroke-width="8" stroke-linejoin="round"/>
            <path d="M -20 14 C -22 28, -17 42, -6 47" fill="none" stroke="#FFFFFF" stroke-width="6.5" stroke-linecap="round"/>
          </g>
        </g>
        <text x="960" y="758" text-anchor="middle" font-family="Lalezar, sans-serif" font-size="118" fill="#FAF7F0" direction="rtl" xml:lang="ar">مِجهر الطبيعة</text>
        <rect x="790" y="805" width="340" height="66" rx="33" fill="#0F3528" stroke="#2EE89E" stroke-width="3.5"/>
        <text x="960" y="849" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="36" fill="#2EE89E" direction="ltr" unicode-bidi="isolate">@MijharBio</text>
      </g>
    ` : ""}
  `;
}
