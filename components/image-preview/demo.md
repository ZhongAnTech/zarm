# ImagePreview 图片预览



## 基本用法
```jsx
import { Cell, Button, ImagePreview } from 'zarm';

const originImages = [
  {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_1.png',
    originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/1.png'
  },
  {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_2.png',
    originUrl:'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
  }, {
    url: 'https://cdn-health.zhongan.com/zarm/imagePreview/compress_3.png',
    originUrl: 'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
  }
];

const commonImages = [
   'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
   'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
   'https://static.zhongan.com/website/health/zarm/images/banners/3.png',
];

class Demo extends React.Component {
  state = {
      origin: false,
      common: false,
  };

  open = (key) => {
    this.setState({
      [key]: true
    });
  }

  hide = (key) => {
    this.setState({
      [key]: false
    });
  }

  render() {
    const { origin, common } = this.state;
    return (
      <>
        <Cell
            description={
              <Button size="xs" onClick={() => this.open('common')}>开启</Button>
            }
          >
            普通
          </Cell>
        <Cell
            description={
              <Button size="xs" onClick={() => this.open('origin')}>开启</Button>
            }
          >
            有查看原始图片功能
        </Cell>
        <ImagePreview visible={origin} title="图片预览" images={originImages} onClose={() => this.hide('origin')} /> 
        <ImagePreview visible={common} title="普通图片预览" images={commonImages} onClose={() => this.hide('common')} maxScale={10}/>
      </>
    );  
  }
} 
ReactDOM.render(<Demo />, mountNode);
```

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | string | - | 标题 |
| visible | boolean | false | 是否显示 |
| minScale | number | 1 | 图片最小缩放比例，1 为最小值 |
| maxScale | number | 3 | 图片最大缩放比例 |
| images | Array<string> \| Array<{url: string; originUrl: string;}> | - | 图片地址 |
| activeIndex | number | 0 | 当前展示的图片是第几张，从0开始 |
| showPagination | boolean | true | 是否显示分页器 |
| onChange | (activeIndex?: number) => void | - | 图片切换时候回调 |
| onClose | () => void | - | 关闭时候回调 |

