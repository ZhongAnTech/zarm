import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IndexPage from './pages/IndexPage';
import { UIFORM, UICONROL, UIVIEW } from './demoList';

const getOptions = title => ({
  title,
  headerStyle: {
    backgroundColor: '#12c287',
  },
  headerTintColor: 'white',
});

const scenes = {
  Index: {
    screen: IndexPage,
    navigationOptions: getOptions('Zarm UI - 众安科技移动端组件库'),
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
