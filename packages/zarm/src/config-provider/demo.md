# ConfigProvider 全局配置

## 基本用法

```jsx
import { useState, useRef } from 'react';
import {
  ConfigProvider,
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
import enUS from 'zarm/lib/config-provider/locale/en_US';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

const TabIcon = Icon.createFromIconfont(
  '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
);

const colors = ['#00bc70', '#1890ff', '#f5222d', '#fa541b', '#13c2c2', '#2f54ec', '#712fd1'];

const Demo = () => {
  const containerRef = useRef();
  const [visiblePopup, setVisiblePopup] = useState(false);

  const [locale, setLocale] = useState(localStorage.locale || 'zhCN');
  const [primaryColor, setPrimaryColor] = useState(localStorage.primaryColor || colors[0]);
  const [theme, setTheme] = useState(localStorage.theme || 'light');
  const [safeIphoneX, setSafeIphoneX] = useState(false);
  const [mountContainer, setMountContainer] = useState(false);
  const [cssVars, setCssVars] = useState(null);

  return (
    <>
      <List>
        <List.Item
          title="切换语言"
          suffix={
            <Radio.Group compact type="button" value={locale} onChange={setLocale}>
              <Radio value="zhCN">中文</Radio>
              <Radio value="enUS">EN</Radio>
            </Radio.Group>
          }
        />
        <List.Item
          title="切换品牌色"
          suffix={
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
          suffix={
            <Radio.Group compact type="button" value={theme} onChange={(value) => setTheme(value)}>
              <Radio value="light">默认主题</Radio>
              <Radio value="dark">暗黑主题</Radio>
            </Radio.Group>
          }
        />
        <List.Item
          title="安全区域开启"
          suffix={<Switch checked={safeIphoneX} onChange={setSafeIphoneX} />}
        />
        <List.Item
          title="自定义弹层渲染节点"
          suffix={<Switch checked={mountContainer} onChange={setMountContainer} />}
        />
        <List.Item
          title="设置 CSS 变量"
          suffix={
            <Button
              size="xs"
              onClick={() => {
                setCssVars(
                  cssVars
                    ? null
                    : {
                        '--za-theme-primary': '#ff0000',
                        '--za-rate-active-color': '#fa541b',
                      },
                );
              }}
            >
              {cssVars ? '还原' : '设置'}
            </Button>
          }
        />
      </List>

      <Message theme="warning">以下为组件示例</Message>

      <ConfigProvider
        locale={locale === 'enUS' ? enUS : zhCN}
        primaryColor={primaryColor}
        theme={theme}
        safeIphoneX={safeIphoneX}
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
              suffix={
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
              suffix={
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
            <TabBar.Item itemKey="home" title="首页" icon={<TabIcon type="home" />} />
            <TabBar.Item
              itemKey="found"
              title="项目"
              icon={<TabIcon type="menu" />}
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
      </ConfigProvider>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性            | 类型            | 默认值              | 说明                                                                                                                                |
| :-------------- | :-------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| prefix          | string          | 'za'                | 组件类名前缀                                                                                                                        |
| locale          | Object          | -                   | 语言包配置，默认为中文，语言包可到 [zarm/lib/config-provider/locale](https://unpkg.com/zarm/lib/config-provider/locale/) 目录下寻找 |
| theme           | string          | 'light'             | 主题模式，'light' 为光明主题，'dark' 为暗黑主题的切换                                                                               |
| primaryColor    | string          | '#00bc70'           | 品牌标准色                                                                                                                          |
| safeIphoneX     | boolean         | false               | 是否适配 iphoneX 刘海屏                                                                                                             |
| mountContainer  | MountContainer  | () => document.body | 弹层组件渲染节点                                                                                                                    |
| scrollContainer | ScrollContainer | () => window        | 组件滚动监听容器点                                                                                                                  |
| cssVars         | Object          | {}                  | 组件 CSS 变量设置                                                                                                                   |

### MountContainer

```ts
type MountContainer = HTMLElement | (() => HTMLElement) | undefined | null | false;
```

### ScrollContainer

```ts
type ScrollContainer = (HTMLElement | Window) | (() => HTMLElement | Window) | undefined | null;
```
