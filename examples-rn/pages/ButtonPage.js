import React, { PureComponent } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Badge } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 10,
  },
  title: {
    color: 'gray',
    paddingLeft: 0,
    display: 'flex',
    height: 50,
    lineHeight: 50,
    fontSize: 16,
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  customContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  customLeft: {
    flex: 1,
    alignItems: 'center',
  },
  customRight: {
    width: 80,
  },
  customText: {
    color: 'white',
    fontSize: 16,
  },
};

const noop = () => {};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={styles.title}>块级按钮</Text>
          <View style={styles.mb}>
            <Button style={styles.mb} theme="primary" onClick={noop}>primary</Button>
            <Button style={styles.mb} theme="success" onClick={noop}>success</Button>
            <Button style={styles.mb} theme="warning" onClick={noop}>warning</Button>
            <Button style={styles.mb} theme="error" onClick={noop}>error</Button>
            <Button style={styles.mb} disabled theme="primary" onClick={noop}>disabled primary</Button>
          </View>

          <Text style={styles.title}>幽灵按键</Text>
          <View style={styles.mb}>
            <Button style={styles.mb} ghost theme="primary" onClick={noop}>primary</Button>
            <Button style={styles.mb} ghost theme="success" onClick={noop}>success</Button>
            <Button style={styles.mb} ghost theme="warning" onClick={noop}>warning</Button>
            <Button style={styles.mb} ghost theme="error" onClick={noop}>error</Button>
            <Button style={styles.mb} ghost disabled onClick={noop}>disabled ghost</Button>
          </View>

          <Text style={styles.title}>行内按钮</Text>
          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]} theme="primary" onClick={noop}>primary</Button>
            <Button style={[styles.mb, styles.mr]} theme="success" onClick={noop}>success</Button>
            <Button style={[styles.mb, styles.mr]} theme="warning" onClick={noop}>warning</Button>
            <Button style={[styles.mb, styles.mr]} theme="error" onClick={noop}>error</Button>
          </View>

          <Text style={styles.title}>按钮尺寸</Text>
          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]} size="lg" onClick={noop}>lg</Button>
            <Button style={[styles.mb, styles.mr]} onClick={noop}>md</Button>
            <Button style={[styles.mb, styles.mr]} size="sm" onClick={noop}>sm</Button>
            <Button style={[styles.mb, styles.mr]} size="xs" onClick={noop}>xs</Button>
          </View>

          <Text style={styles.title}>按钮形状</Text>
          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]} shape="radius" theme="primary" onClick={noop}>radius shape</Button>
            <Button style={[styles.mb, styles.mr]} shape="round" theme="primary" onClick={noop}>round shape</Button>
            <Button style={[styles.mb, styles.mr]} ghost shape="circle" theme="primary" onClick={noop}>Go</Button>
            <Button shape="circle" theme="primary" onClick={noop}>Go</Button>
          </View>

          <Text style={styles.title}>loading按钮</Text>
          <View style={styles.inline}>
            <Button style={[styles.mb, styles.mr]} ghost loading shape="radius" onClick={noop}>loading</Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
