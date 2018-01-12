import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../../components/index.native';

export default class App extends Component<{}> {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Button style={{ marginBottom: 10 }}>Button</Button>
          <Button disabled style={{ marginBottom: 10 }}>Button</Button>

          <Button style={{ marginBottom: 10 }} theme="primary" shape="radius" onClick={() => console.log(1)}>Button</Button>
          <Button style={{ marginBottom: 10 }} theme="primary" shape="round" onClick={() => console.log(1)}>Button</Button>
          <Button style={{ marginBottom: 10 }} theme="primary" shape="circle" onClick={() => console.log(1)}>GO</Button>

          <Button style={{ marginBottom: 10 }} bordered onClick={() => console.log(1)}>Button</Button>
          <Button style={{ marginBottom: 10 }} theme="primary" bordered onClick={() => console.log(1)}>Button</Button>

          <Button style={{ marginBottom: 10 }} size="sm" onClick={() => console.log(1)}>Button</Button>
          <Button style={{ marginBottom: 10 }} onClick={() => console.log(1)}>Button</Button>
          <Button size="lg" onClick={() => console.log(1)}>Button</Button>
        </View>
      </ScrollView>
    );
  }
}
