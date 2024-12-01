---
title: "Tyranor emulator Kirikiri font size settings"
date: 2024-04-20T09:25:04Z
draft: false
description: "A way to adjust the size"
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