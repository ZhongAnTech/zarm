import React, { useState, useRef } from 'react';
import { List, Checkbox, Panel } from 'zarm/mini';
import { Success } from '@zarm-design/icons';
import { View } from '@tarojs/components';

/* order: 6 */

const items = ['选项一', '选项二', '选项三'];

const Demo = () => {
  const [value, setValue] = useState(['0']);

  const onChange = (v) => {
    console.log('onChange', v);
    setValue(v);
  };

  const CustomCheckbox = (props) => {
    return (
      <Checkbox
        value={props.value}
      >
        {({ checked }) => (
          <View
            style={{
              position: 'relative',
              padding: '4px 8px',
              fontSize: 14,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: checked ? 'var(--za-theme-primary)' : 'var(--za-theme-default)',
            }}
          >
            <View
              style={{
                display: checked ? 'inline-block' : 'none',
                position: 'absolute',
                right: 0,
                top: 0,
                fontSize: 0,
              }}
            >
              <Success style={{ fontSize: 10 }} theme="primary" />
            </View>
            {props.label}
          </View>
      )}
    </Checkbox>
    );
  };
  return (
    <Panel title="自定义">
      <List>
        <List.Item>
          <Checkbox.Group
            value={value}
            onChange={onChange}
            style={{
              '--group-spacing-horizontal': '8px',
              '--group-spacing-vertical': '6px',
            }}
          >
            {items.map((item, index) => (
              <CustomCheckbox key={+index} value={String(index)} label={item} />
            ))}
          </Checkbox.Group>
        </List.Item>
      </List>
    </Panel>
  );
};

export default Demo;
