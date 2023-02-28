# TabBar 标签栏

## 基本用法

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const Demo = () => {
  const [activeKey, setActiveKey] = useState('home');

  return (
    <>
      <TabBar activeKey={activeKey} onChange={setActiveKey}>
        <TabBar.Item itemKey="home" title="首页" icon={<TabIcon type="home" />} />
        <TabBar.Item
          itemKey="found"
          title="项目"
          icon={<TabIcon type="menu" />}
          // badge={{ shape: 'circle', text: '3' }}
        />
        <TabBar.Item
          itemKey="me"
          title="我的"
          icon={<TabIcon type="user" />}
          // badge={{ shape: 'dot' }}
        />
      </TabBar>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 徽标

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const Demo = () => {
  return (
    <>
      <TabBar>
        <TabBar.Item itemKey="home" title="首页" icon={<TabIcon type="home" />} />
        <TabBar.Item
          itemKey="found"
          title="项目"
          icon={<TabIcon type="menu" />}
          badge={{ shape: 'circle', text: 3 }}
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

## 仅图标

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const Demo = () => {
  return (
    <>
      <TabBar>
        <TabBar.Item itemKey="home" icon={<TabIcon type="home" />} />
        <TabBar.Item itemKey="found" icon={<TabIcon type="menu" />} />
        <TabBar.Item itemKey="me" icon={<TabIcon type="user" />} />
      </TabBar>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 仅标题

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const Demo = () => {
  return (
    <>
      <TabBar>
        <TabBar.Item itemKey="home" title="首页" />
        <TabBar.Item itemKey="found" title="项目" />
        <TabBar.Item itemKey="me" title="我的" />
      </TabBar>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 受控模式

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const Demo = () => {
  const [activeKey, setActiveKey] = React.useState('me');

  return (
    <>
      <TabBar activeKey={activeKey} onChange={setActiveKey} safeArea>
        <TabBar.Item itemKey="home" title="首页" icon={<TabIcon type="home" />} />
        <TabBar.Item itemKey="found" title="项目" icon={<TabIcon type="menu" />} />
        <TabBar.Item itemKey="me" title="我的" icon={<TabIcon type="user" />} />
      </TabBar>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 开启安全区域

```jsx
import { useState } from 'react';
import { Icon, TabBar, List, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const Demo = () => {
  return (
    <>
      <TabBar safeArea>
        <TabBar.Item itemKey="home" title="首页" icon={<TabIcon type="home" />} />
        <TabBar.Item itemKey="found" title="项目" icon={<TabIcon type="menu" />} />
        <TabBar.Item itemKey="me" title="我的" icon={<TabIcon type="user" />} />
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
| safeArea         | boolean                           | false  | 是否适配安全区域           |
| onChange         | (value: number \| string) => void | -      | 值变化时触发的回调函数     |

### TabBar.Item

| 属性       | 类型             | 默认值 | 说明                                                 |
| :--------- | :--------------- | :----- | :--------------------------------------------------- |
| itemKey    | number \| string | -      | 唯一标识，对应`activeKey`，不设置则默认取 index 索引 |
| title      | ReactNode        | -      | 标题文字                                             |
| icon       | ReactNode        | -      | 图标                                                 |
| activeIcon | ReactNode        | -      | 选中时图标，不设置等同 icon 属性的值                 |
| badge      | BadgeProps       | -      | 参考 [Badge](/#/components/badge) 组件               |

## CSS 变量

| 属性           | 默认值                  | 说明               |
| :------------- | :---------------------- | :----------------- |
| --background   | '#fff'                  | 背景色             |
| --height       | '50px'                  | 高度               |
| --color        | var(--za-color-text)    | 字体颜色           |
| --active-color | var(--za-theme-primary) | 选中状态下字体颜色 |
| --font-size    | '12px'                  | 字体大小           |
