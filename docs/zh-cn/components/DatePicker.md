# 日期选择器 DatePicker

[demo页面](https://zhongantecheng.github.io/zarm/#/datePicker)

### 引入

```js
import { DatePicker, DatePickerView } from 'zarm';
```

### 代码演示

#### 基本用法


###### 日期选择
```jsx
<DatePicker
  visible={date.visible}
  title="选择日期"
  placeholder="请选择日期"
  mode="date"
  value={date.value}
  onOk={(value) => {
    this.setState({
      date: {
        visible: false,
        value,
      },
    });
    Toast.show(format.date(value, 'yyyy/MM/dd'));
  }}
  onCancel={() => this.toggle('date')}
  />
```

###### 时间选择
```jsx
<DatePicker
  visible={time.visible}
  title="选择日期"
  placeholder="请选择日期"
  mode="time"
  value={time.value}
  onOk={(value) => {
    this.setState({
      time: {
        visible: false,
        value,
      },
    });
    Toast.show(format.date(value, 'hh时mm分'));
  }}
  onCancel={() => this.toggle('time')}
  />
```

###### 日期选择（自定义）
```jsx
<DatePicker
  visible={limitDate.visible}
  title="选择年份"
  placeholder="请选择年份"
  mode="date"
  min="2007-01-03"
  max="2019-11-23"
  value={limitDate.value}
  onOk={(value) => {
    this.setState({
      limitDate: {
        visible: false,
        value,
      },
    });
    Toast.show(format.date(value, 'yyyy年MM月dd日'));
  }}
  onCancel={() => this.toggle('year')}
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
| min | string | | | 相应mode的最小时间 |
| max | string | | | 相应mode的最大时间 |
| minuteStep | number | 1 | | 分钟间隔 |
| wheelDefaultValue | string | | | 滚轮默认值 |
| disabled | boolean | false | | 是否禁用 |
| title(DatePicker) | string | '请选择' | | 选择器标题 |
| cancelText(DatePicker) | string | '取消' | | 取消栏文字 |
| okText(DatePicker) | string | '确定' | | 确定栏文字 |
| onChange | <code>(value?: object) => void</code> | noop | \(value: object\) | 值变化时触发的回调函数 |
| onOk(DatePicker) | <code>(value?: object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 | 
| onCancel(DatePicker) | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick(DatePicker) | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |
