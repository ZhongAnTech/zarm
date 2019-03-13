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
          <Cell hasArrow title="点状" description={<Badge />} onClick={() => {}} />
          <Cell hasArrow title="直角" description={<Badge shape="rect" text="免费" />} onClick={() => {}} />
          <Cell hasArrow title="圆角" description={<Badge shape="radius" text="new" />} onClick={() => {}} />
          <Cell hasArrow title="椭圆角" description={<Badge shape="round" text="999+" />} onClick={() => {}} />
          <Cell hasArrow title="圆形" description={<Badge shape="circle" text={3} />} onClick={() => {}} />
          <Cell hasArrow title="叶形" description={<Badge shape="leaf" text="新品" />} onClick={() => {}} />
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
              <Badge theme="danger" />
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
              <Badge shape="round" text="999+" theme="danger" />
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
