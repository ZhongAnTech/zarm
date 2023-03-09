"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7454],{37454:function(n,e,o){o.r(e),e.default="# Popup 弹出框\n\n## 基本用法\n\n```jsx\nimport { useState, useReducer, useRef } from 'react';\nimport { Popup, List, Button, Picker, Toast } from 'zarm';\n\nconst SINGLE_DATA = [\n  { value: '1', label: '选项一' },\n  { value: '2', label: '选项二' },\n];\n\nconst initVisibleState = {\n  popBottom: false,\n  popTop: false,\n  popLeft: false,\n  popRight: false,\n  picker: false,\n  popSpec: false,\n  popCenterSpec: false,\n};\n\nconst Demo = () => {\n  const popupRef = useRef();\n  const [value, setValue] = useState('');\n  const [visible, setVisible] = useReducer((state, action) => {\n    const { type } = action;\n    return {\n      ...state,\n      [type]: !state[type],\n    };\n  }, initVisibleState);\n\n  const toggle = (type) => setVisible({ type });\n\n  return (\n    <>\n      <List>\n        <List.Item\n          title=\"从上方弹出\"\n          suffix={\n            <Button\n              size=\"xs\"\n              onClick={() => {\n                toggle('popTop');\n\n                setTimeout(() => {\n                  toggle('popTop');\n                }, 3000);\n              }}\n            >\n              开启\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"从下方弹出\"\n          suffix={\n            <Button size=\"xs\" onClick={() => toggle('popBottom')}>\n              开启\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"从左侧弹出\"\n          suffix={\n            <Button size=\"xs\" onClick={() => toggle('popLeft')}>\n              开启\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"从右侧弹出\"\n          suffix={\n            <Button size=\"xs\" onClick={() => toggle('popRight')}>\n              开启\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"从中间弹出\"\n          suffix={\n            <Button size=\"xs\" onClick={() => toggle('popCenter')}>\n              开启\n            </Button>\n          }\n        />\n        <List.Item\n          title=\"自定义挂载节点\"\n          suffix={\n            <Button size=\"xs\" onClick={() => toggle('popSpec')}>\n              开启\n            </Button>\n          }\n        />\n      </List>\n\n      <Popup\n        visible={visible.popTop}\n        direction=\"top\"\n        mask={false}\n        afterClose={() => console.log('关闭')}\n      >\n        <div className=\"popup-box-top\">更新成功</div>\n      </Popup>\n\n      <Popup\n        visible={visible.popBottom}\n        direction=\"bottom\"\n        onMaskClick={() => toggle('popBottom')}\n        afterOpen={() => console.log('打开')}\n        afterClose={() => console.log('关闭')}\n        destroy={false}\n        mountContainer={() => document.body}\n      >\n        <div className=\"popup-box\">\n          <Button size=\"xs\" onClick={() => toggle('picker')}>\n            打开Picker\n          </Button>\n        </div>\n      </Popup>\n\n      <Picker\n        visible={visible.picker}\n        value={value}\n        dataSource={SINGLE_DATA}\n        onConfirm={(selected) => {\n          console.log('Picker onConfirm: ', selected);\n          Toast.show(JSON.stringify(selected));\n          setValue(selected.map((item) => item.value));\n          toggle('picker');\n        }}\n        onCancel={() => toggle('picker')}\n        mountContainer={() => document.body}\n      />\n\n      <Popup\n        visible={visible.popLeft}\n        onMaskClick={() => toggle('popLeft')}\n        direction=\"left\"\n        afterClose={() => console.log('关闭')}\n      >\n        <div className=\"popup-box-left\">\n          <Button size=\"xs\" onClick={() => toggle('popLeft')}>\n            关闭弹层\n          </Button>\n        </div>\n      </Popup>\n\n      <Popup\n        visible={visible.popRight}\n        onMaskClick={() => toggle('popRight')}\n        direction=\"right\"\n        afterClose={() => console.log('关闭')}\n      >\n        <div className=\"popup-box-right\">\n          <Button size=\"xs\" onClick={() => toggle('popRight')}>\n            关闭弹层\n          </Button>\n        </div>\n      </Popup>\n\n      <Popup\n        visible={visible.popCenter}\n        direction=\"center\"\n        width=\"70%\"\n        afterClose={() => console.log('关闭')}\n      >\n        <div className=\"popup-box\">\n          <Button size=\"xs\" onClick={() => toggle('popCenter')}>\n            关闭弹层\n          </Button>\n        </div>\n      </Popup>\n\n      <Popup\n        visible={visible.popCenterSpec}\n        direction=\"center\"\n        width=\"70%\"\n        afterClose={() => console.log('关闭')}\n        onEsc={() => {\n          toggle('popCenterSpec');\n        }}\n        mountContainer={() => {\n          return popupRef.current;\n        }}\n      >\n        <div className=\"popup-box\">\n          <Button size=\"xs\" onClick={() => toggle('popCenterSpec')}>\n            关闭弹层\n          </Button>\n        </div>\n      </Popup>\n\n      <Popup\n        visible={visible.popSpec}\n        onMaskClick={() => {\n          if (visible.popCenterSpec) {\n            toggle('popCenterSpec');\n          }\n          toggle('popSpec');\n        }}\n        afterClose={() => console.log('关闭')}\n        onEsc={() => {\n          toggle('popSpec');\n        }}\n        ref={popupRef}\n        destroy={true}\n      >\n        <div className=\"popup-box-bottom\">\n          <Button size=\"xs\" onClick={() => toggle('popCenterSpec')}>\n            打开弹层\n          </Button>\n          <p>打开的modal挂载此popup上</p>\n        </div>\n      </Popup>\n    </>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## API\n\n| 属性              | 类型                 | 默认值              | 说明                                                                                                                                                                                                    |\n| :---------------- | :------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |\n| visible           | boolean              | false               | 是否显示                                                                                                                                                                                                |\n| direction         | string               | 'bottom'            | 弹出方向，可选值 `top`, `bottom`, `left`, `right`, `center`                                                                                                                                             |\n| animationType     | string               | 'fade'              | 当弹出方向为中间位置（direction=\"center\"）时的动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |\n| animationDuration | number               | 200                 | 动画执行时间（单位：毫秒）                                                                                                                                                                              |\n| width             | string &#124; number | -                   | 弹层宽度                                                                                                                                                                                                |\n| mask              | boolean              | true                | 是否展示遮罩层                                                                                                                                                                                          |\n| maskClassName     | string               | -                   | 遮罩层的样式名                                                                                                                                                                                          |\n| maskStyle         | React.CSSProperties  | -                   | 遮罩层的样式                                                                                                                                                                                            |\n| maskColor         | string               | 'black'             | 遮罩层的颜色，可选值 `black`, `white`, `transparent`                                                                                                                                                    |\n| maskOpacity       | string \\| number     | 'normal'            | 遮罩层的透明度，可选值 `normal`, `light`, `dark`，或填写具体数值（0 ~ 1）                                                                                                                               |\n| forceRender       | boolean              | false               | 强制渲染内容                                                                                                                                                                                            |\n| destroy           | boolean              | true                | 弹层关闭后是否移除节点                                                                                                                                                                                  |\n| onOpen            | () => void           | -                   | 弹层展示的回调                                                                                                                                                                                          |\n| onClose           | () => void           | -                   | 弹层关闭的回调                                                                                                                                                                                          |\n| afterOpen         | () => void           | -                   | 弹层展示后的回调                                                                                                                                                                                        |\n| afterClose        | () => void           | -                   | 弹层关闭后的回调                                                                                                                                                                                        |\n| onMaskClick       | () => void           | -                   | 点击遮罩层时触发的回调函数                                                                                                                                                                              |\n| onEsc             | () => void           | -                   | 点击 Esc 键时触发的回调函数                                                                                                                                                                             |\n| mountContainer    | MountContainer       | () => document.body | 指定 Popup 挂载的 HTML 节点                                                                                                                                                                             |\n| lockScroll        | boolean              | true                | 锁定背景滚动                                                                                                                                                                                            |\n"}}]);