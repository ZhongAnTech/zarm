# FilePicker 文件选择器



## 基本用法
```jsx
import { Cell, FilePicker, Icon } from 'zarm';

class Demo extends React.Component {
  state = {
    files: [],
  };

  onSelect(file) {
    console.log(file);
    const { files } = this.state;
    files.push(file);

    this.setState({
      files,
    });
  }

  render() {
    return (
      <div>
        {this.state.files.map((item, index) => <Cell key={+index}>{item.fileName}</Cell>)}
        <div className="file-picker-wrapper">
          <FilePicker
            className="file-picker-btn"
            onChange={selected => this.onSelect(selected)}
          >
            <Icon type="add" size="lg" />
          </FilePicker>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 多选模式
```jsx
import { Cell, FilePicker, Icon, Toast, Badge } from 'zarm';

const MAX_FILES_COUNT = 5;

const onBeforeSelect = () => {
  alert('执行 onBeforeSelect 方法');
}

class Demo extends React.Component {
  state = {
    files: [],
  };

  onSelect(selFiles) {
    let { files } = this.state;
    files = files.concat(selFiles);
    if (files.length > MAX_FILES_COUNT) {
      Toast.show('最多只能选择5张图片')
      return;
    }
    this.setState({ files });
  }

  remove(index) {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({ files });
    Toast.show('删除成功');
  }

  imgRender() {
    const { files } = this.state;

    return files.map((item, index) => {
      return (
        <Badge
          key={+index}
          sup
          className="file-picker-item"
          shape="circle"
          text={<Icon type="wrong-round-fill" size="sm" theme="danger" />}
          onClick={() => this.remove(index)}
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

  render() {
    return (
      <div>
        <div className="file-picker-wrapper">
          {this.imgRender()}
          {
            (this.state.files.length < MAX_FILES_COUNT) && (
              <FilePicker
                multiple
                className="file-picker-btn"
                accept="image/*"
                onBeforeSelect={onBeforeSelect}
                onChange={selected => this.onSelect(selected)}
              >
                <Icon type="add" size="lg" />
              </FilePicker>
            )
          }
        </div>
      </div>
    )
  }
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