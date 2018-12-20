## 工具提示 Tooltip



### 基本用法
```jsx
import { Tooltip, Cell, Button } from 'zarm';

class Demo extends React.Component {

  render() {
    return (
     <div>
        <Cell>
        {
          ['topLeft', 'top', 'topRight', 'rightTop', 'right', 'rightBottom'].map(item => {
            return (
              <Tooltip key={item} trigger='click'   title='Tooltip' direction={item}>
                <div  style={{marginRight: 10}}>{item}</div>
              </Tooltip>
            );
          })
        }
        </Cell>
         <Cell>
         {
          ['bottomLeft', 'bottom', 'bottomRight', 'leftTop', 'left', 'leftBottom'].map((item) => {
            return (
               <Tooltip key={item} trigger='click'   title='Tooltip' direction={item}>
                <div  style={{marginRight: 10}}>{item}</div>
              </Tooltip>
            )
          })
          }
         </Cell>
      </div>
     
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


### API

| 属性            | 类型                       | 默认值                   | 可选值／参数 | 说明                |
| :-------------- | :------------------------- | :----------------------- | :----------- | :------------------ |
| prefixCls       | string                     | za-toast                 |              | 类名前缀            |
| className       | string                     |                          |              | 追加类名            |
| visible         | boolean                    | false                    |              | 是否显示            |
| title           | React.ReactNode            |                          |              | 内容                |
| style           | React.CSSProperties        | noop                     |              | 自定义样式          |
| direction       | string                     | 'top'                    |              | 显示方向            |
| trigger         | string                     | 'click' (pc端默认'hover' |              | 触发方式            |
| onVisibleChange | (visible: boolean) => void | noop                     |              | 显示/隐藏触发的事件 |



