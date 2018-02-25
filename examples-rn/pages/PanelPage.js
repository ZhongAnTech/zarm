import React, { Component } from 'react';
import { ScrollView, View, Alert, StyleSheet } from 'react-native';
import { Panel } from '../../components/index.native';
import { Text } from 'react-native';

const styles = {
  moreHeaderColor: {
    color: '#12c287',
  },
  moreFooterColor: {
    color: '#999999',
    fontSize: 12,
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


export default class App extends Component<{}> {
  clickHandle() {
    Alert.alert(
      null,
      'click more',
      [
        { text: '确定', onPress: () => console.log('OK Pressed!') },
      ]
      // { cancelable: false }
    );
  }
  render() {
    return (
      <ScrollView>
        <View>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="标题" more={<Text style={styles.moreHeaderColor} onPress={this.clickHandle}>更多</Text>}></Panel.Header>
            <Panel.Body style={styles.box}><Text style={styles.bodyColor}>内容</Text></Panel.Body>
            <Panel.Footer title="底部左侧" more="底部右侧"></Panel.Footer>
          </Panel>
        </View>
      </ScrollView>
    );
  }
}
