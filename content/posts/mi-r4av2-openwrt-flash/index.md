---
title: "小米路由器4A千兆版最新款（r4av2）Openwrt刷入教程"
date: 2023-05-19T01:25:04Z
draft: false
description: "教程"
tags: ["路由", "openwrt"]
---

### **2023 小米路由器 4A 千兆版 （r4av2） OpenWrt 刷機完整教程**  
** ⚠️ 注意：本教程適用於硬體版本 r4av2（固件版本 2.30.x），與舊版 r4a/r3gv2 不兼容！ **  

---

## ** 📌 前言**  
我最近購買了 **小米路由器 4A 千兆版（r4av2）**，替換了舊的路由器。 但使用官方固件時發現以下問題：  
1. **後台偷偷請求** 'api.miwifi.com'（小米雲端服務）  
2. **莫名訪問** 'www.baidu.com' 和 'www.taobao.com'（原因不明）  
3. **2.4GHz WiFi 頻繁斷連**（官方固件 Bug）  

經過研究，發現這款路由器的硬體版本是 **r4av2**（海外對應型號 **ac1200-rb02**），與舊版 **r4a/r3gv2** 不同，固件不通用。  

由於網上教程較零散，我整理了一份 **完整的刷機指南**，説明大家順利刷入 **Breed + OpenWrt**。  

---

## ** 🔧 準備工作**  
### ** 📌 硬體需求**  
✅ **小米路由器 4A 千兆版（r4av2，固件版本 2.30.x）**  
✅ **網線 1 根**（連接電腦和路由器）  
✅ **Windows 電腦**（需開啟 Telnet 功能）  

### ** 📌 軟體工具**  
1. **解鎖腳本（V2 版）**（用於獲取 root 許可權）  
2. **WinSCP**（上傳檔到路由器）  
3. **Breed 引導程式**（'breed-mt7621-pbr-m1.bin'）  
4. **OpenWrt 固件**（推薦 'supes.top' 或恩山論壇的定製版）  

> ** ⚠️ 注意：**  
> - **所有工具和固件可在文末參考鏈接下載**  
> - **刷機有風險，請謹慎操作！ **  

---

## ** ⚡ 刷機步驟**  
### ** 🔹 第一步：解鎖路由器（獲取 root 許可權）**  
1. **用網線連接路由器**（確保電腦能訪問 '192.168.31.1'）  
2. **運行解鎖腳本 'V2 版'**  
3. **輸入路由器 IP（預設 '192.168.31.1'）、本機 IP、管理密碼**  
4. **重複嘗試直到成功**（Windows 可能需多次運行）  

> ** 💡 提示：**  
> - 如果 Windows 報錯，可嘗試 **關閉防火牆/殺毒軟體**  
> - **安卓手機運行腳本基本不會成功**，建議用電腦  

---

### ** 🔹 第二步：上傳 Breed 到路由器**  
1. **打開 WinSCP**，選擇 **SCP 協定**  
2. **主機名**：'192.168.31.1'，**使用者名**：'root'，**密碼**：'（留空或輸入解鎖后的密碼）'  
3. **進入 '/tmp/' 目錄**，上傳 'breed-mt7621-pbr-m1.bin'  

> ** 📌 如果不會用 WinSCP，可參考恩山論壇的教程（文末連結）**  

---

### ** 🔹 第三步：刷入 Breed**  
1. **使用 SSH/Telnet 連接路由器**（如 PuTTY）  
2. **輸入以下命令備份分区（可選，但強烈建議，但樓主沒試過，不知道能不能用）**：  
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
3. **刷入 Breed**：  
   ```bash
   mtd -r write /tmp/breed.bin Bootloader
   ```
4. **等待刷寫完成，路由器會自動重啟**  

---

### ** 🔹 第四步：進入 Breed 控制台**  
1. **拔掉路由器電源**  
2. **按住複位鍵（RESET）不放**  
3. **插上電源，等待 3 秒后鬆開複位鍵**  
4. **電腦訪問 '192.168.1.1' 進入 Breed**  

