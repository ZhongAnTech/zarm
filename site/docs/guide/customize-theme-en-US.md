---
category: Guide
title: Customizing theme
group:
  title: Guides
---

Zarm 的样式使用了 <a href="https://sass-lang.com" target="_blank">scss</a> 和 <a href="https://www.w3.org/Style/CSS/" target="_blank">css 变量</a> 相结合做为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，实现定制主题的能力。

Zarm 提供了一个 React 组件 [ConfigProvider](#/components/config-provider) 用于快速定制主题。

## 品牌标准色

目前的默认的品牌标准色是 `#00bc70`，如果需要使用其他颜色，可以参考下面的方案。

```tsx | pure
<ConfigProvider primaryColor="#1890ff">
  <App />
</ConfigProvider>
```

## 暗黑主题

除了目前提供的默认主题外，我们还提供了一套暗黑主题，可以参考下面的方案进行配置。

```tsx | pure
<ConfigProvider theme="dark">
  <App />
</ConfigProvider>
```

## 深度定制

可以通过修改 zarm 开放出来的 css 变量的方式深度定制你的样式。

```tsx | pure
<ConfigProvider
  cssVars={{
    '--za-theme-primary': '#ff0000',
    '--za-rate-active-color': '#fa541b',
  }}
>
  <App />
</ConfigProvider>
```

通用变量可以在 <a href="https://github.com/ZhongAnTech/zarm/blob/master/packages/zarm/src/style/themes/default.scss" target="_blank">这里</a> 找到，组件级别的变量可在对应组件文档中查找。
