import React from 'react';
import { List, Checkbox, Panel } from 'zarm/mini';
import { Star, StarFill, Success, Close } from '@zarm-design/icons';

/* order: 6 */

function Demo() {
  return (
    <Panel title="自定义icon">
      <List>
        <List.Item>
          <Checkbox.Group>
            <Checkbox
              value="0"
              renderIcon={({ checked }) =>
                checked ? <Success theme="primary" /> : <Close theme="danger" />
              }
            >
              选项一
            </Checkbox>
            <Checkbox
              value="1"
              renderIcon={({ checked }) =>
                checked ? <StarFill theme="primary" /> : <Star theme="primary" />
              }
            >
              选项二
            </Checkbox>
            <Checkbox value="2">选项三</Checkbox>
          </Checkbox.Group>
        </List.Item>
      </List>
    </Panel>
  )
}

export default Demo;
