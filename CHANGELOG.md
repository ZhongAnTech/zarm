# 版本更新日志  

## v1.0.8 
- Break Change
  - `Stepper`新增onInputChange属性，input默认将不触发onChange事件而触发onInputChange事件。([c6eb5de](https://github.com/ZhonganTechENG/zarm/commit/c6eb5de9a235942b612d3ea1abd90b62e41bbecf))

- Bug Fix
	- 修复`Input`为textarea多行文本时的defaultValue设置位置不正确。修复autoHeight功能在组件不可见转变为可见的情况下不更新的bug。([#60](https://github.com/ZhonganTechENG/zarm/pull/60))
  - 修复classnames依赖问题。（[#62](https://github.com/ZhonganTechENG/zarm/pull/62)）

