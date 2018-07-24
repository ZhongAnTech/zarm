## 面板 Panel

:::demo 基本用法
```jsx
import { Panel } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Header title="标题" more={<a href="/#" onClick={() => alert('click more')}>更多</a>} />
          <Panel.Body>
            <div className="box">内容</div>
          </Panel.Body>
          <Panel.Footer title="底部左侧" more="底部右侧" />
        </Panel>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

#### Panel
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| children | React.element | | | 内容 |


#### Panel.Header
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| title | React.element | | | 标题 |
| more | React.element | | | 更多 |


#### Panel.Footer
| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| title | React.element | | | 标题 |
| more | React.element | | | 更多 |

:::