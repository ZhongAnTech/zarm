import { View } from '@tarojs/components';
import * as React from 'react';
import { List, Radio } from 'zarm/mini';

const Demo = () => {
  return (
    <View style={{ padding: 20 }}>
      <View>列表样式</View>
      <Radio.Group type="list">
        <Radio value="0">选项一</Radio>
        <Radio value="1">选项二</Radio>
        <Radio value="2" disabled>
          选项三（禁止选择）
        </Radio>
      </Radio.Group>
      <View>通栏样式</View>
      <List.Item>
        <Radio.Group block>
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
        </Radio.Group>
      </List.Item>
    </View>
  );
};

export default Demo;
