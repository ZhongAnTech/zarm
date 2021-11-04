# Stepper 步进器

## 基本用法

```jsx
import { useState } from 'react';
import { List, Stepper } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState(1);

  return (
    <List>
      <List.Item
        title="普通"
        after={
          <Stepper
            value={value}
            onChange={setValue}
            onInputChange={(value) => {
              console.log('onInputChange:', value);
            }}
          />
        }
      />
      <List.Item title="设置默认值" after={<Stepper defaultValue={2} />} />
      <List.Item title="设置上下限（-3 ~ 3）" after={<Stepper min={-3} max={3} />} />
      <List.Item title="设置步长" after={<Stepper step={5} />} />
      <List.Item
        title="步长小数"
        after={<Stepper type="price" step={0.12} defaultValue={0.9} max={2.0} min={1} />}
      />
      <List.Item title="禁用状态" after={<Stepper disabled />} />
      <List.Item title="禁用输入" after={<Stepper disableInput />} />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 多形状

```jsx
import { List, Stepper } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="直角" after={<Stepper shape="rect" />} />
    <List.Item title="圆形" after={<Stepper shape="circle" />} />
  </List>,
  mountNode,
);
```

## 多尺寸

```jsx
import { List, Stepper } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="大号" after={<Stepper size="lg" />} />
  </List>,
  mountNode,
);
```

## API

| 属性          | 类型                              | 默认值   | 说明                                              |
| :------------ | :-------------------------------- | :------- | :------------------------------------------------ |
| shape         | string                            | 'radius' | 形状，可选值 `rect`, `radius`, `circle`           |
| size          | string                            | 'md'     | 大小，可选值 `md`、`lg`                           |
| type          | string                            | 'text'   | 输入类型，可选值 `text`、`number`、`price`、`tel` |
| value         | number                            | -        | 值                                                |
| defaultValue  | number                            | -        | 初始值                                            |
| min           | number                            | -        | 最小值                                            |
| max           | number                            | -        | 最大值                                            |
| step          | number                            | 1        | 步长                                              |
| disabled      | boolean                           | false    | 是否禁用                                          |
| disableInput  | boolean                           | false    | 是否禁用输入框                                    |
| onInputChange | (value: number \| string) => void | -        | 输入值变化时触发的回调函数                        |
| onChange      | (value: number \| string) => void | -        | 值变化时触发的回调函数                            |
