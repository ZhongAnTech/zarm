# Tooltip 工具提示

## 基本用法
```jsx
import { Tooltip, Cell, Button, Message, Icon } from 'zarm';

const Demo = () => (
  <>
    <Cell>
      <div>
        <div style={{ marginLeft: 60 }}>
          <Tooltip direction="topLeft" content="topLeft text">
            <Button size="xs">TL</Button>
          </Tooltip>

          <Tooltip direction="top" content="top text">
            <Button size="xs">Top</Button>
          </Tooltip>

          <Tooltip direction="topRight" content="topRight text">
            <Button  size="xs">TR</Button>
          </Tooltip>
        </div>

        <div style={{ width: 60, float: 'left', clear: 'both' }}>
          <Tooltip direction="leftTop" content="leftTop text">
            <Button size="xs">LT</Button>
          </Tooltip>

          <Tooltip direction="left" content="left text">
            <Button size="xs">Left</Button>
          </Tooltip>

          <Tooltip direction="leftBottom" content="leftBottom text">
            <Button size="xs">LB</Button>
          </Tooltip>
        </div>

        <div style={{ width: 60, marginLeft: 60 * 4 + 20 }}>
          <Tooltip direction="rightTop" content="rightTop text">
            <Button size="xs">RT</Button>
          </Tooltip>

          <Tooltip direction="right" content="right text">
            <Button size="xs">Right</Button>
          </Tooltip>

          <Tooltip direction="rightBottom" content="rightBottom text">
            <Button size="xs">RB</Button>
          </Tooltip>
        </div>

        <div style={{ marginLeft: 60, clear: 'both' }}>
          <Tooltip direction="bottomLeft" content="bottomLeft text">
            <Button size="xs">BL</Button>
          </Tooltip>

          <Tooltip direction="bottom" content="bottom text">
            <Button size="xs">Bottom</Button>
          </Tooltip>

          <Tooltip direction="bottomRight" content="bottomRight text">
            <Button size="xs">BR</Button>
          </Tooltip>
        </div>
        <Message theme="warning" icon={<Icon type="warning-round" />}>左右两侧显示位置不足会自动调整为反向显示</Message>
      </div>
    </Cell>
  </>
);

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
| mouseEnterDelay | number | 100 | 鼠标移入后延时多少才显示气泡层，单位：毫秒 |
| mouseLeaveDelay | number | 100 | 鼠标移出后延时多少才隐藏气泡层，单位：毫秒 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | string | 'click' | 触发方式，PC端默认值为 'hover', 可选值为：点击触发`click`、hover状态触发`hover`、聚焦状态触发`focus`、受控触发`manual`、右键触发`contextMenu` |
| onVisibleChange | (visible?: boolean) => void | noop | 显示/隐藏触发的事件 |
