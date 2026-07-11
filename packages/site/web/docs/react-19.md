# React 版本兼容

Zarm 支持 React 和 React DOM `16.8`、`17`、`18`、`19`。应用中的 React 与 React DOM
应保持相同的主版本。

## React 16、17、18

这些版本无需额外配置：

```jsx
import { Button, Toast } from 'zarm';

ReactDOM.render(<Button>Button</Button>, mountNode);
```

## React 19

React 19 移除了 `ReactDOM.render`。请在应用入口、首次导入 Zarm 组件之前引入 React 19
适配入口：

```jsx
import 'zarm/react19';

import { createRoot } from 'react-dom/client';
import { Button, Toast } from 'zarm';

createRoot(document.getElementById('app')).render(<Button>Button</Button>);
```

`zarm/react19` 会为 Toast、Popup、Modal、ImagePreview 等命令式 API 注册
`createRoot` 渲染器。每个应用入口只需引入一次。

React 19 不再发布 UMD 版本，因此 React 19 项目应使用 Zarm 的 ES Module 或 CommonJS
产物。Zarm 的 UMD 产物继续用于 React 16 至 React 18。
