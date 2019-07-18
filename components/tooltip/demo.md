# Tooltip 工具提示

## 基本用法
```jsx
import { Tooltip, Cell, Button, Popper } from 'zarm';

class Demo extends React.Component {

  render() {
    return (
      <div>
        <Cell>
          <div>
            <div style={{ marginLeft: 60 }}>
              <Tooltip direction="topLeft" title="topLeft text">
                <Button block size="xs">TL</Button>
              </Tooltip>

              <Tooltip direction="top" title="top text">
                <Button block size="xs">Top</Button>
              </Tooltip>

              <Tooltip direction="topRight" title="topRight text">
                <Button block size="xs">TR</Button>
              </Tooltip>
            </div>

            <div style={{ width: 60, float: "left",  clear: 'both' }}>
              <Tooltip direction="leftTop" title="leftTop text">
                <Button block size="xs">LT</Button>
              </Tooltip>

              <Tooltip direction="left" title="left text">
                <Button block size="xs">Left</Button>
              </Tooltip>

              <Tooltip direction="leftBottom" title="leftBottom text">
                <Button block size="xs">LB</Button>
              </Tooltip>
            </div>

            <div style={{ width: 60, marginLeft: 60 * 4 }}>
              <Tooltip direction="rightTop" title="rightTop text">
                <Button block size="xs">RT</Button>
              </Tooltip>

              <Tooltip direction="right" title="right text">
                <Button block size="xs">Right</Button>
              </Tooltip>

              <Tooltip direction="rightBottom" title="rightBottom text">
                <Button block size="xs">RB</Button>
              </Tooltip>
            </div>

            <div style={{ marginLeft: 60, clear: 'both' }}>
              <Tooltip direction="bottomLeft" title="bottomLeft text">
                <Button block size="xs">BL</Button>
              </Tooltip>

              <Tooltip direction="bottom" title="bottom text">
                <Button block size="xs">Bottom</Button>
              </Tooltip>

              <Tooltip direction="bottomRight" title="bottomRight text">
                <Button block size="xs">BR</Button>
              </Tooltip>
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
| title | ReactNode | - | 显示内容 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | string | 'click' | 触发方式，PC端默认值为'hover' |
| onVisibleChange | (visible?: boolean) => void | noop | 显示/隐藏触发的事件 |
