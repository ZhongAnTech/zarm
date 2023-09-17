import * as React from 'react';
import { Button, Panel } from 'zarm';
import './style.scss';

export default () => {
  return (
    <>
      <Panel title="基础用法" className="wrapper">
        <Button>default</Button>
        <Button theme="primary">primary</Button>
      </Panel>
      <Panel title="块级按钮" className="wrapper">
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
      <Panel title="按钮主题" className="wrapper">
        <Button>default</Button>
        <Button theme="primary">primary</Button>
        <Button theme="danger">danger</Button>
      </Panel>
      <Panel title="按钮尺寸" className="wrapper">
        <Button size="lg">lg</Button>
        <Button>md</Button>
        <Button size="sm">sm</Button>
        <Button size="xs">xs</Button>
      </Panel>
    </>
  );
};
