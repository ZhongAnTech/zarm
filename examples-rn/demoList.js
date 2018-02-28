module.exports = {
  UIFORM: [
    {
      title: 'Stepper',
      description: '步进器',
      module: require('./pages/StepperPage'),
    },
  ],
  UICONROL: [
    {
      title: 'Popup',
      description: '弹出框',
      module: require('./pages/PopupPage'),
    },
  ],
  UIVIEW: [
    {
      title: 'Button',
      description: '按钮',
      module: require('./pages/ButtonPage'),
    },
    {
      title: 'Panel',
      description: '面板',
      module: require('./pages/PanelPage'),
    },
    {
      title: 'ActionSheet',
      description: '动作面板',
      module: require('./pages/ActionSheet'),
    },
  ],
};
