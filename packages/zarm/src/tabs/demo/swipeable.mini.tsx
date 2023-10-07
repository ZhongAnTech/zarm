import React, { useState } from 'react';
import { Panel, Tabs } from 'zarm/mini';

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <Panel title="可滑动">
      <Tabs value={value} onChange={setValue} swipeable>
        <Tabs.Panel title="选项卡1">
          <div className="content">选项卡1内容</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div className="content">选项卡2内容</div>
        </Tabs.Panel>
      </Tabs>
    </Panel>
  );
};

export default Demo;
