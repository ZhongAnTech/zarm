# Loading 加载

## 基本用法

```jsx
import { useState } from 'react';
import { Loading, List, Button, Icon } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <List>
        <List.Item
          title="普通"
          after={
            <Button
              size="xs"
              onClick={() => {
                setVisible(true);
                setTimeout(() => {
                  setVisible(false);
                }, 1000);
              }}
            >
              开启
            </Button>
          }
        />
      </List>

      <Loading
        visible={visible}
        afterClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## useLoading

```jsx
import { Loading, List, Button, ActivityIndicator } from 'zarm';

const Demo = () => {
  const loading = Loading.useLoading();
  return (
    <List>
      <List.Item
        after={
          <Button
            size="xs"
            onClick={() => {
              loading.show();
              setTimeout(() => {
                loading.hide();
              }, 3000);
            }}
          >
            开启
          </Button>
        }
      >
        普通
      </List.Item>
      <List.Item
        after={
          <Button
            size="xs"
            onClick={() => {
              loading.show({
                content: <ActivityIndicator size="lg" />,
                stayTime: 3000,
              });
            }}
          >
            开启
          </Button>
        }
      >
        自定义内容
      </List.Item>
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
| mask           | boolean                              | true          | 是否展示遮罩层                     |
| onMaskClick    | () => void                           | -             | 点击遮罩层时触发的回调函数         |
| afterClose     | () => void                           | -             | Loading 隐藏后的回调函数           |
| mountContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Loading 挂载的 HTML 节点      |
