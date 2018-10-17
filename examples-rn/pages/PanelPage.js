import React, {PureComponent} from 'react';
import {ScrollView,StyleSheet,View, Text} from 'react-native';
import {Panel,Cell} from '../../components/index.native';

const styles = {
  moreHeaderColor: {
    color: '#12c287',
  },
  box: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  bodyColor: {
    color: '#333',
  },
  titleTextStyle: {
    color: '#464646',
    fontSize: 15,
  }
};

const clickHandle = () => {
  alert('click more');
};

export default class App extends PureComponent {
  render() {
    return (
      <View>
        <Panel
          titleRender="标题"
          moreRender={
            <Text style={styles.moreHeaderColor} onPress={clickHandle}>更多</Text>
          }
        >
          <View style={styles.box}>
            <Text style={styles.bodyColor}>内容</Text>
          </View>
        </Panel>
        <Panel
          titleRender="普通标题"
          moreRender={
            <Text style={styles.moreHeaderColor}>更多</Text>
          }
        >
          <View style={styles.box}>
            <Text style={styles.bodyColor}>普通内容</Text>
          </View>
          <Cell
            title={<Text style={styles.titleTextStyle}>左侧文案</Text>}
          >
            <View>
              <Text>右侧文案</Text>
            </View>
          </Cell>
        </Panel>
      </View>
    );
  }
}
