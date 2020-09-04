module.exports = {
  form: [
    // {
    //   title: 'Input',
    //   description: '文本框 Input',
    //   module: require('./pages/InputPage'),
    // },
    // {
    //   title: 'Radio',
    //   description: '单选框 Radio',
    //   module: require('./pages/RadioPage'),
    // },
    // {
    //   title: 'Checkbox',
    //   description: '复选框 Checkbox',
    //   module: require('./pages/CheckboxPage'),
    // },
    // {
    //   title: 'Picker',
    //   description: '选择器 Picker & Select',
    //   module: require('./pages/PickerPage'),
    // },
    // {
    //   title: 'DatePicker',
    //   description: '日期选择器 DatePicker & DateSelect',
    //   module: require('./pages/DatePickerPage'),
    // },
    // {
    //   title: 'Slider',
    //   description: '滑动输入条 Slider',
    //   module: require('./pages/SliderPage'),
    // },
    {
      title: 'Stepper',
      description: '步进器 Stepper',
      module: require('./pages/StepperPage'),
    },
    // {
    //   title: 'Switch',
    //   description: '开关 Switch',
    //   module: require('./pages/SwitchPage'),
    // },
    // {
    //   title: 'SearchBar',
    //   description: '搜索栏 SearchBar',
    //   module: require('./pages/SearchBarPage'),
    // },
    {
      title: 'FilePicker',
      description: '文件选择器 FilePicker',
      module: require('./pages/FilePickerPage'),
    },
  ],
  feedback: [
    {
      title: 'Button',
      description: '按钮 Button',
      module: require('./pages/ButtonPage'),
    },
    {
      title: 'ActionSheet',
      description: '动作面板 ActionSheet',
      module: require('./pages/ActionSheetPage'),
    },
    // {
    //   title: 'Message',
    //   description: '消息 Message',
    //   module: require('./pages/MessagePage'),
    // },
    // {
    //   title: 'Modal',
    //   description: '模态框 Modal',
    //   module: require('./pages/ModalPage'),
    // },
    // {
    //   title: 'Toast',
    //   description: '轻提示 Toast',
    //   module: require('./pages/ToastPage'),
    // },
    // {
    //   title: 'Pull',
    //   description: '上拉加载下拉刷新 Pull',
    //   module: require('./pages/PullPage'),
    // },
    {
      title: 'SwipeAction',
      description: '滑动操作 SwipeAction',
      module: require('./pages/SwipeActionPage'),
    },
    {
      title: 'Message',
      description: '消息 Message',
      module: require('./pages/MessagePage'),
    },
    // {
    //   title: 'ActivityIndicator',
    //   description: '活动指示器 ActivityIndicator',
    //   module: require('./pages/ActivityIndicatorPage'),
    // },
  ],
  view: [
    // {
    //   title: 'Collapse',
    //   description: '折叠面板 Collapse',
    //   module: require('./pages/CollapsePage'),
    // },
    {
      title: 'Badge',
      description: '徽标 Badge',
      module: require('./pages/BadgePage'),
    },
    {
      title: 'Cell',
      description: '列表项 Cell',
      module: require('./pages/CellPage'),
    },
    // {
    //   title: 'Icon',
    //   description: '图标 Icon',
    //   module: require('./pages/IconPage'),
    // },
    // {
    //   title: 'Swipe',
    //   description: '走马灯 Carousel',
    //   module: require('./pages/CarouselPage'),
    // },
    // {
    //   title: 'Progress',
    //   description: '进度条 Progress',
    //   module: require('./pages/ProgressPage'),
    // },
    {
      title: 'NoticeBar',
      description: '通告栏 NoticeBar',
      module: require('./pages/NoticeBarPage'),
    },
    {
      title: 'Panel',
      description: '面板 Panel',
      module: require('./pages/PanelPage'),
    },
    {
      title: 'Collapse',
      description: '折叠面板 Collapse',
      module: require('./pages/CollapsePage'),
    },
  ],
  navigation: [
    {
      title: 'Popup',
      description: '弹出框 Popup',
      module: require('./pages/PopupPage'),
    },
    // {
    //   title: 'Tabs',
    //   description: '标签页 Tabs',
    //   module: require('./pages/TabsPage'),
    // },
  ],
};
