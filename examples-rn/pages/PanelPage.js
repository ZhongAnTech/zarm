import React, { PureComponent } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Panel } from '../../components/index.native';

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

const clickHandle = () => {
  alert('click more');
};

export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="标题" more={<Text style={styles.moreHeaderColor} onPress={clickHandle}>更多</Text>} />
            <Panel.Body style={styles.box}><Text style={styles.bodyColor}>内容</Text></Panel.Body>
            <Panel.Footer title="底部左侧" more="底部右侧" />
          </Panel>
        </View>
      </ScrollView>
    );
  }
}
