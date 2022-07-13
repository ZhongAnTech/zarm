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

## CSS 变量

| 属性                      | 默认值                                                          | 说明                   |
| :------------------------ | :-------------------------------------------------------------- | :--------------------- |
| --item-height             | '44px'                                                          | 列表项高度             |
| --item-padding-horizontal | '16px'                                                          | 列表项横向内边距       |
| --item-padding-vertical   | '8px'                                                           | 列表项纵向内边距       |
| --item-background         | '#fff'                                                          | 列表项背景色           |
| --item-active-background  | 'rgba(0, 0, 0, 0.15)'                                           | 列表项激活状态背景色   |
| --item-separator-color    | 'rgba(60, 60, 67, 0.36)'                                        | 列表项分隔线颜色       |
| --item-title-font-size    | 'var(--za-font-size-md)'                                        | 列表项标题字体大小     |
| --item-title-white-space  | 'nowrap'                                                        | 列表项标题换行         |
| --item-title-line-height  | 'calc(var(--item-height) - var(--item-padding-vertical) \* 2))' | 列表项标题行高         |
| --item-after-text-color   | 'rgba(0, 0, 0, 0.45)'                                           | 列表项尾部字体颜色     |
| --item-space              | '5px'                                                           | 列表项元素之间的间距   |
| --item-arrow-border-width | '2px'                                                           | 列表项尾部箭头宽度     |
| --item-arrow-color        | 'rgba(0, 0, 0, 0.2)'                                            | 列表项尾部箭头的颜色   |
| --item-arrow-size         | '10px'                                                          | 列表项尾部箭头的大小   |
| --item-info-font-size     | '12px'                                                          | 列表项补充信息字体大小 |
| --item-info-text-color    | 'rgba(60, 60, 67, 0.6)'                                         | 列表项补充信息字体颜色 |
| --item-info-line-height   | '16px'                                                          | 列表项补充信息行高     |
| --item-inline-title-width | 'var(--za-input-label-width)'                                   | 表单内联下标题宽度     |
