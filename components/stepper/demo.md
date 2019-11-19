# Stepper 步进器



## 基本用法
```jsx
import { Cell, Stepper } from 'zarm';

class Demo extends React.Component {
  state = {
    value: 1,
  };

  render() {
    return (
      <>
        <Cell
          title="普通"
          description={
            <Stepper
              value={this.state.value}
              onInputChange={(value) => {
                console.log('onInputChange:', value);
              }}
              onChange={(value) => {
                this.setState({
                  value,
                })
                console.log('onChange:', value);
              }}
            />
          }
        />

        <Cell
          title="设置默认值"
          description={
            <Stepper defaultValue={2} />
          }
        />

        <Cell
          title="设置上下限（-3 ~ 3）"
          description={
            <Stepper min={-3} max={3} />
          }
        />

        <Cell
          title="设置步长"
          description={
            <Stepper step={5} />
          }
        />

        <Cell
          title="禁用状态"
          description={
            <Stepper disabled />
          }
        />
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 多形状
```jsx
import { Cell, Stepper } from 'zarm';

ReactDOM.render(
  <>
    <Cell
      title="直角"
      description={
        <Stepper shape="rect" />
      }
    />

    <Cell
      title="圆形"
      description={
        <Stepper shape="circle" />
      }
    />
  </>
, mountNode);
```



## 多尺寸
```jsx
import { Cell, Stepper } from 'zarm';

ReactDOM.render(
  <Cell
    title="大号"
    description={
      <Stepper size="lg" />
    }
  />
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| shape | string | 'radius' | 形状，可选值 `rect`, `radius`, `circle` |
| size | string | 'md' | 大小，可选值 `md`、`lg` |
| value | number | - | 值 |
| defaultValue | number | - | 初始值 |
| min | number | - | 最小值 |
| max | number | - | 最大值 |
| step | number | 1 | 步长 |
| disabled | boolean | false | 是否禁用 |
| onInputChange | (value?: number) => void | - | 输入值变化时触发的回调函数 |
| onChange | (value?: number) => void | - | 值变化时触发的回调函数 |
