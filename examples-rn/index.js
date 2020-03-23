import React from 'react';
import { YellowBox, AppRegistry, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import IndexPage from './pages/IndexPage';
import { form, feedback, view, navigation } from './demos';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const getOptions = (title) => ({
  headerTitle: (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text
        style={{
          fontSize: 16,
          alignSelf: 'center',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        {title}
      </Text>
    </View>
  ),
  headerStyle: {
    backgroundColor: '#00bc70',
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

[...form, ...feedback, ...view, ...navigation].forEach((component) => {
  scenes[component.title] = {
    screen: component.module.default,
    navigationOptions: getOptions(component.title),
  };
});

const App = createStackNavigator(scenes);

AppRegistry.registerComponent('zarm', () => App);

export default App;
