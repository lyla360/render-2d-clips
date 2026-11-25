// Fajwah / Kurzgesagt Style No-Outline Floating-Head Vector Caricature Engine
// ZERO harsh black outlines! Built purely with layered colored shapes, tonal shadow crescents,
// floating sculpted heads hovering above rounded neckless torsos, and expressive detached pill hands.

export const CAST_PRESETS = {
  leader_blonde: {
    nameAr: "ترامب / زعيم غربي",
    skin: "#FF9F45",
    skinShade: "#E67F28",
    skinHi: "#FFB870",
    hairMain: "#F5C443",
    hairHi: "#FFE074",
    hairShade: "#D49B24",
    hairStyle: "trumpSwoop",
    beard: "none",
    suit: "#263480",
    suitShade: "#1A245C",
    shirt: "#FFFFFF",
    tie: "#FF4A5A",
    browColor: "#F5D06B",
  },
  leader_bearded: {
    nameAr: "زيلينسكي / قائد عسكري",
    skin: "#F4C29F",
    skinShade: "#D69E7B",
    skinHi: "#FFD8BD",
    hairMain: "#462E22",
    hairHi: "#614232",
    hairShade: "#2E1C14",
    hairStyle: "shortCrop",
    beard: "fullTrimmed",
    beardColor: "#5C473C",
    suit: "#1F6E43",
    suitShade: "#154F30",
    shirt: "none",
    tie: "none",
    browColor: "#3A251B",
  },
  ceo_curly: {
    nameAr: "داريو أمودي / مؤسس تقني",
    skin: "#F5C5A0",
    skinShade: "#D99F78",
    skinHi: "#FFDCBF",
    hairMain: "#4A2E20",
    hairHi: "#6E4733",
    hairShade: "#301C13",
    hairStyle: "curlyVolume",
    beard: "lightStubble",
    beardColor: "#B38466",
    suit: "#253A66",
    suitShade: "#192847",
    shirt: "#D6ECFF",
    tie: "none",
    pinColor: "#FF785A",
    browColor: "#3A2216",
  },
  exec_woman: {
    nameAr: "دانييلا / قائدة تنفيذية",
    skin: "#F9D6BE",
    skinShade: "#DDAFA0",
    skinHi: "#FFECDF",
    hairMain: "#5A3724",
    hairHi: "#85553A",
    hairShade: "#3B2216",
    hairStyle: "wavyLong",
    beard: "none",
    lashes: true,
    suit: "#F4EFE4",
    suitShade: "#D8CFC0",
    shirt: "#1D7A74",
    tie: "none",
    earringColor: "#FFD43B",
    browColor: "#46291A",
  },
  operator: {
    nameAr: "مشغّل / خبير تقني",
    skin: "#F2BC94",
    skinShade: "#D49870",
    skinHi: "#FFD4B5",
    hairMain: "#242B59",
    hairHi: "#3D4785",
    hairShade: "#171C3D",
    hairStyle: "neatSide",
    beard: "none",
    suit: "#4454B8",
    suitShade: "#2E3B8C",
    shirt: "#A2F0E8",
    tie: "none",
    browColor: "#1E244D",
  },
};

