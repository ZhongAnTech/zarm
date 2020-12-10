# Affix 组件名



## 基本用法
```jsx
import { Affix, Message, NavBar, Icon, Carousel } from 'zarm';

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

const contentRender = () => {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel__item__pic" key={+i}>
        <img src={item} alt="" draggable={false} />
      </div>
    );
  });
}

ReactDOM.render(
  <div className="article">
    <header className="article-header">
      <div className="article-title">
        React 入门儿
      </div>
      <div className="article-author">
        <span className="article-author-name">风魔小次郎</span>
        <span className="article-column-name">凹凸实验室</span>
      </div>
    </header>
    <Affix offsetTop={0}>
      <div className="article-tip">
        <Message>
          了解更多，点击阅读原文。
        </Message>
      </div>
    </Affix>
    <div className="article-body">
      <Carousel
        className="article-banner"
        onChange={(index) => {
          console.log(`onChange: ${index}`);
        }}
      >
        {contentRender()}
      </Carousel>
      <div className="article-content">
        在写文章之前，为了方便理解，我准备了一个懒人调试仓库 simple_react[1] ，这个仓库将 benchmark 用例（只有两个 ^ ^）和 React 源码共同放在 src 文件夹中，通过 snowpack 进行热更新，可以直接在源码中加入 log 和 debuger 进行调试。当然这里的“源码”并不是真的源码，因为 React 源码中充斥着巨量的 dev 代码和不明确的功能函数，所以我对源码进行了整理，用 typescript 对类型进行了规范，删除了大量和核心流程无关的代码（当然也误删了一些有关的 ^ ^）。

        如果你只是希望了解 React 的运行流程而不是写一个可以用的框架的话，那么这个仓库完全可以满足你学习的需要。当然，这个仓库基于 React16.8 ，虽然这个版本并不包括当前的航道模型 Lane 等新特性，但是是我个人认为比较稳定且更适合阅读的一个版本。

        （如果希望调试完整的源码，也可以参考 拉取源码[2] 通过 yarn link 来进行 debug）
      </div>
    </div>
  </div>
, mountNode);
```

## 滚动容器
```jsx
import { useState } from 'react';
import { Affix, Button } from 'zarm';

const Demo = () => {
  const [container, setContainer] = useState(null);

  return (
    <div
      className="scrollable-container"
      ref={setContainer}
      style={{
        height: 100,
        overflowY: 'scroll',
      }}
    >
      <div
        className="background"
         style={{
          paddingTop: 60,
          height: 300,
          backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg)',
        }}
      >
        <Affix target={() => container}>
          <Button type="primary">根据滚动容器顶部固定</Button>
        </Affix>
      </div>
    </div>
  );
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| offsetTop | number | 0 | 距离窗口底部达到指定偏移量后触发 |
| offsetBottom | number | - | 距离窗口底部达到指定偏移量后触发 |
| target | () => HTMLElement | () => window | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 |
| onChange | function(affixed) | - | 固定状态改变时触发的回调函数 |