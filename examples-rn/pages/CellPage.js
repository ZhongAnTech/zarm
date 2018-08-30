import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Cell } from '../../components/index.native';

const styles = {
  box: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
    backgroundColor: '#3385ff',
  },
  titleTextStyle: {
    color: '#464646',
    fontSize: 15,
  },
  descriptionTextStyle: {
    color: '#909090',
    fontSize: 15,
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
            <Cell
              style={styles.cellStyle}
              onClick={noop}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
            >
              <View>
                <Text>超链接</Text>
              </View>
            </Cell>
            <Cell
              style={styles.cellStyle}
              onClick={noop}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
            >
              <View>
                <Text>超链接</Text>
              </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
              icon={<Image style={styles.iconBigStyle} source={{ uri: 'https://static.zhongan.com/website/open/assets/wp/new_portal/1.2.8/img/h1_i5.97dafb6.png' }} />}
              style={styles.cellStyle}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
              description={<Text style={styles.descriptionTextStyle}>我是描述</Text>}
            >
              <View>
                <Text>我是内容</Text>
              </View>
            </Cell>
            <Cell
              icon={<Image style={styles.iconBigStyle} source={{ uri: 'https://static.zhongan.com/website/open/assets/wp/new_portal/1.2.8/img/h1_i5.97dafb6.png' }} />}
              style={styles.cellStyle}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
              description={<Text style={styles.descriptionTextStyle}>我是描述</Text>}
            >
              <View>
                <Text>我是内容</Text>
              </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
              style={styles.cellStyle}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
              description={<Text style={styles.descriptionTextStyle}>我是描述</Text>}
              hasArrow
            >
              <View>
                <Text>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</Text>
              </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
              style={styles.cellStyle}
              onClick={noop}
              icon={<Image style={styles.iconStyle} source={{ uri: 'https://static.zhongan.com/website/open/assets/wp/new_portal/1.2.8/img/h1_i5.97dafb6.png' }} />}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
            >
              <View>
                <Text>我是内容</Text>
              </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
              style={styles.cellStyle}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
              description={<Text style={styles.descriptionTextStyle}>我是描述</Text>}
              hasArrow
            >
              <View>
                <Text>我是内容</Text>
              </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
              onClick={noop}
              style={styles.cellStyle}
              title={<Text style={styles.titleTextStyle}>标题</Text>}
              description={<Text style={styles.descriptionTextStyle}>我是描述</Text>}
              hasArrow
              help={<View><Text style={styles.helpTextStyle}>我是help</Text></View>}
            >
              <View>
                <Text>我是内容</Text>
              </View>
            </Cell>
          </View>
        </View>
      </ScrollView>
    );
  }
}
