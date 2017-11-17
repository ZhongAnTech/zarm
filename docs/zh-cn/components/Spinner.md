# 指示器 Spinner

[demo页面](https://zhongantecheng.github.io/zarm/#/spinner)

### 引入

```js
import { Spinner } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Spinner />
```

###### 设置动画
```jsx
<Spinner className="rotate360" />
```

###### 设置大小
```jsx
<Spinner className="rotate360" size="lg" />
```



### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-stepper | | 类名前缀 |
| className | string | | | 追加类名 |
| strokeWidth | number | | | 指示器边框的宽度 |  
| percent | number | | | 初始百分比 |
| size | string | | 'lg' | 大小 |




