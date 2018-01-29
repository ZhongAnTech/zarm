# 文本框 Input

[demo页面](https://zhongantecheng.github.io/zarm/#/input)

### 引入

```js
import { Input } from 'zarm';
```

### 代码演示

#### 基本用法

###### 单行文本
```jsx
<Input type="text" placeholder="type is text" />
```

###### 多行文本
```jsx
<Input type="textarea" rows={3} placeholder="type is textarea" />
```

#### 高度自适应
```jsx
<Input autoHeight type="textarea" rows={3} placeholder="写点啥..." />
```

#### 显示输入字数
```jsx
<Input autoHeight showLength type="textarea" rows={4} maxLength={200} placeholder="摘要" />
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-input | | 类名前缀 |
| className | string | | | 追加类名 |
| type | string | `text` | `text`, `textarea` | 显示类型 |
| value | string |  | | 值 |
| defaultValue | string |  | | 初始值 |
| disabled | boolean | false | | 是否禁用 |
| rows | number | | | 多行文本时的显示行数 |
| autoHeight | boolean | false | | 是否高度自适应 |
| maxLength | number | | | 输入字数上限 |
| showLength | boolean | false | | 是否显示输入字数 |
| onChange | <code>(value: string) => void</code> | noop | \(value: string\) | 值变化时触发的回调函数 |




