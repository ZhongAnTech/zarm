# 图片轮播 Swipe

[demo页面](https://zhongantecheng.github.io/zarm/#/swipe)

### 引入

```js
import { Swipe } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Swipe>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Swipe>
```

###### 纵向
```jsx
<Swipe direction="top" height={300}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Swipe>
```

###### 循环
```jsx
<Swipe loop>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Swipe>
```

###### 自动循环轮播
```jsx
<Swipe loop autoPlay>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Swipe>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-swipe | | 类名前缀 |
| className | string | | | 追加类名 |
| direction | string | 'left' | 'left', 'right', 'top', 'bottom' | 滑动方向 |
| height | number &#124; string | | | 高度 |
| activeIndex | number | 0 | | 当前页面的索引 |
| loop | boolean | false | | 是否循环 |
| autoPlay | boolean | false | | 是否自动轮播 |
| autoPlayIntervalTime | number | 3000 | | 自动轮播时间间隔，单位：毫秒 |
| moveDistanceRatio | number | 0.5 | | 移动距离比例临界点 |
| moveTimeSpan | number | 300 | | 移动时间跨度临界点，单位：毫秒 |
| animationDuration | number | 300 | | 动画执行时间，单位：毫秒 |
| showPagination | boolean | true | | 是否显示分页器 |
| onChange | <code>(activeIndex: number) => void</code> | noop | \(activeIndex: number\) | 值变化时触发的回调函数 |
| onChangeEnd | <code>(activeIndex: number) => void</code> | noop | \(activeIndex: number\) | 值变化动画结束后触发的回调函数 |





