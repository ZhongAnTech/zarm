## 轻提示 Toast



### 基本用法
```jsx
import { Toast, Cell, Button, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          description={
            <Button
              size="xs"
              theme="error"
              onClick={() => {
                Toast.show('默认3秒自动关闭');
              }}
            >
              开启
            </Button>
          }
        >
          错误提示
        </Cell>

        <Cell
          description={
            <Button
              size="xs"
              theme="success"
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
          成功提示
        </Cell>

        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                Toast.show('指定10秒自动关闭', 10000);
              }}
            >
              开启
            </Button>
          }
        >
          指定关闭时间
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



### 加载中
```jsx
import { Loading, Cell, Button } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                Loading.show();
                setTimeout(()=>{
                  Loading.hide();
                }, 1100);
              }}
            >
              开启
            </Button>
          }
        >
          Loading
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



### API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| stayTime | number | 3000 | 自动关闭前停留的时间（单位：毫秒） |
| onClose | () => void | - | 关闭时触发的回调函数 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
