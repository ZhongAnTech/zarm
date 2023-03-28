# 版本更新日志

## v3.0.10

- Bug Fix

  - 解决 renderImperative React 18 异步渲染问题 [#1076](https://github.com/ZhongAnTech/zarm/pull/1076)
  - [List.Item] 修复单独引用样式丢失 [#1075](https://github.com/ZhongAnTech/zarm/pull/1075)
  - [Collapse] 修复标题默认字体 [#1077](https://github.com/ZhongAnTech/zarm/pull/1077)

## v3.0.9

- Bug Fix

  - [ImagePreview] 修复点击图片穿透问题 [#1073](https://github.com/ZhongAnTech/zarm/pull/1073)

## v3.0.8

- Feature

  - [Toast] 兼容 React 18 异步渲染问题 [#1069](https://github.com/ZhongAnTech/zarm/pull/1069)
  - [Popup & Modal] 增加指令式调用方式 [#1056](https://github.com/ZhongAnTech/zarm/pull/1056)

- Bug Fix

  - [Modal] 修复 confirm 点击确认返回值不正确 [#1072](https://github.com/ZhongAnTech/zarm/pull/1072)
  - [Modal] 移除无效样式文件 [#1071](https://github.com/ZhongAnTech/zarm/pull/1071)
  - 修复部分组件 `className` 挂载节点错误及 `style` 样式属性缺失问题 [#1066](https://github.com/ZhongAnTech/zarm/pull/1066)
  - [DateSelect] 修复 DateSelect 组件 `columnType`、`max`、`min` 属性未生效的问题 [#1068](https://github.com/ZhongAnTech/zarm/pull/1068)
  - [Select] 修复默认值无法为空的问题 [#1068](https://github.com/ZhongAnTech/zarm/pull/1068)
  - [@zarm-design/icons] 修复无法自定义 scss 前缀的问题 [#1067](https://github.com/ZhongAnTech/zarm/pull/1067)

## v3.0.7

- Bug Fix

  - [ConfigProvider] 修复全局修改组件类名前缀 `prefix` 后，`scss` 文件前缀修改不生效的问题 [#1061](https://github.com/ZhongAnTech/zarm/pull/1061)
  - [Icon] 修复部分组件 Icon 样式偏移问题 [#1062](https://github.com/ZhongAnTech/zarm/pull/1062)

## v3.0.5

- Feature

  - 优化 iconfont 字体文件的引入方式，需要使用 iconfont 方式的时候需要额外引入样式文件。[#1057](https://github.com/ZhongAnTech/zarm/pull/1057)

- Bug Fix

  - [Cascader] 修复组件丢失 Radio 和 List 样式导致显示错乱的问题 [#1053](https://github.com/ZhongAnTech/zarm/pull/1053)

## v3.0.2

- Bug Fix

  - 修复 dist 目录下 css 文件缺失的问题 [#1053](https://github.com/ZhongAnTech/zarm/pull/1053)
  - 修复使用 `babel-plugin-import` 插件部分组件找不到 style 目录报错的问题 [#1053](https://github.com/ZhongAnTech/zarm/pull/1053)

## v3.0.0

- Feature

  - 新增组件：Grid 宫格、WaterMark 水印、Skeleton 骨架屏、Rate 评分、Image 图片
  - 新增 hooks 组件：useClickAway 单击外部跟踪器、useInViewport 进入浏览器窗口、useLongPress 长按、useOrientation 屏幕方向、useScroll 滚动

- Break Change

  - [ActivityIndicator]
    - `ActivityIndicator` 组件更名为 `Loading`
  - [Loading]
    - 原 `Loading` 组件合并至 `Toast` 组件，通过设置 `icon` 为 `loading` 来实现
  - [ConfigProvider]
    - 组件样式设置作用域修正为当前节点下（非全局）
    - 增加适配安全区域
    - 增加组件 `css` 变量设置
    - 增加组件挂载节点的 `mountContainer`
    - 增加组件类名前缀 `prefixCls` 设置
  - [Input]
    - 拆分使用到虚拟键盘的自定义输入框组件 `CustomInput`
    - 触发的事件入参由 value 值改为 event，受影响的事件有 `onChange` `onFocus` `onBlur` `onFocus`
    - 删除 `onClear` 事件，点击重置按钮请空值将触发 `onChange` 事件
    - 抽离自定义输入框 `CustomInput`, 配合 `KeyBoard` 扩展自定义输入框
    - 增加属性 `label`，用于设置标签栏
  - [Cell]
    - 变更为 List 和 List.Item 组件，样式结构调整
    - 属性 `icon` 变更为 `prefix`
    - 属性 `description` 变更为 `after`
    - 属性 `help` 变更为 `info`
    - 属性 `title` 字体大小变更为 17px
  - [Checkbox]
    - Group
      - 属性 `type` 可选值 `cell` 变更为 `list`
      - 删除属性 `size`、`shape`、`ghost`
      - 新增属性 `iconAlign` ，用于设置列表类型时标记的位置
  - [Radio]
    - Group
      - 属性 `type` 可选值 `cell` 变更为 `list`
      - 删除属性 `size`、`shape`、`ghost`
      - 新增属性 `listIconAlign` ，用于设置列表类型时标记的位置
  - [Select & DateSelect]
    - 移除属性 `hasArrow`，默认展示箭头
  - [NoticeBar]
    - 新增属性 `onClose`，关闭触发的回调函数
    - 修复关闭后只移除了 `Message` 组件，根节点没有被移除的 bug
  - [Message]
    - 移除属性 `size`，及相关样式
    - 新增属性 `onClose`，关闭触发的回调函数
  - [ImagePreview]
    - 支持横屏下查看图片
  - [Modal]
    - 支持开启状态下锁定背景滚动
  - [Popup]
    - 新增属性 `forceRender`，用于强制渲染内容
  - [Badge]
    - 移除属性 `theme`，颜色设置通过 css 变量 --background 来定义
    - 新增属性 `bordered` ，用于判断徽标是否有边框
  - [SearchBar]
    - 输入框事件变更为与原生 `input` 保持一致，如 `onChange`、`onFocus`、`onBlur` 等
    - 删除 `onClear` 事件，点击重置按钮请空值将触发 `onChange` 事件
  - [Slider]
    - 支持点击，移动到点击位置
    - 新增属性 `onSlideChange` ，滑动时触发
  - [Toast]
    - 变更为仅支持指令式调用，详细用法参见官网文档
  - [BackTop]
    - `BackToTop` 组件更名为 `BackTop`
    - 新增属性 `mountContainer` ，用于设置组件挂载节点
  - [Badge]
    - 移除属性 `theme`，颜色设置通过 css 变量 --background 来定义
    - 新增属性 `bordered` ，用于判断徽标是否有边框
  - [Mask]
    - 移除属性 `type`
    - 新增属性 `color` 用户设置颜色
    - 新增属性 `opacity` 用于设置透明度
  - [StackPicker]
    - `StackPicker` 组件更名为 `Cascader`
  - [Picker & PickerView]
    - 移除属性 `valueMember`，替换为 `fieldNames` 支持自定义 label、value、children 的字段
  - [DatePicker & DatePickverView]
    - 移除属性 `mode`，新增 `columnType` 属性来控制日期时间的模式
    - 移除属性 `minuteStep`，新增 `filter` 属性用于过滤选项值
  - [SwipeAction]
    - `leftActions/rightActions` onClick 事件支持异步

## v2.9.15

- Bug Fix

  - [ActivityIndicator] 修复 scss 编译问题。[#911](https://github.com/ZhongAnTech/zarm/pull/911)

## v2.9.14

- Bug Fix

  - [Input] 修复 `clearable` 为 `false` 状态下依然显示了清除按钮的 bug。[#880](https://github.com/ZhongAnTech/zarm/pull/880)

  - [Affix] 修复浮动元素在滚动过程节点更新导致异常表现的 bug。[#905](https://github.com/ZhongAnTech/zarm/pull/905)

  - [DateSelect] 修复 `datetime` 和 `time` 模式下，日期时间格式的兼容问题。[#907](https://github.com/ZhongAnTech/zarm/pull/907)

- Perf

  - [ActivityIndicator] 优化传统菊花状指示器 scss 计算方式。[#a8b3a43](https://github.com/ZhongAnTech/zarm/commit/a8b3a439bde93045db05b3047a7cf74e2f2bebf7)

## v2.9.13

- Bug Fix

  - [Trigger] 修复 Array.includes 兼容问题。[#e048c3d](https://github.com/ZhongAnTech/zarm/commit/e048c3d0aa841d405ce314a63bb480f58c12b8c7)

## v2.9.12

- Bug Fix

  - [SwipeAction] 修复内容超出区域的 bug。[#772](https://github.com/ZhongAnTech/zarm/pull/772)
  - [Popup] 修复服务端渲染时，进入页面默认开启弹层的情况下报错的 bug。[#798](https://github.com/ZhongAnTech/zarm/pull/798)
  - [Affix] 修复服务端渲染时报错的 bug。[#807](https://github.com/ZhongAnTech/zarm/pull/807)
  - [Tabs] 修复 tab 项动态渲染时返回 null 或者 undefined 出错的 bug。[#836](https://github.com/ZhongAnTech/zarm/pull/836)
  - [Icon] 修复 iconfont 的使用方式在 vite 生产环境下报错的 bug。[#834](https://github.com/ZhongAnTech/zarm/pull/834)
  - [Progress] 修复当 percent 属性为 null 时进度展示有误的 bug。[#839](https://github.com/ZhongAnTech/zarm/pull/839)

- Perf

  - [Popper] 优化内部使用的 Array.prototype.includes 不兼容的方法。[#5344d0b](https://github.com/ZhongAnTech/zarm/commit/5344d0b6d6b93bf2604c496030b4a24053f18aac)

## v2.9.9

- Bug Fix

  - [Popup] 修复当 mountContainer 为 `false` 时，丢失容器 div 的 bug。[#769](https://github.com/ZhongAnTech/zarm/issue/769)

## v2.9.8

- Bug Fix

  - [Pull] 修复当 window 作为滚动容器时，触发事件的临界点判断错误的 bug。[#760](https://github.com/ZhongAnTech/zarm/pull/760)

## v2.9.7

- Bug Fix

  - [Keyboard] 修复长按删除按钮会陷入死循环（重复执行删除操作且松开后无法退出）的 bug。[#745](https://github.com/ZhongAnTech/zarm/pull/745)[@Confettis]

## v2.9.6

- Bug Fix

  - [Calendar] 修复日历组件不支持国际化的 bug。[#738](https://github.com/ZhongAnTech/zarm/pull/738)

## v2.9.5

- Bug Fix

  - 修复 Loading 和 Toast 静态方法使用后实例未销毁的 bug。[#710](https://github.com/ZhongAnTech/zarm/issues/710)
  - [Pull] 修复因滚动容器变更导致原有容器事件监听未解除的 bug。[#734](https://github.com/ZhongAnTech/zarm/issues/734)

## v2.9.4

- Bug Fix

  - [Collapse] 修复同时设置 activeKey 和 defaultActiveKey 属性属性导致的 bug。[#698](https://github.com/ZhongAnTech/zarm/pull/698)

  - [Modal] 修复 Modal 静态方法 `Modal.confirm` 和 `Modal.alert` 使用后实例未销毁的 bug。[#710](https://github.com/ZhongAnTech/zarm/issues/710)

- Perf
  - [Button] 优化按钮点击 300ms 延时。[#701](https://github.com/ZhongAnTech/zarm/pull/701)

## v2.9.3

- Bug Fix

  - [Button] 修复 primary 主题下 loading 状态活动指示器不可见的 bug。[#692](https://github.com/ZhongAnTech/zarm/pull/692)

## v2.9.2

- Bug Fix

  - [Input] 修复使用了过时的 `Icon` API，导致编译出错的 bug。[#653](https://github.com/ZhongAnTech/zarm/pull/653)

## v2.9.1

- Bug Fix

  - [Input] 修复包含虚拟键盘的 `Input` 无法在外部获取焦点的 bug。[#638](https://github.com/ZhongAnTech/zarm/pull/638)
  - [Picker] 修复因低版本 `better-scroll` 引起的快速点确定按钮无法正确取值的问题。[#649](https://github.com/ZhongAnTech/zarm/pull/649)

- Perf

  - 增加 @babel/runtime 依赖，以满足在 [vite](https://github.com/vitejs/vite) 中使用的场景。[#636](https://github.com/ZhongAnTech/zarm/pull/636)
  - [Carousel] 优化滑动后出现闪烁的问题。[#647](https://github.com/ZhongAnTech/zarm/pull/647) [#648](https://github.com/ZhongAnTech/zarm/pull/648) [@jianhuagao]

## v2.9.0

- Bug Fix

  - [ImagePreview] 修复组件异步获取数据报错的 bug。[#613](https://github.com/ZhongAnTech/zarm/pull/613)
  - [DatePickerView] 修复当 `mode="date"` 展示错误的 bug。[#624](https://github.com/ZhongAnTech/zarm/pull/624)
  - [ConfigProvider] 修复服务端渲染时报的 `document is not defined` 的 bug。[#631](https://github.com/ZhongAnTech/zarm/pull/631)

- Perf

  - [ImagePreview] 异步获取数据时增加 loading 用于等待图片加载。[#615](https://github.com/ZhongAnTech/zarm/pull/615)
  - [Message] 优化消息组件可点区域的鼠标显示状态。[#445a935](https://github.com/ZhongAnTech/zarm/commit/445a935a9f4a756b6aa455e147999148e2df1af2)

- Feature

  - [@zarm-design/icons] 抽离内置的 Icon 图标，独立成新的包 [@zarm-design/icons](https://github.com/ZhongAnTech/zarm/tree/master/packages/zarm-icons) 来管理。[#e4db8e2](https://github.com/ZhongAnTech/zarm/commit/e4db8e2a102ecf8ef2edfd098c2326cb832665c9)

## v2.8.2

- Bug Fix

  - [Affix] 修复部分浏览器无法获取节点报错的 bug。[#605](https://github.com/ZhongAnTech/zarm/pull/605)
  - [SwipeAction] 修复点击按钮后没有自动关闭的 bug。[#6133a8c](https://github.com/ZhongAnTech/zarm/commit/6133a8ceb82615b53564cbd3df28eb52f7956d38)
  - [DateSelect] 修复在 PC 端部分浏览器报错的 bug。[#608](https://github.com/ZhongAnTech/zarm/pull/608)
  - [StackPicker] 修复受控组件下内部设置了 `visible` 的状态导致的 bug。[#609](https://github.com/ZhongAnTech/zarm/pull/609)

- Perf

  - [Affix] 优化节流参数，让滚动过程更加流畅。[#fa29e5f](https://github.com/ZhongAnTech/zarm/commit/fa29e5f546e5d27f39a32799ea0a3339c390e1fd)
  - 优化部分组件 `Passive Event Listeners` 引起的浏览器控制台报错。[#606](https://github.com/ZhongAnTech/zarm/pull/606) [#9104d57](https://github.com/ZhongAnTech/zarm/commit/9104d576f81f049c036cef9be67cb019d55293f4) [@leonwgc]

## v2.8.0

- Bug Fix

  - [LocaleProvider] 修复在使用 `babel-plugin-import` 插件的情况下样式文件缺失的 bug。[#882bd5c](https://github.com/ZhongAnTech/zarm/commit/882bd5c1bc088281fd46ae1008cc25f92c263838)
  - [StackPicker] 修复选项列表背景缺失的 bug。[#132d435](https://github.com/ZhongAnTech/zarm/commit/132d4353294d1f78e067c28794a121049c12d201)
  - [StackPicker] 修复缺少国际化语言包功能。[#f528fc5](https://github.com/ZhongAnTech/zarm/commit/f528fc53fe89e18c40e04e778bf0ae7827076dae)
  - [FilePicker] 修复包含的子组件 `className` 的属性值被修改为 `needsclick`, 改为追加该值。[#592](https://github.com/ZhongAnTech/zarm/pull/592)
  - 修复部分组件缺少 `className` 属性的 bug。[#be465f0](https://github.com/ZhongAnTech/zarm/commit/be465f03c365d47662695ce8654ab4a6d4533cd3)

## v2.7.3

- Bug Fix

  - [StackPicker] 修复文字长度较大时因丢失层叠背景色导致重叠的 bug。[#132d435](https://github.com/ZhongAnTech/zarm/commit/132d4353294d1f78e067c28794a121049c12d201)
  - [Stepper] 修复在 Cell 中使用的 Stepper 组件，因与 `Input` 样式冲突导致无法显示输入框的值的 bug。[#055f50f](https://github.com/ZhongAnTech/zarm/commit/055f50fdaf97d56f6d8d5c76f79e7233c6f5b48b)

- Perf
  - 设置部分样式单位为 `PX`, 使得在 rem 适配方案下，部分特殊场景的 `px` 将不被转换为 `rem`，如 1px 分割线、1px 边框等。[#8c4f8cb](https://github.com/ZhongAnTech/zarm/commit/8c4f8cbababb4e31c048c704f044158f3a3074c0)

## v2.7.2

- Bug Fix
  - [Input] 修复 `value` 为 `null` 值时，出现错误的 bug。[#554](https://github.com/ZhongAnTech/zarm/pull/554)

## v2.7.1

- Bug Fix
  - [DatePicker, Picker] 修复 `DOM` 结构没有随着 `props` 的改变而更新，导致滑动出现问题的 bug。[#552](https://github.com/ZhongAnTech/zarm/pull/552)

## v2.7.0

- Bug Fix

  - [Button] 修复链接按钮的行高不正确的 BUG。[#13370c4](https://github.com/ZhongAnTech/zarm/commit/13370c412b88f5d542e24d113256caf8765d5145)
  - [Tooltip] 修复内容为空时渲染异常的 BUG。[#28a16f9](https://github.com/ZhongAnTech/zarm/commit/28a16f9a62c1036cfd1fce64a15e8da068da6d8e)
  - [Tabs] 修复包含 `scrollable` 属性在设置异步数据时出错的 BUG。[#520](https://github.com/ZhongAnTech/zarm/pull/520)
  - [Popup] 修复弹出动画执行异常的情况。[#3473207](https://github.com/ZhongAnTech/zarm/commit/3473207c96ed018284915ded6cb098ed99e87f51)
  - [ImagePreview] 修复在长图情况下无法滚动预览的 BUG。[#533](https://github.com/ZhongAnTech/zarm/pull/533)[@pandanxin]
  - [Input] 修复 `placeholder` 占位符的颜色不统一的 BUG。[#5626247](https://github.com/ZhongAnTech/zarm/commit/562624703a7acc30c071722306e1c8aaaaefab8a)
  - [Input] 修复数字输入框默认值为 0 时不显示的 BUG。[#536](https://github.com/ZhongAnTech/zarm/pull/536)
  - [Carousel] 走马灯自动播放在触碰后会停止，无法恢复的 BUG。[#543](https://github.com/ZhongAnTech/zarm/pull/543)

- Perf

  - [Collapse] 重构折叠面板，优化箭头动画。[#838629a](https://github.com/ZhongAnTech/zarm/commit/838629a13a4bb348799d5f171e78a99345f6ed1d)
  - [Carousel] 优化走马灯组件纵向对齐方式，调整为顶部对齐。[#fed4b22](https://github.com/ZhongAnTech/zarm/commit/fed4b2222541db79a9237669f6747da26d41b04e)
  - [Picker, DatePicker] 优化选值机制，当滚轮滚动时，点击确定按钮后动画自动停止并且选择当前值。[#544](https://github.com/ZhongAnTech/zarm/pull/544)
  - [Input] 虚拟键盘光标高度优化。[#4668c47](https://github.com/ZhongAnTech/zarm/commit/4668c4797ef09497fb3d7f3e179f263725be527c)

- Feature
  - 抽离更多的 css 变量用于样式配置。[#74de78a](https://github.com/ZhongAnTech/zarm/commit/74de78a299b69b4624746163092cdc218c4913ea)
  - 支持暗黑模式。[#60433a9](https://github.com/ZhongAnTech/zarm/commit/60433a910e215b230bd2aa5eb4dba2cec1fb594c)
  - [ConfigProvider] 新增全局配置组件，国际化组件 `LocaleProvider` 设置为不推荐使用，将逐步下线。[#a50a418](https://github.com/ZhongAnTech/zarm/commit/a50a41804be04066d835ffdac8318b5ad4b82eed)
  - [Popup] 支持键盘操作 `esc` 关闭弹窗。[#538](https://github.com/ZhongAnTech/zarm/pull/538)
  - [Stepper] 支持输入框可以选择虚拟键盘的类型。[#541](https://github.com/ZhongAnTech/zarm/pull/541)

## v2.6.1

- Perf
  - 优化打包结果，减小打包体积。[#6c37b92](https://github.com/ZhongAnTech/zarm/commit/6c37b92d69895c03696e1aaebf1ee2661e679625)

## v2.6.0

- Bug Fix

  - 修复 ES modules 下出现类型引用错误。[#cde1469](https://github.com/ZhongAnTech/zarm/commit/cde14695132612d49bcf3bf165ea331cbf2c6a1a)

- Perf
  - [Tabs] `value`值的边界优化。[#503](https://github.com/ZhongAnTech/zarm/issues/503)
  - 优化部分组件的 typescript 类型定义。

## v2.5.6

- Bug Fix

  - [Tabs] 修复滚动边界判断时的问题。[#498](https://github.com/ZhongAnTech/zarm/pull/498)
  - [TabBar] 修复按需加载组件时，丢失 Badge 组件的样式的问题。[#501](https://github.com/ZhongAnTech/zarm/pull/501)

- Perf
  - [Input] 优化虚拟键盘的鼠标定位，获取焦点自动定位到内容的尾部。[#1dca23f](https://github.com/ZhongAnTech/zarm/commit/1dca23f0d8b1a8b74902d13977423406b06c2a14)
  - [Input] 兼容原生 input 的类型，如`<input type="tel" />`等。[#a057caa](https://github.com/ZhongAnTech/zarm/commit/a057caa0f53234b95500c192fcb9f72a949e2402)

## v2.5.5

- Feature

  - [Tabs] 支持纵向显示。[#486](https://github.com/ZhongAnTech/zarm/pull/486)

- Break Change

  - [Tabs] 删除 `scrollThreshold` 属性，改为由 `scrollable` 属性判断是否支持滚动。

- Bug Fix
  - 修复服务端渲染时出现的 `window is not defined` 的错误。[#6375267](https://github.com/ZhongAnTech/zarm/commit/6375267e3cb3fd4ea2c4c389a9332bea499442c5) [#495](https://github.com/ZhongAnTech/zarm/pull/495)

## v2.5.2

- Bug Fix

  - [Pull] 修复下拉刷新状态为`加载成功` 或 上拉加载状态为`加载失败`时，Pull 存在内存泄漏的 bug。[#487](https://github.com/ZhongAnTech/zarm/pull/487)

- Perf

  - 重构 DOM 操作工具库。[#f098d4a](https://github.com/ZhongAnTech/zarm/commit/f098d4a18d43407d79823ad5e6c7f0211cbec080)。
  - 优化调整各组件 `z-index` 堆叠顺序的 css 变量。[#00e0202](https://github.com/ZhongAnTech/zarm/commit/00e0202ad8a4bd2250d2226293804c022f19c613)

  ```css
  --zindex-mask: 1000;
  --zindex-popup: 1100;
  --zindex-tooltip: 1700;
  ```

## v2.5.1

- Bug Fix
  - [Popup] 修复因增加 API 过期警告导致无法自定义挂载节点的 bug。[#482](https://github.com/ZhongAnTech/zarm/pull/482)
  - [Calendar] 修复因日期计算问题导致出现重复月份的 bug。[#483](https://github.com/ZhongAnTech/zarm/pull/483)

## v2.5.0

- Feature

  - [ImagePreview] 新增图片预览组件。[#475](https://github.com/ZhongAnTech/zarm/pull/475)

- Perf
  - [Pull] 优化下拉刷新用户体验。[#0171d0d](https://github.com/ZhongAnTech/zarm/commit/dede711af890485b981de5ffc9b22d690ed23a25)
    - 下拉后放手回弹增加动画效果。
    - 修改下拉距离衰减比例，由 2 倍 改为 3 倍。
    - 修改触发距离阀值属性 `distance` 默认值由 50 变为 30。
  - [Tabs] 选中项增加样式类名 `.za-tabs__tab--active`，方便外部样式复写。[#0445eeb](https://github.com/ZhongAnTech/zarm/commit/0d1ef242c1142a95a4211dd7ef59b69e538e5f82)

## v2.4.0

- Feature
  - [Tabs] 新增 `scrollThreshold` 属性设置启用横向滚动的标签页数阀值，用于支持通过左右滚动展示超出屏幕宽度的标签页。[#470](https://github.com/ZhongAnTech/zarm/pull/470)
  - [StackPicker] 新增层叠选择器组件。[#474](https://github.com/ZhongAnTech/zarm/pull/474)

## v2.3.4

- Bug Fix
  - [Pull] 修复在 iOS 12 版本下出现无法上滑拖动滚动条的 bug。[#472](https://github.com/ZhongAnTech/zarm/pull/472)

## v2.3.3

- Bug Fix
  - [Input] 修复数字键盘因点击过快导致出现卡顿，丢失输入数据的 bug。[#464](https://github.com/ZhongAnTech/zarm/pull/464)

## v2.3.1

- Bug Fix
  - [Keyboard] 修复身份证号类型的键盘问题，`x` 的改为大写 `X`。[#460](https://github.com/ZhongAnTech/zarm/pull/460)

## v2.3.0

- Bug Fix

  - [BackToTop] 修复点击返回顶部时触发的 `onScroll` 事件，在安卓低版本不兼容的问题。[#455](https://github.com/ZhongAnTech/zarm/pull/455)
  - [Input] 修复 Input 值为 undefined 时异常显示的 bug。[#459](https://github.com/ZhongAnTech/zarm/pull/459)
  - [Input] 修复 Input 作为受控组件时出现异常的 bug。[#459](https://github.com/ZhongAnTech/zarm/pull/459)

- Break Change

  - [ActionSheet, Alert, Confirm, Popup, Pciker, Select, DatePicker, DateSelect, KeyboardPicker, Loading, Modal, Toast] 修复包含挂载容器的组件，设置自定义 className 属性时挂载位置不正确的 bug，修改为统一挂载外层容器中。[#456](https://github.com/ZhongAnTech/zarm/pull/456)

- Perf
  - 优化 es 模块打包编译。[#e3e451a](https://github.com/ZhongAnTech/zarm/commit/e3e451a861e7f7587433c490d865e2a3e4d820cd)

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
  - [Loading, Toast] 修复异步执行无法关闭的 bug。[#429](https://github.com/ZhongAnTech/zarm/pull/429)
  - [Loading, Toast] 修复切换路由后不会消失的 bug。[#436](https://github.com/ZhongAnTech/zarm/pull/436)
  - [Popper] 修复非浏览器环境下使用报错问题。[#435](https://github.com/ZhongAnTech/zarm/pull/435)
  - [Pull] 修复 vivo 手机中使用 `Div` 作为容器，下拉操作会把整个网页一起拖动的 bug。[#444](https://github.com/ZhongAnTech/zarm/pull/444)

## v2.1.0

- Feature

  - [Popper] 优化气泡层动画，增加菜单拉伸 `menuSlide` 动画。[#400](https://github.com/ZhongAnTech/zarm/pull/400)
  - [Select] 支持数字和布尔值类型的值。[#418](https://github.com/ZhongAnTech/zarm/pull/418)

- Break Change

  - [Checkbox, Radio] 调整禁用状态下的样式，变更为浅灰色背景框，深灰色勾选。[ed04500](https://github.com/ZhongAnTech/zarm/commit/ed04500a1199394e979fc86663932f0281ce2662)
  - [NoticeBar] 删除`scrollable`属性，内容宽度超过 NoticeBar 的宽度会默认支持自动滚动，否则为固定展示。[#420](https://github.com/ZhongAnTech/zarm/pull/420)

- Bug Fix

  - [Input] 修复多行文本修改 `readonly` 属性导致组件崩溃的 bug。[#407](https://github.com/ZhongAnTech/zarm/pull/407)
  - [Input] 修复多行文本直接通过 `value` 属性修改值时, 字数不会重新计算的 bug。[510deb6](https://github.com/ZhongAnTech/zarm/commit/510deb68ed1d4955f86cec254474f08c061ae59a)
  - [Input] 修复禁用状态下，手机端无法显示值的 bug。[593b974](https://github.com/ZhongAnTech/zarm/commit/593b974b5665acda02685756def9d43b972f8602)
  - [Input] 修复数字、金额输入框，值为 number 类型时无法删除的 bug。[#428](https://github.com/ZhongAnTech/zarm/pull/428)
  - [Pull] 修复获取滚动容器节点的计算在某些场景下不正确。[#421](https://github.com/ZhongAnTech/zarm/pull/421)
  - [SearchBar] 修复切换英文语言后，搜索框的取消按钮不能完全隐藏的 bug。[1de1596](https://github.com/ZhongAnTech/zarm/commit/1de159696a5fbb68aa496b3c4ad923740eb7c337)
  - [Tabs] 修复 Tabs.Panel 的类型定义错误。[#415](https://github.com/ZhongAnTech/zarm/pull/415)[@vdfor]

- Documentation Updated
  - [#399](https://github.com/ZhongAnTech/zarm/pull/399)[@xueqingxiao]

## v2.0.0

- Feature

  - 新增对 typescript 的支持。
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

  - 调整主题样式变量名及引入方式，具体参考 README 使用帮助。
  - 删除`info`主题色。
  - 优化`Button`组件 active 状态的交互
  - 调整`Picker`组件的使用方式，拆分成`PickerView`、`Picker`、`Select`三种场景的实现。
  - 调整`DatePicker`组件的使用方式，拆分成`DatePickerView`、`DatePicker`、`DateSelect`三种场景的实现。
  - 调整`Pull`组件的 API。
  - 调整`ActionSheet`组件的默认样式。
  - `Alert`和`Confirm`组件挂在到`Modal`组件的静态方法下，`Modal.alert()`和`Modal.confirm()`。
  - 组件更名：
    - 文件选择器 `Uploader` 组件更名为 `FilePicker`
    - 手风琴 `Accordion` 组件更名为 `Collapse`
    - 活动指示器 `Spinner` 组件更名为 `ActivityIndicator`
    - 标签页 `Tab` 组件更名为 `Tabs`
    - 走马灯 `Swipe` 组件更名为 `Carousel`

- Bug Fix
  - 修复组件`Input`类型为 textarea 时内容换行符字符数计算错误的 bug。[6f6ccd6](https://github.com/ZhongAnTech/zarm/commit/cc6924b4f4c3cb0717fd5bf24e3cd94ac7695f59)
  - 修复组件`Pull`不兼容自定义 scroll 容器的 bug。[a9084cc](https://github.com/ZhongAnTech/zarm/commit/a9084cc0eba7b92cff7eb712e77ee43bf597f887)
  - 修复组件`Swipe`手动拖拽时，同时触发了滚动条滚动后，不能执行 touchend 事件里动画的 bug。[62a96d8](https://github.com/ZhongAnTech/zarm/commit/62a96d8089f9d0f015d642f24077aaef585aa278)
