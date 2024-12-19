"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[2993],{82993:function(n,e,t){t.r(e),e.default="# Stepper 步进器\n\n## 基本用法\n\n```jsx\nimport { useState } from 'react';\nimport { List, Stepper } from 'zarm';\n\nconst Demo = () => {\n  const [value, setValue] = useState(1);\n\n  return (\n    <List>\n      <List.Item\n        title=\"普通\"\n        suffix={\n          <Stepper\n            value={value}\n            onChange={setValue}\n            onInputChange={(value) => {\n              console.log('onInputChange:', value);\n            }}\n          />\n        }\n      />\n      <List.Item title=\"设置默认值\" suffix={<Stepper defaultValue={2} />} />\n      <List.Item title=\"设置上下限（-3 ~ 3）\" suffix={<Stepper min={-3} max={3} />} />\n      <List.Item title=\"设置步长\" suffix={<Stepper step={5} />} />\n      <List.Item\n        title=\"步长小数\"\n        suffix={<Stepper type=\"price\" step={0.12} defaultValue={0.9} max={2.0} min={1} />}\n      />\n      <List.Item title=\"禁用状态\" suffix={<Stepper disabled />} />\n      <List.Item title=\"禁用输入\" suffix={<Stepper disableInput />} />\n    </List>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## 多形状\n\n```jsx\nimport { List, Stepper } from 'zarm';\n\nReactDOM.render(\n  <List>\n    <List.Item title=\"直角\" suffix={<Stepper shape=\"rect\" />} />\n    <List.Item title=\"圆形\" suffix={<Stepper shape=\"circle\" />} />\n  </List>,\n  mountNode,\n);\n```\n\n## 多尺寸\n\n```jsx\nimport { List, Stepper } from 'zarm';\n\nReactDOM.render(\n  <List>\n    <List.Item title=\"大号\" suffix={<Stepper size=\"lg\" />} />\n  </List>,\n  mountNode,\n);\n```\n\n## API\n\n| 属性          | 类型                              | 默认值   | 说明                                              |\n| :------------ | :-------------------------------- | :------- | :------------------------------------------------ |\n| shape         | string                            | 'radius' | 形状，可选值 `rect`, `radius`, `circle`           |\n| size          | string                            | 'md'     | 大小，可选值 `md`、`lg`                           |\n| type          | string                            | 'text'   | 输入类型，可选值 `text`、`number`、`price`、`tel` |\n| value         | number                            | -        | 值                                                |\n| defaultValue  | number                            | -        | 初始值                                            |\n| min           | number                            | -        | 最小值                                            |\n| max           | number                            | -        | 最大值                                            |\n| step          | number                            | 1        | 步长                                              |\n| disabled      | boolean                           | false    | 是否禁用                                          |\n| disableInput  | boolean                           | false    | 是否禁用输入框                                    |\n| onInputChange | (value: number \\| string) => void | -        | 输入值变化时触发的回调函数                        |\n| onChange      | (value: number \\| string) => void | -        | 值变化时触发的回调函数                            |\n\n## CSS 变量\n\n| 属性                 | 默认值                          | 说明               |\n| :------------------- | :------------------------------ | :----------------- |\n| --height             | '28px'                          | 步进器高度         |\n| --input-width        | '56px'                          | 步进器的输入框宽度 |\n| --input-background   | 'transparent'                          | 输入框背景色       |\n| --input-border-width       | '1px'                       | 输入框边框宽度     |\n| --input-border-color       | 'transparent'                       | 输入框边框颜色     |\n| --input-border-radius      | 'var(--za-radius-md)'           | 输入框圆角尺寸     |\n| --input-text-color         | 'var(--za-color-text)'          | 输入框文本颜色     |\n| --input-font-size     | 'var(--za-font-size-md)'             | 输入框字体大小     |\n| --input-disabled-text-color     | 'var(--za-color-text-disabled)' | 输入框禁用数字颜色 |\n| --input-disabled-opacity   | 'var(--za-opacity-disabled)'    | 输入框禁用不透明度 |\n| --input-margin  | '0 4px'                           | 输入框水平外间距   |\n| --input-padding | '0 8px'                           | 输入框水平内间距   |\n| --icon-font-size     | '12px'                          | 步进器图标大小     |\n"}}]);