export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 17685; // 589.47s @ 30fps

const toFrame = (sec) => Math.round(sec * FPS);

export const CHAPTERS = [
  {
    id: "hook",
    num: "00",
    shortLabel: "تدرّج الأخطر",
    title: "أخطر 7 نباتات في العالم",
    subtitle: "تحت المجهر",
    plantKey: "manchineel",
    danger: 10,
    startSec: 0.0,
    endSec: 30.26,
    accentColor: "#E63946",
    mascotPose: "shocked",
    subBeats: [
      { id: "acid_rain_tease", startSec: 0.0, endSec: 8.6 },
      { id: "smoke_fruit_tease", startSec: 8.6, endSec: 18.89 },
      { id: "scale_intro", startSec: 18.89, endSec: 30.26 },
    ],
  },
  {
    id: "level_1_nettle",
    num: "01",
    shortLabel: "القُرّاص",
    title: "القُرّاص اللاذع",
    subtitle: "إبر السيليكا الزجاجية",
    plantKey: "nettle",
    danger: 2,
    startSec: 30.26,
    endSec: 79.55,
    accentColor: "#2EE89E",
    mascotPose: "explain",
    subBeats: [
      { id: "title_and_intro", startSec: 30.26, endSec: 41.9 },
      { id: "microscope_needles", startSec: 41.9, endSec: 56.17 },
      { id: "capillary_rash", startSec: 56.17, endSec: 61.93 },
      { id: "survival_rule", startSec: 61.93, endSec: 79.55 },
    ],
  },
  {
    id: "level_2_poison_ivy",
    num: "02",
    shortLabel: "اللَّبْلاب السام",
    title: "اللَّبْلاب السام",
    subtitle: "زيت اليوروشيول الخفي",
    plantKey: "poison_ivy",
    danger: 4,
    startSec: 79.55,
    endSec: 169.99,
    accentColor: "#7ED957",
    mascotPose: "inspect",
    subBeats: [
      { id: "title_and_three_leaves", startSec: 79.55, endSec: 90.67 },
      { id: "urushiol_oil", startSec: 90.67, endSec: 132.88 },
      { id: "immune_attack", startSec: 132.88, endSec: 156.41 },
      { id: "survival_rule", startSec: 156.41, endSec: 169.99 },
    ],
  },
  {
    id: "level_3_hogweed",
    num: "03",
    shortLabel: "عشبة الخنزير",
    title: "عشبة الخنزير العملاقة",
    subtitle: "حروق ضوء الشمس",
    plantKey: "giant_hogweed",
    danger: 6,
    startSec: 169.99,
    endSec: 244.9,
    accentColor: "#FFD43B",
    mascotPose: "shiver",
    subBeats: [
      { id: "title_and_size", startSec: 169.99, endSec: 188.56 },
      { id: "furanocoumarins_uv_burn", startSec: 188.56, endSec: 230.63 },
      { id: "survival_rule", startSec: 230.63, endSec: 244.9 },
    ],
  },
  {
    id: "level_4_oleander",
    num: "04",
    shortLabel: "الدِّفلى",
    title: "شجرة الدِّفلى",
    subtitle: "سُمّ القلب في شوارعنا",
    plantKey: "oleander",
    danger: 7,
    startSec: 244.9,
    endSec: 318.06,
    accentColor: "#FF9F1C",
    mascotPose: "shocked",
    subBeats: [
      { id: "arab_streets_shock", startSec: 244.9, endSec: 267.8 },
      { id: "heart_pump_oleandrin", startSec: 267.8, endSec: 287.68 },
      { id: "napoleon_1809_skewers", startSec: 287.68, endSec: 308.25 },
      { id: "survival_rule", startSec: 308.25, endSec: 318.06 },
    ],
  },
  {
    id: "level_5_castor",
    num: "05",
    shortLabel: "الخِروَع",
    title: "نبتة الخِروَع",
    subtitle: "سُمّ الريسين بلا ترياق",
    plantKey: "castor",
    danger: 8,
    startSec: 318.06,
    endSec: 395.48,
    accentColor: "#FF6B35",
    mascotPose: "warn",
    subBeats: [
      { id: "oil_safe_vs_seeds", startSec: 318.06, endSec: 347.07 },
      { id: "ricin_ribosomes", startSec: 347.07, endSec: 385.25 },
      { id: "survival_rule", startSec: 385.25, endSec: 395.48 },
    ],
  },
  {
    id: "level_6_gympie",
    num: "06",
    shortLabel: "جِيمبي-جِيمبي",
    title: "نبتة جِيمبي-جِيمبي",
    subtitle: "نبتة الانتحار الأسترالية",
    plantKey: "gympie",
    danger: 9,
    startSec: 395.48,
    endSec: 474.35,
    accentColor: "#F72585",
    mascotPose: "shiver",
    subBeats: [
      { id: "suicide_plant_velvet", startSec: 395.48, endSec: 422.55 },
      { id: "spider_cone_snail_venom", startSec: 422.55, endSec: 443.78 },
      { id: "cold_shower_pain", startSec: 443.78, endSec: 461.59 },
      { id: "survival_rule", startSec: 461.59, endSec: 474.35 },
    ],
  },
  {
    id: "level_7_manchineel",
    num: "07",
    shortLabel: "المانشينيل",
    title: "شجرة المانشينيل",
    subtitle: "تفاحة الموت الصغيرة",
    plantKey: "manchineel",
    danger: 10,
    startSec: 474.35,
    endSec: 566.28,
    accentColor: "#E63946",
    mascotPose: "warn",
    subBeats: [
      { id: "guinness_death_apple", startSec: 474.35, endSec: 503.49 },
      { id: "phorbol_throat_blisters", startSec: 503.49, endSec: 525.66 },
      { id: "acid_rain_and_smoke", startSec: 525.66, endSec: 547.68 },
      { id: "survival_rule", startSec: 547.68, endSec: 566.28 },
    ],
  },
  {
    id: "outro",
    num: "★",
    shortLabel: "الخاتمة",
    title: "مِجهر الطبيعة",
    subtitle: "الحلقة القادمة: كائنات البحار",
    plantKey: "manchineel",
    danger: 10,
    startSec: 566.28,
    endSec: 589.5,
    accentColor: "#2EE89E",
    mascotPose: "explain",
    subBeats: [
      { id: "wrap_and_cta", startSec: 566.28, endSec: 589.5 },
    ],
  },
].map((ch) => ({
  ...ch,
  startFrame: toFrame(ch.startSec),
  endFrame: toFrame(ch.endSec),
  subBeats: ch.subBeats.map((sb) => ({
    ...sb,
    startFrame: toFrame(sb.startSec),
    endFrame: toFrame(sb.endSec),
  })),
}));

export function getActiveBeat(frame) {
  const f = Math.max(0, Math.min(TOTAL_FRAMES - 1, frame));
  const chapter =
    CHAPTERS.find((c) => f >= c.startFrame && f < c.endFrame) ||
    CHAPTERS[CHAPTERS.length - 1];
  const subBeat =
    chapter.subBeats.find((s) => f >= s.startFrame && f < s.endFrame) ||
    chapter.subBeats[chapter.subBeats.length - 1];
  return {
    chapter,
    subBeat,
    localF: f - chapter.startFrame,
    subF: f - subBeat.startFrame,
    subDur: Math.max(1, subBeat.endFrame - subBeat.startFrame),
  };
}
