# Message 消息

## 基本用法

```jsx
import { Message } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

ReactDOM.render(
  <>
    <Message>普通</Message>
    <Message theme="danger">自定义主题</Message>
    <Message theme="warning" icon={<WarningCircle />}>
      自定义图标
    </Message>
  </>,
  mountNode,
);
```

## 可操作

```jsx
import { Message } from 'zarm';

ReactDOM.render(
  <>
    <Message hasArrow onClick={() => alert('click this message!')}>
      链接样式
    </Message>
    <Message closable>可关闭</Message>
    <Message closable onClose={() => alert('message closed!')}>
      关闭并触发回调函数
    </Message>
  </>,
  mountNode,
);
```

## API

| 属性     | 类型                                             | 默认值    | 说明                                                   |
| :------- | :----------------------------------------------- | :-------- | :----------------------------------------------------- |
| theme    | string                                           | 'primary' | 主题，可选值 `primary`、`success`、`warning`、`danger` |
| icon     | ReactNode                                        | -         | 设置图标                                               |
| closable | boolean                                          | false     | 是否显示关闭按钮                                       |
| hasArrow | boolean                                          | false     | 是否显示箭头                                           |
| onClick  | () => void                                       | -         | 点击后触发的回调函数                                   |
| onClose  | (event: React.MouseEvent\<HTMLElement\>) => void | -         | 点击关闭 icon 触发的回调函数                           |
