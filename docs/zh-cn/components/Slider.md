# 滑动输入条 Slider

[demo页面](https://zhongantecheng.github.io/zarm/#/slider)

### 引入

```js
import { Slider } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Slider value={this.state.value} onChange={(value) => { console.log(value); }} />
```

###### 设置默认值
```jsx
<Slider defaultValue={10} />
```

###### 设置上下限
```jsx
<Slider min={0} max={100} />
```

###### 禁用步长
```jsx
<Slider step={10} />
```

###### 禁用状态
```jsx
<Slider disabled />
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-slider | | 类名前缀 |
| className | string | | | 追加类名 |
| value | number | | | 值 |
| defaultValue | number | | | 初始值 |
| min | number | | | 最小值 |
| max | number | | | 最大值 |
| step | number | 1 | | 步长 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(value: number) => void</code> | noop | \(value: number\) | 值变化时触发的回调函数 |




