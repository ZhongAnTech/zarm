import React, { PureComponent } from 'react';
import { ScrollView, View, Text, TouchableHighlight, Image } from 'react-native';
import { Cell } from '../../components/index.native';

const styles = {
  box: {
      marginBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  cellStyle: {
      // minHeight: 52,
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
export default class App extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={styles.box}>
            <Cell
                style={styles.cellStyle}
                title={<Text style={styles.titleTextStyle}>标题</Text>}>
                <View>
                    <Text>我是内容</Text>
                </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
                style={styles.cellStyle}
                title={<Text style={styles.titleTextStyle}>标题</Text>}
                description={<Text style={styles.descriptionTextStyle}>我是描述</Text>}>
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
                hasArrow>
                <View>
                    <Text>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</Text>
                </View>
            </Cell>
          </View>
          <View style={styles.box}>
            <Cell
                style={styles.cellStyle}
                icon={<Image style={styles.iconStyle} source={{uri: 'https://static.zhongan.com/website/open/assets/wp/new_portal/1.2.8/img/h1_i5.97dafb6.png'}}></Image>}
                title={<Text style={styles.titleTextStyle}>标题</Text>}>
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
                hasArrow>
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
                help={<View><Text style={styles.helpTextStyle}>我是help</Text></View>}>
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
