# SwipeAction 滑动操作

## 基本用法

```jsx
import { SwipeAction, Button, List, Modal } from 'zarm';

const RIGHT_BUTTONS = [
  {
    text: '右按钮1',
    onClick: () => console.log('右按钮1'),
  },
  {
    text: '右按钮2',
    theme: 'danger',
    onClick: () => console.log('右按钮2'),
  },
];
const LEFT_BUTTONS = [
  {
    text: '左按钮1',
    onClick: () => console.log('左按钮1'),
  },
  {
    text: '左按钮2',
    theme: 'danger',
    onClick: () => console.log('左按钮2'),
  },
];

ReactDOM.render(
  <>
    <List>
      <SwipeAction
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
        rightActions={RIGHT_BUTTONS}
      >
        <List.Item title="左滑看看" />
      </SwipeAction>

      <SwipeAction
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
        leftActions={LEFT_BUTTONS}
      >
        <List.Item title="右滑看看" />
      </SwipeAction>

      <SwipeAction
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
        leftActions={LEFT_BUTTONS}
        rightActions={[RIGHT_BUTTONS[0]]}
      >
        <List.Item title="左右都能滑动（自动关闭）" />
      </SwipeAction>

      <SwipeAction
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
        leftActions={[
          {
            text: '异步',
            onClick: async (action, index) => {
              const confirm = Modal.confirm({
                title: '确定要关闭吗？',
                content: '这里是确认框的内容部分，点击确定按钮，将触发 Promise 关闭确认框',
                onOk: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 3000));
                  console.log('异步按钮回调');
                },
              });
              await confirm;
            },
          },
        ]}
      >
        <List.Item title="异步关闭" />
      </SwipeAction>
    </List>
  </>,
  mountNode,
);
```

## API

| 属性              | 类型       | 默认值 | 说明                     |
| :---------------- | :--------- | :----- | :----------------------- |
| leftActions       | Action[]   | []     | 左侧按钮组               |
| rightActions      | Action[]   | []     | 右侧按钮组               |
| moveDistanceRatio | number     | 0.5    | 移动距离比例临界点       |
| moveTimeSpan      | number     | 300    | 移动时间跨度临界点       |
| animationDuration | number     | 300    | 动画执行时间，单位：毫秒 |
| offset            | number     | 10     | 回弹偏移的距离           |
| autoClose         | boolean    | true   | 点击按钮后是否自动关闭   |
| disabled          | boolean    | false  | 是否允许滑动             |
| onOpen            | () => void | -      | 滑开时触发的回调函数     |
| onClose           | () => void | -      | 关闭时触发的回调函数     |

### Action 类型定义

| 属性      | 类型       | 默认值    | 说明                                            |
| :-------- | :--------- | :-------- | :---------------------------------------------- |
| text      | ReactNode  | -         | 按钮文字                                        |
| theme     | string     | 'default' | 按钮主题，可选值 `default`、`primary`、`danger` |
| disabled  | boolean    | false     | 按钮是否禁用                                    |
| className | string     | -         | 追加类名                                        |
| onClick   | () => void | -         | 按钮点击后触发的回调函数                        |

## CSS 变量

| 属性         | 默认值 | 说明   |
| :----------- | :----- | :----- |
| --background | '#fff' | 背景色 |
