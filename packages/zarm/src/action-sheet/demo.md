# ActionSheet 动作面板

## 基本用法

```jsx
import { useState, useRef } from 'react';
import { ActionSheet, List, Button } from 'zarm';

const BUTTONS = [
  {
    text: 'Action 1',
    onClick: () => console.log('Clicked action 1'),
  },
  {
    theme: 'primary',
    text: 'Action 2',
    onClick: () => console.log('Clicked action 2'),
  },
  {
    theme: 'danger',
    text: 'Action 3',
    onClick: () => console.log('Clicked action 3'),
  },
  {
    disabled: true,
    text: 'Disabled Action',
    onClick: () => console.log('Clicked disabled action'),
  },
];

const Demo = () => {
  const containerRef = useRef();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

  return (
    <>
      <List>
        <List.Item
          title="普通"
          after={
            <Button size="xs" onClick={() => setVisible1(true)}>
              开启
            </Button>
          }
        />
        <List.Item
          title="带取消操作"
          after={
            <Button size="xs" onClick={() => setVisible2(true)}>
              开启
            </Button>
          }
        />
        <List.Item
          title="圆角、留边"
          after={
            <Button size="xs" onClick={() => setVisible3(true)}>
              开启
            </Button>
          }
        />
        <List.Item
          title="指定挂载节点"
          after={
            <Button size="xs" onClick={() => setVisible4(true)}>
              开启
            </Button>
          }
        />
      </List>

      <div ref={containerRef} />

      <ActionSheet
        visible={visible1}
        actions={BUTTONS}
        onMaskClick={() => setVisible1(!visible1)}
      />
      <ActionSheet
        visible={visible2}
        actions={BUTTONS}
        onMaskClick={() => setVisible2(!visible2)}
        onCancel={() => setVisible2(!visible2)}
      />
      <ActionSheet
        spacing
        visible={visible3}
        actions={BUTTONS}
        onMaskClick={() => setVisible3(!visible3)}
        onCancel={() => setVisible3(!visible3)}
      />
      <ActionSheet
        visible={visible4}
        actions={BUTTONS}
        onMaskClick={() => setVisible4(!visible4)}
        mountContainer={containerRef.current}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 静态方法

```jsx
import { ActionSheet, List, Button } from 'zarm';

const BUTTONS = [
  {
    text: 'Action 1',
    onClick: () => console.log('Clicked action 1'),
  },
  {
    theme: 'primary',
    text: 'Action 2',
    onClick: () => console.log('Clicked action 2'),
  },
  {
    theme: 'danger',
    text: 'Action 3',
    onClick: () => console.log('Clicked action 3'),
  },
  {
    disabled: true,
    text: 'Disabled Action',
    onClick: () => console.log('Clicked disabled action'),
  },
];

const Demo = () => {
  return (
    <List>
      <List.Item
        title="普通"
        after={
          <Button
            size="xs"
            onClick={() => {
              const { close } = ActionSheet.show({
                spacing: true,
                actions: BUTTONS,
                onMaskClick: () => {
                  close();
                },
                onCancel: () => {
                  close();
                },
              });
            }}
          >
            开启
          </Button>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型                                 | 默认值        | 说明                               |
| :------------- | :----------------------------------- | :------------ | :--------------------------------- |
| visible        | boolean                              | false         | 是否显示                           |
| spacing        | boolean                              | false         | 是否和外部有间距                   |
| destroy        | boolean                              | true          | 弹层关闭后是否移除节点             |
| actions        | Action[]                             | []            | 动作列表                           |
| onMaskClick    | () => void                           | -             | 点击遮罩层时触发的回调函数         |
| onCancel       | () => void                           | -             | 显示取消菜单，点击时触发的回调函数 |
| cancelText     | string                               | '取消'        | 取消菜单的文案                     |
| safeIphoneX    | boolean                              | false         | 是否适配 iphoneX 刘海屏            |
| afterClose     | () => void                           | -             | ActionSheet 隐藏后的回调函数       |
| mountContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 ActionSheet 挂载的 HTML 节点  |

### Action 类型定义

| 属性      | 类型       | 默认值    | 说明                                            |
| :-------- | :--------- | :-------- | :---------------------------------------------- |
| text      | ReactNode  | -         | 按钮文字                                        |
| theme     | string     | 'default' | 按钮主题，可选值 `default`、`primary`、`danger` |
| disabled  | boolean    | false     | 按钮是否禁用                                    |
| className | string     | -         | 追加类名                                        |
| onClick   | () => void | -         | 按钮点击后触发的回调函数                        |
