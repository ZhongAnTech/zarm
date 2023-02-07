# 从 v2 到 v3

本文档将帮助你从 zarm 2.x 版本升级到 zarm 3.x

## 组件重构与移除

- 移除 Cell 组件，更名为 List
- 移除 BackTop 组件，更名为 BackToTop
- 移除 StackPicker 组件，移至 Cascader
- 移除 Drag 组件
- Loading 组件在 `3.0.0` 中废弃，移至 Toast.show({ icon: 'loading' }) 指令式调用
- 移除 ActivityIndicator 组件，更名为 Loading

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

- 组件值字段映射 API 统一为 `fieldNames`，`valueMember` 等类似 API 都会被替换。

  - Picker/PickerView/Picker.prompt
  - Cascader/CascaderView/Cascader.prompt
  - Select

```diff
  import { Picker } from 'zarm';

  const App: React.FC = () => (
    <Picker
-     valueMember="code"
+     fieldNames={{ value: 'code' }}
    />
  );

  export default App;
```

### Calendar

移除 `multiple` 双选，调整为 mode 模式 `range`

```diff
  import { Calendar } from 'zarm';

  const App: React.FC = () => (
    <Calendar
-     multiple
+     mode="range"
    />
  );

  export default App;
```

### Checkbox.Group

`type` 可选值调整为 `button`、`list`，以及 `size`、`shape`、`ghost` 属性增加 button 前缀

```diff
  import { Checkbox } from 'zarm';

  const App: React.FC = () => (
    <Checkbox.Group
-     type="cell"
-     size="md"
-     shape="round"
-     ghost
+     type="list"
+     buttonSize="md"
+     buttonShape="round"
+     buttonGhost
    />
  );

  export default App;
```

### Input

`onChange` 回调参数调整为 event

```diff
  import { Input } from 'zarm';

  const App: React.FC = () => (
    <Input
-     onChange={(value) => console.log(value)}
+     onChange={(event) => console.log(event.target.value)}
    />
  );

  export default App;
```

### SearchBar

`onChange` 回调参数调整为 event

```diff
  import { SearchBar } from 'zarm';

  const App: React.FC = () => (
    <SearchBar
-     onChange={(value) => console.log(value)}
+     onChange={(event) => console.log(event.target.value)}
    />
  );

  export default App;
```

### Modal

`animationType` 属性值调整为 kebab case 命名

- moveUp 调整为 move-up
- moveDown 调整为 move-down
- moveLeft 调整为 move-left
- moveRight 调整为 move-right
- slideUp 调整为 slide-up
- slideDown 调整为 slide-down
- slideLeft 调整为 slide-left
- slideRight 调整为 slide-right

### Popper

`animationType` 和 `direction` 属性值调整为 kebab case 命名

- animationType
  - zoomFade 调整为 zoom-fade
  - menuSlide 调整为 menu-slide
  - moveUp 调整为 move-up
  - moveDown 调整为 move-down
  - moveLeft 调整为 move-left
  - moveRight 调整为 move-right
  - slideUp 调整为 slide-up
  - slideDown 调整为 slide-down
  - slideLeft 调整为 slide-left
  - slideRight 调整为 slide-right
- direction
  - topLeft 调整为 top-left
  - topRight 调整为 top-right
  - rightTop 调整为 right-top
  - rightBottom 调整为 right-bottom
  - bottomLeft 调整为 bottom-left
  - bottomRight 调整为 bottom-right
  - leftTop 调整为 left-top
  - leftBottom 调整为 left-bottom

### SwipeAction

按钮配置 API 统一为 `leftActions/rightActions`，配置对象继承 Button 组件部分属性

```diff
  import { SwipeAction } from 'zarm';

  const App: React.FC = () => (
    <SwipeAction
-     right={[
-       <Button size="lg" shape="rect" theme="primary" onClick={() => console.log('右按钮')}>
-         右按钮
-       </Button>
-     ]}
+     rightActions={[
+       {
+         text: '右按钮',
+         onClick: () => console.log('右按钮')
+       }
+     ]}
    />
  );

  export default App;
```

### Toast

`stayTime` 调整为 `duration`

```diff
  import { Toast } from 'zarm';

  const App: React.FC = () => {
    return (
      <button onClick={() => {
        Toast.show({
          content: '提交成功',
-         stayTime: 2000,
+         duration: 2000,
        })
      }}>
        提交
      </button>
    );
  };

  export default App;
```

### Badge

`theme` 移除，调整为 `css` 变量 `--color` 设置颜色

```diff
  import { Badge } from 'zarm';

  const App: React.FC = () => {
    return (
      <Badge
        shape="radius"
        text="new"
-       theme="danger"
+       style={{ '--color': '#00bc70' }}
      />
    );
  };

  export default App;
```

### Marquee

`animationDuration` 和 `animationDelay` 调整为 `speed` 和 `delay`，移除 `loop` 属性

```diff
  import { Marquee } from 'zarm';

  const App: React.FC = () => {
    return (
      <Marquee
-       animationDelay={2000}
-       animationDuration={30000}
+       delay={2000}
+       speed={30000}
      >
        我从右向左滚动
      </Marquee>
    );
  };

  export default App;
```

### SearchBar

取消按钮调制为默认不展示，通过设置 `showCancel` 展示按钮

```diff
  import { SearchBar } from 'zarm';

  const App: React.FC = () => {
    return (
      <SearchBar
+       showCancel
      />
    );
  };

  export default App;
```

## 遇到问题

如果您在升级过程中遇到了问题，请到 [GitHub issues](https://github.com/ZhongAnTech/zarm/issues) 进行反馈。我们会尽快响应和相应改进这篇文档。
