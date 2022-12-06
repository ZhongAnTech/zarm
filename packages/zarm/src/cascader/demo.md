# Cascader 级联选择器

## 基本用法

```jsx
import { useState } from 'react';
import { Cascader, List, Button } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);
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
    <>
      <List>
        <List.Item
          title="普通"
          suffix={
            <Button size="xs" onClick={() => setVisible(true)}>
              选择
            </Button>
          }
        >
          {value.join(',')}
        </List.Item>
      </List>

      <Cascader
        maskClosable
        visible={visible}
        value={value}
        title="级联选择器"
        dataSource={District}
        onChange={(value) => {
          console.log('onChange', value);
        }}
        onConfirm={(value) => {
          console.log('onConfirm', value);
          setValue(value);
          setVisible(false);
        }}
        onCancel={() => {
          console.log('onCancel');
          setVisible(false);
        }}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 指令式调用

```jsx
import { useState, useEffect } from 'react';
import { List, Cascader, Button, Toast } from 'zarm';

const PROMPT_DATA = [
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

const Demo = () => {
  const [value, setValue] = useState([]);

  return (
    <List>
      <List.Item
        title="选择城市"
        suffix={
          <Button
            size="xs"
            onClick={async () => {
              const { value: changedValue } = await Cascader.prompt({
                value,
                dataSource: PROMPT_DATA,
              });
              if (!changedValue) return;
              setValue(changedValue);
              Toast.show(JSON.stringify(changedValue));
            }}
          >
            选择
          </Button>
        }
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## CascaderView 级联选择视图

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

### 仅 Cascader 支持的属性

| 属性         | 类型                             | 默认值   | 说明                                           |
| :----------- | :------------------------------- | :------- | :--------------------------------------------- |
| visible      | boolean                          | false    | 是否展示                                       |
| title        | string                           | '请选择' | 选择器标题                                     |
| confirmText  | string                           | '确定'   | 确定栏文字                                     |
| cancelText   | string                           | '取消'   | 取消栏文字                                     |
| maskClosable | boolean                          | true     | 是否点击遮罩层时关闭，需要和 onCancel 一起使用 |
| onConfirm    | (value: CascaderValue[]) => void | -        | 点击确定时触发的回调函数                       |
| onCancel     | () => void                       | -        | 点击取消时触发的回调函数                       |

### CascaderValue

`string | number`

### CascaderOption

| 属性     | 类型             | 默认值 | 说明         |
| :------- | :--------------- | :----- | :----------- |
| value    | CascaderValue    | -      | 选项值       |
| label    | React.ReactNode  | -      | 选项显示名称 |
| children | CascaderOption[] | -      | 子选项       |

## CSS 变量

### 仅 CascaderView 支持

| 属性               | 默认值                   | 说明         |
| :----------------- | :----------------------- | :----------- |
| --background-color | '#fff'                   | 弹层背景色   |
| --option-font-size | 'var(--za-font-size-sm)' | 选项字体大小 |
| --option-height    | '44px'                   | 选项高度     |
| --options-height   | 'auto'                   | 选项面板高度 |
