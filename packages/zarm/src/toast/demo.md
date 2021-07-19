# Toast 轻提示

## 基础用法

```jsx
import { useState } from 'react';
import { Toast, Cell, Button, Icon } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Cell
        description={
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
      >
        普通
      </Cell>

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
import { Toast, Cell, Button, Icon } from 'zarm';
const Demo = () => {
  const toast = Toast.useToast();
  const containerRef = useRef(null);

  return (
    <>
      <Cell
        description={
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
      >
        普通
      </Cell>

      <Cell
        description={
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
      >
        指定停留时间
      </Cell>

      <Cell
        description={
          <Button
            size="xs"
            onClick={() => {
              toast.show({
                className: 'test',
                content: '不可同时进行其他交互',
                mountContainer: containerRef.current,
                mask: true,
                afterClose: () => {
                  console.log('Toast已关闭');
                },
              });
            }}
          >
            开启
          </Button>
        }
      >
        <div ref={containerRef}>有遮罩层</div>
      </Cell>

      <Cell
        description={
          <Button
            size="xs"
            onClick={() => {
              toast.show(
                <div className="box">
                  <Icon className="box-icon" type="right-round-fill" />
                  <div className="box-text">预约成功</div>
                </div>,
              );
            }}
          >
            开启
          </Button>
        }
      >
        自定义内容
      </Cell>
    </>
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
