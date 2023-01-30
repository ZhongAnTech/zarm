# DatePicker 日期选择器

## 基本用法

```jsx
import { useRef, useReducer } from 'react';
import { List, Button, DatePicker, Toast } from 'zarm';

const currentYear = new Date().getFullYear();
const initialValue = {
  basic: {
    title: '选择日期',
  },
  range: {
    title: '自定义范围',
    props: {
      min: new Date(new Date().setFullYear(currentYear - 3)),
      max: new Date(new Date().setFullYear(currentYear + 3)),
    },
  },
  filter: {
    title: '自定义过滤规则',
    props: {
      filter: (type, { value }) => {
        if (type === 'day') return value % 5 === 0;
        return true;
      },
    },
  },
};

const reducer = (state, action) => {
  const { type, key, value } = action;

  const item = state[key];
  const props = item?.props;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...item,
          props: {
            ...props,
            visible: !props?.visible,
          },
        },
      };

    case 'value':
      return {
        ...state,
        [key]: {
          ...item,
          props: {
            ...props,
            value,
          },
        },
      };

    default:
  }
};

const Demo = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

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
    <List>
      {Object.entries(state).map(([key, item], index) => (
        <div key={key}>
          <List.Item
            title={item.title}
            suffix={
              <Button size="xs" onClick={() => toggle(key)}>
                选择
              </Button>
            }
          />
          <DatePicker
            {...item.props}
            onChange={(value) => console.log('DatePicker', key, value)}
            onConfirm={(value) => {
              setValue(key, value);
              toggle(key);
              Toast.show(value.toLocaleString());
            }}
            onCancel={() => toggle(key)}
          />
        </div>
      ))}
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 日期类型

```jsx
import { useRef, useReducer } from 'react';
import { List, Button, DatePicker, Toast } from 'zarm';

const currentYear = new Date().getFullYear();
const initialValue = {
  year: {
    title: '年',
    props: {
      columnType: ['year'],
    },
  },
  yearMonth: {
    title: '年月',
    props: {
      columnType: ['year', 'month'],
    },
  },
  month: {
    title: '月',
    props: {
      columnType: ['month'],
    },
  },
  week: {
    title: '周',
    props: {
      columnType: ['year', 'week'],
      value: new Date(2026, 11, 27)
    },
  },
  date: {
    title: '日期',
  },
  time: {
    title: '时间',
    props: {
      columnType: ['hour', 'minute', 'second'],
      value: new Date(new Date().setHours(0, 0, 0)),
    },
  },
  datetime: {
    title: '日期时间',
    props: {
      columnType: ['year', 'month', 'day', 'hour', 'minute'],
    },
  },
  datetime: {
    title: '12小时制',
    props: {
      columnType: ['meridiem', 'hour', 'minute'],
    },
  },
};

const reducer = (state, action) => {
  const { type, key, value } = action;

  const item = state[key];
  const props = item?.props;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...item,
          props: {
            ...props,
            visible: !props?.visible,
          },
        },
      };

    case 'value':
      return {
        ...state,
        [key]: {
          ...item,
          props: {
            ...props,
            value,
          },
        },
      };

    default:
  }
};

const Demo = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

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
    <List>
      {Object.entries(state).map(([key, item], index) => (
        <div key={key}>
          <List.Item
            title={item.title}
            suffix={
              <Button size="xs" onClick={() => toggle(key)}>
                选择
              </Button>
            }
          />
          <DatePicker
            {...item.props}
            onChange={(value) => console.log('DatePicker', key, value)}
            onConfirm={(value) => {
              setValue(key, value);
              toggle(key);
              Toast.show(value.toLocaleString());
            }}
            onCancel={() => toggle(key)}
          />
        </div>
      ))}
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## DateSelect 表单日期选择器

```jsx
import { useState } from 'react';
import { List, DateSelect } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item title="日期选择">
        <DateSelect onChange={(value) => console.log('DateSelect', value)} />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 指令式调用

```jsx
import { useState } from 'react';
import { DatePicker, List, Button, Toast } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState();

  return (
    <>
      <List>
        <List.Item
          title="选择日期"
          suffix={
            <Button
              size="xs"
              onClick={async () => {
                const { value: changedValue } = await DatePicker.prompt({
                  value,
                });
                if (!changedValue) return;
                setValue(changedValue);
                console.log(changedValue);
                Toast.show(JSON.stringify(changedValue));
              }}
            >
              选择
            </Button>
          }
        ></List.Item>
      </List>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## DatePickerView 平铺选择器

```jsx
import { useState } from 'react';
import { DatePickerView, List } from 'zarm';

const Demo = () => {
  return (
    <DatePickerView
      onChange={(value) => {
        console.log('DatePickerView', value);
      }}
    />
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                                                        | 默认值                   | 说明                   |
| :----------- | :---------------------------------------------------------- | :----------------------- | :--------------------- |
| value        | Date                                                        | -                        | 值                     |
| defaultValue | Date                                                        | -                        | 初始值                 |
| columnType   | ColumnType[]                                                | ['year', 'month', 'day'] | 指定列选择类型         |
| min          | Date                                                        | -                        | 相应 mode 的最小时间   |
| max          | Date                                                        | -                        | 相应 mode 的最大时间   |
| disabled     | boolean                                                     | false                    | 是否禁用               |
| filter       | (type: ColumnType, {value: number, date: Date} ) => boolean | -                        | 选项过滤函数           |
| renderLabel  | (type: ColumnType, value: number) => React.ReactNode        | -                        | 单个选项的展示         |
| onChange     | (value: Date) => void                                       | -                        | 值变化时触发的回调函数 |

### 指令式调用

DatePicker 支持指令式调用，提供了 `prompt` 方法

```tsx
prompt: (props: Omit<DatePickerProps, 'visible' | 'visible' | 'children'>) =>
  Promise<DatePickerValue[] | null>;
```

`prompt` 方法的返回值是一个 Promise，如果用户点击了确定，从 Promise 中可以解析到 `DatePickerValue[]`，而如果用户是触发的取消操作，那么 Promise 中的值是 `null`。你可以通过 `await` 或 `.then()` 来获取到其中的值：

```tsx
const value = await DatePicker.prompt();

DatePicker.prompt().then((value) => {
  // ...
});
```

### 仅 DatePicker & DateSelect 支持的属性

| 属性              | 类型                            | 默认值              | 说明                                           |
| :---------------- | :------------------------------ | :------------------ | :--------------------------------------------- |
| visible           | boolean                         | false               | 是否展示                                       |
| title             | string                          | '请选择'            | 选择器标题                                     |
| cancelText        | string                          | '取消'              | 取消栏文字                                     |
| confirmText       | string                          | '确定'              | 确定栏文字                                     |
| maskClosable      | boolean                         | true                | 是否点击遮罩层时关闭，需要和 onCancel 一起使用 |
| wheelDefaultValue | string \| Date                  | -                   | 滚轮默认停留的日期位置                         |
| onConfirm         | (value: Date \| string) => void | -                   | 点击确定时触发的回调函数                       |
| onCancel          | () => void                      | -                   | 点击取消时触发的回调函数                       |
| mountContainer    | MountContainer                  | () => document.body | 指定 DatePicker 挂载的 HTML 节点               |

### 仅 DateSelect 支持的属性

| 属性        | 类型   | 默认值   | 说明         |
| :---------- | :----- | :------- | :----------- |
| placeholder | string | '请选择' | 输入提示信息 |

### ColumnType

year | month | day | meridiem | hour | minute | second | week | week-day
