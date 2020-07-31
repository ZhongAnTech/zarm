# ImagePreview 图片预览



## 基本用法
```jsx
import { useState } from 'react';
import { Cell, Button, ImagePreview, NoticeBar } from 'zarm';

const commonImages = [
  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
];

const originImages = [
  {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
    originUrl: 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg'
  },
  {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
    originUrl:'https://cdn-health.zhongan.com/zarm/imagePreview/2.jpg',
  }, {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
    originUrl: 'https://cdn-health.zhongan.com/zarm/imagePreview/3.jpg',
  }
];

const Demo = () => {
  const [visibleState, setVisibleState] = useState({
    origin: false,
    common: false,
    picture: false,
  });

  const open = (key) => {
    setVisibleState({
      ...visibleState,
      [key]: true
    });
  }

  const hide = (key) => {
    setVisibleState({
      ...visibleState,
      [key]: false,
    });
  }

  return (
    <>
      <NoticeBar>图片缩放只支持Touch事件，建议使用移动模式/设备浏览以获得最佳体验。</NoticeBar>
      <Cell
        description={
          <Button size="xs" onClick={() => open('common')}>开启</Button>
        }>
          普通
        </Cell>
      <Cell
        description={
          <Button size="xs" onClick={() => open('origin')}>开启</Button>
        }>
          有查看原始图片功能
      </Cell>
      <ImagePreview visible={visibleState.origin} images={originImages} onClose={() => hide('origin')}  maxScale={5} /> 
      <ImagePreview visible={visibleState.common} images={commonImages} onClose={() => hide('common')} maxScale={10}/>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```


## 预览指定图片
```jsx
import { useState } from 'react';
import { ImagePreview, Cell } from 'zarm';

const commonImages = [
  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',
  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',
];

const Demo = () => {
  const [visible, setVisible] = useState(false);
  const [pictureIndex, setPictureIndex] = useState(0);

  const hide = () => setVisible(false);

  const show = (index) => {
    setVisible(true);
    setPictureIndex(index);
  };
 
  return (
    <>
      <Cell>
        {
          commonImages.map((pic, index) => (
            <div className="picture-item" onClick={() => show(index)} key={+index}>
              <img src={pic} />
            </div>
          ))
        }
      </Cell>
      <ImagePreview visible={visible} images={commonImages} onClose={hide} activeIndex={pictureIndex} /> 
    </>
  );  
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| minScale | number | 1 | 图片最小缩放比例，1 为最小值 |
| maxScale | number | 3 | 图片最大缩放比例 |
| images | Array<string> \| Array<{url: string; originUrl: string;}> | - | 图片地址 |
| activeIndex | number | 0 | 当前展示的图片是第几张，从0开始 |
| showPagination | boolean | true | 是否显示分页器 |
| onChange | (activeIndex?: number) => void | - | 图片切换时候回调 |
| onClose | () => void | - | 关闭时候回调 |

