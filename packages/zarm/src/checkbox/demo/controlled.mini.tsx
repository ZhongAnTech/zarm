import React, { useState } from 'react';
import { showModal } from '@tarojs/taro';
import { Checkbox, List, Panel } from 'zarm/mini';


const Demo = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    if (!e.target.checked) {
      showModal({
        content: '是否要取消选择',
        cancelText: '不取消',
        success: ({ confirm }) => {
          if (confirm) {
            setChecked(false);
          }
        },
      });
      return false;
    }
    setChecked(true);
  };

  return (
    <Panel title="取消勾选前确认">
      <List>
        <List.Item>
          <Checkbox checked={checked} onChange={onChange}>
            取消勾选前确认
          </Checkbox>
        </List.Item>
      </List>
    </Panel>
  );
};

export default Demo;
