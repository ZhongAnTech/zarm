# 版本更新日志 

## v2.5.6
- Bug Fix
  - [Tabs] 修复滚动边界判断时的问题。[#498](https://github.com/ZhongAnTech/zarm/pull/498)
  - [TabBar] 修复按需加载组件时，丢失Badge组件的样式的问题。[#501](https://github.com/ZhongAnTech/zarm/pull/501)

- Perf
  - [Input] 优化虚拟键盘的鼠标定位，获取焦点自动定位到内容的尾部。[#1dca23f](https://github.com/ZhongAnTech/zarm/commit/1dca23f0d8b1a8b74902d13977423406b06c2a14)
  - [Input] 兼容原生input的类型，如`<input type="tel" />`等。[#a057caa](https://github.com/ZhongAnTech/zarm/commit/a057caa0f53234b95500c192fcb9f72a949e2402)


## v2.5.5
- Feature
  - [Tabs] 支持纵向显示。[#486](https://github.com/ZhongAnTech/zarm/pull/486)

- Break Change
  - [Tabs] 删除 `scrollThreshold` 属性，改为由 `scrollable` 属性判断是否支持滚动。

- Bug Fix
  - 修复服务端渲染时出现的 `window is not defined` 的错误。[#6375267](https://github.com/ZhongAnTech/zarm/commit/6375267e3cb3fd4ea2c4c389a9332bea499442c5) [#495](https://github.com/ZhongAnTech/zarm/pull/495)


## v2.5.2
- Bug Fix
  - [Pull] 修复下拉刷新状态为`加载成功` 或 上拉加载状态为`加载失败`时，Pull存在内存泄漏的bug。[#487](https://github.com/ZhongAnTech/zarm/pull/487)

- Perf
  - 重构DOM操作工具库。[#f098d4a](https://github.com/ZhongAnTech/zarm/commit/f098d4a18d43407d79823ad5e6c7f0211cbec080)。
  - 优化调整各组件 `z-index` 堆叠顺序的css变量。[#00e0202](https://github.com/ZhongAnTech/zarm/commit/00e0202ad8a4bd2250d2226293804c022f19c613)

  ```css
  --zindex-mask: 1000;
  --zindex-popup: 1100;
  --zindex-tooltip: 1700;
  ```


## v2.5.1
- Bug Fix
  - [Popup] 修复因增加API过期警告导致无法自定义挂载节点的bug。[#482](https://github.com/ZhongAnTech/zarm/pull/482)
  - [Calendar] 修复因日期计算问题导致出现重复月份的bug。[#483](https://github.com/ZhongAnTech/zarm/pull/483)


## v2.5.0
- Feature
  - [ImagePreview] 新增图片预览组件。[#475](https://github.com/ZhongAnTech/zarm/pull/475)

- Perf
  - [Pull] 优化下拉刷新用户体验。[#0171d0d](https://github.com/ZhongAnTech/zarm/commit/dede711af890485b981de5ffc9b22d690ed23a25)
    - 下拉后放手回弹增加动画效果。
    - 修改下拉距离衰减比例，由 2倍 改为 3倍。
    - 修改触发距离阀值属性 `distance` 默认值由 50 变为 30。
  - [Tabs] 选中项增加样式类名 `.za-tabs__tab--active`，方便外部样式复写。[#0445eeb](https://github.com/ZhongAnTech/zarm/commit/0d1ef242c1142a95a4211dd7ef59b69e538e5f82)


## v2.4.0
- Feature
  - [Tabs] 新增 `scrollThreshold` 属性设置启用横向滚动的标签页数阀值，用于支持通过左右滚动展示超出屏幕宽度的标签页。[#470](https://github.com/ZhongAnTech/zarm/pull/470)
  - [StackPicker] 新增层叠选择器组件。[#474](https://github.com/ZhongAnTech/zarm/pull/474)


## v2.3.4
- Bug Fix
  - [Pull] 修复在 iOS 12 版本下出现无法上滑拖动滚动条的bug。[#472](https://github.com/ZhongAnTech/zarm/pull/472)


## v2.3.3
- Bug Fix
  - [Input] 修复数字键盘因点击过快导致出现卡顿，丢失输入数据的bug。[#464](https://github.com/ZhongAnTech/zarm/pull/464)


## v2.3.1
- Bug Fix
  - [Keyboard] 修复身份证号类型的键盘问题，`x` 的改为大写 `X`。[#460](https://github.com/ZhongAnTech/zarm/pull/460)


## v2.3.0
- Bug Fix
  - [BackToTop] 修复点击返回顶部时触发的 `onScroll` 事件，在安卓低版本不兼容的问题。[#455](https://github.com/ZhongAnTech/zarm/pull/455)
  - [Input] 修复Input值为undefined时异常显示的bug。[#459](https://github.com/ZhongAnTech/zarm/pull/459)
  - [Input] 修复Input作为受控组件时出现异常的bug。[#459](https://github.com/ZhongAnTech/zarm/pull/459)

- Break Change
  - [ActionSheet, Alert, Confirm, Popup, Pciker, Select, DatePicker, DateSelect, KeyboardPicker, Loading, Modal, Toast] 修复包含挂载容器的组件，设置自定义className属性时挂载位置不正确的bug，修改为统一挂载外层容器中。[#456](https://github.com/ZhongAnTech/zarm/pull/456)

- Perf
  - 优化es模块打包编译。[#e3e451a](https://github.com/ZhongAnTech/zarm/commit/e3e451a861e7f7587433c490d865e2a3e4d820cd)


## v2.2.0
- Feature
  - [Input] 多行文本设置高度自适应时，删除内容支持自动缩小高度。[#445](https://github.com/ZhongAnTech/zarm/pull/445)
  - [BackToTop] 新增 `BackToTop` 返回顶部组件。[#449](https://github.com/ZhongAnTech/zarm/pull/449)

- Documentation Updated
  - 样例支持 React Hooks。[#446](https://github.com/ZhongAnTech/zarm/pull/446)


## v2.1.1
- Feature
  - [Cell] 优化设置了 `help` 属性后，提示信息区域的样式显示。[#439](https://github.com/ZhongAnTech/zarm/pull/439)

- Bug Fix
  - [Loading, Toast] 修复异步执行无法关闭的bug。[#429](https://github.com/ZhongAnTech/zarm/pull/429)
  - [Loading, Toast] 修复切换路由后不会消失的bug。[#436](https://github.com/ZhongAnTech/zarm/pull/436)
  - [Popper] 修复非浏览器环境下使用报错问题。[#435](https://github.com/ZhongAnTech/zarm/pull/435)
  - [Pull] 修复vivo手机中使用 `Div` 作为容器，下拉操作会把整个网页一起拖动的bug。[#444](https://github.com/ZhongAnTech/zarm/pull/444)


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
