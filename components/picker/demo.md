## 选择器 Picker & Select


:::demo 表单选择 Select
```jsx
import { Select, Cell } from 'zarm';

// 级联数据
const CASCADE_DATA = [
  {
    value: '1',
    label: '北京市',
    children: [
      { value: '11', label: '海淀区' },
      { value: '12', label: '西城区' },
    ],
  },
  {
    value: '2',
    label: '上海市',
    children: [
      { value: '21', label: '杨浦区' },
      { value: '22', label: '静安区' },
    ],
  },
];

class Demo extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    // 异步加载数据源测试
    setTimeout(() => {
      this.setState({
        dataSource: CASCADE_DATA,
        value: ['1', '12'],
      });
    }, 0);
  }

  render() {
    const { visible, value, dataSource } = this.state;
    return (
      <div>
        <Cell title="城市">
          <Select
            visible={visible}
            placeholder="请选择省市区"
            value={value}
            dataSource={dataSource}
            onOk={(selected) => {
              console.log('Select onOk: ', selected);
              this.setState({
                value: selected.map(item => item.value),
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





:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-picker | | 类名前缀 |
| className | string | | | 追加类名 |
| dataSource | object[] | [ ] | | 数据源 |
| value | string &#124; string[] &#124; number[] |  | | 值 |
| defaultValue | string &#124; string[] &#124; number[] |  | | 初始值 |
| valueMember | string | 'value' | | 值字段对应的key 
| itemRender | func | <code>(data?: object) => data.label</code> | | 单个选项的展示 |
| disabled | boolean | false | | 是否禁用 |
| cols | number | | | 级联选择器的级数 |
| onChange | <code>(selected?: object) => void</code> | noop | \(selected: object\) | 值变化时触发的回调函数 |

#### 仅 Picker & Select 支持的属性
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| visible | boolean | false | | 是否展示 |
| title | string | '请选择' | | 选择器标题 |
| okText | string | '确定' | | 确定栏文字 |
| cancelText | string | '取消' | | 取消栏文字 |
| onOk | <code>(selected?: object) => void</code> | noop | \(selected: object\) | 点击确定时触发的回调函数 |
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |

#### 仅 Select 支持的属性
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| placeholder | string | '请选择' | | 输入提示信息 |
| displayRender | <code>(selected?: object) => string</code> | noop | \(selected: object\) | 所选值的展示 |

:::