// Reusable Layered Sets, 4-Depth Parallax Props & Pure-SVG 2.5D Perspectives
// Every surface carries drawn architectural detail (zero flat bare walls/floors).
import { PALETTE } from "../rig/cast_2d.mjs";

export const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOutCubic = (t) => 1 - Math.pow(1 - clamp(t), 3);

export function renderVignette(f, strength = 0.25) {
  return `
    <defs>
      <radialGradient id="vig_f${f}" cx="50%" cy="50%" r="68%">
        <stop offset="45%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="${strength.toFixed(2)}"/>
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="1920" height="1080" fill="url(#vig_f${f})" pointer-events="none"/>
  `;
}

/**
 * Set 1: Bright Daylight Corporate Finance Office (wide 2800px canvas + 4-depth parallax)
 */
export function renderFinanceOfficeBg(f, panX = 0, dusk = false, lightsOff = false) {
  const skyTop = dusk ? "#232A4B" : "#B8D9EE";
  const skyBot = dusk ? "#E08B6D" : "#EBF5FB";
  const wallFill = dusk ? "#9E9B95" : "#EAE6DC";
  const floorFill = dusk ? "#73583B" : "#C9A172";
  const floorLine = dusk ? "#5C442C" : "#AD8455";
  const extShift = panX * 0.48;
  const wallShift = panX * 0.78;
  const castShift = panX * 1.0;

  let planks = "";
  for (let px = -300; px < 2600; px += 160) {
    planks += `<line x1="${px}" y1="760" x2="${px - 120}" y2="1080" stroke="${floorLine}" stroke-width="2.5" opacity="0.55"/>`;
  }
  const walkerX = ((f * 2.2) % 900) - 200;

  return `
    <!-- Layer 1: Exterior Skyline & Passers-by (0.48x) -->
    <defs>
      <linearGradient id="finSky_f${f}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${skyTop}"/>
        <stop offset="100%" stop-color="${skyBot}"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1920" height="1080" fill="url(#finSky_f${f})"/>
    <g transform="translate(${extShift.toFixed(1)}, 0)">
      <rect x="340" y="210" width="160" height="440" fill="${dusk ? "#18213A" : "#9BB2C4"}" stroke="#141414" stroke-width="3"/>
      <rect x="530" y="150" width="190" height="500" fill="${dusk ? "#121A30" : "#8AA3B8"}" stroke="#141414" stroke-width="3"/>
      <rect x="750" y="240" width="145" height="410" fill="${dusk ? "#1C2642" : "#A7BCCB"}" stroke="#141414" stroke-width="3"/>
      ${dusk ? `<g fill="#F7D060" opacity="0.82"><rect x="560" y="190" width="26" height="32"/><rect x="610" y="190" width="26" height="32"/><rect x="660" y="250" width="26" height="32"/><rect x="560" y="310" width="26" height="32"/><rect x="370" y="260" width="24" height="28"/><rect x="420" y="320" width="24" height="28"/></g>` : ""}
      <!-- Tiny exterior background walker -->
      <g transform="translate(${(420 + walkerX * 0.5).toFixed(1)}, 530) scale(0.32)">
        <circle cx="0" cy="-190" r="36" fill="#E8C09F" stroke="#141414" stroke-width="6"/>
        <path d="M -20 -150 L -26 -60 L 26 -60 L 20 -150 Z" fill="#3B5B7A" stroke="#141414" stroke-width="6"/>
        <line x1="-8" y1="-60" x2="-12" y2="0" stroke="#141414" stroke-width="7"/>
        <line x1="8" y1="-60" x2="12" y2="0" stroke="#141414" stroke-width="7"/>
      </g>
    </g>

    <!-- Layer 2: Textured Office Wall + Window Cutout (0.78x) -->
    <g transform="translate(${wallShift.toFixed(1)}, 0)">
      <path d="M -600 0 H 2800 V 760 H -600 Z M 350 110 H 920 V 530 H 350 Z" fill="${wallFill}" fill-rule="evenodd" stroke="#141414" stroke-width="4"/>
      <!-- Wall Molding & Wainscoting -->
      <rect x="-600" y="610" width="3400" height="150" fill="${dusk ? "#83807B" : "#D9D3C5"}" stroke="#141414" stroke-width="3"/>
      <line x1="-600" y1="610" x2="2800" y2="610" stroke="#141414" stroke-width="4"/>
      <!-- Window Frame & Optional Closed Blinds -->
      <rect x="350" y="110" width="570" height="420" fill="none" stroke="#141414" stroke-width="8"/>
      <line x1="635" y1="110" x2="635" y2="530" stroke="#141414" stroke-width="6"/>
      ${lightsOff ? `
        <rect x="354" y="114" width="562" height="412" fill="#2A3242" opacity="0.90"/>
        <g stroke="#141414" stroke-width="2" opacity="0.5">${Array.from({ length: 14 }, (_, i) => `<line x1="354" y1="${130 + i * 28}" x2="916" y2="${130 + i * 28}"/>`).join("")}</g>
      ` : ""}
      <!-- Wall Clock & Framed Chart -->
      <circle cx="1140" cy="210" r="56" fill="#FFFFFF" stroke="#141414" stroke-width="5"/>
      <line x1="1140" y1="210" x2="1140" y2="174" stroke="#141414" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="1140" y1="210" x2="1166" y2="220" stroke="#D93829" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="1310" y="150" width="240" height="160" rx="6" fill="#F8F9FA" stroke="#141414" stroke-width="4"/>
      <polyline points="1335,280 1385,245 1435,260 1485,205 1525,180" fill="none" stroke="#2A8C64" stroke-width="5" stroke-linecap="round"/>
      <!-- Diagonal Sunlight Beam when bright -->
      ${!dusk && !lightsOff ? `<polygon points="350,110 920,110 1240,1080 540,1080" fill="#FFFBE6" opacity="0.18" pointer-events="none"/>` : ""}
    </g>

    <!-- Layer 3: Floor Planks (1.0x) -->
    <g transform="translate(${castShift.toFixed(1)}, 0)">
      <rect x="-600" y="760" width="3400" height="340" fill="${floorFill}" stroke="#141414" stroke-width="4"/>
      ${planks}
    </g>
    ${dusk || lightsOff ? `<rect x="0" y="0" width="1920" height="1080" fill="#0B132B" opacity="${lightsOff ? 0.35 : 0.25}" pointer-events="none"/>` : ""}
  `;
}

