# Icon 图标



## 基本用法
```jsx
import { Icon } from 'zarm';

const ICONS = [
 'add','arrow-bottom-fill','arrow-bottom','arrow-left','arrow-right','arrow-top-fill','arrow-top','broadcast','brush','date','deletekey','empty-fill','folder-fill','folder','info-round-fill','info-round','keyboard','loading','minus-round','minus','question-round','required','right-round-fill','right-round','right','search','time-circle','user-fill','user','warning-round-fill','warning-round','wrong-round-fill','wrong-round','wrong'
];

class Demo extends React.Component {
  render() {
    return (
      <div className="grid">
        {
          ICONS.sort().map((icon, i) => {
            return (
              <div className="grid-column" key={+i}>
                <Icon className="icon" theme="primary" type={icon}/>
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

 ### 颜色主题
```js

import { Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
       <div className="grid">
        <div className="grid-column" key={'2-1'}>
          <Icon type="wrong" theme="warning"/>
          <span>wrong</span>
        </div>
        <div className="grid-column" key={'2-2'}>
          <Icon type="search" style={{color: '#f50'}}/>
          <span>search</span>
        </div>
       </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```

### 尺寸主题
```js
import { Icon } from 'zarm';

class Demo3 extends React.Component {
  render() {
    return (
       <div className="grid">
        <div className="grid-column" key={'3-1'}>
           <Icon type="info-round" theme="primary" size={18}/>
           <span>info-round</span>
        </div>
        <div className="grid-column" key={'3-2'}>
           <Icon type="info-round" theme="primary" style={{fontSize: '26px'}}/>
           <span>info-round</span>
        </div>
        <div className="grid-column" key={'3-3'}>
           <Icon type="info-round" theme="primary" size='xl'/>
           <span>info-round</span>
        </div>
       </div>
    )
  }
}

ReactDOM.render(<Demo3 />, mountNode)
```


## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'default' | 主题，可选值 `default`、`primary`、`success`、`warning`、`danger` |
| type | string | - | 图标类型，可选值 `add`、`arrow-bottom-fill`、`arrow-bottom`、`arrow-left`、`arrow-right`、`arrow-top-fill`、`arrow-top`、`broadcast`、`brush`、`date`、`deletekey`、`empty-fill`、`folder-fill`、`folder`、`info-round-fill`、`info-round`、`keyboard`、`loading`、`minus-round`、`minus`、`question-round`、`required`、`right-round-fill`、`right-round`、`right`、`search`、`time-circle`、`user-fill`、`user`、`warning-round-fill`、`warning-round`、`wrong-round-fill`、`wrong-round`、`wrong` |
