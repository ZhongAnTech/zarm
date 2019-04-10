import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Panel } from '../../components/index.native';

const styles = {
  box: {
    padding: 10,
    paddingBottom: 0,
  },
  bg_dark: {
    backgroundColor: '#000',
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
    alignItems: 'center',
  },
};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]}>default</Button>
            <Button style={styles.mb} theme="primary">primary</Button>
          </View>
        </Panel>

        <Panel title="块级按钮">
          <View style={[styles.box]}>
            <Button style={styles.mb} block>default</Button>
            <Button style={styles.mb} block disabled>default disabled</Button>
            <Button style={styles.mb} block theme="primary">primary</Button>
            <Button style={styles.mb} block disabled theme="primary">primary disabled</Button>
          </View>
        </Panel>

        <Panel title="按钮主题">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]}>default</Button>
            <Button style={[styles.mb, styles.mr]} theme="primary">primary</Button>
            <Button style={[styles.mb, styles.mr]} theme="danger">danger</Button>
          </View>
        </Panel>

        <Panel title="按钮尺寸">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} size="lg">lg</Button>
            <Button style={[styles.mb, styles.mr]}>md</Button>
            <Button style={[styles.mb, styles.mr]} size="sm">sm</Button>
            <Button style={[styles.mb, styles.mr]} size="xs">xs</Button>
          </View>
        </Panel>

        <Panel title="按钮形状">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} shape="rect" theme="primary">rect</Button>
            <Button style={[styles.mb, styles.mr]} theme="primary">radius</Button>
            <Button style={[styles.mb, styles.mr]} shape="round" theme="primary">round</Button>
            <Button style={[styles.mb, styles.mr]} shape="circle" theme="primary">circle</Button>
            <Button style={[styles.mb, styles.mr]} shape="circle">icon</Button>
          </View>
        </Panel>

        <Panel title="图标按钮">
          <View style={[styles.box, styles.inline]}>
            <Button style={[styles.mb, styles.mr]} loading>loading</Button>
          </View>
        </Panel>

        <Panel title="幽灵按钮">
          <View style={[styles.box, styles.bg_dark]}>
            <Button style={[styles.mb, styles.mr]} ghost>default</Button>
            <Button style={[styles.mb, styles.mr]} ghost theme="primary">primary</Button>
            <Button style={[styles.mb, styles.mr]} ghost theme="danger">danger</Button>
            <Button style={[styles.mb, styles.mr]} ghost disabled>disabled</Button>
          </View>
        </Panel>
      </ScrollView>
    );
  }
}
