# SafeArea 安全区域

## 基本用法

```jsx
const Demo = () => {
  return null;
};
ReactDOM.render(<Demo />, mountNode);
```

1. 预先配置

让 H5 页面铺满整个屏幕显示
`<meta name="viewport" content="width=device-width, viewport-fit=cover">`

2. 配置主体

一般是 body 或者 #root (umi)

body {
padding-top: var(--zarm-safe-area-inset-top);
padding-bottom: var(--zarm-safe-area-inset-bottom);
}

3. 其它 position: fixed | absolute 元素
   .yourElement {
   padding-bottom: var(--zarm-safe-area-inset-bottom); // 或者 margin-bottom: calc(44px + var(--zarm-safe-area-inset-bottom));
   }

## 处理兼容性问题

```jsx
import { useLayoutEffect } from 'react';
import { useSafeArea, ZARM_SAFE_AREA_INSET_BOTTOM } from 'zarm';

// Android 某些版本或者系统, 没有实现 `safe-area-inset-bottom` 这类系统变量时

const Demo = () => {
  const { safeAreaInset, setCSSVar } = useSafeArea();
  useLayoutEffect(() => {
    // 判断 ua 等 适配特殊异型屏
    const safeAreaInsetBottom =
      typeof safeAreaInset[2] === 'string' && Number(safeAreaInset[2].replace('px', ''));
    const computedInsetBottom = Math.max(safeAreaInsetBottom, 44);
    setCSSVar('ZARM_SAFE_AREA_INSET_BOTTOM', computedInsetBottom);
  }, []);
  return null;
};

ReactDOM.render(<Demo />, mountNode);
```

## 暴露 CSS Variable

```jsx
const Demo = () => {
  return null;
};
ReactDOM.render(<Demo />, mountNode);
```

--zarm-safe-area-inset-top
--zarm-safe-area-inset-right
--zarm-safe-area-inset-bottom
--zarm-safe-area-inset-left

## H5 嵌入原生(iOS, Android, RN) Webview

```jsx
const Demo = () => {
  return null;
};
ReactDOM.render(<Demo />, mountNode);
```

原生 WebView 加载 H5 页面时, 原生方法来获取 safe-area-inset, 然后有如下两种处理方式可选:

1. 设置 Webview 的 margin, 然后设置 H5 的 css variable 为 0px
2. 设置 Webview 铺满屏幕, 将原生获取到的 safe-area-inset 传递给 H5 端

加载 H5 时, 预先注入 js, `webView.evaluateJavascript()`

document.documentElement.style.setProperty('--zarm-default-safe-area-inset-top', '${top}px' );
document.documentElement.style.setProperty('--zarm-default-safe-area-inset-right', '${right}px' );
document.documentElement.style.setProperty('--zarm-default-safe-area-inset-bottom', '${bottom}px' );
document.documentElement.style.setProperty('--zarm-default-safe-area-inset-left', '${left}px' );

## 小程序

```jsx
const Demo = () => {
  return null;
};
ReactDOM.render(<Demo />, mountNode);
```

TODO 待测试
