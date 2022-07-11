# Switch 开关

## 基本用法

```jsx
import { useState } from 'react';
import { Switch, List } from 'zarm';

const Demo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <List>
      <List.Item title="普通" after={<Switch checked={checked} onChange={setChecked} />} />
      <List.Item title="默认开" after={<Switch defaultChecked />} />
      <List.Item title="禁用的开关（默认关）" after={<Switch disabled />} />
      <List.Item title="禁用的开关（默认开）" after={<Switch defaultChecked disabled />} />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性           | 类型                       | 默认值 | 说明                   |
| :------------- | :------------------------- | :----- | :--------------------- |
| checked        | boolean                    | -      | 值                     |
| defaultChecked | boolean                    | -      | 初始值                 |
| disabled       | boolean                    | false  | 是否禁用               |
| onChange       | (checked: boolean) => void | -      | 值变化时触发的回调函数 |

## CSS 变量

| 属性                           | 默认值                                                                                            | 说明           |
| :----------------------------- | :------------------------------------------------------------------------------------------------ | :------------- |
| --za-switch-width              | '52px'                                                                                            | 宽度           |
| --za-switch-height             | '32px'                                                                                            | 高度           |
| --za-switch-background         | 'rgba(120, 120, 128, 0.16)'                                                                       | 背景色         |
| --za-switch-border-radius      | 'var(--za-radius-round)'                                                                          | 圆角大小       |
| --za-switch-transition         | 'all 0.3s'                                                                                        | 过渡效果       |
| --za-switch-checked-background | 'var(--za-theme-primary)'                                                                         | 开启时的背景色 |
| --za-switch-knob-background    | '#fff'                                                                                            | 把手背景色     |
| --za-switch-knob-size          | '28px'                                                                                            | 把手大小       |
| --za-switch-knob-box-shadow    | '0 3px 1px rgba(0, 0, 0, 0.06), 0 3px 8px rgba(0, 0, 0, 0.15)'                                    | 把手阴影效果   |
| --za-switch-knob-border-color  | 'rgba(0, 0, 0, 0.04)'                                                                             | 把手边框色     |
| --za-switch-knob-border-width  | '0.5px'                                                                                           | 把手边框宽度   |
| --za-switch-knob-transition    | 'transform 0.3s cubic-bezier(0.45, 1, 0.4, 1), transform 0.3s cubic-bezier(0.4, 0.4, 0.25, 1.35)' | 把手过渡效果   |
