# FilePicker 文件选择器



## 基本用法
```jsx
import { useState } from 'react';
import { Cell, FilePicker, Icon } from 'zarm';

const Demo = () => {
  const [files, setFiles] = useState([]);

  const onSelect = (file) => {
    console.log(file)
    const newFiles = files.concat(file);
    setFiles(newFiles);
  };

  return (
    <>
      {files.map((item, index) => <Cell key={+index}>{item.fileName}</Cell>)}
      <div className="file-picker-wrapper">
        <FilePicker
          className="file-picker-btn"
          onChange={onSelect}
        >
          <Icon type="add" size="lg" />
        </FilePicker>
      </div>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## 多选模式
```jsx
import { useState } from 'react';
import { Cell, FilePicker, Icon, Toast, Badge } from 'zarm';

const MAX_FILES_COUNT = 5;

const onBeforeSelect = () => {
  alert('执行 onBeforeSelect 方法');
}

const Demo = () => {
  const [files, setFiles] = useState([]);

  const onSelect = (selFiles) => {
    const newFiles = files.concat(selFiles);
    if (newFiles.length > MAX_FILES_COUNT) {
      Toast.show('最多只能选择5张图片')
      return;
    }
    setFiles(newFiles);
  }

  const remove = (index) => {
    const newFiles = [].concat(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    Toast.show('删除成功');
  };

  const imgRender = () => {
    return files.map((item, index) => {
      return (
        <Badge
          key={+index}
          className="file-picker-item"
          shape="circle"
          text={(
            <span className="file-picker-closebtn">
              <Icon type="wrong" />
            </span>
          )}
          onClick={() => remove(index)}
        >
          <div className="file-picker-item-img">
            <a href={item.thumbnail} target="_blank" rel="noopener noreferrer">
              <img src={item.thumbnail} alt="" />
            </a>
          </div>
        </Badge>
      );
    });
  }

  return (
    <div className="file-picker-wrapper">
      {imgRender()}
      {
        (files.length < MAX_FILES_COUNT) && (
          <FilePicker
            multiple
            className="file-picker-btn"
            accept="image/*"
            onBeforeSelect={onBeforeSelect}
            onChange={onSelect}
          >
            <Icon type="add" size="lg" />
          </FilePicker>
        )
      }
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## 禁用状态
```jsx
import { FilePicker, Icon } from 'zarm';

ReactDOM.render(
  <div className="file-picker-wrapper">
    <FilePicker className="file-picker-btn" disabled>
      <Icon type="add" size="lg" />
    </FilePicker>
  </div>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| accept | string | - | 允许上传的附件格式 |
| capture | string | - | 唤起的原生应用，可选值：照相机`camera`, 摄像机`camcorder`, 录音`microphone` |
| multiple | boolean | false | 是否多选 |
| disabled | boolean | false | 是否禁用 |
| onBeforeSelect | () => boolean | () => true | 选择前触发的事件 |
| onChange | (file?: object \| object[]) => void | - | 值变化时触发的回调函数 |