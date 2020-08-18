# Picker 选择器



## 基本用法
```jsx
import { useEffect, useRef, useReducer } from 'react';
import { Cell, Button, Picker, Toast } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

// 普通多列数据
const MULTI_DATA = [
  [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ],
  [
    { value: '3', label: '选项A' },
    { value: '4', label: '选项B' },
  ],
];

// 级联数据
const CASCADE_DATA = [
  {
    code: '1',
    label: '北京市',
    children: [
      { code: '11', label: '海淀区' },
      { code: '12', label: '西城区' },
    ],
  },
  {
    code: '2',
    label: '上海市',
    children: [
      { code: '21', label: '杨浦区' },
      { code: '22', label: '静安区' },
    ],
  },
];

const DIY_DATA = [
  {
    value: '1',
    name: '北京市',
    children: [
      { value: '11', name: '海淀区' },
      { value: '12', name: '西城区' },
    ],
  },
  {
    value: '2',
    name: '上海市',
    children: [
      { value: '21', name: '黄埔区' },
      { value: '22', name: '虹口区' },
    ],
  },
];

const initState = {
  single: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
  multi: {
    visible: false,
    value: [],
    dataSource: MULTI_DATA,
  },
  cascade: {
    visible: false,
    value: [],
    dataSource: [],
  },
  diy: {
    visible: false,
    value: [],
    dataSource: DIY_DATA,
  },
  specDOM: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
};

const reducer = (state, action) => {
  const { type, key, visible, value, valueMember, dataSource } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        }
      };
    
    case 'value':
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
        }
      };

    case 'valueMember':
      return {
        ...state,
        [key]: {
          ...state[key],
          valueMember,
        }
      };
    
    case 'dataSource':
      return {
        ...state,
        [key]: {
          ...state[key],
          dataSource,
        }
      };
  }
};

const Demo = () => {
  const myRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);

  const setVisible = (key) => {
    dispatch({ type: 'visible', key });
  };

  const setValue = (key, value) => {
    dispatch({ type: 'value', key, value });
  };

  const setValueMember = (key, value) => {
    dispatch({ type: 'valueMember', key, valueMember: value });
  };

  const setDataSource = (key, value) => {
    dispatch({ type: 'dataSource', key, dataSource: value });
  };

  useEffect(() => {
    // 异步加载数据源测试
    setTimeout(() => {
      setValue('cascade', ['1', '12']);
      setValueMember('cascade', 'code');
      setDataSource('cascade', CASCADE_DATA);
    }, 0);
  }, []);

  return (
    <>
      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('single')}>选择</Button>
        }
      >
        单列
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('multi')}>选择</Button>
        }
      >
        多列
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('cascade')}>选择</Button>
        }
      >
        级联
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('diy')}>选择</Button>
        }
      >
        自定义
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('specDOM')}>选择</Button>
        }
      >
        挂载到指定dom节点
      </Cell>

      <Picker
        visible={state.single.visible}
        value={state.single.value}
        dataSource={state.single.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('single', selected.map(item => item.value));
          setVisible('single');
        }}
        onCancel={() => setVisible('single')}
      />

      <Picker
        visible={state.multi.visible}
        value={state.multi.value}
        dataSource={state.multi.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('multi', selected.map(item => item.value));
          setVisible('multi');
        }}
        onCancel={() => setVisible('multi')}
      />

      <Picker
        visible={state.cascade.visible}
        value={state.cascade.value}
        dataSource={state.cascade.dataSource}
        valueMember={state.cascade.valueMember}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('cascade', selected.map(item => item.code));
          setVisible('cascade');
        }}
        onCancel={() => setVisible('cascade')}
      />

      <Picker
        visible={state.diy.visible}
        title="custom title"
        cancelText="Cancel"
        okText="Ok"
        dataSource={state.diy.dataSource}
        value={state.diy.value}
        valueMember="value"
        itemRender={data => data.name}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('diy', selected.map(item => item.value));
          setVisible('diy');
        }}
        onCancel={() => setVisible('diy')}
      />

      <Picker
        visible={state.specDOM.visible}
        value={state.specDOM.value}
        dataSource={state.specDOM.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('specDOM', selected.map(item => item.value));
          setVisible('specDOM');
        }}
        onCancel={() => setVisible('specDOM')}
        mountContainer={() => myRef.current}
      />

      <div
        id="test-div"
        style={{ position: 'relative', zIndex: 1 }}
        ref={myRef} 
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```



## Select 表单选择器
```jsx
import { Select, Cell, Icon } from 'zarm';

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
  state = {
    value: [],
    dataSource: [],
  };

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
    const { value, dataSource } = this.state;
    return (
      <Cell title="城市">
        <Select
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
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## PickerView 平铺选择器
```jsx
import { PickerView } from 'zarm';

// 级联数据
const CASCADE_DATA = [];

class Demo extends React.Component {
  state = {
    value: [],
    dataSource: CASCADE_DATA,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: ['1', '12'],
        dataSource: [
          {
            code: '1',
            label: '北京市',
            children: [
              { code: '11', label: '海淀区' },
              { code: '12', label: '西城区' },
            ],
          },
          {
            code: '2',
            label: '上海市',
            children: [
              { code: '21', label: '杨浦区' },
              { code: '22', label: '静安区' },
            ],
          },
        ],
        valueMember: 'code'
      })
    }, 0)
  }

  render() {
    return (
      <PickerView
        value={this.state.value}
        valueMember="code"
        dataSource={this.state.dataSource}
        onChange={selected => {
          this.setState({
            value: selected.map(item => item.code),
          });
          console.log('PickerView onChange: ', selected);
        }}
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| dataSource | object[] | [] | 数据源 |
| value | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | - | 值 |
| defaultValue | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | - | 初始值 |
| valueMember | string | 'value' | 值字段对应的key 
| itemRender | (data?: object) => data.label | (data?: object) => data.label | 单个选项的展示 |
| disabled | boolean | false | 是否禁用 |
| cols | number | Infinity | 级联选择器的级数 |
| onChange | (selected?: object) => void | - | 值变化时触发的回调函数 |

### 仅 Picker & Select 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | string | '请选择' | 选择器标题 |
| okText | string | '确定' | 确定栏文字 |
| cancelText | string | '取消' | 取消栏文字 |
| maskClosable | boolean | true | 是否点击遮罩层时关闭，需要和onCancel一起使用 |
| destroy | boolean | false | 弹层关闭后是否移除节点 |
| onOk | (selected?: object) => void | - | 点击确定时触发的回调函数 |
| onCancel | () => void | - | 点击取消时触发的回调函数 |
| mountContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Picker 挂载的 HTML 节点 |


### 仅 Picker 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否展示 |

### 仅 Select 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| placeholder | string | '请选择' | 输入提示信息 |
| hasArrow | boolean | true | 是否显示箭头 |
| displayRender | (selected?: object) => string | selected => selected.map(item => item.label) | 所选值的展示 |
