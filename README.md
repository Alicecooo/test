# Aozaki Touko

由博客《Aozaki Touko》改成的笔记式阅读站。用 WebGAL 4.6.6 的发行版网页包打开，不是 Hugo，也不是引擎源码。

问候是「欢迎回来」。署名句是「早安、晚安、谢谢、再见！」。作者是 Alicecooo。

引导、选项和三页标题还是【待 Alice】。日记、索引、关于的正文是博客的临时改写。标题是一张月夜林，引导页是月湖，笔记页是暗色书架。三首 BGM 已挂上：标题和引导是 HoliznaCC0 的 CC0，笔记是 Kevin MacLeod《Night Vigil》（CC BY）。槽位清单在 [CONTENT_SLOTS.md](CONTENT_SLOTS.md)，出处在 [ATTRIBUTION.md](ATTRIBUTION.md)。

## 流程

1. 暗色标题。主图是淡的氛围底。只点「进入」。
2. 引导三句，都标着【待 Alice】。左右各留一个人。
3. 三个选项：选项一进日记，选项二进书脊索引，选项三进关于。
4. 点选项后，左侧人物淡出。左边是笔记纸，右边的青子随段落换成平静、靠近、略退后。
5. 每页笔记末尾仍是这三个选项，可以改去另一页。

底栏只有「全屏」和「静音」。存档、读档、回想、快进、自动、设置、流程图都不显示。用点击或空格前进。

旧脚本若被直接打开，会转到现在的笔记，不会进一套旧对话：

| 文件 | 转到 |
| --- | --- |
| `game/scene/hall.txt` | `start.txt` |
| `game/scene/note.txt`、`memoir.txt`、`ending-west.txt`、`ending-nest.txt` | `note-memoir.txt` |
| `game/scene/shelf.txt` | `note-shelf.txt` |
| `game/scene/about.txt`、`ending-goodnight.txt` | `note-about.txt` |

## 本地预览

需要 Python 3。第一次运行还会用到 curl 和 unzip，从 OpenWebGAL 下载约 50MB 的网页发行包。

```bash
chmod +x scripts/preview.sh
./scripts/preview.sh
```

浏览器打开 [http://127.0.0.1:41773](http://127.0.0.1:41773)。换端口：

```bash
PORT=41773 ./scripts/preview.sh
```

脚本把 `game/` 盖到 `dist/webgal/` 再提供静态页。引擎已下载过就会复用。端口上若已经有预览，它只覆盖文件，不另起一个服务。

## 替换

路径和当前占位句见 [CONTENT_SLOTS.md](CONTENT_SLOTS.md)。

- 引导和选项：改 `game/scene/start.txt`。三个选项在四份脚本的 `choose:` 里各写一次，标签要一起改，文件名别动。
- 三页正文：`game/scene/note-memoir.txt`、`note-shelf.txt`、`note-about.txt`。标题行保留【待 Alice】直到定题。说话人用 `笔记:`，行末加分号。
- 主图：换掉 `game/background/title-moon.jpg`，或改 `game/config.txt` 的 `Title_img`。
- 引导背景：`game/background/guide-lake.jpg`，对应 `game/scene/start.txt` 的 `changeBg`。
- 笔记底：`game/background/note-room.jpg`，三页笔记的 `changeBg` 一起改。
- 图标：替换 `game/icons/` 里的同名文件。现在是 Lucide 的 moon。
- BGM：覆盖 `game/bgm/` 里的 `title.mp3`、`guide.mp3`、`note.mp3`，或按 [game/bgm/README.md](game/bgm/README.md) 改 `Title_bgm` / `bgm:` 那一行。

## 改编自哪里

只读来源：

- https://github.com/Alicecooo/Aozaki-Touko
- https://alicecooo.github.io/Aozaki-Touko/

这个项目没有修改原博客仓库，也没有向 `github.com/Alicecooo` 推送任何内容。立绘、旧背景和图标的许可见 [ATTRIBUTION.md](ATTRIBUTION.md)。

## 以后若要发布

这里不会替任何人创建仓库或推到 GitHub。

若自己部署，先在本机跑一次 `scripts/preview.sh`，然后把 `dist/webgal/` 里面的文件当作站点根目录：`index.html`、`assets/`、`game/`、`icons/`。不要再套一层文件夹。发布的是发行版网页，不是 WebGAL Terre，也不是 WebGAL 源码树。说明见 [WebGAL 的网页发布文档](https://docs.openwebgal.com/publish/web/)。

WebGAL 4.6.6 使用相对路径（`./game/...`、`./assets/...`）。Pages 的站点根就是这些文件，打开时地址以 `/` 结尾。

引擎许可证是 MPL-2.0。博客文字的版权仍归原作者。官方立绘没有再分发许可，公开之前要换成自己的图，或另行授权。
