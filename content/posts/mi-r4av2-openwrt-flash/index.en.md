---
title: "2023 Xiaomi Router 4A Gigabit Edition Mainland China's latest model (r4av2) Openwrt flashing tutorial"
date: 2023-05-19T01:25:04Z
draft: false
description: "Tutorial"
tags: ["routing", "openwrt"]

---
## Preface

I got this Xiaomi Router 4A Gigabit Edition to replace the old router that was hijacked and had serious low performance. But a Xiaomi router is a Xiaomi router after all (nonsense). Through my self-built DNS AdguardHome backend, this router makes a large number of requests to api.miwifi.com (Xiaomi Cloud) and www.baidu.com and www.taobao.com ( The meaning is unknown), I don’t know what kind of medicine is sold in the gourd. I originally thought that this router was easy to deal with, but after various explorations, I found that what the merchant sent was actually r4av2 of new hardware (the overseas version corresponds to the hardware ac1200-rb02).

Popular science here: Xiaomi router 4a gigabit version is divided into ①r4a and r3gv2 ②r4av2 (don’t get confused, the hardware is different, and the firmware is generally not universal

I encountered various problems at that time. Since I was a complete novice in this area, and the hardware version of the router was new, I had no way to find useful information. In the days after the research (and tossing) was suspended, I I experience the 2.4Ghz network disconnection bug of the official firmware every day. Recently, because the exam is over, I have been able to take time (I usually waste a lot of time) to mess with the home network. I want to use the existing limited conditions to create better network conditions (even

I found that there are already cracking tutorials for r4av2 on the Internet, but these tutorials are either a little scattered or too simple (there are big guys in Enshan who can understand it at a glance.png), so I wrote this tutorial to help Dear r4av2 users, please clarify your thoughts. This tutorial can help you crack the permissions of Xiaomi Router 4A Gigabit Edition (r4av2: 2.30.x version hardware, 16M flash memory), and flash breed to use OPENWRT.


## Material

Before starting the tutorial, you need to prepare the following preparatory materials

1. Router body
Xiaomi Router 4A Gigabit Edition (the latest r4av2 hardware, supporting firmware version 2.30.x).

2. Network cable
A network cable that can connect to the router normally.

3. Computer
A computer that can normally connect to the router through a network cable. (The computer is required to be equipped with a Windows system and the system has telnet enabled <If you do not use a computer to execute the command to flash breed, please ignore the system telnet environment status>. It should be noted that bugs may occur in Windows when running the cracking program, so when cracking If you have any problems, please try a few more times).

4. Software
The software tools and firmware packages mentioned in this tutorial. (pick up in the comment area)

5. Eyes
Make sure you are familiar with using a web browser and know where the reset button is located on the router. (Required when using breed)


## If you are ready, you can start

1. Unlock
First, you need to run the unlocking script `V2 version` when the computer is connected to the router normally through a network cable, and enter the corresponding router LAN IP, the local area network IP of the machine, and the router management password. Then, the program will automatically try to unlock the router's permissions. . It is worth mentioning that if you are still unsuccessful using a Windows computer, you'd better try a few more times. If you use an Android phone to run this unlocking script, you will basically not be successful.

2. Put the breed file into it
If you successfully unlock the permissions, you need to upload the breed firmware (breed.bin) through WINSCP (this router uses breed-mt7621-pbr-m1.bin) to the /tmp/ directory of the router. If not, Please take a look at Mr. Ensan’s posts and videos (reference at the end of the article).

3. Flash the breed file
After uploading, you can try to flash in. First connect to the router terminal.
Then you can try to back up (the method comes from the Internet), the poster forgot to back up
The following are the commands:

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

After backing up, copy these files (you can use WINSCP) and save them in case you need to restore the official website in the future.
Then you should execute the breed flash command

```
mtd -r write /tmp/breed.bin Bootloader
```

4. into breed
After you finish brushing, you may enter the breed system. If you want to enter the breed system, please hold down the reset button of the router, then re-plug the power cord of the router, and let go after 3 seconds. At this time, you will enter the breed system (the background address is 192.168.1.1).

5. What is breed?
Note here: breed is a recovery console, used to flash openwrt firmware.

6. After coming in
After entering the breed background, please back up full.bin and eeprom.bin immediately. full.bin may be able to help you save the brick. And eeprom.bin is very important. You should flash the firmware package together with eeprom.bin every time you flash the firmware. If there is no eeprom.bin, it will cause some strange bugs (such as no signal).

7. Flash Openwrt firmware
After the backup is completed, flash the OPENWRT firmware (bottom) and your eeprom.bin together, wait patiently for the progress bar to run out, and then it will automatically restart to OPENWRT, enjoy it!

8. What is the password?
[Additional] If you encounter the need to enter a password, you should try the following (user/password) combination: [root/root][root/(empty)][root/password][(default)/88888888]


## Reference article

"[Some firmware] supes.top" [https://op.supes.top/firmware/ramips_mt7621/xiaomi_mi-router-4a-gigabit-v2/](https://op.supes.top/firmware/ramips_mt7621/ xiaomi_mi-router-4a-gigabit-v2/) (customized firmware source starting with 111)

1. [https://www.right.com.cn/forum /thread-8261014-1-1.html](https://www.right.com.cn/forum/thread-8261014-1-1. html)

2. [https://www.right.com.cn/forum/thread-8269849-1-1.html](https://www.right.com.cn/forum/thread-8269849-1-1. html)

3. [https://www.right.com.cn/forum/thread-8275612-1-1.html](https://www.right.com.cn/forum/thread-8275612-1-1. html) (firmware source starting with right in the comment area)


#Thank you for browsing, the following are suggestions

Before flashing breed, you can use the command to back up all partitions to facilitate restoration to the official firmware. The original poster doesn't know how to do it, so there is no backup. If the official uboot is not backed up, the router cannot return to the official state.

The third-party firmware wifi is not as good as the official one.

The blogger is not responsible if the router dies.

> https://share.dahi.icu/r4av2_mi/