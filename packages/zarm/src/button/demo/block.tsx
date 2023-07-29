import * as React from 'react';
import { Button, Panel } from 'zarm';

export default () => {
  return (
    <>
      <Panel title="块级按钮">
        <Button block>default</Button>
        <Button block disabled>
          default disabled
        </Button>
        <Button block theme="primary">
          primary
        </Button>
        <Button block disabled theme="primary">
          primary disabled
        </Button>
      </Panel>
    </>
  );
};
