import React, { PureComponent } from 'react';
import { View, Text, Alert } from 'react-native';
import { SwipeAction, Button } from '../../components/index.native';

const noop = () => {};
const showWarning = () => {
  Alert.alert(
    '提示',
    '确定删除吗？',
    [
      { text: '确定', onPress: () => console.log('OK Pressed') },
      { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    ],
    { cancelable: false },
  );
};

const styles = {
  container: {
    // flex: 1,
  },
  wrapper: {
    paddingTop: 10,
  },
  text: {
    lineHeight: 45,
    paddingLeft: 20,
  },
};

export default class Page extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <SwipeAction
            right={[
              <Button shape="rect" theme="primary" onClick={noop}>标记未读</Button>,
              <Button shape="rect" theme="danger" onClick={showWarning}>删除</Button>,
            ]}
          >
            <Text style={styles.text}>左滑看看</Text>
          </SwipeAction>
        </View>

        <View style={styles.wrapper}>
          <SwipeAction
            left={[
              <Button shape="rect" theme="primary" onClick={noop}>标记未读</Button>,
              <Button shape="rect" theme="danger" onClick={showWarning}>删除</Button>,
            ]}
          >
            <Text style={styles.text}>右滑看看</Text>
          </SwipeAction>
        </View>

        <View style={styles.wrapper}>
          <SwipeAction
            autoClose
            left={[
              <Button shape="rect" theme="primary" onClick={noop}>标记未读</Button>,
            ]}
            right={[
              <Button shape="rect" theme="danger" onClick={showWarning}>删除</Button>,
            ]}
          >
            <Text style={styles.text}>左右都能滑动（自动关闭）</Text>
          </SwipeAction>
        </View>
      </View>
    );
  }
}
