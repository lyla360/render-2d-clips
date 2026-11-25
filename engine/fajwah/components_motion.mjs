// Fajwah / Kurzgesagt Signature Motion-Graphics Components (1920x1080 16:9 or 1080x1920 9:16)
// Zero black outlines, vibrant flat-gradient design, numbered yellow banners, magnifying loupes,
// radar sweep scopes, curved Earth physics diagrams, balance scales, and split-screen wipes!

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutBack = (t) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(clamp(t) - 1, 3) + c1 * Math.pow(clamp(t) - 1, 2);
};

// 1. Iconic Yellow Pill Reason / Chapter Banner + Dark Indigo Number Circle (Top Center)
export function renderReasonBanner({ num = 1, text = "السبب الأول: التمويل الدائري", x = 960, y = 115, p = 1 }) {
  const sc = easeOutBack(clamp(p));
  const pillW = Math.min(1180, Math.max(540, text.length * 36 + 130));
  return `
  <g transform="translate(${x}, ${y}) scale(${sc.toFixed(3)})">
    <!-- Soft drop shadow -->
    <rect x="${(-pillW / 2 + 6).toFixed(1)}" y="-42" width="${pillW}" height="92" rx="46" fill="#0B1338" opacity="0.28"/>
    <!-- Vibrant Gold Pill -->
    <rect x="${(-pillW / 2).toFixed(1)}" y="-48" width="${pillW}" height="92" rx="46" fill="#FFD43B"/>
    <text x="-18" y="13" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="46" fill="#18204F" direction="rtl" xml:lang="ar">${text}</text>
    <!-- Dark Indigo Number Badge on RIGHT (RTL reading start!) -->
    <circle cx="${(pillW / 2 + 54).toFixed(1)}" cy="4" r="46" fill="#0B1338" opacity="0.28"/>
    <circle cx="${(pillW / 2 + 48).toFixed(1)}" cy="-2" r="46" fill="#18204F"/>
    <text x="${(pillW / 2 + 48).toFixed(1)}" y="15" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="46" fill="#FFD43B">${num}</text>
  </g>`;
}

// 2. Crisp Floating Callout Pill with Anchor Dot/Line
export function renderCalloutPill({ x, y, text, bg = "#FFFFFF", fg = "#18204F", anchorX = null, anchorY = null, p = 1 }) {
  const sc = easeOutBack(clamp(p));
  const w = Math.max(150, text.length * 22 + 56);
  return `
  <g opacity="${clamp(p * 1.5).toFixed(2)}">
    ${anchorX !== null ? `<line x1="${x}" y1="${y}" x2="${anchorX}" y2="${anchorY}" stroke="${bg}" stroke-width="4" stroke-dasharray="10 8" opacity="0.85"/><circle cx="${anchorX}" cy="${anchorY}" r="9" fill="${bg}"/>` : ""}
    <g transform="translate(${x}, ${y}) scale(${sc.toFixed(3)})">
      <rect x="${(-w / 2 + 4).toFixed(1)}" y="-24" width="${w}" height="56" rx="28" fill="#0B1233" opacity="0.25"/>
      <rect x="${(-w / 2).toFixed(1)}" y="-28" width="${w}" height="56" rx="28" fill="${bg}"/>
      <text x="0" y="10" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="30" fill="${fg}" direction="rtl" xml:lang="ar">${text}</text>
    </g>
  </g>`;
}

// 3. Animated Radar Sweep Scope (Night Intelligence / Tech Detection)
export function renderRadarScope({ cx = 960, cy = 580, r = 290, t = 0, blips = [], uid = "rad1" }) {
  const ang = (t * 95) % 360;
  return `
  <g transform="translate(${cx}, ${cy})">
    <defs>
      <linearGradient id="swp_${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3BF5D8" stop-opacity="0.58"/>
        <stop offset="100%" stop-color="#3BF5D8" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Soft outer shadow + lavender-indigo metallic rim -->
    <circle cx="12" cy="18" r="${r + 16}" fill="#070B24" opacity="0.45"/>
    <circle cx="0" cy="0" r="${r + 16}" fill="#6F7DD1"/>
    <circle cx="0" cy="0" r="${r}" fill="#1E285E"/>
    <!-- Concentric dashed rings -->
    <circle cx="0" cy="0" r="${(r * 0.78).toFixed(0)}" fill="none" stroke="#4D5CA6" stroke-width="4" stroke-dasharray="16 12"/>
    <circle cx="0" cy="0" r="${(r * 0.52).toFixed(0)}" fill="none" stroke="#4D5CA6" stroke-width="4" stroke-dasharray="12 10"/>
    <circle cx="0" cy="0" r="${(r * 0.26).toFixed(0)}" fill="none" stroke="#4D5CA6" stroke-width="3"/>
    <!-- Spinning glowing sweep sector -->
    <g transform="rotate(${ang.toFixed(1)})">
      <path d="M 0 0 L ${r} 0 A ${r} ${r} 0 0 1 ${(r * 0.78).toFixed(1)} ${(r * 0.62).toFixed(1)} Z" fill="url(#swp_${uid})"/>
      <line x1="0" y1="0" x2="${r}" y2="0" stroke="#72FFEA" stroke-width="6" stroke-linecap="round"/>
    </g>
    <!-- Blips -->
    ${blips.map((b, i) => {
      const pulse = 1 + Math.sin(t * 7 + i) * 0.25;
      return `
        <circle cx="${b.x}" cy="${b.y}" r="${(18 * pulse).toFixed(1)}" fill="${b.color || "#FF4D5E"}" opacity="0.32"/>
        <circle cx="${b.x}" cy="${b.y}" r="10" fill="${b.color || "#FF4D5E"}"/>
      `;
    }).join("")}
    <circle cx="0" cy="0" r="11" fill="#72FFEA"/>
  </g>`;
}

