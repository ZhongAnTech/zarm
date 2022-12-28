# Dropdown 下拉菜单

## 基本用法

```jsx
import { useState } from 'react';
import { Dropdown } from 'zarm';

const Demo = () => {
  const [activeKey, setActiveKey] = useState('home');

  return (
    <>
      <Dropdown>
        <Dropdown.Item title={'1'} itemKey={'key1'}>test1</Dropdown.Item>
        <Dropdown.Item title={'2'} itemKey='Key2'>test2</Dropdown.Item>
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

## CSS 变量

| 属性           | 默认值                  | 说明               |
| :------------- | :---------------------- | :----------------- |
| --background   | '#fff'                  | 背景色             |
| --height       | '50px'                  | 高度               |
| --color        | var(--za-color-text)    | 字体颜色           |
| --active-color | var(--za-theme-primary) | 选中状态下字体颜色 |
| --font-size    | '12px'                  | 字体大小           |
| --z-index      | '100'                   | 层级               |
