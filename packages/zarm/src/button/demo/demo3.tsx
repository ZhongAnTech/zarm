import * as React from 'react';
import { Button, Panel } from 'zarm';
import './style.scss';

export default () => {
  return (
    <>
      <Panel title="幽灵按钮" className="wrapper" style={{ '--body-background': '#333' }}>
        <Button block ghost>
          default
        </Button>
        <Button block ghost theme="primary">
          primary
        </Button>
        <Button block ghost theme="danger">
          danger
        </Button>
        <Button block ghost disabled>
          disabled
        </Button>
      </Panel>
    </>
  );
};
