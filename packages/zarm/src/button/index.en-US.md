---
category: Components
title: Button
group:
  title: Feedback
---

## demos

<code src="./demo/demo1.tsx"></code>

<code src="./demo/demo2.tsx"></code>

<code src="./demo/demo3.tsx"></code>

## API

| 属性     | 类型                             | 默认值    | 说明                                                                             |
| :------- | :------------------------------- | :-------- | :------------------------------------------------------------------------------- |
| theme    | string                           | 'default' | 按钮主题，可选值为 `default` `primary` `danger`                                  |
| size     | string                           | 'md'      | 按钮大小，可选值为 `md` `lg` `sm` `xs`                                           |
| shape    | string                           | 'radius'  | 按钮形状，可选值为 `rect` `radius` `round` `circle`                              |
| block    | boolean                          | false     | 是否块级元素                                                                     |
| ghost    | boolean                          | false     | 是否幽灵按钮                                                                     |
| shadow   | boolean                          | false     | 是否带阴影                                                                       |
| disabled | boolean                          | false     | 是否禁用                                                                         |
| loading  | boolean                          | false     | 是否加载中状态                                                                   |
| icon     | ReactNode                        | -         | 设置图标                                                                         |
| onClick  | MouseEventHandler&lt;Element&gt; | -         | 点击后触发的回调函数                                                             |
| htmlType | string                           | 'button'  | 设置原生 button 的 `type` 值，可选值为 `button` `submit` `reset`                 |
| href     | string                           | -         | 点击跳转的地址，指定此属性 `button` 的行为和 a 标签一致                          |
| target   | string                           | -         | 规定在何处打开链接文档，相当于 a 标签的 `target` 属性，`href` 属性存在时生效     |
| mimeType | string                           | -         | 链接中指向的文档的 mime 类型，相当于 a 标签的 `type` 属性，`href` 属性存在时生效 |

## CSS 变量

| 属性                   | 默认值                                  | 说明                 |
| :--------------------- | :-------------------------------------- | :------------------- |
| --height               | 'var(--za-height-md)'                   | 高度                 |
| --border-radius        | 0                                       | 圆角大小             |
| --border-width         | '1PX'                                   | 边框粗细             |
| --padding-horizontal   | 'var(--za-padding-h-md)'                | 内部横向边距         |
| --font-size            | 'var(--za-font-size-md)'                | 字体大小             |
| --icon-size            | '22px'                                  | 图标大小             |
| --background           | '#fff'                                  | 背景色               |
| --border-color         | 'var(--za-theme-default)'               | 边框颜色             |
| --text-color           | 'var(--za-color-text)'                  | 字体颜色             |
| --loading-color        | 'var(--za-theme-primary)'               | 加载状态图标颜色     |
| --active-background    | '#e6e6e6'                               | 激活状态背景色       |
| --active-border-color  | '#e6e6e6'                               | 激活状态边框色       |
| --active-text-color    | 'var(--za-color-text)'                  | 激活状态字体颜色     |
| --active-loading-color | 'var(--za-theme-primary-dark)'          | 激活加载状态图标颜色 |
| --shadow               | '0 3px 3px 0 rgba(230, 230, 230, 0.3))' | 阴影样式             |
