# CascaderView 级联选择视图

## 基本用法

```jsx
import { useState } from 'react';
import { CascaderView } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState([]);

  const District = [
    {
      value: '340000',
      label: '安徽省',
      children: [
        {
          value: '340800',
          label: '安庆市',
          children: [
            {
              value: '340803',
              label: '大观区',
              children: [],
            },
            {
              value: '340822',
              label: '怀宁县',
              children: [],
            },
            {
              value: '340882',
              label: '其它区',
              children: [],
            },
          ],
        },
      ],
    },
    {
      value: '310000',
      label: '上海',
      children: [
        {
          value: '310100',
          label: '上海市',
          children: [
            {
              value: '310113',
              label: '宝山区',
              children: [],
            },
            {
              value: '310105',
              label: '长宁区',
              children: [],
            },
            {
              value: '310230',
              label: '崇明县',
              children: [],
            },
            {
              value: '310152',
              label: '川沙区',
              children: [],
            },
          ],
        },
      ],
    },
  ];

  return (
    <CascaderView
      value={value}
      dataSource={District}
      onChange={(value) => {
        console.log('onChange', value);
      }}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                             | 默认值                                                   | 说明                                     |
| :----------- | :------------------------------- | :------------------------------------------------------- | :--------------------------------------- |
| dataSource   | CascaderOption[]                 | []                                                       | 数据源                                   |
| defaultValue | CascaderValue[]                  | -                                                        | 初始值                                   |
| value        | CascaderValue[]                  | -                                                        | 值                                       |
| fieldNames   | object                           | { label: `label`, value: `value`, children: `children` } | 自定义节点 label、value、children 的字段 |
| itemRender   | (data?: object) => data.label    | (data?: object) => data.label                            | 单个选项的展示                           |
| onChange     | (value: CascaderValue[]) => void | -                                                        | 值变化时触发的回调函数                   |

### CascaderValue

`string | number`

### CascaderOption

| 属性     | 类型             | 默认值 | 说明         |
| :------- | :--------------- | :----- | :----------- |
| value    | CascaderValue    | -      | 选项值       |
| label    | React.ReactNode  | -      | 选项显示名称 |
| children | CascaderOption[] | -      | 子选项       |

## CSS 变量

| 属性                       | 默认值                        | 说明             |
| :------------------------- | :---------------------------- | :--------------- |
| --background-color         | '#fff'                        | 弹层背景色       |
| --option-font-size         | 'var(--za-font-size-sm)'      | 选项字体大小     |
| --option-height            | '44px'                        | 选项高度         |
| --options-height           | 'auto'                        | 选项面板高度     |
| --option-text-color        | '--za-color-text'             | 选项文字颜色     |
| --option-active-text-color | '--za-theme-primary'          | 选项选中文字颜色 |
| --tab-text-color           | '--za-color-text-placeholder' | 标签文字颜色     |
| --tab-active-text-color    | '--za-theme-primary'          | 标签选中文字颜色 |
| --padding                  | '--za-padding-v-sm'           | 选项内边距       |
