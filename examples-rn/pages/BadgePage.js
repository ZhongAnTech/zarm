import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Badge } from '../../components/index.native';

const styles = {
  mb: {
    marginBottom: 10,
  },

  title: {
    color: 'gray',
    paddingLeft: 25,
    backgroundColor: '#f6f6f6',
    display: 'flex',
    height: 50,
    lineHeight: 50,
    fontSize: 16,
  },

  contentReg: {
    flexDirection: 'row',
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },

  contentRegLeft: {
    flexDirection: 'row',
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },

  basicWrap: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    borderBottomWidth: 0.5,
  },

  lineWrap: {
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth / 2,
    borderColor: '#ddd',
    marginLeft: 25,
    flexDirection: 'row',
    paddingRight: 20,
  },

  lineContent: {
    flex: 1,
  },

  lineFooter: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapCenter: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lineText: {
    lineHeight: 50,
    color: '#333',
  },

  arrowWrap: {
    width: 15,
    height: 50,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#c7c7cc',
    width: 10,
    height: 10,
    transform: [{ rotateZ: '45deg' }],
    flexDirection: 'row',
  },

  block: {
    width: 35,
    height: 35,
    backgroundColor: '#ddd',
  },

  roundBlock: {
    width: 44,
    height: 44,
    borderRadius: 1000,
    backgroundColor: '#ddd',
  },

  br: {
    borderRadius: 4,
  },

  mr: {
    marginRight: 25,
  },

  text: {
    color: 'black',
    backgroundColor: 'white',
  },
};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View >
          <Text style={styles.title}>基本用法</Text>
          <View style={styles.basicWrap}>
            <View style={styles.lineWrap}>
              <View style={styles.lineContent}>
                <Text style={styles.lineText}>点状</Text>
              </View>
              <View style={styles.lineFooter}>
                <Badge />
              </View>
              <View style={styles.arrowWrap}>
                <View style={styles.arrow} />
              </View>
            </View>

            <View style={styles.lineWrap}>
              <View style={styles.lineContent}>
                <Text style={styles.lineText}>圆形</Text>
              </View>
              <View style={styles.lineFooter}>
                <Badge shape="circle" text="3" />
              </View>
              <View style={styles.arrowWrap}>
                <View style={styles.arrow} />
              </View>
            </View>

            <View style={styles.lineWrap}>
              <View style={styles.lineContent}>
                <Text style={styles.lineText}>椭圆</Text>
              </View>
              <View style={styles.lineFooter}>
                <Badge shape="round" text="999+" />
              </View>
              <View style={styles.arrowWrap}>
                <View style={styles.arrow} />
              </View>
            </View>

            <View style={styles.lineWrap}>
              <View style={styles.lineContent}>
                <Text style={styles.lineText}>方圆形</Text>
              </View>
              <View style={styles.lineFooter}>
                <Badge shape="radius" text="999+" />
              </View>
              <View style={styles.arrowWrap}>
                <View style={styles.arrow} />
              </View>
            </View>

            <View style={styles.lineWrap}>
              <View style={styles.lineContent}>
                <Text style={styles.lineText}>直角</Text>
              </View>
              <View style={styles.lineFooter}>
                <Badge shape="rect" text="免费" />
              </View>
              <View style={styles.arrowWrap}>
                <View style={styles.arrow} />
              </View>
            </View>

            <View style={styles.lineWrap}>
              <View style={styles.lineContent}>
                <Text style={styles.lineText}>气泡形</Text>
              </View>
              <View style={styles.lineFooter}>
                <Badge shape="leaf" text="新品" />
              </View>
              <View style={styles.arrowWrap}>
                <View style={styles.arrow} />
              </View>
            </View>
          </View>

          <Text style={styles.title}>上标位置</Text>

          <View style={styles.contentReg}>
            <Badge sup>
              <View style={[styles.block, styles.br]} />
            </Badge>

            <Badge sup shape="radius" text="new">
              <View style={[styles.block, styles.br]} />
            </Badge>

            <Badge sup shape="round" text="999+">
              <View style={[styles.block, styles.br]} />
            </Badge>

            <Badge sup shape="circle" text="3">
              <View style={[styles.block, styles.br]} />
            </Badge>

            <Badge sup shape="leaf" text="新品">
              <View style={[styles.block, styles.br]} />
            </Badge>
          </View>

          <Text style={styles.title}>文本示例</Text>

          <View style={styles.contentRegLeft}>
            <Badge sup shape="dot" style={styles.mr} >
              <Text style={[styles.text, styles.br]}>新品有礼</Text>
            </Badge>

            <Text style={[styles.text, styles.br]}>新品有礼</Text>
            <View style={styles.wrapCenter}>
              <Badge shape="dot" />
            </View>
          </View>

          <Text style={styles.title}>图标示例</Text>
          <View style={styles.contentRegLeft}>
            <Badge sup shape="leaf" text="新品" style={styles.mr}>
              <View style={[styles.roundBlock]} />
            </Badge>

            <Badge sup shape="leaf" text="999+" style={styles.mr}>
              <View style={[styles.roundBlock]} />
            </Badge>
          </View>
        </View>
      </ScrollView>
    );
  }
}
