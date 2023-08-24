import React from 'react';
import { Input, List, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="只读">
      <List>
        <List.Item title="单行文本">
          <Input readOnly value="我是只读状态" />
        </List.Item>
        <List.Item title="多行文本">
          <Input
            readOnly
            className="auto-height"
            value="我是只读状态，我是只读状态，我是只读状态，我是只读状态。"
            type="textarea"
            autoHeight
          />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
