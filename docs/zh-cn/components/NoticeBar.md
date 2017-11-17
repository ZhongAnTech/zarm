# 通告栏 NoticeBar

[demo页面](https://zhongantecheng.github.io/zarm/#/notice-bar)

### 引入

```js
import { NoticeBar } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<NoticeBar>普通</NoticeBar>
```

###### 设置主题
```jsx
<NoticeBar theme="error">错误色</NoticeBar>
```

###### 自定义图标
```jsx
<NoticeBar icon={<Icon type="wrong-round" />}>自定义图标</NoticeBar>
```

###### 自动滚动轮播
```jsx
<NoticeBar autoscroll>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
```

#### 可操作

###### 链接样式
```jsx
<NoticeBar hasArrow onClick={() => alert('click this notice!')}>链接样式的</NoticeBar>
```

###### 可关闭
```jsx
<NoticeBar hasClosable>可关闭的</NoticeBar>
```


### API

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




