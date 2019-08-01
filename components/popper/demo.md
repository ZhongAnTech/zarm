# Popper 气泡层


## 基本用法
```jsx
import { Cell, Button, Popper, Select } from 'zarm';

class Demo extends React.Component {
  state = {
    visible: false,
    direction: 'top',
    trigger: 'click',
  }

  render() {
    const { visible, direction, trigger } = this.state;

    return (
      <>
        <Cell className="basic-demo">
          <Popper
            content="我是气泡层的内容"
            visible={visible}
            trigger={trigger}
            direction={direction}
            className="custom-content"
          >
            <Button theme="primary" size="xs" onClick={() => trigger === 'manual' && this.setState({ visible: !visible })}>
              点击{visible ? '隐藏' : '显示'}
            </Button>
          </Popper>
        </Cell>
        <Cell hasArrow title="显示方向">
          <Select
            value={direction}
            dataSource={[
              { value: 'topLeft', label: 'topLeft' },
              { value: 'top', label: 'top' },
              { value: 'topRight', label: 'topRight' },
              { value: 'rightTop', label: 'rightTop' },
              { value: 'right', label: 'right' },
              { value: 'rightBottom', label: 'rightBottom' },
              { value: 'bottomLeft', label: 'bottomLeft' },
              { value: 'bottom', label: 'bottom' },
              { value: 'bottomRight', label: 'bottomRight' },
              { value: 'leftTop', label: 'leftTop' },
              { value: 'left', label: 'left' },
              { value: 'leftBottom', label: 'leftBottom' },
            ]}
            onOk={(selected) => {
              this.setState({
                direction: selected[0].value,
              });
            }}
          />
        </Cell>
        <Cell hasArrow title="触发方式">
          <Select
            value={trigger}
            dataSource={[
              { value: 'click', label: 'click（点击状态触发）' },
              { value: 'hover', label: 'hover（hover状态触发）' },
              { value: 'focus', label: 'focus（聚焦状态触发）' },
              { value: 'manual', label: 'manual（受控触发）' },
              { value: 'contextMenu', label: 'contextMenu（右键触发）' },
            ]}
            onOk={(selected) => {
              this.setState({
                trigger: selected[0].value,
                visible: false,
              });
            }}
          />
        </Cell>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 自定义箭头
```jsx
import { Cell, Button, Popper, Radio } from 'zarm';

class Demo extends React.Component {
  state = {
    arrow: '0'
  }

  render() {
    const { arrow } = this.state

    return (
      <>
        <Cell description={
          <Radio.Group
            compact
            type="button"
            value={this.state.arrow}
            onChange={value => {
              this.setState({ arrow: value });
            }}
          >
            <Radio value="0">跟随方向</Radio>
            <Radio value="1">元素中心</Radio>
          </Radio.Group>
        }>
          箭头位置
        </Cell>
        <Cell className="direction-demo">
          <div>
            <div style={{ marginLeft: 60 }}>
              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="topLeft" content="topLeft text">
                <Button block size="xs">TL</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="top" content="top text">
                <Button block size="xs">Top</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="topRight" content="topRight text">
                <Button block size="xs">TR</Button>
              </Popper>
            </div>

            <div style={{ width: 60, float: 'left', clear: 'both' }}>
              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="leftTop" content="leftTop text">
                <Button block size="xs">LT</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="left" content="left text">
                <Button block size="xs">Left</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="leftBottom" content="leftBottom text">
                <Button block size="xs">LB</Button>
              </Popper>
            </div>

            <div style={{ width: 60, marginLeft: 60 * 4 + 20 }}>
              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="rightTop" content="rightTop text">
                <Button block size="xs">RT</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="right" content="right text">
                <Button block size="xs">Right</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="rightBottom" content="rightBottom text">
                <Button block size="xs">RB</Button>
              </Popper>
            </div>

            <div style={{ marginLeft: 60, clear: 'both' }}>
              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="bottomLeft" content="bottomLeft text">
                <Button block size="xs">BL</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="bottom" content="bottom text">
                <Button block size="xs">Bottom</Button>
              </Popper>

              <Popper arrowPointAtCenter={arrow === '1'} className="custom-arrow-content" hasArrow direction="bottomRight" content="bottomRight text">
                <Button block size="xs">BR</Button>
              </Popper>
            </div>
          </div>
        </Cell>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```


### API
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| content | ReactNode | - | 显示内容 |
| hasArrow | boolean | false | 是否带有箭头 |
| arrowPointAtCenter | boolean | false | 箭头是否指向目标元素中心 |
| className | string | - | 气泡层类名追加 |
| mouseEnterDelay | number | 100ms | 鼠标移入后延时多少才显示气泡层，单位：毫秒 |
| mouseLeaveDelay | number | 100ms | 鼠标移出后延时多少才隐藏气泡层，单位：毫秒 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | string | 'click' | 触发方式，PC端默认值为 'hover', 可选值为：点击触发`click`、hover状态触发`hover`、聚焦状态触发`focus`、受控触发`manual`、右键触发`contextMenu` |
| onVisibleChange | (visible?: boolean) => void | noop | 显示/隐藏触发的事件 |
