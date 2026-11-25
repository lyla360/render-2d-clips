// Episode: "How Three AI Voices Stole $129 Million" (@MalafMaftouh — English Edition)
// Strict v2 Measured Stick-Figure Anatomy (246px base rig -> ~505px @ scale=2.05 in 1920x1080)
// - Round head (~34% height, no nose/ears, subtle 10% cel shade crescent)
// - Tapered pear/bell torso ALWAYS narrower than head (0.50x shoulder -> 0.78x hip) + dark curved pants bowl
// - Shoeless tapered black stick legs (~24% height) + articulated 2-segment bent-knee walk cycle
// - Black stick arms + 4-finger splayed black stick hands (zero circular pads)
// - Proportional #141414 ink, hair-matched brows, catchlight eyes, half-lid deadpan, +0.38R 3/4 rim-shift

export const PALETTE = {
  ink: "#141414",
  cyan: "#00E5FF",
  cyanGlow: "#00B8D4",
  crimson: "#D93829",
  gold: "#F2C14E",
  ferrariRed: "#D40000",
  paper: "#F6F3EC",
  navyDark: "#0C1220",
  slateWall: "#233044",
};

export const CAST_SPECS = {
  // 5 Main Characters
  accountant: {
    name: "Corporate Accountant",
    role: "Lead Victim (Finance)",
    skin: "#F7D9C0",
    skinShade: "#DFB899",
    hair: "#5C3A28",
    hairHi: "#7E533B",
    browColor: "#4A2E1F",
    hairStyle: "bob_bangs",
    coat: "#3D5B78",
    coatShade: "#2A4157",
    shirt: "#F9F7F2",
    tie: null,
    glasses: "round",
    lanyard: "#F2C14E",
    badge: "FIN",
    ageLines: false,
    stubble: false,
    beard: false,
    gagProp: null,
    isMain: true,
  },
  fake_ceo_lawyer: {
    name: "AI CEO / Lawyer Clone",
    role: "Double-Puppet Mask",
    skin: "#EFC8A8",
    skinShade: "#D2A481",
    hair: "#242A36",
    hairHi: "#485266",
    browColor: "#242A36",
    hairStyle: "exec_part",
    coat: "#1F2A3A",
    coatShade: "#131A24",
    shirt: "#FFFFFF",
    tie: "#2E6FD8",
    glasses: "rect",
    lanyard: null,
    badge: "CEO",
    ageLines: false,
    stubble: false,
    beard: false,
    gagProp: "holo_rim",
    isMain: true,
  },
  sharon_hazan: {
    name: "Sharon Hazan (54)",
    role: '"Rocky Balboa"',
    skin: "#E5B993",
    skinShade: "#C69771",
    hair: "#5B6068",
    hairHi: "#9BA2AE",
    browColor: "#5B6068",
    hairStyle: "receding_salt",
    coat: "#2C2422",
    coatShade: "#1A1514",
    shirt: "#141414",
    tie: null,
    glasses: null,
    lanyard: null,
    badge: "ROCKY",
    ageLines: true,
    stubble: true,
    beard: false,
    gagProp: "boxing_tag",
    isMain: true,
  },
  jacob_soall: {
    name: "Jacob Soall (41)",
    role: '"Superman Cash"',
    skin: "#EDD0B4",
    skinShade: "#CEAD8D",
    hair: "#1B1E24",
    hairHi: "#3D434F",
    browColor: "#1B1E24",
    hairStyle: "slick_undercut",
    coat: "#28354A",
    coatShade: "#1A2332",
    shirt: "#D93829",
    tie: null,
    glasses: null,
    headset: true,
    lanyard: null,
    badge: "S$",
    ageLines: false,
    stubble: false,
    beard: false,
    gagProp: "red_cape_tip",
    isMain: true,
  },
  benedetto_vigna: {
    name: "Benedetto Vigna",
    role: "Ferrari CEO (Lookalike)",
    // Calibrated directly from Wikimedia Commons portrait:
    // Warm Mediterranean peach-tan skin, high receding sandy-silver swept hair + matching sandy-grey brows,
    // subtle outer-eye smile creases, frameless/rimless rectangular translucent glasses, tailored navy suit + Ferrari red tie.
    skin: "#F1CCB0",
    skinShade: "#D6AA89",
    hair: "#CEC5B4",
    hairHi: "#E7E1D5",
    browColor: "#A99D8C",
    hairStyle: "vigna_receding",
    coat: "#1B263B",
    coatShade: "#111827",
    shirt: "#FFFFFF",
    tie: "#D40000",
    glasses: "rimless_rect",
    lanyard: null,
    badge: "ferrari_pin",
    ageLines: true,
    stubble: false,
    beard: false,
    gagProp: null,
    isMain: true,
  },

  // 6 Extras
  guy_sheetrit: {
    name: "Guy Sheetrit (42)",
    role: "Laundering Partner",
    skin: "#DFB089",
    skinShade: "#BF8D65",
    hair: "#363332",
    hairHi: "#54504E",
    browColor: "#242221",
    hairStyle: "short_crop",
    coat: "#242830",
    coatShade: "#15181E",
    shirt: "#D9DDE3",
    tie: null,
    glasses: "shades",
    beard: true,
    ageLines: false,
    stubble: false,
    isMain: false,
  },
  ferrari_exec: {
    name: "Ferrari Manager",
    role: "Asked the Book Question",
    skin: "#F2CEB2",
    skinShade: "#D4AB8B",
    hair: "#3B2B22",
    hairHi: "#614738",
    browColor: "#3B2B22",
    hairStyle: "exec_part",
    coat: "#3A3E47",
    coatShade: "#25282E",
    shirt: "#F7F5F0",
    tie: "#1D1F26",
    glasses: null,
    beard: false,
    ageLines: false,
    stubble: true,
    isMain: false,
  },
  auditor_boss: {
    name: "Pet Food Auditor",
    role: "Dog Food Skit",
    skin: "#F5D7BC",
    skinShade: "#D7B496",
    hair: "#6B5A4E",
    hairHi: "#8C7869",
    browColor: "#5C4D42",
    hairStyle: "short_crop",
    coat: "#5E6873",
    coatShade: "#434B54",
    shirt: "#FFFFFF",
    tie: "#8E3B33",
    glasses: "rect",
    beard: false,
    ageLines: true,
    stubble: false,
    isMain: false,
  },
  hospital_admin: {
    name: "Hospital CFO",
    role: "Missouri / CA Victim",
    skin: "#D9A47D",
    skinShade: "#B8835C",
    hair: "#211E1C",
    hairHi: "#48423E",
    browColor: "#211E1C",
    hairStyle: "bob_bangs",
    coat: "#2A7B7B",
    coatShade: "#1B5656",
    shirt: "#FFFFFF",
    tie: null,
    glasses: null,
    badge: "MED",
    beard: false,
    ageLines: false,
    stubble: false,
    isMain: false,
  },
  arup_staff: {
    name: "Hong Kong Clerk",
    role: "Arup $25M Victim",
    skin: "#F0CCA9",
    skinShade: "#D1AA85",
    hair: "#16181E",
    hairHi: "#373C49",
    browColor: "#16181E",
    hairStyle: "short_crop",
    coat: "#4B5D75",
    coatShade: "#334052",
    shirt: "#FFFFFF",
    tie: null,
    glasses: "round",
    lanyard: "#00E5FF",
    beard: false,
    ageLines: false,
    stubble: false,
    isMain: false,
  },
  euro_police: {
    name: "UK / Spain Police",
    role: "November 2026 Arrest",
    skin: "#F4D6BC",
    skinShade: "#D6B395",
    hair: "#362B22",
    hairHi: "#5A483A",
    browColor: "#362B22",
    hairStyle: "short_crop",
    coat: "#1B2436",
    coatShade: "#0F1521",
    shirt: "#2C3E50",
    tie: null,
    glasses: null,
    badge: "POLICE",
    beard: false,
    ageLines: false,
    stubble: false,
    isMain: false,
  },
};

