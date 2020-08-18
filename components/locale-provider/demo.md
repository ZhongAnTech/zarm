# LocaleProvider 国际化



## 基本用法
```jsx
import { useState } from 'react';
import { Cell, LocaleProvider, Button, SearchBar, Modal, Keyboard, Radio } from 'zarm';

const locales = {
  'en_US': {
    locale: 'en-US',
    SearchBar: {
      placeholder: 'Search',
      cancelText: 'Cancel',
    },
    Alert: {
      cancelText: 'Close',
    },
    Confirm: {
      cancelText: 'Cancel',
      okText: 'OK',
    },
    Select: {
      placeholder: 'please select',
    },
    Picker: {
      cancelText: 'Cancel',
      okText: 'OK',
      title: 'please select',
    },
    Keyboard: {
      okText: 'OK',
    },
  },
  'zh_CN': {
    locale: 'zh-CN',
    SearchBar: {
      placeholder: '搜索',
      cancelText: '取消',
    },
    Alert: {
      cancelText: '关闭',
    },
    Confirm: {
      cancelText: '取消',
      okText: '确定',
    },
    Select: {
      placeholder: '请选择',
    },
    Picker: {
      cancelText: '取消',
      okText: '确定',
      title: '请选择',
    },
    Keyboard: {
      okText: '确定',
    },
  },
};

const Demo = () => {
  const [lang, setLang] = useState('zh_CN');

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
    <LocaleProvider locale={locales[lang]}>
      <>
        <Cell
          title="切换语言包"
          description={
            <Radio.Group
              compact
              type="button"
              value={lang}
              onChange={setLang}
            >
              <Radio value="zh_CN">中文</Radio>
              <Radio value="en_US">EN</Radio>
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
          警告框 Alert
        </Cell>

        <Cell
          description={
            <Button size="xs" onClick={() => show('confirm')}>开启</Button>
          }
        >
          确认框 Confirm
        </Cell>
      </>
    </LocaleProvider>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| locale | Object | - | 语言包配置，默认为中文，语言包可到 zarm/lib/locale-provider/locale 目录下寻找 |
