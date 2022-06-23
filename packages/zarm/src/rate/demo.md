# Rate 评分

## 基本用法

```jsx
import { List, Rate } from 'zarm';

ReactDOM.render(
  <List>
    <List.Item>
      <Rate defaultValue={2} />
    </List.Item>
  </List>,
  mountNode,
);
```

## 半星

```jsx
import { List, Rate } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate defaultValue={2.5} allowHalf />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义图标

```jsx
import { List, Rate } from 'zarm';
import { SuccessCircle } from '@zarm-design/icons';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate defaultValue={3} character={<SuccessCircle />} allowHalf />
      </List.Item>
      <List.Item>
        <Rate defaultValue={3} character="众" allowHalf />
      </List.Item>
      <List.Item>
        <Rate defaultValue={3} character="A" allowHalf />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义颜色

```jsx
import { List, Rate } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate defaultValue={3} style={{ '--active-color': '#fa541b' }} allowHalf />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义间距

```jsx
import { List, Rate } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate defaultValue={3} style={{ '--gap': '16px' }} allowHalf />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义数量

```jsx
import { List, Rate } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate defaultValue={3} count={10} allowHalf />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 可清除

```jsx
import { List, Rate } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate defaultValue={3} allowHalf allowClear />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 只读状态

```jsx
import { List, Rate } from 'zarm';

const Demo = () => {
  return (
    <List>
      <List.Item>
        <Rate value={2.5} allowHalf readonly />
      </List.Item>
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 受控组件

```jsx
import { useState } from 'react';
import { List, Rate, Toast } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState(3);

  const toast = Toast.useToast();
  return (
    <List>
      <List.Item
        title={
          <Rate
            allowHalf
            value={value}
            onChange={(value) => {
              setValue(value);
              toast.show(value);
            }}
          />
        }
        after={value}
      />
    </List>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型                    | 默认值           | 说明                     |
| :----------- | :---------------------- | :--------------- | :----------------------- |
| value        | number                  | -                | 分值                     |
| defaultValue | number                  | 0                | 初始分值                 |
| count        | number                  | 5                | 总分值                   |
| character    | React.ReactNode         | \<StartFill \/\> | 自定义字符               |
| allowHalf    | boolean                 | false            | 是否允许半选             |
| allowClear   | boolean                 | false            | 是否允许再次点击后清除   |
| readonly     | boolean                 | false            | 是否只读状态             |
| onChange     | (value: number) => void | -                | 分值变化时触发的回调函数 |

## CSS 变量

| 属性           | 默认值    | 说明             |
| :------------- | :-------- | :--------------- |
| --size         | '20px'    | 选项大小         |
| --color        | '#eee'    | 选项颜色         |
| --active-color | '#fadb14' | 选项激活后的颜色 |
| --gap          | '4px'     | 选项之间的间距   |
