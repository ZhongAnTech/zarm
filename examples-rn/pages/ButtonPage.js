import React, { PureComponent } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Panel } from '../../components/index.native';

const styles = {
  box: {
    padding: 10,
    paddingBottom: 0,
  },
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
};

const noop = () => {};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel titleRender="基本用法">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} onClick={noop}>default</Button>
            <Button style={styles.mb} theme="primary" onClick={noop}>primary</Button>
          </View>
        </Panel>

        <Panel titleRender="块级按钮">
          <View style={[styles.box]}>
            <Button style={styles.mb} block onClick={noop}>default button</Button>
            <Button style={styles.mb} block disabled onClick={noop}>default disabled</Button>
            <Button style={styles.mb} block theme="primary" onClick={noop}>primary button</Button>
            <Button style={styles.mb} block disabled theme="primary" onClick={noop}>primary disabled</Button>
          </View>
        </Panel>

        <Panel titleRender="幽灵按钮">
          <View style={[styles.box]}>
            <Button style={styles.mb} theme="primary" ghost onClick={noop}>primary ghost</Button>
            <Button style={styles.mb} theme="primary" ghost disabled onClick={noop}>primary ghost disabled</Button>
          </View>
        </Panel>

        <Panel titleRender="按钮主题">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} onClick={noop}>default</Button>
            <Button style={[styles.mb, styles.mr]} theme="primary" onClick={noop}>primary</Button>
            <Button style={[styles.mb, styles.mr]} theme="success" onClick={noop}>success</Button>
            <Button style={[styles.mb, styles.mr]} theme="warning" onClick={noop}>warning</Button>
            <Button style={[styles.mb, styles.mr]} theme="error" onClick={noop}>error</Button>
          </View>
        </Panel>

        <Panel titleRender="按钮尺寸">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} size="lg" onClick={noop}>lg</Button>
            <Button style={[styles.mb, styles.mr]} onClick={noop}>md</Button>
            <Button style={[styles.mb, styles.mr]} size="sm" onClick={noop}>sm</Button>
            <Button style={[styles.mb, styles.mr]} size="xs" onClick={noop}>xs</Button>
          </View>
        </Panel>

        <Panel titleRender="按钮形状">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} shape="rect" theme="primary" onClick={noop}>rect</Button>
            <Button style={[styles.mb, styles.mr]} shape="radius" theme="primary" onClick={noop}>radius</Button>
            <Button style={[styles.mb, styles.mr]} shape="round" theme="primary" onClick={noop}>round</Button>
            <Button style={[styles.mb, styles.mr]} shape="circle" theme="primary" onClick={noop}>circle</Button>
            <Button ghost shape="circle" theme="primary" onClick={noop}>ghost</Button>
          </View>
        </Panel>

        <Panel titleRender="图标按钮">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} loading shape="radius" onClick={noop}>loading</Button>
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
