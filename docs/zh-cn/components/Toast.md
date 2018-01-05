# 轻提示 Toast

[demo页面](https://zhongantecheng.github.io/zarm/#/toast)

### 引入

```js
import { Toast } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Toast
  visible={this.state.visible}
  onMaskClick={this.setState({ visible: false })}>
  默认3秒自动关闭
</Toast>
```

###### 指定停留时间
```jsx
<Toast
  visible={this.state.visible}
  onMaskClick={this.setState({ visible: false })}
  stayTime={10000}>
  指定10秒自动关闭
</Toast>
```

###### 自定义内容
```jsx
<Toast
  visible={this.state.visible}
  onMaskClick={this.setState({ visible: false })}>
  <div className="box">
    <Icon className="box-icon" type="right-round-fill" />
    <div className="box-text">预约成功</div>
  </div>
</Toast>
```

#### 单例模式
```js
// 开启
Toast.show('提示内容');
Toast.show('提示内容', 3000);
Toast.show('提示内容', 3000, () => { console.log('onClose') });

// 关闭
Toast.hide();
```

### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-toast | | 类名前缀 |
| className | string | | | 追加类名 |
| visible | boolean | false | | 是否显示 |
| stayTime | number | 3000 | | 自动关闭前停留的时间（单位：毫秒） |
| onClose | <code>() => void</code> | noop | | 关闭时触发的回调函数 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |



