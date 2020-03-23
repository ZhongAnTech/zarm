# Loading 加载



## 基本用法
```jsx
import { Loading, Cell, Button, ActivityIndicator } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <>
        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                Loading.show();
                setTimeout(() => {
                  Loading.hide();
                }, 3000);
              }}
            >
              开启
            </Button>
          }
        >
          普通
        </Cell>

        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                Loading.show({
                  content: <ActivityIndicator size="lg" />,
                  stayTime: 3000,
                });
              }}
            >
              开启
            </Button>
          }
        >
          自定义内容
        </Cell>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否展示 |
| content | ReactNode | - | 显示的内容 |
| stayTime | number | 3000 | 自动关闭前停留的时间（单位：毫秒） |
| mask | boolean | true | 是否展示遮罩层 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
| afterClose | () => void | - | Loading隐藏后的回调函数 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Loading 挂载的 HTML 节点 |

## 静态方法

```js
// 显示加载 Loading.show(content: LoadingProps)
Loading.show();
Loading.show({
  content: <ActivityIndicator size="lg" />,
});

// 隐藏Loading
Loading.hide();
```
