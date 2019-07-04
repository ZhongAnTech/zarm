# NavBar 导航栏



## 左侧渲染
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left={<Icon
          type="arrow-left"
          theme="success"
          onClick={() => window.history.back()}
        />}
        title="这是标题"
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 右侧渲染
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        title="这是标题这是标题这是标题"
        right={
          <Icon
            type="question-round"
            theme="success"
            onClick={() => window.alert('click icon')}
          />
        }
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 复数渲染
```jsx
import { NavBar, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <NavBar
        left={
          <Icon 
            type="arrow-left"
            theme="success"
            onClick={() => window.history.back()}
          />
        }
        title="这是标题"
        right={
          <>
            <Icon type="add" theme="success" onClick={() => alert('click icon1')} style={{ marginRight: 16 }} />
            <Icon
              type="question-round"
              theme="success"
              onClick={() => alert('click icon2')}
            />
          </>
        }
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | ReactNode | - | 标题渲染 |
| left | ReactNode | - | 导航栏左侧渲染 |
| right | ReactNode | - | 导航栏右侧渲染 |

