import React from 'react';
import { Checkbox, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="列表样式">
      <Checkbox.Group type="list" onChange={(e) => console.log(e)}>
        <Checkbox value="0">选项一</Checkbox>
        <Checkbox value="1">选项二</Checkbox>
        <Checkbox value="2">选项三</Checkbox>
      </Checkbox.Group>
    </Panel>
  );
}

export default Demo;
