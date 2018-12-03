import React, { PureComponent } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { Panel, Message } from '../../components/index.native';

const styles = {
  wrap: {
    margin: 15,
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
            <Message style={styles.mb}>普通</Message>
            <Message theme="error">自定义主题</Message>
          </View>
        </Panel>

        <Panel title="可操作">
          <View style={styles.wrap}>
            <Message theme="success" hasArrow onClick={() => Alert.alert('click this message!')} style={styles.mb} >链接样式</Message>
            <Message theme="warning" closable>可关闭</Message>
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
