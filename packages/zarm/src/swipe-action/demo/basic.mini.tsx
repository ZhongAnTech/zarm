import React from 'react';
import { List, Panel, SwipeAction } from 'zarm/mini';

const RIGHT_BUTTONS = [
  {
    text: '右按钮1',
    onClick: () => console.log('右按钮1'),
  },
  {
    text: '右按钮2',
    theme: 'danger',
    onClick: () => console.log('右按钮2'),
  },
];
const LEFT_BUTTONS = [
  {
    text: '左按钮1',
    onClick: () => console.log('左按钮1'),
  },
  {
    text: '左按钮2',
    theme: 'danger',
    onClick: () => console.log('左按钮2'),
  },
];

function Demo() {
  return (
    <Panel title="基本用法">
      <List>
        <SwipeAction
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
          rightActions={RIGHT_BUTTONS}
        >
          <List.Item title="左滑看看" />
        </SwipeAction>

        <SwipeAction
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
          leftActions={LEFT_BUTTONS}
        >
          <List.Item title="右滑看看" />
        </SwipeAction>

        <SwipeAction
          onOpen={() => console.log('open')}
          onClose={() => console.log('close')}
          leftActions={LEFT_BUTTONS}
          rightActions={[RIGHT_BUTTONS[0]]}
        >
          <List.Item title="左右都能滑动（自动关闭）" />
        </SwipeAction>

        {/* <SwipeAction
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
        leftActions={[
          {
            text: '异步',
            onClick: async () => {
              const confirm = Modal.confirm({
                title: '确定要关闭吗？',
                content: '这里是确认框的内容部分，点击确定按钮，将触发 Promise 关闭确认框',
                onConfirm: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 3000));
                  console.log('异步按钮回调');
                },
              });
              await confirm;
            },
          },
        ]}
      >
        <List.Item title="异步关闭" />
      </SwipeAction> */}
      </List>
    </Panel>
  );
}

export default Demo;
