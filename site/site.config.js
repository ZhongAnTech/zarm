module.exports = {
  documents: [
    {
      key: 'quick-start',
      name: '快速上手',
      module: () => import('@/README.md'),
    },
    {
      key: 'change-log',
      name: '更新日志',
      module: () => import('@/CHANGELOG.md'),
    },
  ],
  components: {
    form: [
      {
        key: 'input',
        name: '文本框',
        module: () => import('@/components/input/demo.md'),
      },
      {
        key: 'radio',
        name: '单选框',
        module: () => import('@/components/radio/demo.md'),
      },
      {
        key: 'checkbox',
        name: '复选框',
        module: () => import('@/components/checkbox/demo.md'),
      },
      {
        key: 'picker',
        name: '选择器',
        module: () => import('@/components/picker/demo.md'),
      },
      {
        key: 'date-picker',
        name: '日期选择器',
        module: () => import('@/components/date-picker/demo.md'),
      },
      {
        key: 'calendar',
        name: '日历',
        module: () => import('@/components/calendar/demo.md'),
      },
      {
        key: 'slider',
        name: '滑动输入条',
        module: () => import('@/components/slider/demo.md'),
      },
      {
        key: 'stepper',
        name: '步进器',
        module: () => import('@/components/stepper/demo.md'),
      },
      {
        key: 'switch',
        name: '开关',
        module: () => import('@/components/switch/demo.md'),
      },
      {
        key: 'search-bar',
        name: '搜索栏',
        module: () => import('@/components/search-bar/demo.md'),
      },
      {
        key: 'file-picker',
        name: '文件选择器',
        module: () => import('@/components/file-picker/demo.md'),
      },
      {
        key: 'keyboard',
        name: '虚拟键盘',
        module: () => import('@/components/keyboard/demo.md'),
      },
    ],
    feedback: [
      {
        key: 'button',
        name: '按钮',
        module: () => import('@/components/button/demo.md'),
      },
      {
        key: 'action-sheet',
        name: '动作面板',
        module: () => import('@/components/action-sheet/demo.md'),
      },
      {
        key: 'message',
        name: '消息',
        module: () => import('@/components/message/demo.md'),
      },
      {
        key: 'modal',
        name: '模态框',
        module: () => import('@/components/modal/demo.md'),
      },
      {
        key: 'toast',
        name: '轻提示',
        module: () => import('@/components/toast/demo.md'),
      },
      {
        key: 'pull',
        name: '上拉加载下拉刷新',
        module: () => import('@/components/pull/demo.md'),
      },
      {
        key: 'swipe-action',
        name: '滑动操作',
        module: () => import('@/components/swipe-action/demo.md'),
      },
      {
        key: 'activity-indicator',
        name: '活动指示器',
        module: () => import('@/components/activity-indicator/demo.md'),
      },
    ],
    view: [
      {
        key: 'collapse',
        name: '折叠面板',
        module: () => import('@/components/collapse/demo.md'),
      },
      {
        key: 'badge',
        name: '徽标',
        module: () => import('@/components/badge/demo.md'),
      },
      {
        key: 'cell',
        name: '列表项',
        module: () => import('@/components/cell/demo.md'),
      },
      {
        key: 'icon',
        name: '图标',
        module: () => import('@/components/icon/demo.md'),
      },
      {
        key: 'carousel',
        name: '走马灯',
        module: () => import('@/components/carousel/demo.md'),
      },
      {
        key: 'progress',
        name: '进度条',
        module: () => import('@/components/progress/demo.md'),
      },
      {
        key: 'notice-bar',
        name: '通告栏',
        module: () => import('@/components/notice-bar/demo.md'),
      },
      {
        key: 'panel',
        name: '面板',
        module: () => import('@/components/panel/demo.md'),
      },
      {
        key: 'marquee',
        name: '滚动',
        module: () => import('@/components/marquee/demo.md'),
      },
      {
        key: 'popper',
        name: '气泡层',
        module: () => import('@/components/popper/demo.md'),
      },
      {
        key: 'tooltip',
        name: '文字提示',
        module: () => import('@/components/tooltip/demo.md'),
      },
    ],
    navigation: [
      {
        key: 'popup',
        name: '弹出框',
        module: () => import('@/components/popup/demo.md'),
      },
      {
        key: 'tabs',
        name: '标签页',
        module: () => import('@/components/tabs/demo.md'),
      },
      {
        key: 'nav-bar',
        name: '导航栏',
        module: () => import('@/components/nav-bar/demo.md'),
      },
      {
        key: 'tab-bar',
        name: '标签栏',
        module: () => import('@/components/tab-bar/demo.md'),
      },
    ],
    other: [
      {
        key: 'locale-provider',
        name: '国际化',
        module: () => import('@/components/locale-provider/demo.md'),
      },
    ],
  },
  design: [
    {
      key: 'download',
      name: '设计资源下载',
      module: () => import('@/site/web/pages/Design/Download'),
    },
  ],
};
