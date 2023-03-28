# 兼容性支持

Zarm 实现过程中，如 useInViewport 组件使用了 `IntersectionObserver`、Picker 组件使用了 `Observer` 等 API，这些 API 在低版本浏览器中可能会有兼容问题，导致运行代码逻辑执行失败或者报错。

本文档将公开 Zarm 中涉及到的兼容性不足的API的使用，帮助开发者根据实际项目场景添加相关的 polyfill。

## API 使用情况列表

| 组件     | 功能描述 | 使用到的 API | 兼容性                             |
| :------- | :----- | :----- | :------------------------------- |
| useInViewport  | 自动监听元素是否可见 | IntersectionObserver | `Android 5-6.x` `iOS 12.2-16.3` |
