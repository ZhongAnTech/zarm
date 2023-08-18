import React from 'react';
import { Input, List } from 'zarm/mini';

function Demo() {
  return (
    <List>
      <List.Item title="单行文本">
        <Input defaultValue="我是只读状态" readOnly />
      </List.Item>
      <List.Item title="单行文本">
        <Input defaultValue="我是只读状态" clearable />
      </List.Item>
      <List.Item title="多行文本">
        <Input autoHeight value="我是只读状态，我是只读状态，我是只读状态，我是只读状态。" />
      </List.Item>
    </List>
  );
}

export default Demo;
