import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Image, TextInput } from 'react-native';
import { Cell, Panel, Message } from '../../components/index.native';

const styles = {
  iconBigStyle: {
    width: 48,
    height: 48,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  titleStyle: {
    fontSize: 15,
    lineHeight: 24,
    color: '#464646',
  },
  descriptionStyle: {
    fontSize: 15,
    lineHeight: 24,
    color: 'grey',
  },
};
const noop = () => {};

export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <Cell title="标题文字" />
        </Panel>
        <Panel title="带描述">
          <Cell
            title="标题文字"
            description="描述文字"
          />
        </Panel>
        <Panel title="带图标、标题">
          <Cell
            icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
            title="标题文字"
          />
        </Panel>
        <Panel title="带跳转">
          <Cell
            onClick={noop}
            title="标题文字"
          />
          <Cell
            onClick={noop}
            title="标题文字"
          />
        </Panel>
        <Panel title="带描述、箭头、跳转">
          <Cell
            onClick={noop}
            title="标题文字"
            description="描述文字"
            hasArrow
          />
          <Cell
            onClick={noop}
            title="标题文字"
            description="描述文字"
            hasArrow
          />
        </Panel>
        <Panel title="带图标、描述、箭头、跳转">
          <Cell
            icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
            onClick={noop}
            title="标题文字"
            description="描述文字"
            hasArrow
          />
          <Cell
            icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
            onClick={noop}
            title="标题文字"
            description="描述文字"
            hasArrow
          />
          <Cell
            icon={<Image style={styles.iconBigStyle} source={{ uri: 'https://static.zhongan.com/website/health/zarm/images/icons/state.png' }} />}
            onClick={noop}
            title={(
              <View>
                <Text style={styles.titleStyle}>标题文字</Text>
                <Text style={styles.descriptionStyle}>描述文字</Text>
              </View>
            )}
            description="附加提示"
            hasArrow
          />
        </Panel>
        <Panel title="提示信息">
          <Cell
            title="标题"
            help={<Message theme="danger">标题不能为空</Message>}
          >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="请输入标题"
            />
          </Cell>
        </Panel>
      </ScrollView>
    );
  }
}
