import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { Switch } from '../../components/index.native';


const noop = () => {};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ padding: 15 }}>
          <Switch onChange={noop} />
        </View>
        <View style={{ padding: 15 }}>
          <Switch checked />
        </View>
        <View style={{ padding: 15 }}>
          <Switch disabled />
        </View>
        <View style={{ padding: 15 }}>
          <Switch disabled checked />
        </View>
      </ScrollView>
    );
  }
}
