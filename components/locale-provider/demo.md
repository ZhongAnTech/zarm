# LocaleProvider 国际化



## 基本用法
```jsx
import { Cell, LocaleProvider, Button, SearchBar, Modal, Select } from 'zarm';

const locales = {
  'en_US': {
    locale: 'en',
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
    }
  },
  'zh_CN': {
    locale: 'zh_cn',
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
    }
  },
};

class Demo extends React.Component {
  state = {
    locale: 'zh_CN',
  };

  show = (key) => {
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
  }

  onOk = (selected) => {
    this.setState({
      locale: selected[0].value,
    });
  }

  render() {
    return (
      <LocaleProvider locale={locales[this.state.locale]}>
        <div>
          <Cell title="切换语言包">
            <Select
              value={this.state.locale}
              dataSource={[
                { value: 'zh_CN', label: '中文' },
                { value: 'en_US', label: 'English' },
              ]}
              onOk={this.onOk}
            />
          </Cell>

          <SearchBar />

          <Cell
            description={
              <Button size="xs" onClick={() => this.show('alert')}>开启</Button>
            }
          >
            警告框 Alert
          </Cell>

          <Cell
            description={
              <Button size="xs" onClick={() => this.show('confirm')}>开启</Button>
            }
          >
            确认框 Confirm
          </Cell>
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
| locale | Object | - | 语言包配置，默认为中文，语言包可到 zarm/lib/locale-provider/locale 目录下寻找 |
