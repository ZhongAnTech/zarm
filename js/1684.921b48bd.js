"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[1684],{1684:function(n,e,o){o.r(e),e.default="# PinchZoom 缩放\n\n## 基本用法\n\n```jsx\nimport { useState } from 'react';\nimport { PinchZoom, NoticeBar } from 'zarm';\n\nfunction Demo() {\n  return (\n    <>\n      <NoticeBar>图片缩放只支持Touch事件，建议使用移动模式/设备浏览以获得最佳体验。</NoticeBar>\n      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>\n        <PinchZoom>\n          <img\n            src=\"https://cdn-health.zhongan.com/magiccube/resource/s/hSE9buCehy.png\"\n            style={{ maxWidth: '100%' }}\n          />\n        </PinchZoom>\n      </div>\n    </>\n  );\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## API\n\n| 属性        | 类型                                          | 默认值 | 说明                         |\n| :---------- | :-------------------------------------------- | :----- | :--------------------------- |\n| minScale    | number                                        | 1      | 图片最小缩放比例，1 为最小值 |\n| maxScale    | number                                        | 3      | 图片最大缩放比例             |\n| onPinchZoom | (scale: number, x: number, y: number) => void |        | 缩放或者移动时触发           |\n"}}]);