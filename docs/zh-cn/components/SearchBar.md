# 搜索框 SearchBar

[demo页面](https://zhongantecheng.github.io/zarm/#/searchBar)

### 引入

```js
import { SearchBar } from 'zarm';
```

### 代码演示

#### 基本用法

###### 基本
```jsx
<SearchBar
  shape="round"
  cancelText="取消"
  placeholder="搜索"
  onSubmit={(value) => {
    console.log(`搜索内容为${value}`);
  }}
  onFocus={() => {
    console.log('获取焦点');
  }}
  onChange={(value) => {
    console.log(value);
  }}
  onBlur={() => {
    console.log('失去焦点');
  }}
  onClear={() => {
    console.log('点击了清除');
  }}
  onCancel={() => {
    console.log('点击了取消');
  }}
/>
```

###### 始终显示取消按钮
```jsx
<SearchBar
  showCancel
  value={this.state.value}
  placeholder="搜索"
  onChange={(value) => {
    console.log(value);
    this.setState({
      value,
    });
  }}
  onClear={(value) => {
    console.log('清除了 -> ', value);
    this.setState({
      value: '',
    });
  }}
/>
```

###### 手动获取焦点
```jsx
<SearchBar
  shape="radius"
  cancelText="取消"
  placeholder="搜索"
  ref={(ref) => { this.manualFocus = ref; }}
/>
<div className="button-wrap"><Button theme="primary" size="sm" shape="radius" onClick={() => { console.log(this.manualFocus); this.manualFocus.focus(); }}>点击获取焦点</Button></div>
```


### SearchBar API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-input | | 类名前缀 |
| className | string | | | 追加类名 |
| placeholder | string | '搜索' | | 占位符 |
| value | string | | | 值 |
| defaultValue | string |  | | 初始值 |
| shape | string | | `radius`, `round` | 圆角或者椭圆角 |
| disabled | boolean | false | | 是否禁用 |
| showCancel | boolean | false | | 是否一直展示取消按钮 |
| cancelText | any | '取消' | | 取消按钮显示的内容 |
| maxLength | number | | | 输入字数上限 |
| clearable | boolean | true | | 是否提供清空输入框功能 |
| onChange | <code>(value: string) => void</code> | noop | \(value: string\) | 值变化时触发的回调函数 |
| onSubmit | <code>(value: string) => void</code> | noop | \(value: string\) | 提交时触发的回调函数 |
| onFocus | <code>() => void</code> | noop | | 获取焦点时触发的回调函数 |
| onBlur | <code>() => void</code> | noop | | 失去焦点时触发的回调函数 |
| onClear | <code>() => void</code> | noop | | 点击清除按钮时触发的回调函数 |
| onCancel | <code>() => void</code> | noop | | 点击取消时触发的回调函数 |
