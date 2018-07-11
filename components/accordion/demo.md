## 手风琴 Accordion

:::demo 基本用法
```jsx
import { Accordion } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Accordion>
          <Accordion.Item title="50元套餐">
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="100元套餐">
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="200元套餐">
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 手风琴模式
```jsx
import { Accordion } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Accordion multiple={false} animated>
          <Accordion.Item title="50元套餐">
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="100元套餐">
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="200元套餐">
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 默认展开项
```jsx
import { Accordion } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Accordion defaultActiveIndex={[0, 1]}>
          <Accordion.Item title="50元套餐">
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
            <div>我是50元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="100元套餐">
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
            <div>我是100元套餐内容</div>
          </Accordion.Item>
          <Accordion.Item title="200元套餐">
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
            <div>我是200元套餐内容</div>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

### Accordion
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-accordion | | 类名前缀 |
| className | string | | | 追加类名 |
| multiple | boolean | true | | 是否可以同时展开多项 |
| animated | boolean | false | | 是否添加展开动画 |
| open | boolean | false | | 是否强制展开 |
| activeIndex | array or string or number | [] | | 动态更新展开项的索引数组或字符串或数字 |
| defaultActiveIndex | array or string or number | [] | | 初始化默认展开项的索引数组或字符串或数字 |
| onChange | <code>(index) => void</code> | noop | \(index: number\) | 点击某一项的回调函数 |

### Accordion.Item
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-accordion | | 类名前缀 |
| className | string | | | 追加类名 |
| title | string | | | 每一项的名称 |

:::
