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
          title="有底部按钮"
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
              { value: 'fade', label: '淡出淡入效果(fade)' },
              { value: 'zoom', label: '缩放效果(zoom)' },
              { value: 'rotate', label: '旋转效果(rotate)' },
              { value: 'door', label: '开关门效果(door)' },
              { value: 'flip', label: '翻转效果(flip)' },
              { value: 'moveUp', label: '移出移入效果(moveUp)' },
              { value: 'moveDown', label: '移出移入效果(moveDown)' },
              { value: 'moveLeft', label: '移出移入效果(moveLeft)' },
              { value: 'moveRight', label: '移出移入效果(moveRight)' },
              { value: 'slideUp', label: '滑出滑入效果(slideUp)' },
              { value: 'slideDown', label: '滑出滑入效果(slideDown)' },
              { value: 'slideLeft', label: '滑出滑入效果(slideLeft)' },
              { value: 'slideRight', label: '滑出滑入效果(slideRight)' },
            ]}
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
          挂载到指定dom节点
        </List.Item>
      </List>

      <div id="test-div" style={{ position: 'relative', zIndex: 1 }} ref={myRef} />

      <Modal visible={state.normal.visible} title="标题" closable onCancel={() => toggle('normal')}>
        模态框内容
      </Modal>

      <Modal
        title="标题"
        visible={state.hasFooter.visible}
        footer={
          <Button block theme="primary" onClick={() => toggle('hasFooter')}>
            确认
          </Button>
        }
      >
        <p>模态框内容</p>
      </Modal>

      <Modal
        visible={state.closable.visible}
        title="标题"
        maskClosable
        onCancel={() => toggle('closable')}
      >
        点击遮罩层关闭
      </Modal>

      <Modal visible={state.onlyBody.visible} maskClosable onCancel={() => toggle('onlyBody')}>
        无头部，无底部
      </Modal>

      <Modal
        visible={state.animation.visible}
        animationType={state.animation.animationType}
        maskClosable
        onCancel={() => toggle('animation')}
      >
        <div style={{ height: 100 }}>
          当前使用的动画类型animationType：'{state.animation.animationType}'
        </div>
      </Modal>

      <Modal
        visible={state.customContainer.visible}
        maskClosable
        onCancel={() => toggle('customContainer')}
        mountContainer={() => myRef.current}
      >
        挂载到指定dom节点
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
        title="静态调用（静态关闭）"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.alert({
                className: 'test',
                title: '静态调用的title',
                content: '静态调用的body',
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="静态调用（使用promise关闭）"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.alert({
                title: '静态调用的title',
                content: '静态调用的body，使用promise关闭',
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
        title="静态调用（静态关闭）"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.confirm({
                title: '确认信息',
                content: '静态调用的body',
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
        title="静态调用（使用promise关闭）"
        after={
          <Button
            size="xs"
            onClick={() => {
              const modal = Modal.confirm({
                title: '静态调用的title',
                content: '静态调用的body，使用promise关闭',
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

| 属性              | 类型                                 | 默认值        | 说明                                                                                                                                                      |
| :---------------- | :----------------------------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shape             | string                               | 'radius'      | 形状，可选值 `rect`、`radius`                                                                                                                             |
| visible           | boolean                              | false         | 是否显示                                                                                                                                                  |
| animationType     | string                               | 'fade'        | 动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number                               | 200           | 动画执行时间（单位：毫秒）                                                                                                                                |
| width             | string &#124; number                 | '70%'         | 宽度                                                                                                                                                      |
| mask              | boolean                              | true          | 是否展示遮罩层                                                                                                                                            |
| maskType          | string                               | 'normal'      | 遮罩层的类型，可选值 `transparent`, `normal`                                                                                                              |
| maskClosable      | boolean                              | false         | 是否点击遮罩层时关闭，需要和 onCancel 一起使用                                                                                                            |
| closable          | boolean                              | false         | 右上角是否显示关闭按钮，需要和 onCancel 一起使用                                                                                                          |
| onCancel          | () => void                           | -             | 如果 maskClosable 或 closable 为 true，那么点击遮罩或者右上角关闭按钮会调用此函数                                                                         |
| title             | ReactNode                            | -             | 标题                                                                                                                                                      |
| footer            | ReactNode                            | -             | 弹窗底部内容                                                                                                                                              |
| destroy           | boolean                              | true          | 弹层关闭后是否移除节点                                                                                                                                    |
| afterOpen         | () => void                           | -             | 模态框打开后的回调                                                                                                                                        |
| afterClose        | () => void                           | -             | 模态框关闭后的回调                                                                                                                                        |
| mountContainer    | HTMLElement &#124; () => HTMLElement | document.body | 指定 Modal 挂载的 HTML 节点                                                                                                                               |

## 静态方法

```js
// 显示警告框，不传onCancel也可关闭，如需做更多操作，参考下方confirm的例子
const alert = Modal.alert({
  title: '静态调用的title',
  content: '静态调用的body',
});

// 显示确认框，若关闭时需要promise，onOk、onCancel均支持promise
const confirm = Modal.confirm({
  title: '静态调用的title',
  content: '静态调用的body，使用promise关闭',
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

| 属性       | 类型       | 默认值                        | 说明                            |
| :--------- | :--------- | :---------------------------- | :------------------------------ |
| title      | ReactNode  | -                             | 弹出框的标题                    |
| content    | ReactNode  | -                             | 弹出框的内容                    |
| cancelText | ReactNode  | '关闭'(Alert)/'取消'(Confirm) | 取消按钮的内容                  |
| okText     | ReactNode  | '确认'                        | 确认按钮的内容                  |
| onOk       | () => void | -                             | 点击“确认”后的回调函数(Confirm) |
| onCancel   | () => void | -                             | 点击“关闭/取消”后的回调函数     |
