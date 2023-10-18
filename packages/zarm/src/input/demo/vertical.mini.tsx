import React from 'react';
import { Input, List, Panel } from 'zarm/mini';

function Demo() {
  return (
    <Panel title="上下结构">
      <List>
        <List.Item description="最少4个字符，包含大小写英文字母和数字">
          <Input label="账号" placeholder="请输入您的账号" />
        </List.Item>
        <List.Item description="最少8个字符，包含大小写英文字母、数字和字符">
          <Input label="密码" type="password" placeholder="请输入您的密码" />
        </List.Item>
        <List.Item>
          <Input label="个人介绍" maxLength={200} placeholder="请输入您的个人介绍" rows="4" />
        </List.Item>
      </List>
    </Panel>
  );
}

export default Demo;
