import React from 'react';
import { Input, List, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="只读">
      <List>
        <List.Item title="单行文本">
          <Input defaultValue="我是只读状态" readOnly />
        </List.Item>
        <List.Item title="多行文本">
          <Input
            autoHeight
            value="我是只读状态，我是只读状态，我是只读状态，我是只读状态。"
            readOnly
            className="auto-height"
          />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
