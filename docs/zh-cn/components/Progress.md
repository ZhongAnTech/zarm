# 进度条 Progress

[demo页面](https://zhongantecheng.github.io/zarm/#/progress)

### 引入

```js
import { Progress } from `zarm`;
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Progress />
```

###### 设置主题
```jsx
<Progress theme="error" />
```

###### 设置进度百分比
```jsx
<Progress percent={10} />
```

###### 设置文本
```jsx
<Progress percent={this.state.percent}>{this.state.percent}%</Progress>
```

#### 圆形
```jsx
<Progress shape="circle" />
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-progress | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| percent | number | 0 | | 进度百分比（范围：0～100） |
| shape | string | `line` | `line`, `circle` | 类型 |





