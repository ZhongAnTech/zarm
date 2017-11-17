# 徽标 Badge

[demo页面](https://zhongantecheng.github.io/zarm/#/badge)

### 引入

```js
import { Badge } from `zarm`;
```

### 代码演示

#### 基本用法

###### 点状
```jsx
<Badge shape="dot" />
```

###### 直角
```jsx
<Badge text="免费" />
```

###### 圆角
```jsx
<Badge shape="radius" text="new" />
```

###### 椭圆形
```jsx
<Badge shape="round" text="999+" />
```

###### 圆形
```jsx
<Badge shape="circle" text={3} />
```

#### 上标位置
```jsx
<Badge sup shape="dot">
  <div style={{ width: 30, height: 30, background: `#ddd` }}></div>
</Badge>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-badge | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `error` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| text | any | | | 显示文字 |
| shape | string | | `dot`, `radius`, `round`, `circle` | 形状 |
| sup | bool | false | | 是否上标位置 |




