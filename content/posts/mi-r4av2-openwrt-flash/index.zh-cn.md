---
title: "2023小米路由器4A千兆版大陆最新款（r4av2）Openwrt刷入教程"
date: 2023-05-19T01:25:04Z
draft: false
description: "教程"
tags: ["路由", "openwrt"]

---
## 前言

我拿到这款小米路由器4A千兆版，替换掉了劫持严重性能低下的旧路由器。但小米路由器终究是小米路由器（废话），经过我的自建DNS的AdguardHome后台，这款路由器每天都会大量请求api.miwifi.com（小米云端） 以及www.baidu.com 和www.taobao.com （意味不明），不知葫芦里卖的是什么药。本来以为这款路由器挺好折腾的，但是经过种种探索后，我发现商家发来的居然是新款硬件的r4av2（海外版对应硬件ac1200-rb02）。

在此科普：小米路由器4a千兆版分为①r4a与r3gv2②r4av2（别搞混了，硬件不一样的，固件一般不通用

当时遇到了各种问题，由于本人在此方面纯属小白，加上路由器的这个硬件版本是新出的，所以我没有办法找到有用的资料，研究（折腾）就此暂停之后的日子里，我每天便体验着官方固件的2.4Ghz断网bug。而最近由于考试结束，我得以抽出时间（平时也浪费了很多时间啊啊啊）来折腾家庭网络，我要以现有的有限的条件，创造更好的网络条件（甚

我发现网络上已经有针对r4av2的破解教程，但这些教程要么有些零散，要么过分简单（恩山里都是大佬一看就懂滴.png），所以，我写了这篇教程，是为了帮助各位r4av2用户捋清楚思路。这个教程可以帮助您破解锁小米路由器4A千兆版（r4av2: 2.30.x版本硬件，16M闪存）的权限，并刷入breed进而使用OPENWRT。


## 材料

教程在开始之前，您需要准备以下预备材料

1.  路由器本体
小米路由器4A千兆版（最新款r4av2硬件，支援固件版本为2.30.x）。

2.  网线
一根能够正常与路由器进行连结的网线。

3.  电脑
一台能够通过网线正常与路由器进行连结的电脑。 （要求电脑搭载Windows系统，系统开启telnet<如果你不用电脑来执行刷写breed的命令，请忽略系统telnet环境状态>。需要注意的是Windows在运行破解程序时是可能出现bug的，故破解时如有问题请多试几次）。

4.  软件
本教程中所提到的软件工具与固件包。 （评论区自取）

5.  眼睛
确保您熟悉使用网页浏览器，并且了解路由器复位键位于路由器的什么位置。 （breed使用时需要）


## 如果准备好了，那就可以开始了

1.  解锁
首先，你需要在电脑通过网线正常与路由器进行连结时，运行解锁脚本`V2版`，输入对应的路由器局域网ip、本机的局域网ip、路由器管理密码，接着，程序会自动尝试解锁路由器的权限。值得一提的是，如果你使用Windows电脑仍未成功，那么你最好是多试几次。如果您使用安卓手机进行此解锁脚本的运行，那么等待着你的基本上是不会成功。

2.  把breed文件放进去
如果你成功解锁了权限，你就需要通过WINSCP上传breed固件（breed.bin）（这款路由器使用的是breed-mt7621-pbr-m1.bin）到路由器的/tmp/目录下上传的方法如果不会请看恩山大佬的帖子和视频（文章结尾处参考）。

3.  刷入breed文件
上传完了就可以尝试刷入，先连接路由器终端，
然后你可以尝试备份（方法来自网络），楼主忘记备份了
以下为命令：

```
    cd /tmp
    mkdir backupB9AD
    cd backupB9AD
    dd if=/dev/mtd0 of=/tmp/backupB9AD/mtd0-ALL.bin
    dd if=/dev/mtd1 of=/tmp/backupB9AD/mtd1-Bootloader.bin
    dd if=/dev/mtd2 of=/tmp/backupB9AD/mtd2-Config.bin
    dd if=/dev/mtd3 of=/tmp/backupB9AD/mtd3-Bdata.bin
    dd if=/dev/mtd4 of=/tmp/backupB9AD/mtd4-Factory.bin
    dd if=/dev/mtd5 of=/tmp/backupB9AD/mtd5-crash.bin
    dd if=/dev/mtd6 of=/tmp/backupB9AD/mtd6-cfg_bak.bin
    dd if=/dev/mtd7 of=/tmp/backupB9AD/mtd7-overlay.bin
    dd if=/dev/mtd8 of=/tmp/backupB9AD/mtd8-OS1.bin
    dd if=/dev/mtd9 of=/tmp/backupB9AD/mtd9-rootfs.bin
    dd if=/dev/mtd10 of=/tmp/backupB9AD/mtd10-disk.bin
```

备份完把这几个文件复制出来（可以用WINSCP）保存好，以后万一要恢复官方要用到
然后然后你应该执行breed刷写命令

```
mtd -r write /tmp/breed.bin Bootloader
```

4.  进breed
刷好了可能也就进入breed系统了。如果你要进入breed系统，请按着路由器复位键不动，然后重新插入路由器电源线，3秒后松手，此时你就进入了breed系统（后台地址为192.168.1.1）。

5.  breed是什么
在此说明：breed是一个恢复控制台，刷openwrt固件用的。

6.  进来之后
进入breed后台后，请立即备份full.bin和eeprom.bin。 full.bin可能可以帮助你救砖。而eeprom.bin很重要，你在每一次固件刷写时都应将固件包与eeprom.bin一并刷入，如果没有eeprom.bin，会导致一些奇怪的bug（比如没信号）。

7.  刷入Openwrt固件
备份完毕后，将OPENWRT固件（底部）和你的eeprom.bin一并刷入，耐心等待进度条跑完，然后就会自动重启到OPENWRT了，enjoy it!

8.  密码多少
【附加】如果你遇到需要输入密码时，你应该尝试以下（用户/密码）组合：[root/root][root/（空）][root/password][（默认）/88888888]


## 参考文章

《【一些固件】supes.top》 [https://op.supes.top/firmware/ramips_mt7621/xiaomi_mi-router-4a-gigabit-v2/](https://op.supes.top/firmware/ramips_mt7621/ xiaomi_mi-router-4a-gigabit-v2/) （111开头的定制固件来源）

1. [https://www.right.com.cn/forum /thread-8261014-1-1.html](https://www.right.com.cn/forum/thread-8261014-1-1. html)

2. [https://www.right.com.cn/forum/thread-8269849-1-1.html](https://www.right. com.cn/forum/thread-8269849-1-1. html)

3. [https://www.right.com.cn/forum/thread-8275612- 1-1.html](https://www.right.com.cn/forum/thread-8275612-1-1. html) （评论区中right开头固件来源）


# 感谢您的浏览，以下是建议

在刷入breed之前可以用命令备份一下全部分区，方便恢复到官方固件。楼主不会，所以没备份。如果没备份官方uboot，那么路由器则不能回到官方状态。

第三方固件wifi不如官方。

路由器折腾死了博主不负责。

> https://share.dahi.icu/r4av2_mi/