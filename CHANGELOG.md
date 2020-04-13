# 版本更新日志 

## v2.1.0
- Feature
  - [Popper] 优化气泡层动画，增加菜单拉伸 `menuSlide` 动画。[#400](https://github.com/ZhongAnTech/zarm/pull/400)
  - [Select] 支持数字和布尔值类型的值。[#418](https://github.com/ZhongAnTech/zarm/pull/418)

- Break Change
  - [Checkbox, Radio] 调整禁用状态下的样式，变更为浅灰色背景框，深灰色勾选。[ed04500](https://github.com/ZhongAnTech/zarm/commit/ed04500a1199394e979fc86663932f0281ce2662)
  - [NoticeBar] 删除`scrollable`属性，内容宽度超过NoticeBar的宽度会默认支持自动滚动，否则为固定展示。[#420](https://github.com/ZhongAnTech/zarm/pull/420)

- Bug Fix
  - [Input] 修复多行文本修改 `readonly` 属性导致组件崩溃的bug。[#407](https://github.com/ZhongAnTech/zarm/pull/407)
  - [Input] 修复多行文本直接通过 `value` 属性修改值时, 字数不会重新计算的bug。[510deb6](https://github.com/ZhongAnTech/zarm/commit/510deb68ed1d4955f86cec254474f08c061ae59a)
  - [Input] 修复禁用状态下，手机端无法显示值的bug。[593b974](https://github.com/ZhongAnTech/zarm/commit/593b974b5665acda02685756def9d43b972f8602)
  - [Input] 修复数字、金额输入框，值为number类型时无法删除的bug。[#428](https://github.com/ZhongAnTech/zarm/pull/428)
  - [Pull] 修复获取滚动容器节点的计算在某些场景下不正确。[#421](https://github.com/ZhongAnTech/zarm/pull/421)
  - [SearchBar] 修复切换英文语言后，搜索框的取消按钮不能完全隐藏的bug。[1de1596](https://github.com/ZhongAnTech/zarm/commit/1de159696a5fbb68aa496b3c4ad923740eb7c337)
  - [Tabs] 修复 Tabs.Panel 的类型定义错误。[#415](https://github.com/ZhongAnTech/zarm/pull/415)[@vdfor]

- Documentation Updated
  - [#399](https://github.com/ZhongAnTech/zarm/pull/399)[@xueqingxiao]


## v2.0.0
- Feature
  - 新增对typescript的支持。
  - 新增支持组件的 按需加载（可配合`babel-plugin-import`插件实现）
  - 新增`Toast`单例模式的应用。
  - 新增组件：
      - 模拟键盘 `Keyboard`
      - 模拟键盘拾取器 `KeyboardPicker`
      - 工具提示 `Tooltip`
      - 折叠面板 `Collapse`
      - 搜索框 `SearchBar`
      - 日历 `Calendar`
      - 导航栏 `NavBar`
      - 标签栏 `TabBar`
      - 国际化组件 `LocaleProvider`

- Break Change
  - 调整主题样式变量名及引入方式，具体参考README使用帮助。
  - 删除`info`主题色。
  - 优化`Button`组件active状态的交互
  - 调整`Picker`组件的使用方式，拆分成`PickerView`、`Picker`、`Select`三种场景的实现。
  - 调整`DatePicker`组件的使用方式，拆分成`DatePickerView`、`DatePicker`、`DateSelect`三种场景的实现。
  - 调整`Pull`组件的API。
  - 调整`ActionSheet`组件的默认样式。
  - `Alert`和`Confirm`组件挂在到`Modal`组件的静态方法下，`Modal.alert()`和`Modal.confirm()`。
  - 组件更名：
    - 文件选择器 `Uploader` 组件更名为 `FilePicker`
    - 手风琴 `Accordion` 组件更名为 `Collapse`
    - 活动指示器 `Spinner` 组件更名为 `ActivityIndicator`
    - 标签页 `Tab` 组件更名为 `Tabs`
    - 走马灯 `Swipe` 组件更名为 `Carousel`

- Bug Fix
  - 修复组件`Input`类型为textarea时内容换行符字符数计算错误的bug。[6f6ccd6](https://github.com/ZhongAnTech/zarm/commit/cc6924b4f4c3cb0717fd5bf24e3cd94ac7695f59)
  - 修复组件`Pull`不兼容自定义scroll容器的bug。[a9084cc](https://github.com/ZhongAnTech/zarm/commit/a9084cc0eba7b92cff7eb712e77ee43bf597f887)
  - 修复组件`Swipe`手动拖拽时，同时触发了滚动条滚动后，不能执行touchend事件里动画的bug。[62a96d8](https://github.com/ZhongAnTech/zarm/commit/62a96d8089f9d0f015d642f24077aaef585aa278)
