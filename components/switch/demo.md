# Switch 开关



## 基本用法
```jsx
import { useState } from 'react';
import { Switch, Cell } from 'zarm';

const Demo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Cell
        title="普通"
        description={
          <Switch checked={checked} onChange={setChecked} />
        }
      />
      <Cell title="默认开" description={<Switch defaultChecked />} />
      <Cell title="禁用的开关（默认关）" description={<Switch disabled />} />
      <Cell title="禁用的开关（默认开）" description={<Switch defaultChecked disabled />} />
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| checked | boolean | - | 值 |
| defaultChecked | boolean | - | 初始值 |
| disabled | boolean | false | 是否禁用 |
| onChange | (value?: boolean) => void | - | 值变化时触发的回调函数 |
