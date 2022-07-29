# Keyboard 虚拟键盘

## Keyboard 平铺键盘

```jsx
import { useState } from 'react';
import { List, Keyboard, Radio, Slider, Switch, Button } from 'zarm';

const DEFAULT_STYLE = {
  height: 52,
  fontSize: 30,
  gap: 6,
  borderRadius: 5,
  boxShadow: true,
};

// 自定义车牌键盘
const CAR_PLATE = {
  columns: 7,
  keys: [
    '沪',
    '苏',
    {
      text: '黑',
      disabled: true,
    },
    {
      text: '辽',
      disabled: true,
    },
    '浙',
    '赣',
    '湘',
    '晋',
    '豫',
    '云',
    '冀',
    '皖',
    '鲁',
    '新',
    '鄂',
    '桂',
    '甘',
    '蒙',
    '陕',
    {
      text: '吉',
      disabled: true,
    },
    '闽',
    '贵',
    '粤',
    '川',
    '青',
    '藏',
    {
      text: 'ok',
      rowSpan: 2,
      colSpan: 2,
    },
    '琼',
    '宁',
    '渝',
    '京',
    '津',
  ],
};

const Demo = () => {
  const [type, setType] = useState('number');
  const [dataSource, setDataSource] = useState(null);
  const [style, setStyle] = useState(DEFAULT_STYLE);

  const onSetType = (type) => {
    setType(type);

    if (type === 'custom') {
      setDataSource(CAR_PLATE);
      setStyle({ ...DEFAULT_STYLE, fontSize: 20, height: 40 });
    } else {
      setDataSource(null);
      setStyle(DEFAULT_STYLE);
    }
  };

  const keyStyle = {
    '--item-height': `${style.height}px`,
    '--item-font-size': `${style.fontSize}px`,
    '--item-gap': `${style.gap}px`,
    '--item-border-radius': `${style.borderRadius}px`,
    '--item-box-shadow': !style.boxShadow ? 'none' : undefined,
  };

  return (
    <>
      <List>
        <List.Item
          title="键盘类型"
          after={
            <Radio.Group buttonCompact type="button" value={type} onChange={onSetType}>
              <Radio value="number">数字</Radio>
              <Radio value="price">金额</Radio>
              <Radio value="idcard">身份证</Radio>
              <Radio value="custom">自定义</Radio>
            </Radio.Group>
          }
        />
        <List.Item title="按键高度">
          <Slider
            value={style.height}
            onChange={(value) => setStyle({ ...style, height: value })}
          />{' '}
          {style.height}px
        </List.Item>
        <List.Item title="按键字号">
          <Slider
            max={50}
            value={style.fontSize}
            onChange={(value) => setStyle({ ...style, fontSize: value })}
          />
          {style.fontSize}px
        </List.Item>
        <List.Item title="按键间距">
          <Slider
            max={15}
            value={style.gap}
            onChange={(value) => setStyle({ ...style, gap: value })}
          />
          {style.gap}px
        </List.Item>
        <List.Item title="按键圆角">
          <Slider
            value={style.borderRadius}
            onChange={(value) => setStyle({ ...style, borderRadius: value })}
          />
          {style.borderRadius}px
        </List.Item>
        <List.Item title="按键阴影">
          <Switch
            checked={style.boxShadow}
            onChange={(checked) => setStyle({ ...style, boxShadow: checked })}
          />
        </List.Item>
        <List.Item
          after={
            <Button size="xs" onClick={() => onSetType(type)}>
              还原设置
            </Button>
          }
        />
      </List>

      <Keyboard
        type={type}
        dataSource={dataSource}
        style={keyStyle}
        onKeyClick={(key) => console.log(key)}
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## KeyboardPicker 键盘触发器

```jsx
import { useState } from 'react';
import { List, Button, KeyboardPicker } from 'zarm';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  const onKeyClick = (key) => {
    console.log(key);
    if (['close', 'ok'].indexOf(key) > -1) {
      toggle();
      return;
    }
    // do something...
  };

  return (
    <>
      <List>
        <List.Item
          title="拾取器触发方式"
          after={
            <Button size="xs" onClick={toggle}>
              {visible ? '关闭' : '开启'}
            </Button>
          }
        />
      </List>

      <KeyboardPicker visible={visible} onKeyClick={onKeyClick} />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性       | 类型                                | 默认值   | 说明                                                                                                            |
| :--------- | :---------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------- |
| type       | string                              | 'number' | 键盘类型，可选值 `number`、`price`、`idcard`                                                                    |
| onKeyClick | (key: KeyBoardKey['value']) => void | -        | 点击按键时触发的回调函数                                                                                        |
| dataSource | KeyBoardDataSource                  | -        | 自定义键盘，格式参考 [zarm/lib/keyboard/BuildInConfig.js](https://unpkg.com/zarm/lib/keyboard/BuildInConfig.js) |

### KeyBoardDataSource

| 属性    | 类型                                   | 默认值 | 说明       |
| :------ | :------------------------------------- | :----- | :--------- |
| columns | number                                 | -      | 每行的列数 |
| keys    | KeyBoardKey['text'][] \| KeyBoardKey[] | []     | 按键配置   |

### KeyBoardKey

| 属性     | 类型            | 默认值 | 说明                               |
| :------- | :-------------- | :----- | :--------------------------------- |
| value    | string          | -      | 按键值，未设置时取 `text` 属性的值 |
| text     | React.ReactNode | -      | 按键内容                           |
| rowSpan  | number          | -      | 可横跨的行数                       |
| colSpan  | number          | -      | 可横跨的列数                       |
| disabled | boolean         | false  | 是否禁用                           |

### 仅 KeyboardPicker 支持的属性

| 属性    | 类型    | 默认值 | 说明                   |
| :------ | :------ | :----- | :--------------------- |
| visible | boolean | false  | 是否展示               |
| destroy | boolean | true   | 弹层关闭后是否移除节点 |

## CSS 变量

| 属性                     | 默认值                     | 说明               |
| :----------------------- | :------------------------- | :----------------- |
| --background             | '#d8d8d8'                  | 面板背景色         |
| --item-background        | '#fff'                     | 按键背景色         |
| --item-active-background | 'rgba(162, 165, 176, 0.8)' | 按键激活状态背景色 |
| --item-gap               | '6px'                      | 按键间距           |
| --item-height            | '52px'                     | 按键高度           |
| --item-font-size         | '30px'                     | 按键字体大小       |
| --item-border-radius     | '5px'                      | 按键圆角           |
| --item-box-shadow        | '0 1px 0 #898a8d'          | 按键阴影           |
| --ok-background          | 'var(--za-theme-primary)'  | 确定按键背景色     |
| --ok-font-size           | '20px'                     | 确定按键字体大小   |
| --ok-text-color          | '#fff'                     | 确定按键字体颜色   |