/**
 * Set 2: 2.5D One-Point Perspective Dark Hacker Bunker / Server Corridor
 */
export function renderBunker25DBg(f, pulse = 0) {
  const glowOp = (0.35 + 0.15 * Math.sin(pulse)).toFixed(2);
  let racks = "";
  for (let i = 0; i < 4; i++) {
    const t = i / 4;
    const xL = 70 + t * 440;
    const xR = 1850 - t * 440 - (140 - t * 80);
    const w = 140 - t * 80;
    const y = 130 + t * 210;
    const h = 760 - t * 380;
    const blink = ((f + i * 7) % 24) < 12 ? PALETTE.cyan : PALETTE.crimson;
    racks += `
      <rect x="${xL}" y="${y}" width="${w}" height="${h}" fill="#141C2B" stroke="#141414" stroke-width="4"/>
      <rect x="${xL + 12}" y="${y + 24}" width="${w - 24}" height="10" fill="${PALETTE.cyan}" opacity="0.5"/>
      <circle cx="${xL + w * 0.3}" cy="${y + 58}" r="4.5" fill="${blink}"/>
      <rect x="${xR}" y="${y}" width="${w}" height="${h}" fill="#141C2B" stroke="#141414" stroke-width="4"/>
      <rect x="${xR + 12}" y="${y + 24}" width="${w - 24}" height="10" fill="${PALETTE.cyan}" opacity="0.5"/>
      <circle cx="${xR + w * 0.7}" cy="${y + 58}" r="4.5" fill="${blink}"/>
    `;
  }
  return `
    <rect width="1920" height="1080" fill="#0A101E"/>
    <!-- Perspective Grid Lines converging to (960, 440) -->
    <g stroke="#1D3557" stroke-width="2.5" opacity="0.75">
      <line x1="0" y1="0" x2="960" y2="440"/><line x1="1920" y1="0" x2="960" y2="440"/>
      <line x1="0" y1="1080" x2="960" y2="440"/><line x1="1920" y1="1080" x2="960" y2="440"/>
      <line x1="480" y1="1080" x2="960" y2="440"/><line x1="1440" y1="1080" x2="960" y2="440"/>
      <rect x="520" y="260" width="880" height="440" fill="#0E1729" stroke="#1F3A5F" stroke-width="4"/>
    </g>
    <!-- Glowing Floor Perspective Grid -->
    <g stroke="${PALETTE.cyan}" stroke-width="1.8" opacity="${glowOp}">
      <line x1="200" y1="1080" x2="960" y2="700"/><line x1="1720" y1="1080" x2="960" y2="700"/>
      <line x1="360" y1="920" x2="1560" y2="920"/><line x1="500" y1="810" x2="1420" y2="810"/>
    </g>
    ${racks}
    <!-- Central Glowing Radial Disc -->
    <defs>
      <radialGradient id="bunkHalo_f${f}" cx="50%" cy="40%" r="48%">
        <stop offset="0%" stop-color="${PALETTE.cyan}" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="${PALETTE.cyan}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#bunkHalo_f${f})"/>
  `;
}

