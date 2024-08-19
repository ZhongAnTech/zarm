# Picker 选择器

## 基本用法

```jsx
import { useEffect, useRef, useReducer } from 'react';
import { List, Button, Picker, Toast } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
  { value: '4', label: '选项四' },
  { value: '5', label: '选项五' },
];

// 普通多列数据
const MULTI_DATA = [
  [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ],
  [
    { value: '3', label: '选项A' },
    { value: '4', label: '选项B' },
  ],
];

// 级联数据
const CASCADE_DATA = [
  {
    value: '1',
    label: '北京市',
    children: [
      { value: '11', label: '海淀区' },
      { value: '12', label: '西城区' },
    ],
  },
  {
    value: '2',
    label: '上海市',
    children: [
      { value: '21', label: '杨浦区' },
      { value: '22', label: '静安区' },
    ],
  },
];

// 自定义
const DIY_DATA = [
  {
    code: '1',
    name: '北京市',
    options: [
      { code: '11', name: '海淀区' },
      { code: '12', name: '西城区' },
    ],
  },
  {
    code: '2',
    name: '上海市',
    options: [
      { code: '21', name: '黄埔区' },
      { code: '22', name: '虹口区' },
    ],
  },
];

const initState = {
  single: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
  multi: {
    visible: false,
    value: [],
    dataSource: MULTI_DATA,
  },
  cascade: {
    visible: false,
    value: [],
    dataSource: CASCADE_DATA,
  },
  diy: {
    visible: false,
    value: [],
    dataSource: [],
  },
  specDOM: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
};

const reducer = (state, action) => {
  const { type, key, value, fieldNames, dataSource } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        },
      };

    case 'value':
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
        },
      };

    case 'fieldNames':
      return {
        ...state,
        [key]: {
          ...state[key],
          fieldNames,
        },
      };

    case 'dataSource':
      return {
        ...state,
        [key]: {
          ...state[key],
          dataSource,
        },
      };

    default:
  }
};

const Demo = () => {
  const myRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);

  const setVisible = (key) => {
    dispatch({ type: 'visible', key });
  };

  const setValue = (key, value) => {
    dispatch({ type: 'value', key, value });
  };

  const setFieldNames = (key, fieldNames) => {
    dispatch({ type: 'fieldNames', key, fieldNames });
  };

  const setDataSource = (key, value) => {
    dispatch({ type: 'dataSource', key, dataSource: value });
  };

  useEffect(() => {
    // 异步加载数据源测试
    setTimeout(() => {
      setValue('diy', ['1', '12']);
      setDataSource('diy', DIY_DATA);
      setFieldNames('diy', { value: 'code', children: 'options' });
    }, 0);
  }, []);

  return (
    <>
      <List>
        <List.Item
          title="单列"
          suffix={
            <Button size="xs" onClick={() => setVisible('single')}>
              选择
            </Button>
          }
        />
        <List.Item
          title="多列"
          suffix={
            <Button size="xs" onClick={() => setVisible('multi')}>
              选择
            </Button>
          }
        />
        <List.Item
          title="级联"
          suffix={
            <Button size="xs" onClick={() => setVisible('cascade')}>
              选择
            </Button>
          }
        />
        <List.Item
          title="自定义"
          suffix={
            <Button size="xs" onClick={() => setVisible('diy')}>
              选择
            </Button>
          }
        />
        <List.Item
          title="挂载到指定dom节点"
          suffix={
            <Button size="xs" onClick={() => setVisible('specDOM')}>
              选择
            </Button>
          }
        />
      </List>

      <Picker
        visible={state.single.visible}
        value={state.single.value}
        dataSource={state.single.dataSource}
        onConfirm={(changedValue, items) => {
          console.log('Single Picker onConfirm: ', items);
          Toast.show(JSON.stringify(items));
          setValue('single', changedValue);
          setVisible('single');
        }}
        onCancel={() => setVisible('single')}
      />

      <Picker
        visible={state.multi.visible}
        value={state.multi.value}
        dataSource={state.multi.dataSource}
        onConfirm={(changedValue, items) => {
          console.log('Multi Picker onConfirm: ', items);
          Toast.show(JSON.stringify(items));
          setValue('multi', changedValue);
          setVisible('multi');
        }}
        onCancel={() => setVisible('multi')}
      />

      <Picker
        visible={state.cascade.visible}
        value={state.cascade.value}
        dataSource={state.cascade.dataSource}
        onConfirm={(changedValue, items) => {
          console.log('Cascade Picker onConfirm: ', items);
          Toast.show(JSON.stringify(items));
          setValue('cascade', changedValue);
          setVisible('cascade');
        }}
        onCancel={() => setVisible('cascade')}
      />

      <Picker
        visible={state.diy.visible}
        title="custom title"
        cancelText="Cancel"
        confirmText="Ok"
        fieldNames={state.diy.fieldNames}
        dataSource={state.diy.dataSource}
        value={state.diy.value}
        itemRender={(data) => data.name}
        onConfirm={(changedValue, items) => {
          console.log('DIY Picker onConfirm: ', items);
          Toast.show(JSON.stringify(items));
          setValue('diy', changedValue);
          setVisible('diy');
        }}
        onCancel={() => setVisible('diy')}
      />

      <Picker
        visible={state.specDOM.visible}
        value={state.specDOM.value}
        dataSource={state.specDOM.dataSource}
        onConfirm={(changedValue, items) => {
          console.log('Picker onConfirm: ', items);
          Toast.show(JSON.stringify(items));
          setValue('specDOM', changedValue);
          setVisible('specDOM');
        }}
        onCancel={() => setVisible('specDOM')}
        mountContainer={() => myRef.current}
      />

      <div id="test-div" ref={myRef} />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## Select 表单选择器

```jsx
import { useState, useEffect } from 'react';
import { Select, List } from 'zarm';

