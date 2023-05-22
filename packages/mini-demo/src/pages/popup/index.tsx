import React, { useRef, useState, useReducer } from 'react';
import { View } from '@tarojs/components';
import { Button, Panel, Popup, List } from 'zarm/mini';

import './index.scss'

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
  const timer = useRef<any>(null);
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
          suffix={
            <Button
              size="xs"
              onClick={() => {
                toggle('popTop');
                timer.current && clearTimeout(timer.current);
                timer.current = setTimeout(() => {
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
          suffix={
            <Button size="xs" onClick={() => toggle('popBottom')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="从左侧弹出"
          suffix={
            <Button size="xs" onClick={() => toggle('popLeft')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="从右侧弹出"
          suffix={
            <Button size="xs" onClick={() => toggle('popRight')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="从中间弹出"
          suffix={
            <Button size="xs" onClick={() => toggle('popCenter')}>
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
          底部
        </div>
      </Popup>


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
        onMaskClick={() => toggle('popCenter')}
        afterClose={() => console.log('关闭')}
      >
        <div className="popup-box">
          <Button size="xs" onClick={() => toggle('popCenter')}>
            关闭弹层
          </Button>
        </div>
      </Popup>


    </>
  );
};

export default Demo;
