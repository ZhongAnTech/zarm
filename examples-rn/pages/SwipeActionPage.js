import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { SwipeAction, Button } from '../../components/index.native';

const noop = () => {};

const styles = {
  container: {
    flex: 1,
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
              <Button theme="primary" onClick={noop}>primary</Button>,
              <Button theme="error" onClick={noop}>error</Button>,
            ]}>
            <Text style={styles.text}>左滑看看</Text>
          </SwipeAction>
        </View>

        <View style={styles.wrapper}>
          <SwipeAction
            left={[
              <Button theme="primary" onClick={noop}>primary</Button>,
              <Button theme="error" onClick={noop}>error</Button>,
            ]}>
            <Text style={styles.text}>右滑看看</Text>
          </SwipeAction>
        </View>

        <View style={styles.wrapper}>
          <SwipeAction
            autoClose
            left={[
              <Button theme="primary" onClick={noop}>primary</Button>,
            ]}
            right={[
              <Button theme="error" onClick={noop}>error</Button>,
            ]}>
            <Text style={styles.text}>左右都能滑动（自动关闭）</Text>
          </SwipeAction>
        </View>
      </View>
    );
  }
}
