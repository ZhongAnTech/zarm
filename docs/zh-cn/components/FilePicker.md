# 文件选择器 FilePicker

[demo页面](https://zhongantecheng.github.io/zarm/#/uploader)

### 引入

```js
import { FilePicker } from 'zarm';
```

### 代码演示

#### 基本用法

###### 普通
```jsx
<FilePicker
  onChange={(file) => {
    console.log(file);
  }}>
  选择文件
</FilePicker>
```

###### 设置允许上传的附件格式
```jsx
<FilePicker accept="image/jpg, image/jpeg, image/gif, image/png">
  选择文件
</FilePicker>
```

###### 允许多选
```jsx
<FilePicker multiple>选择文件</FilePicker>
```

###### 选择前的触发事件
```jsx
<FilePicker onBeforeSelect={() => alert('执行 onBeforeSelect 方法')}>选择文件</FilePicker>
```

###### 禁用状态
```jsx
<FilePicker disabled>选择文件</FilePicker>
```


### API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-filepicker | | 类名前缀 |
| className | string | | | 追加类名 |
| accept | string | | | 允许上传的附件格式 |
| multiple | boolean | false | | 是否多选 |
| capture | string | | 照相机`camera`, 摄像机`camcorder`, 录音`microphone`| 唤起的原生应用 |
| disabled | boolean | false | | 是否禁用 |
| onBeforeSelect | <code>() => boolean</code> | noop | | 选择前触发的事件 |
| onChange | <code>(file: Object &#124; Array&lt;Object&gt;) => void</code> | noop | \(file: Object &#124; Array&lt;Object&gt;\) | 值变化时触发的回调函数 |




