# 标签页 Tabs




## 超出滑动
```jsx
import { Tabs } from 'zarm';
const  Panel = Tabs.Panel;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs onChange={(i) => { console.log(i); }} 
        canSwipe
        page={5}   //Tab分页尺寸
        useTabPaged={true}   //是否使用分页
        tabWidth={80}
        defaultValue={2}
        lineWidth={30}
        scrollElastic={true}
        >
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2">
            <div className="content">选项卡2内容</div>
          </Panel>
          <Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Panel>
          <Panel title="选项卡4" disabled>
            <div className="content">选项卡4内容</div>
          </Panel>
          <Panel title="选项卡5">
            <div className="content">选项卡5内容</div>
          </Panel>
          <Panel title="选项卡6">
            <div className="content">选项卡6内容</div>
          </Panel>
          <Panel title="选项卡7">
            <div className="content">选项卡7内容</div>
          </Panel>
          <Panel title="选项卡8">
            <div className="content">选项卡8内容</div>
          </Panel>
          <Panel title="选项卡9">
            <div className="content">选项卡9内容</div>
          </Panel>
          <Panel title="选项卡10">
            <div className="content">选项卡10内容</div>
          </Panel>
          <Panel title="选项卡11">
            <div className="content">选项卡11内容</div>
          </Panel>
          <Panel title="选项卡12">
            <div className="content">选项卡12内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 超出滑动2
```jsx
import { Tabs } from 'zarm';
const  Panel = Tabs.Panel;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs onChange={(i) => { console.log(i); }} 
        canSwipe
        useTabPaged={true}   //是否使用分页
        tabWidth={100}
        scrollElastic={false}
        >
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2">
            <div className="content">选项卡2内容</div>
          </Panel>
          <Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Panel>
          <Panel title="选项卡4" disabled>
            <div className="content">选项卡4内容</div>
          </Panel>
          <Panel title="选项卡5">
            <div className="content">选项卡5内容</div>
          </Panel>
          <Panel title="选项卡6">
            <div className="content">选项卡6内容</div>
          </Panel>
          <Panel title="选项卡7">
            <div className="content">选项卡7内容</div>
          </Panel>
          <Panel title="选项卡8">
            <div className="content">选项卡8内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
## selected 默认选项卡
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false
    };
  }
  render() {
    const {isSelected} = this.state
  if(!isSelected){
    let timer = setTimeout(()=>{
      this.setState({
        isSelected:true
      })
    },2000);
  }
    return (
      <div>
        <Tabs onChange={(i) => { console.log(i); }} 
        page={5}   //Tab分页尺寸
        canSwipe={false}
        >
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2" selected={isSelected}>
            <div className="content">选项卡2内容{isSelected}</div>
          </Panel>
          <Panel title="选项卡3">
            <div className="content">选项卡3内容</div>
          </Panel>
          <Panel title="选项卡4">
            <div className="content">选项卡4内容</div>
          </Panel>
        </Tabs>
      </div>
    )
  }
}

  ReactDOM.render(<Demo />, mountNode);
```
## 基本用法
```jsx
// import { Tabs } from 'zarm';
// const { Panel } = Tabs;

// class Demo extends React.Component {
//   render() {
//     return (
//       <div>
//         <Tabs onChange={(i) => { console.log(i); }} 
//         page={5}   //Tab分页尺寸
//         defaultValue={1}
//         canSwipe
//         >
//           <Panel title="选项卡1">
//             <div className="content">选项卡1内容</div>
//           </Panel>
//           <Panel title="选项卡2">
//             <div className="content">选项卡2内容</div>
//           </Panel>
//           <Panel title="选项卡3">
//             <div className="content">选项卡3内容</div>
//           </Panel>
//           <Panel title="选项卡4">
//             <div className="content">选项卡4内容</div>
//           </Panel>
//         </Tabs>
//       </div>
//     )
//   }
// }

//  ReactDOM.render(<Demo />, mountNode);
```



## 可滑动
```jsx
// import { Tabs } from 'zarm';
// const { Panel } = Tabs;

// class Demo extends React.Component {
//   render() {
//     return (
//       <div>
//         <Tabs canSwipe onChange={(i) => { console.log(i); }}>
//           <Panel title="选项卡1">
//             <div className="content">试试点我左滑</div>
//           </Panel>
//           <Panel title="选项卡2">
//             <div className="content">试试点我右滑</div>
//           </Panel>
//         </Tabs>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Demo />, mountNode);
```



## 指定默认选项
```jsx
// import { Tabs } from 'zarm';
// const { Panel } = Tabs;

// class Demo extends React.Component {
//   render() {
//     return (
//       <div>
//         <Tabs defaultValue={1}>
//           <Panel title="选项卡1">
//             <div className="content">选项卡1内容</div>
//           </Panel>
//           <Panel title="选项卡2">
//             <div className="content">选项卡2内容</div>
//           </Panel>
//           <Panel title="选项卡3">
//             <div className="content">选项卡3内容</div>
//           </Panel>
//         </Tabs>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Demo />, mountNode);
```



## 指定线条宽度
```jsx
import { Tabs } from 'zarm';
const { Panel } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tabs lineWidth={10} >
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2">
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
  render() {
    return (
      <div>
        <Tabs disabled>
          <Panel title="选项卡1">
            <div className="content">选项卡1内容</div>
          </Panel>
          <Panel title="选项卡2" >
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



<!-- ## API

### Tabs
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 值 |
| defaultValue | string | - | 初始值 |
| disabled | boolean | false | 是否禁用 |
| canSwipe | boolean | false | 是否支持滑动切换 |
| lineWidth | number \| string | - | 线条宽度 |
| onChange | (index?: number) => void | - | 值变化时触发的回调函数 |


### Panel
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| disabled | boolean | false | 是否禁用 |
| title | string | - | 标题 | -->
