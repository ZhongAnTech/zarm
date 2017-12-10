# 选择器(带input) Select

[demo页面](https://zhongantecheng.github.io/zarm/#/select)

### 引入

```js
import { Select } from 'zarm';
```

### 代码演示

#### 基本用法


###### 单列
```jsx
 <Select
  placeholder="请选择"
  value={single.value}
  dataSource={[{ value: '1', label: '选项一' }, { value: '2', label: '选项二' }]}
  onChange={(selected) => {
    single.value = selected.value;
    this.setState({
      single,
    });
  }}
  />
```


###### 多列
```jsx
<Select
  placeholder="请选择"
  value={multi.value}
  dataSource={[
    [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
    ],
    [
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
    ],
  ]}
  onChange={(selected) => {
    const multiValue = selected.map(item => `${item.value}`);
    multi.value = multiValue;
    this.setState({
      multi,
    });
  }}
  displayRender={selected => selected.map(item => item.label).join('/')}
  />
```

###### 指定默认值
```jsx
// this.state = {
  // multiAssign: { value: ['1', '12'] }
// }

// const { multiAssign } = this.state;
<Select
  placeholder="请选择"
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
        { value: '21', label: '黄埔区' },
        { value: '22', label: '虹口区' },
      ],
    },
  ]}
  defaultValue={multiAssign.value}
  onChange={(selected) => {
    multiAssign.value = selected.map(item => `${item.value}`);
    this.setState({
      multiAssign,
    });
  }}
  displayRender={(selected) => {
    return selected.map(item => item.label).join('-');
  }}
  />
```

###### 多列联动
```jsx
<Select
  placeholder="请选择"
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
        { value: '21', label: '黄埔区' },
        { value: '22', label: '虹口区' },
      ],
    },
  ]}
  value={this.state.multiCascade.value}
  onChange={(selected) => {
    multiCascade.value = selected.map(item => `${item.value}`);
    this.setState({
      multiCascade,
    });
    this.close('pickerVisible');
  }}
  displayRender={(selected) => {
    return selected.map(item => item.label).join('/');
  }}
  />
```

###### 禁止修改
```jsx
<Select
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
<Select
  title="自定义标题"
  placeholder="自定义placeholder"
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
  value={diy.value}
  valueMember="code"
  itemRender={data => data.name}
  displayRender={selected => selected.map(item => item.name).join('/')}
  onChange={(selected) => {
    diy.value = selected.map(item => item.code);
    this.setState({
      diy,
    });
  }}
  />
```

#### 城市选择器

###### 省市选择
```jsx
<Select
  placeholder="选择省市"
  dataSource={District}
  cols={2}
  value={address1.value}
  onChange={(selected) => {
    address1.value = selected.map(item => item.value);
    this.setState({
      address1,
    });
  }}
  />
```

###### 省市区选择
```jsx
<Select
  placeholder="选择省市区"
  dataSource={District}
  value={address2.value}
  displayRender={selected => selected.map(item => item.label).join('-')}
  onChange={(selected) => {
    address2.value = selected.map(item => item.value);
    this.setState({
      address2,
    });
  }}
  />
```


### API

#### Select

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-select | | 类名前缀 |
| className | string | | | 追加类名 |
| dataSource | array | [ ] | | 数据源 |
| value | array &#124; string |  | | 值 |
| defaultValue | array &#124; string |  | | 初始值 |
| valueMember | string | 'value' | | 值字段对应的key 
| itemRender | func | <code>(data?: object) => data.label</code> | | 控制选项列表显示字段对应的key |
| disabled | bool | false | | 是否禁用 |
| title | string | '请选择' | | 选择器标题 |
| cancelText | string | '取消' | | 取消栏文字 |
| okText | string | '确定' | | 确定栏文字 |
| placeholder | string | '请选择' | | 输入提示信息 |
| displayRender | <code>(data?: object) => string</code> | noop | \(data: object\) | 所选值渲染(只有Select有) |
| cols | number | | | 级联选择器的级数 |
| onChange | <code>(value?: Object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 |
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |





