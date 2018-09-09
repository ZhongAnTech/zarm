import React, { PureComponent } from 'react';
import { ScrollView, Text } from 'react-native';
import { Panel, Collapse } from '../../components/index.native';

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel titleRender="基本用法">
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
        </Panel>

        <Panel titleRender="手风琴模式">
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
        </Panel>

        <Panel titleRender="默认展开项">
          <Collapse activeKey={[0, 2]} animated>
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
        </Panel>

        <Panel titleRender="允许展开多项">
          <Collapse multiple animated>
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
        </Panel>

        <Panel titleRender="禁用子项">
          <Collapse defaultactiveKey={[1]} multiple animated>
            <Collapse.Item title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item disabled title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item disabled title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
        </Panel>
      </ScrollView>
    );
  }
}
