// Universal 20-Way Chromium CDP Chunk Renderer for `lyla360/render-2d-clips`
// Usage: node engine/render_chunk_ci.mjs <episodeDir> <chunkIndex 0..19> <totalChunks 20>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn, execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const epArg = process.argv[2];
const chunkIndex = Number(process.argv[3] ?? 0);
const totalChunks = Number(process.argv[4] ?? 20);
if (!epArg) throw new Error("Missing <episodeDir> argument");
if (Number.isNaN(chunkIndex) || chunkIndex < 0 || chunkIndex >= totalChunks) {
  throw new Error(`Invalid chunkIndex=${chunkIndex} / totalChunks=${totalChunks}`);
}

const EP_DIR = path.resolve(REPO_ROOT, epArg);
const { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } = await import(pathToFileURL(path.join(EP_DIR, "src/beats.mjs")).href);
const { renderFrameSvg } = await import(pathToFileURL(path.join(EP_DIR, "src/sets/renderFrame.mjs")).href);

const timingsPath = path.join(EP_DIR, "timings.json");
const timings = fs.existsSync(timingsPath) ? JSON.parse(fs.readFileSync(timingsPath, "utf8")) : { loudness: [] };

const OUT_DIR = path.join(EP_DIR, "out/ci_chunks");
const framesPerChunk = Math.ceil(TOTAL_FRAMES / totalChunks);
const startFrame = chunkIndex * framesPerChunk;
const endFrame = Math.min(TOTAL_FRAMES, startFrame + framesPerChunk);
const padded = String(chunkIndex).padStart(2, "0");

fs.mkdirSync(OUT_DIR, { recursive: true });

function findChrome() {
  for (const bin of ["google-chrome", "google-chrome-stable", "chromium-browser", "chromium"]) {
    try {
      const p = execSync(`command -v ${bin}`, { encoding: "utf8" }).trim();
      if (p) return p;
    } catch {}
  }
  throw new Error("No Chrome/Chromium binary found");
}

function resolveFontFile(file) {
  const candidates = [
    path.join(EP_DIR, "assets/fonts", file),
    path.join(REPO_ROOT, "assets/fonts", file),
  ];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

function fontFaceCss() {
  const specs = [
    { family: "Aref Ruqaa", file: "ArefRuqaa-Bold.ttf", weight: "700" },
    { family: "Lalezar", file: "Lalezar-Regular.ttf", weight: "400" },
    { family: "Cairo", file: "Cairo-Variable.ttf", weight: "100 900" },
    { family: "Reem Kufi", file: "ReemKufi-Variable.ttf", weight: "100 900" },
    { family: "Noto Naskh Arabic", file: "NotoNaskhArabic-Variable.ttf", weight: "100 900" },
  ];
  return specs
    .map((s) => {
      const fp = resolveFontFile(s.file);
      if (!fp) return "";
      const b64 = fs.readFileSync(fp).toString("base64");
      return `@font-face { font-family: '${s.family}'; src: url('data:font/ttf;base64,${b64}') format('truetype'); font-weight: ${s.weight}; font-style: normal; }`;
    })
    .filter(Boolean)
    .join("\n");
}

function writeStageHtml() {
  const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
    ${fontFaceCss()}
    html, body { margin: 0; padding: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #000; }
    #stage { width: ${WIDTH}px; height: ${HEIGHT}px; }
  </style></head><body><div id="stage"></div>
  <script>
    window.setFrameSvg = (svg) => {
      document.getElementById('stage').innerHTML = svg;
      return new Promise(r => requestAnimationFrame(() => r(true)));
    };
  </script></body></html>`;
  const p = path.join(OUT_DIR, `stage_${padded}.html`);
  fs.writeFileSync(p, html, "utf8");
  return p;
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve);
      this.ws.addEventListener("error", reject);
    });
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }
  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  close() { try { this.ws.close(); } catch {} }
}

async function main() {
  if (startFrame >= TOTAL_FRAMES) {
    console.log(`Chunk ${padded} empty, skipping.`);
    return;
  }
  const chromeBin = findChrome();
  const stagePath = writeStageHtml();
  const port = 9300 + chunkIndex;
  const userDataDir = path.join(os.tmpdir(), `chrome_ci_${padded}`);
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}

  console.log(`CI Chunk ${padded}/${totalChunks}: frames ${startFrame}..${endFrame - 1} (${endFrame - startFrame}f) using ${chromeBin}`);
  const proc = spawn(chromeBin, [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${WIDTH},${HEIGHT}`,
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    `file://${stagePath}`,
  ], { stdio: "ignore" });

  let wsUrl = null;
  for (let i = 0; i < 200; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) { wsUrl = page.webSocketDebuggerUrl; break; }
    } catch {}
    await new Promise((r) => setTimeout(r, 150));
  }
  if (!wsUrl) { proc.kill("SIGKILL"); throw new Error("Chrome CDP failed to start"); }

  const cdp = new CDPClient(wsUrl);
  const outMp4 = path.join(OUT_DIR, `chunk_${padded}.mp4`);
  const t0 = Date.now();
  let dedup = 0;

  try {
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false,
    });
    await cdp.send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => document.fonts.size)",
      awaitPromise: true,
    });

    const ff = spawn("ffmpeg", [
      "-y", "-hide_banner", "-loglevel", "error",
      "-f", "image2pipe", "-vcodec", "mjpeg", "-r", String(FPS), "-i", "pipe:0",
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "18",
      outMp4,
    ], { stdio: ["pipe", "inherit", "inherit"] });

    const ffDone = new Promise((resolve, reject) => {
      ff.on("close", (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)));
      ff.on("error", reject);
    });

    let lastKey = null;
    let lastBuf = null;
    for (let f = startFrame; f < endFrame; f++) {
      const svg = renderFrameSvg(f, timings.loudness, { showSafeBox: false });
      const key = svg.replace(/_f\d+/g, "_fX");
      let buf;
      if (key === lastKey && lastBuf) {
        buf = lastBuf;
        dedup++;
      } else {
        await cdp.send("Runtime.evaluate", {
          expression: `window.setFrameSvg(${JSON.stringify(svg)})`,
          awaitPromise: true,
        });
        const { data } = await cdp.send("Page.captureScreenshot", {
          format: "jpeg", quality: 94, fromSurface: true,
        });
        buf = Buffer.from(data, "base64");
        lastKey = key;
        lastBuf = buf;
      }
      if (!ff.stdin.write(buf)) {
        await new Promise((r) => ff.stdin.once("drain", r));
      }
    }
    ff.stdin.end();
    await ffDone;
  } finally {
    cdp.close();
    try { proc.kill("SIGKILL"); } catch {}
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}
  }

  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`Chunk ${padded} DONE in ${sec}s (${((endFrame - startFrame) / Number(sec)).toFixed(1)} fps, dedup=${dedup}) -> ${outMp4}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