export function renderKurzCharacter({
  preset = "ceo_curly",
  x = 0,
  y = 0,
  scale = 1,
  mirror = false,
  expression = "neutral", // neutral | happy | concerned | surprised | confident | talking
  pose = "seated",        // seated | standing | gesturing | pointing | holdingCup
  mouthOpen = 0,          // 0..1 audio loudness driven
  t = 0,
  uid = "kc1",
}) {
  const c = typeof preset === "string" ? (CAST_PRESETS[preset] || CAST_PRESETS.ceo_curly) : preset;
  const flip = mirror ? -1 : 1;
  const bob = Math.sin(t * 3.4) * 3.5;
  const headBob = Math.sin(t * 3.4 - 0.5) * 4.5;
  const gestureY = Math.sin(t * 6.5) * 8;

  // 1. Hair Back Layer (for long wavy hair)
  let hairBack = "";
  if (c.hairStyle === "wavyLong") {
    hairBack = `<path d="M -66 -150 C -84 -100, -82 -44, -56 -24 L 56 -24 C 82 -44, 84 -100, 66 -150 Z" fill="${c.hairShade}"/>`;
  } else if (c.hairStyle === "curlyVolume") {
    hairBack = `
      <circle cx="-54" cy="-166" r="24" fill="${c.hairShade}"/>
      <circle cx="54" cy="-166" r="24" fill="${c.hairShade}"/>
      <circle cx="-60" cy="-136" r="20" fill="${c.hairShade}"/>
      <circle cx="60" cy="-136" r="20" fill="${c.hairShade}"/>
    `;
  }

  // 2. Sculpted No-Outline Head (Detached floating head with subtle 16px air gap above shoulders!)
  const headClip = `hc_${uid}`;
  const headShape = "M 0 -202 C 48 -202, 64 -172, 62 -124 C 60 -78, 36 -56, 0 -56 C -36 -56, -60 -78, -62 -124 C -64 -172, -48 -202, 0 -202 Z";

  // Ears (pure tonal fill, zero black outline)
  const ears = `
    <ellipse cx="-60" cy="-124" rx="11" ry="15" fill="${c.skinShade}"/>
    <ellipse cx="-58" cy="-124" rx="6" ry="9" fill="${c.skin}" opacity="0.5"/>
    <ellipse cx="60" cy="-124" rx="11" ry="15" fill="${c.skin}"/>
    <ellipse cx="58" cy="-124" rx="6" ry="9" fill="${c.skinShade}" opacity="0.55"/>
    ${c.earringColor ? `<circle cx="-61" cy="-108" r="5" fill="${c.earringColor}"/><circle cx="61" cy="-108" r="5" fill="${c.earringColor}"/>` : ""}
  `;

  // Facial Hair (Zelenskyy / Dario style — soft tonal shapes, zero black lines)
  let beardSvg = "";
  if (c.beard === "fullTrimmed") {
    beardSvg = `
      <path d="M -58 -122 C -58 -76, -34 -54, 0 -54 C 34 -54, 58 -76, 58 -122 L 46 -112 C 42 -84, 24 -76, 0 -76 C -24 -76, -42 -84, -46 -112 Z" fill="${c.beardColor}"/>
      <path d="M -28 -96 Q 0 -108 28 -96 Q 24 -84 18 -84 Q 0 -92 -18 -84 Q -24 -84 -28 -96 Z" fill="${c.beardColor}"/>
    `;
  } else if (c.beard === "lightStubble") {
    beardSvg = `<path d="M -52 -112 C -50 -74, -28 -56, 0 -56 C 28 -56, 50 -74, 52 -112 Q 0 -86 -52 -112 Z" fill="${c.beardColor}" opacity="0.30"/>`;
  }

  // Expressive Eyes (Kurzgesagt/Fajwah warm white sclera + rich dark navy-brown iris + soft under-eye tone)
  const ey = -132;
  const drawEye = (ex, sign) => {
    const r = expression === "surprised" ? 11.5 : 8.5;
    return `
      <ellipse cx="${ex}" cy="${ey + 8}" rx="12" ry="5" fill="${c.skinShade}" opacity="0.45"/>
      <ellipse cx="${ex}" cy="${ey}" rx="${r + 2}" ry="${r}" fill="#FFFFFF"/>
      <circle cx="${ex + 2}" cy="${ey}" r="${expression === "surprised" ? 4.5 : 5.5}" fill="#1D1A2B"/>
      <circle cx="${ex + 4}" cy="${ey - 2}" r="2" fill="#FFFFFF"/>
      ${c.lashes ? `<path d="M ${ex + sign * 8} ${ey - 5} L ${ex + sign * 15} ${ey - 9}" stroke="#2B1D17" stroke-width="3" stroke-linecap="round"/>` : ""}
    `;
  };

  // Eyebrows (clean thick rounded pills — zero black stroke!)
  const drawBrow = (ex, sign) => {
    const by = ey - 18;
    const rot = expression === "concerned" ? sign * 14 : expression === "confident" ? sign * -10 : 0;
    return `<rect x="${ex - 13}" y="${by - 4}" width="26" height="8" rx="4" fill="${c.browColor}" transform="rotate(${rot} ${ex} ${by})"/>`;
  };

  // Nose (pure subtle tonal shadow wedge — NO black lines!)
  const nose = `<path d="M 0 -132 L -7 -108 Q 2 -103 10 -108 Z" fill="${c.skinShade}" opacity="0.72"/>`;

  // Mouth (smooth rounded vector shape)
  const my = -84;
  let mouth = "";
  if (mouthOpen > 0.25 || expression === "talking") {
    const h = 8 + mouthOpen * 13;
    mouth = `<rect x="-15" y="${(my - h / 2).toFixed(1)}" width="30" height="${h.toFixed(1)}" rx="${(h / 2).toFixed(1)}" fill="#4A1B24"/>
             <rect x="-11" y="${(my - h / 2).toFixed(1)}" width="22" height="4.5" rx="2" fill="#FFFFFF"/>`;
  } else if (expression === "happy") {
    mouth = `<path d="M -18 ${my - 2} Q 0 ${my + 16} 18 ${my - 2} Z" fill="#FFFFFF"/>`;
  } else if (expression === "concerned") {
    mouth = `<path d="M -14 ${my + 5} Q 0 ${my - 5} 14 ${my + 5}" fill="none" stroke="#5C2D28" stroke-width="5" stroke-linecap="round"/>`;
  } else if (expression === "surprised") {
    mouth = `<ellipse cx="0" cy="${my + 2}" rx="8" ry="10" fill="#4A1B24"/>`;
  } else {
    mouth = `<path d="M -12 ${my} Q 0 ${my + 6} 12 ${my}" fill="none" stroke="#8C4838" stroke-width="5" stroke-linecap="round"/>`;
  }

  // Hair Front Layer (Bold stylized swoops with bright highlight ribbons!)
  let hairFront = "";
  if (c.hairStyle === "trumpSwoop") {
    hairFront = `
      <path d="M -64 -148 C -72 -192, -32 -224, 24 -218 C 52 -214, 72 -226, 78 -236 C 84 -204, 62 -176, 26 -174 C -10 -172, -34 -182, -52 -162 L -60 -122 L -74 -128 Z" fill="${c.hairMain}"/>
      <path d="M -42 -196 Q 16 -216 66 -216 Q 36 -188 -26 -184 Z" fill="${c.hairHi}"/>
    `;
  } else if (c.hairStyle === "curlyVolume") {
    hairFront = `
      <g fill="${c.hairMain}">
        <circle cx="-46" cy="-188" r="24"/><circle cx="-16" cy="-204" r="26"/><circle cx="20" cy="-204" r="26"/><circle cx="48" cy="-186" r="24"/>
        <circle cx="-32" cy="-178" r="20" fill="${c.hairHi}" opacity="0.65"/><circle cx="14" cy="-190" r="20" fill="${c.hairHi}" opacity="0.65"/>
      </g>
    `;
  } else if (c.hairStyle === "wavyLong") {
    hairFront = `
      <path d="M -64 -144 C -68 -196, -24 -216, 16 -214 C 58 -212, 72 -184, 66 -136 C 52 -166, 26 -176, -8 -174 C -36 -172, -52 -162, -64 -144 Z" fill="${c.hairMain}"/>
      <path d="M -38 -194 Q 10 -208 48 -188" fill="none" stroke="${c.hairHi}" stroke-width="9" stroke-linecap="round"/>
    `;
  } else {
    // shortCrop / neatSide
    hairFront = `
      <path d="M -62 -142 C -64 -194, -36 -212, 8 -212 C 48 -212, 66 -188, 62 -142 C 50 -166, 26 -174, -8 -172 C -34 -170, -50 -162, -62 -142 Z" fill="${c.hairMain}"/>
      <path d="M -36 -194 Q 6 -206 42 -192" fill="none" stroke="${c.hairHi}" stroke-width="8" stroke-linecap="round"/>
    `;
  }

  // 3. Neckless Rounded Torso + Suit/Blazer Details (Classic Kurzgesagt / Fajwah body!)
  const torso = `
    <g transform="translate(0, ${bob.toFixed(1)})">
      <!-- Rounded-shoulder geometric torso -->
      <rect x="-62" y="-36" width="124" height="148" rx="36" fill="${c.suit}"/>
      <!-- Right-side tonal shade slice -->
      <path d="M 24 -36 L 26 -36 C 46 -36, 62 -20, 62 0 L 62 76 C 62 96, 46 112, 26 112 L 24 112 Z" fill="${c.suitShade}" opacity="0.55"/>
      ${c.shirt !== "none" ? `<polygon points="-24,-36 24,-36 0,36" fill="${c.shirt}"/>` : ""}
      ${c.tie !== "none" ? `<polygon points="-7,-28 7,-28 10,44 0,56 -10,44" fill="${c.tie}"/>` : ""}
      ${c.pinColor ? `<circle cx="28" cy="14" r="7" fill="${c.pinColor}"/>` : ""}
      <!-- Legs if standing -->
      ${pose === "standing" ? `
        <rect x="-36" y="102" width="24" height="84" rx="12" fill="${c.suitShade}"/>
        <rect x="12" y="102" width="24" height="84" rx="12" fill="${c.suitShade}"/>
      ` : ""}
      <!-- Sleek curved arms + floating rounded hands -->
      ${pose === "gesturing" ? `
        <path d="M -54 14 Q -98 30 -92 ${(gestureY - 12).toFixed(1)}" fill="none" stroke="${c.suit}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="-94" cy="${(gestureY - 16).toFixed(1)}" r="19" fill="${c.skin}"/>
        <path d="M 54 14 Q 88 54 78 78" fill="none" stroke="${c.suitShade}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="78" cy="84" r="18" fill="${c.skinShade}"/>
      ` : pose === "pointing" ? `
        <path d="M -54 12 Q -108 8 -134 -18" fill="none" stroke="${c.suit}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="-138" cy="-20" r="19" fill="${c.skin}"/>
        <path d="M 54 14 Q 82 56 72 82" fill="none" stroke="${c.suitShade}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="72" cy="86" r="18" fill="${c.skinShade}"/>
      ` : `
        <path d="M -54 14 Q -76 58 -52 84" fill="none" stroke="${c.suit}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="-46" cy="88" r="18" fill="${c.skin}"/>
        <path d="M 54 14 Q 76 58 52 84" fill="none" stroke="${c.suitShade}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="46" cy="88" r="18" fill="${c.skinShade}"/>
      `}
    </g>
  `;

  return `
  <g transform="translate(${x}, ${y}) scale(${scale * flip}, ${scale})">
    ${torso}
    <!-- Floating Detached Head hovering gracefully above shoulders -->
    <g transform="translate(0, ${headBob.toFixed(1)})">
      ${hairBack}
      ${ears}
      <defs><clipPath id="${headClip}"><path d="${headShape}"/></clipPath></defs>
      <path d="${headShape}" fill="${c.skin}"/>
      <g clip-path="url(#${headClip})">
        <!-- Soft side shadow crescent & rim highlight (NO black outline!) -->
        <path d="M -70 -210 L -18 -210 C -40 -164, -40 -90, -14 -50 L -70 -50 Z" fill="${c.skinShade}" opacity="0.45"/>
        <path d="M 38 -190 C 56 -160, 56 -100, 34 -72" fill="none" stroke="${c.skinHi}" stroke-width="9" stroke-linecap="round" opacity="0.65"/>
        ${beardSvg}
      </g>
      ${drawEye(-20, -1)}
      ${drawEye(24, 1)}
      ${drawBrow(-20, -1)}
      ${drawBrow(24, 1)}
      ${nose}
      ${mouth}
      ${hairFront}
    </g>
  </g>`;
}
