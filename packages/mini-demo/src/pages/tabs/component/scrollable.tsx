import React, { useState } from 'react';
import { Panel, Tabs } from 'zarm/mini';

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <Panel title="标签栏滚动">
      <Tabs value={value} onChange={setValue} scrollable>
        <Tabs.Panel title="选项卡1">
          <div className="content">选项卡1内容</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡2">
          <div className="content">选项卡2内容</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡3">
          <div className="content">选项卡3内容</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡4">
          <div className="content">选项卡1内容</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡5">
          <div className="content">选项卡2内容</div>
        </Tabs.Panel>
        <Tabs.Panel title="选项卡6">
          <div className="content">选项卡3内容</div>
        </Tabs.Panel>
      </Tabs>
    </Panel>
  );
};

export default Demo;
