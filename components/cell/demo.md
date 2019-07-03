# Cell 列表项



## 基本用法
```jsx
import { Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 带描述
```jsx
import { Cell, Icon } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" description="描述文字" />
        <Cell title="标题文字" description={<Icon type="right" />} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 带图标、标题
```jsx
import { Cell, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" icon={<Icon type="right" />} />
        <Cell title="标题文字" icon={<img alt="" src={img} style={{ width: 24, height: 24 }} />} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 带跳转
```jsx
import { Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell title="标题文字" onClick={() => {}} />
        <Cell title="标题文字" onClick={() => {}} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 带描述、箭头、跳转
```jsx
import { Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
        <Cell hasArrow title="标题文字" description="描述文字" onClick={() => {}} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 带图标、描述、箭头、跳转
```jsx
import { Cell, Icon } from 'zarm';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          hasArrow
          title="标题文字"
          description="描述文字"
          icon={<Icon type="right" />}
          onClick={() => {}}
        />

        <Cell 
          hasArrow
          title="标题文字"
          description="描述文字"
          icon={
            <img alt="" src={img} style={{ width: '24px', height: '24px' }} />
          }
          onClick={() => {}}
        />

        <Cell
          hasArrow
          title={
            <div className="box">
              <div className="box-title">标题文字</div>
              <div className="box-description">描述文字</div>
            </div>
          }
          description="附加提示"
          icon={<img alt="" src={img} style={{ width: '48px', height: '48px' }} />}
          onClick={() => {}}
        />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 提示信息
```jsx
import { Cell, Message, Icon, Input } from 'zarm';

const infoRoundSvg = (
  <i style={{fontSize: '14px', color: 'var(--theme-danger)', width: '1em', height: '1em', lineHeight: '1em', display: 'inline-block'}}><svg width="1em" height="1em" viewBox="0 0 37 37" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M35 18.5C35 9.387 27.613 2 18.5 2S2 9.387 2 18.5 9.387 35 18.5 35 35 27.613 35 18.5z" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><g fill="currentColor"><path d="M18.103 13.793c-.61 0-1.103.494-1.103 1.104v12a1.103 1.103 0 1 0 2.207 0v-12c0-.61-.493-1.104-1.104-1.104M18.103 9.791c-.143 0-.286.033-.419.088A1.108 1.108 0 0 0 17 10.894c0 .298.12.574.32.784.11.1.22.187.364.243.408.165.894.066 1.203-.243.199-.21.32-.486.32-.784 0-.143-.033-.286-.088-.419a1.09 1.09 0 0 0-.232-.353 1.122 1.122 0 0 0-.784-.331"/></g></g></svg></i>
);

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell
          title="标题"
          help={<Message theme="danger" icon={infoRoundSvg}>标题不能为空</Message>}
        >
          <Input type="text" placeholder="请输入标题" />
        </Cell>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| hasArrow | boolean | false | 是否显示箭头 |
| icon | ReactNode | - | 设置图标 |
| titile | ReactNode | - | 设置标题区域内容 |
| description | ReactNode | - | 设置描述区域内容 |
| help | ReactNode | - | 设置下方提示信息区域内容，通常配合 `Message` 组件使用 |
| onClick | () => void | - | 点击后触发的回调函数 |
