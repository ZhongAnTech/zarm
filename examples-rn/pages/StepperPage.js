import React, { Component } from 'react';
import { View } from 'react-native';
import { Stepper } from '../../components/index.native';

const noop = () => {};

export default class Page extends Component<{}> {
  render() {
    return (
      <View style={{ padding: 15 }}>
        <Stepper />
      </View>
    );
  }
}
