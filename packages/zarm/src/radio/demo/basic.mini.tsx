import { View } from '@tarojs/components';
import * as React from 'react';
import { List, Radio } from 'zarm/mini';

const Demo = () => {
  return (
    <View style={{ padding: 20 }}>
      <View>基本用法</View>
      <List>
        <List.Item>
          <Radio>普通</Radio>
        </List.Item>
        <List.Item>
          <Radio defaultChecked>默认选中</Radio>
        </List.Item>
        <List.Item>
          <Radio disabled>禁用</Radio>
        </List.Item>
        <List.Item>
          <Radio defaultChecked disabled>
            选中且禁用
          </Radio>
        </List.Item>
      </List>
    </View>
  );
};

export default Demo;
