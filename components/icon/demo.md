# Icon 图标



## 基本用法
```jsx
import { Icon } from 'zarm';

const ICONS = [
 'add','arrow-top','arrow-bottom','arrow-left','arrow-right','broadcast','date','deletekey','info-round-fill','info-round','keyboard','minus','question-round','required','right-round-fill','right-round','right','search','time-circle','warning-round-fill','warning-round','wrong-round-fill','wrong-round','wrong'
];

class Demo extends React.Component {
  render() {
    return (
      <div className="grid">
        {
          ICONS.sort().map((icon, i) => {
            return (
              <div className="grid-column" key={+i}>
                <Icon type={icon} theme="primary" size="lg" />
                <span>{icon}</span>
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



## 颜色主题
```jsx
import { Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
       <div className="grid">
        <div className="grid-column">
          <Icon type="info-round" theme="warning" />
          <span>warning</span>
        </div>
        <div className="grid-column">
          <Icon type="info-round" theme="danger" />
          <span>danger</span>
        </div>
        <div className="grid-column">
          <Icon type="search" style={{ color: '#1890ff' }}/>
          <span>custom color</span>
        </div>
       </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```



## 尺寸大小
```jsx
import { Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
       <div className="grid">
        <div className="grid-column">
           <Icon type="warning-round" theme="primary" size="sm" />
           <span>sm</span>
        </div>
        <div className="grid-column">
           <Icon type="warning-round" theme="primary" />
           <span>md</span>
        </div>
        <div className="grid-column">
           <Icon type="warning-round" theme="primary" size="lg" />
           <span>lg</span>
        </div>
       </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'default' | 主题，可选值 `default`、`primary`、`success`、`warning`、`danger` |
| size | string | 'md' | 主题，可选值 `sm`、`md`、`lg` |
| type | string | - | 图标类型，可选值  `add`、`arrow-top`、`arrow-bottom`、`arrow-left`、`arrow-right`、`broadcast`、`date`、`deletekey`、`info-round-fill`、`info-round`、`keyboard`、`minus`、`question-round`、`required`、`right-round-fill`、`right-round`、`right`、`search`、`time-circle`、`warning-round-fill`、`warning-round`、`wrong-round-fill`、`wrong-round`、`wrong`|
