# useDrag 拖拽

## 基本用法

```jsx
import { useEffect, useState, useRef } from 'react';
import { useDrag, Button } from 'zarm';

let currentPoint = [0, 0];

const Demo = () => {
  const containerRef = useRef();
  const boxRef = useRef();
  const [point, setPoint] = useState([0, 0]);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    const { width, height } = boxRef.current.getBoundingClientRect();
    const {
      width: containerWidth,
      height: containerHeight,
    } = containerRef.current.getBoundingClientRect();

    currentPoint[0] = Math.round(Math.random() * (containerWidth - width));
    currentPoint[1] = Math.round(Math.random() * (containerHeight - height));
    setPoint(currentPoint);

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onDragStart = (event, dragState) => {
    console.log('onDragStart', dragState);
    setDrag(true);
  };

  const onDragMove = (event, dragState) => {
    console.log('onDragMove', dragState);

    const { width, height } = boxRef.current.getBoundingClientRect();
    const {
      width: containerWidth,
      height: containerHeight,
    } = containerRef.current.getBoundingClientRect();

    let newX = currentPoint[0] + dragState.offsetX;
    let newY = currentPoint[1] + dragState.offsetY;

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

    setPoint([newX, newY]);
    return true;
  };

  const onDragEnd = (event, dragState) => {
    console.log('onDragEnd', dragState);

    currentPoint = point;
    setDrag(false);
  };

  const getDragProps = useDrag({ onDragStart, onDragMove, onDragEnd });

  return (
    <div
      ref={containerRef}
      style={{
        height: 300,
        backgroundColor: '#5b5c60',
        position: 'relative',
      }}
    >
      <div
        ref={boxRef}
        style={{
          display: 'inline-block',
          transform: `translate3d(${point[0]}px, ${point[1]}px, 0)`,
        }}
        {...getDragProps}
      >
        {drag ? (
          <Button theme="danger">Let me go!</Button>
        ) : (
          <Button theme="primary">Catch me~</Button>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性        | 类型                                                                 | 默认值 | 说明                       |
| :---------- | :------------------------------------------------------------------- | :----- | :------------------------- |
| onDragStart | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => void    | -      | 触摸/点击 起始时触发的事件 |
| onDragMove  | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => boolean | -      | 拖拽移动时触发的事件       |
| onDragEnd   | (event?: MouseEvent \| TouchEvent, dragState?: DragState) => void    | -      | 触摸/点击 结束时触发的事件 |

### DragState

| 属性      | 类型   | 默认值     | 说明          |
| :-------- | :----- | :--------- | :------------ |
| startTime | Date   | new Date() | 起始时间      |
| startX    | number | -          | 起始点 x 坐标 |
| startY    | number | -          | 起始点 y 坐标 |
| offsetX   | number | -          | 横向偏移量    |
| offsetY   | number | -          | 纵向偏移量    |
