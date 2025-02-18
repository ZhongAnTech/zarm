"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[1278],{81278:function(n,e,t){t.r(e),e.default="# ImagePreview 图片预览\n\n## 基本用法\n\n```jsx\nimport { useState, useEffect } from 'react';\nimport { List, Button, ImagePreview, NoticeBar, useOrientation } from 'zarm';\n\nconst commonImages = [\n  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',\n  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',\n  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',\n];\n\nconst Demo = () => {\n  const inIframe = window.self !== window.top;\n  const { type, angle } = useOrientation();\n\n  const orientation = inIframe ? 'portrait' : '';\n\n  const [originImages, setOriginImages] = useState(null);\n  const [visibleState, setVisibleState] = useState({\n    origin: false,\n    common: false,\n    picture: false,\n  });\n\n  const open = (key) => {\n    setVisibleState({\n      ...visibleState,\n      [key]: true,\n    });\n  };\n\n  const hide = (key) => {\n    setVisibleState({\n      ...visibleState,\n      [key]: false,\n    });\n  };\n\n  // 模拟异步数据\n  const fetchData = () => {\n    setTimeout(() => {\n      setOriginImages([\n        {\n          src: 'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',\n          originSrc: 'https://cdn-health.zhongan.com/zarm/imagePreview/1.jpg',\n        },\n        {\n          src: 'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',\n          originSrc: 'https://cdn-health.zhongan.com/zarm/imagePreview/2.jpg',\n        },\n        {\n          src: 'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',\n          originSrc: 'https://cdn-health.zhongan.com/zarm/imagePreview/3.jpg',\n        },\n      ]);\n    }, 5000);\n  };\n\n  useEffect(() => {\n    fetchData();\n  }, []);\n\n  return (\n    <>\n      <List>\n        <NoticeBar>图片缩放只支持Touch事件，建议使用移动模式/设备浏览以获得最佳体验。</NoticeBar>\n        <List.Item\n          suffix={\n            <Button size=\"xs\" onClick={() => open('common')}>\n              开启\n            </Button>\n          }\n        >\n          普通\n        </List.Item>\n        <List.Item\n          suffix={\n            <Button size=\"xs\" onClick={() => open('origin')}>\n              开启\n            </Button>\n          }\n        >\n          有查看原始图片功能\n        </List.Item>\n      </List>\n      <ImagePreview\n        title=\"缩略图预览\"\n        visible={visibleState.common}\n        images={commonImages}\n        onClose={() => hide('common')}\n        maxScale={10}\n        orientation={orientation}\n      />\n      <ImagePreview\n        title=\"原始图预览\"\n        visible={visibleState.origin}\n        images={originImages}\n        onClose={() => hide('origin')}\n        maxScale={5}\n        orientation={orientation}\n      />\n    </>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## 静态用法\n\n```jsx\nimport { useState } from 'react';\nimport { ImagePreview, List, Button } from 'zarm';\n\nconst commonImages = [\n  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',\n  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',\n  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',\n];\n\nconst Demo = () => {\n  const inIframe = window.self !== window.top;\n\n  const orientation = inIframe ? 'portrait' : '';\n\n  return (\n    <List>\n      <List.Item\n        suffix={\n          <Button\n            size=\"xs\"\n            onClick={() => ImagePreview.show({ images: commonImages, orientation })}\n          >\n            开启\n          </Button>\n        }\n      >\n        静态用法\n      </List.Item>\n    </List>\n  );\n};\nReactDOM.render(<Demo />, mountNode);\n```\n\n## 预览指定图片\n\n```jsx\nimport { useState } from 'react';\nimport { ImagePreview, List } from 'zarm';\n\nconst commonImages = [\n  'https://cdn-health.zhongan.com/zarm/imagePreview/1-small.jpg',\n  'https://cdn-health.zhongan.com/zarm/imagePreview/2-small.jpg',\n  'https://cdn-health.zhongan.com/zarm/imagePreview/3-small.jpg',\n];\n\nconst Demo = () => {\n  const inIframe = window.self !== window.top;\n\n  const orientation = inIframe ? 'portrait' : '';\n\n  const [visible, setVisible] = useState(false);\n  const [pictureIndex, setPictureIndex] = useState(0);\n\n  const hide = () => setVisible(false);\n\n  const show = (index) => {\n    setVisible(true);\n    setPictureIndex(index);\n  };\n\n  return (\n    <>\n      <List>\n        <List.Item>\n          {commonImages.map((pic, index) => (\n            <div className=\"picture-item\" onClick={() => show(index)} key={+index}>\n              <img src={pic} alt=\"\" />\n            </div>\n          ))}\n        </List.Item>\n      </List>\n      <ImagePreview\n        visible={visible}\n        images={commonImages}\n        onClose={hide}\n        activeIndex={pictureIndex}\n        orientation={orientation}\n      />\n    </>\n  );\n};\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n## API\n\n| 属性           | 类型                                                 | 默认值 | 说明                                                  |\n| :------------- | :--------------------------------------------------- | :----- | :---------------------------------------------------- |\n| visible        | boolean                                              | false  | 是否显示                                              |\n| title          | ReactNode                                            | -  | 标题                                              |\n| minScale       | number                                               | 1      | 图片最小缩放比例，1 为最小值                          |\n| maxScale       | number                                               | 3      | 图片最大缩放比例                                      |\n| images         | Array<string \\| { src: string; originSrc: string; }> | -      | 图片地址                                              |\n| activeIndex    | number                                               | 0      | 当前展示的图片是第几张，从 0 开始                     |\n| showPagination | boolean                                              | true   | 是否显示分页器                                        |\n| orientation    | string                                               | -      | 横竖屏，默认自动识别。可选值为 `landscape` `portrait` |\n| onChange       | (activeIndex: number) => void                        | -      | 图片切换时候回调                                      |\n| onClose        | () => void                                           | -      | 关闭时候回调                                          |\n\n## CSS 变量\n\n| 属性                    | 默认值                                          | 说明         |\n| :---------------------- | :---------------------------------------------- | :----------- |\n| --footer-padding        | 'var(--za-padding-v-lg) var(--za-padding-h-lg)' | 底部内边距   |\n| --pagination-text-color | 'var(--za-color-text-inverse)'                  | 页码字体颜色 |\n| --pagination-font-size  | 'var(--za-font-size-lg)'                        | 页码字号     |\n"}}]);