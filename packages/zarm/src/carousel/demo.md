# Carousel 走马灯

## 基本用法

```jsx
import { Carousel } from 'zarm';

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
};

ReactDOM.render(
  <Carousel
    onChange={(index) => {
      console.log(`onChange: ${index}`);
    }}
  >
    {contentRender()}
  </Carousel>,
  mountNode,
);
```

## 纵向

```jsx
import { Carousel } from 'zarm';

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
};

ReactDOM.render(
  <Carousel direction="up" height="48vw">
    {contentRender()}
  </Carousel>,
  mountNode,
);
```

## 循环轮播

```jsx
import { useRef } from 'react';
import { Carousel, Button } from 'zarm';

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
};

const Demo = () => {
  const carouselRef = useRef();

  return (
    <>
      <Carousel
        ref={carouselRef}
        loop
        direction="left"
        onChange={(index) => {
          console.log(`onChange: ${index}`);
        }}
      >
        {contentRender()}
      </Carousel>
      <div className="controls">
        <Button
          block
          size="sm"
          onClick={() => {
            carouselRef.current.onJumpTo(0);
          }}
        >
          无动画切换指定页
        </Button>

        <Button
          block
          size="sm"
          onClick={() => {
            carouselRef.current.onSlideTo(2);
          }}
        >
          滑动到指定页
        </Button>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自动循环轮播

```jsx
import { Carousel } from 'zarm';

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
};

ReactDOM.render(
  <Carousel
    autoPlay
    loop
    direction="left"
    onChangeEnd={(index) => {
      console.log(`onChangeEnd: ${index}`);
    }}
  >
    {contentRender()}
  </Carousel>,
  mountNode,
);
```

## API

| 属性                 | 类型                          | 默认值 | 说明                                           |
| :------------------- | :---------------------------- | :----- | :--------------------------------------------- |
| direction            | string                        | 'left' | 滑动方向，可选值 `left`、`right`、`up`、`down` |
| height               | number \| string              | 160    | 设置轮播区域高度                               |
| activeIndex          | number                        | 0      | 当前页面的索引                                 |
| loop                 | boolean                       | false  | 是否循环                                       |
| swipeable            | boolean                       | true   | 是否支持拖拽滑动                               |
| autoPlay             | boolean                       | false  | 是否自动轮播                                   |
| autoPlayIntervalTime | number                        | 3000   | 自动轮播时间间隔，单位：毫秒                   |
| moveDistanceRatio    | number                        | 0.5    | 移动距离比例临界点                             |
| moveTimeSpan         | number                        | 300    | 移动时间跨度临界点，单位：毫秒                 |
| animationDuration    | number                        | 500    | 动画执行时间，单位：毫秒                       |
| showPagination       | boolean                       | true   | 是否显示分页器                                 |
| onChange             | (activeIndex: number) => void | -      | 值变化时触发的回调函数                         |
| onChangeEnd          | (activeIndex: number) => void | -      | 值变化动画结束后触发的回调函数                 |
