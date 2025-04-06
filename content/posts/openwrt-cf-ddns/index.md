---
title: "OpenWrt上Cloudflare DDNS 設定步驟教學"
date: 2024-08-01T10:25:04Z
draft: false
description: "在 OpenWrt 上設定 Cloudflare 動態 DNS 解析"
tags: ["openwrt", "ddns", "cloudflare"]

---

## 📌 Cloudflare DDNS 設定步驟

### 1. 檢查 DDNS 服務是否支援 Cloudflare
在 OpenWrt 的 DDNS 設定中，確認是否有「cloudflare.com-v4」選項：

![DDNS 服務列表](https://oxs.dahi.icu/pic/Screenshot_20240802-183356.png)
![DDNS 服務選項](https://oxs.dahi.icu/pic/Screenshot_20240802-183347.png)

### 2. 在 Cloudflare 建立 DNS 記錄
- 登入 Cloudflare 控制台
- 為你的網域新增一筆 DNS 記錄：
  - IPv4 請選擇「A」記錄
  - IPv6 請選擇「AAAA」記錄
- 記錄值可先隨意設定，稍後會自動更新

### 3. 建立 Cloudflare API Token
1. 前往 [Cloudflare API Tokens 頁面](https://dash.cloudflare.com/profile/api-tokens)
2. 選擇「Create Token」→「Create custom token」
3. 設定權限：
   - 權限類型：Zone
   - 權限設定：DNS → Edit
4. 建立並妥善保存 Token

### 4. OpenWrt DDNS 模組設定
![OpenWrt DDNS 設定畫面](https://oxs.dahi.icu/pic/Screenshot_20240802-194810~2.png)
看著辦吧，以上要注意。密碼就是你的token。
![設定成功畫面](https://oxs.dahi.icu/pic/Screenshot_20240802-195526.png)

### 5. 儲存並應用設定
完成設定後：
1. 點擊「儲存並應用」
2. 建議重新啟動路由器
3. 等待幾分鐘後檢查 Cloudflare 控制台，確認 DNS 記錄已自動更新

---

## 💡 注意事項
- API Token 請妥善保管，不要外洩
- 若 IP 變更頻繁，可縮短檢查間隔時間
- 建議同時設定 IPv4 和 IPv6 記錄以確保連線品質

---

## 📚 參考資源
- [OpenWrt 官方文件](https://openwrt.org/docs/guide-user/services/ddns/client)
- [Cloudflare API 文件](https://developers.cloudflare.com/api/)
- [外國大神教學](https://alexskra.com/blog/dynamc-dnsddns-with-openwrt-and-cloudflare/)


> 現在您可以享受穩定可靠的 Cloudflare DDNS 服務了！
