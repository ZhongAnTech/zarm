# 兼容性支持

Zarm 实现过程中，部分组件使用了较新的 API，这些 API 在低版本浏览器中可能会有兼容问题，导致运行代码逻辑执行失败或者报错。

本文档将公开 Zarm 中涉及到的兼容性不足的 API 的使用，帮助开发者根据项目实际场景选择是否需要添加相关的 polyfill。

## API 使用情况列表

| 使用到的 API                                                                                  | 涉及组件                                                                  | 引入方式                    | 最低兼容版本                                                               | 推荐的 polyfill                                                                    |
| :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ | :-------------------------- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) | `useInViewport`                                                           | 直接使用                    | [`Android 5` `iOS 12.2`](https://caniuse.com/?search=IntersectionObserver) | [intersection-observer](https://www.npmjs.com/package/intersection-observer)       |
| [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)             | `Picker` `PickerView` `Select` `DatePicker` `DatePickerView` `DateSelect` | 直接使用                    | [`Android 5` `iOS 13.4`](https://caniuse.com/?search=ResizeObserver)       | [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) |
| const                                                                                         | `BackTop` `Carousel` `Pull` `Rate` `Slider` `SwiperAction`                | `@use-gesture/react` 依赖项 | [`Android 5` `iOS 11`](https://caniuse.com/?search=const)                  | `babel`                                                                            |
| Arrow functions                                                                               | `BackTop` `Carousel` `Pull` `Rate` `Slider` `SwiperAction`                | `@use-gesture/react` 依赖项 | [`Android 5` `iOS 10`](https://caniuse.com/?search=Arrow%20functions)      | `babel`                                                                            |
