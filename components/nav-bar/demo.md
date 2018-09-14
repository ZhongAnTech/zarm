## 导航栏 NavBar

:::demo 基本用法
```jsx
import { NavBar } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left
        title='这是标题'
        right='test'
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::
