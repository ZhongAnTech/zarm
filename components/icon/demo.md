# Icon 图标



## 基本用法
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



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'default' | 主题，可选值 `default`、`primary`、`success`、`warning`、`danger` |
| type | string | - | 图标类型，可选值 `right`、`right-round`、`right-round-fill`,`wrong`、`wrong-round`、`wrong-round-fill`、`info-round`、`info-round-fill`、`question-round`、`question-round-fill`、`warning-round`、`warning-round-fill`、`arrow-left`、`arrow-right`、`arrow-top`、`arrow-bottom`、`add`、`add-round`、`add-round-fill`、`minus`、`minus-round`、`minus-round-fill`、`broadcast` |
