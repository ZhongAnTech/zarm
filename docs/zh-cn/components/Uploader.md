# 上传组件 Uploader

[demo页面](https://zhongantecheng.github.io/zarm/#/uploader)

### 引入

```js
import { Uploader } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<Uploader
  onChange={(file) => {
    console.log(file);
  }}>
  选择文件
</Uploader>
```

###### 设置允许上传的附件格式
```jsx
<Uploader accept="image/jpg, image/jpeg, image/gif, image/png">
  选择文件
</Uploader>
```

###### 允许多选
```jsx
<Uploader multiple>选择文件</Uploader>
```

###### 选择前的触发事件
```jsx
<Uploader onBeforeSelect={() => alert('执行 onBeforeSelect 方法')}>选择文件</Uploader>
```

###### 禁用状态
```jsx
<Uploader disabled>选择文件</Uploader>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-uploader | | 类名前缀 |
| className | string | | | 追加类名 |
| accept | string | | | 允许上传的附件格式 |
| multiple | bool | false | | 是否多选 |
| capture | string | | 照相机`camera`, 摄像机`camcorder`, 录音`microphone`| 唤起的原生应用 |
| disabled | bool | false | | 是否禁用 |
| onBeforeSelect | func | noop | | 选择前触发的事件 |
| onChange | func | noop | \(value: bool\) | 值变化时触发的回调函数 |




