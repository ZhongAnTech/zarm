# WaterMark 水印

## 基本用法

```jsx
import { useRef, useState } from 'react';
import { List, Input, Radio, Switch, Slider, WaterMark } from 'zarm';

const UNILINE_TEXT = '众安科技';
const MULTI_LINE_TEXT = [UNILINE_TEXT, 'ZhongAnTech'];

const WATERMARK_IMAGE_URL = 'https://zarm.design/images/logo.1a6cfc30.svg';

const DEFAULT_PROPS = {
  text: UNILINE_TEXT,
  mode: 'interval',
  monitor: true,
  markStyle: {
    opacity: 0.15,
  },
  textStyle: {
    textAlign: 'left',
  },
  imageStyle: {
    width: 37.5,
    height: 37.5,
  },
};

const Demo = () => {
  const [props, updateProps] = useState(DEFAULT_PROPS);
  const [contain, setContain] = useState(false);

  const setProps = (data = {}) => {
    updateProps({
      ...props,
      ...data,
    });
  };

  const isMultiline = Array.isArray(props.text);

  const content = (
    <List>
      <List.Item
        after={
          <Radio.Group
            value={!!props.image}
            buttonCompact
            type="button"
            onChange={(value) => setProps({ image: value ? WATERMARK_IMAGE_URL : null })}
          >
            <Radio value={false}>文字</Radio>
            <Radio value={true}>图片</Radio>
          </Radio.Group>
        }
      >
        水印类型
      </List.Item>
      {props.image ? (
        <>
          <List.Item title="图片地址">
            <Input
              rows={2}
              type="text"
              value={props.image}
              placeholder="请输入图片地址"
              onChange={(event) => setProps({ image: event.target.value })}
            />
          </List.Item>
          <List.Item title="图片宽度">
            <Input
              type="number"
              value={props.imageStyle.width}
              onChange={(event) =>
                setProps({
                  imageStyle: {
                    ...props.imageStyle,
                    width: event.target.value,
                  },
                })
              }
            />
          </List.Item>
          <List.Item title="图片高度">
            <Input
              type="number"
              value={props.imageStyle.height}
              onChange={(event) =>
                setProps({
                  imageStyle: {
                    ...props.imageStyle,
                    height: event.target.value,
                  },
                })
              }
            />
          </List.Item>
        </>
      ) : (
        <>
          <List.Item
            after={
              <Radio.Group
                value={isMultiline}
                buttonCompact
                type="button"
                onChange={(value) => setProps({ text: value ? MULTI_LINE_TEXT : UNILINE_TEXT })}
              >
                <Radio value={false}>单行</Radio>
                <Radio value={true}>多行</Radio>
              </Radio.Group>
            }
          >
            文字水印
          </List.Item>
          <List.Item title="水印文案">
            <Input
              rows={isMultiline ? 3 : 1}
              type="text"
              value={isMultiline ? props.text.join('\n') : props.text}
              placeholder="请输入水印文案"
              onChange={(event) =>
                setProps({
                  text: isMultiline ? event.target.value.split('\n') : event.target.value,
                })
              }
            />
          </List.Item>
          <List.Item
            after={
              <Radio.Group
                value={props.textStyle.textAlign}
                buttonCompact
                type="button"
                onChange={(value) => setProps({ textStyle: { textAlign: value } })}
              >
                <Radio value="left">居左</Radio>
                <Radio value="center">居中</Radio>
                <Radio value="right">居右</Radio>
              </Radio.Group>
            }
          >
            对齐方式
          </List.Item>
        </>
      )}
      <List.Item
        after={
          <Radio.Group
            value={props.mode}
            buttonCompact
            type="button"
            onChange={(value) => setProps({ mode: value })}
          >
            <Radio value="repeat">重复展示</Radio>
            <Radio value="interval">错行展示</Radio>
          </Radio.Group>
        }
      >
        渲染模式
      </List.Item>
      <List.Item title="透明度">
        <Slider
          value={props.markStyle.opacity * 100}
          onChange={(value) => setProps({ markStyle: { opacity: value / 100 } })}
        />
      </List.Item>
      <List.Item
        title="保护模式"
        after={
          <Switch checked={props.monitor} onChange={(value) => setProps({ monitor: value })} />
        }
        info="监听水印变化，防止被篡改"
      />
      <List.Item
        title="包裹容器"
        after={<Switch checked={contain} onChange={(value) => setContain(value)} />}
      />
    </List>
  );

  return (
    <>
      {!contain && content}
      <WaterMark {...props}>{contain && content}</WaterMark>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性       | 类型               | 默认值     | 说明                                                 |
| :--------- | :----------------- | :--------- | :--------------------------------------------------- |
| mode       | repeat \| interval | 'interval' | 展示模式，interval 表示错行展示                      |
| text       | string \| string[] | -          | 水印文本, 为数组时表示多行水印                       |
| image      | string             | -          | 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 |
| textStyle  | TextStyle          | -          | 文本样式                                             |
| markStyle  | MarkStyle          | -          | 水印样式                                             |
| imageStyle | ImageStyle         | -          | 图片样式                                             |
| monitor    | boolean            | true       | 是否开启监视模式                                     |

## MarkStyle

| 属性       | 类型   | 默认值 | 说明                                 |
| :--------- | :----- | :----- | :----------------------------------- |
| width      | number | 120    | 单个水印宽度                         |
| height     | number | 64     | 单个水印高度                         |
| opacity    | number | 0.15   | 水印不透明度                         |
| rotate     | number | -22    | 旋转的角度                           |
| zIndex     | number | 2000   | 样式层级                             |
| gapX       | number | 24     | 水印之间的水平间距                   |
| gapY       | number | 48     | 水印之间的垂直间距                   |
| offsetLeft | number | 0      | 水印在 canvas 画布上绘制的水平偏移量 |
| offsetTop  | number | 0      | 水印在 canvas 画布上绘制的垂直偏移量 |

## TextStyle

| 属性         | 类型             | 默认值       | 说明               |
| :----------- | :--------------- | :----------- | :----------------- |
| color        | string           | '#000'       | 设置字体颜色       |
| fontSize     | number           | 14           | 设置字体大小       |
| fontWeight   | string \| number | 300          | 设置字体粗细       |
| fontStyle    | string           | 'normal'     | 规定字体样式       |
| fontFamily   | string           | 'sans-serif' | 设置水印文字的字体 |
| fontVariant  | string           | 'normal'     | 规定字体变体       |
| textAlign    | string           | 'left'       | 水印文字的对齐方式 |
| textBaseline | string           | 'alphabetic' | 绘制文本的文本基线 |

## ImageStyle

| 属性   | 类型   | 默认值 | 说明     |
| :----- | :----- | :----- | :------- |
| width  | number | 120    | 图片宽度 |
| height | number | 64     | 图片高度 |
