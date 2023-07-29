import * as React from 'react';
import { Button, Panel } from 'zarm';

export default () => {
  return (
    <>
      <Panel title="基础用法">
        <Button>default</Button>
        <Button theme="primary">primary</Button>
      </Panel>
    </>
  );
};
