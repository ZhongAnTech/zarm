# Popup 弹出框

## 基本用法

```jsx
import { useState, useReducer, useRef } from 'react';
import { Popup, List, Button, Picker, Toast } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

const initVisibleState = {
  popBottom: false,
  popTop: false,
  popLeft: false,
  popRight: false,
  picker: false,
  popSpec: false,
  popCenterSpec: false,
};

const Demo = () => {
  const popupRef = useRef();
  const [value, setValue] = useState('');
  const [visible, setVisible] = useReducer((state, action) => {
    const { type } = action;
    return {
      ...state,
      [type]: !state[type],
    };
  }, initVisibleState);

  const toggle = (type) => setVisible({ type });

  return (
    <>
      <List>
        <List.Item
          title="从上方弹出"
          after={
            <Button
              size="xs"
              onClick={() => {
                toggle('popTop');

                setTimeout(() => {
                  toggle('popTop');
                }, 3000);
              }}
            >
              开启
            </Button>
          }
        />
        <List.Item
          title="从下方弹出"
          after={
            <Button size="xs" onClick={() => toggle('popBottom')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="从左侧弹出"
          after={
            <Button size="xs" onClick={() => toggle('popLeft')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="从右侧弹出"
          after={
            <Button size="xs" onClick={() => toggle('popRight')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="从中间弹出"
          after={
            <Button size="xs" onClick={() => toggle('popCenter')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="自定义挂载节点"
          after={
            <Button size="xs" onClick={() => toggle('popSpec')}>
              开启
            </Button>
          }
        />
      </List>

      <Popup
        visible={visible.popTop}
        direction="top"
        mask={false}
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box-top">更新成功</div>
      </Popup>

      <Popup
        visible={visible.popBottom}
        direction="bottom"
        onMaskClick={() => toggle('popBottom')}
        afterOpen={() => console.log('打开')}
        afterClose={() => console.log('关闭')}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('picker')}>
            打开Picker
          </Button>
        </div>
      </Popup>

      <Picker
        visible={visible.picker}
        value={value}
        dataSource={SINGLE_DATA}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue(selected.map((item) => item.value));
          toggle('picker');
        }}
        onCancel={() => toggle('picker')}
      />

      <Popup
        visible={visible.popLeft}
        onMaskClick={() => toggle('popLeft')}
        direction="left"
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box-left">
          <Button size="xs" onClick={() => toggle('popLeft')}>
            关闭弹层
          </Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popRight}
        onMaskClick={() => toggle('popRight')}
        direction="right"
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box-right">
          <Button size="xs" onClick={() => toggle('popRight')}>
            关闭弹层
          </Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popCenter}
        direction="center"
        width="70%"
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('popCenter')}>
            关闭弹层
          </Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popCenterSpec}
        direction="center"
        width="70%"
        afterClose={() => console.log('关闭')}
        onEsc={() => {
          toggle('popCenterSpec');
        }}
        mountContainer={() => {
          return popupRef.current.popup;
        }}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('popCenterSpec')}>
            关闭弹层
          </Button>
        </div>
      </Popup>

      <Popup
        visible={visible.popSpec}
        onMaskClick={() => {
          if (visible.popCenterSpec) {
            toggle('popCenterSpec');
          }
          toggle('popSpec');
        }}
        afterClose={() => console.log('关闭')}
        onEsc={() => {
          toggle('popSpec');
        }}
        ref={popupRef}
        destroy={true}
      >
        <div className="popup-box-bottom">
          <Button size="xs" onClick={() => toggle('popCenterSpec')}>
            打开弹层
          </Button>
          <p>打开的modal挂载此popup上</p>
        </div>
      </Popup>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性              | 类型                                 | 默认值        | 说明                                                                                                                                                                                                    |
| :---------------- | :----------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| visible           | boolean                              | false         | 是否显示                                                                                                                                                                                                |
| direction         | string                               | 'bottom'      | 弹出方向，可选值 `top`, `bottom`, `left`, `right`, `center`                                                                                                                                             |
| animationType     | string                               | 'fade'        | 当弹出方向为中间位置（direction="center"）时的动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number                               | 200           | 动画执行时间（单位：毫秒）                                                                                                                                                                              |
| width             | string &#124; number                 | -             | 弹层宽度                                                                                                                                                                                                |
| mask              | boolean                              | true          | 是否展示遮罩层                                                                                                                                                                                          |
| maskType          | string                               | 'normal'      | 遮罩层的类型，可选值 `transparent`, `normal`                                                                                                                                                            |
| destroy           | boolean                              | true          | 弹层关闭后是否移除节点                                                                                                                                                                                  |
| afterOpen         | () => void                           | -             | 弹层展示后的回调                                                                                                                                                                                        |
| afterClose        | () => void                           | -             | 弹层关闭后的回调                                                                                                                                                                                        |
| onMaskClick       | () => void                           | -             | 点击遮罩层时触发的回调函数                                                                                                                                                                              |
| onEsc             | () => void                           | -             | 点击 Esc 键时触发的回调函数                                                                                                                                                                             |
| mountContainer    | HTMLElement &#124; () => HTMLElement | document.body | 指定 Popup 挂载的 HTML 节点                                                                                                                                                                             |
| lockScroll        | boolean                              | true          | 锁定背景滚动                                                                                                                                                                                            |