// 4. Physical Balance Scale Metaphor (White House / Value vs Cost Comparison!)
export function renderBalanceScale({ x = 960, y = 620, tiltDeg = 14, leftLabel = "$900B", rightLabel = "$107B" }) {
  const rad = (tiltDeg * Math.PI) / 180;
  const arm = 210;
  const lx = -Math.cos(rad) * arm, ly = -210 - Math.sin(rad) * arm;
  const rx = Math.cos(rad) * arm,  ry = -210 + Math.sin(rad) * arm;
  return `
  <g transform="translate(${x}, ${y})">
    <!-- Base & Central Pillar -->
    <ellipse cx="0" cy="12" rx="130" ry="18" fill="#111C42" opacity="0.45"/>
    <rect x="-85" y="-14" width="170" height="24" rx="12" fill="#4654B8"/>
    <rect x="-14" y="-235" width="28" height="225" rx="14" fill="#5D6CD4"/>
    <circle cx="0" cy="-210" r="18" fill="#FF5263"/>
    <!-- Tilting Beam -->
    <line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="#7584E6" stroke-width="18" stroke-linecap="round"/>
    <!-- Left Pan -->
    <g transform="translate(${lx.toFixed(1)}, ${(ly + 110).toFixed(1)})">
      <line x1="0" y1="-110" x2="-65" y2="0" stroke="#9AA7F2" stroke-width="5"/>
      <line x1="0" y1="-110" x2="65" y2="0" stroke="#9AA7F2" stroke-width="5"/>
      <path d="M -92 0 C -92 36, 92 36, 92 0 Z" fill="#FF5263"/>
      <rect x="-82" y="-58" width="164" height="58" rx="14" fill="#FFD43B"/>
      <text x="0" y="-19" text-anchor="middle" direction="rtl" xml:lang="ar" font-family="Cairo, sans-serif" font-weight="900" font-size="26" fill="#18204F">${leftLabel}</text>
    </g>
    <!-- Right Pan -->
    <g transform="translate(${rx.toFixed(1)}, ${(ry + 110).toFixed(1)})">
      <line x1="0" y1="-110" x2="-65" y2="0" stroke="#9AA7F2" stroke-width="5"/>
      <line x1="0" y1="-110" x2="65" y2="0" stroke="#9AA7F2" stroke-width="5"/>
      <path d="M -92 0 C -92 36, 92 36, 92 0 Z" fill="#FF5263"/>
      <rect x="-90" y="-58" width="180" height="58" rx="14" fill="#3BF5D8"/>
      <text x="0" y="-19" text-anchor="middle" direction="rtl" xml:lang="ar" font-family="Cairo, sans-serif" font-weight="900" font-size="25" fill="#18204F">${rightLabel}</text>
    </g>
  </g>`;
}

// 5. Circular Magnifying Loupe PiP (Kurzgesagt/Fajwah Zoom-Bubble!)
export function renderMagnifyingLoupe({ cx, cy, r = 145, innerSvg = "", targetX, targetY, uid = "lp1" }) {
  return `
  <g>
    ${targetX !== undefined ? `<line x1="${cx}" y1="${cy}" x2="${targetX}" y2="${targetY}" stroke="#4E5DC4" stroke-width="6" stroke-dasharray="12 10"/>` : ""}
    <defs><clipPath id="clp_${uid}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${cx + 8}" cy="${cy + 12}" r="${r + 12}" fill="#0D1847" opacity="0.28"/>
    <circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="#4A56B8"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#35BEFF"/>
    <g clip-path="url(#clp_${uid})">${innerSvg}</g>
    <!-- Glossy lens crescent -->
    <path d="M ${cx - r * 0.58} ${cy - r * 0.55} Q ${cx} ${cy - r * 0.85} ${cx + r * 0.52} ${cy - r * 0.52}" fill="none" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" opacity="0.55"/>
  </g>`;
}
