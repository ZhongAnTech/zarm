import '@zarm-design/icons/style';
import '@zarm-design/icons/style/font';
import * as React from 'react';
import { Button, Panel } from 'zarm/mini';

/* style placeholder */

export default () => {
  return (
    <>
      <Panel title="基本用法" className="button-demo">
        <Button>default</Button>
        <Button theme="primary">primary</Button>
      </Panel>
      {/* <div className="button-demo">
        <Panel title="基本用法">
          <>
            <Button>default</Button>
            <Button theme="primary">primary</Button>
          </>
        </Panel> */}
      {/* <Panel title="块级按钮">
          <>
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
          </>
        </Panel>
        <Panel title="按钮主题">
          <>
            <Button>default</Button>
            <Button theme="primary">primary</Button>
            <Button theme="danger">danger</Button>
          </>
        </Panel>
        <Panel title="按钮尺寸">
          <>
            <Button size="lg">lg</Button>
            <Button>md</Button>
            <Button size="sm">sm</Button>
            <Button size="xs">xs</Button>
          </>
        </Panel>
        <Panel title="按钮形状">
          <>
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
          </>
        </Panel>
        <Panel title="加载状态">
          <Button loading theme="primary">
            loading
          </Button>
          <Button loading theme="default">
            loading
          </Button>
        </Panel>
        <Panel title="带阴影">
          <>
            <Button shadow>default</Button>
            <Button shadow theme="primary">
              primary
            </Button>
            <Button shadow theme="danger">
              danger
            </Button>
          </>
        </Panel>
        <Panel title="幽灵按钮" className="bg-black">
          <>
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
          </>
        </Panel>
        <Panel title="图标按钮">
          <>
            <Button icon={<SuccessCircle theme="success" mode="font" />}>success</Button>
            <Button icon={<CloseCircle theme="danger" mode="font" />}>danger</Button>
          </>
        </Panel> */}
      {/* </div> */}
    </>
  );
};
