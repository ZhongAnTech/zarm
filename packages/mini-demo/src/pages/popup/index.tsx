import React, { useRef, useState, useReducer } from 'react';
import { View } from '@tarojs/components';
import { Button, Panel, Popup, List } from 'zarm/mini';

import './index.scss'


const initVisibleState = {
  popBottom: false,
  popTop: false,
  popLeft: false,
  popRight: false,
  popCenter: false,
};

function PopupDemo() {
  const popupRef = useRef();
  const timer = useRef();
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
   <View className='page-main'>
     <Panel
       title='基本用法'
     >
      <List>
        <List.Item
          title="从底部弹出"
          suffix={
            <Button
              size="xs"
              onClick={() => toggle('popBottom') }
            >
              开启
            </Button>
          }
        />
      </List>
     </Panel>
     <Popup visible={visible.popBottom} onMaskClick={() => toggle('popBottom')}>
      <View className="popup-box">test</View>
    </Popup>
   </View>
  )
 }

 export default PopupDemo;
