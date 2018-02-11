# 手风琴 Accordion

[demo页面](https://zhongantecheng.github.io/zarm/#/accordion)

### 引入

```js
import { Accordion } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Accordion>
  <Accordion.Item title="50元套餐">
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
  </Accordion.Item>
  <Accordion.Item title="100元套餐">
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
  </Accordion.Item>
  <Accordion.Item title="200元套餐">
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
  </Accordion.Item>
</Accordion>
```

###### 手风琴模式
```jsx
<Accordion accordion animated>
  <Accordion.Item title="50元套餐">
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
  </Accordion.Item>
  <Accordion.Item title="100元套餐">
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
  </Accordion.Item>
  <Accordion.Item title="200元套餐">
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
  </Accordion.Item>
</Accordion>
```

###### 默认展开项
```jsx
<Accordion defaultActiveIndex={[0, 1]}>
  <Accordion.Item title="50元套餐">
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
    <div>我是50元套餐内容</div>
  </Accordion.Item>
  <Accordion.Item title="100元套餐">
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
    <div>我是100元套餐内容</div>
  </Accordion.Item>
  <Accordion.Item title="200元套餐">
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
    <div>我是200元套餐内容</div>
  </Accordion.Item>
</Accordion>
```


### Accordion API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-accordion | | 类名前缀 |
| className | string | | | 追加类名 |
| accordion | boolean | false | | 是否使用手风琴模式 |
| animated | boolean | false | | 是否添加展开动画 |
| activeIndex | array or string or number | [] | | 动态更新展开项的索引数组或字符串或数字 |
| defaultActiveIndex | array or string or number | [] | | 初始化默认展开项的索引数组或字符串或数字 |
| onChange | <code>(index) => void</code> | noop | \(index: number\) | 点击某一项的回调函数 |

### Accordion.Item API
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-accordion | | 类名前缀 |
| className | string | | | 追加类名 |
| title | string | | | 每一项的名称 |




