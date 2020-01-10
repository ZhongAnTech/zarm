# Progress 进度条



## 基本用法
```jsx
import { Progress, Cell, Select, Radio, Stepper } from 'zarm';

class Demo extends React.Component {
  state = {
    percent: 10,
    theme: 'primary',
    strokeShape: 'round',
    strokeWidth: '',
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
          />
        </div>
        <div className="progress">
          <Progress
            shape="circle"
            percent={percent}
            theme={theme}
            strokeShape={strokeShape}
            strokeWidth={strokeWidth}
            text={(percent) => (
              <div className="progress-content">
                <span className="progress-text">{percent}</span>
                <span className="progress-percent">%</span>
              </div>
            )}
          />
        </div>
        <div className="progress">
          <Progress
            shape="semi-circle"
            percent={percent}
            theme={theme}
            strokeShape={strokeShape}
            strokeWidth={strokeWidth}
            text={(percent) => (
              <div className="progress-content">
                <span className="progress-text">{percent}</span>
                <span className="progress-percent">%</span>
              </div>
            )}
          />
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
          <Radio.Group
            compact
            type="button"
            value={strokeShape}
            onChange={(value) => {
              this.setState({
                strokeShape: value,
              });
            }}>
            <Radio value="round">round</Radio>
            <Radio value="rect">rect</Radio>
          </Radio.Group>
        </Cell>

        <Cell title="线条粗细">
          <Stepper
            step={1}
            min={0}
            value={strokeWidth}
            onChange={(value) => {
              if (Number.isNaN(Number(value))) return;
              this.setState({
                strokeWidth: value,
              });
            }}
          />
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
| theme | string | 'primary' | 主题，可选值 `primary`, `success`, `warning`, `danger` |
| size | string | 'md' | 大小，可选值 `lg`, `md`, `sm`，number类型的值，或者任何合法的css宽度值 |
| shape | string | 'line' | 形状，可选值 `line`, `circle`, `semi-circle` |
| percent | number | 0 | 进度百分比（范围：0～100） |
| text | (percent?: number) => ReactNode | (percent) => \`${percent}%\` | 进度文本显示 |
| strokeShape | string | 'round' | 线条形状，可选值 `round`, `rect` |
| strokeWidth | number | - | 线条粗细，单位: px，不设置则根据大小自动调整 |
