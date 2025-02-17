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
        suffix={
          <Stepper
            value={value}
            onChange={setValue}
            onInputChange={(value) => {
              console.log('onInputChange:', value);
            }}
          />
        }
      />
      <List.Item title="设置默认值" suffix={<Stepper defaultValue={2} />} />
      <List.Item title="设置上下限（-3 ~ 3）" suffix={<Stepper min={-3} max={3} />} />
      <List.Item title="设置步长" suffix={<Stepper step={5} />} />
      <List.Item
        title="步长小数"
        suffix={<Stepper type="price" step={0.12} defaultValue={0.9} max={2.0} min={1} />}
      />
      <List.Item title="禁用状态" suffix={<Stepper disabled />} />
      <List.Item title="禁用输入" suffix={<Stepper disableInput />} />
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
    <List.Item title="直角" suffix={<Stepper shape="rect" />} />
    <List.Item title="圆形" suffix={<Stepper shape="circle" />} />
  </List>,
  mountNode,
);
```

## 多尺寸

```jsx
import { List, Stepper } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item title="大号" suffix={<Stepper size="lg" />} />
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

## CSS 变量

| 属性                        | 默认值                          | 说明               |
| :-------------------------- | :------------------------------ | :----------------- |
| --height                    | '28px'                          | 步进器高度         |
| --input-width               | '56px'                          | 步进器的输入框宽度 |
| --input-background          | 'transparent'                   | 输入框背景色       |
| --input-border-width        | '1px'                           | 输入框边框宽度     |
| --input-border-color        | 'transparent'                   | 输入框边框颜色     |
| --input-border-radius       | 'var(--za-radius-md)'           | 输入框圆角尺寸     |
| --input-text-color          | 'var(--za-color-text)'          | 输入框文本颜色     |
| --input-font-size           | 'var(--za-font-size-md)'        | 输入框字体大小     |
| --input-disabled-text-color | 'var(--za-color-text-disabled)' | 输入框禁用数字颜色 |
| --input-disabled-opacity    | 'var(--za-opacity-disabled)'    | 输入框禁用不透明度 |
| --input-margin              | '0 4px'                         | 输入框水平外间距   |
| --input-padding             | '0 8px'                         | 输入框水平内间距   |
| --icon-font-size            | '12px'                          | 步进器图标大小     |
