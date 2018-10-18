import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Panel, Badge, Cell } from '../../components/index.native';
import Footer from '../components/Footer';

const styles = {
  mb: {
    marginBottom: 10,
  },

  mr: {
    marginRight: 25,
  },

  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },

  supContent: {
    paddingTop: 25,
  },
  supBox: {
    width: '25%',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supItem: {
    width: 24,
    height: 24,
    backgroundColor: '#ddd',
  },

  textContent: {
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  textItem: {
    paddingRight: 10,
  },
};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <Cell hasArrow title={<Text>点状</Text>}>
            <Badge />
          </Cell>
          <Cell hasArrow title={<Text>直角</Text>}>
            <Badge shape="rect" text="免费" />
          </Cell>
          <Cell hasArrow title={<Text>圆角</Text>}>
            <Badge shape="radius" text="new" />
          </Cell>
          <Cell hasArrow title={<Text>椭圆角</Text>}>
            <Badge shape="round" text="999+" />
          </Cell>
          <Cell hasArrow title={<Text>圆形</Text>}>
            <Badge shape="circle" text="3" />
          </Cell>
          <Cell hasArrow title={<Text>叶形</Text>}>
            <Badge shape="leaf" text="新品" />
          </Cell>
        </Panel>

        <Panel title="多主题">
          <View style={[styles.content, styles.supContent]}>
            <View style={styles.supBox}>
              <Badge theme="primary" />
            </View>
            <View style={styles.supBox}>
              <Badge theme="success" />
            </View>
            <View style={styles.supBox}>
              <Badge theme="warning" />
            </View>
            <View style={styles.supBox}>
              <Badge theme="error" />
            </View>

            <View style={styles.supBox}>
              <Badge shape="round" text="999+" theme="primary" />
            </View>
            <View style={styles.supBox}>
              <Badge shape="round" text="999+" theme="success" />
            </View>
            <View style={styles.supBox}>
              <Badge shape="round" text="999+" theme="warning" />
            </View>
            <View style={styles.supBox}>
              <Badge shape="round" text="999+" theme="error" />
            </View>

          </View>
        </Panel>

        <Panel title="上标位置">
          <View style={[styles.content, styles.supContent]}>
            <View style={styles.supBox}>
              <Badge sup>
                <View style={styles.supItem} />
              </Badge>
            </View>

            <View style={styles.supBox}>
              <Badge sup shape="rect" text="免费">
                <View style={styles.supItem} />
              </Badge>
            </View>

            <View style={styles.supBox}>
              <Badge sup shape="radius" text="new">
                <View style={styles.supItem} />
              </Badge>
            </View>

            <View style={styles.supBox}>
              <Badge sup shape="round" text="999+">
                <View style={styles.supItem} />
              </Badge>
            </View>

            <View style={styles.supBox}>
              <Badge sup shape="circle" text="3">
                <View style={styles.supItem} />
              </Badge>
            </View>

            <View style={styles.supBox}>
              <Badge sup shape="leaf" text="新品">
                <View style={styles.supItem} />
              </Badge>
            </View>
          </View>
        </Panel>

        <Panel title="文本示例">
          <View style={[styles.content, styles.textContent]}>
            <View style={styles.textBox}>
              <Badge sup shape="dot">
                <Text style={styles.textItem}>新品有礼</Text>
              </Badge>
            </View>

            <View style={styles.textBox}>
              <Text style={styles.textItem}>新品有礼</Text>
              <Badge shape="dot" />
            </View>
          </View>
        </Panel>

        <Footer />
      </ScrollView>
    );
  }
}
