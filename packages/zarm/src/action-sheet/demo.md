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
    theme: 'default',
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
          suffix={
            <Button size="xs" onClick={() => setVisible1(true)}>
              开启
            </Button>
          }
        />
        <List.Item
          title="带取消操作"
          suffix={
            <Button size="xs" onClick={() => setVisible2(true)}>
              开启
            </Button>
          }
        />
        <List.Item
          title="圆角、留边"
          suffix={
            <Button size="xs" onClick={() => setVisible3(true)}>
              开启
            </Button>
          }
        />
        <List.Item
          title="指定挂载节点"
          suffix={
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

## 异步操作

```jsx
import { useState, useRef } from 'react';
import { ActionSheet, List, Button } from 'zarm';

const BUTTONS = [
  {
    text: 'Action 1',
  },
  {
    text: 'Action 2',
  },
  {
    theme: 'danger',
    text: 'Action 3',
  },
  {
    disabled: true,
    text: 'Disabled Action',
  },
];

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <List>
        <List.Item
          title="普通"
          suffix={
            <Button size="xs" onClick={() => setVisible(true)}>
              开启
            </Button>
          }
        />
      </List>

      <ActionSheet
        visible={visible}
        onMaskClick={() => setVisible(false)}
        actions={BUTTONS}
        onAction={async (action, index) => {
          // 模拟异步操作
          await new Promise((resolve) => setTimeout(resolve, 3000));
          console.log(action);
          setVisible(false);
        }}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 指令式

```jsx
import { ActionSheet, List, Button } from 'zarm';

const BUTTONS = [
  {
    text: 'Action 1',
    onClick: () => console.log('Clicked action 1'),
  },
  {
    theme: 'default',
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
        suffix={
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

| 属性           | 类型                                                                     | 默认值              | 说明                               |
| :------------- | :----------------------------------------------------------------------- | :------------------ | :--------------------------------- |
| visible        | boolean                                                                  | false               | 是否显示                           |
| spacing        | boolean                                                                  | false               | 是否和外部有间距                   |
| destroy        | boolean                                                                  | true                | 弹层关闭后是否移除节点             |
| actions        | Action[]                                                                 | []                  | 面板选项列表                       |
| onMaskClick    | () => void                                                               | -                   | 点击遮罩层时触发的回调函数         |
| onCancel       | () => void                                                               | -                   | 显示取消菜单，点击时触发的回调函数 |
| onAction       | (action: ActionSheetItemProps, index: number) => void \| Promise\<void\> | -                   | 点击面板选项后触发的函数           |
| cancelText     | string                                                                   | '取消'              | 取消菜单的文案                     |
| safeArea       | boolean                                                                  | false               | 是否适配安全区域                   |
| afterClose     | () => void                                                               | -                   | ActionSheet 隐藏后的回调函数       |
| mountContainer | MountContainer                                                           | () => document.body | 指定 ActionSheet 挂载的 HTML 节点  |

### ActionSheetItemProps

| 属性      | 类型       | 默认值    | 说明                                            |
| :-------- | :--------- | :-------- | :---------------------------------------------- |
| text      | ReactNode  | -         | 按钮文字                                        |
| theme     | string     | 'default' | 按钮主题，可选值 `default`、`primary`、`danger` |
| disabled  | boolean    | false     | 按钮是否禁用                                    |
| className | string     | -         | 追加类名                                        |
| onClick   | () => void | -         | 按钮点击后触发的回调函数                        |

## CSS 变量

| 属性                           | 默认值                        | 说明               |
| :----------------------------- | :---------------------------- | :----------------- |
| --background                   | '#fff'                        | 背景色             |
| --border-radius                | '14px'                        | 圆角大小           |
| --spacing-margin               | '8px'                         | 边距               |
| --item-height                  | '56px'                        | 选项高度           |
| --item-font-size               | '20px'                        | 选项字体大小       |
| --item-font-weight             | 500                           | 选项字体粗细       |
| --item-text-color              | 'var(--za-theme-primary)'     | 选项字体色         |
| --item-active-background       | 'var(--za-background-active)' | 选项选中背景       |
| --item-opacity-disabled        | 'var(--za-opacity-disabled)'  | 选项禁用不透明度   |
| --cancel-text-color            | 'var(--za-theme-primary)'     | 取消选项字体大小   |
| --cancel-margin-top            | '8px'                         | 取消选项上边距大小 |
