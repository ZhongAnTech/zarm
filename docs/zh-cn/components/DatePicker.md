# 选择器 Picker

[demo页面](https://zhongantecheng.github.io/zarm/#/datePicker)

### 引入

```js
import { DatePicker, DatePickerView } from 'zarm';
```

### 代码演示

#### 基本用法


###### 年份选择
```jsx
<DatePicker
  visible={yearVisible}
  title="选择年份"
  placeholder="请选择年份"
  mode="year"
  value={year}
  wheelDefaultValue="2009"
  onOk={(value) => {
    this.setState({ year: value, yearVisible: false });
  }}
  onCancel={() => this.close('yearVisible')}
  />
```


###### 日期选择
```jsx
<DatePicker
  visible={dateVisible}
  title="选择日期"
  placeholder="请选择日期"
  mode="date"
  value={date}
  min="2007-01-03"
  max="2017-11-23"
  onOk={(value) => {
    this.setState({ date: value, dateVisible: false });
  }}
  onCancel={() => this.close('dateVisible')}
  />
```

###### 时间选择
```jsx
<DatePicker
  visible={timeVisible}
  title="选择时间"
  placeholder="请选择时间"
  mode="time"
  value={time}
  minuteStep={15}
  onOk={(value) => {
    this.setState({ time: value, timeVisible: false });
  }}
  onCancel={() => this.close('timeVisible')}
  />
```

###### 日期和时间选择
```jsx
<DatePicker
  visible={datetimeVisible}
  title="选择日期和时间"
  placeholder="请选择日期和时间"
  mode="datetime"
  value={datetime}
  onOk={(value) => {
    this.setState({ datetime: value, datetimeVisible: false });
  }}
  onCancel={() => this.close('datetimeVisible')}
  />
```

###### 自定义格式日期
```jsx
<DatePicker
  visible={customVisible}
  title="选择日期"
  placeholder="请选择日期"
  mode="datetime"
  formatYear={i => `${i}year`}
  formatMonth={i => `${i + 1}Month`}
  formatDay={i => `${i}day`}
  formatHour={i => `${i}hour`}
  formatMinute={i => `${i}minute`}
  value={customDate}
  onOk={(value) => {
    this.setState({ customDate: value, customVisible: false });
  }}
  onCancel={() => this.close('datetimeVisible')}
  />
```

###### 平铺选择器
```jsx
<DatePickerView
  mode="date"
  onChange={(value) => {
    console.log('datePickerView => ', value);
  }}
  />
```


### API

#### DatePicker & DatePickerView

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-picker | | 类名前缀 |
| className | string | | | 追加类名 |
| visible | boolean | false | | 是否展示 |
| dataSource | array | [ ] | | 数据源 |
| value | string |  | | 值 |
| defaultValue | string &#124; Date |  | | 初始值 |
| valueMember | string | 'value' | | 值字段对应的key |
| mode | string | date | `year`, `month`, `date`, `time`, `datetime` | 指定日期选择模式 |
| format | string | | 例：YYYY年MM月DD日<br /> 年:`YYYY`, 月:`MM`, 日:`DD`, 时:`hh`, 分:`mm`。| 格式化显示值 |
| formatYear| <code>(num: number) => string</code> | noop | \(num: number\) | 自定义选项中的年份显示
| formatMonth | <code>(num: number) => string</code> | noop | \(num: number\) | 自定义选项中的月份显示
| formatDay | <code>(num: number) => string</code> | noop | \(num: number\) | 自定义选项中的天数显示
| formatHour | <code>(num: number) => string</code> | noop | \(num: number\) | 自定义选项中的小时显示
| formatMinute | <code>(num: number) => string</code> | noop | \(num: number\) | 自定义选项中的分钟显示
| min | string | | | 相应mode的最小时间 |
| max | string | | | 相应mode的最大时间 |
| minuteStep | number | 1 | | 分钟间隔 |
| wheelDefaultValue | string | | | 滚轮默认值 |
| disabled(DatePicker) | boolean | false | | 是否禁用 |
| title(DatePicker) | string | '请选择' | | 选择器标题 |
| cancelText(DatePicker) | string | '取消' | | 取消栏文字 |
| okText(DatePicker) | string | '确定' | | 确定栏文字 |
| placeholder(DatePicker) | string | '请选择' | | 输入提示信息 |
| onChange（DatePickerView） | <code>(value?: object) => void</code> | noop | \(value: object\) | 值变化时触发的回调函数 |
| onOk(DatePicker) | <code>(value?: object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 | 
| onCancel(DatePicker) | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick(DatePicker) | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |
