# Zarm UI
  [![Build Status](https://www.travis-ci.org/ZhonganTechENG/zarm.svg?branch=master)](https://www.travis-ci.org/ZhonganTechENG/zarm)
  [![Coverage Status](https://img.shields.io/coveralls/ZhonganTechENG/zarm/master.svg)](https://coveralls.io/github/ZhonganTechENG/zarm?branch=master) 
  [![npm package](https://img.shields.io/npm/v/zarm.svg)](https://www.npmjs.org/package/zarm)
  [![NPM downloads](http://img.shields.io/npm/dm/zarm.svg)](https://npmjs.org/package/zarm) 
  ![JS gzip size](http://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.js?compression=gzip&label=gzip%20size:%20JS)
  ![CSS gzip size](http://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.css?compression=gzip&label=gzip%20size:%20CSS)

  众安科技移动端UI组件库，基于React。

## Install 安装

使用npm安装：
```bash
npm install zarm --save
```

或者通过cdn引入umd模块：
```html
<link rel="stylesheet" href="https://unpkg.com/zarm@latest/dist/zarm.min.css">
<script type="text/javascript" src="https://unpkg.com/zarm@latest/dist/zarm.min.js"></script>
```

## Usage 使用

#### 全组件引入

```js
import { Button, Cell } from 'zarm';
import 'zarm/dist/zarm.min.css';
```

#### 按需加载

* 方法一（推荐）

> 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 自动加载Sass文件

```js
  // .babelrc or babel-loader option
  {
    "plugins": [
      ['import', {
        libraryName: 'zarm',
        style: true,
        camel2DashComponentName: false,
      }],
    ]
  }
```
```js
import { Button, Cell } from 'zarm';
```

* 方法二：

```js
import Button from 'zarm/lib/Button';
import 'zarm/lib/Button/style';
```

#### 定制主题

通过覆盖Sass变量定义达到定制主题的效果

```css
@import "~zarm/lib/style/index.scss";  // 引入官方提供的Sass基础样式文件
@import "your-theme-file.scss";  // 用于覆盖上面定义的变量
@import "~zarm/lib/style/components.scss";  // 引入官方提供的组件样式文件
```

`your-theme-file.scss` 示例如下：

```css
$theme-primary: #108ee9;
```
变量名可参考 [default.scss](https://github.com/ZhonganTechENG/zarm/blob/master/components/style/themes/default.scss)

> 注意：这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 `babel-plugin-import` 的 `style` 属性一起使用。


## Document 文档
[中文](https://github.com/ZhonganTechENG/zarm/blob/master/docs/zh-cn/SUMMARY.md)

## Changelog 更新日志
[CHANGELOG.md](https://github.com/ZhonganTechENG/zarm/blob/master/CHANGELOG.md)

## License
MIT
