# NoticeBar 通告栏



## 基本用法
```jsx
import { NoticeBar, Icon } from 'zarm';

ReactDOM.render(
  <>
    <NoticeBar>普通</NoticeBar>
    <NoticeBar theme="danger">自定义主题</NoticeBar>
    <NoticeBar icon={<Icon type="wrong-round" />}>自定义图标</NoticeBar>
    <NoticeBar scrollable>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
  </>
, mountNode);
```



## 特定场景
```jsx
import { NoticeBar  } from 'zarm';

ReactDOM.render(
  <>
    <NoticeBar hasArrow onClick={() => alert('click this notice!')}>链接样式的</NoticeBar>
    <NoticeBar closable>可关闭的</NoticeBar>
  </>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'warning' | 主题，可选值 `default`、`primary`、`success`、`warning`、`danger` |
| icon | ReactNode | - | 设置图标 |
| scrollable | boolean | false | 是否开启自动滚动轮播 |
| closable | boolean | false | 是否显示关闭按钮 |
| hasArrow | boolean | false | 是否显示箭头 |
| onClick | () => void | - | 点击后触发的回调函数 |
