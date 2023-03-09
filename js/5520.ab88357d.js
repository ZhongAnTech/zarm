"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[5520],{65520:function(t,n,e){e.r(n),n.default="# Popper 气泡层\n\n## 基本用法\n\n```jsx\nimport { useState } from 'react';\nimport { List, Button, Popper, Select } from 'zarm';\n\nconst Demo = () => {\n  const [visible, setVisible] = useState(false);\n  const [direction, setDirection] = useState('top');\n  const [trigger, setTrigger] = useState('click');\n  const [animationType, setAnimationType] = useState('zoom-fade');\n\n  return (\n    <List>\n      <List.Item className=\"basic-demo\">\n        <Popper\n          content=\"我是气泡层的内容\"\n          destroy={false}\n          visible={visible}\n          trigger={trigger}\n          direction={direction}\n          animationType={animationType}\n          className=\"custom-content\"\n        >\n          <Button\n            theme=\"primary\"\n            size=\"xs\"\n            onClick={() => trigger === 'manual' && setVisible(!visible)}\n          >\n            点击{visible ? '隐藏' : '显示'}\n          </Button>\n        </Popper>\n      </List.Item>\n      <List.Item title=\"显示方向\">\n        <Select\n          value={direction}\n          dataSource={[\n            { value: 'top-left', label: 'top-left' },\n            { value: 'top', label: 'top' },\n            { value: 'top-right', label: 'top-right' },\n            { value: 'right-top', label: 'right-top' },\n            { value: 'right', label: 'right' },\n            { value: 'right-bottom', label: 'right-bottom' },\n            { value: 'bottom-left', label: 'bottom-left' },\n            { value: 'bottom', label: 'bottom' },\n            { value: 'bottom-right', label: 'bottom-right' },\n            { value: 'left-top', label: 'left-top' },\n            { value: 'left', label: 'left' },\n            { value: 'left-bottom', label: 'left-bottom' },\n          ]}\n          onConfirm={(selected) => setDirection(selected[0])}\n        />\n      </List.Item>\n      <List.Item title=\"动画效果\">\n        <Select\n          value={animationType}\n          dataSource={[\n            { value: 'zoom-fade', label: '缩放渐显(zoom-fade)' },\n            { value: 'menu-slide', label: '菜单拉伸(menu-slide)' },\n            { value: 'fade', label: '淡出淡入效果(fade)' },\n            { value: 'zoom', label: '缩放效果(zoom)' },\n            { value: 'rotate', label: '旋转效果(rotate)' },\n            { value: 'door', label: '开关门效果(door)' },\n            { value: 'flip', label: '翻转效果(flip)' },\n            { value: 'move-up', label: '移出移入效果(move-up)' },\n            { value: 'move-down', label: '移出移入效果(move-down)' },\n            { value: 'move-left', label: '移出移入效果(move-left)' },\n            { value: 'move-right', label: '移出移入效果(move-right)' },\n            { value: 'slide-up', label: '滑出滑入效果(slide-up)' },\n            { value: 'slide-down', label: '滑出滑入效果(slide-down)' },\n            { value: 'slide-left', label: '滑出滑入效果(slide-left)' },\n            { value: 'slide-right', label: '滑出滑入效果(slide-right)' },\n          ]}\n          onConfirm={(selected) => setAnimationType(selected[0])}\n        />\n      </List.Item>\n      <List.Item title=\"触发方式\">\n        <Select\n          value={trigger}\n          dataSource={[\n            { value: 'click', label: '点击状态触发(click)' },\n            { value: 'focus', label: '聚焦状态触发(focus)' },\n            { value: 'hover', label: '鼠标经过触发(hover)' },\n            { value: 'manual', label: '受控触发(manual)' },\n            { value: 'contextMenu', label: '右键触发(contextMenu)' },\n          ]}\n          onConfirm={(selected) => {\n            setTrigger(selected[0]);\n            setVisible(false);\n          }}\n        />\n      </List.Item>\n    </List>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## 自定义箭头\n\n```jsx\nimport { useState } from 'react';\nimport { List, Button, Popper, Radio, Message } from 'zarm';\nimport { WarningCircle } from '@zarm-design/icons';\n\nconst Demo = () => {\n  const [arrowPointAtCenter, setArrowPointAtCenter] = useState(false);\n\n  return (\n    <List>\n      <List.Item\n        suffix={\n          <Radio.Group\n            compact\n            type=\"button\"\n            value={arrowPointAtCenter}\n            onChange={setArrowPointAtCenter}\n          >\n            <Radio value={false}>跟随方向</Radio>\n            <Radio value={true}>元素中心</Radio>\n          </Radio.Group>\n        }\n      >\n        箭头位置\n      </List.Item>\n      <List.Item className=\"direction-demo\">\n        <div>\n          <div style={{ marginLeft: 60 }}>\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"top-left\"\n              content=\"top-left text\"\n            >\n              <Button size=\"xs\">TL</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"top\"\n              content=\"top text\"\n            >\n              <Button size=\"xs\">Top</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"top-right\"\n              content=\"top-right text\"\n            >\n              <Button size=\"xs\">TR</Button>\n            </Popper>\n          </div>\n\n          <div style={{ width: 60, float: 'left', clear: 'both' }}>\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"left-top\"\n              content=\"left-top text\"\n            >\n              <Button size=\"xs\">LT</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"left\"\n              content=\"left text\"\n            >\n              <Button size=\"xs\">Left</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"left-bottom\"\n              content=\"left-bottom text\"\n            >\n              <Button size=\"xs\">LB</Button>\n            </Popper>\n          </div>\n\n          <div style={{ width: 60, marginLeft: 60 * 4 + 20 }}>\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"right-top\"\n              content=\"right-top text\"\n            >\n              <Button size=\"xs\">RT</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"right\"\n              content=\"right text\"\n            >\n              <Button size=\"xs\">Right</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"right-bottom\"\n              content=\"right-bottom text\"\n            >\n              <Button size=\"xs\">RB</Button>\n            </Popper>\n          </div>\n\n          <div style={{ marginLeft: 60, clear: 'both' }}>\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"bottom-left\"\n              content=\"bottom-left text\"\n            >\n              <Button size=\"xs\">BL</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"bottom\"\n              content=\"bottom text\"\n            >\n              <Button size=\"xs\">Bottom</Button>\n            </Popper>\n\n            <Popper\n              arrowPointAtCenter={arrowPointAtCenter}\n              className=\"custom-arrow-content\"\n              hasArrow\n              direction=\"bottom-right\"\n              content=\"bottom-right text\"\n            >\n              <Button size=\"xs\">BR</Button>\n            </Popper>\n          </div>\n\n          <Message theme=\"warning\" icon={<WarningCircle />}>\n            左右两侧显示位置不足会自动调整为反向显示\n          </Message>\n        </div>\n      </List.Item>\n    </List>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## API\n\n| 属性               | 类型                       | 默认值                                 | 说明                                                                                                                                                                               |\n| :----------------- | :------------------------- | :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| className          | string                     | -                                      | 气泡层类名追加                                                                                                                                                                     |\n| content            | ReactNode                  | -                                      | 显示内容                                                                                                                                                                           |\n| hasArrow           | boolean                    | false                                  | 是否显示箭头节点<font color=\"red\">（注：需要自行定义箭头样式）</font>                                                                                                              |\n| destroy            | boolean                    | true                                   | 气泡层关闭后是否移除节点                                                                                                                                                           |\n| mountContainer     | MountContainer             | () => document.body                    | 指定 Popper 挂载的 HTML 节点                                                                                                                                                       |\n| animationType      | string                     | 'zoom-fade'                            | 可选值 `zoom-fade`, `menu-slide`, `fade`, `door`, `flip`, `rotate`, `zoom`,`move-up`, `move-down`, `move-left`, `move-right`,`slide-up`, `slide-down`, `slide-left`, `slide-right` |\n| animationDuration  | number                     | 200                                    | 动画执行时间（单位：毫秒）                                                                                                                                                         |\n| arrowPointAtCenter | boolean                    | false                                  | 箭头是否指向目标元素中心                                                                                                                                                           |\n| mouseEnterDelay    | number                     | 100                                    | 鼠标移入显示气泡层的延时时间（单位：毫秒）                                                                                                                                         |\n| mouseLeaveDelay    | number                     | 100                                    | 鼠标移出隐藏气泡层的延时时间（单位：毫秒）                                                                                                                                         |\n| direction          | string                     | 'top'                                  | 显示方向，可选值 `top-left`、`top`、`top-right`、`right-top`、`right`、`right-bottom`、`bottom-left`、`bottom`、`bottom-right`、`left-top`、`left`、`left-bottom`                  |\n| trigger            | string                     | 移动端为'click' <br /> 桌面端为'hover' | 触发方式，可选值为：`click` 点击触发状态、`hover` 鼠标经过触发、`focus` 聚焦状态触发、`manual` 受控触发、`contextMenu` 右键触发                                                    |\n| visible            | boolean                    | false                                  | 是否显示，`trigger='manual'` 时有效                                                                                                                                                |\n| onVisibleChange    | (visible: boolean) => void | () => {}                               | 显示/隐藏 气泡层触发的事件                                                                                                                                                         |\n|                    |\n"}}]);