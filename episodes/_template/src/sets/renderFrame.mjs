import { PALETTES } from "../../../../engine/fajwah/palette.mjs";

export function renderFrameSvg(frame, loudness = [], _opts = {}) {
  const t = frame / 60;
  const cx = 420 + 1080 * t;
  const pulse = 1 + 0.08 * Math.sin(t * Math.PI * 4);
  const sky = PALETTES.day_sky;
  const lvl = loudness?.[frame] ?? 0.5;
  const ringR = (110 + 18 * lvl) * pulse;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="bg_f${frame}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${sky.skyTop}" />
      <stop offset="100%" stop-color="${sky.skyBot}" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg_f${frame})" />
  <circle cx="${cx.toFixed(1)}" cy="470" r="${ringR.toFixed(1)}" fill="${sky.gold}" />
  <rect x="0" y="830" width="1920" height="250" fill="${sky.earthCore}" />
  <text x="960" y="210" text-anchor="middle" direction="rtl" font-family="Lalezar, Cairo, sans-serif" font-size="82" fill="#FFFFFF">بنية الرندر السحابي 2D جاهزة</text>
  <text x="960" y="965" text-anchor="middle" direction="ltr" font-family="Cairo, sans-serif" font-size="40" fill="#9AE6FF">lyla360/render-2d-clips • Frame ${frame}</text>
</svg>`;
}
