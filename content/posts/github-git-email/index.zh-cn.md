---
title: "Github与Git的电子信箱邮箱地址设置"
date: 2024-04-10T01:25:04Z
draft: false
description: "保护方式"
tags: ["gal", "mail"]

---
众所周知，git的commit资讯往往包含信箱等数据，似乎官方不会主动处理开启Private信箱帐号的git内容

询问Copilot可知：

在 GitHub 网页上查看其他使用者的 commit 提交者信箱等 git 资讯的步骤如下：

1. **找到对应的仓库**：造访 GitHub，然后在搜寻框中输入你想查看的仓库名称。
2. **查看 commit 资讯**：在仓库页面，点选「Commits」查看提交记录。
3. **选择特定的 commit**：找到你感兴趣的 commit，点击它旁边的哈希值（commit ID）。
4. **查看详细资讯**：在 commit 的详细页面，可以看到提交者的使用者名称和提交时间。如果提交者的邮箱是公开的，你也可以在这里看到。
5. **取得信箱资讯**：如果提交者的信箱没有直接显示，你可以在 commit 详情页面的 URL 后面加上 `.patch`，然后造访这个新的 URL。这样通常可以看到提交者的邮箱地址⁸。

请注意，GitHub 使用者可以选择隐藏他们的邮箱地址，所以有时你可能无法直接在 GitHub 上找到某个使用者的邮箱资讯。如果邮箱地址是私密的，那么即使使用上述方法，你也无法查看到邮箱地址。如果需要与该用户联系，可以尝试透过其他方式，例如在 GitHub 上留言给他们。


查找发现，github网页提交的邮件命名规则为 ```⟨userid⟩+⟨username⟩@users.noreply.github.com```
就这么填吧(虽然都是好像乱填也没事，甚至可以填写他人的信箱