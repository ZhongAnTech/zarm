# Calendar 日历

## 平铺选择

```jsx
import { useState } from 'react';
import { Radio, DateSelect, List, Calendar } from 'zarm';

const Demo = () => {
  const [multiple, setMultiple] = useState(true);
  const [value, setValue] = useState(['2020-07-29', '2020-08-04']);
  const [min, setMin] = useState('2017-12-29');
  const [max, setMax] = useState('2020-08-04');
  const [custom, setCustom] = useState(false);

  return (
    <>
      <List>
        <List.Item title="是否多选">
          <Radio.Group
            buttonCompact
            type="button"
            value={multiple}
            onChange={(value) => {
              setMultiple(value);
            }}
          >
            <Radio value={false}>单选</Radio>
            <Radio value={true}>双选</Radio>
          </Radio.Group>
        </List.Item>
        <List.Item title="最小日期">
          <DateSelect placeholder="Please input start date" mode="date" value={min} onOk={setMin} />
        </List.Item>
        <List.Item title="最大日期">
          <DateSelect placeholder="Please input end date" mode="date" value={max} onOk={setMax} />
        </List.Item>
        <List.Item title="自定义渲染">
          <Radio.Group
            buttonCompact
            type="button"
            value={custom}
            onChange={(value) => {
              setCustom(value);
            }}
          >
            <Radio value={false}>否</Radio>
            <Radio value={true}>是</Radio>
          </Radio.Group>
        </List.Item>
      </List>

      <Calendar
        multiple={multiple}
        value={value}
        min={min}
        max={max}
        dateRender={(date) => {
          if (custom && /(0|6)/.test(date.getDay())) {
            return (
              <div className="custom">
                <div className="custom__date">{date.getDate()}</div>
                <div className="custom__text">Closed</div>
              </div>
            );
          }
          return date.getDate();
        }}
        disabledDate={(date) => {
          if (custom) return /(0|6)/.test(date.getDay());
          return false;
        }}
        onChange={(value) => {
          setValue(value);
          console.log('onChange', value);
        }}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                     | 默认值                   | 说明                             |
| :----------- | :----------------------- | :----------------------- | :------------------------------- |
| value        | Date \| Date[]           | -                        | 值                               |
| defaultValue | Date \| Date[]           | -                        | 初始值                           |
| min          | Date                     | new Date()               | 最小可选日期                     |
| max          | Date                     | min + 1 年               | 最大可选日期                     |
| multiple     | boolean                  | false                    | 是否双选                         |
| dateRender   | (date?: Date) => void    | (date) => date.getDate() | 日期渲染函数                     |
| disabledDate | (date?: Date) => boolean | () => false              | 日期是否禁止选择                 |
| onChange     | (value?: Date[]) => void | -                        | 日期选择发生变化时触发的回调函数 |
