#!/usr/bin/env bash
# Download the WebGAL 4.6.6 web release, overlay this repo's game/, and serve it.
# Does not touch github.com/Alicecooo.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-41773}"
VER="4.6.6"
CACHE="$ROOT/vendor"
DIST="$ROOT/dist/webgal"
ZIP="$CACHE/WebGAL-${VER}-web.zip"
URL="https://github.com/OpenWebGAL/WebGAL/releases/download/${VER}/WebGAL-${VER}-web.zip"

mkdir -p "$CACHE"
if [[ ! -f "$DIST/index.html" || ! -f "$DIST/webgal-engine.json" ]]; then
  if [[ ! -f "$ZIP" ]]; then
    echo "下载 WebGAL ${VER} 网页发行包……"
    curl -L --fail --retry 3 -o "$ZIP" "$URL"
  fi
  rm -rf "$DIST"
  mkdir -p "$DIST"
  unzip -q -o "$ZIP" -d "$DIST"
fi

cp "$ROOT/game/config.txt" "$DIST/game/config.txt"
cp "$ROOT/game/flowchart.json" "$DIST/game/flowchart.json"
cp "$ROOT/game/ATTRIBUTION.txt" "$DIST/game/ATTRIBUTION.txt"
find "$DIST/game/scene" -maxdepth 1 -type f -name '*.txt' -delete
cp "$ROOT/game/scene/"*.txt "$DIST/game/scene/"
mkdir -p "$DIST/game/background" "$DIST/game/figure"
find "$DIST/game/background" -maxdepth 1 -type f ! -name '*.webp' -delete
find "$DIST/game/figure" -maxdepth 1 -type f ! -name '*.webp' -delete
cp "$ROOT/game/background/"* "$DIST/game/background/"
cp "$ROOT/game/figure/"* "$DIST/game/figure/"
if [[ -f "$ROOT/game/userStyleSheet.css" ]]; then
  cp "$ROOT/game/userStyleSheet.css" "$DIST/game/userStyleSheet.css"
fi
if [[ -d "$ROOT/game/template" ]]; then
  mkdir -p "$DIST/game/template"
  cp -a "$ROOT/game/template/." "$DIST/game/template/"
fi
if [[ -f "$ROOT/game/player-chrome.js" ]]; then
  cp "$ROOT/game/player-chrome.js" "$DIST/game/player-chrome.js"
fi
if [[ -d "$ROOT/game/icons" ]]; then
  mkdir -p "$DIST/icons"
  cp "$ROOT/game/icons/"* "$DIST/icons/"
fi
if [[ -d "$ROOT/game/bgm" ]]; then
  mkdir -p "$DIST/game/bgm"
  cp -a "$ROOT/game/bgm/." "$DIST/game/bgm/"
fi

python3 - "$DIST" << 'PY'
import json
import sys
from pathlib import Path
dist = Path(sys.argv[1])
index = dist / "index.html"
text = index.read_text(encoding="utf-8")
text = text.replace("<title>WebGAL</title>", "<title>Aozaki Touko</title>", 1)
marker = "<!-- player-chrome -->"
if marker not in text:
    tag = '    <!-- player-chrome -->\n    <script src="./game/player-chrome.js"></script>\n'
    text = text.replace("</body>", tag + "  </body>", 1)
text = text.replace(
    "background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);",
    "background: #0c0a0e;",
    1,
)
text = text.replace(
    """        background: linear-gradient(
          165deg,
          rgba(255, 255, 255, 0.25) 0%,
          rgba(255, 255, 255, 1) 50%,
          rgba(255, 255, 255, 0.25) 100%
        );""",
    "        background: #0c0a0e;",
    1,
)
text = text.replace(
    ".title-enter-container__center-text {\n        width: 100%;",
    ".title-enter-container__center-text {\n        color: #f3ecdf;\n        width: 100%;",
    1,
)
text = text.replace(
    """.title-enter-container__link-to-github {
        position: absolute;
        bottom: 1em;
        color: #999;
        font-size: 75%;
        display: flex;""",
    """.title-enter-container__link-to-github {
        position: absolute;
        bottom: 1em;
        color: #999;
        font-size: 75%;
        display: none;""",
    1,
)
text = text.replace("<div>PRESS THE SCREEN TO START</div>", "<div>点击画面</div>", 1)
text = text.replace("whiteBackground.style.opacity = '1';", "whiteBackground.style.opacity = '0';", 1)
text = text.replace(
    "titleEnter.style.background = 'linear-gradient( #a1c4fd 0%, #c2e9fb 100%)'; // 改变标题渐变效果",
    "titleEnter.style.background = '#0c0a0e';",
    1,
)
index.write_text(text, encoding="utf-8")
manifest = json.loads((dist / "manifest.json").read_text(encoding="utf-8"))
manifest["name"] = "Aozaki Touko"
manifest["short_name"] = "Aozaki Touko"
manifest["description"] = "欢迎回来。早安、晚安、谢谢、再见。"
(dist / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
engine = json.loads((dist / "webgal-engine.json").read_text(encoding="utf-8"))
engine["name"] = "Aozaki Touko"
(dist / "webgal-engine.json").write_text(json.dumps(engine, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
PY

if [[ -f "$ROOT/ATTRIBUTION.md" ]]; then
  cp "$ROOT/ATTRIBUTION.md" "$DIST/game/ATTRIBUTION.md"
fi
if [[ -f "$ROOT/CONTENT_SLOTS.md" ]]; then
  cp "$ROOT/CONTENT_SLOTS.md" "$DIST/game/CONTENT_SLOTS.md"
fi

echo "静态页目录：$DIST"
echo "打开 http://127.0.0.1:${PORT}"
if python3 -c "import socket,sys; s=socket.socket(); s.settimeout(0.5); r=s.connect_ex(('127.0.0.1', ${PORT})); s.close(); sys.exit(0 if r==0 else 1)"; then
  echo "端口 ${PORT} 已在监听，游戏文件已覆盖到该预览。"
  exit 0
fi
cd "$DIST"
exec python3 -m http.server "$PORT" --bind 0.0.0.0
