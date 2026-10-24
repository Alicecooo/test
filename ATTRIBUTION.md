# 素材出处

个人试玩。没有改 Alicecooo 的博客仓库，也没有向 `github.com/Alicecooo` 推送。

博客：https://github.com/Alicecooo/Aozaki-Touko  
线上：https://alicecooo.github.io/Aozaki-Touko/

## 文字

版权仍归原作者。

- 站名 Aozaki Touko、问候「欢迎回来」、署名句「早安、晚安、谢谢、再见！」来自关于页。
- `game/scene/note-memoir.txt` 的正文压缩自 `content/posts/Summary-First.md` 至 `Summary-Fourth.md`。标题行是占位。
- `game/scene/note-shelf.txt` 只用技术笔记的标题和各文开头一句：Mysql、Redis、Netty、RocketMQ、MyBatis、Zookeeper、Maven、CSAPP、CS106B、MIT 6.s081、算法：滑动窗口。不是全文。
- `game/scene/note-about.txt` 压缩自 `content/about/_index.md`。标题行是占位。
- `game/scene/start.txt` 的引导三句和全部 `choose:` 标签是【待 Alice】占位，不是从博客摘的。

## 当前画面上的图

三张照片都是 Unsplash License，可免费使用。没有使用壳之少女、恋狱或 FLOWERS 的原盘画面。

- `game/background/title-moon.jpg`：标题主图。Maciek Sulkowski 的月夜林。https://unsplash.com/photos/gmejHJ6k-VY
- `game/background/guide-lake.jpg`：引导页背景。Yuan Jie Zhang 的月湖。https://unsplash.com/photos/rPHiXlfIeEA
- `game/background/note-room.jpg`：三页笔记的背景。Loren Cutler 的暗色书架与烛。https://unsplash.com/photos/gxxVCbenKJc
- `atmosphere.png`、`note.png` 是早先画的暗色底，当前脚本不再引用。
- Alice：Type-Moon 官方《魔法使之夜》久遠寺有珠。入口只用 `alice-uniform.png`。`alice-casual.png`、`alice-winter.png`、`alice-mini.png` 留在 `game/figure/`，当前脚本不引用。
- 青子：Type-Moon 官方《魔法使之夜》蒼崎青子制服站姿 `aoko-uniform.png`。`aoko-calm.png`、`aoko-reply.png` 是这张的副本，用来切换靠近。`aoko-think.png` 是同一张把透明度降到大约七成。没有新的表情差分。张开双臂的 `aoko-casual.png` 不上台。`aoko-mini.png` 不叠在文本上。
- 蒼崎橙子没有上台。

这些立绘是官方角色图，这里只作个人试玩，没有再分发许可。公开仓库之前应换成 Alice 自己的图，或另行取得授权。

## 目录里还在、当前入口不引用的背景

`game/background/` 里这些空场景没有被现在的脚本引用：

- `title.png`、`home.png`、`nest.png`、`woods.png`、`shrine.png`、`temple.png`、`pond.png`、`river.png`、`shelf.png`、`corridor.png`、`park.png`：FLOWERS printemps / été 的空背景，经 Spriters Resource 的 Innocent Grey 包。`shrine` 与 `temple` 是同一张教堂板，`river` 与 `pond` 是同一张池塘板。
- `bridge.png`、`rail.png`、`about.png`：殻ノ少女日景包，经 Spriters Resource。原图 800×600，最近邻放大两倍后裁成 1600×900。

商业游戏的场景图同样只作个人试玩，当前流程不显示它们。

## 图标

`game/icons/` 是 Lucide 的 `moon` 线稿，描在深底上。ISC License。

来源：https://github.com/lucide-icons/lucide  
图标路径：https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/moon.svg

不是 WebGAL 自带图标。

## 声音

没有收录壳之少女、恋狱或 FLOWERS 的原盘。

- `game/bgm/title.mp3`：标题。HoliznaCC0《The Ocean and the Moon》，CC0 1.0。https://freemusicarchive.org/music/holiznacc0/will-you-miss-me/the-ocean-and-the-moon/ 挂在 `game/config.txt` 的 `Title_bgm`。
- `game/bgm/guide.mp3`：引导。HoliznaCC0《Moon Unit (Lofi, Reflection, Dreamy)》，CC0 1.0。https://freemusicarchive.org/music/holiznacc0/public-domain-lofi/moon-unit-lofi-reflection-dreamy/ 挂在 `game/scene/start.txt` 的 `bgm:`。
- `game/bgm/note.mp3`：三页笔记。Kevin MacLeod《Night Vigil》，CC BY 4.0。https://incompetech.com/music/royalty-free/mp3-royaltyfree/Night%20Vigil.mp3 署名：Music: Night Vigil by Kevin MacLeod (incompetech.com), Licensed under Creative Commons: By Attribution 4.0。 https://creativecommons.org/licenses/by/4.0/

资料岗指定的笔记曲是 Back_Drop《Dark Piano Ambient (Having Nothing)》（Pixabay Content License，https://pixabay.com/music/ambient-dark-piano-ambient-background-music-having-nothing-216678/）。这个环境打开 Pixabay 一直停在 Cloudflare，文件没有下下来，所以笔记槽改挂了上面的《Night Vigil》。

替换方法见 `game/bgm/README.md`。

## 引擎

OpenWebGAL / WebGAL 4.6.6 网页发行包。许可证 MPL-2.0。  
https://github.com/OpenWebGAL/WebGAL
