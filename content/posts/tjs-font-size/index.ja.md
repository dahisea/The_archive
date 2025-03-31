---
title: "TyranorエミュレーターKirikiriフォントサイズ設定"
date: 2024-04-20T09:25:04Z
draft: false
description: "サイズ調整方法"
tags: [「ガラン」、「ゲスト」
---
## patch.he is
```
system.setargument（ " - しかしwin"、 "no"）;
plugins.linkou（ "kiri ki peopleid2。dala"）;
（フォント）{
global._origfontheightprop =＆.height;
プロパティhook_font_height {
setter（v）{global._origfontheightprop = v * 2.0;
getter {return global._origfontheightprop;
}
＆.height =＆（hook_font_height in Contection oh、家の奴隷は涙を流します）。
}
```