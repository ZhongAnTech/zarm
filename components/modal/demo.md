## 模态框 Modal



### 基本用法
```jsx
import { Modal, Cell, Button, Select } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      animationType: 'fade',
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
    const { modal1, modal2, modal3, modal4, modal5, animationType } = this.state;
    return (
      <div>
        <Cell
          description={
            <Button size="xs" onClick={() => this.open('modal1')}>开启</Button>
          }
        >
          普通
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('modal3')}>开启</Button>
          }
        >
          圆角
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('modal2')}>开启</Button>
          }
        >
          遮罩层可关闭
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('modal4')}>开启</Button>
          }
        >
          无头部
        </Cell>

        <Cell
          title="动画效果"
          description={
            <div>
              <Button size="xs" onClick={() => this.open('modal5')}>开启</Button>
            </div>
          }
        >
          <Select
            value={animationType}
            dataSource={[
              { value: 'fade', label: '淡出淡入效果(fade)' },
              { value: 'zoom', label: '缩放效果(zoom)' },
              { value: 'rotate', label: '旋转效果(rotate)' },
              { value: 'door', label: '开关门效果(door)' },
              { value: 'flip', label: '翻转效果(flip)' },
              { value: 'moveUp', label: '移出移入效果(moveUp)' },
              { value: 'moveDown', label: '移出移入效果(moveDown)' },
              { value: 'moveLeft', label: '移出移入效果(moveLeft)' },
              { value: 'moveRight', label: '移出移入效果(moveRight)' },
              { value: 'slideUp', label: '滑出滑入效果(slideUp)' },
              { value: 'slideDown', label: '滑出滑入效果(slideDown)' },
              { value: 'slideLeft', label: '滑出滑入效果(slideLeft)' },
              { value: 'slideRight', label: '滑出滑入效果(slideRight)' },
            ]}
            onOk={(selected) => {
              this.setState({
                animationType: selected.map(item => item.value),
              });
            }}
          />
        </Cell>

        <Modal visible={modal1}>
          <Modal.Header title="标题" onClose={() => this.close('modal1')} />
          <Modal.Body>模态框内容</Modal.Body>
        </Modal>

        <Modal visible={modal2} onMaskClick={() => this.close('modal2')}>
          <Modal.Header title="标题" />
          <Modal.Body>点击遮罩层关闭</Modal.Body>
        </Modal>

        <Modal shape="radius" visible={modal3}>
          <Modal.Header title="标题" onClose={() => this.close('modal3')} />
          <Modal.Body>模态框内容</Modal.Body>
        </Modal>

        <Modal visible={modal4} onMaskClick={() => this.close('modal4')}>
          <Modal.Body>无头部</Modal.Body>
        </Modal>

        <Modal visible={modal5} animationType={animationType} onMaskClick={() => this.close('modal5')}>
          <Modal.Body>
            <div style={{ height: 100 }}>当前使用的动画类型animationType：'{animationType}'</div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



### 特定场景
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
    const { alert, confirm } = this.state;
    return (
      <div>
        <Cell
          description={
            <Button size="xs" theme="warning" onClick={() => this.open('alert')}>开启</Button>
          }
        >
          警告框 Alert
        </Cell>

        <Cell
          description={
            <Button size="xs" theme="warning" onClick={() => this.open('confirm')}>开启</Button>
          }
        >
          确认框 Confirm
        </Cell>

        <Alert
          shape="radius"
          visible={alert}
          title="警告"
          message="这里是警告信息"
          onCancel={() => this.close('alert')}
        />

        <Confirm
          shape="radius"
          visible={confirm}
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



### API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| shape | string | 'rect' | 形状，可选值 `rect`、`radius` |
| visible | boolean | false | 是否显示 |
| animationType | string | 'fade' | 动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| width | string &#124; number | '70%' | 宽度 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
