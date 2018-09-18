## 日期选择器 DatePicker

:::demo 基本用法
```jsx
import { Cell, Button, DatePicker, Toast } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      date: {
        visible: false,
        value: '',
      },
      time: {
        visible: false,
        value: '',
      },
      limitDate: {
        visible: false,
        value: '2017-09-13',
      },
    };
  }

  toggle(key) {
    const state = this.state[key];
    state.visible = !state.visible;
    this.setState({ [`${key}`]: state });
  }

  render() {
    const {
      date,
      time,
      limitDate,
    } = this.state;

    return (
      <div>
        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('date')}>选择</Button>
          }
        >
          选择日期
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('time')}>选择</Button>
          }
        >
          选择时间
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('limitDate')}>选择</Button>
          }
        >
          选择日期(自定义)
        </Cell>

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
            Toast.show(JSON.stringify(value));
          }}
          onCancel={() => this.toggle('date')}
        />

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
            Toast.show(JSON.stringify(value));
          }}
          onCancel={() => this.toggle('time')}
        />

        <DatePicker
          visible={limitDate.visible}
          title="选择日期"
          placeholder="请选择日期"
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
            Toast.show(JSON.stringify(value));
          }}
          onCancel={() => this.toggle('limitDate')}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 表单选择 DateSelect
```jsx
import { Cell, DateSelect } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      value: '',
    };
  }

  render() {
    return (
      <div>
        <Cell title="日期选择">
          <DateSelect
            title="选择日期"
            placeholder="请选择日期"
            mode="date"
            value={this.state.value}
            onOk={(value) => {
              console.log('DateSelect onOk: ', value);
              this.setState({
                visible: false,
                value,
              });
            }}
          />
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 平铺选择 DatePickerView
```jsx
import { DatePickerView } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <DatePickerView
          mode="datetime"
          min="2018-1-13"
          onChange={(value) => {
            console.log('datePickerView => ', value);
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-picker | | 类名前缀 |
| className | string | | | 追加类名 |
| dataSource | object[] | [ ] | | 数据源 |
| value | string &#124; Date |  | | 值 |
| defaultValue | string &#124; Date |  | | 初始值 |
| valueMember | string | 'value' | | 值字段对应的key |
| mode | string | date | `year`, `month`, `date`, `time`, `datetime` | 指定日期选择模式 |
| min | string | | | 相应mode的最小时间 |
| max | string | | | 相应mode的最大时间 |
| minuteStep | number | 1 | | 分钟间隔 |
| wheelDefaultValue | string | | | 滚轮默认值 |
| disabled | boolean | false | | 是否禁用 |
| onChange | <code>(value?: object) => void</code> | noop | \(value: object\) | 值变化时触发的回调函数 |

#### 仅 DatePicker & DateSelect 支持的属性
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| visible | boolean | false | | 是否展示 |
| title | string | '请选择' | | 选择器标题 |
| cancelText | string | '取消' | | 取消栏文字 |
| okText | string | '确定' | | 确定栏文字 |
| onOk | <code>(value?: object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 | 
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |

#### 仅 DateSelect 支持的属性
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| placeholder | string | '请选择' | | 输入提示信息 |
| format | string | | 例：YYYY年MM月DD日<br /> 年:`YYYY`, 月:`MM`, 日:`DD`, 时:`hh`, 分:`mm`。| 格式化显示值 |

:::