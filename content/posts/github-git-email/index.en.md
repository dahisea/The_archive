---
title: "E-mail address settings for Github and Git"
date: 2024-04-10T01:25:04Z
draft: false
description: "protection method"
tags: ["gal", "mail"]

---
As we all know, git commit information often includes mailbox and other data. It seems that the official will not actively process the git content of the Private mailbox account.

Ask Copilot to find out:

The steps to view git information such as other users' commit mailboxes on the GitHub web page are as follows:

1. **Find the corresponding warehouse**: Visit GitHub and enter the name of the warehouse you want to view in the search box.
2. **View commit information**: On the warehouse page, click "Commits" to view the commit record.
3. **Select a specific commit**: Find the commit you are interested in and click the hash value (commit ID) next to it.
4. **View detailed information**: On the commit details page, you can see the submitter's username and submission time. If the submitter's email address is public, you can also see it here.
5. **Get mailbox information**: If the submitter's mailbox is not directly displayed, you can add `.patch` after the URL of the commit details page, and then visit this new URL. This usually allows you to see the email address of the submitter⁸.

Please note that GitHub users can choose to hide their email addresses, so sometimes you may not be able to find a user's email information directly on GitHub. If the email address is private, you will not be able to view it even using the above method. If you need to contact this user, you can try other methods, such as leaving them a message on GitHub.


The search found that the naming rule for emails submitted on the github web page is ```⟨userid〉+⟨username〉@users.noreply.github.com```
Just fill it out like this (although it seems to be filled in randomly, it’s okay, you can even fill in other people’s mailboxes)