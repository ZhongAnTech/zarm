# Popper 弹层

## 触发方式 默认为hover
```jsx
import { Cell, Button, Popper } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <div>
        <Cell description={
          <Popper title="我是一段文案" wrapperCls="common-popper">
            <Button block size="xs">显示</Button>
          </Popper>
        }>
          默认触发方式
        </Cell>
        <Cell description={
          <Popper title="我是一段文案" trigger="click" wrapperCls="common-popper">
            <Button block size="xs">显示</Button>
          </Popper>
        }>
          点击方式触发
        </Cell>
        <Cell description={
          <Popper title="我是一段文案" trigger="manual" visible={this.state.visible} wrapperCls="common-popper">
            <Button block size="xs" onClick={() => this.setState({ visible: !this.state.visible })}>显示</Button>
          </Popper>
        }>
            手动控制显示隐藏
        </Cell>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 位置
```jsx
import { Cell, Button, Popper } from 'zarm';

class Demo extends React.Component {

  render() {
    return (
      <div>
        <Cell>
          <div>
            <div style={{ marginLeft: 60 }}>
              <Popper hasArrow direction="topLeft" title="topLeft text">
                <Button block size="xs">TL</Button>
              </Popper>

              <Popper hasArrow direction="top" title="top text">
                <Button block size="xs">Top</Button>
              </Popper>

              <Popper hasArrow direction="topRight" title="topRight text">
                <Button block size="xs">TR</Button>
              </Popper>
            </div>

            <div style={{ width: 60, float: "left",  clear: 'both' }}>
              <Popper direction="leftTop" title="leftTop text">
                <Button block size="xs">LT</Button>
              </Popper>

              <Popper direction="left" title="left text">
                <Button block size="xs">Left</Button>
              </Popper>

              <Popper direction="leftBottom" title="leftBottom text">
                <Button block size="xs">LB</Button>
              </Popper>
            </div>

            <div style={{ width: 60, marginLeft: 60 * 4 }}>
              <Popper direction="rightTop" title="rightTop text">
                <Button block size="xs">RT</Button>
              </Popper>

              <Popper direction="right" title="right text">
                <Button block size="xs">Right</Button>
              </Popper>

              <Popper direction="rightBottom" title="rightBottom text">
                <Button block size="xs">RB</Button>
              </Popper>
            </div>

            <div style={{ marginLeft: 60, clear: 'both' }}>
              <Popper direction="bottomLeft" title="bottomLeft text">
                <Button block size="xs">BL</Button>
              </Popper>

              <Popper direction="bottom" title="bottom text">
                <Button block size="xs">Bottom</Button>
              </Popper>

              <Popper direction="bottomRight" title="bottomRight text">
                <Button block size="xs">BR</Button>
              </Popper>
            </div>

          </div>
        </Cell>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```


### API
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| title | ReactNode | - | 显示标题 |
| content | ReactNode | - | 显示内容 |
| hasArrow | boolean | true | 是否带有箭头 |
| wrapperCls | string | - | popper wrapper的类名自定义 |
| className | string | - | popper 的类名自定义 |
| mouseEnterDelay | number | 100ms | 鼠标移入后延时多少才显示 Popper，单位：毫秒 |
| mouseLeaveDelay | number | 100ms | 鼠标移出后延时多少才显示 Popper，单位：毫秒 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | string | 'click' | 触发方式，PC端默认值为'hover', 可选址为 `click`、`hover`、`manual` |
| onVisibleChange | (visible?: boolean) => void | noop | 显示/隐藏触发的事件 |
