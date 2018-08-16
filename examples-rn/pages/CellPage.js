import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { Cell } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 10,
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};
export default class CellPage extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 15 }}>
          <View style={[styles.inline, styles.mb]}>
            <Cell title="标题">我是内容</Cell>
          </View>
          <View style={[styles.inline, styles.mb]}>
            <Cell title="标题" description="我是描述">我是内容</Cell>
          </View>
          <View style={[styles.inline, styles.mb]}>
            <Cell title="标题" description="我是描述" hasArrow>我是内容</Cell>
          </View>
        </View>
      </ScrollView>
    );
  }
}
