import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/index.native';

export default class App extends Component<{}> {
  render() {
    return (
      <View>
        <Button theme="primary">Button</Button>
      </View>
    );
  }
}
