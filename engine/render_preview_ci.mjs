// Universal Storyboard Preview PNG Renderer for `lyla360/render-2d-clips`
// Usage: node engine/render_preview_ci.mjs <episodeDir>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn, execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const epArg = process.argv[2];
if (!epArg) throw new Error("Missing <episodeDir> argument");

const EP_DIR = path.resolve(REPO_ROOT, epArg);
const beatsMod = await import(pathToFileURL(path.join(EP_DIR, "src/beats.mjs")).href);
const { HEIGHT, TOTAL_FRAMES, WIDTH } = beatsMod;
const { renderFrameSvg } = await import(pathToFileURL(path.join(EP_DIR, "src/sets/renderFrame.mjs")).href);

const previewFrames = Array.isArray(beatsMod.PREVIEW_FRAMES) && beatsMod.PREVIEW_FRAMES.length
  ? beatsMod.PREVIEW_FRAMES
  : Array.from({ length: Math.min(6, TOTAL_FRAMES) }, (_, i) =>
      Math.min(TOTAL_FRAMES - 1, Math.round((i * (TOTAL_FRAMES - 1)) / Math.max(1, Math.min(6, TOTAL_FRAMES) - 1)))
    );

const timingsPath = path.join(EP_DIR, "timings.json");
const timings = fs.existsSync(timingsPath) ? JSON.parse(fs.readFileSync(timingsPath, "utf8")) : { loudness: [] };

const OUT_DIR = path.join(EP_DIR, "out/preview");
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
  const chromeBin = findChrome();
  const stagePath = path.join(OUT_DIR, "stage_preview.html");
  fs.writeFileSync(
    stagePath,
    `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
      ${fontFaceCss()}
      html, body { margin: 0; padding: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #000; }
      #stage { width: ${WIDTH}px; height: ${HEIGHT}px; }
    </style></head><body><div id="stage"></div>
    <script>
      window.setFrameSvg = (svg) => {
        document.getElementById('stage').innerHTML = svg;
        return new Promise(r => requestAnimationFrame(() => r(true)));
      };
    </script></body></html>`,
    "utf8",
  );

  const port = 9420;
  const userDataDir = path.join(os.tmpdir(), "chrome_ci_preview");
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}

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

    for (let idx = 0; idx < previewFrames.length; idx++) {
      const f = previewFrames[idx];
      const svg = renderFrameSvg(f, timings.loudness || [], { showSafeBox: false });
      await cdp.send("Runtime.evaluate", {
        expression: `window.setFrameSvg(${JSON.stringify(svg)})`,
        awaitPromise: true,
      });
      const { data } = await cdp.send("Page.captureScreenshot", {
        format: "png", fromSurface: true,
      });
      const outPng = path.join(OUT_DIR, `prev_${String(idx).padStart(2, "0")}_f${String(f).padStart(4, "0")}.png`);
      fs.writeFileSync(outPng, Buffer.from(data, "base64"));
      console.log(`Rendered preview ${idx}: frame ${f} -> ${outPng}`);
    }
  } finally {
    cdp.close();
    try { proc.kill("SIGKILL"); } catch {}
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
