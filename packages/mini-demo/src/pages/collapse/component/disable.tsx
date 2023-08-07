import '@zarm-design/icons/style';
import '@zarm-design/icons/style/font';
import * as React from 'react';
import { Collapse, Panel } from 'zarm/mini';

/* style placeholder */

export default () => {
  return (
    <>
      <Panel title="禁用子项">
        <Collapse multiple defaultActiveKey={['test2']}>
          <Collapse.Item key="test1" title="第一项">
            This is content of item1. This is content of item1. This is content of item1.
          </Collapse.Item>
          <Collapse.Item key="test2" title="第二项" disabled>
            This is content of item2. This is content of item2. This is content of item2.
          </Collapse.Item>
          <Collapse.Item key="test3" title="第三项" disabled>
            This is content of item3. This is content of item3. This is content of item3.
          </Collapse.Item>
        </Collapse>
      </Panel>
    </>
  );
};
