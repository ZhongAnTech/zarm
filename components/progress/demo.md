# 进度条 Progress



## 基本用法
```jsx
import { Progress, Cell, Select, Stepper } from 'zarm';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 10,
      theme: 'primary',
      shape: 'round',
      weight: 'normal'
    };
  }

  render() {
    const { percent, theme, shape, weight } = this.state;

    return (
      <div>
        <div className="progress">
          <Progress
            percent={percent}
            theme={theme}
            shape={shape}
            weight={weight}
          >
            {percent}%
          </Progress>
        </div>
        <div className="progress">
          <Progress
            type="circle"
            percent={percent}
            theme={theme}
            shape={shape}
            weight={weight}
          >
            <div className="progress-content">
              <span className="progress-text">{percent}</span>
              <span className="progress-percent">%</span>
            </div>
          </Progress>
        </div>
        <div className="progress">
          <Progress
            type="semi-circle"
            percent={percent}
            theme={theme}
            shape={shape}
            weight={weight}
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
            value={shape}
            dataSource={[
              { value: 'round', label: 'round' },
              { value: 'rect', label: 'rect' },
            ]}
            onOk={(selected) => {
              this.setState({
                shape: selected[0].value,
              });
            }}
          />
        </Cell>

        <Cell title="线条粗细">
          <Select
            value={weight}
            dataSource={[
              { value: 'normal', label: 'normal' },
              { value: 'thin', label: 'thin' },
            ]}
            onOk={(selected) => {
              this.setState({
                weight: selected[0].value,
              });
            }}
          />
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
| theme | string | 'primary' | 主题，可选值 `default`, `primary`, `success`, `warning`, `danger` |
| percent | number | 0 | 进度百分比（范围：0～100） |
| type | string | 'line' | 类型，可选值 `line`, `circle`, `semi-circle` |
| shape | string | 'round' | 线条形状，可选值 `round`, `rect` |
| weight | string | 'normal' | 线条粗细，可选值 `normal`, `thin` |
