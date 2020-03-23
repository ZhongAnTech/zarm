import React, { PureComponent } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Panel } from '../../components/index.native';

const styles = {
  moreHeaderColor: {
    color: '#00bc70',
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
};

const clickHandle = () => {
  alert('click more');
};

export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View>
          <Panel
            title="标题"
            more={
              <Text style={styles.moreHeaderColor} onPress={clickHandle}>更多</Text>
            }
          >
            <View style={styles.box}>
              <Text style={styles.bodyColor}>内容</Text>
            </View>
          </Panel>
        </View>
      </ScrollView>
    );
  }
}
