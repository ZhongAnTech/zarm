# 从 v2 到 v3

本文档将帮助你从 zarm 2.x 版本升级到 zarm 3.x

## 组件 API 调整

- 组件提示/确认框的确认文案 API 统一为 `confirmText`，`okText` 等类似 API 都会被替换。

  - Modal.(alert|confirm)
  - Picker
  - DatePicker
  - KeyboardPicker

```diff
  import { Picker } from 'zarm';

  const App: React.FC = () => (
    <Picker
-     okText="确定"
+     confirmText="确定"
    />
  );

  export default App;
```

- 组件提示/确认框的确认文案 API 统一为 `onOk`，`onConfirm` 等类似 API 都会被替换。
  - Modal.(alert|confirm)
  - Picker
  - DatePicker
  - KeyboardPicker

```diff
  import { Picker } from 'zarm';

  const App: React.FC = () => (
    <Picker
-     onOk={() => {}}
+     onConfirm={() => {}}
    />
  );

  export default App;
```

## 组件重构与移除

- 移除 Cell 组件，更名为 List
- 移除 BackTop 组件，更名为 BackToTop
- 移除 StackPicker 组件，移至 Cascader
- Loading 组件在 `3.0.0` 中废弃，移至 Toast.show({ type: 'loading' }) 指令式调用

## 遇到问题

如果您在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/ZhongAnTech/zarm/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
