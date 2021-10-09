# StackPicker 层叠选择器

## 基本用法

```jsx
import { useState } from 'react';
import { StackPicker, List, Button } from 'zarm';

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
          after={
            <Button size="xs" onClick={() => setVisible(true)}>
              选择
            </Button>
          }
        >
          {value.join(',')}
        </List.Item>
      </List>

      <StackPicker
        maskClosable
        visible={visible}
        value={value}
        title="层叠选择器"
        dataSource={District}
        onChange={(value) => {
          console.log('onChange', value);
        }}
        onOk={(value) => {
          console.log('onOk', value);
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

## API

| 属性          | 类型                                                                      | 默认值                                       | 说明                                           |
| :------------ | :------------------------------------------------------------------------ | :------------------------------------------- | :--------------------------------------------- |
| visible       | boolean                                                                   | false                                        | 是否展示                                       |
| dataSource    | object[]                                                                  | []                                           | 数据源                                         |
| defaultValue  | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | -                                            | 初始值                                         |
| value         | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | -                                            | 值                                             |
| displayMember | string                                                                    | 'label'                                      | 键字段对应的 key                               |
| valueMember   | string                                                                    | 'value'                                      | 值字段对应的 key                               |
| displayRender | (selected?: object) => string                                             | selected => selected.map(item => item.label) | 所选值的展示                                   |
| itemRender    | (data?: object) => data.label                                             | (data?: object) => data.label                | 单个选项的展示                                 |
| title         | string                                                                    | '请选择'                                     | 选择器标题                                     |
| okText        | string                                                                    | '确定'                                       | 确定栏文字                                     |
| cancelText    | string                                                                    | '取消'                                       | 取消栏文字                                     |
| maskClosable  | boolean                                                                   | true                                         | 是否点击遮罩层时关闭，需要和 onCancel 一起使用 |
| onChange      | (value: string[]) => void                                                 | -                                            | 值变化时触发的回调函数                         |
| onOk          | (value: string[]) => void                                                 | -                                            | 点击确定时触发的回调函数                       |
| onCancel      | () => void                                                                | -                                            | 点击取消时触发的回调函数                       |
