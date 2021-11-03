# Switch 开关

## 基本用法

```jsx
import { useState } from 'react';
import { Switch, List } from 'zarm';

const Demo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <List>
      <List.Item title="普通" after={<Switch checked={checked} onChange={setChecked} />} />
      <List.Item title="默认开" after={<Switch defaultChecked />} />
      <List.Item title="禁用的开关（默认关）" after={<Switch disabled />} />
      <List.Item title="禁用的开关（默认开）" after={<Switch defaultChecked disabled />} />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型                       | 默认值 | 说明                   |
| :------------- | :------------------------- | :----- | :--------------------- |
| checked        | boolean                    | -      | 值                     |
| defaultChecked | boolean                    | -      | 初始值                 |
| disabled       | boolean                    | false  | 是否禁用               |
| onChange       | (checked: boolean) => void | -      | 值变化时触发的回调函数 |
