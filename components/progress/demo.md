# Progress 进度条



## 基本用法
```jsx
import { Progress, Cell, Select, Stepper, Input } from 'zarm';

class Demo extends React.Component {
  state = {
    percent: 10,
    theme: 'primary',
    strokeShape: 'round',
    strokeWidth: 5
  };

  render() {
    const { percent, theme, strokeShape, strokeWidth } = this.state;
    return (
      <>
        <div className="progress">
          <Progress
            shape="line"
            percent={percent}
            theme={theme}
            strokeShape={strokeShape}
            strokeWidth={strokeWidth}
          >
            {percent}%
          </Progress>
        </div>
        <div className="progress">
          <Progress
            shape="circle"
            percent={percent}
            theme={theme}
            strokeShape={strokeShape}
            strokeWidth={strokeWidth}
          >
            <div className="progress-content">
              <span className="progress-text">{percent}</span>
              <span className="progress-percent">%</span>
            </div>
          </Progress>
        </div>
        <div className="progress">
          <Progress
            shape="semi-circle"
            percent={percent}
            theme={theme}
            strokeShape={strokeShape}
            strokeWidth={strokeWidth}
          >
            <div className="progress-content">
              <span className="progress-text">{percent}</span>
              <span className="progress-percent">%</span>
            </div>
          </Progress>
        </div>

        <Cell title="进度">
          <Stepper
            step={10}
            min={0}
            max={100}
            value={percent}
            onChange={(value) => {
              if (Number.isNaN(Number(value))) return;
              this.setState({
                percent: value,
              });
            }}
          />
        </Cell>

        <Cell title="主题">
          <Select
            value={theme}
            dataSource={[
              { value: 'primary', label: 'primary' },
              { value: 'success', label: 'success' },
              { value: 'warning', label: 'warning' },
              { value: 'danger', label: 'danger' },
            ]}
            onOk={(selected) => {
              this.setState({
                theme: selected[0].value,
              });
            }}
          />
        </Cell>

        <Cell title="线条形状">
          <Select
            value={strokeShape}
            dataSource={[
              { value: 'round', label: 'round' },
              { value: 'rect', label: 'rect' },
            ]}
            onOk={(selected) => {
              this.setState({
                strokeShape: selected[0].value,
              });
            }}
          />
        </Cell>

        <Cell title="线条粗细">
          <input type="number" value={strokeWidth} onChange={(event) => this.setState({strokeWidth: event.target.value})} />
        </Cell>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | `primary` | 主题，可选值 `primary`, `success`, `warning`, `danger` |
| percent | number | 0 | 进度百分比（范围：0～100） |
| shape | string | `line` | 类型，可选值 `line`, `circle`, `semi-circle` |
| strokeShape | string | `round` | 线条形状，可选值 `round`, `rect` |
| size | string | `md` | 组件大小，可选值 `lg`, `md`, `sm`，number类型的值，或者任何合法的css宽度值 |
| strokeWidth | number | 8 | 线条粗细 |
| text | (percent: number) => string | `(percent) => percent + '%'` | 进度百分比的格式化函数，children会覆盖它 |
