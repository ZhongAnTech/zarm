# Tooltip 工具提示

## 基本用法

```jsx
import { Tooltip, Button, Message } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => (
  <div className="direction-demo">
    <div>
      <div style={{ marginLeft: 60 }}>
        <Tooltip direction="top-left" content="top-left text">
          <Button size="xs">TL</Button>
        </Tooltip>

        <Tooltip direction="top" content="top text">
          <Button size="xs">Top</Button>
        </Tooltip>

        <Tooltip direction="top-right" content="top-right text">
          <Button size="xs">TR</Button>
        </Tooltip>
      </div>

      <div style={{ width: 60, float: 'left', clear: 'both' }}>
        <Tooltip direction="left-top" content="left-top text">
          <Button size="xs">LT</Button>
        </Tooltip>

        <Tooltip direction="left" content="left text">
          <Button size="xs">Left</Button>
        </Tooltip>

        <Tooltip direction="left-bottom" content="left-bottom text">
          <Button size="xs">LB</Button>
        </Tooltip>
      </div>

      <div style={{ width: 60, marginLeft: 60 * 4 + 20 }}>
        <Tooltip direction="right-top" content="right-top text">
          <Button size="xs">RT</Button>
        </Tooltip>

        <Tooltip direction="right" content="right text">
          <Button size="xs">Right</Button>
        </Tooltip>

        <Tooltip direction="right-bottom" content="righ-bottom text">
          <Button size="xs">RB</Button>
        </Tooltip>
      </div>

      <div style={{ marginLeft: 60, clear: 'both' }}>
        <Tooltip direction="bottom-left" content="bottom-left text">
          <Button size="xs">BL</Button>
        </Tooltip>

        <Tooltip direction="bottom" content="bottom text">
          <Button size="xs">Bottom</Button>
        </Tooltip>

        <Tooltip direction="bottom-right" content="bottom-right text">
          <Button size="xs">BR</Button>
        </Tooltip>
      </div>
      <Message theme="warning" icon={<WarningCircle />}>
        左右两侧显示位置不足会自动调整为反向显示
      </Message>
    </div>
  </div>
);

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性               | 类型                       | 默认值  | 说明                                                                                                                                                             |
| :----------------- | :------------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible            | boolean                    | false   | 是否显示                                                                                                                                                         |
| content            | ReactNode                  | -       | 显示内容                                                                                                                                                         |
| hasArrow           | boolean                    | false   | 是否带有箭头                                                                                                                                                     |
| arrowPointAtCenter | boolean                    | false   | 箭头是否指向目标元素中心                                                                                                                                         |
| className          | string                     | -       | 气泡层类名追加                                                                                                                                                   |
| mouseEnterDelay    | number                     | 100     | 鼠标移入后延时多少才显示气泡层，单位：毫秒                                                                                                                       |
| mouseLeaveDelay    | number                     | 100     | 鼠标移出后延时多少才隐藏气泡层，单位：毫秒                                                                                                                       |
| direction          | string                     | 'top'   | 显示方向，可选值 `top-left`、`top`、`top-right`、`right-top`、`right`、`right-bottom`、`botto-left`、`bottom`、`bottom-right`、`left-top`、`left`、`left-bottom` |
| trigger            | string                     | 'click' | 触发方式，PC 端默认值为 'hover', 可选值为：点击触发`click`、鼠标经过触发`hover`、聚焦状态触发`focus`、受控触发`manual`、右键触发`contextMenu`                    |
| onVisibleChange    | (visible: boolean) => void | noop    | 显示/隐藏触发的事件                                                                                                                                              |

## CSS 变量

| 属性                      | 默认值               | 说明                   |
| :------------------------ | :------------------- | :--------------------- |
| --background              | 'rgba(0, 0, 0, 0.8)' | 背景色                 |
| --padding-horizontal      | var(--padding-h-xs)  | 横向边距               |
| --padding-vertical        | var(--padding-v-xs)  | 垂直边距               |
| --font-size               | '12px'               | 字体大小               |
| --arrow-size              | '4px'                | 箭头大小               |
| --spacing                 | '3px'                | 和目标元素的间距       |
| --arrow-horizontal-offset | '10px'               | 箭头相对内容的横向偏移 |
| --arrow-vertical-offset   | '6px'                | 箭头相对内容的纵向偏移 |
| --font-size               | '12px'               | 字体大小               |
| --z-index                 | '1700'               | 层级                   |
