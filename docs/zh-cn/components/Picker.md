# 选择器 Picker

[demo页面](https://zhongantecheng.github.io/zarm/#/picker)

### 引入

```js
import { Picker } from 'zarm';
```

### 代码演示

#### 基本用法

单列

```jsx
<Picker
  dataSource={[
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ]}
  value={single.value}
  onOk={(selected) => {
    single.value = selected.value;
    this.setState({
      single,
    });
    console.log(`selected ${single.value}`);
  }}
  onCancel={() => {
  }}
  />
```

多列

```jsx
<Picker
  dataSource={[
    [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二' },
    ],
    [
      { value: 'a', label: '选项A' },
      { value: 'b', label: '选项B' },
    ],
  ]}
  />
```

多列联动

```jsx
<Picker
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
  />
```

指定默认值

```jsx
<Picker
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
  defaultValue={['1', '12']}
  />
```

禁止修改

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

自定义格式

```jsx
<Picker
  visible={diy.visible}
  title="自定义标题"
  placeholder="自定义placeholder"
  format="/"
  dataSource={[
    {
      idCardType: 1,
      idCardName: '身份证',
    },
    {
      idCardType: 2,
      idCardName: '护照',
    },
    {
      idCardType: 3,
      idCardName: '出生证',
    },
  ]}
  valueMember="idCardType"
  value={diy.value}
  onOk={(selected) => {
    diy.value = selected.idCardType;
    this.setState({
      diy,
    });
  }}
  onCancel={() => {
  }}
  />
```

#### 城市选择器

省市选择

```jsx
<Picker dataSource={District} cols={2} />
```

省市区选择

```jsx
<Picker dataSource={District} />
```

#### 日期选择器

年份选择

```jsx
<Picker.Date
  title="选择年份"
  placeholder="请选择年份"
  mode="year"
  wheelDefaultValue="2009"
  />
```

日期选择

```jsx
<Picker.Date
  title="选择日期"
  placeholder="请选择日期"
  mode="date"
  />
```

时间选择

```jsx
<Picker.Date
  title="选择时间"
  placeholder="请选择时间"
  mode="time"
  minuteStep={15}
  />
```

日期&时间

```jsx
<Picker.Date mode="datetime" />
```

自定义格式

```jsx
<Picker.Date
  title="选择日期"
  placeholder="请选择日期"
  mode="date"
  format="YYYY年MM月DD日"
  />
```

#### 层叠式选择器

级联选择

```jsx
<Picker.Stack
  dataSource={District}
  displayRender={selected => selected.map(item => item.label).join('-')}
  />
```


### API

#### Picker

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-picker | | 类名前缀 |
| className | string | 无 | | 追加类名 |
| dataSource | array | [] | | 数据源 |
| value | array, string | 无 | | 值 |
| defaultValue | array, string | 无 | | 初始是否选中 |
| wheelDefaultValue | array, string | | | 滚轮默认值 |
| valueMember | string | value | | 值对应的key |
| disabled | bool | false | | 是否禁用 |
| title | string | 请选择 | | 选择器标题 |
| placeholder | string | 请选择 | | 输入提示信息 |
| displayRender | func | function() {} | | 显示渲染
| cols | number | 无 | | 级联选择器的级数 |
| onChange | func | noop | \(selected : object\) | 值变化时触发的回调函数 |
| onOk | func | noop | \(selected : object\) | 点击确定时触发的回调函数 |
| onCancel | func | noop | \(selected : object\) | 点击取消时触发的回调函数 |

#### Picker.Date 额外的属性

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| mode | string | date | `year``date``time` | 指定日期选择模式，只有Picker.Date才生效 |
| format | string | 无 | 例：YYYY年MM月DD日<br /> 年:`YYYY`, 月:`MM`, 日:`DD`, 时:`hh`, 分:`mm`, 秒:`ss`。| 格式化显示值，只有Picker.Date才生效 |
| minuteStep | number | 1 | | 分钟步长 |



