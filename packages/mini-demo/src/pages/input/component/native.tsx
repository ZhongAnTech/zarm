import React from 'react';
import { Input, List, Panel } from 'zarm/mini';

/* order:3 */

function Demo() {
  return (
    <Panel title="原生类型">
      <List>
        <List.Item title="密码输入">
          <Input type="password" placeholder="请输入" />
        </List.Item>
        <List.Item title="搜索框">
          <Input type="search" placeholder="请输入" />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
