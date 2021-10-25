# SafeArea 安全区域

## 预先配置

`<meta name="viewport" content="width=device-width, viewport-fit=cover">`

## 基本用法

```jsx
import { SafeAreaProvider, SafeAreaView } from 'zarm';
// Your App.tsx
//  <SafeAreaProvider>
//    <App />
//  </SafeAreaProvider>

// Your Component
const Demo = () => {
  return (
    <SafeAreaView>
      <div>页面 ui</div>
    </SafeAreaView>
  );
};

ReactDOM.render(
  <SafeAreaProvider>
    <Demo />
  </SafeAreaProvider>,
  mountNode,
);
```

## SafeAreaView API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :----- | :--- |

## SafeAreaProvider API

## CSS Variable

zarm-safe-area-inset-top
zarm-safe-area-inset-right
zarm-safe-area-inset-bottom
zarm-safe-area-inset-left
