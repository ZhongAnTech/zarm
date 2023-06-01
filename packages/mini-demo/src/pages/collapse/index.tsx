import React from 'react';
import { Collapse, Panel } from 'zarm/mini';

function CollapseDemo() {
  return (
    <Panel title="基本用法">
      <Collapse
        animated
        multiple
        onChange={(activeKey) => {
          console.log(activeKey);
        }}
      >
        <Collapse.Item key="1" title="第一项">
          This is content of item1. This is content of item1. This is content of item1.
        </Collapse.Item>
        <Collapse.Item key="2" title="第二项">
          This is content of item2. This is content of item2. This is content of item2.
        </Collapse.Item>
        <Collapse.Item key="3" title="第三项">
          This is content of item3. This is content of item3. This is content of item3.
        </Collapse.Item>
      </Collapse>
    </Panel>
  );
}

export default CollapseDemo;
