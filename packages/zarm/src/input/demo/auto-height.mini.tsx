import React, { useState } from 'react';
import { Input, List, Panel } from 'zarm/mini';

/* order:6 */

function Demo() {
  const [value, setValue] = useState('');
  return (
    <Panel title="高度自适应">
      <List>
        <List.Item title="多行文本">
          <Input
            rows={3}
            autoHeight
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
