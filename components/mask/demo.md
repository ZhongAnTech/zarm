# Mask 遮罩



## 基本用法
```jsx
import { useState } from 'react';
import { Cell, Button, Mask } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  return (
    <>
      <Cell
        title="默认"
        description={<Button size="xs" onClick={toggle}>开启</Button>}
      />
      <Mask visible={visible} onClick={toggle} />
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| visible | boolean | 否 | false | 是否显示 |
| type | 'normal' \| 'transparent' | 否 | 'normal' | 类型 |
| onClick | MouseEventHandler<HTMLDivElement\> | 否 | \&nbsp; | 点击后触发的回调函数 |
