import React from 'react';
import { List, Button, Modal, Panel } from 'zarm/mini';

/* order: 3 */

const Demo = () => {
  return (
    <Panel title="确认框 Confirm">
      <List>
      <List.Item
        title="静态方法关闭"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Modal.confirm({
                id: 'confirm',
                title: '确认信息',
                content: '这里是确认框的内容部分',
                onCancel: () => {
                  console.log('点击cancel');
                },
                onConfirm: () => {
                  console.log('点击ok');
                },
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="使用 Promise 关闭"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Modal.confirm({
                id: 'confirm',
                title: '确定要删除吗？',
                content: '这里是确认框的内容部分，点击确定按钮，将触发 Promise 关闭确认框',
                onConfirm: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 3000));
                  // Toast.show({ content: '提交成功' });
                },
              });
            }}
          >
            开启
          </Button>
        }
      />
    </List>
      <Modal id="confirm" />
    </Panel>
  );
};

export default Demo;