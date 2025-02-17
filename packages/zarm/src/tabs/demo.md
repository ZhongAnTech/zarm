# Tabs 标签页

## 基本用法

```jsx
import { useState } from 'react';
import { Tabs } from 'zarm';

const { Panel } = Tabs;

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs value={value} onChange={setValue}>
      <Panel title="选项卡1">
        <div className="content">选项卡1内容</div>
      </Panel>
      <Panel title="选项卡2">
        <div className="content">选项卡2内容</div>
      </Panel>
    </Tabs>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 可滑动

```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs
    swipeable
    onChange={(i) => {
      console.log(i);
    }}
  >
    <Panel title="选项卡1">
      <div className="content">试试点我左滑</div>
    </Panel>
    <Panel title="选项卡2">
      <div className="content">试试点我右滑</div>
    </Panel>
  </Tabs>,
  mountNode,
);
```

## 指定默认选项

```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs defaultValue={1}>
    <Panel title="选项卡1">
      <div className="content">选项卡1内容</div>
    </Panel>
    <Panel title="选项卡2">
      <div className="content">选项卡2内容</div>
    </Panel>
    <Panel title="选项卡3">
      <div className="content">选项卡3内容</div>
    </Panel>
  </Tabs>,
  mountNode,
);
```

## 指定线条宽度

```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs lineWidth={60}>
    <Panel title="选项卡1">
      <div className="content">选项卡1内容</div>
    </Panel>
    <Panel title="选项卡2">
      <div className="content">选项卡2内容</div>
    </Panel>
    <Panel title="选项卡3">
      <div className="content">选项卡3内容</div>
    </Panel>
  </Tabs>,
  mountNode,
);
```

## 禁用指定选项

```jsx
import { Tabs } from 'zarm';

const { Panel } = Tabs;

ReactDOM.render(
  <Tabs>
    <Panel title="选项卡1">
      <div className="content">选项卡1内容</div>
    </Panel>
    <Panel title="选项卡2" disabled>
      <div className="content">选项卡2内容</div>
    </Panel>
    <Panel title="选项卡3">
      <div className="content">选项卡3内容</div>
    </Panel>
  </Tabs>,
  mountNode,
);
```

## 方向

```jsx
import { useState } from 'react';
import { Tabs, List, Radio } from 'zarm';

const { Panel } = Tabs;

const Demo = () => {
  const [value, setValue] = useState(0);
  const [direction, setDirection] = useState('top');

  return (
    <List>
      <List.Item>
        <Radio.Group compact type="button" value={direction} onChange={setDirection}>
          <Radio value="top">top</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
          <Radio value="right">right</Radio>
        </Radio.Group>
      </List.Item>
      <Tabs scrollable value={value} onChange={setValue} direction={direction}>
        <Panel title="选项卡1">
          <div className="content">选项卡1内容</div>
        </Panel>
        <Panel title="选项卡2">
          <div className="content">选项卡2内容</div>
        </Panel>
        <Panel title="选项卡3">
          <div className="content">选项卡3内容</div>
        </Panel>
        <Panel title="选项卡4">
          <div className="content">选项卡4内容</div>
        </Panel>
        <Panel title="选项卡5">
          <div className="content">选项卡5内容</div>
        </Panel>
        <Panel title="选项卡6">
          <div className="content">选项卡6内容</div>
        </Panel>
        <Panel title="选项卡7">
          <div className="content">选项卡7内容</div>
        </Panel>
      </Tabs>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 水平限宽

```jsx
import { useState } from 'react';
import { Tabs } from 'zarm';

const { Panel } = Tabs;

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs scrollable value={value} onChange={setValue} className="custom-width">
      <Panel title="选项卡1">
        <div className="content">选项卡1内容</div>
      </Panel>
      <Panel title="选项卡2">
        <div className="content">选项卡2内容</div>
      </Panel>
      <Panel title="选项卡3">
        <div className="content">选项卡3内容</div>
      </Panel>
      <Panel title="选项卡4">
        <div className="content">选项卡4内容</div>
      </Panel>
      <Panel title="选项卡5">
        <div className="content">选项卡5内容</div>
      </Panel>
      <Panel title="选项卡6">
        <div className="content">选项卡6内容</div>
      </Panel>
      <Panel title="选项卡7">
        <div className="content">选项卡7内容</div>
      </Panel>
    </Tabs>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 垂直限高

```jsx
import { useState } from 'react';
import { Tabs } from 'zarm';

const { Panel } = Tabs;

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <Tabs scrollable value={value} onChange={setValue} direction="left" className="custom-height">
      <Panel title="选项卡1">
        <div className="content">选项卡1内容</div>
      </Panel>
      <Panel title="选项卡2">
        <div className="content">选项卡2内容</div>
      </Panel>
      <Panel title="选项卡3">
        <div className="content">选项卡3内容</div>
      </Panel>
      <Panel title="选项卡4">
        <div className="content">选项卡4内容</div>
      </Panel>
      <Panel title="选项卡5">
        <div className="content">选项卡5内容</div>
      </Panel>
      <Panel title="选项卡6">
        <div className="content">选项卡6内容</div>
      </Panel>
      <Panel title="选项卡7">
        <div className="content">选项卡7内容</div>
      </Panel>
    </Tabs>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Tabs

| 属性         | 类型                    | 默认值                             | 说明                                                                                        |
| :----------- | :---------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------ |
| value        | number                  | -                                  | 值                                                                                          |
| defaultValue | number                  | -                                  | 初始值                                                                                      |
| disabled     | boolean                 | false                              | 是否禁用                                                                                    |
| direction    | string                  | 'top'<br />v3.1.5 前为'horizontal' | 方向，可选值为 `top` `bottom` `left` `right`<br />v3.1.5 前可选值为 `horizontal` `vertical` |
| swipeable    | boolean                 | false                              | 是否支持滑动切换                                                                            |
| scrollable   | boolean                 | false                              | 是否支持滚动                                                                                |
| lineWidth    | number \| string        | -                                  | 线条宽度                                                                                    |
| onChange     | (index: number) => void | -                                  | 值变化时触发的回调函数                                                                      |

### Panel

| 属性     | 类型      | 默认值 | 说明     |
| :------- | :-------- | :----- | :------- |
| title    | ReactNode | -      | 标题     |
| children | ReactNode | -      | 内容     |
| disabled | boolean   | false  | 是否禁用 |

## CSS 变量

| 属性                 | 默认值                          | 说明                   |
| :------------------- | :------------------------------ | :--------------------- |
| --font-size          | 'var(--za-font-size-md)'        | 字体大小               |
| --color              | 'var(--za-color-text)'          | 字体颜色               |
| --active-text-color  | 'var(--za-color-text)'          | 选中状态字体颜色       |
| --color-disabled     | 'var(--za-color-text-disabled)' | 禁用状态下头部字体颜色 |
| --height             | '45px'                          | 高度                   |
| --active-color       | 'var(--za-theme-primary)'       | 选中状态颜色           |
| --active-line-height | '2px'                           | 选中状态边框高度       |
| --padding-horizontal | 'var(--za-padding-h-lg)'        | 水平间距               |
| --padding-vertical   | 'var(--za-padding-v-md)'        | 垂直间距               |
