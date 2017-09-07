# 面板 Panel

[demo页面](https://zhongantecheng.github.io/zarm/#/panel)

### 引入

```js
import { Panel } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Panel>
  <Panel.Header title="普通" />
  <Panel.Body>body</Panel.Body>
</Panel>
```

###### 带更多按钮
```jsx
<Panel>
  <Panel.Header title="带更多按钮" more={<a onClick={() => alert('click more')}>更多</a>} />
  <Panel.Body>body</Panel.Body>
</Panel>
```

###### 带底部
```jsx
<Panel>
  <Panel.Header title="带底部" />
  <Panel.Body>body</Panel.Body>
  <Panel.Footer title="左侧文案" more="右侧文案" />
</Panel>
```


### API

#### Panel

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| children | React.element | | | 内容 |


#### Panel.Header

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| title | React.element | | | 标题 |
| more | React.element | | | 更多 |


#### Panel.Footer

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| title | React.element | | | 标题 |
| more | React.element | | | 更多 |




