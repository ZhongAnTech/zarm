# SignatureBoard 签名板

## 基本用法

```jsx
import { useState } from 'react';
import { SignatureBoard } from 'zarm';

const Demo = () => {
  const [imgData, setImgData] = useState();
  return (
    <div>
      <SignatureBoard onFinish={(data) => setImgData(data)} width={370} height={200} />
      <img src={imgData} style={{ marginTop: '15px' }} />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性             | 类型                   | 默认值               | 说明                       |
| :--------------- | :--------------------- | :------------------- | :------------------------- |
| tips             | string                 | '请在下方空白处签名' | 初始值                     |
| width            | number                 | window.innerWidth    | 签名板宽度                 |
| height           | number                 | 200                  | 签名板高度                 |
| confirmTitle     | string                 | '确定'               | 确定按钮标题               |
| hiddenUndoButton | boolean                | false                | 是否隐藏回退按钮           |
| confirmButton    | React.ReactElement     | null                 | 确认按钮                   |
| onFinish         | (data: string) => void | undefined            | 点击确认的回调             |
| getSignatureRef  | (ref: any) => void     | -                    | 获取签字 Canvas 引用的回调 |
| signatureProps   | SignatureProps         | -                    |                            |

### SignatureProps

| 属性            | 类型       | 默认值  | 说明           |
| :-------------- | :--------- | :------ | :------------- |
| penColor        | color      | 'black' | 画笔颜色       |
| backgroundColor | color      | 'white' | 背景色         |
| onBegin         | () => void | -       | 开始签名的回调 |
| confirmTitle    | () => void | -       | 结束签名的回调 |
