/**
 * Create by Yangtao. mail:yangtao@zhongan.com
 * Created on 2018/1/21.
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Popup, Button } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 10,
  },
  bottomStyle: {
    backgroundColor: '#fff',
    height: 200,
  },
  topStyle: {
    height: 40,
    alignSelf: 'center',
  },
  leftStyle: {
    backgroundColor: '#fff',
    width: 200,
  },
  rightStyle: {
    backgroundColor: '#fff',
    width: 200,
  },
};

export default class Page extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      popBottom: false,
      popTop: false,
      popLeft: false,
      popRight: false,
    };
  }
  open = (key) => {
    this.setState({
      [`${key}`]: true,
    });
  };

  close = (key) => {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 15 }}>
          <Button style={styles.mb} onClick={() => this.open('popTop')}>从上方弹出</Button>
          <Button style={styles.mb} onClick={() => this.open('popBottom')}>从下方弹出</Button>
          <Button style={styles.mb} onClick={() => this.open('popLeft')}>从左边弹出</Button>
          <Button style={styles.mb} onClick={() => this.open('popRight')}>从右边弹出</Button>
        </View>

        <Popup
          direction="top"
          mask={false}
          onMaskClick={() => this.close('popTop')}
          animationDuration={200}
          visible={this.state.popTop}
          onClose={() => console.log('关闭')}
          autoClose>
          <View style={styles.topStyle}>
            <Text style={{ color: '#fff', lineHeight: 40 }}>更新成功</Text>
          </View>
        </Popup>

        <Popup
          direction="bottom"
          visible={this.state.popBottom}
          onClose={() => console.log('关闭')}
          onMaskClick={() => this.close('popBottom')}
          style={styles.bottomStyle}>
          <Button style={[styles.mb, { width: 120, marginTop: 15 }]} onClick={() => this.close('popBottom')}>
            关闭弹层
          </Button>
        </Popup>

        <Popup
          direction="left"
          visible={this.state.popLeft}
          onMaskClick={() => this.close('popLeft')}
          style={styles.leftStyle}>
          <Button style={[styles.mb, { width: 120, marginTop: 15 }]} onClick={() => this.close('popLeft')}>
            关闭弹层
          </Button>
        </Popup>

        <Popup
          direction="right"
          visible={this.state.popRight}
          onMaskClick={() => this.close('popRight')}
          style={styles.rightStyle}>
          <Button style={[styles.mb, { width: 120, marginTop: 15 }]} onClick={() => this.close('popRight')}>
            关闭弹层
          </Button>
        </Popup>

      </View>
    );
  }
}
