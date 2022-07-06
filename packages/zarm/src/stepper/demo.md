# Stepper 步进器

## 基本用法

```jsx
import { useState } from 'react';
import { Cell, Stepper } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState(1);

  return (
    <>
      <Cell
        title="普通"
        description={
          <Stepper
            value={value}
            onChange={setValue}
            onInputChange={(value) => {
              console.log('onInputChange:', value);
            }}
          />
        }
      />

      <Cell title="设置默认值" description={<Stepper defaultValue={2} />} />

      <Cell title="设置上下限（-3 ~ 3）" description={<Stepper min={-3} max={3} />} />

      <Cell title="设置步长" description={<Stepper step={5} />} />

      <Cell
        title="步长小数"
        description={<Stepper type="price" step={0.12} defaultValue={0.9} max={2.0} min={1} />}
      />

      <Cell title="禁用状态" description={<Stepper disabled />} />
      <Cell title="禁用输入" description={<Stepper disableInput />} />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 多形状

```jsx
import { Cell, Stepper } from 'zarm';

ReactDOM.render(
  <>
    <Cell title="直角" description={<Stepper shape="rect" />} />

    <Cell title="圆形" description={<Stepper shape="circle" />} />
  </>,
  mountNode,
);
```

## 多尺寸

```jsx
import { Cell, Stepper } from 'zarm';

ReactDOM.render(<Cell title="大号" description={<Stepper size="lg" />} />, mountNode);
```

## API

| 属性          | 类型                               | 默认值   | 说明                                              |
| :------------ | :--------------------------------- | :------- | :------------------------------------------------ |
| shape         | string                             | 'radius' | 形状，可选值 `rect`, `radius`, `circle`           |
| size          | string                             | 'md'     | 大小，可选值 `md`、`lg`                           |
| type          | string                             | 'text'   | 输入类型，可选值 `text`、`number`、`price`、`tel` |
| value         | number \| string                   | -        | 值                                                |
| defaultValue  | number                             | -        | 初始值                                            |
| min           | number                             | -        | 最小值                                            |
| max           | number                             | -        | 最大值                                            |
| step          | number                             | 1        | 步长                                              |
| disabled      | boolean                            | false    | 是否禁用                                          |
| disableInput  | boolean                            | false    | 是否禁用输入框                                    |
| onInputChange | (value?: number ｜ string) => void | -        | 输入值变化时触发的回调函数                        |
| onChange      | (value?: number ｜ string) => void | -        | 值变化时触发的回调函数                            |
