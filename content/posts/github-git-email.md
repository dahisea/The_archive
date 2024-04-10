---
title: "Github與Git的電子信箱郵箱地址設置"
date: 2024-04-10T01:25:04Z
draft: false
categories:
tags:
description: 
cover: 
---
眾所周知，git的commit資訊往往包含信箱等數據，似乎官方不會主動處理開啟Private信箱帳號的git內容

詢問Copilot可知：

在 GitHub 網頁上查看其他使用者的 commit 提交者信箱等 git 資訊的步驟如下：

1. **找到對應的倉庫**：造訪 GitHub，然後在搜尋框中輸入你想查看的倉庫名稱。
2. **查看 commit 資訊**：在倉庫頁面，點選「Commits」查看提交記錄。
3. **選擇特定的 commit**：找到你感興趣的 commit，點擊它旁邊的哈希值（commit ID）。
4. **查看詳細資訊**：在 commit 的詳細頁面，可以看到提交者的使用者名稱和提交時間。如果提交者的郵箱是公開的，你也可以在這裡看到。
5. **取得信箱資訊**：如果提交者的信箱沒有直接顯示，你可以在 commit 詳情頁面的 URL 後面加上 `.patch`，然後造訪這個新的 URL。這樣通常可以看到提交者的郵箱地址⁸。

請注意，GitHub 使用者可以選擇隱藏他們的郵箱地址，所以有時你可能無法直接在 GitHub 上找到某個使用者的郵箱資訊。如果郵箱地址是私密的，那麼即使使用上述方法，你也無法查看到郵箱地址。如果需要與該用戶聯繫，可以嘗試透過其他方式，例如在 GitHub 上留言給他們。

來源: 與 Bing 的交談， 2024/4/11
(1) github查找某人的郵箱_查看github用戶郵箱-CSDN博客. https://blog.csdn.net/weixin_44121197/article/details/108002085.
(2) undefined. https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your -commit-email-address.
(3) undefined. https://blog.csdn.net/ljl86400/article/details/79359684.
(4) undefined. https://developer.baidu.com/article/detail.html?id=2903635.
(5) git切換使用者、多使用者切換的正確方式 git commit和git push 切換使用者 - 知乎. https://zhuanlan.zhihu.com/p/345915480.
(6) 如何修改Git提交歷史中的author，email和name等資訊 - 知乎. https://zhuanlan.zhihu.com/p/455741996.
(7) github查找某人的信箱_查看github使用者信箱-CSDN部落格. https://bing.com/search?q=%e5%a6%82%e4%bd%95%e5%9c%a8github%e7 %bd%91%e9%a1%b5%e6%9f%a5%e7%9c%8b%e5%85%b6%e4%bb%96%e7%94%a8%e6%88%b7%e7%9a %84commit%e6%8f%90%e4%ba%a4%e8%80%85%e9%82%ae%e7%ae%b1%e7%ad%89git%e4%bf%a1%e6%81%af .
(8) 查看專案的貢獻者 - GitHub 文件. https://docs.github.com/zh/repositories/viewing-activity-and-data-for-your-repository/viewing-a-projects-contributors.

(

查找發現，github網頁提交的郵件命名規則為 ```⟨userid⟩+⟨username⟩@users.noreply.github.com```
就這麼填吧(雖然都是好像亂填也沒事，甚至可以填寫他人的信箱