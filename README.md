# 🎂 生日祝福网页

一个轻量级、可自定义的生日祝福网页项目，适合快速部署并送给朋友或家人一份特别的惊喜！

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub stars](https://img.shields.io/github/stars/Swilent/birthday-card?style=social)

---

## ✨ 特性

- 🎨 **简洁美观** - 精心设计的 UI，生日氛围浓厚
- 🎵 **背景音乐** - 支持自定义 BGM，自动播放（可暂停/播放）
- 🎁 **礼物彩蛋** - 点击按钮显示二维码，实现礼物惊喜
- ⚡ **轻量级** - 无需框架，纯 HTML/CSS/JS 实现
- 📱 **响应式** - 完美适配手机和电脑屏幕
- 🛠 **易定制** - 修改祝福语、样式、音乐都很简单

---

## 📁 项目结构

```
.
├── index.html      # 主页面（含祝福语，需手动编辑）
├── style.css       # 页面样式
├── script.js       # 交互逻辑（如播放音乐、显示二维码等）
├── cake.svg        # 装饰用蛋糕图标
├── audio.mp3       # 【需用户自行添加】背景音乐（BGM）
└── QRcode.jpg      # 【需用户自行添加】礼物领取二维码
```

> ⚠️ **注意**：出于版权考虑，`audio.mp3` 和 `QRcode.jpg` **不包含在本仓库中**，请按下方说明自行添加。

---

## 🚀 快速开始

### 方式一：本地使用

1. **克隆项目到本地**

```bash
git clone https://github.com/Swilent/birthday-card.git
cd birthday-card
```

2. **编辑祝福语**

打开 `index.html`，将默认文字替换为你想对寿星说的话。

3. **添加背景音乐（可选但推荐）**

- 准备一个你喜欢的 `.mp3` 音频文件
- 重命名为 `audio.mp3`
- 放入项目根目录
- 网页加载时会自动播放（用户可点击按钮暂停/播放）

4. **添加礼物领取二维码**

- 准备一张二维码图片
- 重命名为 `QRcode.jpg`
- 放入项目根目录
- 寿星点击「🎁 领取礼物」按钮后，将显示该二维码

> 💡 **创意提示**：你可以在闲鱼上架一个「生日礼物兑换券」（如 0.01 元包邮专拍），生成商品二维码作为 `QRcode.jpg`，实现低成本又有仪式感的礼物传递！

5. **预览网页**

- 直接双击 `index.html` 在浏览器中打开
- 或使用本地服务器（推荐）：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve

# 然后访问 http://localhost:8000
```

### 方式二：在线部署

推荐将项目部署到以下平台，生成链接分享给寿星：

- **GitHub Pages** - 免费、稳定
- **Vercel** - 快速、简单
- **Netlify** - 拖拽即用
- **Cloudflare Pages** - 全球 CDN

---

## 📸 效果预览

1. **初始界面** - 优雅的动画效果和生日主题设计
2. **音乐播放** - 页面加载时自动播放背景音乐
3. **礼物彩蛋** - 点击按钮弹出二维码，实现惊喜互动

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 开源协议

本项目采用 MIT License 开源协议。

---

## 🙏 致谢

感谢所有为本项目贡献代码和想法的朋友们！

---

## 📮 联系方式

- GitHub: [@Swilent](https://github.com/Swilent)
- Issue: [提交问题](https://github.com/Swilent/birthday-card/issues)

---

***如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！***

***

Made with ❤️ by [Swilent](https://github.com/Swilent)
