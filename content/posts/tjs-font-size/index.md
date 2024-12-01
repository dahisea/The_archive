---
title: "Tyranor模擬器Kirikiri字型大小設定"
date: 2024-04-20T09:25:04Z
draft: false
description: "一種大小調節方式"
tags: ["gal", "krkr"]
---
## patch.tjs
```
System.setArgument("-debugwin","no");
Plugins.link("kirikiroid2.dll");
with(Font) {
global._origFontHeightProp = &.height;
property hook_font_height {
setter(v) { global._origFontHeightProp = v * 2.0; }
getter { return global._origFontHeightProp; }
}
&.height = &(hook_font_height incontextof null);
}
```