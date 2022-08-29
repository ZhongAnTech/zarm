# Popper 气泡层

## 基本用法

```jsx
import { useState } from 'react';
import { List, Button, Popper, Select } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState('top');
  const [trigger, setTrigger] = useState('click');
  const [animationType, setAnimationType] = useState('zoom-fade');

  return (
    <List>
      <List.Item className="basic-demo">
        <Popper
          content="我是气泡层的内容"
          destroy={false}
          visible={visible}
          trigger={trigger}
          direction={direction}
          animationType={animationType}
          className="custom-content"
        >
          <Button
            theme="primary"
            size="xs"
            onClick={() => trigger === 'manual' && setVisible(!visible)}
          >
            点击{visible ? '隐藏' : '显示'}
          </Button>
        </Popper>
      </List.Item>
      <List.Item title="显示方向">
        <Select
          value={direction}
          dataSource={[
            { value: 'top-left', label: 'top-left' },
            { value: 'top', label: 'top' },
            { value: 'top-right', label: 'top-right' },
            { value: 'right-top', label: 'right-top' },
            { value: 'right', label: 'right' },
            { value: 'right-bottom', label: 'right-bottom' },
            { value: 'bottom-left', label: 'bottom-left' },
            { value: 'bottom', label: 'bottom' },
            { value: 'bottom-right', label: 'bottom-right' },
            { value: 'left-top', label: 'left-top' },
            { value: 'left', label: 'left' },
            { value: 'left-bottom', label: 'left-bottom' },
          ]}
          onOk={(selected) => setDirection(selected[0].value)}
        />
      </List.Item>
      <List.Item title="动画效果">
        <Select
          value={animationType}
          dataSource={[
            { value: 'zoom-fade', label: '缩放渐显(zoom-fade)' },
            { value: 'menu-slide', label: '菜单拉伸(menu-slide)' },
            { value: 'fade', label: '淡出淡入效果(fade)' },
            { value: 'zoom', label: '缩放效果(zoom)' },
            { value: 'rotate', label: '旋转效果(rotate)' },
            { value: 'door', label: '开关门效果(door)' },
            { value: 'flip', label: '翻转效果(flip)' },
            { value: 'move-up', label: '移出移入效果(move-up)' },
            { value: 'move-down', label: '移出移入效果(move-down)' },
            { value: 'move-left', label: '移出移入效果(move-left)' },
            { value: 'move-right', label: '移出移入效果(move-right)' },
            { value: 'slide-up', label: '滑出滑入效果(slide-up)' },
            { value: 'slide-down', label: '滑出滑入效果(slide-down)' },
            { value: 'slide-left', label: '滑出滑入效果(slide-left)' },
            { value: 'slide-right', label: '滑出滑入效果(slide-right)' },
          ]}
          onOk={(selected) => setAnimationType(selected[0].value)}
        />
      </List.Item>
      <List.Item title="触发方式">
        <Select
          value={trigger}
          dataSource={[
            { value: 'click', label: '点击状态触发(click)' },
            { value: 'focus', label: '聚焦状态触发(focus)' },
            { value: 'hover', label: '鼠标经过触发(hover)' },
            { value: 'manual', label: '受控触发(manual)' },
            { value: 'contextMenu', label: '右键触发(contextMenu)' },
          ]}
          onOk={(selected) => {
            setTrigger(selected[0].value);
            setVisible(false);
          }}
        />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义箭头

```jsx
import { useState } from 'react';
import { List, Button, Popper, Radio, Message } from 'zarm';
import { WarningCircle } from '@zarm-design/icons';

