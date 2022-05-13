# Modal 模态框

## 基本用法

```jsx
import { useRef, useReducer } from 'react';
import { Modal, List, Button, Select } from 'zarm';

const initState = {
  normal: {
    visible: false,
  },
  hasFooter: {
    visible: false,
  },
  closable: {
    visible: false,
  },
  onlyBody: {
    visible: false,
  },
  animation: {
    visible: false,
    animationType: 'fade',
  },
  customContainer: {
    visible: false,
  },
};

const reducer = (state, action) => {
  const { type, key, animationType } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        },
      };

    case 'animation':
      return {
        ...state,
        [key]: {
          ...state[key],
          animationType,
        },
      };

    default:
  }
};

const Demo = () => {
  const myRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);

  const toggle = (key) => dispatch({ type: 'visible', key });

  return (
    <>
      <List>
        <List.Item
          title="普通"
          after={
            <Button size="xs" onClick={() => toggle('normal')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="自定义底部"
          after={
            <Button size="xs" onClick={() => toggle('hasFooter')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="遮罩层可关闭"
          after={
            <Button size="xs" onClick={() => toggle('closable')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="无头部，无底部"
          after={
            <Button size="xs" onClick={() => toggle('onlyBody')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="动画效果"
          after={
            <Button size="xs" onClick={() => toggle('animation')}>
              开启
            </Button>
          }
        >
          <Select
            value={state.animation.animationType}
            dataSource={[
              { value: 'fade', label: '淡出淡入效果' },
              { value: 'zoom', label: '缩放效果' },
              { value: 'rotate', label: '旋转效果' },
              { value: 'door', label: '开关门效果' },
              { value: 'flip', label: '翻转效果' },
              { value: 'moveUp', label: '向上移入效果' },
              { value: 'moveDown', label: '向下移入效果' },
              { value: 'moveLeft', label: '向左移入效果' },
              { value: 'moveRight', label: '向右移入效果' },
              { value: 'slideUp', label: '向上滑入效果' },
              { value: 'slideDown', label: '向下滑入效果' },
              { value: 'slideLeft', label: '向左滑入效果' },
              { value: 'slideRight', label: '向右滑入效果' },
            ]}
            itemRender={(data) => data && `${data.label}（${data.value}）`}
            displayRender={(selected) => selected.map((item) => item && item.label)}
            onOk={(selected) => {
              dispatch({
                type: 'animation',
                key: 'animation',
                animationType: selected.map((item) => item.value),
              });
            }}
          />
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => toggle('customContainer')}>
              开启
            </Button>
          }
        >
          挂载到指定 DOM 节点
        </List.Item>
      </List>

      <div id="test-div" style={{ position: 'relative', zIndex: 1 }} ref={myRef} />

      <Modal visible={state.normal.visible} title="标题" closable onClose={() => toggle('normal')}>
        模态框内容
      </Modal>

      <Modal
        title="标题"
        visible={state.hasFooter.visible}
        footer={
          <Button block shape="rect" theme="primary" onClick={() => toggle('hasFooter')}>
            确定
          </Button>
        }
      >
        模态框内容
      </Modal>

      <Modal
        visible={state.closable.visible}
        title="标题"
        maskClosable
        onClose={() => toggle('closable')}
      >
        点击遮罩层关闭
      </Modal>

      <Modal visible={state.onlyBody.visible} maskClosable onClose={() => toggle('onlyBody')}>
        无头部，无底部
      </Modal>

      <Modal
        visible={state.animation.visible}
        animationType={state.animation.animationType}
        maskClosable
        onClose={() => toggle('animation')}
      >
        <div style={{ height: 100 }}>
          当前使用的动画类型animationType：'{state.animation.animationType}'
        </div>
      </Modal>

      <Modal
        visible={state.customContainer.visible}
        maskClosable
        onClose={() => toggle('customContainer')}
        mountContainer={() => myRef.current}
      >
        挂载到指定dom节点
      </Modal>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 带操作按钮

```jsx
import { useState } from 'react';
import { Modal, List, Button } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  return (
    <>
      <List>
        <List.Item
          title="自定义操作按钮"
          after={
            <Button size="xs" onClick={toggle}>
              开启
            </Button>
          }
        />
      </List>

      <Modal
        visible={visible}
        title="标题"
        actions={[
          {
            key: 'online',
            text: '在线阅读',
            theme: 'default',
          },
          {
            key: 'download',
            text: '下载文件',
            theme: 'default',
            disabled: true,
          },
          [
            {
              key: 'cancel',
              text: '取消',
            },
            {
              key: 'delete',
              text: '删除',
              bold: true,
              theme: 'danger',
            },
          ],
        ]}
        onAction={async (action) => {
          switch (action.key) {
            case 'cancel':
              toggle();
              break;
            default:
              // 模拟异步操作
              await new Promise((resolve) => setTimeout(resolve, 3000));
              toggle();
          }
          console.log(action);
        }}
      >
        模态框内容
      </Modal>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 警告框 Alert

```jsx
import { List, Button, Modal, Toast } from 'zarm';

const Demo = () => {
  const toast = Toast.useToast();
  return (
    <List>
      <List.Item
        title="静态方法关闭"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.alert({
                className: 'test',
                title: '警告框标题',
                content: '这里是警告框的内容部分',
                onCancel: () => {
                  console.log('点击cancel');
                },
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="使用 Promise 关闭"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.alert({
                title: '警告框标题',
                content: '这里是警告框的内容部分，点击关闭按钮，将触发 Promise 关闭警告框',
                onCancel: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 3000));
                  toast.show({ content: '提交成功' });
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

## 确认框 Confirm

```jsx
import { List, Button, Modal, Toast } from 'zarm';

const Demo = () => {
  const toast = Toast.useToast();
  return (
    <List>
      <List.Item
        title="静态方法关闭"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.confirm({
                title: '确认信息',
                content: '这里是确认框的内容部分',
                onCancel: () => {
                  console.log('点击cancel');
                },
                onOk: () => {
                  console.log('点击ok');
                },
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="使用 Promise 关闭"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.confirm({
                title: '确定要删除吗？',
                content: '这里是确认框的内容部分，点击确定按钮，将触发 Promise 关闭确认框',
                onOk: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 3000));
                  toast.show({ content: '提交成功' });
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

| 属性              | 类型                                                                 | 默认值        | 说明                                                                                                                                                      |
| :---------------- | :------------------------------------------------------------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shape             | string                                                               | 'radius'      | 形状，可选值 `rect`、`radius`                                                                                                                             |
| visible           | boolean                                                              | false         | 是否显示                                                                                                                                                  |
| animationType     | string                                                               | 'fade'        | 动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number                                                               | 200           | 动画执行时间（单位：毫秒）                                                                                                                                |
| width             | string &#124; number                                                 | '70%'         | 宽度                                                                                                                                                      |
| mask              | boolean                                                              | true          | 是否展示遮罩层                                                                                                                                            |
| maskType          | string                                                               | 'normal'      | 遮罩层的类型，可选值 `transparent`, `normal`                                                                                                              |
| maskClosable      | boolean                                                              | false         | 是否点击遮罩层时关闭，需要和 onCancel 一起使用                                                                                                            |
| closable          | boolean                                                              | false         | 右上角是否显示关闭按钮，需要和 onCancel 一起使用                                                                                                          |
| onClose           | () => void                                                           | -             | maskClosable 或 closable 为 true 时，点击遮罩或者右上角关闭按钮触发的函数                                                                                 |
| title             | ReactNode                                                            | -             | 标题                                                                                                                                                      |
| footer            | ReactNode                                                            | -             | 弹窗底部内容                                                                                                                                              |
| actions           | (ModalActionProps \| ModalActionProps[])[]                           | []            | 操作按钮配置                                                                                                                                              |
| onAction          | (action: ModalActionProps, index: number) => void \| Promise\<void\> | -             | 点击操作按钮后触发的函数                                                                                                                                  |
| destroy           | boolean                                                              | true          | 弹层关闭后是否移除节点                                                                                                                                    |
| afterOpen         | () => void                                                           | -             | 模态框打开后的回调                                                                                                                                        |
| afterClose        | () => void                                                           | -             | 模态框关闭后的回调                                                                                                                                        |
| mountContainer    | HTMLElement &#124; () => HTMLElement                                 | document.body | 指定 Modal 挂载的 HTML 节点                                                                                                                               |

### ModalActionProps 操作按钮属性

| 属性     | 类型       | 默认值    | 说明                                            |
| :------- | :--------- | :-------- | :---------------------------------------------- |
| text     | ReactNode  | -         | 按钮文字                                        |
| theme    | string     | 'primary' | 按钮主题，可选值 `default`、`primary`、`danger` |
| disabled | boolean    | false     | 按钮是否禁用                                    |
| bold     | boolean    | false     | 是否加粗                                        |
| onClick  | () => void | -         | 按钮点击后触发的回调函数                        |

## 静态方法

```js
// 显示警告框，不传 onCancel 也可关闭，如需做更多操作，参考下方 Confirm 的例子
const alert = Modal.alert({
  title: '警告框标题',
  content: '这里是警告框的内容部分',
});

// 显示确认框，若关闭时需要 Promise，onOk、onCancel 均支持 Promise
const confirm = Modal.confirm({
  title: '确认框标题',
  content: '这里是确认框的内容部分，点击确定按钮，将触发 Promise 关闭确认框',
  onOk: () => {
    return fetch.get('xxx.api').then((res) => {
      if(res.code === 0) {
        return true; // 关闭弹窗
      } else {
        return false; // 阻止弹窗关闭
      }
    }).catch(...);
  }
});

```

| 属性       | 类型       | 默认值                        | 说明                                        |
| :--------- | :--------- | :---------------------------- | :------------------------------------------ |
| title      | ReactNode  | -                             | 弹出框的标题                                |
| content    | ReactNode  | -                             | 弹出框的内容                                |
| cancelText | ReactNode  | '关闭'(Alert)/'取消'(Confirm) | 取消按钮的内容                              |
| okText     | ReactNode  | '确定'                        | 确定按钮的内容                              |
| onOk       | () => void | -                             | 使用 confirm 方法时，点击“确定”后的回调函数 |
| onCancel   | () => void | -                             | 点击“关闭/取消”后的回调函数                 |

## CSS 变量

### Modal CSS 变量

| 属性                          | 类型                                | 默认值                              | 说明                 |
| :---------------------------- | :---------------------------------- | :---------------------------------- | :------------------- |
| --za-modal-background         | React.CSSProperties['background']   | 'rgb(242, 242, 242)'                | 背景色               |
| --za-modal-border-radius      | React.CSSProperties['borderRadius'] | '14px'                              | 圆角大小             |
| --za-modal-box-shadow         | React.CSSProperties['boxShadow']    | '0 7px 21px var(--za-color-shadow)' | 阴影样式             |
| --za-modal-title-font-size    | React.CSSProperties['fontSize']     | '17px'                              | 标题字体大小         |
| --za-modal-title-font-weight  | React.CSSProperties['fontWeight']   | 500                                 | 标题字体粗细         |
| --za-modal-title-text-color   | React.CSSProperties['color']        | 'var(--za-color-text)'              | 标题字体颜色         |
| --za-modal-close-size         | React.CSSProperties['fontSize']     | '20px'                              | 关闭图标字体大小     |
| --za-modal-close-color        | React.CSSProperties['color']        | '#ccc'                              | 关闭图标颜色         |
| --za-modal-close-active-color | React.CSSProperties['color']        | '#999'                              | 关闭图标激活状态颜色 |
| --za-modal-body-font-size     | React.CSSProperties['fontSize']     | '13px'                              | 内容字体大小         |
| --za-modal-body-text-color    | React.CSSProperties['color']        | 'var(--za-color-text)'              | 内容字体颜色         |
| --za-modal-body-padding       | React.CSSProperties['padding']      | '16px'                              | 内容内边距           |
| --za-modal-button-height      | React.CSSProperties['height']       | '44px'                              | 操作按钮高度         |
| --za-modal-button-font-size   | React.CSSProperties['fontSize']     | '17px'                              | 操作按钮字体大小     |
| --za-modal-button-font-weight | React.CSSProperties['fontWeight']   | 500                                 | 操作按钮字体粗细     |
| --za-modal-button-text-color  | React.CSSProperties['color']        | 'var(--za-theme-primary)'           | 操作按钮字体颜色     |
