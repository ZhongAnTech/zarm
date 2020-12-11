# Affix 组件名



## 基本用法

```jsx
import { Affix, Message, NavBar, Icon, Carousel, Tabs } from 'zarm';

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
        Zarm Affix 介绍文章
      </div>
      <div className="article-author">
        <span className="article-author-name">ZARM 团队</span>
        <span className="article-column-name">ZARM</span>
      </div>
    </header>
    <div className="article-body">
      <Carousel
        className="article-banner"
        onChange={(index) => {
          console.log(`onChange: ${index}`);
        }}
      >
        {contentRender()}
      </Carousel>
      <Affix offsetTop={0}>
        <div className="article-tip">
          <Tabs>
            <Tabs.Panel title="介绍" />
            <Tabs.Panel title="详情" />
          </Tabs>
        </div>
      </Affix>
      <div className="article-content">
        <p>Zarm 是众安科技基于 React、React-Native 研发的一款适用于企业级的移动端UI组件库。(官网|github|演示地址 推荐在手机上浏览)</p>

        <p>Zarm 的取名，灵感来源于众安保险秉承的理念：做有温度的保险。Zarm = za + warm，za代表众安，warm有“温暖的”意思，以重合的a字母为中心，各取左右两部分。追求极致的用户体验，致力于做有温度的组件库也是zarm项目发起的初衷。</p>

        <p>Zarm的发展历程：起初，zarm的前身还只是一个个人项目，2018年后慢慢在众安健康险事业部推广使用。2019年初，众安宣布直营产品品牌化的战略方向 ，这意味着各大BU的产出页面都有可能投放到直营渠道；为了规范了众安系产品基础组件的视觉及交互，整体提升众安系产品的用户体验，保障产品体验的一致性，因此，在众安技术委员会的发起下，Zarm项目诞生了；经过各个BU团队优秀设计师们的努力下，数月后终于敲定了视觉和交互规范，Zarm的前端代码的实现采取自由认领的方式，全公司活跃的前端er们迅速推进，最终趋于稳定，用于生产环境；为了让业务同学和设计、前端的认知形成统一，Zarm形成Axure元件库、项目模板规范等 帮助业务同学快速完成高质量的产品原型；三者相辅相成，最终实现了降低整条工作链路上人力成本和沟通成本的目标。</p>

        <p>Zarm经历了两年多的业务沉淀，服务过十个事业部中近百项目，这使得我们相信除了在众安内部，zarm一定也有它的用武之地。</p>
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
    >
      <div className="background">
        <Affix scrollContainer={() => container}>
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
| scrollContainer | () => HTMLElement | () => window | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 |
| onChange | function(affixed) | - | 固定状态改变时触发的回调函数 |