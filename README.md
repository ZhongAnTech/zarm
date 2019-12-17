<p align="center">
  <a href="http://zarm.design">
    <img width="200" src="https://zarm.design/images/logo.732d9561.svg">
  </a>
</p>

<h1 align="center">Zarm</h1>

<div align="center">

  [![Build Status](https://www.travis-ci.org/ZhongAnTech/zarm.svg?branch=master)](https://www.travis-ci.org/ZhongAnTech/zarm)
  [![Coverage Status](https://img.shields.io/coveralls/ZhongAnTech/zarm/master.svg)](https://coveralls.io/github/ZhongAnTech/zarm?branch=master)
  [![npm package](https://img.shields.io/npm/v/zarm.svg)](https://www.npmjs.org/package/zarm)<!-- [![](https://badgen.net/npm/v/zarm/next)](https://www.npmjs.com/package/zarm)  -->
  [![NPM downloads](https://img.shields.io/npm/dm/zarm.svg)](https://npmjs.org/package/zarm) 
  ![JS gzip size](https://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.js?compression=gzip&label=gzip%20size:%20JS)
  ![CSS gzip size](https://img.badgesize.io/https://unpkg.com/zarm@latest/dist/zarm.min.css?compression=gzip&label=gzip%20size:%20CSS)
  [![Netlify Status](https://api.netlify.com/api/v1/badges/7afc45a9-dcac-4475-9903-d3896bc200ed/deploy-status)](https://app.netlify.com/sites/zarm/deploys)

  众安科技移动端UI组件库，基于React、React-Native。
</div>

## Version 版本

- 稳定版：[![npm package](https://img.shields.io/npm/v/zarm.svg)](https://www.npmjs.org/package/zarm)
- 开发版：[![npm package](https://img.shields.io/npm/v/zarm/alpha.svg)](https://www.npmjs.org/package/zarm)


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

### 全组件引入

```js
import { Button, Cell } from 'zarm';
import 'zarm/dist/zarm.min.css';
```

### 按需加载

- 方法一（推荐）

> 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 自动加载Sass文件

```js
  // .babelrc or babel-loader option
  {
    "plugins": [
      ['import', {
        libraryName: 'zarm',
        style: true,
      }],
    ]
  }
```

```js
import { Button, Cell } from 'zarm';
```

- 方法二：

```js
import Button from 'zarm/lib/Button';
import 'zarm/lib/Button/style';
```

### 定制主题

通过修改css变量定义达到定制主题的效果

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

变量名可参考 [default.scss](https://github.com/ZhongAnTech/zarm/blob/dev/components/style/themes/default.scss)

## Community

| issue | gitter | 微信群 |
| :--- | :--- | :--- |
| [github issue](https://github.com/ZhongAnTech/zarm/issues) | [ZhonganTech/zarm](https://gitter.im/ZhonganTech/zarm) | <img src="https://user-images.githubusercontent.com/9812721/69521400-d3708100-0f99-11ea-9669-2cea28ec66f7.png" width="60" /> |

## License

MIT
