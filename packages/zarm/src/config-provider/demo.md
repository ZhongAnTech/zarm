# ConfigProvider 全局配置

## 基本用法

```jsx
import { useState } from 'react';
import { ConfigProvider, Cell, Button, SearchBar, Modal, Keyboard, Radio, Message } from 'zarm';
import enUS from 'zarm/lib/config-provider/locale/en_US';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

const colors = ['#00bc70', '#1890ff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'];

const Demo = () => {
  const [locale, setLocale] = useState(localStorage.locale || 'zhCN');
  const [theme, setTheme] = useState(localStorage.theme || 'light');
  const [primaryColor, setPrimaryColor] = useState(localStorage.primaryColor || colors[0]);

  const show = (key) => {
    if (key === 'alert') {
      Modal.alert({
        title: '警告',
        content: '这里是警告信息',
        shape: 'radius',
      });
    } else {
      Modal.confirm({
        title: '确认信息',
        content: '你确定要这样做吗？',
        shape: 'radius',
      });
    }
  };

  return (
    <>
      <Cell
        title="切换语言"
        description={
          <Radio.Group compact type="button" value={locale} onChange={setLocale}>
            <Radio value="zhCN">中文</Radio>
            <Radio value="enUS">EN</Radio>
          </Radio.Group>
        }
      />

      <Cell
        title="切换品牌色"
        description={
          <ul className="colors">
            {colors.map((color, index) => {
              return (
                <li
                  key={+index}
                  style={{ backgroundColor: color }}
                  onClick={() => setPrimaryColor(color)}
                />
              );
            })}
          </ul>
        }
      />

      <Cell
        title="切换主题"
        description={
          <Radio.Group compact type="button" value={theme} onChange={(value) => setTheme(value)}>
            <Radio value="light">默认主题</Radio>
            <Radio value="dark">暗黑主题</Radio>
          </Radio.Group>
        }
      />

      <Message theme="warning">以下为组件示例</Message>

      <ConfigProvider
        locale={locale === 'enUS' ? enUS : zhCN}
        primaryColor={primaryColor}
        theme={theme}
      >
        <>
          <SearchBar />
          <Keyboard />

          <Cell
            description={
              <Button size="xs" onClick={() => show('alert')}>
                开启
              </Button>
            }
          >
            警告框
          </Cell>

          <Cell
            description={
              <Button size="xs" onClick={() => show('confirm')}>
                开启
              </Button>
            }
          >
            确认框
          </Cell>
        </>
      </ConfigProvider>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型              | 默认值    | 说明                                                                                                                                |
| :----------- | :---------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| locale       | Object            | -         | 语言包配置，默认为中文，语言包可到 [zarm/lib/config-provider/locale](https://unpkg.com/zarm/lib/config-provider/locale/) 目录下寻找 |
| theme        | 'light' \| 'dark' | 'light'   | 主题模式，光亮主题 和 暗黑主题的切换                                                                                                |
| primaryColor | string            | '#00bc70' | 品牌标准色                                                                                                                          |
