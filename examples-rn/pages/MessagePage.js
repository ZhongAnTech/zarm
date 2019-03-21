import React, { PureComponent } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { Panel, Message } from '../../components/index.native';

const styles = {
  wrap: {
    padding: 15,
  },
  mb: {
    marginBottom: 15,
  },
};

export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <View style={styles.wrap}>
            <View style={styles.mb}>
              <Message>普通</Message>
            </View>
            <View>
              <Message theme="danger">自定义主题</Message>
            </View>
          </View>
        </Panel>

        <Panel title="可操作">
          <View style={styles.wrap}>
            <View style={styles.mb}>
              <Message theme="success" hasArrow onClick={() => Alert.alert('click this message!')}>链接样式</Message>
            </View>
            <View>
              <Message theme="warning" closable>可关闭</Message>
            </View>
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
