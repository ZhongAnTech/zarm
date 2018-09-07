## 动作面板 ActionSheet

:::demo 基本用法
```jsx
import { ActionSheet, Cell, Button } from 'zarm';

const BUTTONS = [
  {
    text: '操作一',
    onClick: () => console.log('点击操作一'),
  },
  {
    text: '操作二',
    onClick: () => console.log('点击操作二'),
  },
  {
    theme: 'error',
    text: '操作三',
    onClick: () => console.log('点击操作三'),
  },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      visible3: false,
    };
  }

  toggle(key) {
    this.setState({
      [`${key}`]: !this.state[key],
    });
  }

  render() {
    return (
      <div>
        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('visible1')}>开启</Button>
          }
        >
          普通
        </Cell>
        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('visible2')}>开启</Button>
          }
        >
          带取消操作
        </Cell>
        <Cell
          description={
            <Button size="xs" onClick={() => this.toggle('visible3')}>开启</Button>
          }
        >
          圆角、留边
        </Cell>

        <ActionSheet
          visible={this.state.visible1}
          actions={BUTTONS}
          onMaskClick={() => this.toggle('visible1')}
        />
        <ActionSheet
          visible={this.state.visible2}
          actions={BUTTONS}
          onMaskClick={() => this.toggle('visible2')}
          onCancel={() => this.toggle('visible2')}
        />
        <ActionSheet
          spacing
          shape="radius"
          visible={this.state.visible3}
          actions={BUTTONS}
          onMaskClick={() => this.toggle('visible3')}
          onCancel={() => this.toggle('visible3')}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-action-sheet | | 类名前缀 |
| className | string | | | 追加类名 |
| shape | string | | 'radius' | 形状 |
| visible | boolean | false | | 是否显示 |
| spacing | boolean | false | | 是否和外部有间距 |
| actions | Action[] | [ ] | Action = { text: string, <br /> theme?: 'default' &#124; 'primary' &#124; 'info' &#124; 'success' &#124; 'warning' &#124; 'error', <br /> className?: string, <br /> onClick?: () => void} | 动作列表 |
| onMaskClick | <code>() => void</code> | noop | | 点击遮罩层时触发的回调函数 |
| onCancel | <code>() => void</code> | noop | | 显示取消菜单，点击时触发的回调函数 |
| cancelText | string | '取消' |  | 取消菜单的文案 |

:::
