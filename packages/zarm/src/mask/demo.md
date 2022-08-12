# Mask 遮罩层

## 基本用法

```jsx
import { useState } from 'react';
import { List, Button, Mask, Radio } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState('black');
  const [opacity, setOpacity] = useState('normal');

  const toggle = () => setVisible(!visible);

  return (
    <>
      <List>
        <List.Item className="basic-demo">
          <Button theme="primary" size="xs" onClick={toggle}>
            点击显示
          </Button>
        </List.Item>
        <List.Item
          title="颜色"
          after={
            <Radio.Group buttonCompact type="button" value={color} onChange={setColor}>
              <Radio value="black">黑色</Radio>
              <Radio value="white">白色</Radio>
              <Radio value="transparent">透明</Radio>
            </Radio.Group>
          }
        />
        {color !== 'transparent' ? (
          <List.Item
            title="透明度"
            after={
              <Radio.Group buttonCompact type="button" value={opacity} onChange={setOpacity}>
                <Radio value="normal">普通</Radio>
                <Radio value="light">浅色</Radio>
                <Radio value="dark">深色</Radio>
              </Radio.Group>
            }
          />
        ) : null}
      </List>
      <Mask visible={visible} color={color} opacity={opacity} onClick={toggle}>
        <Button size="xs" onClick={toggle}>
          关闭遮罩
        </Button>
      </Mask>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性              | 类型                                 | 默认值        | 说明                                                                      |
| :---------------- | :----------------------------------- | :------------ | :------------------------------------------------------------------------ |
| visible           | boolean                              | false         | 是否显示                                                                  |
| color             | string                               | 'black'       | 遮罩层的颜色，可选值 `black`, `white`, `transparent`                      |
| opacity           | string \| number                     | 'normal'      | 遮罩层的透明度，可选值 `normal`, `light`, `dark`，或填写具体数值（0 ~ 1） |
| forceRender       | boolean                              | false         | 强制渲染内容                                                              |
| destroy           | boolean                              | true          | 不可见时卸载内容                                                          |
| animationDuration | number                               | -             | 动画执行时间（单位：毫秒）                                                |
| mountContainer    | HTMLElement &#124; () => HTMLElement | document.body | 指定 Mask 挂载的 HTML 节点                                               |
| onClick           | MouseEventHandler<HTMLDivElement\>   | -             | 点击后触发的回调函数                                                      |

## CSS 变量

| 属性     | 默认值                  | 说明       |
| :------- | :---------------------- | :--------- |
| --zindex | 'var(--za-zindex-mask)' | 遮罩层层级 |
