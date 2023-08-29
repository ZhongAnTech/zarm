import * as React from 'react';
import { List, Panel, Radio } from 'zarm/mini';

const Demo = () => {
  return (
    <Panel title="基本用法">
      <List>
        <List.Item>
          <Radio>普通</Radio>
        </List.Item>
        <List.Item>
          <Radio defaultChecked>默认选中</Radio>
        </List.Item>
        <List.Item>
          <Radio disabled>禁用</Radio>
        </List.Item>
        <List.Item>
          <Radio defaultChecked disabled>
            选中且禁用
          </Radio>
        </List.Item>
      </List>
    </Panel>
  );
};

export default Demo;
