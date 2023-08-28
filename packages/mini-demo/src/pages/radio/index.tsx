import { View } from '@tarojs/components';
import * as React from 'react';
import { List, Radio } from 'zarm/mini';
import './index.scss';

const Demo = () => {
  const [value, setValue] = React.useState([]);

  const onChange = (value) => {
    console.log('onChange', value);
    setValue(value);
  };

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
