# DatePicker 日期选择器

## 基本用法

```jsx
import { useRef, useReducer } from 'react';
import { List, Button, DatePicker, Toast } from 'zarm';

const initState = {
  date: {
    visible: false,
    value: '',
    wheelDefaultValue: '2018-09-13',
  },
  time: {
    visible: false,
    value: '',
  },
  limitDate: {
    visible: false,
    value: '2017-09-13',
  },
  specDOM: {
    visible: false,
    value: '',
  },
};

const reducer = (state, action) => {
  const { type, key, value } = action;

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

    default:
  }
};

const Demo = () => {
  const myRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);
  const toast = Toast.useToast();

  const setValue = (key, value) => {
    dispatch({ type: 'value', key, value });
  };

  const toggle = (key) => {
    dispatch({
      type: 'visible',
      key,
    });
  };

  return (
    <>
      <List>
        <List.Item
          after={
            <Button size="xs" onClick={() => toggle('date')}>
              选择
            </Button>
          }
        >
          选择日期
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => toggle('time')}>
              选择
            </Button>
          }
        >
          选择时间
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => toggle('limitDate')}>
              选择
            </Button>
          }
        >
          选择日期(自定义)
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => toggle('specDOM')}>
              选择
            </Button>
          }
        >
          挂载到指定dom节点
        </List.Item>
      </List>

      <DatePicker
        visible={state.date.visible}
        mode="date"
        value={state.date.value}
        wheelDefaultValue={state.date.wheelDefaultValue}
        onOk={(value) => {
          setValue('date', value);
          toggle('date');
          toast.show(JSON.stringify(value));
        }}
        onCancel={() => toggle('date')}
      />

      <DatePicker
        visible={state.time.visible}
        mode="time"
        value={state.time.value}
        onOk={(value) => {
          setValue('time', value);
          toggle('time');
          toast.show(JSON.stringify(value));
        }}
        onCancel={() => toggle('time')}
      />

      <DatePicker
        visible={state.limitDate.visible}
        title="选择日期"
        okText="确定"
        cancelText="取消"
        mode="date"
        min="2007-01-03"
        max="2019-11-23"
        value={state.limitDate.value}
        onOk={(value) => {
          setValue('limitDate', value);
          toggle('limitDate');
          toast.show(JSON.stringify(value));
        }}
        onCancel={() => toggle('limitDate')}
      />

      <DatePicker
        visible={state.specDOM.visible}
        value={state.specDOM.value}
        onOk={(value) => {
          setValue('specDOM', value);
          toggle('specDOM');
          toast.show(JSON.stringify(value));
        }}
        onCancel={() => toggle('specDOM')}
        getContainer={() => myRef.current}
      />

      <div ref={myRef} id="test-div" style={{ position: 'relative', zIndex: 1 }} />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## DateSelect 表单日期选择器

```jsx
import { useState } from 'react';
import { List, DateSelect } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <List>
      <List.Item title="日期选择">
        <DateSelect
          className="test-dateSelect"
          title="选择日期"
          placeholder="请选择日期"
          mode="date"
          min="1974-05-16"
          max="2027-05-15"
          value={value}
          onOk={(value) => {
            console.log('DateSelect onOk: ', value);
            setValue(value);
          }}
        />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## DatePickerView 平铺选择器

```jsx
import { useState } from 'react';
import { DatePickerView } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <DatePickerView
      mode="datetime"
      value={value}
      min="2018-1-13"
      onChange={(value) => {
        console.log('datePickerView => ', value);
        setValue(value);
      }}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                   | 默认值 | 说明                                                                 |
| :----------- | :--------------------- | :----- | :------------------------------------------------------------------- |
| value        | string \| Date         | -      | 值                                                                   |
| defaultValue | string \| Date         | -      | 初始值                                                               |
| mode         | string                 | 'date' | 指定日期选择模式，可选项 `year`, `month`, `date`, `time`, `datetime` |
| min          | string \| Date         | -      | 相应 mode 的最小时间                                                 |
| max          | string \| Date         | -      | 相应 mode 的最大时间                                                 |
| minuteStep   | number                 | 1      | 分钟间隔                                                             |
| disabled     | boolean                | false  | 是否禁用                                                             |
| onChange     | (value?: Date) => void | -      | 值变化时触发的回调函数                                               |

### 仅 DatePicker & DateSelect 支持的属性

| 属性              | 类型                                 | 默认值        | 说明                                           |
| :---------------- | :----------------------------------- | :------------ | :--------------------------------------------- |
| visible           | boolean                              | false         | 是否展示                                       |
| title             | string                               | '请选择'      | 选择器标题                                     |
| cancelText        | string                               | '取消'        | 取消栏文字                                     |
| okText            | string                               | '确定'        | 确定栏文字                                     |
| maskClosable      | boolean                              | true          | 是否点击遮罩层时关闭，需要和 onCancel 一起使用 |
| wheelDefaultValue | string \| Date                       | -             | 滚轮默认停留的日期位置                         |
| onOk              | (value?: Date) => void               | -             | 点击确定时触发的回调函数                       |
| onCancel          | () => void                           | -             | 点击取消时触发的回调函数                       |
| mountContainer    | HTMLElement &#124; () => HTMLElement | document.body | 指定 DatePicker 挂载的 HTML 节点               |

### 仅 DateSelect 支持的属性

| 属性        | 类型   | 默认值   | 说明                                                                                                 |
| :---------- | :----- | :------- | :--------------------------------------------------------------------------------------------------- |
| placeholder | string | '请选择' | 输入提示信息                                                                                         |
| format      | string | -        | 格式化显示值。例：format="yyyy 年 MM 月 dd 日"<br /> 年:`yyyy`, 月:`MM`, 日:`dd`, 时:`hh`, 分:`mm`。 |
