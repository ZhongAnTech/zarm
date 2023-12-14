import React from 'react';
import { List, Button, Modal, Panel } from 'zarm/mini';
import { View } from '@tarojs/components';

/* order: 1 */

const Demo = () => {
  return (
    <Panel title="警告框 Alert">
      <List>
        <List.Item
          title="静态方法关闭"
          suffix={
            <Button
              size="xs"
              onClick={() => {
                Modal.alert({
                  className: 'test',
                  title: '警告框标题',
                  content: '这里是警告框的内容部分',
                  onConfirm: () => {
                    console.log('点击确认');
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
                Modal.alert({
                  title: '警告框标题',
                  content: '这里是警告框的内容部分，点击关闭按钮，将触发 Promise 关闭警告框',
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
      <View id="modal-alert" />
    </Panel>
  );
};

export default Demo;