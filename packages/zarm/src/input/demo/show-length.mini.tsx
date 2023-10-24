import React, { useState } from 'react';
import { Input, List, Panel } from 'zarm/mini';

/* order:7 */

function Demo() {
  const [value, setValue] = useState('');
  return (
    <Panel title="显示输入字数">
      <List>
        <List.Item title="单行文本">
          <Input
            rows="3"
            showLength
            maxLength={200}
            placeholder="请输入"
            value={value}
            onChange={(e) => {
              setValue(e.detail.value);
            }}
          />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
