# Cell 列表项



## 基本用法
```jsx
import { Cell } from 'zarm';

ReactDOM.render(<Cell title="标题文字" />, mountNode);
```



## 带描述
```jsx
import { Cell, Icon } from 'zarm';

ReactDOM.render(
  <>
    <Cell title="标题文字" description="描述文字" />
    <Cell title="标题文字" description={<Icon type="add" theme="primary" size="sm" />} />
  </>
, mountNode);
```



## 带图标、标题
```jsx
import { Cell, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

ReactDOM.render(
  <>
    <Cell title="标题文字" icon={<Icon type="broadcast" theme="primary" />} />
    <Cell title="标题文字" icon={<img alt="" src={img} style={{ width: 24, height: 24 }} />} />
  </>
, mountNode);
```



## 带跳转
```jsx
import { Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell title="标题文字" onClick={() => {}} />
    <Cell title="标题文字" onClick={() => {}} />
  </>
, mountNode);
```


## 带描述、箭头、跳转
```jsx
import { Cell } from 'zarm';

ReactDOM.render(
  <>
    <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
    <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
  </>
, mountNode);
```



## 带图标、描述、箭头、跳转
```jsx
import { Cell, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

ReactDOM.render(
  <>
    <Cell
      hasArrow
      title="标题文字"
      description="描述文字"
      icon={<Icon type="broadcast" theme="primary" />}
      onClick={() => {}}
    />

    <Cell 
      hasArrow
      title="标题文字"
      description="描述文字"
      icon={
        <img alt="" src={img} style={{ width: 24, height: 24 }} />
      }
      onClick={() => {}}
    />

    <Cell
      hasArrow
      title={
        <div className="box">
          <div className="box-title">标题文字</div>
          <div className="box-description">描述文字</div>
        </div>
      }
      description="附加提示"
      icon={<img alt="" src={img} style={{ width: 48, height: 48 }} />}
      onClick={() => {}}
    />
  </>
, mountNode);
```



## 提示信息
```jsx
import { Cell, Message, Icon, Input } from 'zarm';

ReactDOM.render(
  <Cell
    title="标题"
    help={<Message theme="danger" icon={<Icon type="warning-round" size="sm" />}>标题不能为空</Message>}
  >
    <Input type="text" placeholder="请输入标题" />
  </Cell>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| hasArrow | boolean | false | 是否显示箭头 |
| icon | ReactNode | - | 设置图标 |
| title | ReactNode | - | 设置标题区域内容 |
| description | ReactNode | - | 设置描述区域内容 |
| help | ReactNode | - | 设置下方提示信息区域内容，通常配合 `Message` 组件使用 |
| onClick | () => void | - | 点击后触发的回调函数 |
