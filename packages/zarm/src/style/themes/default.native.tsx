import Color from 'color';

const darken = (color: string, percent) => {
  const hsl: any = Color(color).hsl();
  const l = hsl.color[2] - percent * 100;
  hsl.color[2] = l;
  return hsl.hex();
};

let base: any = {
  // 主题色
  theme_default: '#e6e6e6', // 默认色
  theme_primary: '#00bc70', // 主色
  theme_success: '#00bc70', // 成功
  theme_warning: '#ec9131', // 警告
  theme_danger: '#ff5050', // 失败
};

// 主题色
base = {
  ...base,
  // press状态色阶
  theme_default_press: darken(base.theme_default, 0.04),
  theme_primary_press: darken(base.theme_primary, 0.04),
  theme_success_press: darken(base.theme_primary, 0.04),
  theme_warning_press: darken(base.theme_warning, 0.04),
  theme_danger_press: darken(base.theme_danger, 0.04),

  // 文字色
  color_text: '#464646', // 基本
  color_text_inverse: '#fff', // 反色
  color_text_placeholder: '#a9a9a9', // 文本框提示
  color_text_disabled: '#bcbcbc', // 失效
  color_text_caption: '#909090', // 辅助描述
  color_link: '#108ee9', // 链接
  color_shadow: 'rgba(56, 56, 56, .15)', // 阴影色

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
  padding_h_xs: 8,
  padding_h_sm: 12,
  padding_h_md: 16,
  padding_h_lg: 20,

  // 垂直间距
  padding_v_xs: 4,
  padding_v_sm: 8,
  padding_v_md: 12,
  padding_v_lg: 16,

  // 字体大小
  font_size_xs: 10,
  font_size_sm: 12,
  font_size_md: 14,
  font_size_lg: 16,
  font_size_xl: 18,

  // 堆叠顺序
  zindex_mask: 1000,
  zindex_popup: 1300,
  zindex_modal: 1400,
  zindex_toast: 1500,
  zindex_loading: 1500,

  // 透明度
  opacity_disabled: 0.5,
  opacity_mask: 0.5,
  opacity_toast: 0.8,
  opacity_tooltip: 0.8,
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
  badge_height: 14,
  badge_font_size: base.font_size_xs,
  badge_padding_h: 4,
  badge_dot_diameter: 8,
  badge_border_radius_rect: base.radius_sm,
  badge_border_radius_round: base.radius_round,
  badge_sup_top: -4,
  badge_text_color: '#fff',

  // Button
  button_height_xs: 28,
  button_height_sm: 36,
  button_height_md: 44,
  button_height_lg: 52,
  button_padding_h_xs: base.padding_h_xs,
  button_padding_h_sm: base.padding_h_sm,
  button_padding_h_md: base.padding_h_md,
  button_padding_h_lg: base.padding_h_lg,
  button_font_size_xs: 12,
  button_font_size_sm: 14,
  button_font_size_md: 16,
  button_font_size_lg: 18,
  button_icon_size_xs: 16,
  button_icon_size_sm: 18,
  button_icon_size_md: 22,
  button_icon_size_lg: 26,
  button_disabled_opacity: base.opacity_disabled,
  button_disabled_color_ghost: base.border_disabled,

  button_default_background: '#fff',
  button_default_border: base.theme_default,
  button_default_color: base.color_text,
  button_default_active_background: base.theme_default,
  button_default_active_border: base.theme_default,
  button_default_active_color: base.color_text,
  button_default_ghost_border: '#fff',
  button_default_ghost_color: '#fff',
  button_default_ghost_active_border: base.theme_default,
  button_default_ghost_active_color: base.theme_default,

  button_primary_background: base.theme_primary,
  button_primary_border: base.theme_primary,
  button_primary_color: '#fff',
  button_primary_active_background: base.theme_primary_press,
  button_primary_active_border: base.theme_primary_press,
  button_primary_active_color: `${Color('#fff').alpha(0.4)}`,
  button_primary_ghost_border: base.theme_primary,
  button_primary_ghost_color: base.theme_primary,
  button_primary_ghost_active_border: base.theme_primary_press,
  button_primary_ghost_active_color: base.theme_primary_press,

  button_danger_background: base.theme_danger,
  button_danger_border: base.theme_danger,
  button_danger_color: '#fff',
  button_danger_active_background: base.theme_danger_press,
  button_danger_active_border: base.theme_danger_press,
  button_danger_active_color: `${Color('#fff').alpha(0.4)}`,
  button_danger_ghost_border: base.theme_danger,
  button_danger_ghost_color: base.theme_danger,
  button_danger_ghost_active_border: base.theme_danger_press,
  button_danger_ghost_active_color: base.theme_danger_press,

  // Checkbox
  checkbox_size: 20,

  // Collapse
  collapse_height: 52,
  collapse_padding: 16,
  collapse_arrow_color: '#bcbcbc',
  collapse_arrow_disabled_color: '#eee',

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
  message_min_height: 29,
  message_font_size: 12,
  message_padding_v: 6,
  message_padding_h: 8,
  message_close_length: 12,
  message_arrow_length: 8,
  message_arrow_border_width: 1, // 箭头粗细

  // Modal
  modal_background: '#fff',
  modal_title_font_size: 18,

  // NoticeBar
  noticeBar_height: 24,

  // Panel
  panel_header_color: '#999',
  panel_header_font_size: 14,
  panel_body_color: '#333',
  panel_body_font_size: 15,

  // Pull
  pull_control_height: 50,
  pull_control_font_size: 14,

  // Radio
  radio_size: 20,

  // Slider
  slider_line_background: '#e6e6e6',
  slider_line_height: 2,
  slider_handle_size: 28,
  slider_handle_background: '#fff',

  // activity-indicator
  activityIndicator_size_md: 20,
  activityIndicator_size_lg: 31,
  activityIndicator_path_color: '#e6e6e6',

  // Stepper
  stepper_height_md: 28,
  stepper_icon_font_size_md: 20,
  stepper_input_width_md: 40,
  stepper_input_font_size_md: 16,

  // Swipe
  swipe_pagination_dot_size: 8,

  // Switch
  switch_width: 53,
  switch_height: 32,
  switch_border_color: '#e6e6e6',
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
  tooltip_padding_v: base.padding_v_sm,
  tooltip_padding_h: base.padding_h_sm,
};

export default { ...base, ...components };
