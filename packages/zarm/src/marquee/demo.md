# Marquee 滚动

## 基本用法

```jsx
import { Marquee, List } from 'zarm';

ReactDOM.render(
  <>
    <List.Item>
      <Marquee>我从右向左滚动</Marquee>
    </List.Item>
    <List.Item>
      <Marquee delay={2000}>我延迟执行2秒</Marquee>
    </List.Item>
    <List.Item>
      <Marquee speed={120}>我跑的快吧？速度是120像素/秒</Marquee>
    </List.Item>
    <List.Item>
      <Marquee direction="up" height={60}>
        <div>我</div>
        <div>从</div>
        <div>下</div>
        <div>往</div>
        <div>上</div>
        <div>滚</div>
        <div>动</div>
      </Marquee>
    </List.Item>
    <List.Item>
      <Marquee direction="down" height={60}>
        <div>我</div>
        <div>从</div>
        <div>上</div>
        <div>往</div>
        <div>下</div>
        <div>滚</div>
        <div>动</div>
      </Marquee>
    </List.Item>
  </>,
  mountNode,
);
```

## API

| 属性      | 类型             | 默认值 | 说明                                            |
| :-------- | :--------------- | :----- | :---------------------------------------------- |
| direction | string           | 'left' | 滚动方向，可选值为`left`、`right`、`up`、`down` |
| width     | number \| string | -      | 容器宽度                                        |
| height    | number \| string | -      | 容器高度                                        |
| speed     | number           | 30     | 动画移动速度 （单位：px/秒）                    |
| delay     | number           | 0      | 动画延迟执行时间（单位：毫秒）                  |
