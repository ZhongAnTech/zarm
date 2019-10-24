# SearchBar 搜索框






## 始终展示取消按钮
```jsx
import { SearchBar } from 'zarm';

class Demo extends React.Component {
  state = {
    value: '',
    showCancel: false,
  };
  componentDidMount() {
    this.setState({
      showCancel: true
    })
  }
  render() {
    return (
      <>
        <SearchBar
          showCancel={this.state.showCancel}
          value={this.state.value}
          placeholder="搜索"
          cancelText="取消"
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
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```







## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| placeholder | string | '搜索' | 占位符 |
| value | string | - | 值 |
| defaultValue | string | - | 初始值 |
| shape | string | 'radius' | 形状，可选值 `rect`, `radius`, `round` |
| disabled | boolean | false | 是否禁用 |
| showCancel | boolean | false | 是否一直展示取消按钮 |
| cancelText | string | '取消' | 取消按钮显示的内容 |
| maxLength | number | - | 输入字数上限 |
| clearable | boolean | true | 是否提供清空输入框功能 |
| onChange | (value?: string) => void | - | 值变化时触发的回调函数 |
| onSubmit | (value?: string) => void | - | 提交时触发的回调函数 |
| onFocus | () => void | - | 获取焦点时触发的回调函数 |
| onBlur | () => void | - | 失去焦点时触发的回调函数 |
| onClear | () => void | - | 点击清除按钮时触发的回调函数 |
| onCancel | () => void | - | 点击取消时触发的回调函数 |
