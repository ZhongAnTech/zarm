## 通告栏 NoticeBar

:::demo 基本用法
```jsx
import { NoticeBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <NoticeBar>普通</NoticeBar>
        <NoticeBar theme="error">错误色</NoticeBar>
        <NoticeBar icon={<Icon type="wrong-round" />}>自定义图标</NoticeBar>
        <NoticeBar autoscroll>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 特定场景
```jsx
import { NoticeBar  } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <NoticeBar hasArrow onClick={() => alert('click this notice!')}>链接样式的</NoticeBar>
        <NoticeBar hasClosable>可关闭的</NoticeBar>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-noticebar | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'warning' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| icon | any | | | 设置图标 |
| autoscroll | boolean | false | | 是否开启自动滚动轮播 |
| hasClosable | boolean | false | | 是否显示关闭按钮 |
| hasArrow | boolean | false | | 是否显示箭头 |
| onClick | <code>() => void</code> | noop | | 点击后触发的回调函数 |

:::