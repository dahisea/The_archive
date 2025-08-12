---
title: "N款静态托管/CDN服务的对比"
date: 2025-07-14T09:25:04Z
draft: false
description: "Serverless服务有很多，静态托管就是重中之重，来看看谁最稳定快速"
tags: ["Github", "Netlify"]
---

# [Netlify](https://www.netlify.com)

注册门槛高，需要使用谷歌邮箱注册。支持IPv6回源。用量限制较宽松，仅有带宽和构建时间限制。 **我认为是免费计划里最快的CDN！并且限制很少！**


因为节点禁Ping，所以这里用Tcping结果展示

**推荐CNAME：** apex-loadbalancer.netlify.com


# [Vercel](https://vercel.com)

零成本用上。注册无门槛，延迟良好。用量限制较严格。仅支持IPv4回源。默认的 `*.vercel.app` 在国内会被SNI阻断，需要绑定自己的域名

**推荐IP：** 76.76.21.21


# [EdgeOne CDN](https://edgeone.ai)

目前处于内测，需要兑换码。获取方式前往 [腾讯云EdgeOne免费计划兑换码 - 立即体验](https://edgeone.ai/zh/redemption) 。无流量和请求数限制。


支持**高级回源设置**


## 全球可用区（不含中国大陆）


## EdgeOne CDN 中国大陆可用区

需要**实名认证**，需要**域名备案**

默认CNAME可用


# [Cloudflare](https://www.cloudflare.com/)

无流量和请求数限制。**无法被打死**



# [Render](https://render.com)

注册简单，具有严格的用量限制

![](../assets/images/0bccb1b9-3fe1-49f0-a255-0805fc0ee35c.webp)

![](../assets/images/2b6104d5-9cee-4e2b-adb5-9aefe02240d2.webp)

# [Github Page](https://pages.github.com/)

需要使用Github Action发布。**中国大陆大部分地区会间歇性阻断**，不推荐使用

![](../assets/images/efccadbf-bc70-4444-bb48-8399cf881617.webp)

2x