/**
 * Set 3: Mahogany Law Firm / Executive Office w/ Diagonal Sunbeams & Dust Specks
 */
export function renderLawLibraryBg(f) {
  let books = "";
  const colors = ["#8B2E2E", "#2A4D69", "#3B6E52", "#9A7B38", "#4A3A59"];
  for (let row = 0; row < 3; row++) {
    const by = 180 + row * 125;
    books += `<rect x="180" y="${by}" width="540" height="100" fill="#2A1C14" stroke="#141414" stroke-width="3"/>`;
    for (let bx = 195; bx < 690; bx += 36) {
      const col = colors[(bx + row) % colors.length];
      books += `<rect x="${bx}" y="${by + 10}" width="30" height="86" rx="2" fill="${col}" stroke="#141414" stroke-width="2.5"/>`;
    }
  }
  let dust = "";
  for (let i = 0; i < 16; i++) {
    const dx = 980 + ((i * 73 + f * 0.9) % 520);
    const dy = 140 + ((i * 119 + Math.sin(f * 0.04 + i) * 35) % 620);
    dust += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="${2 + (i % 3)}" fill="#FFF8DC" opacity="0.55"/>`;
  }
  return `
    <rect width="1920" height="1080" fill="#4A3222"/>
    <!-- Wood Wall Panels -->
    <g stroke="#2C1D13" stroke-width="4" fill="#593C29">
      <rect x="60" y="70" width="760" height="680"/>
      <rect x="860" y="70" width="980" height="680"/>
    </g>
    ${books}
    <!-- Tall Window Right -->
    <rect x="1080" y="90" width="460" height="460" fill="#CFE4F2" stroke="#141414" stroke-width="7"/>
    <line x1="1310" y1="90" x2="1310" y2="550" stroke="#141414" stroke-width="5"/>
    <line x1="1080" y1="320" x2="1540" y2="320" stroke="#141414" stroke-width="5"/>
    <!-- Floor -->
    <rect x="0" y="760" width="1920" height="320" fill="#362216" stroke="#141414" stroke-width="4"/>
    <!-- Diagonal Sunbeam + Floating Dust -->
    <polygon points="1080,90 1540,90 1760,1080 920,1080" fill="#FFF7D6" opacity="0.16" pointer-events="none"/>
    ${dust}
  `;
}

/**
 * Set 4: Unmirrored Vector Geography Map (UK - Spain - Portugal - USA - Greece - Israel)
 */
export function renderEuropeMapBg(f, panX = 0) {
  return `
    <rect width="1920" height="1080" fill="#A9CFE2"/>
    <!-- Subtle Ocean Lat/Long Grid -->
    <g stroke="#8FB8CE" stroke-width="2" opacity="0.55">
      ${[180, 360, 540, 720, 900].map((y) => `<line x1="0" y1="${y}" x2="1920" y2="${y}"/>`).join("")}
      ${[240, 480, 720, 960, 1200, 1440, 1680].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="1080"/>`).join("")}
    </g>
    <g transform="translate(${panX.toFixed(1)}, 0)">
      <!-- Iberian Peninsula (Spain + Portugal) -->
      <path d="M 320 460 L 580 440 L 620 580 L 490 730 L 310 710 L 290 540 Z" fill="#E6DEC8" stroke="#141414" stroke-width="4.5" stroke-linejoin="round"/>
      <!-- Spain Highlight -->
      <path d="M 365 460 L 580 440 L 620 580 L 490 730 L 365 710 Z" fill="#E0A94F" stroke="#141414" stroke-width="3.5" opacity="0.85"/>
      <!-- UK Island (North-West) -->
      <path d="M 410 150 L 490 140 L 520 260 L 485 350 L 385 340 L 395 230 Z" fill="#D93829" stroke="#141414" stroke-width="4.5" stroke-linejoin="round"/>
      <!-- France / Central Europe -->
      <path d="M 550 280 L 900 240 L 940 480 L 610 470 Z" fill="#E6DEC8" stroke="#141414" stroke-width="4"/>
      <!-- Italy / Greece -->
      <path d="M 880 450 L 1060 470 L 1160 660 L 1080 690 L 940 560 Z" fill="#E6DEC8" stroke="#141414" stroke-width="4"/>
      <path d="M 1180 540 L 1320 530 L 1300 710 L 1200 680 Z" fill="#E6DEC8" stroke="#141414" stroke-width="4"/>
      <!-- Eastern Med & Israel Coast -->
      <path d="M 1360 480 L 1780 480 L 1780 920 L 1380 880 L 1460 720 L 1420 560 Z" fill="#E6DEC8" stroke="#141414" stroke-width="4"/>
      <path d="M 1490 660 L 1545 660 L 1530 785 L 1485 770 Z" fill="${PALETTE.cyan}" stroke="#141414" stroke-width="3.5"/>
      <!-- North Africa Bottom Band -->
      <path d="M 280 790 L 1360 790 L 1360 1020 L 280 1020 Z" fill="#DFD5BD" stroke="#141414" stroke-width="4"/>
      <!-- Crisp Unmirrored Labels -->
      <text x="450" y="255" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="24" fill="#FFFFFF">BRITAIN</text>
      <text x="485" y="590" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="26" fill="#141414">SPAIN</text>
      <text x="1518" y="642" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="22" fill="#141414">ISRAEL</text>
    </g>
  `;
}

/**
 * Set 5: 3840px Continuous Physical-Connector Pipe World (USA -> Spain -> Portugal -> Greece -> Crypto)
 */
export function renderPipeTravelWorld(f, camX) {
  const dashOff = -(f * 14);
  return `
    <rect width="1920" height="1080" fill="#111A2E"/>
    <g transform="translate(${(-camX).toFixed(1)}, 0)">
      <!-- Night Skyline Strip -->
      <rect x="0" y="0" width="3840" height="820" fill="#131E38"/>
      <!-- Building 1: USA Bank (x=180) -->
      <rect x="140" y="250" width="460" height="570" fill="#D9D3C5" stroke="#141414" stroke-width="5"/>
      <polygon points="110,250 370,130 630,250" fill="#C4BCA9" stroke="#141414" stroke-width="5"/>
      <text x="370" y="220" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#141414">U.S.A. BANK</text>
      ${[210, 310, 410, 510].map((px) => `<rect x="${px}" y="275" width="34" height="460" fill="#EAE5D8" stroke="#141414" stroke-width="3.5"/>`).join("")}

      <!-- Building 2: Spain Node (x=950) -->
      <rect x="920" y="340" width="420" height="480" fill="#C88E56" stroke="#141414" stroke-width="5"/>
      <rect x="960" y="370" width="340" height="72" rx="8" fill="#1E293B" stroke="#141414" stroke-width="4"/>
      <text x="1130" y="420" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#F2C14E">SPAIN</text>

      <!-- Building 3: Portugal Node (x=1660) -->
      <rect x="1620" y="310" width="420" height="510" fill="#4E7369" stroke="#141414" stroke-width="5"/>
      <rect x="1660" y="340" width="340" height="72" rx="8" fill="#1E293B" stroke="#141414" stroke-width="4"/>
      <text x="1830" y="390" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">PORTUGAL</text>

      <!-- Building 4: Greece Node (x=2360) -->
      <rect x="2320" y="350" width="420" height="470" fill="#E3DDD0" stroke="#141414" stroke-width="5"/>
      <rect x="2360" y="380" width="340" height="72" rx="8" fill="#1D4E89" stroke="#141414" stroke-width="4"/>
      <text x="2530" y="430" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="34" fill="#FFFFFF">GREECE</text>

      <!-- End Zone: Dark Crypto Vortex (x=3200) -->
      <rect x="2940" y="0" width="900" height="820" fill="#070B14"/>
      <circle cx="3380" cy="480" r="220" fill="none" stroke="${PALETTE.cyan}" stroke-width="5" stroke-dasharray="18,12" opacity="0.65"/>
      <circle cx="3380" cy="480" r="145" fill="#0E2439" stroke="${PALETTE.cyan}" stroke-width="6"/>
      <text x="3380" y="470" text-anchor="middle" font-family="Lalezar, Cairo, sans-serif" font-size="68" fill="${PALETTE.cyan}">CRYPTO</text>
      <text x="3380" y="528" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="800" font-size="28" fill="#94A3B8">UNTRACEABLE WALLET</text>

      <!-- Street Ground -->
      <rect x="0" y="820" width="3840" height="260" fill="#2A313D" stroke="#141414" stroke-width="5"/>
      <line x1="0" y1="935" x2="3840" y2="935" stroke="#E2B93B" stroke-width="6" stroke-dasharray="46,34"/>

      <!-- Continuous Physical Transfer Pipe + Glowing Cash Pulses -->
      <path d="M 370 590 C 560 590, 740 530, 1130 560 C 1420 580, 1540 500, 1830 520 C 2120 540, 2240 580, 2530 560 C 2820 540, 3040 480, 3240 480" fill="none" stroke="#141414" stroke-width="34" stroke-linecap="round"/>
      <path d="M 370 590 C 560 590, 740 530, 1130 560 C 1420 580, 1540 500, 1830 520 C 2120 540, 2240 580, 2530 560 C 2820 540, 3040 480, 3240 480" fill="none" stroke="#1D3557" stroke-width="20" stroke-linecap="round"/>
      <path d="M 370 590 C 560 590, 740 530, 1130 560 C 1420 580, 1540 500, 1830 520 C 2120 540, 2240 580, 2530 560 C 2820 540, 3040 480, 3240 480" fill="none" stroke="${PALETTE.cyan}" stroke-width="10" stroke-dasharray="28,44" stroke-dashoffset="${dashOff}" stroke-linecap="round"/>
    </g>
  `;
}

/**
 * Set 6: Ferrari Sunlit Italian Executive Office (for Benedetto Vigna Lookalike + Book Question)
 */
export function renderFerrariOfficeBg(f, panX = 0) {
  return `
    <rect width="1920" height="1080" fill="#F2ECE1"/>
    <g transform="translate(${(panX * 0.75).toFixed(1)}, 0)">
      <!-- Racing Red Accent Stripe across Crisp Italian Wall -->
      <rect x="-200" y="640" width="2400" height="16" fill="${PALETTE.ferrariRed}" stroke="#141414" stroke-width="3"/>
      <rect x="-200" y="656" width="2400" height="114" fill="#E3DAC8" stroke="#141414" stroke-width="3"/>
      <!-- Panoramic Window showing warm hills -->
      <rect x="640" y="100" width="640" height="440" fill="#C9E3F5" stroke="#141414" stroke-width="7"/>
      <path d="M 640 460 Q 820 380 960 440 T 1280 410 V 540 H 640 Z" fill="#8DB37B" stroke="#141414" stroke-width="3"/>
      <line x1="960" y1="100" x2="960" y2="540" stroke="#141414" stroke-width="5"/>
      <!-- Framed Poster & Racing Helmet Shelf -->
      <rect x="210" y="150" width="220" height="270" rx="6" fill="#D40000" stroke="#141414" stroke-width="5"/>
      <path d="M 275 240 L 365 240 L 352 335 L 320 355 L 288 335 Z" fill="#F7D02C" stroke="#141414" stroke-width="4"/>
      <!-- Diagonal Sunlight -->
      <polygon points="640,100 1280,100 1480,1080 520,1080" fill="#FFFDF0" opacity="0.22" pointer-events="none"/>
    </g>
    <rect x="0" y="770" width="1920" height="310" fill="#8C6543" stroke="#141414" stroke-width="4"/>
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 190}" y1="770" x2="${i * 190 - 110}" y2="1080" stroke="#6E4E32" stroke-width="2.5" opacity="0.5"/>`).join("")}
  `;
}
