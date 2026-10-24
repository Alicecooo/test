/* 阅读站底栏：只留全屏，并补一个静音。
   存档、读档、回想、快进、自动、设置、回标题都藏掉。
   Ctrl 快进、滚轮回想、Esc 隐藏界面一并拦住。点击或空格仍然前进。 */
(function () {
  var hide = [
    "隐藏",
    "显示",
    "回想",
    "重播",
    "自动",
    "快进",
    "快速存档",
    "快速读档",
    "存档",
    "读档",
    "流程图",
    "选项",
    "标题",
    "游戏选项",
    "继续游戏",
    "读取存档",
    "鉴赏",
    "设置",
  ];

  var muted = false;

  function labelOf(el) {
    var node = el.querySelector('[class*="button_text"]');
    var raw = node ? node.textContent : el.textContent;
    return (raw || "").replace(/\s+/g, "");
  }

  var trackedMedia = [];
  var nativePlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function () {
    if (trackedMedia.indexOf(this) === -1) trackedMedia.push(this);
    if (muted) this.muted = true;
    return nativePlay.apply(this, arguments);
  };

  function applyMute() {
    var nodes = document.querySelectorAll("audio, video");
    var i;
    for (i = 0; i < nodes.length; i += 1) nodes[i].muted = muted;
    for (i = 0; i < trackedMedia.length; i += 1) trackedMedia[i].muted = muted;
    var bgm = document.getElementById("currentBgm");
    if (!bgm || muted) return;
    var src = bgm.currentSrc || bgm.src || "";
    if (src.indexOf("title.mp3") !== -1 && bgm.volume > 0.55) bgm.volume = 0.38;
  }

  function ensureMute(bar) {
    if (!bar || document.getElementById("note-mute")) return;
    var btn = document.createElement("button");
    btn.id = "note-mute";
    btn.type = "button";
    btn.textContent = "静音";
    btn.addEventListener("mousedown", function (event) {
      event.stopPropagation();
    });
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      muted = !muted;
      btn.textContent = muted ? "已静音" : "静音";
      btn.setAttribute("aria-pressed", muted ? "true" : "false");
      applyMute();
    });
    bar.appendChild(btn);
  }

  function setLabel(root, label) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.trim()) node.nodeValue = label;
    }
  }

  function ownText(el) {
    var raw = "";
    for (var i = 0; i < el.childNodes.length; i += 1) {
      if (el.childNodes[i].nodeType === 3) raw += el.childNodes[i].nodeValue;
    }
    return raw.replace(/\s+/g, "");
  }

  function trimTitle() {
    var nodes = document.querySelectorAll("div");
    for (var i = 0; i < nodes.length; i += 1) {
      var el = nodes[i];
      var plain = ownText(el);
      if (!plain) continue;
      var btn = el.parentElement;
      if (plain.indexOf("开始") !== -1 || plain === "进入") {
        if (plain.indexOf("进入") === -1) setLabel(el, "进入");
        if (btn) btn.style.display = "";
      } else if (plain.indexOf("游戏选项") !== -1 || plain.indexOf("读取存档") !== -1 || plain.indexOf("继续游戏") !== -1 || plain.indexOf("退出游戏") !== -1 || plain.indexOf("鉴赏") !== -1) {
        if (btn) btn.style.display = "none";
      }
    }
  }

  function trimBar() {
    var buttons = document.querySelectorAll('[class*="_singleButton_rdjpk"]');
    var bar = document.querySelector('[class*="_main_rdjpk"]');
    for (var i = 0; i < buttons.length; i += 1) {
      var el = buttons[i];
      var label = labelOf(el);
      if (!label) {
        el.style.display = "none";
        continue;
      }
      if (label.indexOf("全屏") !== -1) {
        el.style.display = "";
        continue;
      }
      var drop = false;
      for (var h = 0; h < hide.length; h += 1) {
        if (label.indexOf(hide[h]) !== -1) drop = true;
      }
      el.style.display = drop || label.indexOf("全屏") === -1 ? "none" : "";
    }
    ensureMute(bar);
    applyMute();
  }

  function plain(value) {
    return (value || "").replace(/\s+/g, "").replace(/(.)\1\1/g, "$1");
  }

  function noteBox() {
    var best = null;
    var bestArea = 1e15;
    var nodes = document.querySelectorAll("div");
    for (var i = 0; i < nodes.length; i += 1) {
      var el = nodes[i];
      var text = plain(el.innerText);
      if (text.indexOf("笔记") === -1) continue;
      var rect = el.getBoundingClientRect();
      if (rect.width < 500 || rect.height < 80 || rect.height > 900) continue;
      var area = rect.width * rect.height;
      if (area < bestArea) {
        best = el;
        bestArea = area;
      }
    }
    return best;
  }

  function paint(el, prop, value) {
    if (el.style[prop] !== value) el.style[prop] = value;
  }

  function layoutNote(on) {
    var box = noteBox();
    if (!on || !box) return;
    paint(box, "position", "absolute");
    paint(box, "left", "96px");
    /* 文本框的父级贴在舞台底边，高度为 0。向上拉才进画面。 */
    paint(box, "top", "-1330px");
    paint(box, "right", "auto");
    paint(box, "bottom", "auto");
    paint(box, "width", "1180px");
    paint(box, "height", "1160px");
    paint(box, "minHeight", "0");
    paint(box, "maxHeight", "none");
    paint(box, "padding", "132px 96px 96px 148px");
    paint(box, "boxSizing", "border-box");
    paint(box, "justifyContent", "flex-start");
    paint(box, "backgroundColor", "rgba(246, 239, 224, 0.96)");
    paint(box, "backgroundImage", "linear-gradient(90deg, transparent 96px, rgba(146, 64, 52, 0.72) 96px, rgba(146, 64, 52, 0.72) 98px, transparent 98px), linear-gradient(90deg, transparent 112px, rgba(170, 148, 114, 0.45) 112px, rgba(170, 148, 114, 0.45) 113px, transparent 113px), repeating-linear-gradient(to bottom, transparent 0, transparent 51px, rgba(130, 108, 78, 0.38) 52px)");
    paint(box, "backgroundPosition", "0 0, 0 0, 0 118px");
    paint(box, "backgroundRepeat", "no-repeat, no-repeat, repeat");
    paint(box, "border", "1px solid rgba(62, 44, 28, 0.55)");
    paint(box, "boxShadow", "inset 0 0 0 1px rgba(255,248,236,0.45), inset 0 0 40px rgba(120,90,50,0.08), -10px 2px 0 rgba(232,222,204,0.92), -11px 2px 0 rgba(70,52,34,0.22), -18px 6px 0 rgba(214,204,186,0.78), 16px 22px 48px rgba(0,0,0,0.55)");
    paint(box, "transform", "rotate(-0.7deg)");
    paint(box, "transformOrigin", "18% 30%");
    paint(box, "zIndex", "9");
    if (!document.getElementById("note-bookmark")) {
      var mark = document.createElement("div");
      mark.id = "note-bookmark";
      mark.setAttribute("aria-hidden", "true");
      mark.style.cssText = "position:absolute;top:-2px;right:108px;width:34px;height:86px;background:linear-gradient(#8d3b3b,#6a2c2c);box-shadow:2px 6px 10px rgba(0,0,0,0.28);border-radius:0 0 2px 2px;pointer-events:none;z-index:4;";
      box.appendChild(mark);
    }
    var kids = box.querySelectorAll("div, span");
    for (var i = 0; i < kids.length; i += 1) {
      var child = kids[i];
      var text = plain(child.innerText || child.textContent);
      var isName = text === "笔记";
      var ink = isName ? "rgb(110, 83, 68)" : "rgb(44, 38, 31)";
      paint(child, "webkitTextFillColor", ink);
      paint(child, "color", ink);
      paint(child, "textShadow", "none");
      if (isName) {
        paint(child, "top", "48px");
        paint(child, "left", "128px");
      }
      if (text.length > 8) {
        paint(child, "fontSize", "32px");
        paint(child, "lineHeight", "52px");
        paint(child, "width", "100%");
      }
    }
  }

  function syncNote() {
    var on = false;
    var ebg = document.getElementById("ebg");
    if (ebg && /note-room|note\.png/.test(ebg.style.backgroundImage || "")) on = true;
    var bodyText = plain(document.body ? document.body.innerText : "");
    if (bodyText.indexOf("笔记") !== -1) on = true;
    var stage = window.PIXIapp;
    var urls = [];
    if (stage) {
      try {
        collectUrls(stage, urls, 0);
      } catch (err) {
        urls = [];
      }
    }
    for (var i = 0; i < urls.length; i += 1) {
      if (/note-room|note\.png/.test(String(urls[i]))) on = true;
    }
    document.documentElement.classList.toggle("note-mode", on);
    layoutNote(on);
  }

  function collectUrls(obj, out, depth) {
    if (!obj || depth > 5 || out.length > 24) return;
    if (obj.sourceUrl) out.push(obj.sourceUrl);
    var resource = obj.texture && obj.texture.baseTexture && obj.texture.baseTexture.resource;
    if (resource && resource.url) out.push(resource.url);
    var kids = obj.children;
    if (!kids) return;
    for (var i = 0; i < kids.length && i < 16; i += 1) collectUrls(kids[i], out, depth + 1);
  }

  function trim() {
    trimBar();
    trimTitle();
    syncNote();
  }

  function blockGameKeys(event) {
    var code = event.code || "";
    var skip = event.ctrlKey || event.metaKey || code === "ControlLeft" || code === "ControlRight" || event.keyCode === 17;
    var panic = code === "Escape" || code === "Backquote";
    if (skip || panic) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  document.addEventListener("keydown", blockGameKeys, true);
  document.addEventListener("keyup", blockGameKeys, true);
  document.addEventListener(
    "wheel",
    function (event) {
      event.stopPropagation();
    },
    true
  );

  function start() {
    var root = document.getElementById("root") || document.body;
    if (window.MutationObserver) {
      var queued = false;
      var observer = new MutationObserver(function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          trim();
        });
      });
      observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
    }
    trim();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
