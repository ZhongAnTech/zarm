
// 主题色
const base = {
  // 主题色
  theme_default: '#e6e6e6',                 // 默认色
  theme_primary: '#12c287',                 // 主色
  theme_success: '#12c287',                 // 成功
  theme_warning: '#ec9131',                 // 警告
  theme_error: '#ff5050',                   // 失败

  // 文字色
  color_text: '#464646',                    // 基本
  color_text_inverse: '#fff',               // 反色
  color_text_placeholder: '#a9a9a9',        // 文本框提示
  color_text_disabled: '#bcbcbc',           // 失效
  color_text_caption: '#909090',            // 辅助描述
  color_link: '#108ee9',                    // 链接
  color_shadow: 'rgba(56, 56, 56, .15)',    // 阴影色

  // 背景色
  background_active: '#e6e6e6',
  background_disabled: '#bcbcbc',

  // 边框色
  border_color: '#e6e6e6',
  border_disabled: '#bcbcbc',

  // 圆角
  radius_sm: 2,
  radius_md: 4,
  radius_lg: 8,
  radius_round: 1000,
  // radius_circle: '50%',

  // 水平间距
  padding_h_sm: 5,
  padding_h_md: 8,
  padding_h_lg: 16,
  padding_h_xl: 20,

  // 垂直间距
  padding_v_sm: 2,
  padding_v_md: 6,
  padding_v_lg: 9,
  padding_v_xl: 12,

  // 字体大小
  font_size_xs: 10,
  font_size_sm: 12,
  font_size_md: 14,
  font_size_lg: 15,
  font_size_xl: 18,

  // 堆叠顺序
  zindex_mask: 1000,
  zindex_popup: 1300,
  zindex_modal: 1400,
  zindex_toast: 1500,
  zindex_loading: 1500,

  // 透明度
  opacity_disabled: .6,
  opacity_mask: .5,
  opacity_toast: .8,
  opacity_tooltip: .8,
};

