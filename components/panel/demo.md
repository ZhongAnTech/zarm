## 面板 Panel

:::demo 基本用法
```jsx
import { Panel } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Panel
          titleRender="标题"
          moreRender={<a href="/#" onClick={() => alert('click more')}>更多</a>}
        >
          <div className="box">内容</div>
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
| titleRender | React.ReactNode | | | 标题渲染 |
| moreRender | React.ReactNode | | | 更多渲染 |
| prefixCls | string | za-panel | | 类名前缀 |
| className | string | | | 追加类名 |
| style | React.ReactNode | | |自定义样式|

:::
