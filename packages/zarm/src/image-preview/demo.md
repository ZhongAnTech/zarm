# ImagePreview 图片预览

## 基本用法

```jsx
import { useState, useEffect } from 'react';
import { List, Button, ImagePreview, NoticeBar, useOrientation } from 'zarm';

const commonImages = [
  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
];

const Demo = () => {
  const inIframe = window.self !== window.top;
  const { type, angle } = useOrientation();

  const orientation = inIframe ? 'portrait' : '';

  const [originImages, setOriginImages] = useState(null);
  const [visibleState, setVisibleState] = useState({
    origin: false,
    common: false,
    picture: false,
  });

  const open = (key) => {
    setVisibleState({
      ...visibleState,
      [key]: true,
    });
  };

  const hide = (key) => {
    setVisibleState({
      ...visibleState,
      [key]: false,
    });
  };

  // 模拟异步数据
  const fetchData = () => {
    setTimeout(() => {
      setOriginImages([
        {
          src: 'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
          originSrc: 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg',
        },
        {
          src: 'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
          originSrc: 'https://cdn-health.zhongan.com/zarm/imagePreview/2.jpg',
        },
        {
          src: 'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
          originSrc: 'https://cdn-health.zhongan.com/zarm/imagePreview/3.jpg',
        },
      ]);
    }, 5000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NoticeBar>图片缩放只支持Touch事件，建议使用移动模式/设备浏览以获得最佳体验。</NoticeBar>
      <List.Item
        after={
          <Button size="xs" onClick={() => open('common')}>
            开启
          </Button>
        }
      >
        普通
      </List.Item>
      <List.Item
        after={
          <Button size="xs" onClick={() => open('origin')}>
            开启
          </Button>
        }
      >
        有查看原始图片功能
      </List.Item>

      <ImagePreview
        visible={visibleState.common}
        images={commonImages}
        onClose={() => hide('common')}
        maxScale={10}
        orientation={orientation}
      />
      <ImagePreview
        visible={visibleState.origin}
        images={originImages}
        onClose={() => hide('origin')}
        maxScale={5}
        orientation={orientation}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 静态用法

```jsx
import { useState } from 'react';
import { ImagePreview, List, Button } from 'zarm';

const commonImages = [
  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
];

const Demo = () => {
  const inIframe = window.self !== window.top;

  const orientation = inIframe ? 'portrait' : '';

  return (
    <List.Item
      after={
        <Button size="xs" onClick={() => ImagePreview.show({ images: commonImages, orientation })}>
          开启
        </Button>
      }
    >
      静态用法
    </List.Item>
  );
};
ReactDOM.render(<Demo />, mountNode);
```

## 预览指定图片

```jsx
import { useState } from 'react';
import { ImagePreview, List } from 'zarm';

const commonImages = [
  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
];

const Demo = () => {
  const inIframe = window.self !== window.top;

  const orientation = inIframe ? 'portrait' : '';

  const [visible, setVisible] = useState(false);
  const [pictureIndex, setPictureIndex] = useState(0);

  const hide = () => setVisible(false);

  const show = (index) => {
    setVisible(true);
    setPictureIndex(index);
  };

  return (
    <>
      <List.Item>
        {commonImages.map((pic, index) => (
          <div className="picture-item" onClick={() => show(index)} key={+index}>
            <img src={pic} alt="" />
          </div>
        ))}
      </List.Item>
      <ImagePreview
        visible={visible}
        images={commonImages}
        onClose={hide}
        activeIndex={pictureIndex}
        orientation={orientation}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型                                               | 默认值 | 说明                                           |
| :------------- | :------------------------------------------------- | :----- | :--------------------------------------------- |
| visible        | boolean                                            | false  | 是否显示                                       |
| minScale       | number                                             | 1      | 图片最小缩放比例，1 为最小值                   |
| maxScale       | number                                             | 3      | 图片最大缩放比例                               |
| images         | Array<string \| {src: string; originSrc: string;}> | -      | 图片地址                                       |
| activeIndex    | number                                             | 0      | 当前展示的图片是第几张，从 0 开始              |
| showPagination | boolean                                            | true   | 是否显示分页器                                 |
| orientation    | string                                             | -      | 横竖屏，默认自动识别 `landscape` \| `portrait` |
| onChange       | (activeIndex: number) => void                      | -      | 图片切换时候回调                               |
| onClose        | () => void                                         | -      | 关闭时候回调                                   |
