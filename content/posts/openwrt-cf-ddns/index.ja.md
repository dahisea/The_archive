---
title: "OpenWrtのCloudFlaredDns構成"
date: 2024-08-01T10:25:04Z
draft: false
description: "DDNSメソッド"
tags: [「ああ、人体にスプレーする」]
---
### 1。cloudflare.com-v4がDDNS設定に含まれているかどうかを確認します

！[screenshot_20240802-183356.pinnico]（https：// oh like.dahi.icu/batch/screenshot_20240802-183356.pinnico）
！[screenshot_20240802-183347.pinnico]（https：// oh like.dahi.icu/batch/screenshot_20240802-183347.pinnico）


### 2。CF解析を構成します

対応する解析を自由に構成するだけで、ipv4はa、ipv6はaaaaです


###3。CFAPIトークンを作成します
私のプロフィール - > APIトークン - >トークンを作成 - >カスタムトークンを作成します

https://dash.cloudflare.com/profile/api-tokens

必要な権限：リージョンDNS変更

### 4。図に示すように、openwrtddnsモジュールを構成します
..

引用
> https：// alexはguest.com/blog/ for the carriage-denis's tannin-with-ohスプレーを人体に備えています。

..

彼らのアドバイスをしてくれた外国のマスターに感謝します（

！[screenshot_20240802-195526.pinnico]（https：// oh like.dahi.icu/batch/screenshot_20240802-195526.pinnico）

##さあ、再起動して楽しんでください。