# List 列表

## 基本用法

```jsx
import { List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="Item 1" />
    <List.Item title="Item 2" />
    <List.Item title="Item 3" />
  </List>,
  mountNode,
);
```

## 可点击的

```jsx
import { List } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item hasArrow title="Item 1" onClick={() => {}} />
    <List.Item hasArrow title="Item 2" onClick={() => {}} />
    <List.Item hasArrow title="Item 3" onClick={() => {}} />
  </List>,
  mountNode,
);
```

## 带尾部信息

```jsx
import { List, Icon, Badge, Switch } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item hasArrow title="Item 1" after="more" onClick={() => {}} />
    <List.Item
      hasArrow
      title="Item 2"
      after={<Badge shape="circle" text={3} />}
      onClick={() => {}}
    />
    <List.Item
      title="Item 3"
      after={
        <Icon type="add" theme="primary" onClick={() => window.alert('You clicked the icon')} />
      }
    />
    <List.Item title="Item 4" after={<Switch />} />
  </List>,
  mountNode,
);
```

## 带描述信息

```jsx
import { List, Icon, Badge, Switch } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="React" info="A JavaScript library for building user interfaces" />
    <List.Item
      hasArrow
      title="Zarm"
      info="Pursue the ultimate user experience and build a component library with warmth"
      onClick={() => {}}
    />
  </List>,
  mountNode,
);
```

## 带图标的

```jsx
import { List, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

ReactDOM.render(
  <List>
    <List.Item
      hasArrow
      prefix={<Icon type="broadcast" theme="primary" style={{ fontSize: 24 }} />}
      title="Vue"
      onClick={() => {}}
    />
    <List.Item
      hasArrow
      prefix={<img alt="" src={img} style={{ width: 28, height: 28 }} />}
      title="React"
      info="A JavaScript library for building user interfaces"
      onClick={() => {}}
    />
    <List.Item
      hasArrow
      prefix={<img alt="" src={img} style={{ width: 48, height: 48 }} />}
      title="Zarm"
      info="Pursue the ultimate user experience and build a component library with warmth"
      after="more"
      onClick={() => {}}
    />
  </List>,
  mountNode,
);
```

## 表单列表

```jsx
import { List, Input, CustomInput, Message, Icon } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="姓名" info="最少8个字符，由英文字母、数字组成">
      <Input placeholder="请输入" />
    </List.Item>
    <List.Item title="年龄">
      <CustomInput placeholder="请输入" />
    </List.Item>
    <List.Item title="简介">
      <Input rows={3} placeholder="请输入" />
    </List.Item>
  </List>,
  mountNode,
);
```

## 自定义内容

```jsx
import { List, Icon } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item hasArrow onClick={() => {}}>
      <div className="box">
        <div className="box-title">标题文字</div>
        <div className="box-description">描述文字</div>
      </div>
    </List.Item>
  </List>,
  mountNode,
);
```

## API

| 属性     | 类型       | 默认值 | 说明                     |
| :------- | :--------- | :----- | :----------------------- |
| hasArrow | boolean    | false  | 是否显示箭头             |
| prefix   | ReactNode  | -      | 左侧前缀区域内容         |
| title    | ReactNode  | -      | 标题                     |
| after    | ReactNode  | -      | 右侧尾部区域内容         |
| info     | ReactNode  | -      | 设置下方提示信息区域内容 |
| onClick  | () => void | -      | 点击后触发的回调函数     |
