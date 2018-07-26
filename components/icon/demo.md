## 图标 Icon

:::demo 基本用法
```jsx
import { Icon } from 'zarm';

const ICONS = [
  'right', 'right-round', 'right-round-fill',
  'wrong', 'wrong-round', 'wrong-round-fill',
  'info-round', 'info-round-fill',
  'question-round', 'question-round-fill',
  'warning-round', 'warning-round-fill',
  'arrow-left', 'arrow-right', 'arrow-top', 'arrow-bottom',
  'add', 'add-round', 'add-round-fill',
  'minus', 'minus-round', 'minus-round-fill',
  'broadcast', 'search',
];

class Demo extends React.Component {
  render() {
    return (
      <div className="grid">
        {
          ICONS.sort().map((icon, i) => {
            return (
              <div className="grid-column" key={+i}>
                <Icon className="icon" theme="primary" type={icon} />
                <span className="icon-name">{icon}</span>
              </div>
            );
          })
        }
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
| prefixCls | string | za-stepper | | 类名前缀 |
| className | string | | | 追加类名 |
| theme | string | 'default' | 'default', 'primary', 'info', 'success', 'warning', 'error' | 主题 |
| type | string | | 'right', 'right-round', 'right-round-fill','wrong', 'wrong-round', 'wrong-round-fill', 'info-round', 'info-round-fill', 'question-round', 'question-round-fill', 'warning-round', 'warning-round-fill', 'arrow-left', 'arrow-right', 'arrow-top', 'arrow-bottom', 'add', 'add-round', 'add-round-fill', 'minus', 'minus-round', 'minus-round-fill', 'broadcast' | 图标类型 |

:::