import React from 'react';
import { Checkbox, List, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="按钮样式">
      <List>
        <List.Item>
          <Checkbox.Group type="button" onChange={(e) => console.log(e)} block>
            <Checkbox value="0">选项一</Checkbox>
            <Checkbox value="1">选项二</Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
