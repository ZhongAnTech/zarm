# useSelect

## 基本用法

```jsx
import { useSelect, Message, NoticeBar } from 'zarm';

const Demo = () => {
  const [value, setValue] = useSelect({
    multiple: true,
  });
  return (
    <>
      <fieldset>
        <legend>选择你最爱的运动</legend>
        <div>
          <input
            type="checkbox"
            id="football"
            name="football"
            onChange={(e) => setValue(e.target.value)}
            value="football"
          />
          <label for="football"> 足球</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="bassketball"
            name="bassketball"
            value="bassketball"
            onChange={(e) => setValue(e.target.value)}
          />
          <label for="bassketball"> 篮球</label>
        </div>
      </fieldset>
      <p>你选择了： {value.join('，')}</p>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

### UseSelectProps

| 属性         | 类型                                                  | 默认值    | 说明         |
| :----------- | :---------------------------------------------------- | :-------- | :----------- |
| defaultValue | number \| string \| Array<string \| number>           | undefined | 默认值       |
| value        | number \| string \| Array<string \| number>           | undefined | 值           |
| multiple     | boolean                                               | false     | 是否支持多选 |
| onChange     | (number \| string \| Array<string \| number>) => void | -         | 回调函数     |
