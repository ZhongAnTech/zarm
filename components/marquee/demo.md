
### 基本用法
```jsx
import { Marquee, Cell } from 'zarm';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Cell>
          <Marquee scrollAmount="10" style={{width: '100%'}} scrollDelay="5">
            <div>我从左向右滚动延迟执行5秒</div>
          </Marquee>
        </Cell>
        <Cell>
          <Marquee direction="right" style={{width: '100%'}}>
            <div>我从右向左滚动</div>
          </Marquee>
        </Cell>
        <Cell>
          <Marquee direction="up" height="40">
            <div>我</div>
            <div>从</div>
            <div>下</div>
            <div>往</div>
            <div>上</div>
            <div>滚</div>
            <div>动</div>
          </Marquee>
        </Cell>
         <Cell>
          <Marquee direction="down" height="40">
            <div>我</div>
            <div>从</div>
            <div>上</div>
            <div>往</div>
            <div>下</div>
            <div>滚</div>
            <div>动</div>
          </Marquee>
        </Cell>
     </div>   
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


### API

| 属性 | 类型 | 必填 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| direction | 'left' \| 'right' \| 'up' \| 'down' | 否 | 'left' | 方向 |
| width | string | 否 | - |  容器宽度 |
| height | string | 否 | - | 容器高度 |
| loop | boolean | 否 | true |是否循环 |
| scrollAmount | number | 否 | 6 | 速度 |
| scrollDelay | number | 否 | 0 | 延迟执行 |

