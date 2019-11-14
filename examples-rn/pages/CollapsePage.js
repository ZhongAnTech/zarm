import React, { PureComponent } from 'react';
import { ScrollView, Text } from 'react-native';
import { Panel, Collapse } from '../../components/index.native';

export default class Page extends PureComponent {
  render() {
    return (
      <ScrollView>
        <Panel title="基本用法">
          <Collapse>
            <Collapse.Item itemKey="1" title="50元套餐" onItemChange={(key) => console.log(key)}>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey={2} title="100元套餐" onItemChange={(key) => console.log(key)}>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="3" title="200元套餐" onItemChange={(key) => console.log(key)}>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
        </Panel>

        <Panel title="手风琴模式">
          <Collapse animated>
            <Collapse.Item itemKey="test1" title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test2" title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test3" title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
        </Panel>

        <Panel title="默认展开项">
          <Collapse animated activeKey={['test1', 'test2']}>
            <Collapse.Item itemKey="test1" title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test2" title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test3" title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
        </Panel>

        <Panel title="允许展开多项">
          <Collapse animated multiple defaultActiveKey={['test1', 'test3']}>
            <Collapse.Item itemKey="test1" title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test2" title="100元套餐">
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test3" title="200元套餐">
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
              <Text>我是200元套餐内容</Text>
            </Collapse.Item>
          </Collapse>
        </Panel>

        <Panel title="禁用子项">
          <Collapse
            multiple
            activeKey={['test2']}
            onChange={(key) => console.log(key)}
          >
            <Collapse.Item itemKey="test1" title="50元套餐">
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
              <Text>我是50元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test2" title="100元套餐" disabled>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
              <Text>我是100元套餐内容</Text>
            </Collapse.Item>
            <Collapse.Item itemKey="test3" title="200元套餐" disabled>
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
