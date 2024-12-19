"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[8646],{68646:function(e,n,t){t.r(n),n.default="# Picker 选择器\n\n## 基本用法\n\n```jsx\nimport { useEffect, useRef, useReducer } from 'react';\nimport { List, Button, Picker, Toast } from 'zarm';\n\nconst SINGLE_DATA = [\n  { value: '1', label: '选项一' },\n  { value: '2', label: '选项二' },\n  { value: '3', label: '选项三' },\n  { value: '4', label: '选项四' },\n  { value: '5', label: '选项五' },\n];\n\n// 普通多列数据\nconst MULTI_DATA = [\n  [\n    { value: '1', label: '选项一' },\n    { value: '2', label: '选项二' },\n  ],\n  [\n    { value: '3', label: '选项A' },\n    { value: '4', label: '选项B' },\n  ],\n];\n\n// 级联数据\nconst CASCADE_DATA = [\n  {\n    value: '1',\n    label: '北京市',\n    children: [\n      { value: '11', label: '海淀区' },\n      { value: '12', label: '西城区' },\n    ],\n  },\n  {\n    value: '2',\n    label: '上海市',\n    children: [\n      { value: '21', label: '杨浦区' },\n      { value: '22', label: '静安区' },\n    ],\n  },\n];\n\n// 自定义\nconst DIY_DATA = [\n  {\n    code: '1',\n    name: '北京市',\n    options: [\n      { code: '11', name: '海淀区' },\n      { code: '12', name: '西城区' },\n    ],\n  },\n  {\n    code: '2',\n    name: '上海市',\n    options: [\n      { code: '21', name: '黄埔区' },\n      { code: '22', name: '虹口区' },\n    ],\n  },\n];\n\nconst initState = {\n  single: {\n    visible: false,\n    value: '',\n    dataSource: SINGLE_DATA,\n  },\n  multi: {\n    visible: false,\n    value: [],\n    dataSource: MULTI_DATA,\n  },\n  cascade: {\n    visible: false,\n    value: [],\n    dataSource: CASCADE_DATA,\n  },\n  diy: {\n    visible: false,\n    value: [],\n    dataSource: [],\n  },\n  specDOM: {\n    visible: false,\n    value: '',\n    dataSource: SINGLE_DATA,\n  },\n};\n\nconst reducer = (state, action) => {\n  const { type, key, value, fieldNames, dataSource } = action;\n\n  switch (type) {\n    case 'visible':\n      return {\n        ...state,\n        [key]: {\n          ...state[key],\n          visible: !state[key].visible,\n        },\n      };\n\n    case 'value':\n      return {\n        ...state,\n        [key]: {\n          ...state[key],\n          value,\n        },\n      };\n\n    case 'fieldNames':\n      return {\n        ...state,\n        [key]: {\n          ...state[key],\n          fieldNames,\n        },\n      };\n\n    case 'dataSource':\n      return {\n        ...state,\n        [key]: {\n          ...state[key],\n          dataSource,\n        },\n      };\n\n    default:\n  }\n};\n\nconst Demo = () => {\n  const myRef = useRef();\n  const [state, dispatch] = useReducer(reducer, initState);\n\n  const setVisible = (key) => {\n    dispatch({ type: 'visible', key });\n  };\n\n  const setValue = (key, value) => {\n    dispatch({ type: 'value', key, value });\n  };\n\n  const setFieldNames = (key, fieldNames) => {\n    dispatch({ type: 'fieldNames', key, fieldNames });\n  };\n\n  const setDataSource = (key, value) => {\n    dispatch({ type: 'dataSource', key, dataSource: value });\n  };\n\n  useEffect(() => {\n    // 异步加载数据源测试\n    setTimeout(() => {\n      setValue('diy', ['1', '12']);\n      setDataSource('diy', DIY_DATA);\n      setFieldNames('diy', { value: 'code', children: 'options' });\n    }, 0);\n  }, []);\n\n  return (\n    <>\n      <List>\n        <List.Item\n          title=\"单列\"\n          suffix={\n            <Button size=\"xs\" onClick={() => setVisible('single')}>\n              选择\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"多列\"\n          suffix={\n            <Button size=\"xs\" onClick={() => setVisible('multi')}>\n              选择\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"级联\"\n          suffix={\n            <Button size=\"xs\" onClick={() => setVisible('cascade')}>\n              选择\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"自定义\"\n          suffix={\n            <Button size=\"xs\" onClick={() => setVisible('diy')}>\n              选择\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"挂载到指定dom节点\"\n          suffix={\n            <Button size=\"xs\" onClick={() => setVisible('specDOM')}>\n              选择\n            </Button>\n          }\n        />\n      </List>\n\n      <Picker\n        visible={state.single.visible}\n        value={state.single.value}\n        dataSource={state.single.dataSource}\n        onConfirm={(changedValue, items) => {\n          console.log('Single Picker onConfirm: ', items);\n          Toast.show(JSON.stringify(items));\n          setValue('single', changedValue);\n          setVisible('single');\n        }}\n        onCancel={() => setVisible('single')}\n      />\n\n      <Picker\n        visible={state.multi.visible}\n        value={state.multi.value}\n        dataSource={state.multi.dataSource}\n        onConfirm={(changedValue, items) => {\n          console.log('Multi Picker onConfirm: ', items);\n          Toast.show(JSON.stringify(items));\n          setValue('multi', changedValue);\n          setVisible('multi');\n        }}\n        onCancel={() => setVisible('multi')}\n      />\n\n      <Picker\n        visible={state.cascade.visible}\n        value={state.cascade.value}\n        dataSource={state.cascade.dataSource}\n        onConfirm={(changedValue, items) => {\n          console.log('Cascade Picker onConfirm: ', items);\n          Toast.show(JSON.stringify(items));\n          setValue('cascade', changedValue);\n          setVisible('cascade');\n        }}\n        onCancel={() => setVisible('cascade')}\n      />\n\n      <Picker\n        visible={state.diy.visible}\n        title=\"custom title\"\n        cancelText=\"Cancel\"\n        confirmText=\"Ok\"\n        fieldNames={state.diy.fieldNames}\n        dataSource={state.diy.dataSource}\n        value={state.diy.value}\n        itemRender={(data) => data.name}\n        onConfirm={(changedValue, items) => {\n          console.log('DIY Picker onConfirm: ', items);\n          Toast.show(JSON.stringify(items));\n          setValue('diy', changedValue);\n          setVisible('diy');\n        }}\n        onCancel={() => setVisible('diy')}\n      />\n\n      <Picker\n        visible={state.specDOM.visible}\n        value={state.specDOM.value}\n        dataSource={state.specDOM.dataSource}\n        onConfirm={(changedValue, items) => {\n          console.log('Picker onConfirm: ', items);\n          Toast.show(JSON.stringify(items));\n          setValue('specDOM', changedValue);\n          setVisible('specDOM');\n        }}\n        onCancel={() => setVisible('specDOM')}\n        mountContainer={() => myRef.current}\n      />\n\n      <div id=\"test-div\" ref={myRef} />\n    </>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## Select 表单选择器\n\n```jsx\nimport { useState, useEffect } from 'react';\nimport { Select, List } from 'zarm';\n\n// 级联数据\nconst CASCADE_DATA = [\n  {\n    value: '1',\n    label: '北京市',\n    children: [\n      { value: '11', label: '海淀区' },\n      { value: '12', label: '西城区' },\n    ],\n  },\n  {\n    value: '2',\n    label: '上海市',\n    children: [\n      { value: '21', label: '杨浦区' },\n      { value: '22', label: '静安区' },\n    ],\n  },\n];\n\nconst Demo = () => {\n  const [value, setValue] = useState([]);\n  const [dataSource, setDataSource] = useState([]);\n  const [wheelDefaultValue, setWheelDefaultValue] = useState([]);\n\n  useEffect(() => {\n    setTimeout(() => {\n      setDataSource(CASCADE_DATA);\n      setWheelDefaultValue(['1', '12']);\n    }, 0);\n  }, []);\n\n  return (\n    <List>\n      <List.Item title=\"城市\">\n        <Select\n          value={value}\n          wheelDefaultValue={wheelDefaultValue}\n          dataSource={dataSource}\n          onConfirm={(changedValue, items) => {\n            console.log('Select onConfirm: ', items);\n            setValue(changedValue);\n          }}\n        />\n      </List.Item>\n    </List>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## 指令式调用\n\n```jsx\nimport { useState, useEffect } from 'react';\nimport { List, Picker, Button, Toast } from 'zarm';\n\n// 级联数据\nconst PROMPT_DATA = [\n  {\n    value: 1,\n    label: '北京市',\n    children: [\n      { value: 11, label: '海淀区' },\n      { value: 12, label: '西城区' },\n    ],\n  },\n  {\n    value: 2,\n    label: '上海市',\n    children: [\n      { value: 21, label: '杨浦区' },\n      { value: 22, label: '静安区' },\n    ],\n  },\n];\n\nconst Demo = () => {\n  const [value, setValue] = useState([]);\n\n  return (\n    <List>\n      <List.Item\n        title=\"选择城市\"\n        suffix={\n          <Button\n            size=\"xs\"\n            onClick={async () => {\n              const { value: changedValue, items } = await Picker.prompt({\n                value,\n                dataSource: PROMPT_DATA,\n              });\n              if (!changedValue) return;\n              setValue(changedValue);\n              Toast.show(JSON.stringify(items));\n            }}\n          >\n            选择\n          </Button>\n        }\n      />\n    </List>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## PickerView 平铺选择器\n\n```jsx\nimport { useState, useEffect } from 'react';\nimport { PickerView } from 'zarm';\n\n// 级联数据\nconst CASCADE_DATA = [\n  {\n    code: '1',\n    label: '北京市',\n    children: [\n      { code: '11', label: '海淀区' },\n      { code: '12', label: '西城区' },\n    ],\n  },\n  {\n    code: '2',\n    label: '上海市',\n    children: [\n      { code: '21', label: '杨浦区' },\n      { code: '22', label: '静安区' },\n    ],\n  },\n];\n\nconst Demo = () => {\n  const [value, setValue] = useState('');\n  const [dataSource, setDataSource] = useState([]);\n  const [fieldNames, setFieldNames] = useState({});\n\n  useEffect(() => {\n    setTimeout(() => {\n      setValue(['1', '12']);\n      setFieldNames({ value: 'code' });\n      setDataSource(CASCADE_DATA);\n    }, 0);\n  }, []);\n\n  return (\n    <PickerView\n      value={value}\n      fieldNames={fieldNames}\n      dataSource={dataSource}\n      onChange={(changedValue, items) => {\n        console.log('PickerView onChange: ', items);\n        setValue(changedValue);\n      }}\n    />\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## API\n\n| 属性              | 类型                                                          | 默认值                                                   | 说明                                     |\n| :---------------- | :------------------------------------------------------------ | :------------------------------------------------------- | :--------------------------------------- |\n| dataSource        | (PickerViewColumnItem \\| PickerViewOption)[]                  | []                                                       | 数据源                                   |\n| value             | PickerValue \\| PickerValue[]                                  | -                                                        | 值                                       |\n| defaultValue      | PickerValue \\| PickerValue[]                                  | -                                                        | 初始值                                   |\n| wheelDefaultValue | PickerValue \\| PickerValue[]                                  | -                                                        | 滚轮初始停留的位置                       |\n| fieldNames        | object                                                        | { label: `label`, value: `value`, children: `children` } | 自定义节点 label、value、children 的字段 |\n| itemRender        | (item: PickerViewColumnItem) => ReactNode                     | (data) => data.label                                     | 单个选项的展示                           |\n| disabled          | boolean                                                       | false                                                    | 是否禁用                                 |\n| cols              | number                                                        | Infinity                                                 | 级联选择器的级数                         |\n| onChange          | (value: PickerValue[], items: PickerViewColumnItem[]) => void | -                                                        | 值变化时触发的回调函数                   |\n\n### 仅 Picker & Select 支持的属性\n\n| 属性           | 类型                                                          | 默认值              | 说明                                           |\n| :------------- | :------------------------------------------------------------ | :------------------ | :--------------------------------------------- |\n| title          | string                                                        | '请选择'            | 选择器标题                                     |\n| confirmText    | string                                                        | '确定'              | 确定栏文字                                     |\n| cancelText     | string                                                        | '取消'              | 取消栏文字                                     |\n| maskClosable   | boolean                                                       | true                | 是否点击遮罩层时关闭，需要和 onCancel 一起使用 |\n| destroy        | boolean                                                       | false               | 弹层关闭后是否移除节点                         |\n| safeArea       | boolean                                                       | false               | 是否适配安全区域                               |\n| onConfirm      | (value: PickerValue[], items: PickerViewColumnItem[]) => void | -                   | 点击确定时触发的回调函数                       |\n| onCancel       | () => void                                                    | -                   | 点击取消时触发的回调函数                       |\n| mountContainer | MountContainer                                                | () => document.body | 指定 Picker 挂载的 HTML 节点                   |\n\n### 指令式调用\n\nPicker 支持指令式调用，提供了 `prompt` 方法\n\n```tsx\nprompt: (props: Omit<PickerProps, 'visible' | 'children'>) =>\n  Promise<PickerValue[] | null>;\n```\n\n`prompt` 方法的返回值是一个 Promise，如果用户点击了确定，从 Promise 中可以解析到 `PickerValue[]`，而如果用户是触发的取消操作，那么 Promise 中的值是 `null`。你可以通过 `await` 或 `.then()` 来获取到其中的值：\n\n```tsx\nconst value = await Picker.prompt({\n  dataSource: dataSourceConfig,\n});\n\nPicker.prompt({\n  columns: dataSourceConfig,\n}).then((value) => {\n  // ...\n});\n```\n\n### 仅 Picker 支持的属性\n\n| 属性    | 类型    | 默认值 | 说明     |\n| :------ | :------ | :----- | :------- |\n| visible | boolean | false  | 是否展示 |\n\n### 仅 Select 支持的属性\n\n| 属性          | 类型                                            | 默认值                                         | 说明         |\n| :------------ | :---------------------------------------------- | :--------------------------------------------- | :----------- |\n| placeholder   | string                                          | '请选择'                                       | 输入提示信息 |\n| displayRender | (selected: PickerViewColumnItem[]) => ReactNode | selected => dataSource.map(item => item.label) | 所选值的展示 |\n\n### PickerValue\n\n`string | number | boolean`\n\n### PickerViewColumnItem\n\n| 属性  | 类型            | 默认值 | 说明         |\n| :---- | :-------------- | :----- | :----------- |\n| value | PickerValue     | -      | 选项值       |\n| label | React.ReactNode | -      | 选项显示名称 |\n\n### PickerViewOption\n\n| 属性     | 类型               | 默认值 | 说明         |\n| :------- | :----------------- | :----- | :----------- |\n| value    | PickerValue        | -      | 选项值       |\n| label    | React.ReactNode    | -      | 选项显示名称 |\n| children | PickerViewOption[] | -      | 子选项       |\n\n## CSS 变量\n\n### PickerView\n\n| 属性                                | 默认值                          | 说明                 |\n| :---------------------------------- | :------------------------------ | :------------------- |\n| --background                        | '#fff'                          | 内容区域背景         |\n| --padding                           | '16px'                          | 内容区域内边距       |\n| --mask-start-background             | 'rgba(255, 255, 255, 0.4)'      | 内容区域头部蒙层背景 |\n| --mask-end-background               | 'rgba(255, 255, 255, 0.8)'      | 内容区域底部蒙层背景 |\n| --wheel-item-rows                   | 5                               | 滚轮元素长度         |\n| --wheel-item-height                 | '34px'                          | 滚轮元素高度         |\n| --wheel-item-font-size              | '20px'                          | 滚轮元素文字大小     |\n| --wheel-item-text-color             | 'var(--za-color-text)'          | 滚轮元素文字颜色     |\n| --wheel-item-disabled-text-color    | 'var(--za-color-text-disabled)' | 滚轮元素文字禁用颜色 |\n| --wheel-item-selected-background    | 'rgba(116, 116, 128, 0.08)'     | 滚轮元素文字选中背景 |\n| --wheel-item-selected-border-radius | '7px'                           | 滚轮元素文字选中圆角 |\n\n### Picker\n\n| 属性                                | 默认值                          | 说明                 |\n| :---------------------------------- | :------------------------------ | :------------------- |\n| --header-height                     | '45px'                          | 头部高度             |\n| --header-font-size                  | '16px'                          | 头部文字大小         |\n| --header-background                 | '#f7f7f7'                       | 头部背景             |\n| --header-title-text-color           | 'var(--za-color-text)'          | 头部标题文字颜色     |\n| --header-submit-text-color          | 'var(--za-theme-primary)'       | 头部提交按钮文字颜色 |\n| --header-cancel-text-color          | 'var(--za-color-text-caption)'  | 头部取消按钮文字颜色 |\n| --content-background                | '#fff'                          | 内容区域背景         |\n| --content-padding                   | '16px'                          | 内容区域内边距       |\n| --content-mask-start-background     | 'rgba(255, 255, 255, 0.4)'      | 内容区域头部蒙层背景 |\n| --content-mask-end-background       | 'rgba(255, 255, 255, 0.8)'      | 内容区域底部蒙层背景 |\n| --wheel-item-rows                   | 5                               | 滚轮元素长度         |\n| --wheel-item-height                 | '34px'                          | 滚轮元素高度         |\n| --wheel-item-font-size              | '20px'                          | 滚轮元素文字大小     |\n| --wheel-item-text-color             | 'var(--za-color-text)'          | 滚轮元素文字颜色     |\n| --wheel-item-disabled-text-color    | 'var(--za-color-text-disabled)' | 滚轮元素文字禁用颜色 |\n| --wheel-item-selected-background    | 'rgba(116, 116, 128, 0.08)'     | 滚轮元素文字选中背景 |\n| --wheel-item-selected-border-radius | '7px'                           | 滚轮元素文字选中圆角 |\n\n### Select\n\n| 属性                | 默认值                             | 说明               |\n| :------------------ | :--------------------------------- | :----------------- |\n| --header-height     | '45px'                             | 头部高度           |\n| --height            | '28px'                             | 输入框高度         |\n| --disabled-color    | 'var(--za-color-text-disabled)'    | 输入框禁用文字颜色 |\n| --placeholder-color | 'var(--za-color-text-placeholder)' | 输入框占位文字颜色 |\n| --arrow-color       | 'var(--za-arrow-color)'            | 输入框箭头         |\n| --arrow-size        | 'var(--za-arrow-size)'             | 输入框箭头尺寸     |\n| --arrow-width       | 'var(--za-arrow-width)'            | 输入框箭头宽度     |\n"}}]);