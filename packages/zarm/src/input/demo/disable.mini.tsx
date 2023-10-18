import React from 'react';
import { Input, List, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="禁用状态">
      <List>
        <List.Item title="单行文本">
          <Input disabled value="我是禁用状态" />
        </List.Item>
        <List.Item title="多行文本">
          <Input
            disabled
            value="我是禁用状态，我是禁用状态，我是禁用状态，我是禁用状态。"
            rows="3"
            autoHeight
          />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
