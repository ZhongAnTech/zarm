import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Image, TextInput } from 'react-native';
import { Cell, Panel } from '../../components/index.native';

const styles = {
  box: {
    marginBottom: 10,
  },
  cellStyle: {
    // minHeight: 52,
  },
  iconBigStyle: {
    width: 48,
    height: 48,
    backgroundColor: '#3385ff',
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  helpTextStyle: {
    color: '#FF5050',
    fontSize: 10,
  },
};
const noop = () => {};

export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={styles.box}>
            <Panel titleRender="基本用法">
              <Cell style={styles.cellStyle} title={<Text>标题文字</Text>} />
            </Panel>
          </View>
          <View style={styles.box}>
            <Panel titleRender="带描述">
              <Cell
                style={styles.cellStyle}
                title="标题文字"
                description="描述文字"
              />
            </Panel>
          </View>
          <View style={styles.box}>
            <Panel titleRender="带图标、描述">
              <Cell
                icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
                style={styles.cellStyle}
                title={<Text>标题文字</Text>}
              />
              <Cell
                icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
                style={styles.cellStyle}
                title={<Text>标题文字</Text>}
                description={<Text>描述文字</Text>}
              />
            </Panel>
          </View>
          <View style={styles.box}>
            <Panel titleRender="带跳转">
              <Cell
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
              />
              <Cell
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
              />
            </Panel>
          </View>
          <View style={styles.box}>
            <Panel titleRender="带描述、箭头、跳转">
              <Cell
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
                description={<Text>描述文字</Text>}
                hasArrow
              />
              <Cell
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
                description={<Text>描述文字</Text>}
                hasArrow
              />
            </Panel>
          </View>
          <View style={styles.box}>
            <Panel titleRender="带图标、描述、箭头、跳转">
              <Cell
                icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
                description={<Text>描述文字</Text>}
                hasArrow
              />
              <Cell
                icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
                description={<Text>描述文字</Text>}
                hasArrow
              />
              <Cell
                icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
                style={styles.cellStyle}
                onClick={noop}
                title={<Text>标题文字</Text>}
                description={<Text>描述文字</Text>}
                hasArrow
              >
                <Text>附加提示</Text>
              </Cell>
            </Panel>
          </View>
          <View style={styles.box}>
            <Panel titleRender="提示信息">
              <Cell
                style={styles.cellStyle}
                title={<Text>标题</Text>}
                help={<View><Text style={styles.helpTextStyle}>标题不能为空</Text></View>}
              >
                <TextInput placeholder="请输入标题" />
              </Cell>
            </Panel>
          </View>
        </View>
      </ScrollView>
    );
  }
}
