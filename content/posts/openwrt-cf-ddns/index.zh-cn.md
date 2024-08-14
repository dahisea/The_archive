---
title: "Openwrt的CloudflareDDNS配置"
date: 2024-08-01T10:25:04Z
draft: false
description: "一种ddns方式"
tags: ["openwrt"]

---
### 1. 检查DDNS设置中是否包含Cloudflare.com-v4

![Screenshot_20240802-183356.png](https://oxs.dahi.icu/pic/Screenshot_20240802-183356.png)
![Screenshot_20240802-183347.png](https://oxs.dahi.icu/pic/Screenshot_20240802-183347.png)


### 2. 配置CF解析

随意配置一个对应的解析就行了，ipv4就a，ipv6就aaaa


### 3. 创建CF API TOKEN
My profile -> API Tokens -> Create Token -> Create custom token

https://dash.cloudflare.com/profile/api-tokens

所需权限：区域 DNS 修改

### 4.如图所示，配置OpenwrtDDNS模组
![Screenshot_20240802-194810~2.png](https://oxs.dahi.icu/pic/Screenshot_20240802-194810~2.png)

引用
> https://alexskra.com/blog/dynamc-dnsddns-with-openwrt-and-cloudflare/

![Screenshot_20240802-194810~2.png](https://oxs.dahi.icu/pic/Screenshot_20240802-194810~2.png)

感谢外国大神指点（

![Screenshot_20240802-195526.png](https://oxs.dahi.icu/pic/Screenshot_20240802-195526.png)

## Now, reboot and enjoy it.