## 模态框 Modal

:::demo 基本用法
```jsx
import { Modal, Cell, Button } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
    };
  }

  open(key) {
    this.setState({
      [`${key}`]: true,
    });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    return (
      <div>
        <Cell
          description={
            <Button size="sm" onClick={() => this.open('modal1')}>开启</Button>
          }
        >
          普通
        </Cell>

        <Cell
          description={
            <Button size="sm" onClick={() => this.open('modal3')}>开启</Button>
          }
        >
          圆角
        </Cell>

        <Cell
          description={
            <Button size="sm" onClick={() => this.open('modal2')}>开启</Button>
          }
        >
          遮罩层可关闭
        </Cell>

        <Cell
          description={
            <Button size="sm" onClick={() => this.open('modal4')}>开启</Button>
          }
        >
          无头部
        </Cell>

        <Cell
          description={
            <Button size="sm" onClick={() => this.open('modal5')}>开启</Button>
          }
        >
          动画效果
        </Cell>

        <Modal visible={this.state.modal1}>
          <Modal.Header title="标题" onClose={() => this.close('modal1')} />
          <Modal.Body>模态框内容</Modal.Body>
        </Modal>

        <Modal visible={this.state.modal2} onMaskClick={() => this.close('modal2')}>
          <Modal.Header title="标题" />
          <Modal.Body>点击遮罩层关闭</Modal.Body>
        </Modal>

        <Modal shape="radius" visible={this.state.modal3}>
          <Modal.Header title="标题" onClose={() => this.close('modal3')} />
          <Modal.Body>模态框内容</Modal.Body>
        </Modal>

        <Modal visible={this.state.modal4} onMaskClick={() => this.close('modal4')}>
          <Modal.Body>无头部</Modal.Body>
        </Modal>

        <Modal visible={this.state.modal5} animationType="rotate" onMaskClick={() => this.close('modal5')}>
          <Modal.Body>
            当前使用的是rotate旋转效果。<br /><br />
            支持多种动画效果：<br />
            fade：淡出淡入效果（默认）<br />
            zoom：缩放效果<br />
            rotate：旋转效果<br />
            door：开关门效果<br />
            flip：翻转效果<br />
            moveUp、moveDown、moveLeft、moveRight：移出移入效果<br />
            slideUp、slideDown、slideLeft、slideRight：滑出滑入效果<br />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 特定场景
```jsx
import { Cell, Button, Alert, Confirm  } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      confirm: false,
    };
  }

  open(key) {
    this.setState({
      [`${key}`]: true,
    });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    return (
      <div>
        <Cell
          description={
            <Button size="sm" theme="warning" onClick={() => this.open('alert')}>开启</Button>
          }
        >
          警告框 Alert
        </Cell>

        <Cell
          description={
            <Button size="sm" theme="warning" onClick={() => this.open('confirm')}>开启</Button>
          }
        >
          确认框 Confirm
        </Cell>

        <Alert
          shape="radius"
          visible={this.state.alert}
          title="警告"
          message="这里是警告信息"
          onCancel={() => this.close('alert')}
        />

        <Confirm
          shape="radius"
          visible={this.state.confirm}
          title="确认信息"
          message="你确定要这样做吗？"
          onOk={() => alert('click ok')}
          onCancel={() => this.close('confirm')}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

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

:::