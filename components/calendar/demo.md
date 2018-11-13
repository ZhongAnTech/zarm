## 日历 Calendar

### 平铺选择

```jsx
import { Select, Icon, Input, Cell, Calendar } from 'zarm';

const dataSource = [
  {
    value: 'false',
    label: 'false'
  },
  {
    value: 'true',
    label: 'true'
  }
];

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      multiple: true,
      defaultValue: ['2018-11-1', '2018-12-10'],
      value: '',
      min: '2018-5-12',
      max: '2019-5-11',
      visible: false
    };
  }

  render() {
    const { multiple, min, max, visible } = this.state;

    return (
      <div>
        <div>
          <Cell title="multiple">
            <Select
              visible={visible}
              placeholder="multiple"
              value={multiple ? 'true' : 'false'}
              dataSource={dataSource}
              onOk={e => {
                this.setState({
                  multiple: e[0].value === 'true',
                  visible: false
                });
              }}
            />
            <Icon className="icon" theme="primary" type="arrow-right" />
          </Cell>
          <Cell title="min">
            <Input
              type="text"
              placeholder="请输入日历起始日期"
              value={min}
              onBlur={e => this.setState({ min: e })}
            />
          </Cell>

          <Cell title="max">
            <Input
              type="text"
              placeholder="请输入日历终止日期"
              value={max}
              onBlur={e => this.setState({ max: e })}
            />
          </Cell>
        </div>
        <div>
          <Calendar
            {...this.state}
            onChange={data => {
              this.setState({ value: data });
              console.log('onChange', data);
            }}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

### API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| prefixCls | string | 'za-calendar' | 类名前缀 |
| className | string | - | 追加类名 |
| multiple | boolean | false | 是否多选(双选) |
| value | string \| Date \| string[] \| Date[] | - | 值 |
| defaultValue | string \| Date \| string[] \| Date[] | - | 初始值 |
| min | string \| Date \| 时间戳 | new Date() | 最小日期，展示当月 |
| max | string \| Date \| 时间戳 | new Date() + 1 年 | 最大日期，展示当月 |
| dateRender | <code>(value?: Date) => void</code> | noop | 日期渲染函数 |
| disabledDate | <code>(value?: Date) => boolean</code> | false | 日期是否禁止选择 |
| onChange | <code>(value?: Date[]) => void</code> | noop | 日期选择发生变化时触发的回调函数 |
