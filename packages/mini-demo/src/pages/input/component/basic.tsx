import React, { useState } from 'react';
import { Input, List, Panel } from 'zarm/mini';

/* order:1 */

function Demo() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  return (
    <Panel title="基本用法">
      <List>
        <List.Item title="单行文本">
          <Input
            placeholder="请输入"
            value={title}
            onChange={(e) => {
              const val = e.detail.value;
              setTitle(val);
              console.log(`onChange: ${val}`);
            }}
          />
        </List.Item>

        <List.Item title="多行文本">
          <Input
            placeholder="请输入"
            rows="3"
            value={content}
            onChange={(e) => {
              const val = e.detail.value;
              setContent(val);
              console.log(`onChange: ${val}`);
            }}
          />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
