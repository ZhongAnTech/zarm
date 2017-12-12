# 选择器 DateSelect

[demo页面](https://zhongantecheng.github.io/zarm/#/dateSelect)

### 引入

```js
import { DateSelect } from 'zarm';
```

### 代码演示

#### 基本用法


###### 年份选择
```jsx
<DateSelect
  title="选择年份"
  placeholder="请选择年份"
  mode="year"
  value={year}
  onChange={(value) => {
    this.setState({
      year: value,
    });
  }}
  />
```


###### 日期选择
```jsx
<DateSelect
  title="选择日期"
  placeholder="请选择日期"
  mode="date"
  value={date}
  min="2007-01-03"
  max="2017-11-23"
  onChange={(value) => {
    this.setState({
      date: value,
    });
  }}
  />
```

###### 时间选择
```jsx
<DateSelect
  title="选择时间"
  placeholder="请选择时间"
  mode="time"
  value={time}
  minuteStep={15}
  onChange={(value) => {
    this.setState({
      time: value,
    });
  }}
  />
```

###### 日期和时间选择
```jsx
<DateSelect
  title="选择日期"
  placeholder="请选择日期"
  mode="datetime"
  value={datetime}
  onChange={(value) => {
    this.setState({
      datetime: value,
    });
  }}
  />
```
###### 自定义格式日期
```jsx
<DateSelect
  title="选择日期"
  placeholder="请选择日期"
  mode="datetime"
  format="yyyy年MM月dd日 HH时mm分"
  value={customDate}
  onChange={(value) => {
    this.setState({
      customDate: value,
    });
  }}
  />
```


### API

#### DateSelect

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-select | | 类名前缀 |
| className | string | | | 追加类名 |
| visible | boolean | false | | 是否展示 |
| placeholder | string | '请选择' | | 输入提示信息 |
| title | string | '请选择' | | 选择器标题 |
| cancelText | string | '取消' | | 取消栏文字 |
| okText | string | '确定' | | 确定栏文字 |
| dataSource | array | [ ] | | 数据源 |
| mode | string | date | `year`, `month`, `date`, `time`, `datetime` | 指定日期选择模式 |
| value | string |  | | 值 |
| defaultValue | string &#124; Date | | | 初始值（例：'2017-12-10' 或 new Date()） |
| format | string | | 例：YYYY年MM月DD日<br /> 年:`YYYY`, 月:`MM`, 日:`DD`, 时:`hh`, 分:`mm`。| 格式化显示值 |
| min | string | | | 相应mode的最小时间 |
| max | string | | | 相应mode的最大时间 |
| minuteStep | number | 1 | | 分钟间隔 |
| wheelDefaultValue | string | | | 滚轮默认值 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(value?: object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 |
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |
