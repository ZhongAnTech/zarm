# Toast 轻提示

## 基础用法

```jsx
import { useState } from 'react';
import { Toast, List, Button } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <List>
        <List.Item
          title="普通"
          after={
            <>
              <Button
                size="xs"
                onClick={() => {
                  setVisible(true);
                }}
              >
                开启
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  setVisible(false);
                }}
                style={{ marginLeft: 12 }}
              >
                关闭
              </Button>
            </>
          }
        />
      </List>

      <Toast
        visible={visible}
        content="默认3秒自动关闭"
        afterClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## useToast

```jsx
import { useRef } from 'react';
import { Toast, List, Button } from 'zarm';
import { Success } from '@zarm-design/icons';

const Demo = () => {
  const toast = Toast.useToast();
  const containerRef = useRef(null);

  return (
    <List>
      <List.Item
        title="普通"
        after={
          <>
            <Button
              size="xs"
              onClick={() => {
                toast.show('默认3秒自动关闭');
              }}
            >
              开启
            </Button>
            <Button
              size="xs"
              onClick={() => {
                toast.hide();
              }}
              style={{ marginLeft: 12 }}
            >
              关闭
            </Button>
          </>
        }
      />
      <List.Item
        title="指定停留时间"
        after={
          <Button
            size="xs"
            onClick={() => {
              toast.show({
                content: '指定5秒后自动关闭',
                stayTime: 5000,
                afterClose: () => {
                  console.log('Toast已关闭');
                },
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        after={
          <Button
            size="xs"
            onClick={() => {
              toast.show({
                content: '挂载在指定的 div 元素上',
                mountContainer: containerRef.current,
              });
            }}
          >
            开启
          </Button>
        }
      >
        <div ref={containerRef}>指定挂载节点</div>
      </List.Item>
      <List.Item
        title="有遮罩层"
        after={
          <Button
            size="xs"
            onClick={() => {
              toast.show({
                content: '不可同时进行其他交互',
                mask: true,
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="自定义内容"
        after={
          <Button
            size="xs"
            onClick={() => {
              toast.show({
                className: 'test',
                content: (
                  <div className="box">
                    <Success className="box-icon" />
                    <div className="box-text">预约成功</div>
                  </div>
                ),
              });
            }}
          >
            开启
          </Button>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型                                 | 默认值        | 说明                               |
| :------------- | :----------------------------------- | :------------ | :--------------------------------- |
| visible        | boolean                              | false         | 是否展示                           |
| content        | ReactNode                            | -             | 显示的内容                         |
| stayTime       | number                               | 3000          | 自动关闭前停留的时间（单位：毫秒） |
| mask           | boolean                              | false         | 是否展示遮罩层                     |
| onMaskClick    | () => void                           | -             | 点击遮罩层时触发的回调函数         |
| afterClose     | () => void                           | -             | Toast 隐藏后的回调函数             |
| mountContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Toast 挂载的 HTML 节点        |
