# 贡献 Zarm

## 安装

`git clone` 拉取代码仓库后，安装依赖

```bash
# 不要用 npm 安装
$ yarn
```

然后, 你可以运行 `Zarm Design` 的本地站点。

```bash
# 开发 h5 端
$ yarn dev
```

如果你想运行 `Zarm Design` 的 `react-native` 示例, 那么

```bash
# 开发 react-native 端
$ cd rnkit && yarn install && cd ios && pod install && cd ../..

# 开发 iOS 端
$ yarn dev:ios

# 开发 Android 端
$ yarn dev:android
```

## 检查

代码风格检查。

```bash
$ yarn lint

# Typescript 文件检查
$ yarn lint:ts

# Javascript 文件检查
$ yarn lint:js

# 样式文件检查
$ yarn lint:style
```

## 测试

运行完整的单元测试用例。

```bash
$ yarn test

# 单独测试 h5 版本
$ yarn test:h5

# 单独测试 react-native 版本
$ yarn test:rn

# 输出单元测试覆盖率
$ yarn test:h5 --coverage
```

## 编译

将 TypeScript 代码编译到 `lib` 和 `es` 目录，并在 `dist` 目录中创建 zarm 的 UMD 版本。

```bash
$ yarn build

# 编译 esm
$ yarn build:es

# 编译 lib
$ yarn build:lib

# 编译 umd
$ yarn build:umd

# 编译 react-native 的 iOS 安装包
$ yarn build:ios

# 编译 react-native 的 Android 安装包
$ yarn build:android
```
