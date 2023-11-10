import * as React from 'react';
import { List, Panel, Radio } from 'zarm/mini';

const Demo = () => {
  return (
    <>
      <Panel title="列表样式">
        <Radio.Group type="list">
          <Radio value="0">选项一</Radio>
          <Radio value="1">选项二</Radio>
          <Radio value="2" disabled>
            选项三（禁止选择）
          </Radio>
        </Radio.Group>
      </Panel>
      <Panel title="通栏样式">
        <List.Item>
          <Radio.Group block>
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
          </Radio.Group>
        </List.Item>
      </Panel>
    </>
  );
};

export default Demo;
