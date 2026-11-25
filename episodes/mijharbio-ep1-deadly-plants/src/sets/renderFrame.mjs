import { getActiveBeat } from "../beats.mjs";
import {
  renderHook,
  renderLevel1,
  renderLevel2,
  renderLevel3,
  renderLevel4,
  renderLevel5,
  renderLevel6,
  renderLevel7,
  renderOutro,
} from "../scienceScenes.mjs";

const RENDERERS = {
  hook: renderHook,
  level_1_nettle: renderLevel1,
  level_2_poison_ivy: renderLevel2,
  level_3_hogweed: renderLevel3,
  level_4_oleander: renderLevel4,
  level_5_castor: renderLevel5,
  level_6_gympie: renderLevel6,
  level_7_manchineel: renderLevel7,
  outro: renderOutro,
};

export function renderFrameSvg(frame, timingsOrLoudness = {}) {
  const info = getActiveBeat(frame);
  const loudnessArr = Array.isArray(timingsOrLoudness)
    ? timingsOrLoudness
    : timingsOrLoudness?.loudness;
  const mouthOpen = loudnessArr?.[frame] ?? 0;
  const fn = RENDERERS[info.chapter.id] || renderOutro;
  const inner = fn({ frame, ...info, mouthOpen });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" dir="rtl">${inner}</svg>`;
}
