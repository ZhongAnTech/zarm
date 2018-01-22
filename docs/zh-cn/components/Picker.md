# 选择器 Picker & Select

[demo页面](https://zhongantecheng.github.io/zarm/#/picker)

### 引入

```js
import { Picker, PickerView, Select } from 'zarm';
```

### 代码演示

#### 基本用法


###### 单列
```jsx
<Picker
  visible={single.visible}
  value={single.value}
  dataSource={single.dataSource}
  onOk={(selected) => {
    console.log('Picker onOk: ', selected);
    single.value = selected.map(item => item.value);
    this.setState({ single });
    Toast.show(JSON.stringify(selected));
    this.toggle('single');
  }}
  onCancel={() => this.toggle('single')}
  />
```


###### 多列
```jsx
<Picker
  visible={multi.visible}
  value={multi.value}
  dataSource={[
    [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
    ],
    [
      { value: '3', label: '选项A' },
      { value: '4', label: '选项B' },
    ],
  ]}
  onOk={(selected) => {
    console.log('Picker onOk: ', selected);
    multi.value = selected.map(item => item.value);
    this.setState({ multi });
    Toast.show(JSON.stringify(selected));
    this.toggle('multi');
  }}
  onCancel={() => this.toggle('multi')}
  />
```

###### 多列联动
```jsx
<Picker
  visible={cascade.visible}
  value={cascade.value}
  dataSource={[
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
  ]}
  onOk={(selected) => {
    console.log('Picker onOk: ', selected);
    cascade.value = selected.map(item => item.value);
    this.setState({ cascade });
    Toast.show(JSON.stringify(selected));
    this.toggle('cascade');
  }}
  onCancel={() => this.toggle('cascade')}
  />
```

###### 禁止修改
```jsx
<Picker
  disabled
  dataSource={[
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ]}
  defaultValue="2"
  />
```

###### 自定义格式
```jsx
<Picker
  title="custom title"
  cancelText="Cancel"
  okText="Ok"
  dataSource={diy.dataSource}
  value={diy.value}
  valueMember="code"
  itemRender={data => data.name}
  dataSource={[
    {
      code: '1',
      name: '北京市',
      children: [
        { code: '11', name: '海淀区' },
        { code: '12', name: '西城区' },
      ],
    },
    {
      code: '2',
      name: '上海市',
      children: [
        { code: '21', name: '黄埔区' },
        { code: '22', name: '虹口区' },
      ],
    },
  ]}
  onOk={(selected) => {
    console.log('Picker onOk: ', selected);
    diy.value = selected.map(item => item.code);
    this.setState({
      diy,
    });
    Toast.show(JSON.stringify(selected));
  }}>
    <Button>打开</Button>
  </Picker>
```

### Select（选择器表单控件）
```jsx
<Select
  visible={select.visible}
  placeholder="请选择省市区"
  value={select.value}
  dataSource={select.dataSource}
  onOk={(selected) => {
    console.log('Picker onOk: ', selected);
    select.value = selected.map(item => item.value);
    this.setState({ select });
  }}
  />
```

### PickerView（平铺选择器）
```jsx
<PickerView
  dataSource={[
    {
      code: '1',
      name: '北京市',
      children: [
        { code: '11', name: '海淀区' },
        { code: '12', name: '西城区' },
      ],
    },
    {
      code: '2',
      name: '上海市',
      children: [
        { code: '21', name: '黄埔区' },
        { code: '22', name: '虹口区' },
      ],
    },
  ]}
  valueMember="code"
  itemRender={data => data.name}
  onChange={(value) => {
    console.log(value);
  }}
  />
```

### API

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

<!-- #### Picker.Stack

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-picker | | 类名前缀 |
| className | string | | | 追加类名 |
| dataSource | array | [ ] | | 数据源 |
| value | array &#124; string |  | | 值 |
| defaultValue | array &#124; string |  | | 初始值 |
| valueMember | string | 'value' | | 值字段对应的key 
| itemRender | func |  | | 控制选项列表显示字段对应的key |
| disabled | boolean | false | | 是否禁用 |
| title | string | '请选择' | | 选择器标题 |
| cancelText | string | '取消' | | 取消栏文字 |
| okText | string | '确定' | | 确定栏文字 |
| placeholder | string | '请选择' | | 输入提示信息 |
| displayRender | <code>(data?: object) => string</code> | noop | \(data: object\) | 所选值渲染 |
| cols | number | | | 级联选择器的级数 |
| onChange | <code>(value?: object) => void</code> | noop | \(value: object\) | 值变化时触发的回调函数 |
| onOk | <code>(value?: object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 |
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 | -->





