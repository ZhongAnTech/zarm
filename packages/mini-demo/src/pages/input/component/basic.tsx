import React, { useState } from 'react';
import { Input, List, Panel } from 'zarm/mini';

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
            autoHeight
            placeholder="请输入"
            type="textarea"
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
