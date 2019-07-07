# Tabs 标签页

## 基本用法
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  createDefaultPanels(l) {
    return (  Array.from({ length: l }).map((e, i) => {
      return (<Panel title={`选项卡${i}`} key={i}><div className="content">{ `选项卡内容${i}`}</div></Panel>);
    }));
  };
  render() {
    return (
      <div>
        <Tabs onChange={(i) => {}} 
        defaultActiveKey={1}
        swipeable
        >
          {this.createDefaultPanels(4)}
        </Tabs>
      </div>
    )
  }
}
 ReactDOM.render(<Demo />, mountNode);
```


## 基本用法-LIST
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  
  render() {
    const panelStyle  = {
      width:"100%",
      overflowY:"scroll",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flexStart"
    }
    const itemStyle = {
      height: "100px",
      width:'100%',
      flexShrink: 0
    }
    return (
      <div>
        <Tabs onChange={(i) => {}} 
        defaultActiveKey={1}
        swipeable
        >
          <Panel title="选项卡1" >
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2" selected  >
            <div className="content" style={panelStyle}>
            {Array.from({length:3}).map((item,index)=>{
              return (
                <div style={itemStyle} key={index}>list{index}
              </div>)}
            )}
              
            </div>
          </Panel>
          <Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}
 ReactDOM.render(<Demo />, mountNode);
```

## 超出滑动
```jsx
import { Tabs } from 'zarm';
const  Panel = Tabs.Panel;

class Demo extends React.Component {
  createDefaultPanels(l) {
    return (  Array.from({ length: l }).map((e, i) => {
      return (<Panel title={`选项卡${i}`} key={i}><div className="content">{ `选项卡内容${i}`}</div></Panel>);
    }));
  };
  render() {
    return (
      <div>
        <Tabs onChange={(i) => { }} 
        tabWidth={80}
        swipeable={true}
        scrollThreshold={3}   //是否使用分页
        >
          {this.createDefaultPanels(10)}
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
## 指定tab宽度 100px
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  createDefaultPanels(l) {
    return (  Array.from({ length: l }).map((e, i) => {
      return (<Panel title={`选项卡${i}`} key={i}><div className="content">{ `选项卡内容${i}`}</div></Panel>);
    }));
  };
  render() {
    return (
      <div>
        <Tabs tabWidth={100} scrollThreshold={3}   >
          {this.createDefaultPanels(5)}
        </Tabs>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);
```

## 指定默认选项
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey={1}>
          <Panel title="选项卡1" >
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2" selected>
            <div className="content">选项卡2内容selected</div>
          </Panel>
          <Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```






## 禁用单个选项
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs >
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2" disabled>
            <div className="content">选项卡2内容</div>
          </Panel>
          <Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| activeKey | number | - | 当前激活项 |
| defaultActiveKey | number | 0 | 初始激活项 |
| swipeable | boolean | false | 是否支持滑动切换 |
| tabWidth | number | 70px | tab宽度 超出为70px，不超出均分容器宽度|
| direction | string | 'top' | 选项栏所在位置 |
| onChange | (index?: number) => void | - | 值变化时触发的回调函数 |


### Panel
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| disabled | boolean | false | 是否禁用 |
| selected | boolean | false | 默认选项 |
| title | string | - | 标题 |
