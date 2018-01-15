import React, { Component } from 'react';
import { View } from 'react-native';
import { Stepper } from '../../components/index.native';

export default class Page extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <View style={{ padding: 15 }}>
        <Stepper
          shape="radius"
          max={3}
          min={-3}
          value={this.state.value}
          onChange={value => console.log(value)}
          />
      </View>
    );
  }
}
