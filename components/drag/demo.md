# Drag 拖拽



## 基本用法

```jsx
import { Drag, Button } from 'zarm';

class Demo extends React.Component {
  currentX = 0;

  currentY = 0;

  state = {
    x: 0,
    y: 0,
    drag: false,
  };

  componentDidMount() {
    const { width, height } = this.box.getBoundingClientRect();
    const { width: containerWidth, height: containerHeight } = this.container.getBoundingClientRect();

    this.currentX = Math.round(Math.random() * (containerWidth - width));
    this.currentY = Math.round(Math.random() * (containerHeight - height));

    this.setState({
      x: this.currentX,
      y: this.currentY,
    });
  }

  onDragStart = (event, dragState) => {
    console.log('onDragStart', dragState);

    this.setState({
      drag: true,
    });
  }

  onDragMove = (event, dragState) => {
    console.log('onDragMove', dragState);

    const { width, height } = this.box.getBoundingClientRect();
    const { width: containerWidth, height: containerHeight } = this.container.getBoundingClientRect();

    let newX = this.currentX + dragState.offsetX;
    let newY = this.currentY + dragState.offsetY;

    if (newX < 0) {
      newX = 0;
    }
    if (newX > containerWidth - width) {
      newX = containerWidth - width;
    }
    if (newY < 0) {
      newY = 0;
    }
    if (newY > containerHeight - height) {
      newY = containerHeight - height;
    }

    this.setState({
      x: newX,
      y: newY,
    });

    return true;
  }

  onDragEnd = (event, dragState) => {
    console.log('onDragEnd', dragState);

    const { x, y } = this.state;
    this.currentX = x;
    this.currentY = y;

    this.setState({
      drag: false,
    });
  }

  render() {
    const { x, y, drag } = this.state;

    return (
      <div
        ref={(el) => { this.container = el; }}
        style={{
          height: 300,
          backgroundColor: '#ddd',
          position: 'relative'
        }}
      >
        <Drag
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}
        >
          <div
            ref={(el) => { this.box = el; }}
            style={{
              display: 'inline-block',
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
          >
            {
              drag
                ? <Button theme="danger">Let me go!</Button>
                : <Button theme="primary">Catch me~</Button>
            }
          </div>
        </Drag>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| onDragStart | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => void | - | 触摸/点击 起始时触发的事件 |
| onDragMove | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => boolean | - | 拖拽移动时触发的事件 |
| onDragEnd | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => void | - | 触摸/点击 结束时触发的事件 |

### DragState
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| startTime | Date | new Date() | 起始时间 |
| startX | number | - | 起始点x坐标 |
| startY | number | - | 起始点y坐标 |
| offsetX | number | - | 横向偏移量 |
| offsetY | number | - | 纵向偏移量 |