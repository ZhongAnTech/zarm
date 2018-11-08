## 日历 Calendar

### 平铺选择

```jsx
import { Select, Icon, Cell, Calendar } from 'zarm';

const NOW = new Date();

function cloneDate(date, type, during) {
  if (date.constructor === String) {
    date = +date ? +date : date.replace(/-/gi, '/');
  }
  const tmp = new Date(date);
  if (!type || !during) return tmp;
  switch (type) {
    case 'y':
      tmp.setFullYear(tmp.getFullYear() + during);
      break;
    case 'yyyy':
      tmp.setFullYear(during);
      break;
    case 'm':
      tmp.setMonth(tmp.getMonth() + during);
      break;
    case 'mm':
      tmp.setMonth(during);
      break;
    case 'd':
      tmp.setDate(tmp.getDate() + during);
      break;
    case 'dd':
      tmp.setDate(during);
      break;
  }
  return tmp;
}

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      calendar1_s: {
        name: '单选String类型，无min/max',
        defaultValue: '2018-08-02',
        value: '2018-08-02',
        multiple: false
      },
      calendar1_s1: {
        name: '单选String类型，只有min',
        defaultValue: '2018-08-02',
        value: '2018-08-02',
        min: '2018-07-06',
        multiple: false
      },

      calendar1_s2: {
        name: '单选String类型，只有max',
        defaultValue: '2018-08-02',
        value: '2018-08-02',
        max: '2019-05-05',
        multiple: false
      },
      calendar1_s3: {
        name: '单选String类型，跨度1年',
        defaultValue: '2018-08-02',
        value: '2018-08-02',
        min: '2018-05-06',
        max: '2019-05-05',
        multiple: false
      },
      calendar1_o: {
        name: '单选Date类型，跨度2年',
        defaultValue: cloneDate(NOW, 'dd', 4),
        value: '',
        min: cloneDate(NOW, 'm', -1),
        max: cloneDate(NOW, 'y', 1),
        multiple: false
      },
      calendar1_n: {
        name: '单选Number类型，自定义render',
        defaultValue: '',
        value: '',
        min: 1534333992270,
        max: 1541088000000,
        multiple: false,
        dateRender: date => (
          <div>
            <span>{date.getDay()}</span>
            <span>${date.getDay()}</span>
          </div>
        )
      },
      calendar1_n1: {
        name: '单选Number类型，错误render',
        defaultValue: '',
        value: '',
        min: 1543333992270,
        max: 1591088000000,
        multiple: false,
        dateRender: date => date
      },
      calendar1_d1: {
        name: '单选Date类型，跨度1年，自定义disable',
        defaultValue: cloneDate(NOW, 'dd', 4),
        value: '',
        min: cloneDate(NOW, 'm', 0),
        max: cloneDate(NOW, 'y', 1),
        multiple: false,
        disabledDate: date => date.getDate() % 2 === 1
      },
      calendar2_s: {
        name: '双选String类型，跨度5个月',
        defaultValue: ['2018-08-02', '2018-08-07'],
        value: ['2018-08-02', '2018-08-07'],
        min: '2018-07-02',
        max: '2018-12-02',
        multiple: true
      },
      calendar2_n: {
        name: '双选Number类型，跨度2年',
        defaultValue: [1534333992270, 1535344992270],
        value: [1534333992270, 1535544992270],
        min: '2017-07-02',
        max: '2019-08-02',
        multiple: true
      },
      calendar2_o: {
        name: '双选Date类型，跨度3年',
        defaultValue: [NOW, cloneDate(NOW, 'd', 5)],
        value: [NOW, cloneDate(NOW, 'd', 5)],
        min: cloneDate(NOW, 'y', -2),
        max: cloneDate(NOW, 'y', 1),
        multiple: true
      },
      //   calendar3_s: {
      //     name: '三选String类型，跨度1年',
      //     defaultValue: ['2018-08-02', '2018-08-07', '2018-08-18'],
      //     value: '',
      //     min: '2018-07-02',
      //     max: '2019-08-02',
      //     multiple: true,
      //   },
      //   calendar3_o: {
      //     name: '三选Date类型，跨度2年',
      //     defaultValue: [NOW, cloneDate(NOW, 'd', 5), cloneDate(NOW, 'd', 12)],
      //     value: [NOW, cloneDate(NOW, 'd', 5), cloneDate(NOW, 'd', 12)],
      //     min: cloneDate(NOW, 'y', -1),
      //     max: cloneDate(NOW, 'y', 1),
      //     multiple: true,
      //   },
      //   calendar4_s: {
      //     name: '四选String类型，跨度1年',
      //     defaultValue: ['2018-08-02', '2018-08-07', '2018-08-16', '2018-08-18'],
      //     value: '',
      //     min: '2018-07-02',
      //     max: '2019-08-02',
      //     multiple: true,
      //   },
      //   calendar4_o: {
      //     name: '四选Date类型，跨度4年',
      //     defaultValue: [
      //       NOW,
      //       cloneDate(NOW, 'd', 5),
      //       cloneDate(NOW, 'd', 12),
      //       cloneDate(NOW, 'd', 14)
      //     ],
      //     value: [NOW, cloneDate(NOW, 'd', 5), cloneDate(NOW, 'd', 12)],
      //     min: cloneDate(NOW, 'y', -2),
      //     max: cloneDate(NOW, 'y', 2),
      //     multiple: true,
      //   },
      dataSource: [],
      visible: false,
      key: 'calendar1_s'
    };
  }

  componentDidMount() {
    let arr = [];
    Object.keys(this.state).map(key => {
      if (/^calendar/.test(key)) {
        arr.push({
          value: key,
          label: this.state[key].name
        });
      }
    });
    this.setState({ dataSource: arr });
  }

  render() {
    const { dataSource, key, visible } = this.state;
    const tmp = this.state[key];

    const dateValue = tmp.value.constructor === Array ? tmp.value : [tmp.value];
    const dateDefaultValue =
      tmp.defaultValue.constructor === Array
        ? tmp.defaultValue
        : [tmp.defaultValue];

    return (
      <div>
        <div>
          <Cell title="参数选择">
            <Select
              visible={visible}
              placeholder="选择日历参数类型"
              value={key}
              dataSource={dataSource}
              onOk={e => {
                console.log('Select onOk: ', e);
                this.setState({
                  key: e[0].value,
                  visible: false
                });
              }}
            />
            <Icon className="icon" theme="primary" type="arrow-right" />
          </Cell>
          <Cell title="value">
            <p>
              {dateValue
                .map(
                  item => (item && new Date(item).toLocaleDateString()) || '-'
                )
                .join(',')}
            </p>
          </Cell>
          <Cell title="defaultValue">
            <p>
              {dateDefaultValue
                .map(
                  item => (item && new Date(item).toLocaleDateString()) || '-'
                )
                .join(',')}
            </p>
          </Cell>
          <Cell title="min">
            <p>{(tmp.min && new Date(tmp.min).toLocaleDateString()) || '-'}</p>
          </Cell>
          <Cell title="max">
            <p>{(tmp.max && new Date(tmp.max).toLocaleDateString()) || '-'}</p>
          </Cell>
        </div>
        <div>
          <p style={{ backgroundColor: '#ddd' }}>日历展示区</p>
          <Calendar
            {...tmp}
            onChange={date => {
              tmp.value = date;
              this.setState({ [key]: tmp });
              console.log('onChange', date);
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

| 属性         | 类型                                                | 默认值            | 可选值／参数 | 说明                   |
| :----------- | :-------------------------------------------------- | :---------------- | :----------- | :--------------------- |
| prefixCls    | string                                              | za-calendar       |              | 类名前缀               |
| className    | string                                              |                   |              | 追加类名               |
| style        | string                                              |                   |              | 自定义样式             |
| value        | string &#124; Date &#124; Array<string &#124; Date> |                   |              | 值                     |
| defaultValue | string &#124; Date &#124; Array<string &#124; Date> |                   |              | 初始值                 |
| min          | string &#124; Date                                  | new Date()        |              | 最小日期，展示当月     |
| max          | string &#124; Date                                  | new Date() + 1 年 |              | 最大日期，展示当月     |
| dateRender   | <code>(value?: Date) => void</code>                 | noop              |              | 日期渲染               |
| disabledDate | <code>(value?: Date) => boolean</code>              | false             |              | 是否禁止选择           |
| onChange     | <code>(value?: Array&#60;Date>) => void</code>  | noop              |              | 值变化时触发的回调函数 |
