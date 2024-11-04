"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[837],{10837:function(n,t,e){e.r(t),t.default='# 版本更新日志\n\n## v3.1.4\n\n- Perf\n\n  - [Popup] 支持嵌套使用 [#d94776](https://github.com/ZhongAnTech/zarm/commit/d94776d4762282c3ecc43ffbcd11b75d71fcc5fb)\n\n## v3.1.2\n\n- Bug Fix\n\n  - [Carousel] 修复图片大小计算偏差问题 [#1169](https://github.com/ZhongAnTech/zarm/pull/1169) [@zyf-xcode]\n\n## v3.1.1\n\n- Perf\n\n  - [Popup] onMaskClick 事件支持原生 event 参数 [#1168](https://github.com/ZhongAnTech/zarm/pull/1168)\n\n## v3.1.0\n\n- Bug Fix\n\n  - [Toast] 修复单独使用该组件 loading 模式时样式丢失的情况 [#1163](https://github.com/ZhongAnTech/zarm/pull/1163)\n\n  - [@zarm-design/icons] 修复当前图标库的导出配置会导致使用 ES 模块时引用 lib 而不是引用 es 下的资源，从而导致 tree shake 失败 [#1166](https://github.com/ZhongAnTech/zarm/pull/1166)\n\n## v3.0.17\n\n- Bug Fix\n\n  - [Popup] 修复内容中包含 transtion 动画时，会影响 Popup 的动画的执行 [#1153](https://github.com/ZhongAnTech/zarm/pull/1153)\n\n- Perf\n\n  - [Calendar] 优化初始状态下自动滑动到已选择的日期位置 [#1150](https://github.com/ZhongAnTech/zarm/pull/1150)\n\n## v3.0.16\n\n- Bug Fix\n\n  - [@zarm-design/icons] 修复 ES Module 模块无法导出的问题 [#5e5c8f](https://github.com/ZhongAnTech/zarm/commit/5e5c8f125c1dc721ed6df8a9ae39462bd8c9a4db)\n  - [Calendar] 修复最大/小可选日期设置后展示不正确的问题 [#1149](https://github.com/ZhongAnTech/zarm/pull/1149)\n\n- Perf\n\n  - [Calendar] `dateRender` 增加 `value` 参数露出，优化样式 css 变量 [#1148](https://github.com/ZhongAnTech/zarm/pull/1148)\n\n## v3.0.15\n\n- Bug Fix\n\n  - [DatePicker] 修复默认值重置为 `undefined` 失效的 bug [#1113](https://github.com/ZhongAnTech/zarm/pull/1113)\n  - [CustomInput] 修复只读状态样式问题 [#1117](https://github.com/ZhongAnTech/zarm/pull/1117)\n  - [Popup, Modal] 修复内容超长无法滚动问题 [#1145](https://github.com/ZhongAnTech/zarm/pull/1145)\n\n- Break Change\n\n  - [TabBar] 移除弃用的 `visible` 和 `safeArea` 属性 [#1112](https://github.com/ZhongAnTech/zarm/pull/1112) [#8db25c](https://github.com/ZhongAnTech/zarm/commit/8db25cc191fa41d1d13f8308ef94787de61b9f2e)\n\n- Perf\n\n  - [Badge] 字体样式优化 [#1118](https://github.com/ZhongAnTech/zarm/pull/1118)\n\n## v3.0.14\n\n- Bug Fix\n\n  - [PickerView] 修复文字过长截断失效的 bug。[#1097](https://github.com/ZhongAnTech/zarm/pull/1097)\n  - [DatePicker] 修复值不能重置为 `undefined` 的 bug。[#1100](https://github.com/ZhongAnTech/zarm/pull/1100)[@aiyogg]\n  - [Popup] 修复 `maskClassName` 属性名错误的 bug。[#1102](https://github.com/ZhongAnTech/zarm/pull/1102)[@aiyogg]\n\n- Perf\n\n  - [Carousel] 优化图片只有一页时停止自动播放，优化循环播放时拖拽的弹性动画。[#1098](https://github.com/ZhongAnTech/zarm/pull/1098)\n\n## v3.0.13\n\n- Bug Fix\n\n  - [ImagePreview] 修复服务端渲染报错 [#1087](https://github.com/ZhongAnTech/zarm/pull/1087)\n\n## v3.0.12\n\n- Bug Fix\n\n  - [Panel] `title` 或 `more` 属性未声明不再渲染 header 节点 [#1085](https://github.com/ZhongAnTech/zarm/pull/1085)\n  - [Input] 修复受控模式下表单值显示不正确 [#1086](https://github.com/ZhongAnTech/zarm/pull/1086)\n  - [DateSelect] 修复按需加载样式文件丢失 [#1083](https://github.com/ZhongAnTech/zarm/pull/1083)\n\n## v3.0.11\n\n- Bug Fix\n\n  - [Toast] 修复调用 `clear` 静态方法后，再次使用无法自动关闭的问题 [#1082](https://github.com/ZhongAnTech/zarm/pull/1082)\n\n## v3.0.10\n\n- Bug Fix\n\n  - 解决 renderImperative React 18 异步渲染问题 [#1076](https://github.com/ZhongAnTech/zarm/pull/1076)\n  - [List.Item] 修复单独引用样式丢失 [#1075](https://github.com/ZhongAnTech/zarm/pull/1075)\n  - [Collapse] 修复标题默认字体 [#1077](https://github.com/ZhongAnTech/zarm/pull/1077)\n\n## v3.0.9\n\n- Bug Fix\n\n  - [ImagePreview] 修复点击“查看原图”按钮导致弹层关闭的问题 [#1073](https://github.com/ZhongAnTech/zarm/pull/1073)\n\n## v3.0.8\n\n- Feature\n\n  - [Toast] 兼容 React 18 异步渲染问题 [#1069](https://github.com/ZhongAnTech/zarm/pull/1069)\n  - [Popup & Modal] 增加指令式调用方式 [#1056](https://github.com/ZhongAnTech/zarm/pull/1056)\n\n- Bug Fix\n\n  - [Modal] 修复 confirm 点击确认返回值不正确 [#1072](https://github.com/ZhongAnTech/zarm/pull/1072)\n  - [Modal] 移除无效样式文件 [#1071](https://github.com/ZhongAnTech/zarm/pull/1071)\n  - 修复部分组件 `className` 挂载节点错误及 `style` 样式属性缺失问题 [#1066](https://github.com/ZhongAnTech/zarm/pull/1066)\n  - [DateSelect] 修复 DateSelect 组件 `columnType`、`max`、`min` 属性未生效的问题 [#1068](https://github.com/ZhongAnTech/zarm/pull/1068)\n  - [Select] 修复默认值无法为空的问题 [#1068](https://github.com/ZhongAnTech/zarm/pull/1068)\n  - [@zarm-design/icons] 修复无法自定义 scss 前缀的问题 [#1067](https://github.com/ZhongAnTech/zarm/pull/1067)\n\n## v3.0.7\n\n- Bug Fix\n\n  - [ConfigProvider] 修复全局修改组件类名前缀 `prefix` 后，`scss` 文件前缀修改不生效的问题 [#1061](https://github.com/ZhongAnTech/zarm/pull/1061)\n  - [Icon] 修复部分组件 Icon 样式偏移问题 [#1062](https://github.com/ZhongAnTech/zarm/pull/1062)\n\n## v3.0.5\n\n- Feature\n\n  - 优化 iconfont 字体文件的引入方式，需要使用 iconfont 方式的时候需要额外引入样式文件。[#1057](https://github.com/ZhongAnTech/zarm/pull/1057)\n\n- Bug Fix\n\n  - [Cascader] 修复组件丢失 Radio 和 List 样式导致显示错乱的问题 [#1053](https://github.com/ZhongAnTech/zarm/pull/1053)\n\n## v3.0.2\n\n- Bug Fix\n\n  - 修复 dist 目录下 css 文件缺失的问题 [#1053](https://github.com/ZhongAnTech/zarm/pull/1053)\n  - 修复使用 `babel-plugin-import` 插件部分组件找不到 style 目录报错的问题 [#1053](https://github.com/ZhongAnTech/zarm/pull/1053)\n\n## v3.0.0\n\n- Feature\n\n  - 新增组件：Grid 宫格、WaterMark 水印、Skeleton 骨架屏、Rate 评分、Image 图片\n  - 新增 hooks 组件：useClickAway 单击外部跟踪器、useInViewport 进入浏览器窗口、useLongPress 长按、useOrientation 屏幕方向、useScroll 滚动\n\n- Break Change\n\n  - [ActivityIndicator]\n    - `ActivityIndicator` 组件更名为 `Loading`\n  - [Loading]\n    - 原 `Loading` 组件合并至 `Toast` 组件，通过设置 `icon` 为 `loading` 来实现\n  - [ConfigProvider]\n    - 组件样式设置作用域修正为当前节点下（非全局）\n    - 增加适配安全区域\n    - 增加组件 `css` 变量设置\n    - 增加组件挂载节点的 `mountContainer`\n    - 增加组件类名前缀 `prefixCls` 设置\n  - [Input]\n    - 拆分使用到虚拟键盘的自定义输入框组件 `CustomInput`\n    - 触发的事件入参由 value 值改为 event，受影响的事件有 `onChange` `onFocus` `onBlur` `onFocus`\n    - 删除 `onClear` 事件，点击重置按钮请空值将触发 `onChange` 事件\n    - 抽离自定义输入框 `CustomInput`, 配合 `KeyBoard` 扩展自定义输入框\n    - 增加属性 `label`，用于设置标签栏\n  - [Cell]\n    - 变更为 List 和 List.Item 组件，样式结构调整\n    - 属性 `icon` 变更为 `prefix`\n    - 属性 `description` 变更为 `after`\n    - 属性 `help` 变更为 `info`\n    - 属性 `title` 字体大小变更为 17px\n  - [Checkbox]\n    - Group\n      - 属性 `type` 可选值 `cell` 变更为 `list`\n      - 删除属性 `size`、`shape`、`ghost`\n      - 新增属性 `iconAlign` ，用于设置列表类型时标记的位置\n  - [Radio]\n    - Group\n      - 属性 `type` 可选值 `cell` 变更为 `list`\n      - 删除属性 `size`、`shape`、`ghost`\n      - 新增属性 `listIconAlign` ，用于设置列表类型时标记的位置\n  - [Select & DateSelect]\n    - 移除属性 `hasArrow`，默认展示箭头\n  - [NoticeBar]\n    - 新增属性 `onClose`，关闭触发的回调函数\n    - 修复关闭后只移除了 `Message` 组件，根节点没有被移除的 bug\n  - [Message]\n    - 移除属性 `size`，及相关样式\n    - 新增属性 `onClose`，关闭触发的回调函数\n  - [ImagePreview]\n    - 支持横屏下查看图片\n  - [Modal]\n    - 支持开启状态下锁定背景滚动\n  - [Popup]\n    - 新增属性 `forceRender`，用于强制渲染内容\n  - [Badge]\n    - 移除属性 `theme`，颜色设置通过 css 变量 --background 来定义\n    - 新增属性 `bordered` ，用于判断徽标是否有边框\n  - [SearchBar]\n    - 输入框事件变更为与原生 `input` 保持一致，如 `onChange`、`onFocus`、`onBlur` 等\n    - 删除 `onClear` 事件，点击重置按钮请空值将触发 `onChange` 事件\n  - [Slider]\n    - 支持点击，移动到点击位置\n    - 新增属性 `onSlideChange` ，滑动时触发\n  - [Toast]\n    - 变更为仅支持指令式调用，详细用法参见官网文档\n  - [BackTop]\n    - `BackToTop` 组件更名为 `BackTop`\n    - 新增属性 `mountContainer` ，用于设置组件挂载节点\n  - [Badge]\n    - 移除属性 `theme`，颜色设置通过 css 变量 --background 来定义\n    - 新增属性 `bordered` ，用于判断徽标是否有边框\n  - [Mask]\n    - 移除属性 `type`\n    - 新增属性 `color` 用户设置颜色\n    - 新增属性 `opacity` 用于设置透明度\n  - [StackPicker]\n    - `StackPicker` 组件更名为 `Cascader`\n  - [Picker & PickerView]\n    - 移除属性 `valueMember`，替换为 `fieldNames` 支持自定义 label、value、children 的字段\n  - [DatePicker & DatePickverView]\n    - 移除属性 `mode`，新增 `columnType` 属性来控制日期时间的模式\n    - 移除属性 `minuteStep`，新增 `filter` 属性用于过滤选项值\n  - [SwipeAction]\n    - `leftActions/rightActions` onClick 事件支持异步\n\n## v2.9.15\n\n- Bug Fix\n\n  - [ActivityIndicator] 修复 scss 编译问题。[#911](https://github.com/ZhongAnTech/zarm/pull/911)\n\n## v2.9.14\n\n- Bug Fix\n\n  - [Input] 修复 `clearable` 为 `false` 状态下依然显示了清除按钮的 bug。[#880](https://github.com/ZhongAnTech/zarm/pull/880)\n\n  - [Affix] 修复浮动元素在滚动过程节点更新导致异常表现的 bug。[#905](https://github.com/ZhongAnTech/zarm/pull/905)\n\n  - [DateSelect] 修复 `datetime` 和 `time` 模式下，日期时间格式的兼容问题。[#907](https://github.com/ZhongAnTech/zarm/pull/907)\n\n- Perf\n\n  - [ActivityIndicator] 优化传统菊花状指示器 scss 计算方式。[#a8b3a43](https://github.com/ZhongAnTech/zarm/commit/a8b3a439bde93045db05b3047a7cf74e2f2bebf7)\n\n## v2.9.13\n\n- Bug Fix\n\n  - [Trigger] 修复 Array.includes 兼容问题。[#e048c3d](https://github.com/ZhongAnTech/zarm/commit/e048c3d0aa841d405ce314a63bb480f58c12b8c7)\n\n## v2.9.12\n\n- Bug Fix\n\n  - [SwipeAction] 修复内容超出区域的 bug。[#772](https://github.com/ZhongAnTech/zarm/pull/772)\n  - [Popup] 修复服务端渲染时，进入页面默认开启弹层的情况下报错的 bug。[#798](https://github.com/ZhongAnTech/zarm/pull/798)\n  - [Affix] 修复服务端渲染时报错的 bug。[#807](https://github.com/ZhongAnTech/zarm/pull/807)\n  - [Tabs] 修复 tab 项动态渲染时返回 null 或者 undefined 出错的 bug。[#836](https://github.com/ZhongAnTech/zarm/pull/836)\n  - [Icon] 修复 iconfont 的使用方式在 vite 生产环境下报错的 bug。[#834](https://github.com/ZhongAnTech/zarm/pull/834)\n  - [Progress] 修复当 percent 属性为 null 时进度展示有误的 bug。[#839](https://github.com/ZhongAnTech/zarm/pull/839)\n\n- Perf\n\n  - [Popper] 优化内部使用的 Array.prototype.includes 不兼容的方法。[#5344d0b](https://github.com/ZhongAnTech/zarm/commit/5344d0b6d6b93bf2604c496030b4a24053f18aac)\n\n## v2.9.9\n\n- Bug Fix\n\n  - [Popup] 修复当 mountContainer 为 `false` 时，丢失容器 div 的 bug。[#769](https://github.com/ZhongAnTech/zarm/issue/769)\n\n## v2.9.8\n\n- Bug Fix\n\n  - [Pull] 修复当 window 作为滚动容器时，触发事件的临界点判断错误的 bug。[#760](https://github.com/ZhongAnTech/zarm/pull/760)\n\n## v2.9.7\n\n- Bug Fix\n\n  - [Keyboard] 修复长按删除按钮会陷入死循环（重复执行删除操作且松开后无法退出）的 bug。[#745](https://github.com/ZhongAnTech/zarm/pull/745)[@Confettis]\n\n## v2.9.6\n\n- Bug Fix\n\n  - [Calendar] 修复日历组件不支持国际化的 bug。[#738](https://github.com/ZhongAnTech/zarm/pull/738)\n\n## v2.9.5\n\n- Bug Fix\n\n  - 修复 Loading 和 Toast 静态方法使用后实例未销毁的 bug。[#710](https://github.com/ZhongAnTech/zarm/issues/710)\n  - [Pull] 修复因滚动容器变更导致原有容器事件监听未解除的 bug。[#734](https://github.com/ZhongAnTech/zarm/issues/734)\n\n## v2.9.4\n\n- Bug Fix\n\n  - [Collapse] 修复同时设置 activeKey 和 defaultActiveKey 属性属性导致的 bug。[#698](https://github.com/ZhongAnTech/zarm/pull/698)\n\n  - [Modal] 修复 Modal 静态方法 `Modal.confirm` 和 `Modal.alert` 使用后实例未销毁的 bug。[#710](https://github.com/ZhongAnTech/zarm/issues/710)\n\n- Perf\n  - [Button] 优化按钮点击 300ms 延时。[#701](https://github.com/ZhongAnTech/zarm/pull/701)\n\n## v2.9.3\n\n- Bug Fix\n\n  - [Button] 修复 primary 主题下 loading 状态活动指示器不可见的 bug。[#692](https://github.com/ZhongAnTech/zarm/pull/692)\n\n## v2.9.2\n\n- Bug Fix\n\n  - [Input] 修复使用了过时的 `Icon` API，导致编译出错的 bug。[#653](https://github.com/ZhongAnTech/zarm/pull/653)\n\n## v2.9.1\n\n- Bug Fix\n\n  - [Input] 修复包含虚拟键盘的 `Input` 无法在外部获取焦点的 bug。[#638](https://github.com/ZhongAnTech/zarm/pull/638)\n  - [Picker] 修复因低版本 `better-scroll` 引起的快速点确定按钮无法正确取值的问题。[#649](https://github.com/ZhongAnTech/zarm/pull/649)\n\n- Perf\n\n  - 增加 @babel/runtime 依赖，以满足在 [vite](https://github.com/vitejs/vite) 中使用的场景。[#636](https://github.com/ZhongAnTech/zarm/pull/636)\n  - [Carousel] 优化滑动后出现闪烁的问题。[#647](https://github.com/ZhongAnTech/zarm/pull/647) [#648](https://github.com/ZhongAnTech/zarm/pull/648) [@jianhuagao]\n\n## v2.9.0\n\n- Bug Fix\n\n  - [ImagePreview] 修复组件异步获取数据报错的 bug。[#613](https://github.com/ZhongAnTech/zarm/pull/613)\n  - [DatePickerView] 修复当 `mode="date"` 展示错误的 bug。[#624](https://github.com/ZhongAnTech/zarm/pull/624)\n  - [ConfigProvider] 修复服务端渲染时报的 `document is not defined` 的 bug。[#631](https://github.com/ZhongAnTech/zarm/pull/631)\n\n- Perf\n\n  - [ImagePreview] 异步获取数据时增加 loading 用于等待图片加载。[#615](https://github.com/ZhongAnTech/zarm/pull/615)\n  - [Message] 优化消息组件可点区域的鼠标显示状态。[#445a935](https://github.com/ZhongAnTech/zarm/commit/445a935a9f4a756b6aa455e147999148e2df1af2)\n\n- Feature\n\n  - [@zarm-design/icons] 抽离内置的 Icon 图标，独立成新的包 [@zarm-design/icons](https://github.com/ZhongAnTech/zarm/tree/master/packages/zarm-icons) 来管理。[#e4db8e2](https://github.com/ZhongAnTech/zarm/commit/e4db8e2a102ecf8ef2edfd098c2326cb832665c9)\n\n## v2.8.2\n\n- Bug Fix\n\n  - [Affix] 修复部分浏览器无法获取节点报错的 bug。[#605](https://github.com/ZhongAnTech/zarm/pull/605)\n  - [SwipeAction] 修复点击按钮后没有自动关闭的 bug。[#6133a8c](https://github.com/ZhongAnTech/zarm/commit/6133a8ceb82615b53564cbd3df28eb52f7956d38)\n  - [DateSelect] 修复在 PC 端部分浏览器报错的 bug。[#608](https://github.com/ZhongAnTech/zarm/pull/608)\n  - [StackPicker] 修复受控组件下内部设置了 `visible` 的状态导致的 bug。[#609](https://github.com/ZhongAnTech/zarm/pull/609)\n\n- Perf\n\n  - [Affix] 优化节流参数，让滚动过程更加流畅。[#fa29e5f](https://github.com/ZhongAnTech/zarm/commit/fa29e5f546e5d27f39a32799ea0a3339c390e1fd)\n  - 优化部分组件 `Passive Event Listeners` 引起的浏览器控制台报错。[#606](https://github.com/ZhongAnTech/zarm/pull/606) [#9104d57](https://github.com/ZhongAnTech/zarm/commit/9104d576f81f049c036cef9be67cb019d55293f4) [@leonwgc]\n\n## v2.8.0\n\n- Bug Fix\n\n  - [LocaleProvider] 修复在使用 `babel-plugin-import` 插件的情况下样式文件缺失的 bug。[#882bd5c](https://github.com/ZhongAnTech/zarm/commit/882bd5c1bc088281fd46ae1008cc25f92c263838)\n  - [StackPicker] 修复选项列表背景缺失的 bug。[#132d435](https://github.com/ZhongAnTech/zarm/commit/132d4353294d1f78e067c28794a121049c12d201)\n  - [StackPicker] 修复缺少国际化语言包功能。[#f528fc5](https://github.com/ZhongAnTech/zarm/commit/f528fc53fe89e18c40e04e778bf0ae7827076dae)\n  - [FilePicker] 修复包含的子组件 `className` 的属性值被修改为 `needsclick`, 改为追加该值。[#592](https://github.com/ZhongAnTech/zarm/pull/592)\n  - 修复部分组件缺少 `className` 属性的 bug。[#be465f0](https://github.com/ZhongAnTech/zarm/commit/be465f03c365d47662695ce8654ab4a6d4533cd3)\n\n## v2.7.3\n\n- Bug Fix\n\n  - [StackPicker] 修复文字长度较大时因丢失层叠背景色导致重叠的 bug。[#132d435](https://github.com/ZhongAnTech/zarm/commit/132d4353294d1f78e067c28794a121049c12d201)\n  - [Stepper] 修复在 Cell 中使用的 Stepper 组件，因与 `Input` 样式冲突导致无法显示输入框的值的 bug。[#055f50f](https://github.com/ZhongAnTech/zarm/commit/055f50fdaf97d56f6d8d5c76f79e7233c6f5b48b)\n\n- Perf\n  - 设置部分样式单位为 `PX`, 使得在 rem 适配方案下，部分特殊场景的 `px` 将不被转换为 `rem`，如 1px 分割线、1px 边框等。[#8c4f8cb](https://github.com/ZhongAnTech/zarm/commit/8c4f8cbababb4e31c048c704f044158f3a3074c0)\n\n## v2.7.2\n\n- Bug Fix\n  - [Input] 修复 `value` 为 `null` 值时，出现错误的 bug。[#554](https://github.com/ZhongAnTech/zarm/pull/554)\n\n## v2.7.1\n\n- Bug Fix\n  - [DatePicker, Picker] 修复 `DOM` 结构没有随着 `props` 的改变而更新，导致滑动出现问题的 bug。[#552](https://github.com/ZhongAnTech/zarm/pull/552)\n\n## v2.7.0\n\n- Bug Fix\n\n  - [Button] 修复链接按钮的行高不正确的 BUG。[#13370c4](https://github.com/ZhongAnTech/zarm/commit/13370c412b88f5d542e24d113256caf8765d5145)\n  - [Tooltip] 修复内容为空时渲染异常的 BUG。[#28a16f9](https://github.com/ZhongAnTech/zarm/commit/28a16f9a62c1036cfd1fce64a15e8da068da6d8e)\n  - [Tabs] 修复包含 `scrollable` 属性在设置异步数据时出错的 BUG。[#520](https://github.com/ZhongAnTech/zarm/pull/520)\n  - [Popup] 修复弹出动画执行异常的情况。[#3473207](https://github.com/ZhongAnTech/zarm/commit/3473207c96ed018284915ded6cb098ed99e87f51)\n  - [ImagePreview] 修复在长图情况下无法滚动预览的 BUG。[#533](https://github.com/ZhongAnTech/zarm/pull/533)[@pandanxin]\n  - [Input] 修复 `placeholder` 占位符的颜色不统一的 BUG。[#5626247](https://github.com/ZhongAnTech/zarm/commit/562624703a7acc30c071722306e1c8aaaaefab8a)\n  - [Input] 修复数字输入框默认值为 0 时不显示的 BUG。[#536](https://github.com/ZhongAnTech/zarm/pull/536)\n  - [Carousel] 走马灯自动播放在触碰后会停止，无法恢复的 BUG。[#543](https://github.com/ZhongAnTech/zarm/pull/543)\n\n- Perf\n\n  - [Collapse] 重构折叠面板，优化箭头动画。[#838629a](https://github.com/ZhongAnTech/zarm/commit/838629a13a4bb348799d5f171e78a99345f6ed1d)\n  - [Carousel] 优化走马灯组件纵向对齐方式，调整为顶部对齐。[#fed4b22](https://github.com/ZhongAnTech/zarm/commit/fed4b2222541db79a9237669f6747da26d41b04e)\n  - [Picker, DatePicker] 优化选值机制，当滚轮滚动时，点击确定按钮后动画自动停止并且选择当前值。[#544](https://github.com/ZhongAnTech/zarm/pull/544)\n  - [Input] 虚拟键盘光标高度优化。[#4668c47](https://github.com/ZhongAnTech/zarm/commit/4668c4797ef09497fb3d7f3e179f263725be527c)\n\n- Feature\n  - 抽离更多的 css 变量用于样式配置。[#74de78a](https://github.com/ZhongAnTech/zarm/commit/74de78a299b69b4624746163092cdc218c4913ea)\n  - 支持暗黑模式。[#60433a9](https://github.com/ZhongAnTech/zarm/commit/60433a910e215b230bd2aa5eb4dba2cec1fb594c)\n  - [ConfigProvider] 新增全局配置组件，国际化组件 `LocaleProvider` 设置为不推荐使用，将逐步下线。[#a50a418](https://github.com/ZhongAnTech/zarm/commit/a50a41804be04066d835ffdac8318b5ad4b82eed)\n  - [Popup] 支持键盘操作 `esc` 关闭弹窗。[#538](https://github.com/ZhongAnTech/zarm/pull/538)\n  - [Stepper] 支持输入框可以选择虚拟键盘的类型。[#541](https://github.com/ZhongAnTech/zarm/pull/541)\n\n## v2.6.1\n\n- Perf\n  - 优化打包结果，减小打包体积。[#6c37b92](https://github.com/ZhongAnTech/zarm/commit/6c37b92d69895c03696e1aaebf1ee2661e679625)\n\n## v2.6.0\n\n- Bug Fix\n\n  - 修复 ES modules 下出现类型引用错误。[#cde1469](https://github.com/ZhongAnTech/zarm/commit/cde14695132612d49bcf3bf165ea331cbf2c6a1a)\n\n- Perf\n  - [Tabs] `value`值的边界优化。[#503](https://github.com/ZhongAnTech/zarm/issues/503)\n  - 优化部分组件的 typescript 类型定义。\n\n## v2.5.6\n\n- Bug Fix\n\n  - [Tabs] 修复滚动边界判断时的问题。[#498](https://github.com/ZhongAnTech/zarm/pull/498)\n  - [TabBar] 修复按需加载组件时，丢失 Badge 组件的样式的问题。[#501](https://github.com/ZhongAnTech/zarm/pull/501)\n\n- Perf\n  - [Input] 优化虚拟键盘的鼠标定位，获取焦点自动定位到内容的尾部。[#1dca23f](https://github.com/ZhongAnTech/zarm/commit/1dca23f0d8b1a8b74902d13977423406b06c2a14)\n  - [Input] 兼容原生 input 的类型，如`<input type="tel" />`等。[#a057caa](https://github.com/ZhongAnTech/zarm/commit/a057caa0f53234b95500c192fcb9f72a949e2402)\n\n## v2.5.5\n\n- Feature\n\n  - [Tabs] 支持纵向显示。[#486](https://github.com/ZhongAnTech/zarm/pull/486)\n\n- Break Change\n\n  - [Tabs] 删除 `scrollThreshold` 属性，改为由 `scrollable` 属性判断是否支持滚动。\n\n- Bug Fix\n  - 修复服务端渲染时出现的 `window is not defined` 的错误。[#6375267](https://github.com/ZhongAnTech/zarm/commit/6375267e3cb3fd4ea2c4c389a9332bea499442c5) [#495](https://github.com/ZhongAnTech/zarm/pull/495)\n\n## v2.5.2\n\n- Bug Fix\n\n  - [Pull] 修复下拉刷新状态为`加载成功` 或 上拉加载状态为`加载失败`时，Pull 存在内存泄漏的 bug。[#487](https://github.com/ZhongAnTech/zarm/pull/487)\n\n- Perf\n\n  - 重构 DOM 操作工具库。[#f098d4a](https://github.com/ZhongAnTech/zarm/commit/f098d4a18d43407d79823ad5e6c7f0211cbec080)。\n  - 优化调整各组件 `z-index` 堆叠顺序的 css 变量。[#00e0202](https://github.com/ZhongAnTech/zarm/commit/00e0202ad8a4bd2250d2226293804c022f19c613)\n\n  ```css\n  --zindex-mask: 1000;\n  --zindex-popup: 1100;\n  --zindex-tooltip: 1700;\n  ```\n\n## v2.5.1\n\n- Bug Fix\n  - [Popup] 修复因增加 API 过期警告导致无法自定义挂载节点的 bug。[#482](https://github.com/ZhongAnTech/zarm/pull/482)\n  - [Calendar] 修复因日期计算问题导致出现重复月份的 bug。[#483](https://github.com/ZhongAnTech/zarm/pull/483)\n\n## v2.5.0\n\n- Feature\n\n  - [ImagePreview] 新增图片预览组件。[#475](https://github.com/ZhongAnTech/zarm/pull/475)\n\n- Perf\n  - [Pull] 优化下拉刷新用户体验。[#0171d0d](https://github.com/ZhongAnTech/zarm/commit/dede711af890485b981de5ffc9b22d690ed23a25)\n    - 下拉后放手回弹增加动画效果。\n    - 修改下拉距离衰减比例，由 2 倍 改为 3 倍。\n    - 修改触发距离阀值属性 `distance` 默认值由 50 变为 30。\n  - [Tabs] 选中项增加样式类名 `.za-tabs__tab--active`，方便外部样式复写。[#0445eeb](https://github.com/ZhongAnTech/zarm/commit/0d1ef242c1142a95a4211dd7ef59b69e538e5f82)\n\n## v2.4.0\n\n- Feature\n  - [Tabs] 新增 `scrollThreshold` 属性设置启用横向滚动的标签页数阀值，用于支持通过左右滚动展示超出屏幕宽度的标签页。[#470](https://github.com/ZhongAnTech/zarm/pull/470)\n  - [StackPicker] 新增层叠选择器组件。[#474](https://github.com/ZhongAnTech/zarm/pull/474)\n\n## v2.3.4\n\n- Bug Fix\n  - [Pull] 修复在 iOS 12 版本下出现无法上滑拖动滚动条的 bug。[#472](https://github.com/ZhongAnTech/zarm/pull/472)\n\n## v2.3.3\n\n- Bug Fix\n  - [Input] 修复数字键盘因点击过快导致出现卡顿，丢失输入数据的 bug。[#464](https://github.com/ZhongAnTech/zarm/pull/464)\n\n## v2.3.1\n\n- Bug Fix\n  - [Keyboard] 修复身份证号类型的键盘问题，`x` 的改为大写 `X`。[#460](https://github.com/ZhongAnTech/zarm/pull/460)\n\n## v2.3.0\n\n- Bug Fix\n\n  - [BackToTop] 修复点击返回顶部时触发的 `onScroll` 事件，在安卓低版本不兼容的问题。[#455](https://github.com/ZhongAnTech/zarm/pull/455)\n  - [Input] 修复 Input 值为 undefined 时异常显示的 bug。[#459](https://github.com/ZhongAnTech/zarm/pull/459)\n  - [Input] 修复 Input 作为受控组件时出现异常的 bug。[#459](https://github.com/ZhongAnTech/zarm/pull/459)\n\n- Break Change\n\n  - [ActionSheet, Alert, Confirm, Popup, Pciker, Select, DatePicker, DateSelect, KeyboardPicker, Loading, Modal, Toast] 修复包含挂载容器的组件，设置自定义 className 属性时挂载位置不正确的 bug，修改为统一挂载外层容器中。[#456](https://github.com/ZhongAnTech/zarm/pull/456)\n\n- Perf\n  - 优化 es 模块打包编译。[#e3e451a](https://github.com/ZhongAnTech/zarm/commit/e3e451a861e7f7587433c490d865e2a3e4d820cd)\n\n## v2.2.0\n\n- Feature\n\n  - [Input] 多行文本设置高度自适应时，删除内容支持自动缩小高度。[#445](https://github.com/ZhongAnTech/zarm/pull/445)\n  - [BackToTop] 新增 `BackToTop` 返回顶部组件。[#449](https://github.com/ZhongAnTech/zarm/pull/449)\n\n- Documentation Updated\n  - 样例支持 React Hooks。[#446](https://github.com/ZhongAnTech/zarm/pull/446)\n\n## v2.1.1\n\n- Feature\n\n  - [Cell] 优化设置了 `help` 属性后，提示信息区域的样式显示。[#439](https://github.com/ZhongAnTech/zarm/pull/439)\n\n- Bug Fix\n  - [Loading, Toast] 修复异步执行无法关闭的 bug。[#429](https://github.com/ZhongAnTech/zarm/pull/429)\n  - [Loading, Toast] 修复切换路由后不会消失的 bug。[#436](https://github.com/ZhongAnTech/zarm/pull/436)\n  - [Popper] 修复非浏览器环境下使用报错问题。[#435](https://github.com/ZhongAnTech/zarm/pull/435)\n  - [Pull] 修复 vivo 手机中使用 `Div` 作为容器，下拉操作会把整个网页一起拖动的 bug。[#444](https://github.com/ZhongAnTech/zarm/pull/444)\n\n## v2.1.0\n\n- Feature\n\n  - [Popper] 优化气泡层动画，增加菜单拉伸 `menuSlide` 动画。[#400](https://github.com/ZhongAnTech/zarm/pull/400)\n  - [Select] 支持数字和布尔值类型的值。[#418](https://github.com/ZhongAnTech/zarm/pull/418)\n\n- Break Change\n\n  - [Checkbox, Radio] 调整禁用状态下的样式，变更为浅灰色背景框，深灰色勾选。[ed04500](https://github.com/ZhongAnTech/zarm/commit/ed04500a1199394e979fc86663932f0281ce2662)\n  - [NoticeBar] 删除`scrollable`属性，内容宽度超过 NoticeBar 的宽度会默认支持自动滚动，否则为固定展示。[#420](https://github.com/ZhongAnTech/zarm/pull/420)\n\n- Bug Fix\n\n  - [Input] 修复多行文本修改 `readonly` 属性导致组件崩溃的 bug。[#407](https://github.com/ZhongAnTech/zarm/pull/407)\n  - [Input] 修复多行文本直接通过 `value` 属性修改值时, 字数不会重新计算的 bug。[510deb6](https://github.com/ZhongAnTech/zarm/commit/510deb68ed1d4955f86cec254474f08c061ae59a)\n  - [Input] 修复禁用状态下，手机端无法显示值的 bug。[593b974](https://github.com/ZhongAnTech/zarm/commit/593b974b5665acda02685756def9d43b972f8602)\n  - [Input] 修复数字、金额输入框，值为 number 类型时无法删除的 bug。[#428](https://github.com/ZhongAnTech/zarm/pull/428)\n  - [Pull] 修复获取滚动容器节点的计算在某些场景下不正确。[#421](https://github.com/ZhongAnTech/zarm/pull/421)\n  - [SearchBar] 修复切换英文语言后，搜索框的取消按钮不能完全隐藏的 bug。[1de1596](https://github.com/ZhongAnTech/zarm/commit/1de159696a5fbb68aa496b3c4ad923740eb7c337)\n  - [Tabs] 修复 Tabs.Panel 的类型定义错误。[#415](https://github.com/ZhongAnTech/zarm/pull/415)[@vdfor]\n\n- Documentation Updated\n  - [#399](https://github.com/ZhongAnTech/zarm/pull/399)[@xueqingxiao]\n\n## v2.0.0\n\n- Feature\n\n  - 新增对 typescript 的支持。\n  - 新增支持组件的 按需加载（可配合`babel-plugin-import`插件实现）\n  - 新增`Toast`单例模式的应用。\n  - 新增组件：\n    - 模拟键盘 `Keyboard`\n    - 模拟键盘拾取器 `KeyboardPicker`\n    - 工具提示 `Tooltip`\n    - 折叠面板 `Collapse`\n    - 搜索框 `SearchBar`\n    - 日历 `Calendar`\n    - 导航栏 `NavBar`\n    - 标签栏 `TabBar`\n    - 国际化组件 `LocaleProvider`\n\n- Break Change\n\n  - 调整主题样式变量名及引入方式，具体参考 README 使用帮助。\n  - 删除`info`主题色。\n  - 优化`Button`组件 active 状态的交互\n  - 调整`Picker`组件的使用方式，拆分成`PickerView`、`Picker`、`Select`三种场景的实现。\n  - 调整`DatePicker`组件的使用方式，拆分成`DatePickerView`、`DatePicker`、`DateSelect`三种场景的实现。\n  - 调整`Pull`组件的 API。\n  - 调整`ActionSheet`组件的默认样式。\n  - `Alert`和`Confirm`组件挂在到`Modal`组件的静态方法下，`Modal.alert()`和`Modal.confirm()`。\n  - 组件更名：\n    - 文件选择器 `Uploader` 组件更名为 `FilePicker`\n    - 手风琴 `Accordion` 组件更名为 `Collapse`\n    - 活动指示器 `Spinner` 组件更名为 `ActivityIndicator`\n    - 标签页 `Tab` 组件更名为 `Tabs`\n    - 走马灯 `Swipe` 组件更名为 `Carousel`\n\n- Bug Fix\n  - 修复组件`Input`类型为 textarea 时内容换行符字符数计算错误的 bug。[6f6ccd6](https://github.com/ZhongAnTech/zarm/commit/cc6924b4f4c3cb0717fd5bf24e3cd94ac7695f59)\n  - 修复组件`Pull`不兼容自定义 scroll 容器的 bug。[a9084cc](https://github.com/ZhongAnTech/zarm/commit/a9084cc0eba7b92cff7eb712e77ee43bf597f887)\n  - 修复组件`Swipe`手动拖拽时，同时触发了滚动条滚动后，不能执行 touchend 事件里动画的 bug。[62a96d8](https://github.com/ZhongAnTech/zarm/commit/62a96d8089f9d0f015d642f24077aaef585aa278)\n'}}]);