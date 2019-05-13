import React, { PureComponent } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { Panel, NoticeBar } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 15,
  },
};

export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <View>
            <View style={styles.mb}>
              <NoticeBar>普通</NoticeBar>
            </View>
            <View style={styles.mb}>
              <NoticeBar theme="danger">错误色</NoticeBar>
            </View>
            <View>
              <NoticeBar scrollable>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
            </View>
          </View>
        </Panel>
        <Panel title="特定场景">
          <View>
            <View style={styles.mb}>
              <NoticeBar hasArrow onClick={() => Alert.alert('click this noticeBar!')}>链接样式的</NoticeBar>
            </View>
            <View>
              <NoticeBar closable>可关闭的</NoticeBar>
            </View>
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
