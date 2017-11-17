# 列表项 Cell

[demo页面](https://zhongantecheng.github.io/zarm/#/cell)

### 引入

```js
import { Cell } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Cell title="标题文字" />
<Cell
  title={
    <div className="box">
      <div className="box-title">标题文字</div>
      <div className="box-description">描述文字</div>
    </div>
  }
  />
```

###### 带描述
```jsx
<Cell title="标题文字" description="描述文字" />
<Cell title="标题文字" description={<Icon type="right" />} />
```

###### 带图标、描述
```jsx
<Cell title="标题文字" icon={<Icon type="right" />} />
<Cell title="标题文字" icon={<img alt="" src={require('../images/icons/state.png')} />} />
```

###### 带跳转
```jsx
<Cell hasArrow title="标题文字" onClick={() => {}} />
```

#### 提示信息
```jsx
<Cell
  title="标题"
  help={<Message theme="error" icon={<Icon type="info-round" />}>标题不能为空</Message>}>
  <Input type="text" placeholder="请输入标题" />
</Cell>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-cell | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | `primary` | `default`, `primary`, `info`, `success`, `warning`, `error` | 主题 |
| icon | any | | | 显示的图标 |
| titile | any | | | 标题 |
| description | any | | | 描述 |
| hasArrow | boolean | false | | 是否显示箭头 |
| help | any | | | 下方提示信息，通常配合`Message`组件使用 |
| onClick | <code>() => void</code> | noop | | 点击后触发的回调函数 |






