# Dropdown 下拉菜单

## 基本用法

```jsx
import { useState, useRef } from 'react';
import { Dropdown, List, Badge, Switch, Button, Picker } from 'zarm';
import Icons from '@zarm-design/icons';

const items = [
  {
    key: 'item-1',
    title: 'Item 1',
  },
  {
    key: 'item-2',
    title: 'Item 2',
  },
  {
    key: 'item-3',
    title: 'Item 3',
  },
];

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
  { value: '4', label: '选项四' },
  { value: '5', label: '选项五' },
];

const Demo = () => {
  const [selectedKey, setSelectedKey] = useState();
  const [pickerVisible, setPickerVisible] = useState(false);
  const DropdownRef = useRef(null);

  const onChange = (key) => {
    console.log('onChange key:', key);
  };
  return (
    <Dropdown ref={DropdownRef} onChange={onChange} popupClassName="customPopupClassName">
      <Dropdown.Item key="key1" title="菜单一">
        <List>
          {items.map((item) => (
            <List.Item
              hasArrow={false}
              key={item.key}
              title={item.title}
              suffix={selectedKey === item.key ? <Icons.Success theme="primary" /> : null}
              onClick={() => {
                setSelectedKey(item.key);
                DropdownRef.current.close();
              }}
            />
          ))}
        </List>
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        <List>
          <List.Item hasArrow title="Item 1" suffix={<Badge shape="circle" text={3} />} />
          <List.Item title="Item 2" suffix={<Switch />} />
          <List.Item
            title="Picker选择器"
            suffix={
              <Button size="xs" onClick={() => setPickerVisible(true)}>
                选择
              </Button>
            }
          />
        </List>
        <div className="btn-block">
          <Button
            block
            theme="primary"
            onClick={() => {
              DropdownRef.current.close();
            }}
          >
            关闭
          </Button>
        </div>
        <Picker
          visible={pickerVisible}
          dataSource={SINGLE_DATA}
          onConfirm={(changedValue, items) => {
            console.log('Single Picker onConfirm: ', items);
            setPickerVisible(false);
          }}
          onCancel={() => setPickerVisible(false)}
        />
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 自定义箭头图标

```jsx
import { useRef, useState } from 'react';
import { Dropdown, List, Badge, Switch, Button, Tabs } from 'zarm';
import Icons from '@zarm-design/icons';
const { Panel } = Tabs;

