# useLongPress 长按

模拟长按操作，执行响应的功能

## 基本用法

```jsx
import { useState } from 'react';
import { useLongPress, Button, List } from 'zarm';

const Demo = () => {
  const [text, setText] = useState('');
  const longPressEvent = useLongPress({
    onLongPress: () => setText('长按了'),
    onPress: () => setText('单击了'),
    onClear: () => setText('松开了'),
  });

  return (
    <List>
      <List.Item
        title={text}
        after={
          <Button size="sm" style={{ margin: 10 }} {...longPressEvent}>
            长按我试试？
          </Button>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性             | 类型                              | 默认值 | 说明                           |
| :--------------- | :-------------------------------- | :----- | :----------------------------- |
| isPreventDefault | boolean                           | true   | 是否阻止元素发生默认的行为     |
| delay            | number                            | 300    | 长按延时执行的时间，单位：毫秒 |
| onLongPress      | (event: TouchEvent \| MouseEvent) | -      | 长按时触发的事件               |
| onPress          | (event: TouchEvent \| MouseEvent) | -      | 单击时触发的事件               |
| onClear          | (event: TouchEvent \| MouseEvent) | -      | 松开时触发的事件               |
