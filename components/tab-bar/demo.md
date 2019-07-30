# TabBar 标签栏



## 基本用法
```jsx
import { TabBar, Cell, Button } from 'zarm';

const tabIcon = (key) => (
  <div
    style={{
      width: 24,
      height: 24,
      background: `url(//cdn-health.zhongan.com/zarm/${key}.svg) top left / 24px 24px no-repeat`,
    }}
  />
);

class Demo extends React.Component {
  state = {
    activeKey: 'home',
    visible: true
  };

  render() {
    const { visible, activeKey } = this.state;
    return (
      <>
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

        <TabBar
          visible={visible}
          activeKey={activeKey}
          onChange={(value) => this.setState({activeKey: value})}>
          <TabBar.Item
            itemKey="home"
            title="主页"
            icon={tabIcon('home-active')}
            activeIcon={tabIcon('home')}
          />
          <TabBar.Item
            itemKey="found"
            title="发现"
            icon={tabIcon('find-active')}
            activeIcon={tabIcon('find')}
            badge={{ sup: true, shape: 'circle', text: '3' }}
          />
          <TabBar.Item
            itemKey="me"
            title="我的"
            icon={tabIcon('my-active')}
            activeIcon={tabIcon('my')}
            badge={{ sup: true, shape: 'dot' }}
          />
        </TabBar>
      </>  
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
| itemKey | number \| string | - | 唯一标识，对应`activeKey` |
| title | React.ReactNode | - | 标题文字 |
| icon | React.ReactNode | - | 图标 |
| activeIcon | React.ReactNode | - | 选中时图标 |
| badge | Object | - | 参考`Badge`组件 |