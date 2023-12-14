import React, { useState } from 'react';
import { Modal, List, Button, Panel } from 'zarm/mini';

/* order: 2 */

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  return (
    <Panel title="带操作按钮">
      <List>
        <List.Item
          title="自定义操作按钮"
          suffix={
            <Button size="xs" onClick={toggle}>
              开启
            </Button>
          }
        />
      </List>

      <Modal
        visible={visible}
        title="标题"
        actions={[
          {
            key: 'online',
            text: '在线阅读',
            theme: 'default',
          },
          {
            key: 'download',
            text: '下载文件',
            theme: 'default',
            disabled: true,
          },
          [
            {
              key: 'cancel',
              text: '取消',
            },
            {
              key: 'delete',
              text: '删除',
              bold: true,
              theme: 'danger',
            },
          ],
        ]}
        onAction={async (action) => {
          switch (action.key) {
            case 'cancel':
              toggle();
              break;
            default:
              // 模拟异步操作
              await new Promise((resolve) => setTimeout(resolve, 3000));
              toggle();
          }
          console.log(action);
        }}
      >
        模态框内容
      </Modal>
    </Panel>
  );
};

export default Demo;