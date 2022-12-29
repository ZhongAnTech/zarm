# Slider 滑动输入条

## 基本用法

```jsx
import { useState } from 'react';
import { List, Slider } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState(0);

  return (
    <List>
      <List.Item title="普通">
        <Slider value={value} onChange={setValue} onSlideChange={(value) => console.log(value)} />
      </List.Item>
      <List.Item title="设置默认值">
        <Slider defaultValue={20} />
      </List.Item>
      <List.Item title="设置上下限">
        <Slider min={-100} max={100} defaultValue={0} />
      </List.Item>
      <List.Item title="禁用状态">
        <Slider disabled defaultValue={20} />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 刻度与标记

```jsx
import { List, Slider } from 'zarm';

const MARKS = {
  0: '0°C',
  26: '26°C',
  65: '65°C',
  100: '100°C',
};

ReactDOM.render(
  <List>
    <List.Item title="显示刻度">
      <Slider marks={MARKS} />
    </List.Item>
    <List.Item title="显示标记" style={{ height: 70 }}>
      <Slider showMark marks={MARKS} />
    </List.Item>
    <List.Item title="步长为10" style={{ height: 70 }}>
      <Slider showMark step={10} marks={MARKS} />
    </List.Item>
    <List.Item title="步长为null" style={{ height: 70 }}>
      <Slider showMark step={null} marks={MARKS} />
    </List.Item>
  </List>,
  mountNode,
);
```

## 方向

```jsx
import { List, Slider } from 'zarm';

const MARKS = {
  0: '0°C',
  26: '26°C',
  65: '65°C',
  100: '100°C',
};

ReactDOM.render(
  <List>
    <List.Item title="垂直方向">
      <div style={{ height: 200, margin: '15px 0' }}>
        <Slider vertical showMark marks={MARKS} />
      </div>
    </List.Item>
  </List>,
  mountNode,
);
```

## API

| 属性          | 类型                               | 默认值 | 说明                     |
| :------------ | :--------------------------------- | :----- | :----------------------- |
| value         | number                             | -      | 值                       |
| defaultValue  | number                             | -      | 初始值                   |
| min           | number                             | 0      | 最小值                   |
| max           | number                             | 100    | 最大值                   |
| disabled      | boolean                            | false  | 是否禁用                 |
| step          | number                             | 1      | 步长                     |
| vertical      | boolean                            | false  | 是否为纵向               |
| showMark      | boolean                            | false  | 是否显示标记刻度         |
| marks         | { [key: number]: React.ReactNode } | {}     | 自定义标记刻度的渲染展示 |
| onSlideChange | (value: number) => void            | -      | 滑动时触发的回调函数     |
| onChange      | (value: number) => void            | -      | 值变化时触发的回调函数   |

## CSS 变量

| 属性                      | 默认值                         | 说明                   |
| :------------------------ | :----------------------------- | :--------------------- |
| --line-size               | '4px'                          | 轨道线宽度             |
| --line-border-radius      | '2px'                          | 轨道线圆角大小         |
| --line-background         | 'rgba(120, 120, 128, 0.2)'     | 轨道背景色             |
| --line-active-background  | 'var(--za-theme-primary)'      | 轨道激活状态背景色     |
| --dot-size                | '10px'                         | 刻度圆点大小           |
| --dot-background          | 'var(--za-background-color)'   | 刻度圆点背景色         |
| --dot-border-color        | 'rgba(120, 120, 128, 0.2)'     | 刻度圆点边框色         |
| --dot-border-width        | '2px'                          | 刻度圆点边框宽度       |
| --dot-active-border-color | 'var(--za-theme-primary)'      | 刻度圆点激活状态边框色 |
| --knob-size               | '24px'                         | 把手尺寸               |
| --knob-size-small         | '16px'                         | 小型号把手尺寸         |
| --knob-background         | '#fff'                         | 把手背景色             |
| --knob-box-shadow         | '0 1px 3px rgba(0, 0, 0, 0.4)' | 把手阴影               |
| --mark-font-size          | '14px'                         | 标记字体大小           |
| --mark-text-color         | 'var(--za-theme-primary)'      | 标记字体颜色           |
| --mark-spacing            | '15px'                         | 标记与轨道的间距       |
| --disabled-opacity        | 'var(--za-opacity-disabled)'   | 禁用不透明度           |
