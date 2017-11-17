# 滑动操作 SwipeAction

[demo页面](https://zhongantecheng.github.io/zarm/#/swipe-action)

### 引入

```js
import { SwipeAction } from 'zarm';
```

### 代码演示

#### 基本用法

###### 右侧操作
```jsx
<SwipeAction
  right={[
    {
      theme: 'error',
      text: '右按钮1',
      onClick: () => console.log('右按钮1'),
    },
    {
      theme: 'success',
      text: '右按钮2',
      onClick: () => console.log('右按钮2'),
    },
  ]}>
  <Cell>左滑看看</Cell>
</SwipeAction>
```

###### 左侧操作
```jsx
<SwipeAction
  left={[
    {
      theme: 'info',
      text: '左按钮1',
      onClick: () => console.log('左按钮1'),
    },
    {
      theme: 'warning',
      text: '左按钮2',
      onClick: () => console.log('左按钮2'),
    },
  ]}>
  <Cell>右滑看看</Cell>
</SwipeAction>
```

###### 双侧操作
```jsx
<SwipeAction
  autoClose
  left={[
    {
      theme: 'info',
      text: '左按钮1',
      onClick: () => console.log('左按钮1'),
    },
    {
      theme: 'warning',
      text: '左按钮2',
      onClick: () => console.log('左按钮2'),
    },
  ]}
  right={[
    {
      theme: 'error',
      text: '右按钮1',
      onClick: () => console.log('右按钮1'),
    },
    {
      theme: 'success',
      text: '右按钮2',
      onClick: () => console.log('右按钮2'),
    },
  ]}>
  <Cell>左右都能滑动（自动关闭）</Cell>
</SwipeAction>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-swipeaction | | 类名前缀 |
| className | string | | | 追加类名 |
| left | Array&lt;Object&gt; | [ ] | object: { theme, text, onClick } | 左侧按钮组 |
| right | Array&lt;Object&gt; | [ ] | object: { theme, text, onClick } | 右侧按钮组 |
| moveDistanceRatio | number | 0.5 | | 移动距离比例临界点 |
| moveTimeSpan | number | 300 | | 移动时间跨度临界点 |
| animationDuration | number | 300 | | 动画执行时间，单位：毫秒 |
| offset | number | 10 | | 回弹偏移的距离 |
| autoClose | boolean | | | 点击按钮后是否自动关闭 | 
| disabled | boolean | | | 是否允许滑动 |
| onOpen | <code>() => void</code> | noop | | 滑开时触发的回调函数 |
| onClose | <code>() => void</code> | noop | | 关闭时触发的回调函数 |




