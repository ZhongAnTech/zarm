import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import * as React from 'react';
import { List, Panel } from 'zarm/mini';
import siteMap from '../../site';
import './index.scss';

function Index() {
  const renderDemo = () => {
    const keys = Object.keys(siteMap);
    return keys.map((key) => {
      return (
        <Panel title={`${siteMap[key].title} (${siteMap[key].components.length})`} key={key}>
          <List>
            {siteMap[key].components.map((c) => {
              return (
                <List.Item
                  hasArrow
                  key={c.key}
                  onClick={() => Taro.navigateTo({ url: c.page })}
                  title={
                    <View>
                      {c.key}
                      <Text className="zh">{c.name}</Text>
                    </View>
                  }
                />
              );
            })}
          </List>
        </Panel>
      );
    });
  };
  return (
    <View className="page">
      <View className="brand">
        <View className="brand-title">Zarm</View>
        <View className="brand-description">众安小程序组件库</View>
      </View>
      <View className="main">{renderDemo()}</View>
    </View>
  );
}

export default Index;
