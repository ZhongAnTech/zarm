# Collapse 折叠面板



## 基本用法
```jsx
import { Collapse, Cell } from 'zarm';

ReactDOM.render(
  <Collapse>
    <Collapse.Item key="1" title="50元套餐">
      <div className="content">
        <div>我是内容1</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key={2} title="100元套餐">
      <div className="content">
        <div>我是内容2</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="3" title="200元套餐">
      <div className="content">
        <div>我是内容3</div>
      </div>
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 手风琴模式
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse animated>
    <Collapse.Item key="test1" title="50元套餐">
      <div className="content">
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test2" title="100元套餐">
      <div className="content">
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test3" title="200元套餐">
      <div className="content">
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
      </div>
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 默认展开项
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse defaultActiveKey={['test1', 'test2']} animated>
    <Collapse.Item key="test1" title="50元套餐">
      <div className="content">
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test2" title="100元套餐">
      <div className="content">
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test3" title="200元套餐">
      <div className="content">
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
      </div>
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 允许展开多项
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse animated multiple defaultActiveKey={['test1', 'test3']} onChange={(activeKey) => console.log(activeKey)}>
    <Collapse.Item key="test1" title="50元套餐" onChange={(active) => console.log(`active: ${active}`)}>
      <div className="content">
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test2" title="100元套餐">
      <div className="content">
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test3" title="200元套餐">
      <div className="content">
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
      </div>
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## 禁用子项
```jsx
import { Collapse } from 'zarm';

ReactDOM.render(
  <Collapse 
    multiple
    activeKey={['test2']}
    onChange={key => console.log(key)}
  >
    <Collapse.Item key="test1" title="50元套餐">
      <div className="content">
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
        <div>我是50元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test2" title="100元套餐" disabled>
      <div className="content">
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
        <div>我是100元套餐内容</div>
      </div>
    </Collapse.Item>
    <Collapse.Item key="test3" title="200元套餐" disabled>
      <div className="content">
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
        <div>我是200元套餐内容</div>
      </div>
    </Collapse.Item>
  </Collapse>
, mountNode);
```



## API

## Collapse
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| multiple | boolean | false | 是否可以同时展开多项 |
| animated | boolean | false | 是否添加展开动画 |
| activeKey | string \| number \| string[] \| number[] | [] | 动态更新展开项的索引数组或字符串或数字 |
| defaultActiveKey | string \| number \| string[] \| number[] | [] | 初始化默认展开项的索引数组或字符串或数字 |
| onChange | (activeKey?: string[] \| number[]) => void | - | 点击某一项的回调函数，返回选中的项 |

## Collapse.Item
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | ReactNode | - | 每一项的名称 |
| key | string \| number | - | 对应activeKey |
| disabled | boolean | false | 是否禁用 |
| onChange | (active?: boolean) => void | - | 点击某一项的回调函数 |
