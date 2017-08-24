# 版本更新日志  

## v1.0.12
- Bug Fix  
  - 修复`SwipeAction`组件上下滑动时影响了页面scroll滚动的bug。（[#69](https://github.com/ZhonganTechENG/zarm/pull/67)）
  - 修复`Input`组件计算输入字数长度产生性能问题的bug。([f385e48](https://github.com/ZhonganTechENG/zarm/commit/d22c652ef25e63accba306a0d3a58117616a1351))
  - 修复`Input`组件showLength为true时初始长度未计算的bug。（[c0c5c7f](https://github.com/ZhonganTechENG/zarm/commit/64e3bc308fac9347c9d87e4bc47f843e649f9c19)）
    
## v1.0.11
- Feature  
  - `Checkbox`新增属性id，并调整文字的显示样式。（[4149c01](https://github.com/ZhonganTechENG/zarm/commit/b7135ade392d6edfeb70f90b42ee056d0d969dde)）
  - `Tab`新增canSwipe属性，支持左右滑动切换。`Swipe`新增showPagination属性，用于是否显示圆点分页。([406c0b4](https://github.com/ZhonganTechENG/zarm/commit/168ea1944917211614603f0691b5f79337b8ad17))
  - `Message`新增属性icon，用于设置图标。新增hasArrow、onClick属性，用于显示箭头并支持点击事件。新增hasClosable属性，用于关闭消息。
  - 新增`NoticeBar`组件。

-  Improve && Enhancement  
  - `Swipe`体验优化。循环轮播返回到第一个item时pagination位置更新在动画结束前就执行。（[8270305](https://github.com/ZhonganTechENG/zarm/commit/3d8de9671d8d633bd729d4f28ce17d1e1fd4b512)）

## v1.0.10
- Bug Fix
  - 修复`Picker`dataSource属性改变不能更新的bug。（[#67](https://github.com/ZhonganTechENG/zarm/pull/67)）

- Feature
  - `Picker`新增支持displayRender和displayAddon属性（[#67](https://github.com/ZhonganTechENG/zarm/pull/67)）

## v1.0.9
- Bug Fix
  - 修复`Radio`和`Checkbox`作为非受控组件时，默认值属性`defaultValue`和`defaultChecked`不生效的bug。（[5d67171](https://github.com/ZhonganTechENG/zarm/commit/02cf971669be6226fb7e148b13512fdc56832d78)）

## v1.0.8 
- Break Change
  - `Stepper`新增onInputChange属性，input默认将不触发onChange事件而触发onInputChange事件。([c6eb5de](https://github.com/ZhonganTechENG/zarm/commit/c6eb5de9a235942b612d3ea1abd90b62e41bbecf))

- Bug Fix
	- 修复`Input`为textarea多行文本时的defaultValue设置位置不正确。修复autoHeight功能在组件不可见转变为可见的情况下不更新的bug。([#60](https://github.com/ZhonganTechENG/zarm/pull/60))
  - 修复classnames依赖问题。（[#62](https://github.com/ZhonganTechENG/zarm/pull/62)）

