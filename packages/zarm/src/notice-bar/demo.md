# NoticeBar 通告栏

## 基本用法

```jsx
import { NoticeBar } from 'zarm';
import { CloseCircle } from '@zarm-design/icons';

ReactDOM.render(
  <>
    <NoticeBar>普通</NoticeBar>
    <NoticeBar theme="danger">自定义主题</NoticeBar>
    <NoticeBar icon={<CloseCircle />}>自定义图标</NoticeBar>
    <NoticeBar>
      各位zarmer请注意，当前文本超出了屏幕宽度，组件会自动开启滚动功能，前后停留时间和滚动速度可以自定义设置，更多用法请参见使用文档。
    </NoticeBar>
  </>,
  mountNode,
);
```

## 特定场景

```jsx
import { NoticeBar } from 'zarm';

ReactDOM.render(
  <>
    <NoticeBar hasArrow onClick={() => alert('click this notice!')}>
      链接样式的
    </NoticeBar>
    <NoticeBar closable>可关闭的</NoticeBar>
    <NoticeBar closable onClose={() => alert('notice closed')}>
      关闭并触发回调函数
    </NoticeBar>
  </>,
  mountNode,
);
```

## API

| 属性     | 类型                                             | 默认值    | 说明                                                   |
| :------- | :----------------------------------------------- | :-------- | :----------------------------------------------------- |
| theme    | string                                           | 'warning' | 主题，可选值 `primary`、`success`、`warning`、`danger` |
| icon     | ReactNode                                        | -         | 设置图标                                               |
| closable | boolean                                          | false     | 是否显示关闭按钮                                       |
| hasArrow | boolean                                          | false     | 是否显示箭头                                           |
| speed    | number                                           | 50        | 滚动时的速度（单位：px/s）                             |
| delay    | number                                           | 2000      | 开启滚动功能时前后停留的时间（单位：ms）               |
| onClick  | () => void                                       | -         | 点击后触发的回调函数                                   |
| onClose  | (event: React.MouseEvent\<HTMLElement\>) => void | -         | 点击关闭 icon 触发的回调函数                           |
