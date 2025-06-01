---
title: "2025年中國內地 Cloudflare DNS over HTTPS (DoH) 使用教程"
date: 2025-06-01T03:25:04Z
draft: false
description: "分享經驗"
tags: ["dns", "cloudflare"]
---

# Cloudflare DNS over HTTPS （DoH） 使用教程

Cloudflare 提供多種 DNS over HTTPS （DoH） 服務端點，包括標準 DNS、家庭保護 DNS 和安全 DNS 服務。
而其附帶的諸如ECH等各種功能，似是禁忌樂章。
以下是詳細使用教程。來自中國內地的報告顯示，Cloudflare的部分DNS網域已被封鎖。但是封的居然不是全域，離譜了，用子網域就行。看來是開了後門。

## Cloudflare DoH

Cloudflare 提供以下公共 DNS over HTTPS 端點：

1. **標準 DNS**：
   - `https://cloudflare-dns.com/dns-query`
   - 'https://[任意子域].cloudflare-gateway.com/dns-query'

2. **家庭保護 DNS** （攔截惡意內容和成人內容）：
   - `https://family.cloudflare-dns.com/dns-query`
   - 'https://[任意子域].family.cloudflare-dns.com/dns-query'

3. **安全 DNS** （僅攔截惡意內容）：
   - `https://security.cloudflare-dns.com/dns-query`
   - 'https://[任意子域].security.cloudflare-dns.com/dns-query'

## 瀏覽器直接配置

手動配置安全的DNS

## 高級應用

### 在路由器上配置

許多現代路由器支援自定義DNS，可將上述DNS伺服器位址配置到路由器，使所有連接設備自動使用。

### 行動裝置配置

**Android 9+**：
- 設置 > 網路和互聯網 > 私人DNS
- 輸入：『任意子域.security.cloudflare-dns.com』

**iOS**：
- 需要使用配置檔

通過以上配置，您可以充分利用Cloudflare提供的各種DNS over HTTPS服務，根據需求選擇標準、安全或家庭保護模式。使用此公司提供的DNS時，請注意你所在地區的法律。