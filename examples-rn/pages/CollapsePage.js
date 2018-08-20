import React, { PureComponent } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Panel, Collapse } from '../../components/index.native';

const styles = {
  pt: {
    paddingTop: 15,
  },
};

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <View style={styles.pt}>
          <Panel
            style={styles.mb}
            titleRender="基本用法"
          />
          <Collapse>
            <Collapse.Item title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
          <Panel
            style={styles.mb}
            titleRender="手风琴模式"
          />
          <Collapse animated>
            <Collapse.Item title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
          <Panel
            style={styles.mb}
            titleRender="默认展开项"
          />
          <Collapse activeIndex={[0, 2]} animated>
            <Collapse.Item disabled title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
        </View>
      </ScrollView>
    );
  }
}
