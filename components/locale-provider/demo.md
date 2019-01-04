# 国际化 LocaleProvider



## 基本用法
```jsx
import { Cell, LocaleProvider, Button, Confirm, Select } from 'zarm';

const locales = {
  en: {
    locale: 'en',
    Confirm: {
      cancelText: 'Cancel',
      okText: 'Ok',
    }
  },
  'zh-cn': {
    locale: 'zh_cn',
    Confirm: {
      cancelText: '取消',
      okText: '确定',
    }
  },
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      locale: 'en',
    };
    this.onOk = this.onOk.bind(this);
  }

  onOk(selected) {
    this.setState({
      locale: selected[0].value,
    });
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
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
          <Cell
            title="确认框"
            description={
              <Button size="xs" onClick={() => this.toggle()}>开启</Button>
            }
          />
          <Confirm
            shape="radius"
            visible={this.state.visible}
            title="确认信息"
            message="你确定要这样做吗？"
            onOk={() => window.alert('click ok')}
            onCancel={() => this.toggle()}
          />
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