> ** ⚠️ 重要：進入 Breed 後，立即備份 'full.bin' 和 'eeprom.bin'！ **  
> - **'full.bin'**：可用於救磚  
> - **'eeprom.bin'**：包含WiFi校準數據，刷機時必須一起刷入，否則WiFi可能無法使用  

---

### ** 🔹 第五步：刷入 OpenWrt**  
1. **在 Breed 選擇「固件更新」**  
2. **上傳 OpenWrt 固件 + 'eeprom.bin'**  
3. **等待刷寫完成，路由器會自動重啟**  
4. **進入 OpenWrt 管理介面（預設 IP 可能是 '192.168.1.1'）**  

> ** 🔑 預設登錄帳號/密碼嘗試組合：**  
> - `root / root`  
> - 'root / （空）'  
> - `root / password`  
> - '（預設） / 88888888'  

---

## ** 📌 注意事項**  
1. **刷機前建議備份所有分區**（防止變磚）  
2. **第三方固件的 WiFi 信號可能不如官方**  
3. **如果刷機失敗，可使用 Breed 恢復備份**  
4. **刷機有風險，後果自負！ **  

---

## ** 📚 參考資源**  
### ** 🔹 OpenWrt 固件下載**  
- [supes.top 定製固件]（https://op.supes.top/firmware/ramips_mt7621/xiaomi_mi-router-4a-gigabit-v2/）  
- [恩山論壇固件]（https://www.right.com.cn/forum/thread-8261014-1-1.html）  

### ** 🔹 詳細教程**  
1. [恩山教程 1]（https://www.right.com.cn/forum/thread-8261014-1-1.html）  
2. [恩山教程 2]（https://www.right.com.cn/forum/thread-8269849-1-1.html）  
3. [恩山教程 3]（https://www.right.com.cn/forum/thread-8275612-1-1.html）  

### ** 🔹 更多資源**  
複製這段內容后打開天翼雲盤手機App，操作更方便哦！ 連結：https://cloud.189.cn/t/BzMveiqyMnu2（存取碼：6xhm））  

---

** 🎉 恭喜！ 現在你的小米路由器 4A 千兆版已成功刷入 OpenWrt，享受更純淨、更強大的路由系統吧！ **  
** 🚨 如果遇到問題，歡迎在評論區留言討論！ **



# 以下廢案

## 前言

我拿到這款小米路由器4A千兆版，替換掉了劫持嚴重性能低下的舊路由器。但小米路由器終究是小米路由器（廢話），經過我的自建DNS的AdguardHome後台，這款路由器每天都會大量請求api.miwifi.com（小米雲端） 以及www.baidu.com 和www.taobao.com （意味不明），不知葫蘆裡賣的是什麼藥。本來以為這款路由器挺好折騰的，但是經過種種探索後，我發現商家發來的居然是新款硬件的r4av2（海外版對應硬件ac1200-rb02）。

在此科普：小米路由器4a千兆版分為①r4a與r3gv2②r4av2（別搞混了，硬件不一樣的，固件一般不通用

當時遇到了各種問題，由於本人在此方面純屬小白，加上路由器的這個硬件版本是新出的，所以我沒有辦法找到有用的資料，研究（折騰）就此暫停之後的日子裡，我每天便體驗著官方固件的2.4Ghz斷網bug。而最近由於考試結束，我得以抽出時間（平時也浪費了很多時間啊啊啊）來折騰家庭網絡，我要以現有的有限的條件，創造更好的網絡條件（甚

我發現網絡上已經有針對r4av2的破解教程，但這些教程要么有些零散，要么過分簡單（恩山里都是大佬一看就懂滴.png），所以，我寫了這篇教程，是為了幫助各位r4av2用戶捋清楚思路。這個教程可以幫助您破解鎖小米路由器4A千兆版（r4av2: 2.30.x版本硬件，16M閃存）的權限，並刷入breed進而使用OPENWRT。


## 材料

教程在開始之前，您需要準備以下預備材料

1.  路由器本體
小米路由器4A千兆版（最新款r4av2硬件，支援固件版本為2.30.x）。

2.  網線
一根能夠正常與路由器進行連結的網線。

