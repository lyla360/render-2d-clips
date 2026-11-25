# 2D Clips Cloud Render Hub (`lyla360/render-2d-clips`)

Single **public** 20-way GitHub Actions **Chromium CDP + FFmpeg** render hub dedicated exclusively to 2D motion graphics and documentary clips (`16:9` 1920x1080 or `9:16` 1080x1920).

## Repository Layout
```text
engine/
  render_chunk_ci.mjs    # Universal 20-way Chromium CDP chunk renderer
  render_preview_ci.mjs  # Storyboard keyframe PNG preview renderer
  fajwah/                # Shared Fajwah/Kurzgesagt palette, characters & motion helpers
assets/fonts/            # Shared bundled Arabic fonts (Aref Ruqaa, Cairo, Lalezar, Noto Naskh Arabic, Reem Kufi)
episodes/
  _template/             # Starter 2D SVG episode skeleton
.github/workflows/
  render-2d.yml          # Cloud pipeline (preview / 20x full + audio mux)
```

## Dispatch Cloud Renders
```bash
# Storyboard Preview Stills
gh workflow run render-2d.yml -R lyla360/render-2d-clips -f episode=<episode> -f mode=preview

# 20-Way Parallel Full Render + Audio Mux
gh workflow run render-2d.yml -R lyla360/render-2d-clips -f episode=<episode> -f mode=full -f project_slug=<slug> -f aspect=16x9
```
