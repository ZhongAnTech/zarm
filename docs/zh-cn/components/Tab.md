# 标签页 Tab

[demo页面](https://zhongantecheng.github.io/zarm/#/tab)

### 引入

```js
import { Tab } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Tab onChange={(index) => { console.log(index); }}>
  <Tab.Panel title="选项卡1">选项卡1内容</Tab.Panel>
  <Tab.Panel title="选项卡2">选项卡2内容</Tab.Panel>
</Tab>
```

###### 可滑动
```jsx
<Tab canSwipe>
  <Tab.Panel title="选项卡1">选项卡1内容</Tab.Panel>
  <Tab.Panel title="选项卡2">选项卡2内容</Tab.Panel>
</Tab>
```

###### 指定默认选项
```jsx
<Tab defaultValue={1}>
  <Tab.Panel title="选项卡1">选项卡1内容</Tab.Panel>
  <Tab.Panel title="选项卡2">选项卡2内容</Tab.Panel>
</Tab>
```

###### 指定线条宽度
```jsx
<Tab lineWidth={60}>
  <Tab.Panel title="选项卡1">选项卡1内容</Tab.Panel>
  <Tab.Panel title="选项卡2">选项卡2内容</Tab.Panel>
</Tab>
```

###### 禁用指定选项
```jsx
<Tab>
  <Tab.Panel title="选项卡1">选项卡1内容</Tab.Panel>
  <Tab.Panel title="选项卡2" disabled>选项卡2内容</Tab.Panel>
</Tab>
```



### API

#### Tab

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-tab | | 类名前缀 |
| className | string | | | 追加类名 |
| value | string | | | 值 |
| defaultValue | string | | | 初始值 |
| disabled | boolean | false | | 是否禁用 |
| canSwipe | boolean | false | | 是否支持滑动切换 |
| lineWidth | number &#124; string | | | 线条宽度 |
| onChange | <code>(index: number) => void</code> | noop | \(index: number\) | 值变化时触发的回调函数 |


#### Tab.Panel

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| className | string | | | 追加类名 |
| disabled | boolean | false | | 是否禁用 |
| title | string | | | 标题 |
| children | number | | | 内容 |




