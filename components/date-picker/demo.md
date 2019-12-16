# DatePicker 日期选择器



## 基本用法
```jsx
import { Cell, Button, DatePicker, Toast } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
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
      }
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    // this.interval = setInterval(
    //   () =>
    //     this.setState(prevState => ({
    //       count: prevState.count + 1
    //     })),
    //   1000
    // );
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
      specDOM,
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

        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('specDOM')}>选择</Button>
          }
        >
          挂载到指定dom节点
        </Cell>

        <DatePicker
          visible={date.visible}
          mode="date"
          value={date.value}
          wheelDefaultValue={date.wheelDefaultValue}
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
          okText="确定"
          cancelText="取消"
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

        <DatePicker
          visible={specDOM.visible}
          value={specDOM.value}
          onOk={(value) => {
            this.setState({
              specDOM: {
                visible: false,
                value,
              },
            });
            Toast.show(JSON.stringify(value));
          }}
          onCancel={() => this.toggle('specDOM')}
          getContainer={() => this.myRef.current}
        />

        <div
          id="test-div"
          style={{ position: 'relative', zIndex: 1 }}
          ref={this.myRef} 
          />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## DateSelect 表单日期选择器
```jsx
import { Cell, DateSelect, Icon } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
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
            min="1974-05-16"
            max="2027-05-15"
            value={this.state.value}
            onOk={(value) => {
              console.log('DateSelect onOk: ', value);
              this.setState({
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



## DatePickerView 平铺选择器
```jsx
import { DatePickerView } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <div>
        <DatePickerView
          mode="datetime"
          value={this.state.value}
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



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string \| Date | - | 值 |
| defaultValue | string \| Date | - | 初始值 |
| mode | string | 'date' | 指定日期选择模式，可选项 `year`, `month`, `date`, `time`, `datetime` |
| min | string | - | 相应mode的最小时间 |
| max | string | - | 相应mode的最大时间 |
| minuteStep | number | 1 | 分钟间隔 |
| disabled | boolean | false | 是否禁用 |
| onChange | (value?: Date) => void | - | 值变化时触发的回调函数 |

### 仅 DatePicker & DateSelect 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否展示 |
| title | string | '请选择' | 选择器标题 |
| cancelText | string | '取消' | 取消栏文字 |
| okText | string | '确定' | 确定栏文字 |
| maskClosable | boolean | true | 是否点击遮罩层时关闭，需要和onCancel一起使用 |
| wheelDefaultValue | string \| Date | - | 滚轮默认停留的日期位置 |
| onOk | (value?: Date) => void | - | 点击确定时触发的回调函数 | 
| onCancel | () => void | - | 点击取消时触发的回调函数 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 DatePicker 挂载的 HTML 节点 |

### 仅 DateSelect 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| placeholder | string | '请选择' | 输入提示信息 |
| hasArrow | boolean | true | 是否显示箭头 |
| format | string | - | 格式化显示值。例：format="yyyy年MM月dd日"<br /> 年:`yyyy`, 月:`MM`, 日:`dd`, 时:`hh`, 分:`mm`。 |
