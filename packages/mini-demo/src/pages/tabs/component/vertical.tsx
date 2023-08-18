import { View } from '@tarojs/components';
import React, { useState } from 'react';
import { Panel, Tabs } from 'zarm/mini';

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <Panel title="垂直">
      <Tabs value={value} onChange={setValue} direction="vertical">
        <Tabs.Panel title="选项卡1">
          <View className="vertical-content">选项卡1内容</View>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <View className="vertical-content">选项卡2内容</View>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡3">
          <View className="vertical-content">选项卡3内容</View>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡4">
          <View className="vertical-content">选项卡4内容</View>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡5">
          <View className="vertical-content">选项卡5内容</View>
        </Tabs.Panel>
      </Tabs>
    </Panel>
  );
};

export default Demo;
