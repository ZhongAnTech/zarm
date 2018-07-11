## 文件选择器 FilePicker

:::demo 基本用法
```jsx
import { Cell, FilePicker, Icon } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

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
        <div className="filepicker-wrapper">
          <FilePicker
            className="filepicker-btn"
            onChange={selected => this.onSelect(selected)}
          >
            <Icon type="add" />
          </FilePicker>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 多选模式
```jsx
import { Cell, FilePicker, Icon, Toast, Badge } from 'zarm';

const MAX_FILES_COUNT = 5;

function onBeforeSelect() {
  alert('执行 onBeforeSelect 方法');
}

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

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
          className="filepicker-item"
          shape="circle"
          text={<Icon type="wrong" />}
          onClick={() => this.remove(index)}
        >
          <div className="filepicker-item-img">
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
        <div className="filepicker-wrapper">
          {this.imgRender()}
          {
            (this.state.files.length < MAX_FILES_COUNT) && (
              <FilePicker
                multiple
                className="filepicker-btn"
                accept="image/*"
                onBeforeSelect={onBeforeSelect}
                onChange={selected => this.onSelect(selected)}
              >
                <Icon type="add" />
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
:::


:::demo 禁用状态
```jsx
import { FilePicker, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div className="filepicker-wrapper">
        <FilePicker className="filepicker-btn" disabled>
          <Icon type="add" />
        </FilePicker>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

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

:::