const Demo = () => {
  const [arrowPointAtCenter, setArrowPointAtCenter] = useState(false);

  return (
    <List>
      <List.Item
        after={
          <Radio.Group
            buttonCompact
            type="button"
            value={arrowPointAtCenter}
            onChange={setArrowPointAtCenter}
          >
            <Radio value={false}>跟随方向</Radio>
            <Radio value={true}>元素中心</Radio>
          </Radio.Group>
        }
      >
        箭头位置
      </List.Item>
      <List.Item className="direction-demo">
        <div>
          <div style={{ marginLeft: 60 }}>
            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="top-left"
              content="top-left text"
            >
              <Button size="xs">TL</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="top"
              content="top text"
            >
              <Button size="xs">Top</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="top-right"
              content="top-right text"
            >
              <Button size="xs">TR</Button>
            </Popper>
          </div>

          <div style={{ width: 60, float: 'left', clear: 'both' }}>
            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="left-top"
              content="left-top text"
            >
              <Button size="xs">LT</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="left"
              content="left text"
            >
              <Button size="xs">Left</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="left-bottom"
              content="left-bottom text"
            >
              <Button size="xs">LB</Button>
            </Popper>
          </div>

          <div style={{ width: 60, marginLeft: 60 * 4 + 20 }}>
            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="right-top"
              content="right-top text"
            >
              <Button size="xs">RT</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="right"
              content="right text"
            >
              <Button size="xs">Right</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="right-bottom"
              content="right-bottom text"
            >
              <Button size="xs">RB</Button>
            </Popper>
          </div>

          <div style={{ marginLeft: 60, clear: 'both' }}>
            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="bottom-left"
              content="bottom-left text"
            >
              <Button size="xs">BL</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="bottom"
              content="bottom text"
            >
              <Button size="xs">Bottom</Button>
            </Popper>

            <Popper
              arrowPointAtCenter={arrowPointAtCenter}
              className="custom-arrow-content"
              hasArrow
              direction="bottom-right"
              content="bottom-right text"
            >
              <Button size="xs">BR</Button>
            </Popper>
          </div>

          <Message theme="warning" icon={<WarningCircle />}>
            左右两侧显示位置不足会自动调整为反向显示
          </Message>
        </div>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性               | 类型                                 | 默认值                                 | 说明                                                                                                                                                                               |
| :----------------- | :----------------------------------- | :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className          | string                               | -                                      | 气泡层类名追加                                                                                                                                                                     |
| content            | ReactNode                            | -                                      | 显示内容                                                                                                                                                                           |
| hasArrow           | boolean                              | false                                  | 是否显示箭头节点<font color="red">（注：需要自行定义箭头样式）</font>                                                                                                              |
| destroy            | boolean                              | true                                   | 气泡层关闭后是否移除节点                                                                                                                                                           |
| mountContainer     | HTMLElement &#124; () => HTMLElement | document.body                          | 指定 Popper 挂载的 HTML 节点                                                                                                                                                       |
| animationType      | string                               | 'zoom-fade'                            | 可选值 `zoom-fade`, `menu-slide`, `fade`, `door`, `flip`, `rotate`, `zoom`,`move-up`, `move-down`, `move-left`, `move-right`,`slide-up`, `slide-down`, `slide-left`, `slide-right` |
| animationDuration  | number                               | 200                                    | 动画执行时间（单位：毫秒）                                                                                                                                                         |
| arrowPointAtCenter | boolean                              | false                                  | 箭头是否指向目标元素中心                                                                                                                                                           |
| mouseEnterDelay    | number                               | 100                                    | 鼠标移入显示气泡层的延时时间（单位：毫秒）                                                                                                                                         |
| mouseLeaveDelay    | number                               | 100                                    | 鼠标移出隐藏气泡层的延时时间（单位：毫秒）                                                                                                                                         |
| direction          | string                               | 'top'                                  | 显示方向，可选值 `top-left`、`top`、`top-right`、`right-top`、`right`、`right-bottom`、`bottom-left`、`bottom`、`bottom-right`、`left-top`、`left`、`left-bottom`                  |
| trigger            | string                               | 移动端为'click' <br /> 桌面端为'hover' | 触发方式，可选值为：`click` 点击触发状态、`hover` 鼠标经过触发、`focus` 聚焦状态触发、`manual` 受控触发、`contextMenu` 右键触发                                                    |
| visible            | boolean                              | false                                  | 是否显示，`trigger='manual'` 时有效                                                                                                                                                |
| onVisibleChange    | (visible: boolean) => void           | () => {}                               | 显示/隐藏 气泡层触发的事件                                                                                                                                                         |
|                    |
