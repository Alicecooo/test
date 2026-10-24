# 待补槽位

引导、三个选项、三页标题仍是占位，句子里带【待 Alice】。笔记正文是从博客改写来的临时条目，用来把三个入口分开，不是她的最终文案。标题图、引导底、笔记底和三首 BGM 已经挂上可商用素材，仍可以换。图标仍是 Lucide moon。

改完脚本或图片后运行 `./scripts/preview.sh`。

## 文案

四个脚本末尾的 `choose:` 是同一组选项。改标签时四处一起改，冒号后面的文件名不要动。

| 槽位 | 路径 | 现在写着 |
| --- | --- | --- |
| 引导三句 | `game/scene/start.txt` | `【待 Alice】引导第一句` / `第二句` / `第三句` |
| 选项一 | `game/scene/start.txt`、`note-memoir.txt`、`note-shelf.txt`、`note-about.txt` | `【待 Alice】选项一` → `note-memoir.txt` |
| 选项二 | 同上四处 | `【待 Alice】选项二` → `note-shelf.txt` |
| 选项三 | 同上四处 | `【待 Alice】选项三` → `note-about.txt` |
| 日记标题 | `game/scene/note-memoir.txt` | `【日记 · 待 Alice 定题】` |
| 索引标题 | `game/scene/note-shelf.txt` | `【索引 · 待 Alice 定题】` |
| 关于标题 | `game/scene/note-about.txt` | `【关于 · 待 Alice 定题】` |

日记、索引、关于里 `笔记:` 开头的其余行是临时正文。整段替换即可，说话人保持 `笔记:`，行末保留分号。

## 画面和声音

| 槽位 | 路径 | 现在 |
| --- | --- | --- |
| 标题主图 | `game/background/title-moon.jpg`，`game/config.txt` 的 `Title_img` | Maciek Sulkowski 的月夜林 |
| 引导背景 | `game/background/guide-lake.jpg`，`game/scene/start.txt` 的 `changeBg` | Yuan Jie Zhang 的月湖 |
| 笔记底 | `game/background/note-room.jpg`，三页笔记的 `changeBg` | Loren Cutler 的暗色书架 |
| 站点图标 | `game/icons/` | Lucide `moon`。换图时保持这些文件名：`favicon.ico`、`favicon-32.png`、`apple-touch-icon.png`、`icon-192.png`、`icon-512.png`、`icon-192-maskable.png`、`icon-512-maskable.png`、`moon.svg` |
| 标题 BGM | `game/bgm/title.mp3`，`Title_bgm:title.mp3;` | HoliznaCC0《The Ocean and the Moon》，CC0 |
| 引导 BGM | `game/bgm/guide.mp3`，`start.txt` 的 `bgm:guide.mp3` | HoliznaCC0《Moon Unit》，CC0 |
| 笔记 BGM | `game/bgm/note.mp3`，三页笔记的 `bgm:note.mp3` | Kevin MacLeod《Night Vigil》，CC BY 4.0。Pixabay 指定曲没能下下来 |

台上的人现在是 `game/figure/alice-uniform.png`，以及青子的 `aoko-calm.png`、`aoko-reply.png`、`aoko-think.png`。真立绘到了再按同名覆盖。`aoko-casual.png` 不要拿上台。
