import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Image, TextInput } from 'react-native';
import { Cell, Panel } from '../../components/index.native';

const state = require('../../examples/images/icons/state.png');
const selected = require('../../examples/images/icons/selected.png');
const info = require('../../examples/images/icons/info.png');

const styles = {
  bodyColor: {
    color: '#333',
  },
  box: {
    flexDirection: 'column',
    overflow: 'scroll',
  },
  boxTitle: {
    height: 38,
  },
  boxFirTitle: {
    width: '100%',
    height: 21,
  },
  boxSubTitle: {
    width: '100%',
    fontSize: 12,
    height: 17,
    color: 'gray',
  },
  messageBox: {
    backgroundColor: 'rgba(229,85,70,.1)',
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  messageText: {
    color: '#e55546',
    fontSize: 12,
    marginLeft: 5,
  },
};
const rctDomTitle = <View style={styles.boxTitle}><Text style={styles.boxFirTitle}>标题文字</Text><Text style={styles.boxSubTitle}>描述文字</Text></View>;

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
              <Cell title="标题文字" description={<Image source={selected} style={{ width: 24, height: 24 }} />} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带图标、描述" />
            <Panel.Body style={styles.box} >
              <Cell title="标题文字" onClick={() => {}} description="描述文字" icon={<Image source={selected} style={{ width: 24, height: 24 }} />} />
              <Cell title="标题文字" onClick={() => {}} description="描述文字" icon={<Image source={state} style={{ width: 28, height: 28 }} />} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带跳转" />
            <Panel.Body style={styles.box}>
              <Cell title="标题文字" onClick={() => {}} />
              <Cell title="标题文字" onClick={() => {}} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带描述、箭头、跳转" />
            <Panel.Body style={styles.box}>
              <Cell title="标题文字" description="描述文字" onClick={() => {}} hasArrow />
              <Cell title="标题文字" description="描述文字" onClick={() => {}} hasArrow />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="带图标、描述、箭头、跳转" />
            <Panel.Body style={styles.box}>
              <Cell hasArrow title="标题文字" description="描述文字" icon={<Image source={selected} style={{ width: 24, height: 24 }} />} onClick={() => {}} />
              <Cell hasArrow title="标题文字" description="描述文字" icon={<Image source={state} style={{ width: 28, height: 28 }} />} onClick={() => {}} />
              <Cell hasArrow title={rctDomTitle} description="附加提示" icon={<Image source={state} style={{ width: 28, height: 28 }} />} onClick={() => {}} />
            </Panel.Body>
          </Panel>
          <Panel style={{ marginBottom: 10 }}>
            <Panel.Header title="提示信息" />
            <Panel.Body style={styles.box}>
              <Cell title="标题" help={<View style={styles.messageBox}><Image source={info} style={{ width: 16, height: 16 }} /><Text style={styles.messageText}>标题不能为空</Text></View>}>
                <TextInput style={{ height: 40 }} placeholder="请输入标题" />
              </Cell>
            </Panel.Body>
          </Panel>
        </View>
      </ScrollView>
    );
  }
}
