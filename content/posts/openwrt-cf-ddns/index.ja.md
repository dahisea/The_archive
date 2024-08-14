---
title: 「Openwrt の CloudflareDDNS 設定」
date: 2024-08-01T10:25:04Z
draft: false
description: 「DDNSの方法」
tags: [「オープンワート」]

---
### 1. Cloudflare.com-v4 が DDNS 設定に含まれているかどうかを確認します

![スクリーンショット_20240802-183356.png](https://oxs.dahi.icu/pic/スクリーンショット_20240802-183356.png)
![Screenshot_20240802-183347.png](https://oxs.dahi.icu/pic/Screenshot_20240802-183347.png)


### 2. CF 解析を構成する

対応する解像度を自由に設定するだけです。ipv4 は a、ipv6 は aaaa


### 3. CF API トークンの作成
私のプロフィール -> API トークン -> トークンの作成 -> カスタムトークンの作成

https://dash.cloudflare.com/profile/api-tokens

必要な権限: ゾーンの DNS 変更

### 4. 図に示すように、OpenwrtDDNS モジュールを構成します。
![スクリーンショット_20240802-194810~2.png](https://oxs.dahi.icu/pic/スクリーンショット_20240802-194810~2.png)

引用
> https://alexskra.com/blog/dynamc-dnsddns-with-openwrt-and-cloudflare/

![スクリーンショット_20240802-194810~2.png](https://oxs.dahi.icu/pic/スクリーンショット_20240802-194810~2.png)

外国人マスターの指導に感謝します（

![スクリーンショット_20240802-195526.png](https://oxs.dahi.icu/pic/スクリーンショット_20240802-195526.png)

## さて、再起動してお楽しみください。