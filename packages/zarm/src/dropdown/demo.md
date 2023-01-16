# Dropdown 下拉菜单

## 一列

```jsx
import { useState } from 'react';
import { Dropdown, List, Button } from 'zarm';

const Demo = () => {
  const [activeKey, setActiveKey] = useState('home');

  return (
    <>
      <Dropdown>
        <Dropdown.Item title='一列' itemKey={'key1'}>
          content
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 两列

```jsx
import { useState } from 'react';
import { Dropdown, List, Button } from 'zarm';

const Demo = () => {
  const [activeKey, setActiveKey] = useState('home');

  return (
    <>
      <Dropdown>
        <Dropdown.Item title={'菜单一'} itemKey={'key1'}>
          <List>
            <List.Item title="Item 1" />
            <List.Item title="Item 2" />
            <List.Item title="Item 3" />
          </List>
        </Dropdown.Item>
        <Dropdown.Item title={'菜单二'} itemKey='Key2'>
          <List>
            <List.Item title="Item 4" />
            <List.Item title="Item 5" />
            <List.Item title="Item 6" />
          </List>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Dropdown

| 属性             | 类型                              | 默认值 | 说明                       |
| :--------------- | :-------------------------------- | :----- | :------------------------- |
| visible          | boolean                           | true   | 是否显示                   |
| activeKey        | number \| string                  | -      | 当前选中项                 |
| defaultActiveKey | number \| string                  | -      | 初始选中项, 默认第一个选中 |
| safeIphoneX      | boolean                           | false  | 是否适配 iphoneX 刘海屏    |
| onChange         | (value: number \| string) => void | -      | 值变化时触发的回调函数     |

### Dropdown.Item

| 属性       | 类型             | 默认值 | 说明                                                 |
| :--------- | :--------------- | :----- | :--------------------------------------------------- |
| itemKey    | number \| string | -      | 唯一标识，对应`activeKey`，不设置则默认取 index 索引 |
| title      | ReactNode        | -      | 标题文字                                             |
| icon       | ReactNode        | -      | 图标                                                 |
| arrow          | 自定义 arrow                | `React.ReactNode` | -       |
| destroyOnClose | 不可见时卸载内容            | `boolean`         | `false` |
| forceRender    | 被隐藏时是否渲染 `DOM` 结构 | `boolean`         | `false` |
| highlight      | 高亮                        | `boolean`         | `false` |
| key            | 唯一值                      | `string`          | -       |
| title          | 标题                        | `ReactNode`       | -       |

## CSS 变量

| 属性           | 默认值                  | 说明               |
| :------------- | :---------------------- | :----------------- |
| --background   | '#fff'                  | 背景色             |
| --height       | '50px'                  | 高度               |
| --color        | var(--za-color-text)    | 字体颜色           |
| --active-color | var(--za-theme-primary) | 选中状态下字体颜色 |
| --font-size    | '12px'                  | 字体大小           |
| --z-index      | '100'                   | 层级               |
