## 动作面板 ActionSheet



### 基本用法
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


### API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| shape | string | 'rect' | 形状，可选值 `rect`、`radius` |
| visible | boolean | false | 是否显示 |
| spacing | boolean | false | 是否和外部有间距 |
| actions | Action[] | [] | 动作列表 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |
| onCancel | () => void | - | 显示取消菜单，点击时触发的回调函数 |
| cancelText | string | '取消' | 取消菜单的文案 |

#### Action 类型定义
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| text | string | - | 按钮文字 |
| theme | string | 'default' | 按钮主题，可选值 `default`、`primary`、`success`、`warning`、`error`
| onClick | () => void | - | 按钮点击后触发的回调函数 |