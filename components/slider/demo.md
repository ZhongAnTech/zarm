# Slider 滑动输入条



## 基本用法
```jsx
import { Cell, Slider } from 'zarm';

class Demo extends React.Component {
  state = {
    value: 0,
  };

  render() {
    return (
      <>
        <Cell title="普通">
          <Slider
            value={this.state.value}
            onChange={(value) => {
              this.setState({ value })
              console.log(value);
            }}
          />
        </Cell>

        <Cell title="设置默认值">
          <Slider defaultValue={20} />
        </Cell>

        <Cell title="设置上下限">
          <Slider min={-100} max={100} defaultValue={0} />
        </Cell>

        <Cell title="禁用状态">
          <Slider disabled defaultValue={20} />
        </Cell>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 刻度与标记
```jsx
import { Cell, Slider } from 'zarm';

const MARKS = {
  0: '0°C',
  26: '26°C',
  65: '65°C',
  100: '100°C',
}

ReactDOM.render(
  <>
    <Cell title="显示刻度">
      <Slider marks={MARKS} />
    </Cell>
    
    <Cell title="显示标记" style={{ paddingBottom: 15 }}>
      <Slider showMark marks={MARKS} />
    </Cell>
    
    <Cell title="步长为10" style={{ paddingBottom: 15 }}>
      <Slider showMark step={10} marks={MARKS} />
    </Cell>
    
    <Cell title="步长为null" style={{ paddingBottom: 15 }}>
      <Slider showMark step={null} marks={MARKS} />
    </Cell>
  </>
, mountNode);
```



## 方向
```jsx
import { Cell, Slider } from 'zarm';

const MARKS = {
  0: '0°C',
  26: '26°C',
  65: '65°C',
  100: '100°C',
}

ReactDOM.render(
  <Cell title="垂直方向" style={{ padding: '15px 0' }}>
    <div style={{ height: 200 }}>
      <Slider vertical showMark marks={MARKS} />
    </div>
  </Cell>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number | - | 值 |
| defaultValue | number | - | 初始值 |
| min | number | 0 | 最小值 |
| max | number | 100 | 最大值 |
| disabled | boolean | false | 是否禁用 |
| step | number | 1 | 步长 |
| vertical | boolean | false | 是否为纵向 |
| showMark | boolean | false | 是否显示标记刻度 |
| marks | { [key: number]: React.ReactNode } | {} | 自定义标记刻度的渲染展示 |
| onChange | (value?: number) => void | - | 值变化时触发的回调函数 |
