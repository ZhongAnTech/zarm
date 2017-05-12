# dragon-mobile-ui
  基于ReactJS的移动端UI库
  
## 安装
  npm install dragon-mobile-ui
  
## 使用
  import { Button, Cell } from dragon-mobile-ui;

## 已完成组件
- Button 按钮
- Cell 列表项
- Checkbox 复选框
- DatePicker 日期时间选择器
- Icon 字体图标
- Input 输入框/文本域
- InputNumber 数字选择框
- Loading 加载中
- Lottery 大转盘
- Mask 遮罩层
- Modal 模态框
- Panel 面版
- Picker 选择器
- Radio 单选框
- Select 选择项
- Swipe 走马灯
- Switch 开关
- Tab 选项卡
- Toast 消息提示

## 版本更新日志

- 0.0.39  
  构建工具改为webpack2  
  优化Picker的取值，可以通过自定义valueMember和displayMember属性来设置值和显示。  
  修复大转盘组件Lottery的bug，可以适用自定义奖项数量。

- 0.0.38  
  修复Swipe组件销毁后没有把resize事件移除的bug

- 0.0.37  
  DatePicker合并到Picker中，合并后通过Picker.Date调用

- 0.0.36  
  修复moment、zscroller依赖错误

- 0.0.35  
  修复日期时间选择器(DatePicker) 部分bug

- 0.0.34  
  新增日期时间选择器(DatePicker) 和 开关组件(Switch)

- 0.0.33  
  优化Swipe组件，增加属性isLoop(是否循环)、onChangeEnd(滑块切换结束回调事件)

- 0.0.32  
  修复Modal.Header组件onClose时关闭按钮icon的错误

- 0.0.31  
  原Selector组件更名为Picker，并修复遮罩层z-index不够的bug

- 0.0.30  
  修复Swipe组件动态获取节点不更新的bug  
  修复Lottery组件可快速多次点击转盘转动的问题
  
- 0.0.26  
  修复Tab组件接受新value为0时，不切换的bug

