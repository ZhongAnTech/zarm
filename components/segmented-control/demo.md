## 搜索框 SegmentedControl

:::demo 基本用法
```jsx
import { SegmentedControl } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SegmentedControl items={["选项一","选项2"]}/>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo value值可变(不会执行onChange)
```jsx
import { SegmentedControl } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      items: ["选项1","选项2","选项3"],
      selectIndex:"选项2"
    };
    this.timer = null;
  }

  componentDidMount(){
    let i = 0;
    this.timer = setInterval(()=>{
      i++;
      i = i > 2 ? 0 : i;
      this.setState({
        selectIndex:i
      });
    },1000)
  }
  componentUmmount(){
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <SegmentedControl shape={'round'} selectIndex={this.state.selectIndex} items={this.state.items}/>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 多项(最多4项)
```jsx
import { SegmentedControl, Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <SegmentedControl shape={'rect'} items={["选项一","选项2","选项3"]}/>
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
| prefixCls | string | za-segmented-control | | 类名前缀 |
| className | string | | | 追加类名 |
| style | React.CSSProperties | | | 自定义样式 |
| onChange | <code>(selectIndex: number) => void</code> | | | 值变化时触发的回调函数 |
| items | string[] | | | 选项列表 |
| shape | string | `radius` | `radius`, `round`, `rect` | 椭圆角,圆角或方形 |
| block | boolean | false | | 是否块级元素 |
| selectIndex | number | 0 | | 选中项的索引 |

:::