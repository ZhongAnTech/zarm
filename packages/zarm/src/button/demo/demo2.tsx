import { CloseCircle, Success, SuccessCircle } from '@zarm-design/icons';
import * as React from 'react';
import { Button, Panel } from 'zarm';
import './style.scss';

export default () => {
  return (
    <>
      <Panel title="按钮形状" className="wrapper">
        <Button shape="rect" theme="primary">
          rect
        </Button>
        <Button theme="primary">radius</Button>
        <Button shape="round" theme="primary">
          round
        </Button>
        <Button shape="circle" theme="primary">
          circle
        </Button>
        <Button shape="circle" icon={<Success />} />
      </Panel>
      <Panel title="按钮图标" className="wrapper">
        <Button icon={<SuccessCircle theme="success" />}>success</Button>
        <Button icon={<CloseCircle theme="danger" />}>danger</Button>
      </Panel>
      <Panel title="加载状态" className="wrapper">
        <Button loading>loading</Button>
        <Button loading theme="primary">
          loading
        </Button>
        <Button loading disabled theme="primary">
          disabled
        </Button>
      </Panel>
      <Panel title="链接按钮" className="wrapper">
        <Button href="https://zarm.design">default</Button>
        <Button theme="primary" href="https://zarm.design">
          primary
        </Button>
        <Button theme="danger" href="https://zarm.design">
          danger
        </Button>
        <Button disabled theme="primary" href="https://zarm.design">
          disabled
        </Button>
      </Panel>
    </>
  );
};
