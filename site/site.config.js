module.exports = {
  documents: [
    {
      name: 'QuickStart',
      description: '快速上手',
      module: () => import('@/README.md'),
    },
    {
      name: 'ChangeLog',
      description: '更新日志',
      module: () => import('@/CHANGELOG.md'),
    },
  ],
  components: {
    form: [
      {
        name: 'Input',
        description: '文本框',
        module: () => import('@/components/input/demo.md'),
      },
      {
        name: 'Radio',
        description: '单选框',
        module: () => import('@/components/radio/demo.md'),
      },
      {
        name: 'Checkbox',
        description: '复选框',
        module: () => import('@/components/checkbox/demo.md'),
      },
      {
        name: 'Picker',
        description: '选择器',
        module: () => import('@/components/picker/demo.md'),
      },
      {
        name: 'DatePicker',
        description: '日期选择器',
        module: () => import('@/components/date-picker/demo.md'),
      },
      {
        name: 'Calendar',
        description: '日历',
        module: () => import('@/components/calendar/demo.md'),
      },
      {
        name: 'Slider',
        description: '滑动输入条',
        module: () => import('@/components/slider/demo.md'),
      },
      {
        name: 'Stepper',
        description: '步进器',
        module: () => import('@/components/stepper/demo.md'),
      },
      {
        name: 'Switch',
        description: '开关',
        module: () => import('@/components/switch/demo.md'),
      },
      {
        name: 'SearchBar',
        description: '搜索栏',
        module: () => import('@/components/search-bar/demo.md'),
      },
      {
        name: 'FilePicker',
        description: '文件选择器',
        module: () => import('@/components/file-picker/demo.md'),
      },
      {
        name: 'Keyboard',
        description: '虚拟键盘',
        module: () => import('@/components/keyboard/demo.md'),
      },
    ],
    feedback: [
      {
        name: 'Button',
        description: '按钮',
        module: () => import('@/components/button/demo.md'),
      },
      {
        name: 'ActionSheet',
        description: '动作面板',
        module: () => import('@/components/action-sheet/demo.md'),
      },
      {
        name: 'Message',
        description: '消息',
        module: () => import('@/components/message/demo.md'),
      },
      {
        name: 'Modal',
        description: '模态框',
        module: () => import('@/components/modal/demo.md'),
      },
      {
        name: 'Toast',
        description: '轻提示',
        module: () => import('@/components/toast/demo.md'),
      },
      {
        name: 'Pull',
        description: '上拉加载下拉刷新',
        module: () => import('@/components/pull/demo.md'),
      },
      {
        name: 'SwipeAction',
        description: '滑动操作',
        module: () => import('@/components/swipe-action/demo.md'),
      },
      {
        name: 'ActivityIndicator',
        description: '活动指示器',
        module: () => import('@/components/activity-indicator/demo.md'),
      },
    ],
    view: [
      {
        name: 'Collapse',
        description: '折叠面板',
        module: () => import('@/components/collapse/demo.md'),
      },
      {
        name: 'Badge',
        description: '徽标',
        module: () => import('@/components/badge/demo.md'),
      },
      {
        name: 'Cell',
        description: '列表项',
        module: () => import('@/components/cell/demo.md'),
      },
      {
        name: 'Icon',
        description: '图标',
        module: () => import('@/components/icon/demo.md'),
      },
      {
        name: 'Carousel',
        description: '走马灯',
        module: () => import('@/components/carousel/demo.md'),
      },
      {
        name: 'Progress',
        description: '进度条',
        module: () => import('@/components/progress/demo.md'),
      },
      {
        name: 'NoticeBar',
        description: '通告栏',
        module: () => import('@/components/notice-bar/demo.md'),
      },
      {
        name: 'Panel',
        description: '面板',
        module: () => import('@/components/panel/demo.md'),
      },
      {
        name: 'Marquee',
        description: '滚动',
        module: () => import('@/components/marquee/demo.md'),
      },
      {
        name: 'Popper',
        description: '气泡层',
        module: () => import('@/components/popper/demo.md'),
      },
      {
        name: 'Tooltip',
        description: '文字提示',
        module: () => import('@/components/tooltip/demo.md'),
      },
    ],
    navigation: [
      {
        name: 'Popup',
        description: '弹出框',
        module: () => import('@/components/popup/demo.md'),
      },
      {
        name: 'Tabs',
        description: '标签页',
        module: () => import('@/components/tabs/demo.md'),
      },
      {
        name: 'NavBar',
        description: '导航栏',
        module: () => import('@/components/nav-bar/demo.md'),
      },
      {
        name: 'TabBar',
        description: '标签栏',
        module: () => import('@/components/tab-bar/demo.md'),
      },
    ],
    other: [
      {
        name: 'LocaleProvider',
        description: '国际化',
        module: () => import('@/components/locale-provider/demo.md'),
      },
    ],
  },
  design: [
    {
      name: 'Download',
      description: '设计资源下载',
      module: () => import('@/site/web/pages/Design/Download'),
    },
  ],
};
