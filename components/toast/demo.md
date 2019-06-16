# Toast 轻提示



## 基本用法
```jsx
import { Toast, Cell, Button, Icon } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      test: false,
    }
  }
  render() {
    return (
      <div>
        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                this.setState({
                  visible: true,
                })
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
                Toast.show('指定5秒后自动关闭', 5000, false, () => {
                  console.log('Toast已关闭');
                });
              }}
            >
              开启
            </Button>
          }
        >
          指定停留时间（无遮罩层）
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

        <Toast
          visible={this.state.visible}
          afterClose={() => { this.setState({ visible: false }) }}
          mask={false}
          stayTime={3000}>
          默认3秒自动关闭{this.state.test}
        </Toast>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 加载中
```jsx
import { Loading, Cell, Button } from 'zarm';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      test: false,
    }
  }
  render() {
    return (
      <div>
        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                this.setState({
                  visible: true,
                })
                // setTimeout(() => {
                //   this.setState({
                //     visible: false,
                //   });
                // }, 1000);
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
                Loading.show(null, 5000, false, () => {
                  console.log('loading已关闭')
                });
              }}
            >
              开启
            </Button>
          }
        >
          Loading（无遮罩层）
        </Cell>

        <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                Loading.show('wait');
                setTimeout(()=>{
                  Loading.hide();
                }, 3000);
              }}
            >
              开启
            </Button>
          }
        >
          Loading（自定义）
        </Cell>

        <Loading
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); }}
          stayTime={3000} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| stayTime | number | 3000 | 自动关闭前停留的时间（单位：毫秒） |
| onClose | () => void | - | 关闭时触发的回调函数 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
