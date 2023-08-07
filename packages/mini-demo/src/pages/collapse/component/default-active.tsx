import '@zarm-design/icons/style';
import '@zarm-design/icons/style/font';
import * as React from 'react';
import { Collapse, Panel } from 'zarm/mini';

/* style placeholder */

export default () => {
  return (
    <>
      <Panel title="默认展开">
        <Collapse multiple defaultActiveKey={['0', '1']}>
          <Collapse.Item key="0" title="第一项">
            This is content of item1. This is content of item1. This is content of item1.
          </Collapse.Item>
          <Collapse.Item key="1" title="第二项">
            This is content of item2. This is content of item2. This is content of item2.
          </Collapse.Item>
          <Collapse.Item key="2" title="第三项">
            This is content of item3. This is content of item3. This is content of item3.
          </Collapse.Item>
        </Collapse>
      </Panel>
    </>
  );
};
