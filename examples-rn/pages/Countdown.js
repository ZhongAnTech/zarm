import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import {
  Countdown,
  Button,
  Panel,
} from '../../components/index.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownWrapper: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#0f9d6d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 45,
  },
  countdownTextStyle: {
    color: '#0f9d6d',
  },
  box: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
});


export default class CountdownPage extends React.Component {

  state = {
    isTiming: false,
    isTiming2: false,
  };

  handleCountdown = (type) => {
    const state = this.state[type];

    this.setState({
      [type]: !state,
    });
  }

  render() {
    const {
      isTiming,
      isTiming2,
    } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="倒计时示例（24h）" />
            <Panel.Body style={styles.box}>
              {
                (() => {
                  if (isTiming) {
                    return (
                      <Countdown style={styles.countdownWrapper} textStyle={styles.countdownTextStyle} />
                    );
                  }

                  return (
                    <Button
                      onClick={() => this.handleCountdown('isTiming')}
                      theme="primary"
                    >
                      点击开始倒计时
                    </Button>
                  );
                })()
              }
            </Panel.Body>
          </Panel>

          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="发送验证码示例（60s 后可以重新发送）：" />
            <Panel.Body style={styles.box}>
              {
                (() => {
                  if (isTiming2) {
                    return (
                      <Countdown
                        style={styles.countdownWrapper}
                        textStyle={styles.countdownTextStyle}
                        initialTimeRemaining={60000}
                        onFormatFunc={(milliseconds) => {
                          return `${Math.round(milliseconds / 1000)}秒后重发`;
                        }}
                        onCompleteCallback={() => {
                          this.setState({ isTiming2: false });
                        }}
                      />
                    );
                  }

                  return (
                    <Button
                      onClick={() => this.handleCountdown('isTiming2')}
                      theme="primary"
                    >
                      发送验证码
                    </Button>
                  );
                })()
              }
            </Panel.Body>
          </Panel>
        </View>
      </ScrollView>
    );
  }

}
