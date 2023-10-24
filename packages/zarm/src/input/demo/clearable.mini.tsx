import React, { useState } from 'react';
import { Input, List, Panel } from 'zarm/mini';

/* order:2 */

function Demo() {
  const [value, setValue] = useState('');
  return (
    <Panel title="带清除按钮">
      <List>
        <List.Item title="单行文本">
          <Input
            clearable
            placeholder="输入后右侧可见清除按钮"
            value={value}
            onChange={(e) => {
              setValue(e.detail.value);
              console.log(`onChange: ${e.detail.value}`);
            }}
          />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
