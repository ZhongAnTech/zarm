# TabBar 标签栏

## 基本用法

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_mk657pke2hj.js');

const Demo = () => {
  const [activeKey, setActiveKey] = useState('home');
  const [visible, setVisible] = useState(true);

  return (
    <>
      <List>
        <List.Item
          title="隐藏 | 展示"
          after={
            <Button
              size="xs"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {visible ? '隐藏' : '展示'}
            </Button>
          }
        />
      </List>

      <TabBar visible={visible} activeKey={activeKey} onChange={setActiveKey}>
        <TabBar.Item itemKey="home" title="主页" icon={<TabIcon type="home" />} />
        <TabBar.Item
          itemKey="found"
          title="保险"
          icon={<TabIcon type="insurance" />}
          badge={{ shape: 'circle', text: '3' }}
        />
        <TabBar.Item
          itemKey="me"
          title="我的"
          icon={<TabIcon type="user" />}
          badge={{ shape: 'dot' }}
        />
      </TabBar>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### TabBar

| 属性             | 类型                              | 默认值 | 说明                       |
| :--------------- | :-------------------------------- | :----- | :------------------------- |
| visible          | boolean                           | true   | 是否显示                   |
| activeKey        | number \| string                  | -      | 当前选中项                 |
| defaultActiveKey | number \| string                  | -      | 初始选中项, 默认第一个选中 |
| safeIphoneX      | boolean                           | false  | 是否适配 iphoneX 刘海屏    |
| onChange         | (value: number \| string) => void | -      | 值变化时触发的回调函数     |

### TabBar.Item

| 属性       | 类型             | 默认值 | 说明                                                 |
| :--------- | :--------------- | :----- | :--------------------------------------------------- |
| itemKey    | number \| string | -      | 唯一标识，对应`activeKey`，不设置则默认取 index 索引 |
| title      | ReactNode        | -      | 标题文字                                             |
| icon       | ReactNode        | -      | 图标                                                 |
| activeIcon | ReactNode        | -      | 选中时图标，不设置等同 icon 属性的值                 |
| badge      | BadgeProps       | -      | 参考[Badge](/#/components/badge)组件                 |
