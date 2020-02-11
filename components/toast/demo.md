# Toast 轻提示


## 基本用法
```jsx
import { Toast, Cell, Button, Icon } from 'zarm';

const Demo = () => (
  <>
    <Cell
      description={
        <Button
          size="xs"
          onClick={() => {
            Toast.show('默认3秒自动关闭');
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
            Toast.show({
              content: '指定5秒后自动关闭',
              stayTime: 5000,
              afterClose: () => {
                console.log('Toast已关闭');
              }
            })
          }}
        >
          开启
        </Button>
      }
    >
      指定停留时间
    </Cell>

    <Cell
      description={
        <Button
          size="xs"
          onClick={() => {
            Toast.show({
              content: '不可同时进行其他交互',
              mask: true,
              afterClose: () => {
                console.log('Toast已关闭');
              }
            })
          }}
        >
          开启
        </Button>
      }
    >
      有遮罩层
    </Cell>

    <Cell
      description={
        <Button
          size="xs"
          onClick={() => {
            Toast.show(
              <div className="box">
                <Icon className="box-icon" type="right-round-fill" />
                <div className="box-text">
                  预约成功
                </div>
              </div>
            );
          }}
        >
          开启
        </Button>
      }
    >
      自定义内容
    </Cell>
  </>
);

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否展示 |
| content | ReactNode | - | 显示的内容 |
| stayTime | number | 3000 | 自动关闭前停留的时间（单位：毫秒） |
| mask | boolean | false | 是否展示遮罩层 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
| afterClose | () => void | - | Toast隐藏后的回调函数 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定Toast挂载的HTML节点 |

## 静态方法

```js
// 显示轻提示 Toast.show(content: ReactNode | ToastProps)
Toast.show('默认3秒自动关闭');
Toast.show({
  content: '指定5秒后自动关闭',
  stayTime: 5000,
  afterClose: () => {
    console.log('Toast已关闭');
  }
});

// 隐藏轻提示
Toast.hide();
```