3.  電腦
一台能夠通過網線正常與路由器進行連結的電腦。 （要求電腦搭載Windows系統，系統開啟telnet<如果你不用電腦來執行刷寫breed的命令，請忽略系統telnet環境狀態>。需要注意的是Windows在運行破解程序時是可能出現bug的，故破解時如有問題請多試幾次）。

4.  軟件
本教程中所提到的軟件工具與固件包。 （評論區自取）

5.  眼睛
確保您熟悉使用網頁瀏覽器，並且了解路由器復位鍵位於路由器的什麼位置。 （breed使用時需要）


## 如果準備好了，那就可以開始了

1.  解鎖
首先，你需要在電腦通過網線正常與路由器進行連結時，運行解鎖腳本`V2版`，輸入對應的路由器局域網ip、本機的局域網ip、路由器管理密碼，接著，程序會自動嘗試解鎖路由器的權限。值得一提的是，如果你使用Windows電腦仍未成功，那麼你最好是多試幾次。如果您使用安卓手機進行此解鎖腳本的運行，那麼等待著你的基本上是不會成功。

2.  把breed文件放進去
如果你成功解鎖了權限，你就需要通過WINSCP上傳breed固件（breed.bin）（這款路由器使用的是breed-mt7621-pbr-m1.bin）到路由器的/tmp/目錄下上傳的方法如果不會請看恩山大佬的帖子和視頻（文章結尾處參考）。

3.  刷入breed文件
上傳完了就可以嘗試刷入，先連接路由器終端，
然後你可以嘗試備份（方法來自網絡），樓主忘記備份了
以下為命令：

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

備份完把這幾個文件複製出來（可以用WINSCP）保存好，以後萬一要恢復官方要用到
然後然後你應該執行breed刷寫命令

```
mtd -r write /tmp/breed.bin Bootloader
```

4.  進breed
刷好了可能也就進入breed系統了。如果你要進入breed系統，請按著路由器復位鍵不動，然後重新插入路由器電源線，3秒後鬆手，此時你就進入了breed系統（後台地址為192.168.1.1）。

5.  breed是什麼
在此說明：breed是一個恢復控制台，刷openwrt固件用的。

6.  進來之後
進入breed後台後，請立即備份full.bin和eeprom.bin。 full.bin可能可以幫助你救磚。而eeprom.bin很重要，你在每一次固件刷寫時都應將固件包與eeprom.bin一併刷入，如果沒有eeprom.bin，會導致一些奇怪的bug（比如沒信號）。

7.  刷入Openwrt固件
備份完畢後，將OPENWRT固件（底部）和你的eeprom.bin一併刷入，耐心等待進度條跑完，然後就會自動重啟到OPENWRT了，enjoy it!

8.  密碼多少
【附加】如果你遇到需要輸入密碼時，你應該嘗試以下（用戶/密碼）組合：[root/root][root/（空）][root/password][（默認）/88888888]


## 參考文章

《【一些固件】supes.top》 [https://op.supes.top/firmware/ramips_mt7621/xiaomi_mi-router-4a-gigabit-v2/](https://op.supes.top/firmware/ramips_mt7621/ xiaomi_mi-router-4a-gigabit-v2/) （111開頭的定制固件來源）

1. [https://www.right.com.cn/forum /thread-8261014-1-1.html](https://www.right.com.cn/forum/thread-8261014-1-1.html)

2. [https://www.right.com.cn/forum/thread-8269849-1-1.html](https://www.right. com.cn/forum/thread-8269849-1-1.html)

3. [https://www.right.com.cn/forum/thread-8275612- 1-1.html](https://www.right.com.cn/forum/thread-8275612-1-1.html) （評論區中right開頭固件來源）


# 感謝您的瀏覽，以下是建議

在刷入breed之前可以用命令備份一下全部分區，方便恢復到官方固件。樓主不會，所以沒備份。如果沒備份官方uboot，那麼路由器則不能回到官方狀態。

第三方固件wifi不如官方。

路由器折騰死了博主不負責。

> https://share.dahi.icu/r4av2_mi/