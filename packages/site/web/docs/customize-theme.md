# 定制主题

Zarm 的样式使用了 <a href="https://sass-lang.com" target="_blank">scss</a> 和 <a href="https://www.w3.org/Style/CSS/" target="_blank">css 变量</a> 相结合做为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，实现定制主题的能力。

Zarm 提供了一个 React 组件 [ConfigProvider](#/components/config-provider) 用于快速定制主题。

## 品牌标准色

目前的默认的品牌标准色是 `#00bc70`，如果需要使用其他颜色，可以参考下面的方案。

```jsx
return (
  <ConfigProvider primaryColor="#1890ff">
    <App />
  </ConfigProvider>
);
```

## 暗黑主题

除了目前提供的默认主题外，我们还提供了一套暗黑主题，可以参考下面的方案进行配置。

```jsx
return (
  <ConfigProvider theme="dark">
    <App />
  </ConfigProvider>
);
```

## 深度定制

可以通过修改 zarm 开放出来的 css 变量的方式深度定制你的样式。

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

以下是一些最常用的通用变量，所有样式变量可以在 <a href="https://github.com/ZhongAnTech/zarm/blob/master/packages/zarm/src/style/themes/default.scss" target="_blank">这里</a> 找到。

```scss
--theme-primary: #00bc70; // 全局主色
--theme-success: #00bc70; // 成功色
--theme-warning: #ec9231; // 警告色
--theme-danger: #ff5050; // 危险色
```
