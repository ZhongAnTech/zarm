# ConfigProvider 全局配置

## 基本用法

```jsx
import { useState, useRef } from 'react';
import {
  NConfigProvider,
  List,
  Button,
  Modal,
  Keyboard,
  Radio,
  Message,
  TabBar,
  Icon,
  Popup,
  Rate,
  Switch,
  SearchBar,
} from 'zarm';
import enUS from 'zarm/lib/n-config-provider/locale/en_US';
import zhCN from 'zarm/lib/n-config-provider/locale/zh_CN';

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

const colors = ['#00bc70', '#1890ff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'];

const Demo = () => {
  const containerRef = useRef();
  const [visiblePopup, setVisiblePopup] = useState(false);

  const [locale, setLocale] = useState(localStorage.locale || 'zhCN');
  const [theme, setTheme] = useState(localStorage.theme || 'light');
  const [primaryColor, setPrimaryColor] = useState(localStorage.primaryColor || colors[0]);
  const [cssVars, setCssVars] = useState();
  const [safeIphoneX, setSafeIphoneX] = useState(false);
  const [mountContainer, setMountContainer] = useState(false);

  return (
    <>
      <List>
        <List.Item
          title="切换语言"
          after={
            <Radio.Group buttonCompact type="button" value={locale} onChange={setLocale}>
              <Radio value="zhCN">中文</Radio>
              <Radio value="enUS">EN</Radio>
            </Radio.Group>
          }
        />
        <List.Item
          title="切换品牌色"
          after={
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
        <List.Item
          title="切换主题"
          after={
            <Radio.Group
              buttonCompact
              type="button"
              value={theme}
              onChange={(value) => setTheme(value)}
            >
              <Radio value="light">默认主题</Radio>
              <Radio value="dark">暗黑主题</Radio>
            </Radio.Group>
          }
        />
        <List.Item
          title="设置 CSS 变量"
          after={
            <Button
              size="xs"
              onClick={() => {
                setCssVars(
                  cssVars
                    ? null
                    : {
                        '--za-button-primary-color': '#ff0000',
                        '--za-rate-color': '#ffd21e',
                      },
                );
              }}
            >
              {cssVars ? '还原' : '设置'}
            </Button>
          }
        />
        <List.Item
          title="安全区域开启"
          after={<Switch checked={safeIphoneX} onChange={setSafeIphoneX} />}
        />
        <List.Item
          title="自定义弹层渲染节点"
          after={<Switch checked={mountContainer} onChange={setMountContainer} />}
        />
      </List>

      <Message theme="warning">以下为组件示例</Message>

      <NConfigProvider
        safeIphoneX={safeIphoneX}
        locale={locale === 'enUS' ? enUS : zhCN}
        primaryColor={primaryColor}
        theme={theme}
        cssVars={cssVars}
        mountContainer={!mountContainer ? document.body : containerRef.current}
      >
        <div>
          <SearchBar />
          <List>
            <List.Item title={<Switch defaultChecked />} />
            <List.Item title={<Rate defaultValue={3} />} />
            <List.Item
              title="确认框"
              after={
                <Button
                  size="xs"
                  onClick={() => {
                    Modal.confirm({
                      title: '确认信息',
                      content: '你确定要这样做吗？',
                      shape: 'radius',
                    });
                  }}
                >
                  开启
                </Button>
              }
            />
            <List.Item
              title="弹出层"
              after={
                <Button size="xs" onClick={() => setVisiblePopup(true)}>
                  开启
                </Button>
              }
            />
          </List>

          <Popup
            visible={visiblePopup}
            direction="bottom"
            onMaskClick={() => setVisiblePopup(false)}
            afterOpen={() => console.log('打开')}
            afterClose={() => console.log('关闭')}
          >
            <div className="popup-box">内容</div>
          </Popup>

          <TabBar defaultActiveKey="home">
            <TabBar.Item itemKey="home" title="主页" icon={<TabIcon type="home" />} />
            <TabBar.Item
              itemKey="found"
              title="保险"
              icon={<TabIcon type="insurance" />}
              badge={{ shape: 'circle', text: '3' }}
            />
            <TabBar.Item
              itemKey="me"
              title="我的"
              icon={<TabIcon type="user" />}
              badge={{ shape: 'dot' }}
            />
          </TabBar>

          <Button block theme="primary">
            Button
          </Button>

          <div ref={containerRef} />
        </div>
      </NConfigProvider>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型    | 默认值    | 说明                                                                                                                                |
| :----------- | :------ | :-------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| locale       | Object  | -         | 语言包配置，默认为中文，语言包可到 [zarm/lib/config-provider/locale](https://unpkg.com/zarm/lib/config-provider/locale/) 目录下寻找 |
| theme        | string  | 'light'   | 主题模式，'light' 为光明主题，'dark' 为暗黑主题的切换                                                                               |
| primaryColor | string  | '#00bc70' | 品牌标准色                                                                                                                          |
| safeIphoneX  | boolean | false     | 是否适配 iphoneX 刘海屏                                                                                                             |
