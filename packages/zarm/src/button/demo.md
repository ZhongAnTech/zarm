# Button 按钮

## 基本用法

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button>default</Button>
    <Button theme="primary">primary</Button>
  </>,
  mountNode,
);
```

## 块级按钮

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button block>default</Button>
    <Button block disabled>
      default disabled
    </Button>
    <Button block theme="primary">
      primary
    </Button>
    <Button block disabled theme="primary">
      primary disabled
    </Button>
  </>,
  mountNode,
);
```

## 按钮主题

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button>default</Button>
    <Button theme="primary">primary</Button>
    <Button theme="danger">danger</Button>
  </>,
  mountNode,
);
```

## 按钮尺寸

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button size="lg">lg</Button>
    <Button>md</Button>
    <Button size="sm">sm</Button>
    <Button size="xs">xs</Button>
  </>,
  mountNode,
);
```

## 按钮形状

```jsx
import { Button } from 'zarm';
import { Success } from '@zarm-design/icons';

ReactDOM.render(
  <>
    <Button shape="rect" theme="primary">
      rect
    </Button>
    <Button theme="primary">radius</Button>
    <Button shape="round" theme="primary">
      round
    </Button>
    <Button shape="circle" theme="primary">
      circle
    </Button>
    <Button shape="circle" icon={<Success />} />
  </>,
  mountNode,
);
```

## 带阴影

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button shadow>default</Button>
    <Button shadow theme="primary">
      primary
    </Button>
    <Button shadow theme="danger">
      danger
    </Button>
  </>,
  mountNode,
);
```

## 图标按钮

```jsx
import { Button, Icon } from 'zarm';
import { SuccessCircle, CloseCircle } from '@zarm-design/icons';

ReactDOM.render(
  <>
    <Button icon={<SuccessCircle theme="success" />}>success</Button>
    <Button icon={<CloseCircle theme="danger" />}>danger</Button>
  </>,
  mountNode,
);
```

## 加载状态

```jsx
import { Button, Icon } from 'zarm';

ReactDOM.render(
  <>
    <Button loading>loading</Button>
    <Button loading theme="primary">
      loading
    </Button>
    <Button loading disabled theme="primary">
      disabled
    </Button>
  </>,
  mountNode,
);
```

## 链接按钮

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button href="https://zarm.design">default</Button>
    <Button theme="primary" href="https://zarm.design">
      primary
    </Button>
    <Button theme="danger" href="https://zarm.design">
      danger
    </Button>
    <Button disabled theme="primary" href="https://zarm.design">
      disabled
    </Button>
  </>,
  mountNode,
);
```

## 幽灵按钮

```jsx
import { Button } from 'zarm';

ReactDOM.render(
  <>
    <Button block ghost>
      default
    </Button>
    <Button block ghost theme="primary">
      primary
    </Button>
    <Button block ghost theme="danger">
      danger
    </Button>
    <Button block ghost disabled>
      disabled
    </Button>
  </>,
  mountNode,
);
```

## API

| 属性     | 类型                             | 默认值    | 说明                                                                          |
| :------- | :------------------------------- | :-------- | :---------------------------------------------------------------------------- |
| theme    | string                           | 'default' | 设置主题，可选值为 `default`、`primary`、`danger`                             |
| size     | string                           | 'md'      | 设置大小，可选值为 `md`、`lg`、`sm`、`xs`                                     |
| shape    | string                           | 'radius'  | 设置形状，可选值为 `rect`、`radius`、`round`、`circle`                        |
| block    | boolean                          | false     | 是否块级元素                                                                  |
| ghost    | boolean                          | false     | 是否幽灵按钮                                                                  |
| shadow   | boolean                          | false     | 是否带阴影                                                                    |
| disabled | boolean                          | false     | 是否禁用                                                                      |
| loading  | boolean                          | false     | 是否加载中状态                                                                |
| icon     | ReactNode                        | -         | 设置图标                                                                      |
| onClick  | MouseEventHandler&lt;Element&gt; | -         | 点击后触发的回调函数                                                          |
| htmlType | string                           | 'button'  | 设置原生 button 的`type`值，可选值为`button`、`submit`、`reset`               |
| href     | string                           | -         | 点击跳转的地址，指定此属性`button`的行为和 a 标签一致                         |
| target   | string                           | -         | 规定在何处打开链接文档，相当于 a 标签的`target`属性，`href`属性存在时生效     |
| mimeType | string                           | -         | 链接中指向的文档的 mime 类型，相当于 a 标签的`type`属性，`href`属性存在时生效 |