function drawSplayedHand(hx, hy, angleDeg = 0, sw = 2.0) {
  return `
    <g transform="translate(${hx.toFixed(1)}, ${hy.toFixed(1)}) rotate(${angleDeg})" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round">
      <line x1="0" y1="0" x2="8.5" y2="-5.5"/>
      <line x1="0" y1="0" x2="10.5" y2="-1.0"/>
      <line x1="0" y1="0" x2="9.5" y2="3.8"/>
      <line x1="0" y1="0" x2="4.5" y2="7.5"/>
    </g>
  `;
}

function drawHair(c, view, sw, ox) {
  const { hair, hairHi, hairStyle } = c;
  // Head center at (0, -204), rx=45, ry=42
  const cy = -204;
  if (view === "back") {
    if (hairStyle === "bob_bangs") {
      return `
        <path d="M -45 ${cy} C -47 ${cy - 48}, 47 ${cy - 48}, 45 ${cy} L 47 ${cy + 36} Q 0 ${cy + 42} -47 ${cy + 36} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -26 ${cy - 26} Q 0 ${cy - 36} 26 ${cy - 26}" fill="none" stroke="${hairHi}" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
      `;
    }
    if (hairStyle === "vigna_receding" || hairStyle === "receding_salt") {
      return `
        <path d="M -44 ${cy + 6} A 45 42 0 1 1 44 ${cy + 6} Q 0 ${cy + 14} -44 ${cy + 6} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
        <path d="M -24 ${cy - 22} Q 0 ${cy - 30} 24 ${cy - 22}" fill="none" stroke="${hairHi}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      `;
    }
    return `
      <circle cx="0" cy="${cy}" r="45" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
      <path d="M -26 ${cy - 26} Q 0 ${cy - 36} 26 ${cy - 26}" fill="none" stroke="${hairHi}" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
    `;
  }

  if (view === "side") {
    if (hairStyle === "vigna_receding") {
      // High forehead, receding brushed-back silver-sandy crown + back nape
      return `
        <path d="M -45 ${cy + 4} C -48 ${cy - 44}, 8 ${cy - 50}, 28 ${cy - 34} C 8 ${cy - 34}, -12 ${cy - 26}, -20 ${cy - 6} C -26 ${cy + 8}, -36 ${cy + 12}, -45 ${cy + 4} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -32 ${cy - 26} Q -6 ${cy - 38} 16 ${cy - 32}" fill="none" stroke="${hairHi}" stroke-width="2.5" stroke-linecap="round"/>
      `;
    }
    if (hairStyle === "bob_bangs") {
      return `
        <path d="M -46 ${cy - 2} C -48 ${cy - 48}, 22 ${cy - 50}, 36 ${cy - 22} C 16 ${cy - 24}, -4 ${cy - 18}, -10 ${cy + 30} L -45 ${cy + 32} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
      `;
    }
    return `
      <path d="M -45 ${cy + 2} C -48 ${cy - 48}, 22 ${cy - 52}, 38 ${cy - 22} C 16 ${cy - 28}, -8 ${cy - 22}, -18 ${cy - 4} C -28 ${cy + 6}, -38 ${cy + 8}, -45 ${cy + 2} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
      <path d="M -30 ${cy - 28} Q -2 ${cy - 38} 22 ${cy - 28}" fill="none" stroke="${hairHi}" stroke-width="2.5" stroke-linecap="round"/>
    `;
  }

  // Front & three_quarter
  const dx = ox * 0.45;
  if (hairStyle === "vigna_receding") {
    // Authentic Benedetto Vigna hairline: open high forehead, receding temples, swept sandy-silver top
    return `
      <g transform="translate(${dx.toFixed(1)}, 0)">
        <path d="M -45 ${cy - 4} C -48 ${cy - 46}, 48 ${cy - 46}, 45 ${cy - 4} C 40 ${cy - 18}, 28 ${cy - 28}, 12 ${cy - 30} Q 0 ${cy - 26} -12 ${cy - 30} C -28 ${cy - 28}, -40 ${cy - 18}, -45 ${cy - 4} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -22 ${cy - 35} Q 0 ${cy - 42} 22 ${cy - 35}" fill="none" stroke="${hairHi}" stroke-width="2.6" stroke-linecap="round"/>
      </g>
    `;
  }
  if (hairStyle === "receding_salt") {
    // Sharon Hazan (54): prominent M-receding temples + salt-and-pepper tufts
    return `
      <g transform="translate(${dx.toFixed(1)}, 0)">
        <path d="M -45 ${cy - 2} C -47 ${cy - 42}, 47 ${cy - 42}, 45 ${cy - 2} C 39 ${cy - 16}, 30 ${cy - 30}, 14 ${cy - 26} Q 0 ${cy - 20} -14 ${cy - 26} C -30 ${cy - 30}, -39 ${cy - 16}, -45 ${cy - 2} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -20 ${cy - 33} Q 0 ${cy - 39} 20 ${cy - 33}" fill="none" stroke="${hairHi}" stroke-width="2.4" stroke-linecap="round"/>
      </g>
    `;
  }
  if (hairStyle === "bob_bangs") {
    return `
      <g>
        <path d="M -46 ${cy - 4} C -48 ${cy - 48}, 48 ${cy - 48}, 46 ${cy - 4} C 32 ${cy - 20}, 12 ${cy - 22}, ${dx + 4} ${cy - 29} C ${dx - 8} ${cy - 20}, -30 ${cy - 18}, -46 ${cy - 4} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -22 ${cy - 32} Q 0 ${cy - 40} 22 ${cy - 32}" fill="none" stroke="${hairHi}" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    `;
  }
  if (hairStyle === "slick_undercut") {
    return `
      <g transform="translate(${dx.toFixed(1)}, 0)">
        <path d="M -44 ${cy - 12} C -44 ${cy - 52}, 46 ${cy - 52}, 44 ${cy - 12} C 28 ${cy - 24}, -16 ${cy - 28}, -44 ${cy - 12} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -20 ${cy - 36} Q 4 ${cy - 44} 28 ${cy - 32}" fill="none" stroke="${hairHi}" stroke-width="2.6" stroke-linecap="round"/>
      </g>
    `;
  }
  if (hairStyle === "exec_part") {
    return `
      <g transform="translate(${dx.toFixed(1)}, 0)">
        <path d="M -45 ${cy - 8} C -46 ${cy - 48}, 46 ${cy - 48}, 45 ${cy - 8} C 30 ${cy - 20}, 14 ${cy - 24}, 6 ${cy - 33} C -2 ${cy - 21}, -26 ${cy - 19}, -45 ${cy - 8} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
        <path d="M -24 ${cy - 32} Q -4 ${cy - 40} 12 ${cy - 35}" fill="none" stroke="${hairHi}" stroke-width="2.4" stroke-linecap="round"/>
      </g>
    `;
  }
  // short_crop
  return `
    <g transform="translate(${dx.toFixed(1)}, 0)">
      <path d="M -45 ${cy - 10} C -45 ${cy - 48}, 45 ${cy - 48}, 45 ${cy - 10} Q 0 ${cy - 23} -45 ${cy - 10} Z" fill="${hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
      <path d="M -22 ${cy - 33} Q 0 ${cy - 40} 22 ${cy - 33}" fill="none" stroke="${hairHi}" stroke-width="2.4" stroke-linecap="round"/>
    </g>
  `;
}

