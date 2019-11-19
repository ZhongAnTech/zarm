# Popup 弹出框



## 基本用法
```jsx
import { Popup, Cell, Button, Picker, Toast, Modal, Loading } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

class Demo extends React.Component {
  state = {
    visible: {
      popBottom: false,
      popTop: false,
      popLeft: false,
      popRight: false,
      picker: false,
      popSpec: false,
      popCenterSpec: false,
    },
    value: '',
  };

  toggle = (key) => {
    const visible = this.state.visible;
    this.setState({ 
      visible:{
        ...visible,
        [key]: !visible[key]
      }
    });
  }

  render() {
    const { visible, value } = this.state;
    return (
      <div>
        <Cell
          description={
            <Button size="xs" onClick={() => {
              this.toggle('popTop');
              setTimeout(() => {
                this.toggle('popTop');
              }, 3000);
            }}>开启</Button>
          }
        >
          从上方弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => { this.toggle('popBottom'); }}>开启</Button>
          }
        >
          从下方弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('popLeft')}>开启</Button>
          }
        >
          从左侧弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('popRight')}>开启</Button>
          }
        >
          从右侧弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('popCenter')}>开启</Button>
          }
        >
          从中间弹出
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('popSpec')}>开启</Button>
          }
        >
          自定义挂载节点
        </Cell>

        <Popup
          visible={visible.popTop}
          direction="top"
          mask={false}
          afterClose={() => { console.log('关闭'); }}
        >
          <div className="popup-box-top">
            更新成功
          </div>
        </Popup>

        <Popup
          visible={visible.popBottom}
          direction="bottom"
          onMaskClick={() => { this.toggle('popBottom')}}
          afterOpen={() => console.log('打开')}
          afterClose={() => console.log('关闭')}
          destroy={false}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => { this.toggle('picker'); }}>打开Picker</Button>
          </div>
        </Popup>

        <Picker
          visible={visible.picker}
          value={value}
          dataSource={SINGLE_DATA}
          onOk={(selected) => {
            console.log('Picker onOk: ', selected);
            this.setState({ value: selected.map(item => item.value) });
            Toast.show(JSON.stringify(selected));
            this.toggle('picker');
          }}
          onCancel={() => this.toggle('picker')}
        />

        <Popup
          visible={visible.popLeft}
          onMaskClick={() => this.toggle('popLeft')}
          direction="left"
          afterClose={() => console.log('关闭')}
        >
          <div className="popup-box-left">
            <Button size="xs" onClick={() => this.toggle('popLeft')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={visible.popRight}
          onMaskClick={() => this.toggle('popRight')}
          direction="right"
          afterClose={() => console.log('关闭')}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => this.toggle('popRight')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={visible.popCenter}
          direction="center"
          width="70%"
          afterClose={() => console.log('关闭')}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => this.toggle('popCenter')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={visible.popCenterSpec}
          direction="center"
          width="70%"
          afterClose={() => console.log('关闭')}
          getContainer={() => {
            return this.popupRef.portalRef.popup
          }}
        >
          <div className="popup-box">
            <Button size="xs" onClick={() => this.toggle('popCenterSpec')}>关闭弹层</Button>
          </div>
        </Popup>

        <Popup
          visible={visible.popSpec}
          onMaskClick={() => this.toggle('popSpec')}
          afterClose={() => console.log('关闭')}
          ref={ref => this.popupRef = ref}
          destroy={false}
        >
          <div className="popup-box-bottom">
            <Button size="xs" onClick={() => this.toggle('popCenterSpec')}>打开弹层</Button>
            <p>打开的modal挂载此popup上</p>
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
| animationType | string | 'fade' | 当弹出方向为中间位置（direction="center"）时的动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| width | string &#124; number | - | 弹层宽度 |
| mask | boolean | true | 是否展示遮罩层 |
| maskType | string | 'normal' | 遮罩层的类型，可选值 `transparent`, `normal` |
| destroy | boolean | true | 弹层关闭后是否移除节点 |
| afterOpen | () => void | - | 弹层展示后的回调 |
| afterClose | () => void | - | 弹层关闭后的回调 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Popup 挂载的 HTML 节点 |