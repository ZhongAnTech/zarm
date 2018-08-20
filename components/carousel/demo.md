## 图片轮播 Carousel

:::demo 基本用法
```jsx
import { Carousel } from 'zarm';

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

function contentRender() {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel-item-pic" key={+i}>
        <img src={item} alt="" />
      </div>
    );
  });
}

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Carousel
          onChangeEnd={(index) => {
            console.log(index);
          }}
        >
          {contentRender()}
        </Carousel>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 纵向
```jsx
import { Carousel } from 'zarm';

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

function contentRender() {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel-item-pic" key={+i}>
        <img src={item} alt="" />
      </div>
    );
  });
}

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Carousel
          direction="top"
          height="48vw"
        >
          {contentRender()}
        </Carousel>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 循环轮播
```jsx
import { Carousel, Button } from 'zarm';

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

function contentRender() {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel-item-pic" key={+i}>
        <img src={item} alt="" />
      </div>
    );
  });
}

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Carousel
          ref={(ele) => { this.carousel = ele; }}
          loop
          direction="left"
          onChangeEnd={(index) => {
            console.log(index);
          }}
        >
          {contentRender()}
        </Carousel>
        <div className="controls">
          <Button
            block
            size="sm"
            onClick={() => {
              this.carousel.onJumpTo(0);
            }}
          >
            无动画切换指定页
          </Button>

          <Button
            block
            size="sm"
            onClick={() => {
              this.carousel.onSlideTo(2);
            }}
          >
            滑动到指定页
          </Button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::demo 自动循环轮播
```jsx
import { Carousel } from 'zarm';

const ITEMS = [
  'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

function contentRender() {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel-item-pic" key={+i}>
        <img src={item} alt="" />
      </div>
    );
  });
}

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Carousel
          autoPlay
          loop
          direction="left"
          onChangeEnd={(index) => {
            console.log(index);
          }}
        >
          {contentRender()}
        </Carousel>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


:::api API

| 属性 | 类型 | 默认值 | 可选值／参数 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| prefixCls | string | za-carousel | | 类名前缀 |
| className | string | | | 追加类名 |
| direction | string | 'left' | 'left', 'right', 'top', 'bottom' | 滑动方向 |
| height | number &#124; string | | | 高度 |
| activeIndex | number | 0 | | 当前页面的索引 |
| loop | boolean | false | | 是否循环 |
| autoPlay | boolean | false | | 是否自动轮播 |
| autoPlayIntervalTime | number | 3000 | | 自动轮播时间间隔，单位：毫秒 |
| moveDistanceRatio | number | 0.5 | | 移动距离比例临界点 |
| moveTimeSpan | number | 300 | | 移动时间跨度临界点，单位：毫秒 |
| animationDuration | number | 300 | | 动画执行时间，单位：毫秒 |
| showPagination | boolean | true | | 是否显示分页器 |
| onChange | <code>(activeIndex: number) => void</code> | noop | \(activeIndex: number\) | 值变化时触发的回调函数 |
| onChangeEnd | <code>(activeIndex: number) => void</code> | noop | \(activeIndex: number\) | 值变化动画结束后触发的回调函数 |

:::