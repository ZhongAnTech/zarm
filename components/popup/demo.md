# Popup 弹出框



## 基本用法
```jsx
import { Popup, Cell, Button, Picker, Toast } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popBottom: false,
      popTop: false,
      popLeft: false,
      popRight: false,
      single: {
        visible: false,
        value: '',
        dataSource: SINGLE_DATA,
      },
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

  toggle(key) {
    const state = this.state[key];
    state.visible = !state.visible;
    this.setState({ [`${key}`]: state });
  }

  render() {
    const { single } = this.state;
    return (
      <div>
        <Cell
          description={
            <Button size="xs" onClick={() => {
              this.open('popTop');
              setTimeout(() => {
                this.close('popTop');
              }, 3000);
            }}>开启</Button>
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

        <Cell
          description={
            <Button size="xs" onClick={() => this.open('popCenter')}>开启</Button>
          }
        >
          从中间弹出
        </Cell>

        <Popup
          visible={this.state.popTop}
          direction="top"
          mask={false}
          // onMaskClick={() => this.close('popTop')}
          onClose={() => { console.log('关闭'); }}
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
            <Button size="xs" onClick={() => { this.toggle('single'); }}>打开Picker</Button>
          </div>
        </Popup>

        <Picker
          visible={single.visible}
          value={single.value}
          dataSource={single.dataSource}
          onOk={(selected) => {
            console.log('Picker onOk: ', selected);
            single.value = selected.map(item => item.value);
            this.setState({ single });
            Toast.show(JSON.stringify(selected));
            this.toggle('single');
          }}
          onCancel={() => this.toggle('single')}
        />

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

        <Popup
          visible={this.state.popCenter}
          onMaskClick={() => this.close('popCenter')}
          direction="center"
          width="70%"
          onClose={() => console.log('关闭')}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => this.close('popCenter')}>关闭弹层</Button>
          </div>
        </Popup>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| direction | string | 'bottom' | 弹出方向，可选值 `top`, `bottom`, `left`, `right`, `center` |
| animationType | string | 'fade' | 动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight`，当direction等于“center”时生效 |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| width | string &#124; number | - | 弹层宽度 |
| mask | boolean | true | 是否展示遮罩层 |
| maskType | string | 'normal' | 遮罩层的类型，可选值 `transparent`, `normal` |
| afterOpen | () => void | - | 弹层展示后的回调 |
| afterClose | () => void | - | 弹层关闭后的回调 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |