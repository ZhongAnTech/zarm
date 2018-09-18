## 弹出框 Popup

:::demo 基本用法
```jsx
import { Popup, Cell, Button } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popBottom: false,
      popTop: false,
      popLeft: false,
      popRight: false,
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
            <Button size="xs" onClick={() => this.open('popTop')}>开启</Button>
          }
        >
          从上方弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('popBottom')}>开启</Button>
          }
        >
          从下方弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('popLeft')}>开启</Button>
          }
        >
          从左侧弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('popRight')}>开启</Button>
          }
        >
          从右侧弹出
        </Cell>

        <Popup
          autoClose
          visible={this.state.popTop}
          direction="top"
          duration={3000}
          mask={false}
          onMaskClick={() => this.close('popTop')}
          onClose={() => console.log('关闭')}
        >
          <div className="popup-box-top">
            更新成功
          </div>
        </Popup>

        <Popup
          visible={this.state.popBottom}
          direction="bottom"
          onMaskClick={() => this.close('popBottom')}
          onOpen={() => console.log('打开')}
          onClose={() => console.log('关闭')}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => { this.close('popBottom'); }}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={this.state.popLeft}
          onMaskClick={() => this.close('popLeft')}
          direction="left"
          onClose={() => console.log('关闭')}
        >
          <div className="popup-box-left">
            <Button size="xs" onClick={() => this.close('popLeft')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={this.state.popRight}
          onMaskClick={() => this.close('popRight')}
          direction="right"
          onClose={() => console.log('关闭')}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => this.close('popRight')}>关闭弹层</Button>
          </div>
        </Popup>
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

:::