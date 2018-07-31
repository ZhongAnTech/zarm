import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 10,
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
        <View style={{ padding: 15 }}>
          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]}>default</Button>
            <Button style={styles.mb} theme="primary">primary</Button>
          </View>

          <View style={styles.mb}>
            <Button style={styles.mb} onClick={noop}>default</Button>
            <Button style={styles.mb} disabled onClick={noop}>default</Button>
            <Button style={styles.mb} theme="primary" onClick={noop}>primary</Button>
            <Button style={styles.mb} disabled theme="primary" onClick={noop}>primary</Button>
          </View>

          <View style={styles.mb}>
            <Button style={styles.mb} bordered onClick={noop}>default</Button>
            <Button style={styles.mb} bordered disabled onClick={noop}>disabled default</Button>
            <Button style={styles.mb} bordered theme="primary" onClick={noop}>primary</Button>
            <Button style={styles.mb} bordered disabled theme="primary" onClick={noop}>disabled primary</Button>
          </View>

          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]} onClick={noop}>default</Button>
            <Button style={[styles.mb, styles.mr]} theme="primary" onClick={noop}>primary</Button>
            <Button style={[styles.mb, styles.mr]} theme="success" onClick={noop}>success</Button>
            <Button style={[styles.mb, styles.mr]} theme="warning" onClick={noop}>warning</Button>
            <Button style={[styles.mb, styles.mr]} theme="error" onClick={noop}>error</Button>
          </View>

          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]} size="lg" onClick={noop}>lg</Button>
            <Button style={[styles.mb, styles.mr]} onClick={noop}>md</Button>
            <Button size="sm" onClick={noop}>sm</Button>
          </View>

          <View style={[styles.inline, styles.mb]}>
            <Button style={[styles.mb, styles.mr]} shape="radius" theme="primary" onClick={noop}>radius shape</Button>
            <Button style={[styles.mb, styles.mr]} shape="round" theme="primary" onClick={noop}>round shape</Button>
            <Button style={[styles.mb, styles.mr]} bordered shape="circle" theme="primary" onClick={noop}>Go</Button>
            <Button shape="circle" theme="primary" onClick={noop}>Go</Button>
          </View>
          <View style={styles.inline}>
            <Button style={[styles.mb, styles.mr]} bordered loading shape="radius" onClick={noop}>loading</Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
