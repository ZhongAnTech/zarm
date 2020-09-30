import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

export default class Container extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <ScrollView>
        {children}
      </ScrollView>
    );
  }
}
