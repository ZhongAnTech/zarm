# ActionSheet 动作面板

## 基本用法

```jsx
import { useState } from 'react';
import { ActionSheet, List, Button } from 'zarm';

const BUTTONS = [
  {
    text: '操作一',
    onClick: () => console.log('点击操作一'),
  },
  {
    theme: 'primary',
    text: '操作二',
    onClick: () => console.log('点击操作二'),
  },
  {
    theme: 'danger',
    text: '操作三',
    onClick: () => console.log('点击操作三'),
  },
];

const Demo = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  return (
    <>
      <List>
        <List.Item
          after={
            <Button size="xs" onClick={() => setVisible1(true)}>
              开启
            </Button>
          }
        >
          普通
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => setVisible2(true)}>
              开启
            </Button>
          }
        >
          带取消操作
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => setVisible3(true)}>
              开启
            </Button>
          }
        >
          圆角、留边
        </List.Item>
      </List>

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
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## useActionSheet

```jsx
import { useRef } from 'react';
import { ActionSheet, List, Button } from 'zarm';

const Demo = () => {
  const containerRef = useRef()
  const ac = ActionSheet.useActionSheet();


  const BUTTONS = [
    {
      text: '操作一',
      onClick: () => console.log('点击操作一'),
    },
    {
      theme: 'primary',
      text: '操作二',
      onClick: () => console.log('点击操作二'),
    },
    {
      theme: 'danger',
      text: '操作三',
      onClick: () => console.log('点击操作三'),
    },
  ];


  return (
    <List>
      <List.Item
        after={
          <Button size="xs" onClick={() => ac.show({ actions: BUTTONS, onMaskClick: ac.hide })}>
            开启
          </Button>
        }
      >
        普通
        <div id='mock'/>
      </List.Item>
      <List.Item
        after={
          <Button
            size="xs"
            onClick={() => ac.show({ actions: BUTTONS, onMaskClick: ac.hide, onCancel: ac.hide })}
          >
            开启
          </Button>
        }
      >
        带取消操作
      </List.Item>
      <List.Item
        after={
          <Button
            size="xs"
            onClick={() => ac.show({ mountContainer: containerRef.current , actions: BUTTONS, onMaskClick: ac.hide, onCancel: ac.hide })}
          >
            开启
          </Button>
        }
      >
        <div ref={containerRef}>指定挂载节点</div>
      </List.Item>
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
| safeIphoneX    | boolean                              | `false`       | 适配刘海屏 iphoneX                 |
| afterClose     | () => void                           | -             | ActionSheet 隐藏后的回调函数       |
| mountContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 ActionSheet 挂载的 HTML 节点  |

### Action 类型定义

| 属性      | 类型       | 默认值    | 说明                                            |
| :-------- | :--------- | :-------- | :---------------------------------------------- |
| text      | ReactNode  | -         | 按钮文字                                        |
| theme     | string     | 'default' | 按钮主题，可选值 `default`、`primary`、`danger` |
| className | string     | -         | 追加类名                                        |
| onClick   | () => void | -         | 按钮点击后触发的回调函数                        |
