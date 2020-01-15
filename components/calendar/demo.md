# Calendar 日历

## 平铺选择

```jsx
import { Button, Select, Icon, Input, Cell, Calendar } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      multiple: true,
      value: ['2019-10-11', '2019-10-17'],
      min: '2019-9-12',
      max: '2019-11-11',
      dateRender: (date) => {
        if (/(0|6)/.test(date.getDay())) {
          return (
            <div className="custom">
              <div className="custom__date">{date.getDate()}</div>
              <div className="custom__text">休息</div>
            </div>
          );
        }
        return date.getDate();
      },
      disabledDate: (date) => /(0|6)/.test(date.getDay())
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
              dataSource={[
                {
                  value: 'false',
                  label: '单选'
                },
                {
                  value: 'true',
                  label: '双选'
                }
              ]}
              onOk={(selected) => {
                this.setState({
                  multiple: selected[0].value === 'true',
                  visible: false
                });
              }}
            />
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
            onChange={(value) => {
              this.setState({ value });
              console.log('onChange', value);
            }}
          />
        </div>
      </div>
    );
  }
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
