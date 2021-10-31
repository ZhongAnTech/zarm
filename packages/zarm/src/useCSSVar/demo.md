# useCSSVar

## 基本用法

```jsx
import { useState } from 'react';
import { Button, useCSSVar } from 'zarm';

const Demo = () => {
  const { getCSSVar, setCSSVar, removeCSSVar } = useCSSVar();

  return (
    <div style={{ padding: 8 }}>
      <div id="CSSVarDemo" style={{ marginBottom: 8 }}>
        当前 primary color
      </div>
      <Button
        theme="primary"
        onClick={() => {
          setCSSVar('--theme-primary', '#ff00ff');
        }}
      >
        修改主题色
      </Button>
    </div>
  );
};
ReactDOM.render(<Demo />, mountNode);
```
