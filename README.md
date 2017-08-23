# Zarm UI
  [![Build Status](https://www.travis-ci.org/ZhonganTechENG/zarm.svg?branch=master)](https://www.travis-ci.org/ZhonganTechENG/zarm)
  [![Coverage Status](https://img.shields.io/coveralls/ZhonganTechENG/zarm/master.svg)](https://coveralls.io/github/ZhonganTechENG/zarm?branch=master) 
  ![JS gzip size](http://img.badgesize.io/https://unpkg.com/zarm/dist/zarm.min.js?compression=gzip&label=gzip%20size:%20JS)
  ![CSS gzip size](http://img.badgesize.io/https://unpkg.com/zarm/dist/zarm.min.css?compression=gzip&label=gzip%20size:%20CSS)
  [![npm package](https://img.shields.io/npm/v/zarm.svg)](https://www.npmjs.org/package/zarm)
  [![NPM downloads](http://img.shields.io/npm/dm/zarm.svg)](https://npmjs.org/package/zarm)  
  众安科技移动端UI组件库

### 安装

```bash
npm install zarm --save
```

### 使用

* ##### npm方式引入

```js
import { Button, Cell } from 'zarm';
import 'zarm/styles/index.scss';
```

或者单独引入

```js
import Button from 'zarm/lib/Button';
import 'zarm/styles/core/index.scss';
import 'zarm/styles/components/Button.scss';
```

调用方法

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Button theme="primary">按钮</Button>, document.getElementById('app'));
```

* ##### 也可以浏览器直接引入（不推荐）

html 标签引入css和js文件

```html
<link rel="stylesheet" href="https://unpkg.com/zarm@1.0.7/dist/zarm.min.css">
```

```html
<script src="https://unpkg.com/react@15.5.0/dist/react.min.js" type="text/javascript"></script>
<script src="https://unpkg.com/react@15.5.0/dist/react-dom.min.js" type="text/javascript"></script>

<script type="text/javascript" src="https://unpkg.com/zarm@latest/dist/zarm.min.js"></script>
```

调用方法

```js
ReactDOM.render(<Zarm.Button theme="primary">按钮</Zarm.Button>, document.getElementById('app'));
```

> 注：使用以上方法需要支持jsx语法或者经过编译

### 自定义主题

```js
import { Button, Cell } from 'zarm';
import './styles/index.scss';
```

`./style/index.scss` 文件内容如下：

```css
@import "node_modules/zarm/styles/core/index";
@import "variables";
@import "node_modules/zarm/styles/components/index";
```

通过自己的variables文件重写sass变量。

甚至可以拷贝 `./node_modules/zarm/styles` 文件，自行修改组件的sass文件。

## 更新日志
[CHANGELOG.md](https://github.com/ZhonganTechENG/zarm/blob/master/CHANGELOG.md)

