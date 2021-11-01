import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { form, feedback, view, navigation } from './demos';
import { name as appName } from './app.json';
import IndexPage from './pages/IndexPage';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Zarm UI" component={IndexPage} />
        {[...form, ...feedback, ...view, ...navigation].map((component, i) => {
          return (
            <Stack.Screen key={+i} name={component.title} component={component.module.default} />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => MyStack);

export default MyStack;
