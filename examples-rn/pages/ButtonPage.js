import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../../components/index.native';

const mb = {
  marginBottom: 10,
};
const mr = {
  marginRight: 10,
};
const noop = () => {};

export default class App extends Component<{}> {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ ...mb, ...mr }}>default</Button>
            <Button style={mb} theme="primary">primary</Button>
          </View>

          <View style={mb}>
            <Button style={mb} onClick={noop}>default</Button>
            <Button style={mb} disabled onClick={noop}>default</Button>
            <Button style={mb} theme="primary" onClick={noop}>primary</Button>
            <Button style={mb} disabled theme="primary" onClick={noop}>primary</Button>
          </View>

          <View style={mb}>
            <Button style={mb} bordered onClick={noop}>default</Button>
            <Button style={mb} bordered disabled onClick={noop}>disabled default</Button>
            <Button style={mb} bordered theme="primary" onClick={noop}>primary</Button>
            <Button style={mb} bordered disabled theme="primary" onClick={noop}>disabled primary</Button>
          </View>

          <View style={{ flexDirection: 'row', ...mb }}>
            <Button style={{ ...mb, ...mr }} onClick={noop}>default</Button>
            <Button style={{ ...mb, ...mr }} theme="primary" onClick={noop}>primary</Button>
          </View>

          <View style={{ flexDirection: 'row', ...mb }}>
            <Button style={{ ...mb, ...mr }} size="lg" onClick={noop}>lg</Button>
            <Button style={{ ...mb, ...mr }} onClick={noop}>md</Button>
            <Button size="sm" onClick={noop}>sm</Button>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...mb }}>
            <Button style={{ ...mb, ...mr }} shape="radius" theme="primary" onClick={noop}>radius shape</Button>
            <Button style={{ ...mb, ...mr }} shape="round" theme="primary" onClick={noop}>round shape</Button>
            <Button style={{ ...mb, ...mr }} bordered shape="circle" theme="primary" onClick={noop}>Go</Button>
            <Button shape="circle" theme="primary" onClick={noop}>Go</Button>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', ...mb }}>
            <Button style={{ ...mb, ...mr }} bordered loading shape="radius" onClick={noop}>loading</Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
