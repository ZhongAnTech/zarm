# Toast 轻提示

## 基础用法

```jsx
import { useState } from 'react';
import { Toast, List, Button } from 'zarm';

const Demo = () => {
  return (
    <>
      <List>
        <List.Item
          title="普通"
          suffix={
            <>
              <Button
                size="xs"
                onClick={() => {
                  Toast.show('提示内容');
                }}
              >
                开启
              </Button>
            </>
          }
        />
      </List>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 图标

```jsx
import { useRef } from 'react';
import { Toast, List, Button } from 'zarm';
import { Star } from '@zarm-design/icons';

const Demo = () => {
  return (
    <List>
      <List.Item
        title="成功"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
                icon: 'success',
                content: '预约成功',
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="失败"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
                icon: 'fail',
                content: '预约失败',
              });
            }}
            style={{ marginLeft: 12 }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="加载中"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
                icon: 'loading',
                content: '预约中...',
                duration: 0,
              });
            }}
            style={{ marginLeft: 12 }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="自定义"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
                icon: <Star />,
                content: '收藏成功',
              });
            }}
            style={{ marginLeft: 12 }}
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

## 更多用法

```jsx
import { useRef, useState, useEffect } from 'react';
import { Toast, List, Button } from 'zarm';
import { Star } from '@zarm-design/icons';

const Countdown = (props) => {
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((value) => {
        if (value > 1) return value - 1;
        return value;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return <span>{count} 秒后跳转</span>;
};

const Demo = () => {
  const containerRef = useRef(null);

  return (
    <List>
      <List.Item
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
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
        title="阻止背景点击"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
                content: '不可同时进行其他交互',
                maskClickable: false,
              });
            }}
          >
            开启
          </Button>
        }
      />
      <List.Item
        title="动态内容"
        suffix={
          <Button
            size="xs"
            onClick={() => {
              Toast.show({
                icon: 'loading',
                content: <Countdown count={5} />,
                duration: 5000,
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

## 销毁

```jsx
import { useRef } from 'react';
import { Toast, List, Button } from 'zarm';
import { Star } from '@zarm-design/icons';

const Demo = () => {
  const ref = React.useRef();

  return (
    <List>
      <List.Item>
        <Button
          size="xs"
          onClick={() => {
            ref.current = Toast.show({
              content: '提示内容不会消失',
              duration: 0,
            });
          }}
        >
          开启
        </Button>
        <Button
          size="xs"
          onClick={() => {
            ref.current?.close();
          }}
          style={{ marginLeft: 12 }}
        >
          关闭
        </Button>
        <Button
          size="xs"
          onClick={() => {
            Toast.clear();
          }}
          style={{ marginLeft: 12 }}
        >
          全部清除
        </Button>
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型                                                | 默认值              | 说明                               |
| :------------- | :-------------------------------------------------- | :------------------ | :--------------------------------- |
| visible        | boolean                                             | false               | 是否展示                           |
| icon           | 'success' \| 'fail' \| 'loading' \| React.ReactNode | -                   | 显示的图标                         |
| content        | React.ReactNode                                     | -                   | 显示的内容                         |
| duration       | number                                              | 2000                | 自动关闭前停留的时间（单位：毫秒） |
| mask           | boolean                                             | false               | 是否展示遮罩层                     |
| maskClassName  | string                                              | -                   | 遮罩层样式名                       |
| maskStyle      | React.CSSProperties                                 | -                   | 遮罩层样式                         |
| maskColor      | string                                              | -                   | 遮罩层的背景色                     |
| maskOpacity    | string \| number                                    | -                   | 遮罩层的透明度                     |
| maskClickable  | boolean                                             | true                | 是否允许背景点击                   |
| onMaskClick    | () => void                                          | -                   | 点击遮罩层时触发的回调函数         |
| onOpen         | () => void                                          | -                   | Toast 显示的回调函数               |
| onClose        | () => void                                          | -                   | Toast 隐藏的回调函数               |
| afterOpen      | () => void                                          | -                   | Toast 显示后的回调函数             |
| afterClose     | () => void                                          | -                   | Toast 隐藏后的回调函数             |
| mountContainer | MountContainer                                      | () => document.body | 指定 Toast 挂载的 HTML 节点        |

## 指令式 API

Toast 仅支持指令式调用

### Toast.show

同时间只允许弹出一个轻提示，新出现的 Toast 会将之前正在显示中的 Toast 销毁。

show 方法的返回值为一个对象，包含以下属性：

| 属性  | 类型       | 说明             |
| :---- | :--------- | :--------------- |
| close | () => void | 关闭当前的 Toast |

### Toast.clear

关闭所有显示中的 Toast。

### Toast.config

设置全局配置，支持配置 `duration`、`mask`、`maskClassName`、`maskStyle`、`maskColor`、`maskOpacity`、`maskClickable` 和 `mountContainer`。配置方法如下：

```tsx
Toast.config({ duration: 3000 maskColor: 'black' });
```
