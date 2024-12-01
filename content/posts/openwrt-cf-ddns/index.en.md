---
title: "CloudflareDDNS configuration for Openwrt"
date: 2024-08-01T10:25:04Z
draft: false
description: "A ddns way"
tags: ["openwrt"]

---
### 1. Check whether Cloudflare.com-v4 is included in the DDNS settings

![Screenshot_20240802-183356.png](https://oxs.dahi.icu/pic/Screenshot_20240802-183356.png)
![Screenshot_20240802-183347.png](https://oxs.dahi.icu/pic/Screenshot_20240802-183347.png)


### 2. Configure CF parsing

Just configure a corresponding resolution at will, ipv4 is a, ipv6 is aaaa


### 3. Create CF API TOKEN
My profile -> API Tokens -> Create Token -> Create custom token

https://dash.cloudflare.com/profile/api-tokens

Required permissions: Zone DNS modification

### 4. As shown in the figure, configure the OpenwrtDDNS module
![Screenshot_20240802-194810~2.png](https://oxs.dahi.icu/pic/Screenshot_20240802-194810~2.png)

Quote
> https://alexskra.com/blog/dynamc-dnsddns-with-openwrt-and-cloudflare/

![Screenshot_20240802-194810~2.png](https://oxs.dahi.icu/pic/Screenshot_20240802-194810~2.png)

Thanks to foreign masters for their guidance (

![Screenshot_20240802-195526.png](https://oxs.dahi.icu/pic/Screenshot_20240802-195526.png)

## Now, reboot and enjoy it.