const Demo = () => {
  const DropdownRef = useRef(null);
  const [value, setValue] = useState(0);
  const onChange = (key) => {
    console.log('onChange key:', key);
  };
  return (
    <Dropdown
      ref={DropdownRef}
      arrow={<Icons.ArrowDown theme="primary" size="sm" />}
      onChange={onChange}
    >
      <Dropdown.Item key="key1" title="菜单一">
        <Tabs value={value} onChange={setValue}>
          <Panel title="选项卡1">
            <div className="content">
              <div>选项卡1内容</div>
              <div>
                <Button
                  size="sx"
                  onClick={() => {
                    DropdownRef.current.close();
                  }}
                >
                  内部关闭
                </Button>
              </div>
            </div>
          </Panel>
          <Panel title="选项卡2">
            <List>
              <List.Item hasArrow title="Item 1" suffix={<Badge shape="circle" text={3} />} />
              <List.Item
                title="Item 2"
                suffix={<Switch onChange={() => DropdownRef.current.close()} />}
              />
            </List>
          </Panel>
        </Tabs>
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二" arrow={<Icons.Star theme="primary" size="sm" />}>
        <List>
          <List.Item hasArrow title="Item 1" suffix={<Badge shape="circle" text={3} />} />
          <List.Item
            title="Item 2"
            suffix={<Switch onChange={() => DropdownRef.current.close()} />}
          />
        </List>
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 向上展开

```jsx
import { useRef } from 'react';
import { Dropdown, List, Badge, Switch } from 'zarm';

const Demo = () => {
  const DropdownRef = useRef(null);
  const onChange = () => {
    console.log('onChange callback');
  };

  return (
    <Dropdown ref={DropdownRef} direction="up" onChange={onChange}>
      <Dropdown.Item key="key1" title="菜单一">
        <List>
          <List.Item
            hasArrow
            title="Item 1"
            suffix="more"
            onClick={() => {
              DropdownRef.current.close();
            }}
          />
          <List.Item
            hasArrow
            title="Item 2"
            suffix={<Badge shape="circle" text={3} />}
            onClick={() => {
              DropdownRef.current.close();
            }}
          />
          <List.Item
            title="Item 3"
            suffix={
              <Switch
                onChange={() => {
                  DropdownRef.current.close();
                }}
              />
            }
          />
        </List>
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        <List>
          <List.Item hasArrow title="Item 1" suffix={<Badge shape="circle" text={3} />} />
          <List.Item title="Item 2" suffix={<Switch />} />
        </List>
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 禁用

```jsx
import { Dropdown } from 'zarm';

const Demo = () => {
  return (
    <Dropdown disabled>
      <Dropdown.Item key="key1" title="菜单一">
        内容一
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        内容二
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 动画类型

```jsx
import { useState, useRef } from 'react';
import { Dropdown, List, Badge, Switch } from 'zarm';
import Icons from '@zarm-design/icons';

const items = [
  {
    key: 'item-1',
    title: 'Item 1',
  },
  {
    key: 'item-2',
    title: 'Item 2',
  },
  {
    key: 'item-3',
    title: 'Item 3',
  },
];

const Demo = () => {
  const [selectedKey, setSelectedKey] = useState();
  const DropdownRef = useRef(null);

  return (
    <Dropdown ref={DropdownRef} animationType="zoom-fade">
      <Dropdown.Item key="key1" title="菜单一">
        <List>
          {items.map((item) => (
            <List.Item
              hasArrow={false}
              key={item.key}
              title={item.title}
              suffix={selectedKey === item.key ? <Icons.Success theme="primary" /> : null}
              onClick={() => {
                setSelectedKey(item.key);
                DropdownRef.current.close();
              }}
            />
          ))}
        </List>
      </Dropdown.Item>
      <Dropdown.Item key="key2" title="菜单二">
        <List>
          <List.Item hasArrow title="Item 1" suffix={<Badge shape="circle" text={3} />} />
          <List.Item
            title="Item 2"
            suffix={<Switch onChange={() => DropdownRef.current.close()} />}
          />
        </List>
      </Dropdown.Item>
    </Dropdown>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 默认激活

```jsx
import { useRef, useState } from 'react';
import { Dropdown, List, Badge, Switch, Button, Tabs } from 'zarm';
const { Panel } = Tabs;

const Demo = () => {
  const DropdownRef = useRef();
  const [value, setValue] = useState(0);
  const [selectedKey, setSelectedKey] = useState();

  return (
    <>
      <Dropdown
        ref={DropdownRef}
        activeKey={selectedKey}
        onChange={(key) => {
          setSelectedKey(key);
        }}
      >
        <Dropdown.Item key="key1" title="菜单一">
          <Tabs value={value} onChange={setValue}>
            <Panel title="选项卡1">
              <div className="content">
                <div>选项卡1内容</div>
                <div>
                  <Button
                    size="sx"
                    onClick={() => {
                      DropdownRef.current.close();
                    }}
                  >
                    内部关闭
                  </Button>
                </div>
              </div>
            </Panel>
            <Panel title="选项卡2">
              <div className="content">选项卡2内容</div>
            </Panel>
          </Tabs>
        </Dropdown.Item>
        <Dropdown.Item key="key2" title="菜单二">
          <List.Item hasArrow title="Item 1" suffix={<Badge shape="circle" text={3} />} />
          <List.Item
            title="Item 2"
            suffix={<Switch onChange={() => DropdownRef.current.close()} />}
          />
        </Dropdown.Item>
      </Dropdown>

      <div className="btn-container">
        <Button size="xs" onClick={() => setSelectedKey('key1')}>
          激活菜单1
        </Button>
        <Button size="xs" onClick={() => setSelectedKey('key2')}>
          激活菜单2
        </Button>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### Dropdown

| 属性             | 类型                  | 默认值 | 说明 |
| :--------------- | :-------------------- | :----- | :--------------------------- |
| activeKey        | number \| string      | -      | 激活的 Item Key |
| defaultActiveKey | number \| string      | -      | 默认激活的 Item Key |
| direction        | 'up' \| 'down'     | 'down'  | 默认下拉方向  |
| arrow            | ReactNode             | -      | 箭头样式 |
| onChange         | (key: string \| null) => void | -      | 值变化时触发的回调函数  |
| maskClosable     | boolean               | true   | 是否点击遮罩层时关闭 |
| maskOpacity      | number                | 0.7    | 默认遮罩层透明度(0-1) |
| animationType    | string                | -      | 菜单动画类型，可选值 `fade`、`door`、`flip`、`rotate`、`zoom`、`zoom-fade`、`move-up`、 `move-down`、`move-left`、`move-right`、`slide-up`、`slide-down`、`slide-left`、`slide-right` |
| animationDuration    | number                | -      | 动画执行时间（单位：毫秒） |
| popupClassName    | string                | -      | 弹出层样式名 |

### Dropdown.Item

| 属性          | 类型                     | 默认值   | 说明          |
| :------------ | :-----------------------| :------- | :------------|
| key           | string                  | -        | 唯一的key值   |
| title         | string                  | -        | 子项标题      |
| arrow         | ReactNode                  | -        | 箭头样式      |
