# Calendar 日历

## 平铺选择

```jsx
import { useState } from 'react';
import { Button, Select, DateSelect, Icon, Input, Cell, Calendar } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [multiple, setMultiple] = useState(true);
  const [value, setValue] = useState(['2020-07-29', '2020-08-04']);
  const [min, setMin] = useState('2017-12-29');
  const [max, setMax] = useState('2020-08-04');

  return (
    <>
      <Cell title="multiple">
        <Select
          visible={visible}
          placeholder="multiple"
          value={multiple}
          dataSource={[
            {
              value: false,
              label: '单选'
            },
            {
              value: true,
              label: '双选'
            }
          ]}
          onOk={(selected) => {
            setMultiple(!!selected[0].value);
          }}
        />
      </Cell>
      <Cell title="min">
        <DateSelect
          placeholder="Please input start date"
          mode="date"
          value={min}
          onOk={setMin}
        />
      </Cell>
      <Cell title="max">
        <DateSelect
          placeholder="Please input end date"
          mode="date"
          value={max}
          onOk={setMax}
        />
      </Cell>
      <Calendar
        visible={visible}
        multiple={multiple}
        value={value}
        min={min}
        max={max}
        dateRender={(date) => {
          if (/(0|6)/.test(date.getDay())) {
            return (
              <div className="custom">
                <div className="custom__date">{date.getDate()}</div>
                <div className="custom__text">Closed</div>
              </div>
            );
          }
          return date.getDate();
        }}
        disabledDate={(date) => /(0|6)/.test(date.getDay())}
        onChange={(value) => {
          setValue(value);
          console.log('onChange', value);
        }}
      />
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | Date \| Date[] | - | 值 |
| defaultValue | Date \| Date[] | - | 初始值 |
| min | Date | new Date() | 最小可选日期 |
| max | Date | min + 1 年 | 最大可选日期 |
| multiple | boolean | false | 是否双选 |
| dateRender | (date?: Date) => void | (date) => date.getDate() | 日期渲染函数 |
| disabledDate | (date?: Date) => boolean | () => false | 日期是否禁止选择 |
| onChange | (value?: Date[]) => void | - | 日期选择发生变化时触发的回调函数 |
