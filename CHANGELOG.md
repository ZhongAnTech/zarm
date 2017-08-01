# 版本更新日志  

## 0.0.48 
  * 修复Picker取值问题。

## 0.0.46 
  * 修复Picker单列默认值和展示的bug，Picker.Date时间单位显示不正确的bug。

## 0.0.45 
  * 修复Picker接收新dataSource时不重新render的bug

## 0.0.44 
  * Picker.Date新增属性wheelDefaultValue，用于滚轮选项默认值的设置

## 0.0.42 
  * 修复Swipe组件接收新activeIndex时不重新render的bug

## 0.0.41 
  * 优化InputNumber组件，onChange时会自动触发setState保存变更记录，onBlur时会自动校验输入的合法性
  * 修复Picker组件在未选择时点“确定”，不保存结果的bug

## 0.0.40 
  * 构建工具改为webpack2  
  * 优化Picker的取值，可以通过自定义valueMember和displayMember属性来设置值和显示。  
  * 修复大转盘组件Lottery的bug，可以适用自定义奖项数量。

## 0.0.38  
  * 修复Swipe组件销毁后没有把resize事件移除的bug

## 0.0.37  
  * DatePicker合并到Picker中，合并后通过Picker.Date调用

## 0.0.36  
  * 修复moment、zscroller依赖错误

## 0.0.35  
  * 修复日期时间选择器(DatePicker) 部分bug

## 0.0.34  
  * 新增日期时间选择器(DatePicker) 和 开关组件(Switch)

## 0.0.33  
  * 优化Swipe组件，增加属性isLoop(是否循环)、onChangeEnd(滑块切换结束回调事件)

## 0.0.32  
  * 修复Modal.Header组件onClose时关闭按钮icon的错误

## 0.0.31  
  * 原Selector组件更名为Picker，并修复遮罩层z-index不够的bug

## 0.0.30  
  * 修复Swipe组件动态获取节点不更新的bug  
  * 修复Lottery组件可快速多次点击转盘转动的问题
  
## 0.0.26  
  * 修复Tab组件接受新value为0时，不切换的bug