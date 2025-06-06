const fs = require('fs');
const axios = require('axios');
const path = require('path');

// 配置
const configDir = "./config/_default";
const usersFolderPath = "./content/tomodachi/";
const targetLangs = ["zh-SG"]; // 手动指定所有目标语言

// 确保目录存在
if (!fs.existsSync(configDir)) {
  console.error(`错误：配置目录不存在 ${configDir}`);
  process.exit(1);
}

if (!fs.existsSync(usersFolderPath)) {
  console.error(`错误：用户目录不存在 ${usersFolderPath}`);
  process.exit(1);
}

// 图片下载函数
async function downloadImage(url, dest) {
  try {
    const writer = fs.createWriteStream(dest);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (err) {
    throw new Error(`下载图片失败: ${err.message}`);
  }
}

// 读取用户数据
let users = [];
try {
  const rawdata = fs.readFileSync(path.join(usersFolderPath, 'users.json'));
  users = JSON.parse(rawdata);
} catch (err) {
  console.error('读取users.json失败:', err.message);
  process.exit(1);
}

// 主处理函数
async function main() {
  try {
    // 1. 处理_index文件
    const indexContent = fs.readFileSync(path.join(usersFolderPath, '_index.md'), 'utf-8');
    targetLangs.forEach(lang => {
      const targetFile = path.join(usersFolderPath, `_index.${lang}.md`);
      if (!fs.existsSync(targetFile)) {
        fs.writeFileSync(targetFile, indexContent);
      }
    });

    // 2. 处理每个用户
    for (const [index, user] of users.entries()) {
      const userDir = path.join(usersFolderPath, user.title.replaceAll("/", "-"));
      
      // 创建用户目录
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      // 创建Markdown文件内容
      const content = `---
title: "${user.title}"
tags: [${user.tags}]
externalUrl: "${user.url}"
weight: ${index + 1}
showDate: false
showAuthor: false
showReadingTime: false
showEdit: false
showLikes: false
showViews: false
layoutBackgroundHeaderSpace: false
---\n`;

      // 创建默认语言文件
      fs.writeFileSync(path.join(userDir, 'index.md'), content);
      
      // 为每种目标语言创建副本
      targetLangs.forEach(lang => {
        fs.writeFileSync(path.join(userDir, `index.${lang}.md`), content);
      });

      // 下载图片
      if (user.source) {
        try {
          await downloadImage(user.source, path.join(userDir, 'feature.jpg'));
          console.log(`成功下载图片: ${user.title}`);
        } catch (err) {
          console.warn(`无法下载图片 ${user.title}:`, err.message);
        }
      }
    }
    console.log('处理完成！');
  } catch (err) {
    console.error('处理过程中出错:', err);
  }
}

// 运行主函数
main();