// 级联数据
const CASCADE_DATA = [
  {
    value: '1',
    label: '北京市',
    children: [
      { value: '11', label: '海淀区' },
      { value: '12', label: '西城区' },
    ],
  },
  {
    value: '2',
    label: '上海市',
    children: [
      { value: '21', label: '杨浦区' },
      { value: '22', label: '静安区' },
    ],
  },
];

const Demo = () => {
  const [value, setValue] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [wheelDefaultValue, setWheelDefaultValue] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(CASCADE_DATA);
      setWheelDefaultValue(['1', '12']);
    }, 0);
  }, []);

  return (
    <List>
      <List.Item title="城市">
        <Select
          value={value}
          wheelDefaultValue={wheelDefaultValue}
          dataSource={dataSource}
          onConfirm={(changedValue, items) => {
            console.log('Select onConfirm: ', items);
            setValue(changedValue);
          }}
        />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 指令式调用

```jsx
import { useState, useEffect } from 'react';
import { List, Picker, Button, Toast } from 'zarm';

// 级联数据
const PROMPT_DATA = [
  {
    value: 1,
    label: '北京市',
    children: [
      { value: 11, label: '海淀区' },
      { value: 12, label: '西城区' },
    ],
  },
  {
    value: 2,
    label: '上海市',
    children: [
      { value: 21, label: '杨浦区' },
      { value: 22, label: '静安区' },
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
              const { value: changedValue, items } = await Picker.prompt({
                value,
                dataSource: PROMPT_DATA,
              });
              if (!changedValue) return;
              setValue(changedValue);
              Toast.show(JSON.stringify(items));
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

## PickerView 平铺选择器

```jsx
import { useState, useEffect } from 'react';
import { PickerView } from 'zarm';

// 级联数据
const CASCADE_DATA = [
  {
    code: '1',
    label: '北京市',
    children: [
      { code: '11', label: '海淀区' },
      { code: '12', label: '西城区' },
    ],
  },
  {
    code: '2',
    label: '上海市',
    children: [
      { code: '21', label: '杨浦区' },
      { code: '22', label: '静安区' },
    ],
  },
];

const Demo = () => {
  const [value, setValue] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [fieldNames, setFieldNames] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setValue(['1', '12']);
      setFieldNames({ value: 'code' });
      setDataSource(CASCADE_DATA);
    }, 0);
  }, []);

  return (
    <PickerView
      value={value}
      fieldNames={fieldNames}
      dataSource={dataSource}
      onChange={(changedValue, items) => {
        console.log('PickerView onChange: ', items);
        setValue(changedValue);
      }}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性              | 类型                                                          | 默认值                                                   | 说明                                     |
| :---------------- | :------------------------------------------------------------ | :------------------------------------------------------- | :--------------------------------------- |
| dataSource        | (PickerViewColumnItem \| PickerViewOption)[]                  | []                                                       | 数据源                                   |
| value             | PickerValue \| PickerValue[]                                  | -                                                        | 值                                       |
| defaultValue      | PickerValue \| PickerValue[]                                  | -                                                        | 初始值                                   |
| wheelDefaultValue | PickerValue \| PickerValue[]                                  | -                                                        | 滚轮初始停留的位置                       |
| fieldNames        | object                                                        | { label: `label`, value: `value`, children: `children` } | 自定义节点 label、value、children 的字段 |
| itemRender        | (item: PickerViewColumnItem) => ReactNode                     | (data) => data.label                                     | 单个选项的展示                           |
| disabled          | boolean                                                       | false                                                    | 是否禁用                                 |
| cols              | number                                                        | Infinity                                                 | 级联选择器的级数                         |
| onChange          | (value: PickerValue[], items: PickerViewColumnItem[]) => void | -                                                        | 值变化时触发的回调函数                   |

### 仅 Picker & Select 支持的属性

| 属性           | 类型                                                          | 默认值              | 说明                                           |
| :------------- | :------------------------------------------------------------ | :------------------ | :--------------------------------------------- |
| title          | string                                                        | '请选择'            | 选择器标题                                     |
| confirmText    | string                                                        | '确定'              | 确定栏文字                                     |
| cancelText     | string                                                        | '取消'              | 取消栏文字                                     |
| maskClosable   | boolean                                                       | true                | 是否点击遮罩层时关闭，需要和 onCancel 一起使用 |
| destroy        | boolean                                                       | false               | 弹层关闭后是否移除节点                         |
| safeArea       | boolean                                                       | false               | 是否适配安全区域                               |
| onConfirm      | (value: PickerValue[], items: PickerViewColumnItem[]) => void | -                   | 点击确定时触发的回调函数                       |
| onCancel       | () => void                                                    | -                   | 点击取消时触发的回调函数                       |
| mountContainer | MountContainer                                                | () => document.body | 指定 Picker 挂载的 HTML 节点                   |

### 指令式调用

Picker 支持指令式调用，提供了 `prompt` 方法

```tsx
prompt: (props: Omit<PickerProps, 'visible' | 'children'>) =>
  Promise<PickerValue[] | null>;
```

`prompt` 方法的返回值是一个 Promise，如果用户点击了确定，从 Promise 中可以解析到 `PickerValue[]`，而如果用户是触发的取消操作，那么 Promise 中的值是 `null`。你可以通过 `await` 或 `.then()` 来获取到其中的值：

```tsx
const value = await Picker.prompt({
  dataSource: dataSourceConfig,
});

Picker.prompt({
  columns: dataSourceConfig,
}).then((value) => {
  // ...
});
```

### 仅 Picker 支持的属性

| 属性    | 类型    | 默认值 | 说明     |
| :------ | :------ | :----- | :------- |
| visible | boolean | false  | 是否展示 |

### 仅 Select 支持的属性

| 属性          | 类型                                            | 默认值                                         | 说明         |
| :------------ | :---------------------------------------------- | :--------------------------------------------- | :----------- |
| placeholder   | string                                          | '请选择'                                       | 输入提示信息 |
| displayRender | (selected: PickerViewColumnItem[]) => ReactNode | selected => dataSource.map(item => item.label) | 所选值的展示 |

### PickerValue

`string | number | boolean`

### PickerViewColumnItem

| 属性  | 类型            | 默认值 | 说明         |
| :---- | :-------------- | :----- | :----------- |
| value | PickerValue     | -      | 选项值       |
| label | React.ReactNode | -      | 选项显示名称 |

### PickerViewOption

| 属性     | 类型               | 默认值 | 说明         |
| :------- | :----------------- | :----- | :----------- |
| value    | PickerValue        | -      | 选项值       |
| label    | React.ReactNode    | -      | 选项显示名称 |
| children | PickerViewOption[] | -      | 子选项       |

## CSS 变量

### PickerView

| 属性                                | 默认值                          | 说明                 |
| :---------------------------------- | :------------------------------ | :------------------- |
| --background                        | '#fff'                          | 内容区域背景         |
| --padding                           | '16px'                          | 内容区域内边距       |
| --mask-start-background             | 'rgba(255, 255, 255, 0.4)'      | 内容区域头部蒙层背景 |
| --mask-end-background               | 'rgba(255, 255, 255, 0.8)'      | 内容区域底部蒙层背景 |
| --wheel-item-rows                   | 5                               | 滚轮元素长度         |
| --wheel-item-height                 | '34px'                          | 滚轮元素高度         |
| --wheel-item-font-size              | '20px'                          | 滚轮元素文字大小     |
| --wheel-item-text-color             | 'var(--za-color-text)'          | 滚轮元素文字颜色     |
| --wheel-item-disabled-text-color    | 'var(--za-color-text-disabled)' | 滚轮元素文字禁用颜色 |
| --wheel-item-selected-background    | 'rgba(116, 116, 128, 0.08)'     | 滚轮元素文字选中背景 |
| --wheel-item-selected-border-radius | '7px'                           | 滚轮元素文字选中圆角 |

### Picker

| 属性                                | 默认值                          | 说明                 |
| :---------------------------------- | :------------------------------ | :------------------- |
| --header-height                     | '45px'                          | 头部高度             |
| --header-font-size                  | '16px'                          | 头部文字大小         |
| --header-background                 | '#f7f7f7'                       | 头部背景             |
| --header-title-text-color           | 'var(--za-color-text)'          | 头部标题文字颜色     |
| --header-submit-text-color          | 'var(--za-theme-primary)'       | 头部提交按钮文字颜色 |
| --header-cancel-text-color          | 'var(--za-color-text-caption)'  | 头部取消按钮文字颜色 |
| --content-background                | '#fff'                          | 内容区域背景         |
| --content-padding                   | '16px'                          | 内容区域内边距       |
| --content-mask-start-background     | 'rgba(255, 255, 255, 0.4)'      | 内容区域头部蒙层背景 |
| --content-mask-end-background       | 'rgba(255, 255, 255, 0.8)'      | 内容区域底部蒙层背景 |
| --wheel-item-rows                   | 5                               | 滚轮元素长度         |
| --wheel-item-height                 | '34px'                          | 滚轮元素高度         |
| --wheel-item-font-size              | '20px'                          | 滚轮元素文字大小     |
| --wheel-item-text-color             | 'var(--za-color-text)'          | 滚轮元素文字颜色     |
| --wheel-item-disabled-text-color    | 'var(--za-color-text-disabled)' | 滚轮元素文字禁用颜色 |
| --wheel-item-selected-background    | 'rgba(116, 116, 128, 0.08)'     | 滚轮元素文字选中背景 |
| --wheel-item-selected-border-radius | '7px'                           | 滚轮元素文字选中圆角 |

### Select

| 属性                | 默认值                             | 说明               |
| :------------------ | :--------------------------------- | :----------------- |
| --header-height     | '45px'                             | 头部高度           |
| --height            | '28px'                             | 输入框高度         |
| --disabled-color    | 'var(--za-color-text-disabled)'    | 输入框禁用文字颜色 |
| --placeholder-color | 'var(--za-color-text-placeholder)' | 输入框占位文字颜色 |
| --arrow-color       | 'var(--za-arrow-color)'            | 输入框箭头         |
| --arrow-size        | 'var(--za-arrow-size)'             | 输入框箭头尺寸     |
| --arrow-width       | 'var(--za-arrow-width)'            | 输入框箭头宽度     |
