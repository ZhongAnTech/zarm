## 导航栏 NavBar

:::demo 基本用法
```jsx
import { NavBar } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div className="normal-panel">
        <NavBar
          title='这是标题'
          left
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::
