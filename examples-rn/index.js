import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexPage from './pages/IndexPage';
import { UIFORM, UICONROL, UIVIEW } from './demoList';

const getOptions = title => ({
  headerTitle: (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, alignSelf: 'center', textAlign: 'center', color: '#fff' }}>{title}</Text>
    </View>
  ),
  headerStyle: {
    backgroundColor: '#12c287',
  },
  headerTintColor: 'white',
  headerRight: <View />,
});

const scenes = {
  Index: {
    screen: IndexPage,
    navigationOptions: {
      ...getOptions('Zarm UI'),
      headerLeft: <View />,
    },
  },
};

[...UIFORM, ...UICONROL, ...UIVIEW].forEach((component) => {
  scenes[component.title] = {
    screen: component.module.default,
    navigationOptions: getOptions(component.title),
  };
});

const App = StackNavigator(scenes);

AppRegistry.registerComponent('zarm', () => App);

export default App;
