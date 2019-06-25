# TabBar



## 基本用法
```jsx
import { TabBar, Cell, Button } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'home',
      visible: true
    }
  }
  render() {
    const { visible, activeKey } = this.state;
    return (
      <div>
      <Cell
          description={
            <Button
              size="xs"
              onClick={() => {
                this.setState({visible: !visible})
              }}
            >
              { visible ? '隐藏' : '展示'}
            </Button>
          }
        >
         隐藏 | 展示
        </Cell>
        <TabBar onChange={(value) => this.setState({activeKey: value})} activeKey={activeKey} visible={visible} >
          <TabBar.Item
            itemKey="home"
            title="主页"
            icon={ <div style={{
              width: '24px',
              height: '24px',
              background: 'url(//cdn-health.zhongan.com/zarm/home-active.svg) top left / 24px 24px no-repeat'}}></div>
            }
            activeIcon={<div style={{
              width: '24px',
              height: '24px',
              background: 'url(//cdn-health.zhongan.com/zarm/home.svg) top left / 24px 24px no-repeat'}}></div>
            }
          />
          <TabBar.Item
            itemKey="found"
            title="发现"
            icon={ <div style={{
              width: '24px',
              height: '24px',
              background: 'url(//cdn-health.zhongan.com/zarm/find-active.svg) top left / 24px 24px no-repeat'}}></div>
            }
            activeIcon={ <div style={{
              width: '24px',
              height: '24px',
              background: 'url(//cdn-health.zhongan.com/zarm/find.svg) top left / 24px 24px no-repeat'}}></div>
            }
          />
          <TabBar.Item
            itemKey="me"
            title="我的"
            icon={ <div style={{
              width: '24px',
              height: '24px',
              background: 'url(//cdn-health.zhongan.com/zarm/my-active.svg) top left / 24px 24px no-repeat'}}></div>
            }
            activeIcon={<div style={{
              width: '24px',
              height: '24px',
              background: 'url(//cdn-health.zhongan.com/zarm/my.svg) top left / 24px 24px no-repeat'}}></div>
            }       
            badge={{sup: true, shape: 'circle', text: '3'}}
          />
        </TabBar>
      </div>  
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

### TabBar

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| activeKey | number \| string | - | 当前选中项 |
| defaultActiveKey | number \| string | - | 初始选中项, 默认第一个选中 |
| onChange | (value?: number \| string) => void | - | 值变化时触发的回调函数 |
| visible | boolean | `true` | 是否显示 |


### TabBar.Item

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| itemKey | number \| string | - | 对应`activeKey` |
| title | React.ReactNode | - | 标题文字 |
| icon | React.ReactNode | - | 图标 |
| activeIcon | React.ReactNode | - | 选中时图标 |
| badge | Object | - | 参考`Badge`组件 |