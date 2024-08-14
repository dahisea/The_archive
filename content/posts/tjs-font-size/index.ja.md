---
title: 「ティラノールエミュレータ吉里吉里のフォントサイズ設定」
date: 2024-04-20T09:25:04Z
draft: false
description: 『サイズ調整の方法』
tags: [「ギャル」、「クルクル」]

---
## パッチ.tjs
「」
System.setArgument("-debugwin","no");
Plugins.link("キリキロイド2.dll");
with(フォント) {
global._origFontHeightProp = &.height;
プロパティhook_font_height {
setter(v) { global._origFontHeightProp = v * 2.0 }
getter { return global._origFontHeightProp }
}
&.height = &(hook_font_height incontextof null);
}
「」