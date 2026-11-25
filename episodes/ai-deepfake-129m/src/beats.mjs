// Episode: "How Three AI Voices Stole $129 Million" (@MalafMaftouh — English 16:9 Edition)
// 45 Zero-Drift Beats locked to vo_clean.wav (186.100s = 5583 frames @ 30fps)

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 30;
export const TOTAL_FRAMES = 5583;

const RAW_BEATS = [
  // ACT 0: COLD OPEN & TITLE (0.00s .. 55.85s)
  { id: "B01", startSec: 0.00, endSec: 2.05, type: "story", titleAr: "مكتب المالية — مكالمة فيديو", narration: "Imagine your boss calls you on video.", camera: "Push-in (4-depth parallax)", transitionOut: "Hard Cut", sfx: "video_ring" },
  { id: "B02", startSec: 2.05, endSec: 5.00, type: "card", titleAr: "بطاقة سوداء #1", narration: "His face looks real, and his voice is exact.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "card_wipe", cardLines: ["His face looks real,", "and his voice is exact."], wipeStart: 2.15, wipeEnd: 4.65 },
  { id: "B03", startSec: 5.00, endSec: 9.65, type: "story", titleAr: "شاشة المدير المزيف وستائر تُغلق", narration: "He says the company is buying a rival in secret, and nobody in the building can know.", camera: "Punch-in -> T3 Whip-Pan", transitionOut: "T3 Whip-Pan (8f)", sfx: "whoosh" },
  { id: "B04", startSec: 9.65, endSec: 15.85, type: "split", titleAr: "انقسام ثنائي: المدير والمحامي", narration: "To prove it's real, he tells you to call a partner at a famous law firm. And that lawyer confirms every page.", camera: "T2 Split 1->2 + Drift", transitionOut: "Hard Cut", sfx: "panel_swoosh, stamp_slam" },
  { id: "B05", startSec: 15.85, endSec: 18.60, type: "card", titleAr: "بطاقة سوداء #2", narration: "Except... neither person is real.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "sub_boom", cardLines: ["Except... neither person", "is real."], wipeStart: 16.08, wipeEnd: 18.22 },
  { id: "B06", startSec: 18.60, endSec: 25.40, type: "reveal", titleAr: "كشف القبو — الأقنعة المزدوجة", narration: "Behind both screens sit the same three men, wearing two artificial intelligence masks from one room.", camera: "T8 Pull-Out 2.5D Bunker", transitionOut: "Hard Cut", sfx: "whoosh" },
  { id: "B07", startSec: 25.40, endSec: 28.05, type: "skit", titleAr: "سكتش 1 (واسع): أنت المدير؟", narration: "Wait, you're the CEO?", camera: "T7 Wide Setup + Creep", transitionOut: "Punch-In Cut", sfx: "music_duck" },
  { id: "B08", startSec: 28.05, endSec: 30.55, type: "skit", titleAr: "سكتش 1 (قريب): نعم أرسل التحويل", narration: "Yes. Send the wire.", camera: "T7 +45% Punch-In (Jacob)", transitionOut: "Reverse Cut", sfx: "mouse_click" },
  { id: "B09", startSec: 30.55, endSec: 32.60, type: "skit", titleAr: "سكتش 1 (عكسي): سأتأكد من القانونية", narration: "Let me check with legal first.", camera: "T7 Reverse Close-Up (Claire)", transitionOut: "Hard Cut", sfx: "phone_beep" },
  { id: "B10", startSec: 32.60, endSec: 35.40, type: "skit", titleAr: "سكتش 1 (ذروة): تبديل القناع", narration: "Hold on... switching masks.", camera: "T7 Slapstick Reaction", transitionOut: "Hard Cut", sfx: "comic_pop" },
  { id: "B11", startSec: 35.40, endSec: 43.90, type: "build", titleAr: "عداد $129M وأبراج الضحايا", narration: "In nineteen months, this one trick stole one hundred and twenty-nine million dollars from banks, hospitals, and tech firms worldwide.", camera: "Push-in + Rising Towers", transitionOut: "Hard Cut", sfx: "counter_tick" },
  { id: "B12", startSec: 43.90, endSec: 46.70, type: "card", titleAr: "بطاقة سوداء #3", narration: "Nearly a quarter million dollars every day.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "card_wipe", cardLines: ["Nearly a quarter million dollars", "every day."], wipeStart: 44.08, wipeEnd: 46.25 },
  { id: "B13", startSec: 46.70, endSec: 50.45, type: "rack", titleAr: "تبديل بؤرة من المكتب إلى القبو", narration: "How did three guys with laptops fool corporate finance teams,", camera: "T5 Rack-Focus DoF Pull", transitionOut: "Hard Cut", sfx: "soft_whoosh" },
  { id: "B14", startSec: 50.45, endSec: 53.65, type: "title", titleAr: "العنوان الرئيسي فوق شبكة الليزر", narration: "and what finally gave them away?", camera: "Slow Hero Push-In (2.5D)", transitionOut: "Hard Cut", sfx: "sub_boom" },
  { id: "B15", startSec: 53.65, endSec: 55.85, type: "chapter", titleAr: "فصل 1: الدمية المزدوجة", narration: "[CHAPTER: The Double Puppet]", camera: "Silent Chapter Card", transitionOut: "Hard Cut", sfx: "chapter_boom", chapterTitle: "1. The Double Puppet" },

  // ACT 1: ORIGIN & 3-STEP SCHEME (55.85s .. 106.55s)
  { id: "B16", startSec: 55.85, endSec: 64.30, type: "map", titleAr: "خريطة بريطانيا-إسبانيا-إسرائيل + الطابع", narration: "It starts in July, twenty twenty-four, with three men across Britain, Spain, and Israel: Jacob Soall, Sharon Hazan, and Guy Sheetrit.", camera: "Travel Pan + Swinging Stamp", transitionOut: "Hard Cut", sfx: "pin_drop" },
  { id: "B17", startSec: 64.30, endSec: 68.90, type: "insert", titleAr: "شاشة الدردشة المشفرة", narration: "In private chats, they don't sound like Wall Street bankers.", camera: "Push-in on Chat Monitor", transitionOut: "Hard Cut", sfx: "chat_ping" },
  { id: "B18", startSec: 68.90, endSec: 72.30, type: "card", titleAr: "بطاقة سوداء #4", narration: "Their nicknames are Rocky Balboa and Superman Cash.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "comic_pop", cardLines: ["Rocky Balboa", "and Superman Cash."], wipeStart: 69.04, wipeEnd: 71.95 },
  { id: "B19", startSec: 72.30, endSec: 75.40, type: "flashback", titleAr: "فلاشباك نيويورك 2008 — سجل حازان", narration: "Hazan already has a prior New York bank fraud conviction.", camera: "Sepia Push -> T3 Whip-Pan", transitionOut: "T3 Whip-Pan (8f)", sfx: "stamp_slam, whoosh" },
  { id: "B20", startSec: 75.40, endSec: 82.65, type: "story", titleAr: "بان أفقي من الخزنة إلى مفتاح المحاسب", narration: "Instead of hacking vaults, they target the one employee who already holds the keys: the accountant.", camera: "Wide Horizontal Travel Pan", transitionOut: "Hard Cut", sfx: "metal_snap" },
  { id: "B21", startSec: 82.65, endSec: 86.45, type: "table", titleAr: "لقطة علوية — الخطوة 1: عقد سري", narration: "Step one: a fake electronic contract lands with a strict non-disclosure agreement.", camera: "Top-Down Desk + Tablet Slide", transitionOut: "Hard Cut", sfx: "paper_swipe" },
  { id: "B22", startSec: 86.45, endSec: 90.15, type: "card", titleAr: "بطاقة سوداء #5", narration: "Rule one: tell nobody down the hall.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "card_wipe", cardLines: ["Rule one:", "tell nobody down the hall."], wipeStart: 86.63, wipeEnd: 89.90 },
  { id: "B23", startSec: 90.15, endSec: 96.30, type: "build", titleAr: "الخطوة 2: استنساخ الصوت والصورة", narration: "Step two: a call arrives from an artificial intelligence clone trained on the real chief executive's voice and face.", camera: "Left-to-Right Diagram Drift", transitionOut: "Hard Cut", sfx: "data_pulse" },
  { id: "B24", startSec: 96.30, endSec: 98.30, type: "closeup", titleAr: "الخطوة 3: الفخ (القناع عن قرب)", narration: "Step three is the trap.", camera: "Object Hero Shot (Close-up)", transitionOut: "Hard Cut", sfx: "sub_boom" },
  { id: "B25", startSec: 98.30, endSec: 104.40, type: "metaphor", titleAr: "استعارة خيوط الدمى المزدوجة", narration: "The fake boss hands the nervous employee to an outside lawyer, played by a second clone from the exact same crew.", camera: "Crane Pull-Out Reveal", transitionOut: "Hard Cut", sfx: "soft_whoosh" },
  { id: "B26", startSec: 104.40, endSec: 106.55, type: "chapter", titleAr: "فصل 2: لم يراجع أحد مرتين", narration: "[CHAPTER: Nobody Checked Twice]", camera: "Silent Chapter Card", transitionOut: "Hard Cut", sfx: "chapter_boom", chapterTitle: "2. Nobody Checked Twice" },

  // ACT 2: MONEY TRAIL & VICTIMS (106.55s .. 139.75s)
  { id: "B27", startSec: 106.55, endSec: 114.30, type: "pipe", titleAr: "متابعة الأنبوب المالي عبر 4 دول للكريبتو", narration: "Once the wire clears, the money jumps through accounts in America, Spain, Portugal, and Greece, then vanishes into cryptocurrency.", camera: "T4 Continuous Pipe Pan", transitionOut: "Hard Cut", sfx: "data_flow" },
  { id: "B28", startSec: 114.30, endSec: 116.65, type: "story", titleAr: "لقطة واسعة — أبراج الضحايا", narration: "And the victims aren't tiny startups.", camera: "High-Wide 4-Depth Parallax", transitionOut: "Hard Cut", sfx: "soft_whoosh" },
  { id: "B29", startSec: 116.65, endSec: 125.65, type: "triptych", titleAr: "انقسام ثلاثي: بريطانيا، فلوريدا، رود آيلاند", narration: "A British fintech firm wires eleven point six million dollars. A Florida pet food company sends five million. A Rhode Island bank loses two point seven million.", camera: "T2 Progressive 1->2->3 Split", transitionOut: "Hard Cut", sfx: "panel_swoosh, counter_tick" },
  { id: "B30", startSec: 125.65, endSec: 129.20, type: "card", titleAr: "بطاقة سوداء #6", narration: "Two hospital systems wire nearly eight million dollars.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "card_wipe", cardLines: ["Two hospital systems wire", "nearly $8 million."], wipeStart: 125.87, wipeEnd: 128.89 },
  { id: "B31", startSec: 129.20, endSec: 131.75, type: "skit", titleAr: "سكتش 2 (واسع): 5 ملايين لطعام الكلاب؟", narration: "Who approved five million for dog food?", camera: "T7 Wide Setup + Creep", transitionOut: "Punch-In Cut", sfx: "music_duck" },
  { id: "B32", startSec: 131.75, endSec: 133.25, type: "skit", titleAr: "سكتش 2 (قريب): الرئيس التنفيذي", narration: "The chief executive.", camera: "T7 +45% Punch-In", transitionOut: "Reverse Cut", sfx: "soft_whoosh" },
  { id: "B33", startSec: 133.25, endSec: 134.90, type: "skit", titleAr: "سكتش 2 (عكسي): هل تحقق المحامي؟", narration: "Did legal verify it?", camera: "T7 Reverse Close-Up", transitionOut: "Hard Cut", sfx: "paper_swipe" },
  { id: "B34", startSec: 134.90, endSec: 137.60, type: "skit", titleAr: "سكتش 2 (ذروة): ختم روكي بالبوا", narration: "Personally signed by Rocky Balboa.", camera: "T7 Stamp Slam + Receipt Drop", transitionOut: "Hard Cut", sfx: "stamp_slam, comic_pop" },
  { id: "B35", startSec: 137.60, endSec: 139.75, type: "chapter", titleAr: "فصل 3: اختبار السؤال الواحد", narration: "[CHAPTER: The One Question Test]", camera: "Silent Chapter Card", transitionOut: "Hard Cut", sfx: "chapter_boom", chapterTitle: "3. The One Question Test" },

  // ACT 3: PARALLELS, FERRARI TRAP, BUST & OUTRO (139.75s .. 186.10s)
  { id: "B36", startSec: 139.75, endSec: 149.95, type: "story", titleAr: "هونغ كونغ 2024 — مكالمة Arup المزيفة", narration: "We saw early warnings of this move in twenty twenty-four. An engineering firm in Hong Kong lost twenty-five million dollars on a video call where every coworker on screen was fake.", camera: "OTS Push-in -> T3 Whip-Pan", transitionOut: "T3 Whip-Pan (8f)", sfx: "glitch_snap, whoosh" },
  { id: "B37", startSec: 149.95, endSec: 157.05, type: "lookalike", titleAr: "مكتب فيراري — شبيه بينيديتو فينيا", narration: "Weeks later, scammers cloned the voice of Ferrari's chief executive, Benedetto Vigna, right down to his Italian accent.", camera: "Sunlit Pan (Vigna -> Cloner)", transitionOut: "Hard Cut", sfx: "wave_clone" },
  { id: "B38", startSec: 157.05, endSec: 159.35, type: "story", titleAr: "مدير فيراري يمسك الكتاب ويرفع إصبعه", narration: "His executive asked one question.", camera: "Push-in on Executive + Book", transitionOut: "Hard Cut", sfx: "phone_ring" },
  { id: "B39", startSec: 159.35, endSec: 161.90, type: "skit", titleAr: "سكتش 3 (انقسام): صفقة سرية حوّل اليوم", narration: "Secret deal. Wire the funds today.", camera: "T2 Split Call (Clone vs Exec)", transitionOut: "Hard Cut", sfx: "music_duck" },
  { id: "B40", startSec: 161.90, endSec: 165.00, type: "skit", titleAr: "سكتش 3 (ذروة + Rack Focus): ما اسم الكتاب؟", narration: "Sure. What book did you recommend last week?", camera: "T5 Rack-Focus + Punch-In", transitionOut: "Hard Cut", sfx: "comic_pop" },
  { id: "B41", startSec: 165.00, endSec: 167.60, type: "card", titleAr: "بطاقة سوداء #7", narration: "The line went dead in one second.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "hangup_beep", cardLines: ["The line went dead", "in one second."], wipeStart: 165.25, wipeEnd: 167.16 },
  { id: "B42", startSec: 167.60, endSec: 176.05, type: "cctv", titleAr: "مراقبة CCTV ثم مداهمة الشرطة نوفمبر 2026", narration: "In November twenty twenty-six, police in Spain and Britain finally arrested Soall, Hazan, and Sheetrit on federal fraud and identity theft charges.", camera: "T6 CCTV Marquee 2x->4x -> Bust", transitionOut: "Hard Cut", sfx: "cctv_beep, siren_blip" },
  { id: "B43", startSec: 176.05, endSec: 177.80, type: "story", titleAr: "الزنزانة — سقوط القضبان الحديدية", narration: "Those three men are in custody.", camera: "Locked Medium + Bars Slam", transitionOut: "Hard Cut", sfx: "metal_snap" },
  { id: "B44", startSec: 177.80, endSec: 181.05, type: "card", titleAr: "بطاقة سوداء #8", narration: "Their artificial intelligence tools are still online.", camera: "Still Card (LTR wipe)", transitionOut: "Hard Cut", sfx: "sub_boom", cardLines: ["Their artificial intelligence tools", "are still online."], wipeStart: 178.02, wipeEnd: 180.76 },
  { id: "B45", startSec: 181.05, endSec: 186.10, type: "outro", titleAr: "العودة الختامية لمكتب البداية + الكتاب والقناع", narration: "Getting cheaper every month, and waiting for the next office that forgets to ask about the book.", camera: "Slow Pull-Out Dusk Skyline", transitionOut: "End", sfx: "phone_ring" },
];

export const BEATS = RAW_BEATS.map((b, i, arr) => {
  const startFrame = Math.round(b.startSec * FPS);
  const endFrame = i === arr.length - 1 ? TOTAL_FRAMES : Math.round(b.endSec * FPS);
  return { ...b, startFrame, endFrame };
});

export const PREVIEW_FRAMES = BEATS
  .filter((_, idx) => idx % 3 === 0)
  .map((b) => Math.floor((b.startFrame + b.endFrame) / 2));

export function getBeatAtFrame(frame) {
  for (let i = 0; i < BEATS.length; i++) {
    if (frame < BEATS[i].endFrame) return BEATS[i];
  }
  return BEATS[BEATS.length - 1];
}
