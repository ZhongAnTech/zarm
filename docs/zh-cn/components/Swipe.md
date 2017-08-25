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
| height | number, string | | | 高度 |
| loop | bool | false | | 是否循环 |
| autoPlay | bool | false | | 是否自动轮播 |
| onChange | func | noop | \(value: number\) | 值变化时触发的回调函数 |
| onChangeEnd | func | noop | \(value: number\) | 值变化动画结束后触发的回调函数 |





