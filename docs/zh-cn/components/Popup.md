# 弹出框 Popup

[demo页面](https://zhongantecheng.github.io/zarm/#/popup)

### 引入

```js
import { Popup } from `zarm`;
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Popup
  visible={this.state.visible}
  onMaskClick={() => this.setState({ visible: false })}>
  <div style={{ height: 100 }}>更新成功</div>
</Popup>
```

###### 自动关闭
```jsx
<Popup
  autoClose
  stayTime={5000}
  visible={this.state.visible}
  onMaskClick={() => this.setState({ visible: false })}>
  <div style={{ height: 100 }}>5秒后自动关闭</div>
</Popup>
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-popup | | 类名前缀 |
| className | string | | | 追加类名 |
| visible | boolean | false | | 是否显示 |
| autoClose | boolean | false | | 是否自动关闭 |
| direction | string | `bottom` | `top`, `bottom`, `left`, `right` | 弹出方向 |
| stayTime | number | 3000 | | 自动关闭前停留的时间（单位：毫秒） |
| animationDuration | number | 200 | | 动画执行时间（单位：毫秒） |
| maskType | string | `normal` | `transparent`, `light`, `normal`, `dark` | 遮罩层的类型 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |
| onClose | <code>() => void</code> | noop | | 关闭后触发的回调函数 |



