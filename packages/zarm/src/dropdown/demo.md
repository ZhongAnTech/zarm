# Dropdown 下拉菜单

## 一列

```jsx
import { useState } from 'react';
import { Dropdown, List, Button } from 'zarm';

const Demo = () => {
  return (
    <>
      <Dropdown>
        <Dropdown.Item title='一列' itemKey='key1'>
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
  return (
    <>
      <Dropdown defaultActiveKey='Key2'>
        <Dropdown.Item title="菜单一" itemKey='key1'>
          <List>
            <List.Item title="Item 1" />
            <List.Item title="Item 2" />
            <List.Item title="Item 3" />
          </List>
        </Dropdown.Item>
        <Dropdown.Item title="菜单二" itemKey='Key2'>
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
| activeKey        | number \| string                  | -      | 激活的 Item key                 |
| defaultActiveKey | number \| string                  | -      | 默认激活的 Item key |
| onChange         | (value: number \| string) => void | -      | activeKey 变化时触发     |
| arrow       | ReactNode        | -      | 自定义 arrow                                                 |


### Dropdown.Item

| 属性      | 类型                                | 默认值       | 说明           |
|:--------|:----------------------------------|:----------|:-------------|
| itemKey | number \| string    | string | -            | 唯一标识，对应`activeKey`，不设置则默认取 index 索引 |
| title   | ReactNode                         | -         | 标题文字         |
| arrow   | ReactNode                         | -         | 自定义 arrow    |
| onClick | (event: React.MouseEvent) => void | -         | 点击trigger时触发 |

## CSS 变量

| 属性           | 默认值                  | 说明               |
| :------------- | :---------------------- | :----------------- |
| --background   | '#fff'                  | 背景色             |
| --height       | '50px'                  | 高度               |
| --color        | var(--za-color-text)    | 字体颜色           |
| --active-color | var(--za-theme-primary) | 选中状态下字体颜色 |
| --font-size    | '12px'                  | 字体大小           |
| --z-index      | '100'                   | 层级               |
