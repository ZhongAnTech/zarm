# 步进器 Stepper

[demo页面](https://zhongantecheng.github.io/zarm/#/stepper)

### 引入

```js
import { Stepper } from `zarm`;
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Stepper
  value={this.state.value}
  onChange={(value) => {
    this.setState({ value });
  }}
  />
```

###### 设置默认值
```jsx
<Stepper defaultValue={2} />
```

###### 设置上下限
```jsx
<Stepper min={-3} max={3} />
```

###### 设置步长
```jsx
<Stepper step={0.5} />
```

###### 禁用状态
```jsx
<Stepper disabled />
```

#### 多形状

###### 圆角
```jsx
<Stepper shape="radius" />
```

###### 圆形
```jsx
<Stepper shape="circle" />
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-stepper | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| shape | string | | `radius`, `circle` | 形状 |
| value | number | | | 值 |
| defaultValue | number | | | 初始值 |
| min | number | | | 最小值 |
| max | number | | | 最大值 |
| step | number | 1 | | 步长 |
| disabled | boolean | false | | 是否禁用 |
| onInputChange | <code>(value: number) => void</code> | noop | \(value: number\) | 输入值变化时触发的回调函数 |
| onChange | <code>(value: number) => void</code> | noop | \(value: number\) | 值变化时触发的回调函数 |




