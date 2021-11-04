# SignatureBoard 签名板

## 基本用法

```jsx
import { useState, useRef, useEffect } from 'react';
import { SignatureBoard, Button } from 'zarm';

const Demo = () => {
  const [imgData, setImgData] = useState();
  const signatureRef = useRef();

  const onConfirm = () => {
    const image = signatureRef.current.getImageData();
    setImgData(image);
  };

  const onRewrite = () => {
    signatureRef.current.clear();
  };

  const onUndo = () => {
    signatureRef.current.undo();
  };

  return (
    <div>
      <SignatureBoard ref={signatureRef} width={370} height={200} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px' }}>
        <Button size="sm" onClick={onRewrite}>
          重写
        </Button>
        <Button size="sm" onClick={onUndo}>
          撤销
        </Button>
      </div>
      <Button theme="primary" block onClick={onConfirm}>
        确认
      </Button>

      <img src={imgData} style={{ marginTop: '15px' }} />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型           | 默认值            | 说明       |
| :------------- | :------------- | :---------------- | :--------- |
| width          | number         | window.innerWidth | 签名板宽度 |
| height         | number         | 200               | 签名板高度 |
| signatureProps | SignatureProps | -                 |            |

### SignatureBoardRef

通过 Ref 对外暴露的方法

| 方法         | 类型         | 参数 | 说明                         |
| :----------- | :----------- | :--- | :--------------------------- |
| clear        | () => void   | -    | 清空签名板                   |
| undo         | () => void   | -    | 撤销上一步操作               |
| getImageData | () => string | -    | 获取签名图片的 base64 字符串 |

### SignatureProps

| 属性            | 类型       | 默认值  | 说明           |
| :-------------- | :--------- | :------ | :------------- |
| penColor        | color      | 'black' | 画笔颜色       |
| backgroundColor | color      | 'white' | 背景色         |
| minWidth        | number     | 0.5     | 画笔最小宽度   |
| maxWidth        | number     | 2.5     | 画笔最大宽度   |
| minDistance     | number     | 5       | 画线最小距离   |
| throttle        | number     | 16      | 防抖，触发频率 |
| onBegin         | () => void | -       | 开始签名的回调 |
| onEnd           | () => void | -       | 结束签名的回调 |
