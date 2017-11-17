# 按钮 Button

[demo页面](https://zhongantecheng.github.io/zarm/#/button)

### 引入

```js
import { Button } from `zarm`;
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Button>普通按钮</Button>
```

###### 幽灵按钮
```jsx
<Button bordered>幽灵按钮</Button>
```

###### 块级按钮
```jsx
<Button block>幽灵按钮</Button>
```

###### 禁用状态
```jsx
<Button disabled>禁用按钮</Button>
```

#### 多主题
```jsx
<Button>default</Button>
<Button theme="primary">primary</Button>
<Button theme="info">info</Button>
<Button theme="success">success</Button>
<Button theme="warning">warning</Button>
<Button theme="error">error</Button>
```

#### 按钮大小
```jsx
<Button size="xl">超大号</Button>
<Button size="lg">大号</Button>
<Button>默认</Button>
<Button size="sm">小号</Button>
<Button size="xs">超小号</Button>
```

#### 多形状
```jsx
<Button shape="radius">圆角按钮</Button>
<Button shape="round">椭圆角按钮</Button>
<Button shape="circle">圆形按钮</Button>
```

#### 带icon的按钮
```jsx
<Button icon={<Icon type="right-round" theme="success" />}>正确</Button>
<Button icon={<Icon type="wrong-round" theme="error" />}>错误</Button>
<Button loading>加载中</Button>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-button | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `default` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| size | string | | `xl`, `lg`, `sm`, `xs` | 大小 |
| shape | string | | `radius`, `round`, `circle` | 形状 |
| block | boolean | false | | 是否为块级元素 |
| bordered | boolean | false | | 是否是幽灵按钮 |
| disabled | boolean | false | | 是否禁用 |
| loading | boolean | false | | 是否显示加载中 |
| icon | JSX.Element | | | icon |
| onClick | <code>(e?: any) => void</code> | noop | | 点击后触发的回调函数 |




