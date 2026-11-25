// Reusable Explorer Host Mascot («مستكشف مِجهر الطبيعة»)
// Coordinates centered at (0, 0): top of hat ~ -185, bottom waist/hips ~ +185

export function renderExplorerMascot({
  x = 0,
  y = 0,
  scale = 1,
  pose = "explain",
  frame = 0,
  mouthOpen = 0,
  flipX = false,
} = {}) {
  const breatheY = Math.sin(frame * 0.08) * 3.0;
  const shiverX = pose === "shiver" ? Math.sin(frame * 1.3) * 3.2 : 0;
  const blinkMod = frame % 112;
  const isBlinking = blinkMod >= 108;
  const leanDeg = pose === "inspect" ? 5 : pose === "shiver" ? -2 : 0;
  const flipScale = flipX ? -1 : 1;

  // Mouth state driven by audio loudness (mouthOpen 0..1) and pose
  let mouthSvg = "";
  if (pose === "shocked") {
    const ry = 10 + mouthOpen * 6;
    mouthSvg = `<ellipse cx="0" cy="40" rx="11" ry="${ry.toFixed(1)}" fill="#5E161E" stroke="#141414" stroke-width="4.5"/>
                <ellipse cx="0" cy="${(40 + ry * 0.45).toFixed(1)}" rx="6" ry="3.5" fill="#E63946"/>`;
  } else if (pose === "shiver") {
    mouthSvg = `<path d="M -16 40 Q -8 35 0 40 Q 8 45 16 40" fill="none" stroke="#141414" stroke-width="4.8" stroke-linecap="round"/>`;
  } else if (pose === "warn") {
    if (mouthOpen > 0.35) {
      mouthSvg = `<path d="M -14 38 L 14 38 Q 12 49 0 49 Q -12 49 -14 38 Z" fill="#5E161E" stroke="#141414" stroke-width="4.2" stroke-linejoin="round"/>
                  <rect x="-8" y="38.5" width="16" height="4" rx="1.5" fill="#FFFFFF"/>`;
    } else {
      mouthSvg = `<path d="M -14 40 Q 0 36 14 40" fill="none" stroke="#141414" stroke-width="4.8" stroke-linecap="round"/>`;
    }
  } else {
    // explain / inspect
    if (mouthOpen > 0.55) {
      mouthSvg = `<path d="M -15 36 Q 0 38 15 36 Q 14 52 0 52 Q -14 52 -15 36 Z" fill="#5E161E" stroke="#141414" stroke-width="4.2" stroke-linejoin="round"/>
                  <path d="M -9 37 L 9 37 L 8 41 L -8 41 Z" fill="#FFFFFF"/>
                  <ellipse cx="0" cy="48" rx="6.5" ry="3.2" fill="#E66470"/>`;
    } else if (mouthOpen > 0.22) {
      mouthSvg = `<path d="M -14 37 Q 0 42 14 37 Q 10 47 0 47 Q -10 47 -14 37 Z" fill="#5E161E" stroke="#141414" stroke-width="4.2" stroke-linejoin="round"/>`;
    } else {
      mouthSvg = `<path d="M -15 37 Q 0 45 15 37" fill="none" stroke="#141414" stroke-width="4.8" stroke-linecap="round"/>`;
    }
  }

  // Eyes & Brows
  let eyesSvg = "";
  if (pose === "shiver") {
    // Wearing protective dark emerald-amber field goggles over eyes
    eyesSvg = `
      <g transform="translate(0, 4)">
        <rect x="-47" y="-12" width="42" height="28" rx="12" fill="#0C2E23" stroke="#141414" stroke-width="5"/>
        <rect x="5" y="-12" width="42" height="28" rx="12" fill="#0C2E23" stroke="#141414" stroke-width="5"/>
        <rect x="-5" y="-3" width="10" height="8" rx="3" fill="#FFD43B" stroke="#141414" stroke-width="3.5"/>
        <line x1="-38" y1="-4" x2="-22" y2="8" stroke="#2EE89E" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <line x1="14" y1="-4" x2="30" y2="8" stroke="#2EE89E" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      </g>
      <path d="M -38 -18 Q -22 -14 -10 -20 M 10 -20 Q 22 -14 38 -18" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (isBlinking && pose !== "shocked") {
    eyesSvg = `
      <path d="M -34 6 Q -22 12 -10 6 M 10 6 Q 22 12 34 6" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round"/>
      <path d="M -36 -12 Q -22 -18 -9 -12 M 9 -12 Q 22 -18 36 -12" fill="none" stroke="#141414" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (pose === "shocked") {
    eyesSvg = `
      <ellipse cx="-22" cy="4" rx="13" ry="15" fill="#FFFFFF" stroke="#141414" stroke-width="4.5"/>
      <ellipse cx="22" cy="4" rx="13" ry="15" fill="#FFFFFF" stroke="#141414" stroke-width="4.5"/>
      <circle cx="-21" cy="5" r="4.8" fill="#141414"/>
      <circle cx="21" cy="5" r="4.8" fill="#141414"/>
      <circle cx="-23" cy="2" r="2" fill="#FFFFFF"/>
      <circle cx="19" cy="2" r="2" fill="#FFFFFF"/>
      <path d="M -38 -18 Q -22 -29 -8 -19 M 8 -19 Q 22 -29 38 -18" fill="none" stroke="#141414" stroke-width="5.2" stroke-linecap="round"/>
    `;
  } else {
    const browY = pose === "warn" ? -10 : -14;
    const browInner = pose === "warn" ? -7 : -17;
    const pupilScale = pose === "inspect" ? 1.15 : 1.0;
    eyesSvg = `
      <ellipse cx="-22" cy="5" rx="11.5" ry="12.5" fill="#FFFFFF" stroke="#141414" stroke-width="4.2"/>
      <ellipse cx="22" cy="5" rx="${(11.5 * (pose === "inspect" ? 1.25 : 1)).toFixed(1)}" ry="${(12.5 * (pose === "inspect" ? 1.25 : 1)).toFixed(1)}" fill="#FFFFFF" stroke="#141414" stroke-width="4.2"/>
      <circle cx="-20" cy="5" r="6" fill="#141414"/>
      <circle cx="20" cy="5" r="${(6 * pupilScale).toFixed(1)}" fill="#141414"/>
      <circle cx="-22" cy="2.5" r="2.3" fill="#FFFFFF"/>
      <circle cx="18" cy="2.5" r="2.3" fill="#FFFFFF"/>
      <path d="M -36 ${browY} Q -22 ${browInner - 4} -9 ${browInner}" fill="none" stroke="#141414" stroke-width="5.2" stroke-linecap="round"/>
      <path d="M 9 ${browInner} Q 22 ${browInner - 4} 36 ${browY}" fill="none" stroke="#141414" stroke-width="5.2" stroke-linecap="round"/>
    `;
  }

  // Goggles resting on Hat Brim (unless worn over eyes in shiver)
  const hatGogglesSvg = pose === "shiver" ? "" : `
    <g transform="translate(0, -64)">
      <rect x="-46" y="-11" width="38" height="22" rx="10" fill="#185C45" stroke="#141414" stroke-width="4.5"/>
      <rect x="8" y="-11" width="38" height="22" rx="10" fill="#185C45" stroke="#141414" stroke-width="4.5"/>
      <rect x="-8" y="-4" width="16" height="8" rx="3" fill="#FFD43B" stroke="#141414" stroke-width="3.5"/>
      <line x1="-38" y1="-5" x2="-24" y2="5" stroke="#2EE89E" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="16" y1="-5" x2="30" y2="5" stroke="#2EE89E" stroke-width="3.5" stroke-linecap="round"/>
    </g>
  `;

  // Arms & Props per Pose
  let armsSvg = "";
  if (pose === "explain") {
    armsSvg = `
      <!-- Left Arm Holding Brass-Emerald Magnifying Loupe -->
      <path d="M -52 92 C -78 118, -82 146, -64 162" fill="none" stroke="#141414" stroke-width="26" stroke-linecap="round"/>
      <path d="M -52 92 C -78 118, -82 146, -64 162" fill="none" stroke="#FAF7F0" stroke-width="15" stroke-linecap="round"/>
      <g transform="translate(-72, 146) rotate(-25)">
        <rect x="-5" y="14" width="10" height="26" rx="5" fill="#FFD43B" stroke="#141414" stroke-width="4"/>
        <circle cx="0" cy="-6" r="22" fill="#E6FFF4" stroke="#141414" stroke-width="5.5"/>
        <circle cx="0" cy="-6" r="15" fill="none" stroke="#2EE89E" stroke-width="3"/>
      </g>
      <circle cx="-62" cy="162" r="13" fill="#EBB58F" stroke="#141414" stroke-width="5"/>

      <!-- Right Arm Raised Pointing Index Up -->
      <path d="M 52 92 C 86 92, 100 66, 94 34" fill="none" stroke="#141414" stroke-width="26" stroke-linecap="round"/>
      <path d="M 52 92 C 86 92, 100 66, 94 34" fill="none" stroke="#FAF7F0" stroke-width="15" stroke-linecap="round"/>
      <g transform="translate(94, 24)">
        <circle cx="0" cy="6" r="13" fill="#EBB58F" stroke="#141414" stroke-width="5"/>
        <path d="M -2 -3 L -2 -26" fill="none" stroke="#141414" stroke-width="11" stroke-linecap="round"/>
        <path d="M -2 -3 L -2 -26" fill="none" stroke="#EBB58F" stroke-width="5" stroke-linecap="round"/>
      </g>
    `;
  } else if (pose === "inspect") {
    armsSvg = `
      <!-- Left Arm Holding Field Notebook -->
      <path d="M -52 92 C -78 118, -74 148, -48 152" fill="none" stroke="#141414" stroke-width="26" stroke-linecap="round"/>
      <path d="M -52 92 C -78 118, -74 148, -48 152" fill="none" stroke="#FAF7F0" stroke-width="15" stroke-linecap="round"/>
      <rect x="-78" y="128" width="38" height="46" rx="6" transform="rotate(-10 -59 151)" fill="#C8A26A" stroke="#141414" stroke-width="4.5"/>
      <circle cx="-46" cy="150" r="12" fill="#EBB58F" stroke="#141414" stroke-width="4.5"/>

      <!-- Right Arm Raising Magnifying Loupe Up to Eye -->
      <path d="M 52 92 C 92 78, 92 38, 60 18" fill="none" stroke="#141414" stroke-width="26" stroke-linecap="round"/>
      <path d="M 52 92 C 92 78, 92 38, 60 18" fill="none" stroke="#FAF7F0" stroke-width="15" stroke-linecap="round"/>
      <g transform="translate(26, 6)">
        <rect x="24" y="16" width="12" height="32" rx="6" transform="rotate(-35 30 32)" fill="#FFD43B" stroke="#141414" stroke-width="4.5"/>
        <circle cx="0" cy="0" r="30" fill="#2EE89E" fill-opacity="0.22" stroke="#141414" stroke-width="6.5"/>
        <circle cx="0" cy="0" r="22" fill="none" stroke="#2EE89E" stroke-width="3.5"/>
        <path d="M -14 -12 A 18 18 0 0 1 6 -16" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" opacity="0.85"/>
      </g>
      <circle cx="58" cy="24" r="13" fill="#EBB58F" stroke="#141414" stroke-width="4.8"/>
    `;
  } else if (pose === "shocked") {
    armsSvg = `
      <!-- Both Hands Raised in Shock -->
      <path d="M -52 92 C -90 82, -96 42, -78 18" fill="none" stroke="#141414" stroke-width="25" stroke-linecap="round"/>
      <path d="M -52 92 C -90 82, -96 42, -78 18" fill="none" stroke="#FAF7F0" stroke-width="14" stroke-linecap="round"/>
      <circle cx="-76" cy="14" r="14" fill="#EBB58F" stroke="#141414" stroke-width="5"/>

      <path d="M 52 92 C 90 82, 96 42, 78 18" fill="none" stroke="#141414" stroke-width="25" stroke-linecap="round"/>
      <path d="M 52 92 C 90 82, 96 42, 78 18" fill="none" stroke="#FAF7F0" stroke-width="14" stroke-linecap="round"/>
      <circle cx="76" cy="14" r="14" fill="#EBB58F" stroke="#141414" stroke-width="5"/>

      <!-- Comic Shock Lines & Sweat Drop -->
      <path d="M -92 -42 L -116 -54 M -96 -16 L -122 -16 M 92 -42 L 116 -54 M 96 -16 L 122 -16" stroke="#E63946" stroke-width="6" stroke-linecap="round"/>
      <path d="M -62 -22 C -55 -10, -52 -2, -52 4 C -52 10, -56 15, -62 15 C -68 15, -72 10, -72 4 C -72 -2, -69 -10, -62 -22 Z"
            fill="#4D9DE0" stroke="#141414" stroke-width="3.5"/>
    `;
  } else if (pose === "warn") {
    armsSvg = `
      <!-- Left Hand on Hip -->
      <path d="M -52 92 C -82 114, -76 146, -54 156" fill="none" stroke="#141414" stroke-width="25" stroke-linecap="round"/>
      <path d="M -52 92 C -82 114, -76 146, -54 156" fill="none" stroke="#FAF7F0" stroke-width="14" stroke-linecap="round"/>
      <circle cx="-54" cy="156" r="13" fill="#EBB58F" stroke="#141414" stroke-width="5"/>

      <!-- Right Arm Extended Outward with STOP Palm -->
      <path d="M 52 92 C 82 96, 102 86, 114 66" fill="none" stroke="#141414" stroke-width="26" stroke-linecap="round"/>
      <path d="M 52 92 C 82 96, 102 86, 114 66" fill="none" stroke="#FAF7F0" stroke-width="15" stroke-linecap="round"/>
      <g transform="translate(118, 56)">
        <rect x="-12" y="-16" width="24" height="28" rx="10" fill="#EBB58F" stroke="#141414" stroke-width="5"/>
        <line x1="-7" y1="-15" x2="-7" y2="-26" stroke="#141414" stroke-width="6" stroke-linecap="round"/>
        <line x1="0" y1="-16" x2="0" y2="-29" stroke="#141414" stroke-width="6" stroke-linecap="round"/>
        <line x1="7" y1="-15" x2="7" y2="-26" stroke="#141414" stroke-width="6" stroke-linecap="round"/>
      </g>
      <!-- Crimson Hazard Triangle Accent -->
      <g transform="translate(124, -12)">
        <polygon points="0,-24 24,18 -24,18" fill="#E63946" stroke="#141414" stroke-width="5" stroke-linejoin="round"/>
        <line x1="0" y1="-10" x2="0" y2="3" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
        <circle cx="0" cy="11" r="2.8" fill="#FFFFFF"/>
      </g>
    `;
  } else {
    // shiver
    armsSvg = `
      <!-- Crossed Arms Hugging Torso -->
      <path d="M -52 94 C -68 128, -28 144, 24 134" fill="none" stroke="#141414" stroke-width="25" stroke-linecap="round"/>
      <path d="M -52 94 C -68 128, -28 144, 24 134" fill="none" stroke="#FAF7F0" stroke-width="14" stroke-linecap="round"/>
      <path d="M 52 94 C 68 128, 28 144, -24 134" fill="none" stroke="#141414" stroke-width="25" stroke-linecap="round"/>
      <path d="M 52 94 C 68 128, 28 144, -24 134" fill="none" stroke="#FAF7F0" stroke-width="14" stroke-linecap="round"/>
      <circle cx="24" cy="134" r="12" fill="#EBB58F" stroke="#141414" stroke-width="4.5"/>
      <circle cx="-24" cy="134" r="12" fill="#EBB58F" stroke="#141414" stroke-width="4.5"/>
      <!-- Shiver Motion Brackets -->
      <path d="M -88 76 L -98 92 L -86 106 M 88 76 L 98 92 L 86 106" fill="none" stroke="#E63946" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }

  return `
    <g transform="translate(${(x + shiverX).toFixed(1)}, ${(y + breatheY).toFixed(1)}) scale(${(scale * flipScale).toFixed(4)}, ${scale.toFixed(4)}) rotate(${leanDeg})">
      <!-- Neck -->
      <rect x="-18" y="48" width="36" height="36" rx="12" fill="#D4946B" stroke="#141414" stroke-width="6"/>

      <!-- Torso: Crisp Field Shirt + Deep Bio-Emerald Utility Vest -->
      <path d="M -56 82 C -58 72, -32 66, 0 66 C 32 66, 58 72, 56 82 L 62 184 L -62 184 Z"
            fill="#FAF7F0" stroke="#141414" stroke-width="6.5" stroke-linejoin="round"/>
      <!-- Left & Right Emerald Field Vest Panels -->
      <path d="M -54 80 L -14 70 L -10 184 L -60 184 Z" fill="#0F3D2E" stroke="#141414" stroke-width="6" stroke-linejoin="round"/>
      <path d="M 54 80 L 14 70 L 10 184 L 60 184 Z" fill="#0F3D2E" stroke="#141414" stroke-width="6" stroke-linejoin="round"/>
      <!-- Shirt Collar V -->
      <polygon points="-24,68 -10,96 0,80 10,96 24,68" fill="#EFECE2" stroke="#141414" stroke-width="4.5" stroke-linejoin="round"/>
      <!-- Vest Pockets & Glowing Golden Mijhar Badge -->
      <rect x="-48" y="132" width="28" height="32" rx="6" fill="#0A291F" stroke="#141414" stroke-width="4"/>
      <rect x="20" y="132" width="28" height="32" rx="6" fill="#0A291F" stroke="#141414" stroke-width="4"/>
      <circle cx="34" cy="106" r="11" fill="#FFD43B" stroke="#141414" stroke-width="3.5"/>
      <circle cx="34" cy="106" r="4.5" fill="#2EE89E"/>
      <!-- Belt -->
      <rect x="-62" y="176" width="124" height="18" rx="6" fill="#3A2D24" stroke="#141414" stroke-width="5.5"/>
      <rect x="-12" y="175" width="24" height="20" rx="5" fill="#FFD43B" stroke="#141414" stroke-width="4.5"/>

      <!-- Ears -->
      <circle cx="-55" cy="10" r="14" fill="#EBB58F" stroke="#141414" stroke-width="5.5"/>
      <circle cx="55" cy="10" r="14" fill="#EBB58F" stroke="#141414" stroke-width="5.5"/>

      <!-- Head -->
      <path d="M -54 -14 C -56 -56, 56 -56, 54 -14 C 54 34, 34 64, 0 64 C -34 64, -54 34, -54 -14 Z"
            fill="#EBB58F" stroke="#141414" stroke-width="6.5" stroke-linejoin="round"/>
      <!-- Subtle Cel Shade on Chin/Right Jaw -->
      <path d="M 32 -18 C 48 6, 42 46, 0 58 C 24 54, 48 34, 48 -8 Z" fill="#D4946B" opacity="0.45"/>

      <!-- Dark Tousled Hair Peeking Under Hat -->
      <path d="M -56 -16 C -60 -42, -32 -54, 0 -54 C 32 -54, 60 -42, 56 -16 C 40 -34, 18 -38, 0 -32 C -18 -38, -40 -34, -56 -16 Z"
            fill="#1F2421" stroke="#141414" stroke-width="5" stroke-linejoin="round"/>

      <!-- Expressive Nose, Eyes & Mouth -->
      <path d="M -3 16 Q 5 22 -2 26" fill="none" stroke="#141414" stroke-width="4" stroke-linecap="round"/>
      ${eyesSvg}
      ${mouthSvg}

      <!-- Field Explorer Safari Hat -->
      <g transform="translate(0, -40)">
        <!-- Hat Dome -->
        <path d="M -56 2 C -54 -56, -24 -76, 0 -76 C 24 -76, 54 -56, 56 2 Z"
              fill="#C8A26A" stroke="#141414" stroke-width="6.5" stroke-linejoin="round"/>
        <path d="M 10 -74 C 36 -62, 52 -36, 54 2 L 26 2 C 26 -36, 16 -60, 10 -74 Z" fill="#9E7B48" opacity="0.5"/>
        <!-- Emerald Hat Band -->
        <path d="M -55 -8 Q 0 2 55 -8 L 57 4 Q 0 14 -57 4 Z" fill="#0F3D2E" stroke="#141414" stroke-width="4.5"/>
        <!-- Wide Curved Brim -->
        <path d="M -78 4 Q 0 22 78 4 Q 44 -8 0 -6 Q -44 -8 -78 4 Z"
              fill="#D9B57D" stroke="#141414" stroke-width="6.5" stroke-linejoin="round"/>
      </g>
      ${hatGogglesSvg}

      <!-- Arms & Props (Foreground Layer) -->
      ${armsSvg}
    </g>
  `;
}
