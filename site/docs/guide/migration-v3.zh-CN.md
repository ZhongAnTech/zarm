---
category: 指南
title: 从 v2 到 v3
group:
  title: 指南
---

# 从 v2 到 v3

本文档将帮助你从 v2 版本升级到 v3

## 组件重构与移除

- 移除 `Cell` 组件，更名为 `List`
- 移除 `BackTop` 组件，更名为 `BackToTop`
- 移除 `StackPicker` 组件，移至 `Cascader`
- 移除 `Drag` 组件
- `Loading` 组件在 v3 版本中废弃，移至 Toast.show({ icon: 'loading' }) 指令式调用
- 移除 `ActivityIndicator` 组件，更名为 `Loading`

## 组件 API 调整

- 弹层类组件确认文案的 API `okText` 统一变更为 `confirmText`，确认事件 API `onOk` 变更为 `onConfirm`。涉及以下组件：

  - Modal.(alert | confirm)
  - Picker
  - DatePicker
  - KeyboardPicker

```diff
  <Picker
-   okText="确定"
-   onOk={() => {}}
+   confirmText="确定"
+   onConfirm={() => {}}
  />
```

- 组件值字段映射 API `valueMember` 统一变更为 `fieldNames`。涉及以下组件：

  - Picker、PickerView
  - Cascader、CascaderView
  - Select

```diff
  <Picker
-   valueMember="code"
+   fieldNames={{ value: 'code' }}
  />
```

### Calendar

`multiple` 双选模式，变更为 `mode="range"`

```diff
  <Calendar
-   multiple
+   mode="range"
  />
```

### Checkbox / Radio

 - 组合使用时 `type` 类型可选值 `cell` 调整为 `list`。
 - 废弃样式相关属性 `size`、`shape`、`ghost`，可以通过 css 变量方式更改样式。

```diff
  <Checkbox.Group
-   type="cell"
-   size="md"
-   shape="round"
-   ghost
+   type="list"
  />

  <Radio.Group
-   type="cell"
-   size="md"
-   shape="round"
-   ghost
+   type="list"
  />
```

### Input / SearchBar

`onChange` 回调参数调整为 event

```diff
  <Input
-   onChange={(value) => console.log(value)}
+   onChange={(event) => console.log(event.target.value)}
  />

  <SearchBar
-   onChange={(value) => console.log(value)}
+   onChange={(event) => console.log(event.target.value)}
  />
```

### Modal

`animationType` 属性值调整为 kebab case 命名

- `moveUp` 调整为 `move-up`
- `moveDown` 调整为 `move-down`
- `moveLeft` 调整为 `move-left`
- `moveRight` 调整为 `move-right`
- `slideUp` 调整为 `slide-up`
- `slideDown` 调整为 `slide-down`
- `slideLeft` 调整为 `slide-left`
- `slideRight` 调整为 `slide-right`

### Popper

`animationType` 和 `direction` 属性值调整为 kebab case 命名

- animationType
  - `zoomFade` 调整为 `zoom-fade`
  - `menuSlide` 调整为 `menu-slide`
  - `moveUp` 调整为 `move-up`
  - `moveDown` 调整为 `move-down`
  - `moveLeft` 调整为 `move-left`
  - `moveRight` 调整为 `move-right`
  - `slideUp` 调整为 `slide-up`
  - `slideDown` 调整为 `slide-down`
  - `slideLeft` 调整为 `slide-left`
  - `slideRight` 调整为 `slide-right`
- direction
  - `topLeft` 调整为 `top-left`
  - `topRight` 调整为 `top-right`
  - `rightTop` 调整为 `right-top`
  - `rightBottom` 调整为 `right-bottom`
  - `bottomLeft` 调整为 `bottom-left`
  - `bottomRight` 调整为 `bottom-right`
  - `leftTop` 调整为 `left-top`
  - `leftBottom` 调整为 `left-bottom`

### SwipeAction

操作项配置 API `left` 变更为 `leftActions`，`right` 变更为 `rightActions`，配置对象继承 Button 组件部分属性

```diff
  <SwipeAction
-   right={[
-     <Button size="lg" shape="rect" theme="primary" onClick={() => console.log('右按钮')}>
-       右按钮
-     </Button>
-   ]}
+   rightActions={[
+     {
+       text: '右按钮',
+       theme: 'primary',
+       onClick: () => console.log('右按钮'),
+     }
+   ]}
  />
```

### Toast

停留时间属性 `stayTime` 调整为 `duration`

```diff
  Toast.show({
    content: '提交成功',
-   stayTime: 2000,
+   duration: 2000,
  });
```

### Badge

`theme` 移除，调整为 `css` 变量 `--color` 设置颜色

```diff
  <Badge
    shape="radius"
    text="new"
-   theme="danger"
+   style={{ '--color': '#00bc70' }}
  />
```

### Marquee

`animationDuration` 和 `animationDelay` 调整为 `speed` 和 `delay`，移除 `loop` 属性

```diff
  <Marquee
-   animationDuration={30000}
-   animationDelay={2000}
+   speed={30000}
+   delay={2000}
  >
    我从右向左滚动
  </Marquee>
```

### SearchBar

取消按钮调整为默认不展示，通过设置 `showCancel` 展示按钮

```diff
  <SearchBar
+   showCancel
  />
```

### DatePicker/DatePicker/DateSelect

`value` / `defaultValue` / `min` / `max` 参数类型调整为 `Date`

```diff
  <DatePickerView
-   value='2023-02-08'
+   value={new Date('2023/02/08')}
  />
```

移除 `mode` 属性，调整为通过 `columnType` 设置列选择类型

```diff
  <DatePickerView
-   mode="time"
+   columnType={['hour', 'minute', 'second']}
  />
```

移除 `minuteStep` 属性，通过 `filter` 设置

```diff
  <DatePickerView
    columnType={['hour', 'minute']}
-   minuteStep={5}
+   filter={(type, { value }) => {
+     if (type === 'minute') return value % 5 === 0;
+     return true;
+   }}
  />
```

- 移除 `format` 属性

## 常见问题

### 如何在已经使用 Zarm 2.x 的项目中 Zarm 3.0

1. 安装 zarm 3.0

```bash
$ npm install zarm-v3@npm:zarm@next
```

2. 在 webpack.config.js 使用 babel-plugin-import 按需引入，配置 sass 变量

```diff
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
+               [
+                 'import',
+                 {
+                   libraryName: 'zarm-v3',
+                   libraryDirectory: 'lib',
+                   style: true,
+                 },
+                 'zarm-v3',
+               ],
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
+           options: {
+             sassOptions: {
+               additionalData: '$prefixCls: "za-v3";'
+             }
+           }
          }
        ],
  },
};
```

3. 配置 ConfigProvider prefixCls

```tsx | pure
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, ConfigProvider } from 'zarm-v3';

ReactDOM.render(
  <ConfigProvider prefixCls="zarm-v3">
    <Button theme="primary">submit</Button>
  </ConfigProvider>,
);
```

## 遇到问题

如果您在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/ZhongAnTech/zarm/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
