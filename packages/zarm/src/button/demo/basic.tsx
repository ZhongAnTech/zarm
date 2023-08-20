import * as React from 'react';
import { Button, Panel } from 'zarm';
import './basic.scss';

export default () => {
  return (
    <>
      <Panel title="基础用法" className="wrapper">
        <Button>default</Button>
        <Button theme="primary">primary</Button>
      </Panel>
    </>
  );
};
