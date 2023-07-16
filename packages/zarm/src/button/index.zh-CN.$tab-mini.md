---
category: 组件
title: 小程序
group:
  title: 操作反馈
---

## 基本用法

<code src="./demo/basic.mini.tsx"></code>

## 块级按钮

<code src="./demo/block.mini.tsx"></code>

## API

| 属性     | 类型                             | 默认值    | 说明                                                             |
| :------- | :------------------------------- | :-------- | :--------------------------------------------------------------- |
| theme    | string                           | 'default' | 按钮主题，可选值为 `default` `primary` `danger`                  |
| size     | string                           | 'md'      | 按钮大小，可选值为 `md` `lg` `sm` `xs`                           |
| shape    | string                           | 'radius'  | 按钮形状，可选值为 `rect` `radius` `round` `circle`              |
| block    | boolean                          | false     | 是否块级元素                                                     |
| ghost    | boolean                          | false     | 是否幽灵按钮                                                     |
| plain    | boolean                          | false     | 是否幽灵按钮(限小程序)                                           |
| shadow   | boolean                          | false     | 是否带阴影                                                       |
| disabled | boolean                          | false     | 是否禁用                                                         |
| loading  | boolean                          | false     | 是否加载中状态                                                   |
| icon     | ReactNode                        | -         | 设置图标                                                         |
| onClick  | MouseEventHandler&lt;Element&gt; | -         | 点击后触发的回调函数                                             |
| htmlType | string                           | 'button'  | 设置原生 button 的 `type` 值，可选值为 `button` `submit` `reset` |

[更多属性](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
