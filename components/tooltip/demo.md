# 工具提示 Tooltip

## 基本用法
```jsx
import { Tooltip, Cell, Button } from 'zarm';

class Demo extends React.Component {

  render() {
    return (
     <div>
        <Cell>
          <div className='tip'>
            <div  style={{'marginLeft':  53}}>
              {
                // ['topLeft', 'top', 'topRight'].map(item => {
                //   return (
                //     <Tooltip key={item} trigger='click'   title='Tooltip' direction={item}>
                //       <div  style={{marginRight: 10}}>{item}</div>
                //     </Tooltip>
                //   );
                // })
              }
              <Tooltip direction="topLeft" title='topLeft text'>
                <Button  size="xs">TL</Button>
              </Tooltip>

              <Tooltip direction="top" title='top text'>
                <Button  size="xs">Top</Button>
              </Tooltip>

              <Tooltip direction="topRight" title='topRight text'>
                <Button size="xs">TR</Button>
              </Tooltip>
            </div>

            <div style={{'width':  50, 'float': 'left'}}>
              <Tooltip direction="leftTop" title='leftTop text'>
                <Button size="xs">LT</Button>
              </Tooltip>

              <Tooltip direction="left" title='left text'>
                <Button size="xs">Left</Button>
              </Tooltip>

              <Tooltip direction="leftBottom" title='leftBottom text'>
                <Button  size="xs">LB</Button>
              </Tooltip>
            </div>

            <div  style={{'width': 50,  'marginLeft':  50*4+30,}}>
              <Tooltip direction="rightTop" title='rightTop text'>
                <Button size="xs">RT</Button>
              </Tooltip>

              <Tooltip direction="right" title='right text'>
                <Button size="xs">Right</Button>
              </Tooltip>

              <Tooltip direction="rightBottom" title='rightBottom text'>
                <Button size="xs">RB</Button>
              </Tooltip>
            </div>

            <div style={{"marginLeft": 53, "clear": "both" }}>
              <Tooltip direction="bottomLeft" title='bottomLeft text'>
                <Button size="xs">BL</Button>
              </Tooltip>

              <Tooltip direction="bottom" title='bottom text'>
                <Button size="xs">Bottom</Button>
              </Tooltip>

              <Tooltip direction="bottomRight" title='bottomRight '>
                <Button size="xs">BR</Button>
              </Tooltip>
            </div>

          </div>
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



