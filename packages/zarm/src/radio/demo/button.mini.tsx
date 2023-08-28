import { View } from '@tarojs/components';
import * as React from 'react';
import { List, Radio } from 'zarm/mini';

const Demo = () => {
  return (
    <View style={{ padding: 20 }}>
      <View>按钮样式</View>
      <List.Item title="普通">
        <Radio.Group type="button">
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
          <Radio value="2">选项三</Radio>
        </Radio.Group>
      </List.Item>
      <List.Item title="禁用">
        <Radio.Group type="button" disabled>
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
          <Radio value="2">选项三</Radio>
        </Radio.Group>
      </List.Item>
      <List.Item title="通栏">
        <Radio.Group type="button" block>
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
          <Radio value="2">选项三</Radio>
        </Radio.Group>
      </List.Item>
      <List.Item title="紧凑">
        <Radio.Group type="button" compact>
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
          <Radio value="2">选项三</Radio>
        </Radio.Group>
      </List.Item>
    </View>
  );
};

export default Demo;
