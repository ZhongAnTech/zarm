<p align="center">
  <a href="http://zarm.design">
    <img width="200" src="https://zarm.design/images/logo.732d9561.svg">
  </a>
</p>

<h1 align="center">Zarm</h1>

<div align="center">

[![test](https://github.com/ZhongAnTech/zarm/actions/workflows/test.yml/badge.svg)](https://github.com/ZhongAnTech/zarm/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/ZhongAnTech/zarm/branch/master/graph/badge.svg?token=Qqne6VfWnk)](https://codecov.io/gh/ZhongAnTech/zarm)
![JS gzip size](https://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.js?compression=gzip&label=zarm.min.js)
![CSS gzip size](https://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.css?compression=gzip&label=zarm.min.css)
[![NPM downloads](https://img.shields.io/npm/dm/zarm.svg)](https://npmjs.org/package/zarm)
[![dependencies Status](https://david-dm.org/ZhongAnTech/zarm/status.svg)](https://david-dm.org/ZhongAnTech/zarm)
[![peerDependencies Status](https://david-dm.org/ZhongAnTech/zarm/peer-status.svg)](https://david-dm.org/ZhongAnTech/zarm?type=peer)
[![devDependencies Status](https://david-dm.org/ZhongAnTech/zarm/dev-status.svg)](https://david-dm.org/ZhongAnTech/zarm?type=dev)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7afc45a9-dcac-4475-9903-d3896bc200ed/deploy-status)](https://app.netlify.com/sites/zarm/deploys)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FZhongAnTech%2Fzarm.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FZhongAnTech%2Fzarm?ref=badge_shield)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ZhongAnTech/zarm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

众安科技基于 React、React-Native 研发的一款适用于企业级的移动端 UI 组件库。

</div>

Zarm 的命名，灵感来源于众安保险秉承的理念：做有温度的保险。Zarm = za + warm，za 代表“众安”，warm 有“温暖”的含义，以重合的 a 字母为中心，各取左右两部分。追求极致的用户体验，致力于做有温度的组件库也是 zarm 项目发起的初衷。

## 版本

- [![npm package](https://img.shields.io/npm/v/zarm/latest.svg)](https://www.npmjs.org/package/zarm)

## 浏览器支持

- iOS
- Android 4.0+

## 安装

npm 或 yarn 安装

```bash
# npm
$ npm install zarm --save

# yarn
$ yarn add zarm
```

## 使用

```js
import { Button, Cell } from 'zarm';
import 'zarm/dist/zarm.css';
```

### 定制主题

zarm 的样式使用了 [scss](https://sass-lang.com) 和 [css 变量](https://www.w3.org/Style/CSS/) 相结合做为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，实现定制主题的能力。

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

以下是一些最常用的通用变量，所有样式变量可以在 [这里](https://github.com/ZhongAnTech/zarm/blob/master/components/style/themes/default.scss) 找到。

```scss
--theme-primary: #00bc70; // 全局主色
--theme-success: #00bc70; // 成功色
--theme-warning: #ec9231; // 警告色
--theme-danger: #ff5050; // 危险色
```

## 社区

| 问题上报                                                    | 讨论交流                                                              | 微信群                                                                                                     |
| :---------------------------------------------------------- | :-------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| [github issues](https://github.com/ZhongAnTech/zarm/issues) | [github discussions](https://github.com/ZhongAnTech/zarm/discussions) | <img src="https://cdn-health.zhongan.com/zarm/qrcode.jpg" width="80" /> <br />备注 "zarm" 加好友后邀请进群 |

## 开源协议

MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FZhongAnTech%2Fzarm.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FZhongAnTech%2Fzarm?ref=badge_large)
