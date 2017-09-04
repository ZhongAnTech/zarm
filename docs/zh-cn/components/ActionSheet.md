# 动作面板 ActionSheet

[demo页面](https://zhongantecheng.github.io/zarm/#/action-sheet)

### 引入

```js
import { ActionSheet } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<ActionSheet
  visible={this.state.visible}
  onMaskClick={() => {
    this.setState({
      visible: false,
    });
  }}
  actions={[
    {
      text: '操作一',
      onClick: () => console.log('点击操作一'),
    },
    {
      text: '操作二',
      onClick: () => console.log('点击操作二'),
    },
  ]}
  />
```

###### 带取消操作
```jsx
<ActionSheet
  visible={this.state.visible}
  onMaskClick={() => {
    this.setState({
      visible: false,
    });
  }}
  actions={[
    {
      text: '操作一',
      onClick: () => console.log('点击操作一'),
    },
    {
      text: '操作二',
      onClick: () => console.log('点击操作二'),
    },
    {
      theme: 'error',
      text: '操作三',
      onClick: () => console.log('点击操作三'),
    },
  ]}
  onCancel={() => {
    this.setState({
      visible: false,
    });
  }}
  />
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-switch | | 类名前缀 |
| className | string | | | 追加类名 |
| shape | string | | 'radius' | 形状 |
| visible | bool | false | | 是否显示 |
| actions | arrayOf(object) | [ ] | object: { theme, text, onClick } | 动作列表 |
| onMaskClick | func | noop | | 点击遮罩层时触发的回调函数 |
| onCancel | func | | void | 显示取消菜单，点击时触发的回调函数 |
| cancelText | string | '取消' |  | 取消菜单的文案 |




