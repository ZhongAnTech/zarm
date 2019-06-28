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
              Object.assign(itemStyle,{backgroundColor:`rgb(${255-index*index*5},${255-index*index*3},${255-index*index})`})
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

## 超出滑动（左右弹性）
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
        swipeable
        useTabPaged //是否使用分页
        >
          {this.createDefaultPanels(10)}
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
## 超出滑动（左右无弹性）
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
        useTabPaged   //是否使用分页
        scrollElastic={false}
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
        <Tabs tabWidth={100} useTabPaged>
          {this.createDefaultPanels(5)}
        </Tabs>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);
```
## 指定线条宽度 50px
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
        <Tabs lineWidth={50} useTabPaged >
          {this.createDefaultPanels(7)}
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

## 禁用所有选项
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
        <Tabs disabled >
          {this.createDefaultPanels(3)}
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
| disabled | boolean | false | 是否禁用所有选项 |
| useTabPaged | boolean | false | 是否使用超出滚动 |
| swipeable | boolean | false | 是否支持滑动切换 |
| lineWidth | number | - | 线条宽度，默认与tab同宽 |
| tabWidth | number | 70px | tab宽度 超出为70px，不超出均分容器宽度|
| scrollElastic | boolean  | false | 末端带弹性滑动 |
| horizontal | boolean | true | tab方向，目前只支持水平方向 |
| onChange | (index?: number) => void | - | 值变化时触发的回调函数 |


### Panel
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| disabled | boolean | false | 是否禁用 |
| title | string | - | 标题 |
