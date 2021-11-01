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
$ cd packages/rnkit/ios && pod install && cd ../../..

# 开发 iOS 端
$ yarn dev:ios

# 开发 Android 端
$ yarn dev:android
```

## 检查

代码风格检查。

```bash
$ yarn lint

# ts/js 文件检查
$ yarn lint:script

# 样式文件检查
$ yarn lint:style
```

## 测试

运行完整的单元测试用例。

```bash
$ yarn test
```
