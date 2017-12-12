# 选择器 Picker

[demo页面](https://zhongantecheng.github.io/zarm/#/picker)

### 引入

```js
import { Picker } from 'zarm';
```

### 代码演示

#### 基本用法


###### 单列
```jsx
<Picker
  visible={singleVisible}
  placeholder="请选择"
  className="show-right"
  value={single.value}
  dataSource={[{ value: '1', label: '选项一' }, { value: '2', label: '选项二' }]}
  onOk={(selected) => {
    console.log('pickerPage onChange=> ', selected);
    single.value = selected.value;
    single.display = selected.label;
    this.setState({
      single,
    });
  }}
  onCancel={() => this.close('singleVisible')}
  />
```


###### 多列
```jsx
<Picker
  visible={multiVisible}
  value={multi.value}
  dataSource={multiData}
  onOk={(selected) => {
    multi.value = selected.map(item => `${item.value}`);
    multi.display = selected.map(item => `${item.label}`).join('&');
    this.setState({
      multi,
    });
    this.close('multiVisible');
  }}
  onCancel={() => this.close('multiVisible')}
  />
```

###### 多列联动
```jsx
<Picker
  visible={this.state.pickerVisible}
  dataSource={this.state.multiCascadeData}
  value={this.state.multiCascade.value}
  onChange={(selected) => {
    console.log(selected);
  }}
  onOk={(selected) => {
    multiCascade.value = selected.map(item => `${item.value}`);
    multiCascade.display = selected.map(item => item.label).join('-');
    this.setState({
      multiCascade,
    });
    this.close('pickerVisible');
  }}
  onCancel={() => this.close('pickerVisible')}
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
  visible={diy.visible}
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
  onOk={(selected) => {
    diy.value = selected.code;
    this.setState({
      diy,
    });
  }}
  onCancel={() => {
  }}
  />
```

#### 城市选择器

###### 省市选择
```jsx
<Picker
  visible={addr1Visible}
  dataSource={District}
  cols={2}
  value={address1.value}
  onOk={(selected) => {
    address1.value = selected.map(item => item.value);
    address1.display = selected.map(item => item.label).join('-');
    this.setState({
      address1,
    });
    this.close('addr1Visible');
  }}
  onCancel={() => this.close('addr1Visible')}
  />
```

###### 省市区选择
```jsx
<Picker
  visible={addr2Visible}
  dataSource={District}
  value={address2.value}
  onOk={(selected) => {
    address2.value = selected.map(item => item.value);
    address2.display = selected.map(item => item.label).join('-');
    this.setState({
      address2,
    });
    this.close('addr2Visible');
  }}
  onCancel={() => this.close('addr2Visible')}
  />
```

#### 层叠式选择器

###### 级联选择
```jsx
<Picker.Stack
  dataSource={District}
  displayRender={selected => selected.map(item => item.label).join('-')}
  />
```

#### PickerView（平铺选择器）
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
#### Picker & PickerView

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-select\za-picker | | 类名前缀 |
| className | string | | | 追加类名 |
| visible（Picker） | boolean | false | | 是否展示 |
| dataSource | array | [ ] | | 数据源 |
| value | array &#124; string |  | | 值 |
| defaultValue | array &#124; string |  | | 初始是否选中 |
| valueMember | string | 'value' | | 值字段对应的key 
| itemRender | func | <code>(data?: object) => data.label</code> | | 控制选项列表显示字段对应的key |
| disabled（Picker） | boolean | false | | 是否禁用 |
| title（Picker） | string | '请选择' | | 选择器标题 |
| cancelText（Picker） | string | '取消' | | 取消栏文字 |
| okText（Picker） | string | '确定' | | 确定栏文字 |
| placeholder（Picker） | string | '请选择' | | 输入提示信息 |
| cols | number | | | 级联选择器的级数 |
| onChange | <code>(value?: object) => void</code> | noop | \(value: object\) | 值变化时触发的回调函数 |
| onOk（Picker） | <code>(value?: object) => void</code> | noop | \(value: object\) | 点击确定时触发的回调函数 | 
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |

#### Picker.Stack

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
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |





