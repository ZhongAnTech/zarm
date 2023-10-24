# Calendar 日历

## 平铺选择

```jsx
import { useState } from 'react';
import { Radio, DateSelect, List, Calendar } from 'zarm';

const Demo = () => {
  const [mode, setMode] = useState('single');
  const [value, setValue] = useState([new Date('2022/5/18'), new Date('2022/6/3')]);
  const [min, setMin] = useState(new Date('2022/5/1'));
  const [max, setMax] = useState(new Date('2022/10/28'));
  const [custom, setCustom] = useState(false);
  const [direction, setDirection] = useState('vertical');
  const [header, setHeader] = useState(false);

  return (
    <>
      <List>
        <List.Item title="是否多选">
          <Radio.Group
            compact
            type="button"
            value={mode}
            onChange={(value) => {
              setMode(value);
            }}
          >
            <Radio value={'single'}>单选</Radio>
            <Radio value={'multiple'}>多选</Radio>
            <Radio value={'range'}>区间</Radio>
          </Radio.Group>
        </List.Item>
        <List.Item title="最小日期">
          <DateSelect placeholder="Please input start date" value={min} onConfirm={setMin} />
        </List.Item>
        <List.Item title="最大日期">
          <DateSelect placeholder="Please input end date" value={max} onConfirm={setMax} />
        </List.Item>
        <List.Item title="方向">
          <Radio.Group
            compact
            type="button"
            value={direction}
            onChange={(value) => {
              setDirection(value);
            }}
          >
            <Radio value={'horizontal'}>水平</Radio>
            <Radio value={'vertical'}>垂直</Radio>
          </Radio.Group>
        </List.Item>
        {direction === 'horizontal' && (
          <List.Item title="是否显示头部">
            <Radio.Group
              compact
              type="button"
              value={header}
              onChange={(value) => {
                setHeader(value);
              }}
            >
              <Radio value={true}>展示</Radio>
              <Radio value={false}>不展示</Radio>
            </Radio.Group>
          </List.Item>
        )}
        <List.Item title="自定义渲染">
          <Radio.Group
            compact
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
        mode={mode}
        value={value}
        min={min}
        max={max}
        direction={direction}
        header={header}
        dateRender={(date, value) => {
          let customText = '';
          if (mode === 'range') {
            if (new Date(date).getTime() === new Date(value[0]).getTime()) {
              customText = 'start';
            }
            if (new Date(date).getTime() === new Date(value[1]).getTime()) {
              customText = 'end';
            }
          }
          if (custom && /(0|6)/.test(date.getDay())) {
            customText = 'Close';
          }
          if (customText) {
            return (
              <div className="custom">
                <div className="custom__date">{date.getDate()}</div>
                <div className="custom__text">{customText}</div>
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

| 属性         | 类型                              | 默认值                   | 说明                                          |
| :----------- | :-------------------------------- | :----------------------- | :-------------------------------------------- |
| value        | Date \| Date[]                    | -                        | 值                                            |
| defaultValue | Date \| Date[]                    | -                        | 初始值                                        |
| min          | Date                              | new Date()               | 最小可选日期                                  |
| max          | Date                              | min + 1 年               | 最大可选日期                                  |
| mode         | 'single' \| 'multiple' \| 'range' | 'single'                 | 选择模式                                      |
| direction    | 'horizontal' \| 'vertical'        | 'vertical'               | 展示模式                                      |
| header       | boolean                           | false                    | 是否展示头部`direction` 为`horizontal` 时生效 |
| dateRender   | (date: Date) => void              | (date) => date.getDate() | 日期渲染函数                                  |
| disabledDate | (date: Date) => boolean           | () => false              | 日期是否禁止选择                              |
| onChange     | (value: Date[]) => void           | -                        | 日期选择发生变化时触发的回调函数              |

## CSS 变量

| 属性                      | 默认值                                        | 说明                   |
| :------------------------ | :-------------------------------------------- | :--------------------- |
| --background              | '#fff'                                        | 背景色                 |
| --padding-horizontal      | '15px'                                        | 横向边距               |
| --header-height           | '44px'                                        | 顶栏高度               |
| --week-height             | '40px'                                        | 星期栏高度             |
| --week-font-size          | '13px'                                        | 星期栏字体大小         |
| --week-font-weight        | 500                                           | 星期栏字体粗细         |
| --week-background         | '#f2f2f2'                                     | 星期栏背景颜色         |
| --week-text-color         | 'var(--za-color-text-caption)'                | 星期栏字体颜色         |
| --month-font-size         | '17px'                                        | 月份栏字体大小         |
| --month-font-weight       | 500                                           | 月份栏字体粗细         |
| --month-height            | '50px'                                        | 月份栏高度             |
| --month-scroll-background | '#fff'                                        | 滚动月份栏背景颜色     |
| --day-heigt               | '40px'                                        | 日期高度               |
| --day-font-size           | '16px'                                        | 日期字体大小           |
| --day-text-color          | 'var(--za-color-text)'                        | 日期字体颜色           |
| --day-today-background    | 'var(--za-theme-primary-lighter)'             | 当前日期背景颜色       |
| --day-today-text-color    | 'var(--za-theme-primary)'                     | 当前日期字体颜色       |
| --day-selected-background | 'var(--za-theme-primary)'                     | 选中日期背景颜色       |
| --day-selected-text-color | '#fff'                                        | 选中日期字体颜色       |
| --day-selected-shadow     | '0 2px 5px 0 var(--za-theme-primary-lighter)' | 选中日期背景阴影       |
| --day-range-background    | 'var(--za-theme-primary-lighter)'             | 选择范围内日期背景     |
| --day-range-text-color    | 'var(--za-theme-primary)'                     | 选择范围内日期字体颜色 |
| --action-btn-disabled     | 'var(--za-color-text-disabled)'               | 箭头禁用颜色           |
