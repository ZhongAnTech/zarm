import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Cell, Panel } from '../../components/index.native';

const styles = {
  bodyColor: {
    color: '#333',
  },
  box: {
    flexDirection: 'column',
  },
};


export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="普通" />
            <Panel.Body style={styles.box}>
              <Cell title="标题文字" />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带描述" />
            <Panel.Body style={styles.box}>
              <Cell title="标题文字" description="描述文字" />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带图标、描述" />
            <Panel.Body style={styles.box} >
              <Cell title="标题文字" onClick={() => {}} description="描述文字" icon={<Image source={require('../../examples/images/icons/state.png')} style={{ width: 28, height: 28 }} />} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带跳转" />
            <Panel.Body style={styles.box}>
              <Cell title="标题文字" onClick={() => {}} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带描述、箭头、跳转" />
            <Panel.Body style={styles.box}>
              <Cell title="标题文字" description="描述文字" onClick={() => {}} hasArrow />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带图标、描述、箭头、跳转" />
            <Panel.Body style={styles.box}>
              <Cell hasArrow title="标题文字" description="附加提示" icon={<Image source={require('../../examples/images/icons/state.png')} style={{ width: 28, height: 28 }} />} onClick={() => {}} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="提示信息" />
            <Panel.Body style={styles.box}><Text style={styles.bodyColor}>标题文字</Text></Panel.Body>
          </Panel>
        </View>
      </ScrollView>
    );
  }
}
