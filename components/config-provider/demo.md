# ConfigProvider 全局配置



## 基本用法
```jsx
import { useState } from 'react';
import { Cell, ConfigProvider, Button, SearchBar, Modal, Keyboard, Radio } from 'zarm';
import enUS from 'zarm/config-provider/locale/en_US';
import zhCN from 'zarm/config-provider/locale/zh_CN';

const Demo = () => {
  const [lang, setLang] = useState(GlobalContext.lang);
  const [theme, setTheme] = useState(GlobalContext.theme);
  const [primary, setPrimary] = useState(GlobalContext.primary);

  const locale = lang === 'enUS' ? enUS : zhCN;

  const show = (key) => {
    if (key === 'alert') {
      Modal.alert({
        title: '警告',
        content: '这里是警告信息',
        shape: 'radius'
      });
    } else {
      Modal.confirm({
        title: '确认信息',
        content: '你确定要这样做吗？',
        shape: 'radius'
      })
    }
  };

  return (
    <ConfigProvider locale={locale} primary={primary} theme={theme}>
      <>
        <Cell
          title="切换语言"
          description={
            <Radio.Group
              compact
              type="button"
              value={lang}
              onChange={setLang}
            >
              <Radio value="zhCN">中文</Radio>
              <Radio value="enUS">EN</Radio>
            </Radio.Group>
          }
        />

        <Cell
          title="切换品牌色"
          description={
            <ul className="colors">
              {
                ['#00bc70', '#1890ff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'].map((color, index) => {
                  return (
                    <li
                      key={+index}
                      style={{ backgroundColor: color }}
                      onClick={() => setPrimary(color)}
                    />
                  );
                })
              }
            </ul>
          }
        />

        <Cell
          title="切换主题"
          description={
            <Radio.Group
              compact
              type="button"
              value={theme}
              onChange={(value) => setTheme(value)}
            >
              <Radio value="light">默认主题</Radio>
              <Radio value="dark">暗黑主题</Radio>
            </Radio.Group>
          }
        />

        <SearchBar />
        <Keyboard />

        <Cell
          description={
            <Button size="xs" onClick={() => show('alert')}>开启</Button>
          }
        >
          警告框
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => show('confirm')}>开启</Button>
          }
        >
          确认框
        </Cell>
      </>
    </ConfigProvider>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| locale | Object | - | 语言包配置，默认为中文，语言包可到 zarm/lib/locale-provider/locale 目录下寻找 |
