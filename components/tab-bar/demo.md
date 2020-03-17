# TabBar 标签栏



## 基本用法
```jsx
import { Icon, TabBar, Cell, Button } from 'zarm';

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_4p9b5skcr79.js');

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
            icon={<TabIcon type="home" />}
          />
          <TabBar.Item
            itemKey="found"
            title="保险"
            icon={<TabIcon type="insurance" />}
            badge={{ shape: 'circle', text: '3' }}
          />
          <TabBar.Item
            itemKey="me"
            title="我的"
            icon={<TabIcon type="user" />}
            badge={{ shape: 'dot' }}
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
| title | ReactNode | - | 标题文字 |
| icon | ReactNode | - | 图标 |
| activeIcon | ReactNode | - | 选中时图标，不设置等同icon属性的值 |
| badge | Object | - | 参考`Badge`组件 |