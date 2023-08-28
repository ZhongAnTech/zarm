import { View } from '@tarojs/components';
import * as React from 'react';
import { List, Radio } from 'zarm/mini';

const Demo = () => {
  const [value, setValue] = React.useState([]);

  const onChange = (val) => {
    console.log('onChange', val);
    setValue(val);
  };

  return (
    <View style={{ padding: 20 }}>
      <View>组合使用</View>
      <List>
        <List.Item>
          <Radio.Group value={value} onChange={onChange}>
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        </List.Item>
      </List>
    </View>
  );
};

export default Demo;
