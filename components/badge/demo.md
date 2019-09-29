# Badge 徽标



## 基本用法
```jsx
import { Badge, Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell hasArrow title="点状" description={<Badge />} onClick={() => {}} />
    <Cell hasArrow title="直角" description={<Badge shape="rect" text="免费" />} onClick={() => {}} />
    <Cell hasArrow title="圆角" description={<Badge shape="radius" text="new" />} onClick={() => {}} />
    <Cell hasArrow title="椭圆角" description={<Badge shape="round" text="999+" />} onClick={() => {}} />
    <Cell hasArrow title="圆形" description={<Badge shape="circle" text={3} />} onClick={() => {}} />
    <Cell hasArrow title="叶形" description={<Badge shape="leaf" text="新品" />} onClick={() => {}} />
  </>
, mountNode);
```



## 多主题
```jsx
import { Badge } from 'zarm';

ReactDOM.render(
  <div className="custom-panel">
    <div className="box">
      <Badge theme="primary" />
    </div>
    <div className="box">
      <Badge theme="success" />
    </div>
    <div className="box">
      <Badge theme="warning" />
    </div>
    <div className="box">
      <Badge theme="danger" />
    </div>
    <div className="box">
      <Badge shape="round" text="999+" theme="primary" />
    </div>
    <div className="box">
      <Badge shape="round" text="999+" theme="success" />
    </div>
    <div className="box">
      <Badge shape="round" text="999+" theme="warning" />
    </div>
    <div className="box">
      <Badge shape="round" text="999+" theme="danger" />
    </div>
  </div>
, mountNode);
```



## 上标位置
```jsx
import { Badge } from 'zarm';

ReactDOM.render(
  <div className="custom-panel">
    <div className="box">
      <Badge shape="dot"><div className="box-item" /></Badge>
    </div>
    <div className="box">
      <Badge shape="rect" text="免费"><div className="box-item" /></Badge>
    </div>
    <div className="box">
      <Badge shape="radius" text="new"><div className="box-item" /></Badge>
    </div>
    <div className="box">
      <Badge shape="round" text="999+"><div className="box-item" /></Badge>
    </div>
    <div className="box">
      <Badge shape="circle" text="3"><div className="box-item" /></Badge>
    </div>
    <div className="box">
      <Badge shape="leaf" text="新品"><div className="box-item" /></Badge>
    </div>
  </div>
, mountNode);
```



## 文本示例
```jsx
import { Badge } from 'zarm';

ReactDOM.render(
  <div className="text-panel">
    <div className="box">
      <Badge shape="dot"><span className="box-text">邀请有奖</span></Badge>
    </div>
    <div className="box">
      <span className="box-text">邀请有奖</span><Badge shape="dot"/>
    </div>
  </div>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'danger' | 设置主题，可选值为 `primary`、`success`、`warning`、`danger` |
| shape | string | 'dot' | 设置形状，可选值为 `dot`、`rect` 、`radius`、`round`、`circle`、`leaf` |
| text | ReactNode | - | 设置显示的文字 |