function drawBackHairBehindHead(c, view, sw) {
  if (c.hairStyle !== "bob_bangs" || view === "back") return "";
  const cy = -204;
  if (view === "side") {
    return `<path d="M -42 ${cy - 8} L -47 ${cy + 34} Q -30 ${cy + 40} -18 ${cy + 28} Z" fill="${c.hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  }
  return `
    <path d="M -43 ${cy - 6} L -48 ${cy + 34} Q -34 ${cy + 42} -24 ${cy + 32} Z" fill="${c.hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
    <path d="M 43 ${cy - 6} L 48 ${cy + 34} Q 34 ${cy + 42} 24 ${cy + 32} Z" fill="${c.hair}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
  `;
}

function drawFace(c, view, expression, mouthShape, isBlinking, sw) {
  if (view === "back") return "";
  const HEAD_R = 45;
  const cy = -204;
  // Rim-hugging 3/4 shift (+0.38R), side (+0.50R)
  const ox = view === "three_quarter" ? 0.38 * HEAD_R : view === "side" ? 0.50 * HEAD_R : 0;
  const eyeSpan = view === "three_quarter" ? 11.2 : 13.8;
  const lx = ox - eyeSpan;
  const rx = ox + eyeSpan;
  const showLeft = view !== "side";
  const eyeY = cy + 2; // -202
  const browY = cy - 13; // -217
  const mouthY = cy + 22; // -182

  // 1. Subtle chin stubble wash & full beard & elder eye lines
  let facialAccents = "";
  if (c.stubble) {
    facialAccents += `<path d="M -38 ${cy + 14} A 45 42 0 0 0 38 ${cy + 14} Q 0 ${cy + 20} -38 ${cy + 14} Z" fill="#000000" opacity="0.16"/>`;
  }
  if (c.beard) {
    facialAccents += `<path d="M ${ox - 34} ${cy + 10} C ${ox - 30} ${cy + 44}, ${ox + 30} ${cy + 44}, ${ox + 34} ${cy + 10} Q ${ox} ${cy + 20} ${ox - 34} ${cy + 10} Z" fill="${c.hair}" stroke="${PALETTE.ink}" stroke-width="${sw * 0.8}"/>`;
  }
  if (c.ageLines) {
    facialAccents += `
      ${showLeft ? `<path d="M ${lx - 9} ${eyeY - 2} Q ${lx - 13} ${eyeY + 1} ${lx - 10} ${eyeY + 4}" fill="none" stroke="${c.skinShade}" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>` : ""}
      <path d="M ${rx + 9} ${eyeY - 2} Q ${rx + 13} ${eyeY + 1} ${rx + 10} ${eyeY + 4}" fill="none" stroke="${c.skinShade}" stroke-width="1.6" stroke-linecap="round" opacity="0.75"/>
    `;
  }

  // 2. Eyes & Brows (hair-matched brows!)
  let eyesSvg = "";
  let browsSvg = "";
  const bc = c.browColor || c.hair;

  if (isBlinking) {
    eyesSvg = `
      ${showLeft ? `<line x1="${lx - 4.5}" y1="${eyeY}" x2="${lx + 4.5}" y2="${eyeY}" stroke="${PALETTE.ink}" stroke-width="2.2" stroke-linecap="round"/>` : ""}
      <line x1="${rx - 4.5}" y1="${eyeY}" x2="${rx + 4.5}" y2="${eyeY}" stroke="${PALETTE.ink}" stroke-width="2.2" stroke-linecap="round"/>
    `;
  } else if (expression === "worried" || expression === "surprised" || expression === "manic") {
    const rSclera = expression === "manic" ? 7.2 : 6.0;
    eyesSvg = `
      ${showLeft ? `<circle cx="${lx}" cy="${eyeY}" r="${rSclera}" fill="#FFFFFF" stroke="${PALETTE.ink}" stroke-width="2.0"/><circle cx="${lx}" cy="${eyeY}" r="2.3" fill="${PALETTE.ink}"/>` : ""}
      <circle cx="${rx}" cy="${eyeY}" r="${rSclera}" fill="#FFFFFF" stroke="${PALETTE.ink}" stroke-width="2.0"/><circle cx="${rx}" cy="${eyeY}" r="2.3" fill="${PALETTE.ink}"/>
    `;
  } else if (expression === "deadpan") {
    eyesSvg = `
      ${showLeft ? `
        <ellipse cx="${lx}" cy="${eyeY + 1}" rx="3.8" ry="4.4" fill="${PALETTE.ink}"/>
        <path d="M ${lx - 4.8} ${eyeY - 4} H ${lx + 4.8} V ${eyeY} H ${lx - 4.8} Z" fill="${c.skin}"/>
        <line x1="${lx - 4.8}" y1="${eyeY}" x2="${lx + 4.8}" y2="${eyeY}" stroke="${PALETTE.ink}" stroke-width="2.0" stroke-linecap="round"/>
      ` : ""}
      <ellipse cx="${rx}" cy="${eyeY + 1}" rx="3.8" ry="4.4" fill="${PALETTE.ink}"/>
      <path d="M ${rx - 4.8} ${eyeY - 4} H ${rx + 4.8} V ${eyeY} H ${rx - 4.8} Z" fill="${c.skin}"/>
      <line x1="${rx - 4.8}" y1="${eyeY}" x2="${rx + 4.8}" y2="${eyeY}" stroke="${PALETTE.ink}" stroke-width="2.0" stroke-linecap="round"/>
    `;
  } else {
    // Normal / Happy / Angry: solid vertical oval with crisp white upper-left catchlight dot
    eyesSvg = `
      ${showLeft ? `
        <ellipse cx="${lx}" cy="${eyeY}" rx="3.6" ry="5.0" fill="${PALETTE.ink}"/>
        <circle cx="${lx - 1.1}" cy="${eyeY - 1.7}" r="1.2" fill="#FFFFFF"/>
      ` : ""}
      <ellipse cx="${rx}" cy="${eyeY}" rx="3.6" ry="5.0" fill="${PALETTE.ink}"/>
      <circle cx="${rx - 1.1}" cy="${eyeY - 1.7}" r="1.2" fill="#FFFFFF"/>
    `;
  }

  // Brows per expression
  if (expression === "angry") {
    browsSvg = `
      ${showLeft ? `<line x1="${lx - 6}" y1="${browY - 3}" x2="${lx + 6}" y2="${browY + 2}" stroke="${bc}" stroke-width="2.6" stroke-linecap="round"/>` : ""}
      <line x1="${rx - 6}" y1="${browY + 2}" x2="${rx + 6}" y2="${browY - 3}" stroke="${bc}" stroke-width="2.6" stroke-linecap="round"/>
    `;
  } else if (expression === "worried") {
    browsSvg = `
      ${showLeft ? `<path d="M ${lx - 6} ${browY + 1} Q ${lx} ${browY - 4} ${lx + 6} ${browY - 2}" fill="none" stroke="${bc}" stroke-width="2.4" stroke-linecap="round"/>` : ""}
      <path d="M ${rx - 6} ${browY - 2} Q ${rx} ${browY - 4} ${rx + 6} ${browY + 1}" fill="none" stroke="${bc}" stroke-width="2.4" stroke-linecap="round"/>
    `;
  } else if (expression === "deadpan") {
    browsSvg = `
      ${showLeft ? `<line x1="${lx - 6}" y1="${browY}" x2="${lx + 6}" y2="${browY}" stroke="${bc}" stroke-width="2.5" stroke-linecap="round"/>` : ""}
      <line x1="${rx - 6}" y1="${browY}" x2="${rx + 6}" y2="${browY}" stroke="${bc}" stroke-width="2.5" stroke-linecap="round"/>
    `;
  } else if (expression === "surprised" || expression === "manic") {
    browsSvg = `
      ${showLeft ? `<path d="M ${lx - 6} ${browY - 1} Q ${lx} ${browY - 7} ${lx + 6} ${browY - 1}" fill="none" stroke="${bc}" stroke-width="2.4" stroke-linecap="round"/>` : ""}
      <path d="M ${rx - 6} ${browY - 1} Q ${rx} ${browY - 7} ${rx + 6} ${browY - 1}" fill="none" stroke="${bc}" stroke-width="2.4" stroke-linecap="round"/>
    `;
  } else {
    browsSvg = `
      ${showLeft ? `<path d="M ${lx - 6} ${browY} Q ${lx} ${browY - 3} ${lx + 6} ${browY}" fill="none" stroke="${bc}" stroke-width="2.4" stroke-linecap="round"/>` : ""}
      <path d="M ${rx - 6} ${browY} Q ${rx} ${browY - 3} ${rx + 6} ${browY}" fill="none" stroke="${bc}" stroke-width="2.4" stroke-linecap="round"/>
    `;
  }

  // 3. 6 Active Mouth Shapes (driven by mouthShape 0..5 or expression defaults)
  const mx = ox;
  let mouthSvg = "";
  const effectiveMouth = mouthShape !== null ? mouthShape : expression;
  const lipCol = c.beard ? "#E8CFC0" : PALETTE.ink;

  if (expression === "manic") {
    mouthSvg = `
      <path d="M ${mx - 15} ${mouthY - 4} Q ${mx} ${mouthY - 1} ${mx + 15} ${mouthY - 4} C ${mx + 15} ${mouthY + 10}, ${mx - 15} ${mouthY + 10}, ${mx - 15} ${mouthY - 4} Z" fill="#FFFFFF" stroke="${PALETTE.ink}" stroke-width="2.0"/>
      <line x1="${mx - 13}" y1="${mouthY + 2}" x2="${mx + 13}" y2="${mouthY + 2}" stroke="${PALETTE.ink}" stroke-width="1.3"/>
      <line x1="${mx - 5}" y1="${mouthY - 3}" x2="${mx - 5}" y2="${mouthY + 7}" stroke="${PALETTE.ink}" stroke-width="1.2"/>
      <line x1="${mx + 5}" y1="${mouthY - 3}" x2="${mx + 5}" y2="${mouthY + 7}" stroke="${PALETTE.ink}" stroke-width="1.2"/>
    `;
  } else if (effectiveMouth === 3 || effectiveMouth === "happy") {
    // White-filled D-shape smile
    mouthSvg = `<path d="M ${mx - 10} ${mouthY - 2} H ${mx + 10} C ${mx + 9} ${mouthY + 9}, ${mx - 9} ${mouthY + 9}, ${mx - 10} ${mouthY - 2} Z" fill="#FFFFFF" stroke="${PALETTE.ink}" stroke-width="2.0" stroke-linejoin="round"/>`;
  } else if (effectiveMouth === 4 || effectiveMouth === "surprised") {
    // Small dark 'o'
    mouthSvg = `<ellipse cx="${mx}" cy="${mouthY + 1}" rx="4.5" ry="5.5" fill="#2A1414" stroke="${lipCol}" stroke-width="1.8"/>`;
  } else if (effectiveMouth === 5) {
    // Wide open 'ah' with subtle pink tongue hint
    mouthSvg = `
      <ellipse cx="${mx}" cy="${mouthY + 2}" rx="7.5" ry="7.2" fill="#2A1414" stroke="${lipCol}" stroke-width="1.9"/>
      <path d="M ${mx - 4.5} ${mouthY + 6.5} Q ${mx} ${mouthY + 3.5} ${mx + 4.5} ${mouthY + 6.5} Q ${mx} ${mouthY + 9} ${mx - 4.5} ${mouthY + 6.5} Z" fill="#D46A78"/>
    `;
  } else if (effectiveMouth === 2 || effectiveMouth === "worried") {
    // Worried wavy squiggle
    mouthSvg = `<path d="M ${mx - 9} ${mouthY + 1} Q ${mx - 4.5} ${mouthY - 2.5} ${mx} ${mouthY + 1} T ${mx + 9} ${mouthY + 1}" fill="none" stroke="${lipCol}" stroke-width="2.1" stroke-linecap="round"/>`;
  } else if (effectiveMouth === 1 || effectiveMouth === "deadpan" || effectiveMouth === "angry") {
    // Flat deadpan dash (or subtle frown if angry)
    mouthSvg = effectiveMouth === "angry"
      ? `<path d="M ${mx - 8} ${mouthY + 3} Q ${mx} ${mouthY - 2} ${mx + 8} ${mouthY + 3}" fill="none" stroke="${lipCol}" stroke-width="2.2" stroke-linecap="round"/>`
      : `<line x1="${mx - 8}" y1="${mouthY}" x2="${mx + 8}" y2="${mouthY}" stroke="${lipCol}" stroke-width="2.2" stroke-linecap="round"/>`;
  } else {
    // Thin curved smile (0 / neutral)
    mouthSvg = `<path d="M ${mx - 8} ${mouthY - 1} Q ${mx} ${mouthY + 5} ${mx + 8} ${mouthY - 1}" fill="none" stroke="${lipCol}" stroke-width="2.1" stroke-linecap="round"/>`;
  }

  // 4. Glasses (translucent lenses + angled temple arms; Benedetto Vigna gets authentic RIMLESS translucent glasses!)
  let glassesSvg = "";
  if (c.glasses === "rimless_rect") {
    glassesSvg = view === "side"
      ? `
        <rect x="${rx - 8}" y="${eyeY - 6}" width="16" height="11.5" rx="2" fill="rgba(255,255,255,0.26)" stroke="#92A1B0" stroke-width="1.0"/>
        <line x1="${rx - 8}" y1="${eyeY - 2}" x2="-10" y2="${eyeY - 6}" stroke="#495463" stroke-width="1.7"/>
      `
      : `
        <rect x="${lx - 8.5}" y="${eyeY - 6}" width="17" height="11.5" rx="2" fill="rgba(255,255,255,0.26)" stroke="#92A1B0" stroke-width="1.0"/>
        <rect x="${rx - 8.5}" y="${eyeY - 6}" width="17" height="11.5" rx="2" fill="rgba(255,255,255,0.26)" stroke="#92A1B0" stroke-width="1.0"/>
        <path d="M ${lx + 8.5} ${eyeY - 1.5} Q ${ox} ${eyeY - 3.5} ${rx - 8.5} ${eyeY - 1.5}" fill="none" stroke="#495463" stroke-width="1.6"/>
        <line x1="${lx - 8.5}" y1="${eyeY - 2}" x2="-43" y2="${eyeY - 6}" stroke="#495463" stroke-width="1.6"/>
        ${view === "front" ? `<line x1="${rx + 8.5}" y1="${eyeY - 2}" x2="43" y2="${eyeY - 6}" stroke="#495463" stroke-width="1.6"/>` : ""}
      `;
  } else if (c.glasses === "rect") {
    glassesSvg = view === "side"
      ? `
        <rect x="${rx - 8}" y="${eyeY - 6}" width="16" height="12" rx="2.5" fill="rgba(255,255,255,0.20)" stroke="${PALETTE.ink}" stroke-width="1.8"/>
        <line x1="${rx - 8}" y1="${eyeY - 1}" x2="-12" y2="${eyeY - 5}" stroke="${PALETTE.ink}" stroke-width="1.6"/>
      `
      : `
        <rect x="${lx - 8.5}" y="${eyeY - 6}" width="17" height="12" rx="2.5" fill="rgba(255,255,255,0.20)" stroke="${PALETTE.ink}" stroke-width="1.8"/>
        <rect x="${rx - 8.5}" y="${eyeY - 6}" width="17" height="12" rx="2.5" fill="rgba(255,255,255,0.20)" stroke="${PALETTE.ink}" stroke-width="1.8"/>
        <path d="M ${lx + 8.5} ${eyeY - 1} Q ${ox} ${eyeY - 3} ${rx - 8.5} ${eyeY - 1}" fill="none" stroke="${PALETTE.ink}" stroke-width="1.7"/>
        <line x1="${lx - 8.5}" y1="${eyeY - 1}" x2="-43" y2="${eyeY - 5}" stroke="${PALETTE.ink}" stroke-width="1.6"/>
        ${view === "front" ? `<line x1="${rx + 8.5}" y1="${eyeY - 1}" x2="43" y2="${eyeY - 5}" stroke="${PALETTE.ink}" stroke-width="1.6"/>` : ""}
      `;
  } else if (c.glasses === "round") {
    glassesSvg = view === "side"
      ? `
        <circle cx="${rx}" cy="${eyeY}" r="8.5" fill="rgba(255,255,255,0.20)" stroke="${PALETTE.ink}" stroke-width="1.8"/>
        <line x1="${rx - 8.5}" y1="${eyeY - 1}" x2="-14" y2="${eyeY - 5}" stroke="${PALETTE.ink}" stroke-width="1.6"/>
      `
      : `
        <circle cx="${lx}" cy="${eyeY}" r="8.5" fill="rgba(255,255,255,0.20)" stroke="${PALETTE.ink}" stroke-width="1.8"/>
        <circle cx="${rx}" cy="${eyeY}" r="8.5" fill="rgba(255,255,255,0.20)" stroke="${PALETTE.ink}" stroke-width="1.8"/>
        <path d="M ${lx + 8.5} ${eyeY - 1} Q ${ox} ${eyeY - 3} ${rx - 8.5} ${eyeY - 1}" fill="none" stroke="${PALETTE.ink}" stroke-width="1.7"/>
        <line x1="${lx - 8.5}" y1="${eyeY - 1}" x2="-43" y2="${eyeY - 5}" stroke="${PALETTE.ink}" stroke-width="1.6"/>
        ${view === "front" ? `<line x1="${rx + 8.5}" y1="${eyeY - 1}" x2="43" y2="${eyeY - 5}" stroke="${PALETTE.ink}" stroke-width="1.6"/>` : ""}
      `;
  } else if (c.glasses === "shades") {
    glassesSvg = view === "side"
      ? `<rect x="${rx - 9}" y="${eyeY - 6}" width="18" height="12.5" rx="3.5" fill="#141414" stroke="#141414" stroke-width="1.5"/><line x1="${rx - 5}" y1="${eyeY - 2}" x2="${rx + 3}" y2="${eyeY - 2}" stroke="#FFFFFF" stroke-width="1.6" opacity="0.45"/>`
      : `
        <rect x="${lx - 9.5}" y="${eyeY - 6}" width="19" height="12.5" rx="3.5" fill="#141414"/>
        <rect x="${rx - 9.5}" y="${eyeY - 6}" width="19" height="12.5" rx="3.5" fill="#141414"/>
        <line x1="${lx + 9}" y1="${eyeY - 1}" x2="${rx - 9}" y2="${eyeY - 1}" stroke="#141414" stroke-width="2.5"/>
        <line x1="${lx - 5}" y1="${eyeY - 2}" x2="${lx + 2}" y2="${eyeY - 2}" stroke="#FFFFFF" stroke-width="1.5" opacity="0.45"/>
        <line x1="${rx - 5}" y1="${eyeY - 2}" x2="${rx + 2}" y2="${eyeY - 2}" stroke="#FFFFFF" stroke-width="1.5" opacity="0.45"/>
        <line x1="${lx - 9}" y1="${eyeY - 1}" x2="-43" y2="${eyeY - 5}" stroke="#141414" stroke-width="1.8"/>
      `;
  }

  // 5. Extra emotion symbol (sweat drop on worried / manic)
  const emotionMark = (expression === "worried" || expression === "manic")
    ? `<path d="M ${ox - 30} ${cy - 18} C ${ox - 34} ${cy - 10}, ${ox - 34} ${cy - 4}, ${ox - 30} ${cy - 4} C ${ox - 26} ${cy - 4}, ${ox - 26} ${cy - 10}, ${ox - 30} ${cy - 18} Z" fill="#6ED4FF" stroke="${PALETTE.ink}" stroke-width="1.6"/>`
    : "";

  return `${facialAccents}${eyesSvg}${browsSvg}${glassesSvg}${mouthSvg}${emotionMark}`;
}

/**
 * Renders an upgraded v2 stick-figure rooted at feet (x, y).
 * Base height ~246px -> scale=2.05 yields ~505px figure in 1920x1080!
 */
export function renderStickChar({
  charId = "accountant",
  x = 0,
  y = 0,
  scale = 2.05,
  view = "front",
  mirror = false,
  expression = "neutral",
  pose = "idle",
  mouthShape = null,
  isBlinking = false,
  walkPhase = 0,
  headTiltDeg = 0,
  torsoLeanDeg = 0,
  holoMode = false,
  lawyerMode = false,
  uid = "c",
}) {
  const baseC = CAST_SPECS[charId] || CAST_SPECS.accountant;
  const c = lawyerMode && charId === "fake_ceo_lawyer"
    ? { ...baseC, coat: "#2B2D3A", coatShade: "#1A1B24", tie: "#B02E2E", badge: "LAW", pinstripe: true }
    : baseC;

  const sw = 2.55; // proportional ~5.2px at scale=2.05
  const flip = mirror ? -1 : 1;
  const HEAD_R = 45;
  const ox = view === "three_quarter" ? 0.38 * HEAD_R : view === "side" ? 0.50 * HEAD_R : 0;

  // Tapered Pear/Bell Torso (shoulders +-22.5 = 0.50x head, hips +-35 = 0.78x head)
  const torsoPath = `
    M -22.5 -162
    C -29 -130, -35 -95, -34 -72
    C -32 -59,  32 -59,  34 -72
    C  35 -95,  29 -130, 22.5 -162
    Q   0 -158, -22.5 -162 Z
  `;

  // Legs (24.4% height = 60px, shoeless tapered black stick strokes + articulated 2-segment walk)
  let legsSvg = "";
  let walkBobY = 0;
  let walkLean = 0;
  if (pose === "walk") {
    walkBobY = -Math.abs(Math.sin(walkPhase)) * 5.5;
    walkLean = 6.5;
    const legPath = (hipX, ph) => {
      const s = Math.sin(ph);
      const cs = Math.cos(ph);
      const fx = hipX + s * 21;
      const fy = 0 - Math.max(0, cs) * 9;
      // Forward knee flex proportional to forward position so legs never cross
      const kx = (hipX + fx) * 0.5 + (s >= 0 ? 7.0 : 3.5);
      const ky = (-60 + fy) * 0.5 - 2;
      return `M ${hipX} -60 Q ${kx.toFixed(1)} ${ky.toFixed(1)} ${fx.toFixed(1)} ${fy.toFixed(1)}`;
    };
    const hipOff = view === "side" ? 1.5 : 5.5;
    legsSvg = `
      <path d="${legPath(-hipOff, walkPhase)}" fill="none" stroke="${PALETTE.ink}" stroke-width="3.2" stroke-linecap="round"/>
      <path d="${legPath(hipOff, walkPhase + Math.PI)}" fill="none" stroke="${PALETTE.ink}" stroke-width="3.2" stroke-linecap="round"/>
    `;
  } else {
    legsSvg = `
      <line x1="-6" y1="-60" x2="-6" y2="0" stroke="${PALETTE.ink}" stroke-width="3.2" stroke-linecap="round"/>
      <line x1="6"  y1="-60" x2="6"  y2="0" stroke="${PALETTE.ink}" stroke-width="3.2" stroke-linecap="round"/>
    `;
  }

  // Arms & 4-finger Splayed Black Stick Hands (ZERO circular pads!)
  let armsSvg = "";
  if (pose === "talking") {
    armsSvg = `
      <path d="M -23 -150 Q -36 -118 -27 -88" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(-27, -88, 105, 1.9)}
      <path d="M 23 -150 Q 52 -136 62 -118" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(62, -118, -28, 2.0)}
    `;
  } else if (pose === "pointing") {
    armsSvg = `
      <path d="M -23 -150 Q -32 -116 -24 -86" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(-24, -86, 100, 1.9)}
      <path d="M 23 -150 L 68 -164" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(68, -164, -18, 2.0)}
    `;
  } else if (pose === "holding_phone") {
    armsSvg = `
      <path d="M -23 -150 Q -32 -118 -23 -88" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(-23, -88, 100, 1.8)}
      <path d="M 23 -150 Q 48 -134 52 -156" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      <rect x="46" y="-178" width="16" height="27" rx="3" fill="#18202C" stroke="${PALETTE.ink}" stroke-width="2.1"/>
      <rect x="49" y="-173" width="10" height="17" rx="1" fill="${PALETTE.cyan}"/>
      ${drawSplayedHand(52, -156, -80, 1.8)}
    `;
  } else if (pose === "holding_book") {
    armsSvg = `
      <path d="M -23 -150 Q -42 -128 -26 -112" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      <path d="M 23 -150 Q 52 -128 36 -114" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      <rect x="6" y="-132" width="32" height="24" rx="2.5" fill="#9E2A2B" stroke="${PALETTE.ink}" stroke-width="2.1"/>
      <rect x="10" y="-128" width="24" height="6" rx="1" fill="#F6F3EC"/>
      ${drawSplayedHand(36, -114, -145, 1.8)}
    `;
  } else if (pose === "switching_mask") {
    armsSvg = `
      <path d="M -23 -150 Q -48 -134 -52 -152" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      <!-- Held Glowing AI Mask -->
      <ellipse cx="-58" cy="-170" rx="18" ry="21" fill="#182A3E" stroke="${PALETTE.cyan}" stroke-width="2.4"/>
      <line x1="-65" y1="-175" x2="-60" y2="-175" stroke="${PALETTE.cyan}" stroke-width="2.2"/>
      <line x1="-54" y1="-175" x2="-49" y2="-175" stroke="${PALETTE.cyan}" stroke-width="2.2"/>
      <path d="M -64 -161 Q -58 -156 -52 -161" fill="none" stroke="${PALETTE.cyan}" stroke-width="2.0"/>
      ${drawSplayedHand(-52, -152, -110, 1.8)}
      <path d="M 23 -150 Q 48 -126 56 -146" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(56, -146, -45, 1.9)}
    `;
  } else if (pose === "walk") {
    const swing = Math.sin(walkPhase) * 18;
    armsSvg = `
      <path d="M -22 -150 Q ${(-30 - swing * 0.6).toFixed(1)} -124 ${(-26 - swing).toFixed(1)} -96" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(-26 - swing, -96, 95, 1.8)}
      <path d="M 22 -150 Q ${(30 + swing * 0.6).toFixed(1)} -124 ${(28 + swing).toFixed(1)} -96" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(28 + swing, -96, 85, 1.8)}
    `;
  } else {
    // idle: tucked gracefully along/inside torso curve
    armsSvg = `
      <path d="M -21 -150 Q -31 -120 -24 -88" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(-24, -88, 100, 1.7)}
      <path d="M 21 -150 Q 31 -120 24 -88" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round"/>
      ${drawSplayedHand(24, -88, 80, 1.7)}
    `;
  }

  // Running-gag / accessory props
  const runningGagSvg = c.gagProp === "boxing_tag"
    ? `<g transform="translate(${view === "back" ? -14 : 18}, -84) rotate(14)"><circle cx="0" cy="0" r="6.5" fill="#D93829" stroke="${PALETTE.ink}" stroke-width="1.6"/><rect x="-3" y="4" width="6" height="4" fill="#FFFFFF" stroke="${PALETTE.ink}" stroke-width="1.2"/></g>`
    : c.gagProp === "red_cape_tip" && (view === "back" || view === "side" || view === "three_quarter")
    ? `<path d="M -18 -155 L -34 -78 L -14 -72 Z" fill="#D93829" stroke="${PALETTE.ink}" stroke-width="1.8" opacity="0.92"/>`
    : "";

  const totalLean = torsoLeanDeg + walkLean;

  return `
    <g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)}) scale(${(scale * flip).toFixed(3)}, ${scale.toFixed(3)})">
      <defs>
        <clipPath id="tClip_${uid}"><path d="${torsoPath}"/></clipPath>
        <clipPath id="hClip_${uid}"><ellipse cx="0" cy="-204" rx="45" ry="42"/></clipPath>
      </defs>

      <!-- Soft Ground Ellipse Shadow -->
      <ellipse cx="4" cy="0" rx="34" ry="7.2" fill="#000000" opacity="0.30"/>

      <g transform="translate(0, ${walkBobY.toFixed(1)})">
        ${legsSvg}

        <!-- Torso + Head Group (sways softly from hips/feet anchor) -->
        <g transform="rotate(${totalLean.toFixed(2)}, 0, -60)">
          ${runningGagSvg}

          <!-- Tapered Pear/Bell Torso + Dark Curved Pants Bowl -->
          <path d="${torsoPath}" fill="${c.coat}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
          <g clip-path="url(#tClip_${uid})">
            ${c.pinstripe ? `<g stroke="#FFFFFF" stroke-width="0.9" opacity="0.16"><line x1="-18" y1="-162" x2="-24" y2="-68"/><line x1="-8" y1="-162" x2="-10" y2="-68"/><line x1="8" y1="-162" x2="10" y2="-68"/><line x1="18" y1="-162" x2="24" y2="-68"/></g>` : ""}
            <!-- Subtle Cel Garment Shade on Right -->
            <path d="M 14 -164 C 24 -120, 26 -86, 12 -68 L 40 -68 L 40 -164 Z" fill="${c.coatShade}" opacity="0.52"/>
            <!-- Curved Dark Pants Bowl Cap (17% of torso) -->
            <path d="M -38 -78 Q 0 -70 38 -78 L 38 -52 L -38 -52 Z" fill="#1D1F26" stroke="${PALETTE.ink}" stroke-width="2.1"/>

            ${view !== "back" ? `
              <!-- Shirt V & Collar / Tie / Lanyard / Pin -->
              ${c.tie ? `
                <polygon points="-11,-162 11,-162 0,-128" fill="${c.shirt}" stroke="${PALETTE.ink}" stroke-width="1.8" stroke-linejoin="round"/>
                <polygon points="-3.6,-157 3.6,-157 5.2,-124 0,-115 -5.2,-124" fill="${c.tie}" stroke="${PALETTE.ink}" stroke-width="1.5"/>
                <path d="M -13 -161 L -20 -138 L -5 -130" fill="none" stroke="${PALETTE.ink}" stroke-width="1.9" stroke-linejoin="round"/>
                <path d="M 13 -161 L 20 -138 L 5 -130" fill="none" stroke="${PALETTE.ink}" stroke-width="1.9" stroke-linejoin="round"/>
              ` : `
                <path d="M -12 -162 Q 0 -150 12 -162" fill="${c.shirt}" stroke="${PALETTE.ink}" stroke-width="1.9"/>
                <path d="M -10 -156 Q 0 -148 10 -156" fill="none" stroke="${PALETTE.ink}" stroke-width="1.2" opacity="0.55"/>
              `}
              ${c.lanyard ? `
                <path d="M -10 -161 L 0 -122 L 10 -161" fill="none" stroke="${c.lanyard}" stroke-width="2.2"/>
                <rect x="-8" y="-122" width="16" height="19" rx="2" fill="#F6F3EC" stroke="${PALETTE.ink}" stroke-width="1.6"/>
                <circle cx="0" cy="-115" r="3" fill="${c.skin}"/>
              ` : ""}
              ${c.badge === "ferrari_pin" ? `
                <path d="M 12 -140 L 18 -140 L 17 -133 L 15 -131 L 13 -133 Z" fill="#F7D02C" stroke="${PALETTE.ink}" stroke-width="1.1"/>
              ` : c.badge && c.badge !== "POLICE" ? `
                <rect x="8" y="-126" width="19" height="10" rx="2" fill="#F6F3EC" stroke="${PALETTE.ink}" stroke-width="1.4"/>
              ` : ""}
            ` : `
              <line x1="0" y1="-156" x2="0" y2="-76" stroke="${c.coatShade}" stroke-width="2.0"/>
              ${c.badge === "POLICE" ? `<text x="0" y="-118" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="11" fill="#F2C14E">POLICE</text>` : ""}
            `}
          </g>
          <path d="${torsoPath}" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>

          <!-- Arms behind/over torso -->
          ${armsSvg}

          <!-- Large Round Head (NO neck, NO nose, NO ears!) -->
          <g transform="rotate(${headTiltDeg.toFixed(2)}, 0, -162)">
            ${drawBackHairBehindHead(c, view, sw)}
            <ellipse cx="0" cy="-204" rx="45" ry="42" fill="${c.skin}"/>
            <!-- Subtle ~10% Cel Shade Crescent (bottom-right) -->
            <g clip-path="url(#hClip_${uid})">
              <path d="M 28 -244 A 46 43 0 0 1 -36 -166 A 48 44 0 0 0 42 -218 Z" fill="${c.skinShade}" opacity="0.65"/>
              ${holoMode ? `<rect x="-46" y="-248" width="92" height="88" fill="${PALETTE.cyan}" opacity="0.22"/><path d="M -45 -220 H 45 M -45 -204 H 45 M -45 -188 H 45 M -20 -246 V -162 M 0 -246 V -162 M 20 -246 V -162" stroke="${PALETTE.cyan}" stroke-width="1.2" opacity="0.55"/>` : ""}
            </g>
            <!-- Crisp Ink Head Outline -->
            <ellipse cx="0" cy="-204" rx="45" ry="42" fill="none" stroke="${holoMode ? PALETTE.cyan : PALETTE.ink}" stroke-width="${sw}"/>
            ${drawFace(c, view, expression, mouthShape, isBlinking, sw)}
            ${drawHair(c, view, sw, ox)}
            ${c.headset && view !== "back" ? `
              <path d="M -44 -204 A 45 45 0 0 1 0 -249" fill="none" stroke="#181B22" stroke-width="3.2"/>
              <ellipse cx="-44" cy="-202" rx="4.5" ry="8" fill="#2A303C" stroke="${PALETTE.ink}" stroke-width="1.6"/>
              <path d="M -42 -196 Q -28 -186 -15 -184" fill="none" stroke="#181B22" stroke-width="1.8"/>
              <circle cx="-14" cy="-184" r="2.4" fill="${PALETTE.crimson}"/>
            ` : ""}
          </g>
        </g>
      </g>
    </g>
  `;
}

/**
 * Hero Object: Glowing Dual-Face AI Puppet Mask on Strings (#00E5FF cyan glow + #D93829 stamp)
 */
export function renderHeroMaskObject({ x = 0, y = 0, scale = 1, uid = "hm", pulse = 0 }) {
  const glowR = 135 + Math.sin(pulse) * 8;
  return `
    <g transform="translate(${x}, ${y}) scale(${scale})">
      <defs>
        <radialGradient id="hmGlow_${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${PALETTE.cyan}" stop-opacity="0.72"/>
          <stop offset="55%" stop-color="${PALETTE.cyan}" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="${PALETTE.cyan}" stop-opacity="0"/>
        </radialGradient>
        <clipPath id="hmRight_${uid}">
          <rect x="0" y="-90" width="90" height="180"/>
        </clipPath>
      </defs>

      <!-- Pulsing Cyan Hero Halo -->
      <circle cx="0" cy="0" r="${glowR.toFixed(1)}" fill="url(#hmGlow_${uid})"/>

      <!-- Puppeteer Strings Upward -->
      <line x1="-38" y1="-62" x2="-58" y2="-165" stroke="${PALETTE.cyan}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.8"/>
      <line x1="38"  y1="-62" x2="58"  y2="-165" stroke="${PALETTE.cyan}" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.8"/>
      <line x1="0"   y1="-72" x2="0"   y2="-175" stroke="${PALETTE.cyan}" stroke-width="2.2" opacity="0.65"/>

      <!-- Dual-Face Mask: Left Half Real Executive Face, Right Half Glowing AI Wireframe -->
      <ellipse cx="0" cy="0" rx="64" ry="70" fill="#F1CCB0" stroke="${PALETTE.ink}" stroke-width="5"/>
      <g clip-path="url(#hmRight_${uid})">
        <ellipse cx="0" cy="0" rx="64" ry="70" fill="#0B1F33"/>
        <g stroke="${PALETTE.cyan}" stroke-width="1.6" opacity="0.75">
          <line x1="0" y1="-68" x2="0" y2="68"/>
          <line x1="22" y1="-65" x2="22" y2="65"/>
          <line x1="44" y1="-50" x2="44" y2="50"/>
          <line x1="0" y1="-36" x2="56" y2="-36"/>
          <line x1="0" y1="-12" x2="64" y2="-12"/>
          <line x1="0" y1="12" x2="64" y2="12"/>
          <line x1="0" y1="36" x2="56" y2="36"/>
        </g>
      </g>
      <!-- Center Split & Rim -->
      <line x1="0" y1="-70" x2="0" y2="70" stroke="${PALETTE.cyan}" stroke-width="3.5"/>
      <ellipse cx="0" cy="0" rx="64" ry="70" fill="none" stroke="${PALETTE.ink}" stroke-width="5"/>

      <!-- Left Human Eye + Glasses / Right Glowing Digital Eye -->
      <ellipse cx="-24" cy="-6" rx="5" ry="7" fill="${PALETTE.ink}"/>
      <circle cx="-25.5" cy="-8.5" r="1.6" fill="#FFFFFF"/>
      <rect x="-40" y="-17" width="32" height="22" rx="4" fill="rgba(255,255,255,0.22)" stroke="${PALETTE.ink}" stroke-width="3"/>
      <ellipse cx="24" cy="-6" rx="7" ry="9" fill="#00E5FF" opacity="0.9"/>
      <circle cx="24" cy="-6" r="3" fill="#FFFFFF"/>

      <!-- Dual Mouth -->
      <path d="M -22 30 Q -10 38 0 32" fill="none" stroke="${PALETTE.ink}" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M 0 32 H 26" fill="none" stroke="${PALETTE.cyan}" stroke-width="3.6" stroke-linecap="round"/>

      <!-- Slanted Crimson CLONE Stamp -->
      <g transform="translate(36, -60) rotate(-14)">
        <rect x="-46" y="-16" width="92" height="32" rx="5" fill="${PALETTE.crimson}" stroke="${PALETTE.ink}" stroke-width="3.5"/>
        <text x="0" y="7" text-anchor="middle" font-family="Cairo, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF">CLONE</text>
      </g>
    </g>
  `;
}
