import React from 'react';
import { Checkbox, List, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="基础用法">
      <List>
        <List.Item>
          <Checkbox onChange={(e) => console.log(e)}>普通</Checkbox>
        </List.Item>
        <List.Item>
          <Checkbox defaultChecked type="button">
            默认选中
          </Checkbox>
        </List.Item>
        <List.Item>
          <Checkbox disabled>禁用</Checkbox>
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
