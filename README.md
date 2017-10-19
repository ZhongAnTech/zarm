# Zarm UI
  [![Build Status](https://www.travis-ci.org/ZhonganTechENG/zarm.svg?branch=master)](https://www.travis-ci.org/ZhonganTechENG/zarm)
  [![Coverage Status](https://img.shields.io/coveralls/ZhonganTechENG/zarm/master.svg)](https://coveralls.io/github/ZhonganTechENG/zarm?branch=master) 
  [![npm package](https://img.shields.io/npm/v/zarm.svg)](https://www.npmjs.org/package/zarm)
  [![NPM downloads](http://img.shields.io/npm/dm/zarm.svg)](https://npmjs.org/package/zarm) 
  ![JS gzip size](http://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.js?compression=gzip&label=gzip%20size:%20JS)
  ![CSS gzip size](http://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.css?compression=gzip&label=gzip%20size:%20CSS)

  众安科技移动端UI组件库，基于React。（Vue版本传送门：[zarm-vue](https://github.com/ZhonganTechENG/zarm-vue)）

### Example 案例

[Online example](https://zhongantecheng.github.io/zarm/)

### Install 安装

```bash
npm install zarm --save
```

### Import 引入

* 全组件引入

```js
import { Button, Cell } from 'zarm';
import 'zarm/styles/index.scss';
```

* 单独引入

```js
import Button from 'zarm/lib/Button';
import 'zarm/styles/core/index.scss';
import 'zarm/styles/variables.scss';
import 'zarm/styles/components/Button.scss';
```

* 也可以通过cdn引入umd模块

```html
<link rel="stylesheet" href="https://unpkg.com/zarm@latest/dist/zarm.min.css">

<script src="https://unpkg.com/react-dom@16.0.0/umd/react.production.min.js" type="text/javascript"></script>
<script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.production.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://unpkg.com/zarm@latest/dist/zarm.min.js"></script>
```

### Usage 使用

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Button theme="primary">按钮</Button>, document.getElementById('app'));
```

> 注：使用以上方法需要支持jsx语法或者经过编译

### Custom Theme 自定义主题
```js
import { Button, Cell } from 'zarm';
import './styles/index.scss';
```

`./style/index.scss` 文件内容如下：

```css
@import "node_modules/zarm/styles/core/index";
@import "node_modules/zarm/styles/variables";
@import "./variables";
@import "node_modules/zarm/styles/components";
```

通过自己的variables.scss文件重写sass变量。

### Document 文档
[中文](https://github.com/ZhonganTechENG/zarm/blob/master/docs/zh-cn/SUMMARY.md)

### Changelog 更新日志
[CHANGELOG.md](https://github.com/ZhonganTechENG/zarm/blob/master/CHANGELOG.md)

### License
MIT
