import React, { PureComponent } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Panel, NoticeBar } from '../../components/index.native';

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
          <NoticeBar style={styles.mb}>普通</NoticeBar>
          <NoticeBar style={styles.mb} theme="error">错误色</NoticeBar>
          <NoticeBar scrollable>各位zarmer请注意，本组件使用了自动滚动功能，更多用法请参见使用文档。</NoticeBar>
        </Panel>
        <Panel title="特定场景">
          <NoticeBar hasArrow onClick={() => Alert.alert('click this noticeBar!')} style={styles.mb}>链接样式的</NoticeBar>
          <NoticeBar closable>可关闭的</NoticeBar>
        </Panel>
      </ScrollView>
    );
  }
}
