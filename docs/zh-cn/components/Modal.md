# 模态框 Modal

[demo页面](https://zhongantecheng.github.io/zarm/#/modal)

### 引入

```js
import { Modal } from `zarm`;
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Modal visible={this.state.visible}>
  <Modal.Header title="标题" onClose={() => this.setState({ visible: false })} />
  <Modal.Body>
    模态框内容
  </Modal.Body>
</Modal>
```

###### 圆角
```jsx
<Modal shape="radius" visible={this.state.visible}>
  <Modal.Header title="标题" onClose={() => this.setState({ visible: false })} />
  <Modal.Body>
    模态框内容
  </Modal.Body>
</Modal>
```

###### 点击遮罩层关闭
```jsx
<Modal visible={this.state.visible} onMaskClick={() => this.setState({ visible: false })}>
  <Modal.Header title="标题" />
  <Modal.Body>
    模态框内容
  </Modal.Body>
</Modal>
```

###### 无头部
```jsx
<Modal visible={this.state.visible} onMaskClick={() => this.setState({ visible: false })}>
  <Modal.Body>
    模态框内容
  </Modal.Body>
</Modal>
```

###### 动画效果
```jsx
<Modal visible={this.state.visible} animationType="rotate" onMaskClick={() => this.setState({ visible: false })}>
  <Modal.Body>
    模态框内容
  </Modal.Body>
</Modal>
```

#### 特定场景

###### 警告框
```jsx
<Alert
  shape="radius"
  visible={this.state.visible}
  title="警告"
  message="这里是警告信息"
  onCancel={() => this.setState({ visible: false })}
  />
```

###### 确认框
```jsx
<Confirm
  shape="radius"
  visible={this.state.visible}
  title="确认信息"
  message="你确定要这样做吗？"
  onOk={() => alert(`click ok`)}
  onCancel={() => this.setState({ visible: false })}
  />
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-modal | | 类名前缀 |
| className | string | 无 | | 追加类名 |
| shape | string | 无 | `radius` | 形状 |
| visible | boolean | false | | 是否显示 |
| animationType | string | `fade` | `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` | 动画效果 |
| animationDuration | number | 200 | | 动画执行时间 |
| width | string &#124; number | `70%` | | 宽度 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |



