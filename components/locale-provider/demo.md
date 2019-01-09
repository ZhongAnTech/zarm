# 国际化 LocaleProvider



## 基本用法
```jsx
import { Cell, LocaleProvider, Button, SearchBar, Confirm, Select } from 'zarm';

const locales = {
  en: {
    locale: 'en',
    Confirm: {
      cancelText: 'Cancel',
      okText: 'Ok',
    },
    SearchBar: {
      placeholder: 'Search',
      cancelText: 'Cancel',
    },
  },
  'zh-cn': {
    locale: 'zh_cn',
    Confirm: {
      cancelText: '取消',
      okText: '确定',
    },
    SearchBar: {
      placeholder: '搜索',
      cancelText: '取消',
    },
  },
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: 'en',
    };
    this.onOk = this.onOk.bind(this);
  }

  onOk(selected) {
    this.setState({
      locale: selected[0].value,
    });
  }

  render() {
    return (
      <LocaleProvider locale={locales[this.state.locale]}>
        <div>
          <Cell title="语种">
            <Select
              value={this.state.locale}
              dataSource={[
                { value: 'en', label: 'English' },
                { value: 'zh-cn', label: '中文' },
              ]}
              onOk={this.onOk}
            />
          </Cell>
          <SearchBar />
        </div>
      </LocaleProvider>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| locale | Object | - | 语言包配置，语言包可到 zarm/lib/locale-provider/locale 目录下寻找 |