const components = {
  // ActionSheet
  actionSheet_margin: 0,
  actionSheet_item_height: 50,
  actionSheet_item_font_size: 16,

  // Alert
  alert_button_height: 50,
  alert_button_font_size: 18,

  // Badge
  badge_height: 19,
  badge_font_size: 12, // font_size_sm,
  badge_padding_h: 5, // padding_h_sm,
  badge_dot_diameter: 8,

  // Button
  button_height_xs: 28,
  button_height_sm: 36,
  button_height_md: 44,
  button_height_lg: 52,
  button_padding_h_xs: 10,
  button_padding_h_sm: 12,
  button_padding_h_md: 16,
  button_padding_h_lg: 20,
  button_font_size_xs: 12,
  button_font_size_sm: 16,
  button_font_size_md: 16,
  button_font_size_lg: 18,
  button_icon_size_xs: 16,
  button_icon_size_sm: 18,
  button_icon_size_md: 22,
  button_icon_size_lg: 26,
  button_disabled_opacity: base.opacity_disabled,
  button_disabled_color_ghost: '#bcbcbc',

  button_default_background: '#fff',
  button_default_border: base.background_active,
  button_default_color: base.color_text,
  button_default_active_background: base.background_active,
  button_default_active_border: base.background_active,
  button_default_active_color: base.color_text,
  button_default_ghost_background: 'transparent',
  button_default_ghost_border: base.background_active,
  button_default_ghost_color: base.color_text,
  button_default_ghost_active_background: 'transparent',
  button_default_ghost_active_border: base.background_active,
  button_default_ghost_active_color: base.color_text,

  button_primary_background: base.theme_primary,
  button_primary_border: base.theme_primary,
  button_primary_color: '#fff',
  button_primary_active_background: '#10ae79',
  button_primary_active_border: '#10ae79',
  button_primary_active_color: '#fff',
  button_primary_ghost_background: 'transparent',
  button_primary_ghost_border: base.theme_primary,
  button_primary_ghost_color: base.theme_primary,
  button_primary_ghost_active_background: 'transparent',
  button_primary_ghost_active_border: '#10ae79',
  button_primary_ghost_active_color: '#10ae79',

  button_success_background: base.theme_success,
  button_success_border: base.theme_success,
  button_success_color: '#fff',
  button_success_active_background: '#10ae79',
  button_success_active_border: '#10ae79',
  button_success_active_color: '#fff',
  button_success_ghost_background: 'transparent',
  button_success_ghost_border: base.theme_success,
  button_success_ghost_color: base.theme_success,
  button_success_ghost_active_background: 'transparent',
  button_success_ghost_active_border: '#10ae79',
  button_success_ghost_active_color: '#10ae79',

  button_warning_background: base.theme_warning,
  button_warning_border: base.theme_warning,
  button_warning_color: '#fff',
  button_warning_active_background: '#d3822c',
  button_warning_active_border: '#d3822c',
  button_warning_active_color: '#fff',
  button_warning_ghost_background: 'transparent',
  button_warning_ghost_border: base.theme_warning,
  button_warning_ghost_color: base.theme_warning,
  button_warning_ghost_active_background: 'transparent',
  button_warning_ghost_active_border: '#d3822c',
  button_warning_ghost_active_color: '#d3822c',

  button_error_background: base.theme_error,
  button_error_border: base.theme_error,
  button_error_color: '#fff',
  button_error_active_background: '#e54747',
  button_error_active_border: '#e54747',
  button_error_active_color: '#fff',
  button_error_ghost_background: 'transparent',
  button_error_ghost_border: base.theme_error,
  button_error_ghost_color: base.theme_error,
  button_error_ghost_active_background: 'transparent',
  button_error_ghost_active_border: '#e54747',
  button_error_ghost_active_color: '#e54747',

  // Collapse
  collapse_height: 52,
  collapse_padding: 16,
  collapse_arrow_color: '#c2c2c2',
  collapse_arrow_disabled_color: '#eee',

  // Cell
  cell_height: 52,                                   // 最小度
  cell_background: '#fff',                           // 背景色
  cell_line_left: 16,                                // 分隔线左边距
  cell_padding_h: 16,                                // 边内内距
  cell_line_hasicon_left: 16,                        // 带icon时分隔线左边距
  cell_title_color: base.color_text,                 // 标题文字颜色
  cell_title_line_height: 28,                        // 标题文字行高
  cell_title_font_size: 15,                          // 标题文字大小
  cell_description_color: base.color_text_caption,   // 标题文字颜色
  cell_description_font_size: 15,                    // 描述文字大小
  cell_label_width: 100,                             // 表单label度
  cell_arrow_color: '#bcbcbc',                       // 箭头颜色
  cell_arrow_length: 10,                             // 箭头长度
  cell_arrow_border_width: 2,                        // 箭头粗细

  // Checkbox
  checkbox_size: 20,

  // Confirm
  confirm_button_height: 50,
  confirm_button_font_size: 18,

  // Icon
  icon_url: '//at.alicdn.com/t/font_126288_uipjvv8ogdivbo6r',

  // Keyboard
  keyboard_item_height: 52,
  keyboard_item_font_size: 30,
  keyboard_icon_font_size: 21,

  // Message
  message_min_height: 30,
  message_font_size: 12,
  message_min_height_lg: 42,
  message_font_size_lg: 15,

  // Modal
  modal_background: '#fff',
  modal_title_font_size: 18,

  // NoticeBar
  noticeBar_height: 24,

  // Panel
  panel_header_color: '#999',
  panel_header_font_size: 14,
  panel_body_color: '#333',
  panel_footer_color: '#999',
  panel_footer_font_size: 12,

  // Pull
  pull_control_height: 50,
  pull_control_font_size: 14,

  // Radio
  radio_size: 20,

  // Slider
  slider_line_background: '#d6d6d6',
  slider_line_height: 2,
  slider_handle_size: 28,
  slider_handle_background: '#fff',

  // activity-indicator
  activityIndicator_size_md: 20,
  activityIndicator_size_lg: 31,
  activityIndicator_path_color: '#e6e6e6',

  // Stepper
  stepper_height: 27,
  stepper_button_font_size: 20,
  stepper_input_width: 40,
  stepper_input_font_size: 16,

  // Swipe
  swipe_pagination_dot_size: 8,

  // Switch
  switch_width: 53,
  switch_height: 32,
  switch_border_color: '#e5e5e5',
  switch_background: '#fff',

  // SwipeAction
  swipe_action_height: 45,
  swipe_action_background: '#fff',

  // Tabs
  tabs_height: 45,
  tabs_item_font_size: 15,
  tabs_line_height: 2,

  // Toast
  toast_border_radius: 6,
  toast_color: '#fff',
  toast_font_size: 13,
  toast_max_width: '70%',

  // Tooltip
  tooltip_font_size: 12,
  tooltip_color: '#fff',
  tooltip_arrow_size: 5,
};

export default { ...base, ...components };
