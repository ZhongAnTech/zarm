(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{670:function(n,e,t){"use strict";t.r(e),e.default="# Pull \u4e0a\u62c9\u52a0\u8f7d\u4e0b\u62c9\u5237\u65b0\n\n\n\n## \u57fa\u672c\u7528\u6cd5\n```jsx\nimport { useState, useEffect, useRef } from 'react';\nimport { Pull, Cell, Message, Icon, Button, ActivityIndicator, BackToTop } from 'zarm';\n\nconst REFRESH_STATE = {\n  normal: 0,  // \u666e\u901a\n  pull: 1,    // \u4e0b\u62c9\u5237\u65b0\uff08\u672a\u6ee1\u8db3\u5237\u65b0\u6761\u4ef6\uff09\n  drop: 2,    // \u91ca\u653e\u7acb\u5373\u5237\u65b0\uff08\u6ee1\u8db3\u5237\u65b0\u6761\u4ef6\uff09\n  loading: 3, // \u52a0\u8f7d\u4e2d\n  success: 4, // \u52a0\u8f7d\u6210\u529f\n  failure: 5, // \u52a0\u8f7d\u5931\u8d25\n};\n\nconst LOAD_STATE = {\n  normal: 0,   // \u666e\u901a\n  abort: 1,    // \u4e2d\u6b62\n  loading: 2,  // \u52a0\u8f7d\u4e2d\n  success: 3,  // \u52a0\u8f7d\u6210\u529f\n  failure: 4,  // \u52a0\u8f7d\u5931\u8d25\n  complete: 5, // \u52a0\u8f7d\u5b8c\u6210\uff08\u65e0\u65b0\u6570\u636e\uff09\n};\n\nconst getRandomNum = (min, max) => {\n  const Range = max - min;\n  const Rand = Math.random();\n  return (min + Math.round(Rand * Range));\n}\n\nconst fetchData = (length, dataSource = []) => {\n  let newData = [].concat(dataSource);\n  const startIndex = newData.length;\n  for (let i = startIndex; i < startIndex + length; i++) {\n    newData.push(<Cell key={+i}>\u7b2c {i + 1} \u884c</Cell>);\n  }\n  return newData;\n}\n\nlet mounted = true;\n\nconst Demo = () => {\n  const pullRef = useRef();\n  const [bodyScroll, setBodyScroll] = useState(false);\n  const [dataSource, setDataSource] = useState([]);\n  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);\n  const [loading, setLoading] = useState(LOAD_STATE.normal);\n\n  const toggleScrollContainer = () => {\n    const newBodyScroll = !bodyScroll;\n    setBodyScroll(newBodyScroll);\n\n    if (newBodyScroll) {\n      document.body.style.overflow = 'auto';\n    } else {\n      document.body.style.overflow = 'hidden';\n    }\n  };\n\n  // \u6a21\u62df\u8bf7\u6c42\u6570\u636e\n  const refreshData = () => {\n    setRefreshing(REFRESH_STATE.loading);\n    setTimeout(() => {\n      if (!mounted) return;\n      setDataSource(fetchData(20));\n      setRefreshing(REFRESH_STATE.success);\n    }, 2000);\n  }\n\n  // \u6a21\u62df\u52a0\u8f7d\u66f4\u591a\u6570\u636e\n  const loadData = () => {\n    setLoading(LOAD_STATE.loading);\n    setTimeout(() => {\n      if (!mounted) return;\n\n      const randomNum = getRandomNum(0, 5);\n      console.log(`\u72b6\u6001: ${randomNum === 0 ? '\u5931\u8d25' : (randomNum === 1 ? '\u5b8c\u6210' : '\u6210\u529f')}`);\n\n      let loadingState = LOAD_STATE.success;\n      if (randomNum === 0) {\n        loadingState = LOAD_STATE.failure;\n      } else if (randomNum === 1) {\n        loadingState = LOAD_STATE.complete;\n      } else {\n        setDataSource(fetchData(20, dataSource));\n      }\n\n      setLoading(loadingState);\n    }, 2000);\n  }\n\n  useEffect(() => {\n    setDataSource(fetchData(20));\n\n    return () => {\n      mounted = false;\n      document.body.style.overflow = 'auto';\n    };\n  }, []);\n\n  const style = bodyScroll\n    ? {}\n    : { overflowY: 'auto', maxHeight: 400 };\n\n  const scrollContainer = () => {\n    return bodyScroll\n      ? window\n      : pullRef.current && pullRef.current.scrollContainer;\n  }\n\n  return (\n    <>\n      <Message theme=\"warning\" icon={<Icon type=\"warning-round\" />}>\n        \u5f53\u524d\u4f7f\u7528\u7684\u662f `{bodyScroll ? 'window' : 'div' }` \u4f5c\u4e3a\u6eda\u52a8\u5bb9\u5668\u3002\n        <Button theme=\"primary\" size=\"xs\" onClick={toggleScrollContainer}>\u70b9\u51fb\u5207\u6362</Button>\n      </Message>\n      <Pull\n        ref={pullRef}\n        style={style}\n        refresh={{\n          state: refreshing,\n          handler: refreshData,\n          // render: (refreshState, percent) => {\n          //   const cls = 'custom-control';\n          //   switch (refreshState) {\n          //     case REFRESH_STATE.pull:\n          //       return (\n          //         <div className={cls}>\n          //           <ActivityIndicator loading={false} percent={percent} />\n          //           <span>\u4e0b\u62c9\u5237\u65b0</span>\n          //         </div>\n          //       );\n\n          //     case REFRESH_STATE.drop:\n          //       return (\n          //         <div className={cls}>\n          //           <ActivityIndicator loading={false} percent={100} />\n          //           <span>\u91ca\u653e\u7acb\u5373\u5237\u65b0</span>\n          //         </div>\n          //       );\n\n          //     case REFRESH_STATE.loading:\n          //       return (\n          //         <div className={cls}>\n          //           <ActivityIndicator type=\"spinner\" />\n          //           <span>\u52a0\u8f7d\u4e2d</span>\n          //         </div>\n          //       );\n\n          //     case REFRESH_STATE.success:\n          //       return (\n          //         <div className={cls}>\n          //           <Icon type=\"right-round\" theme=\"success\" />\n          //           <span>\u52a0\u8f7d\u6210\u529f</span>\n          //         </div>\n          //       );\n\n          //     case REFRESH_STATE.failure:\n          //       return (\n          //         <div className={cls}>\n          //           <Icon type=\"wrong-round\" theme=\"danger\" />\n          //           <span>\u52a0\u8f7d\u5931\u8d25</span>\n          //         </div>\n          //       );\n\n          //     default:\n          //   }\n          // },\n        }}\n        load={{\n          state: loading,\n          distance: 200,\n          handler: loadData,\n          // render: (loadState) => {\n          //   const cls = 'custom-control';\n          //   switch (loadState) {\n          //     case LOAD_STATE.loading:\n          //       return <div className={cls}><ActivityIndicator type=\"spinner\" /></div>;\n\n          //     case LOAD_STATE.failure:\n          //       return <div className={cls}>\u52a0\u8f7d\u5931\u8d25</div>;\n\n          //     case LOAD_STATE.complete:\n          //       return <div className={cls}>\u6211\u662f\u6709\u5e95\u7ebf\u7684</div>;\n          //   }\n          // },\n        }}\n      >\n        {dataSource}\n      </Pull>\n      <BackToTop\n        scrollContainer={scrollContainer}\n        onClick={() => console.log('click back to top')}\n      >\n        <div\n          style={{\n            width: 60,\n            height: 60,\n            lineHeight: '60px',\n            textAlign: 'center',\n            backgroundColor: '#fff',\n            color: '#999',\n            fontSize: 20,\n            borderRadius: 30,\n            boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',\n            cursor: 'pointer'\n          }}\n        >\n          Up\n        </div>\n      </BackToTop>\n    </>\n  );\n}\n\nReactDOM.render(<Demo />, mountNode);\n```\n\n\n\n## API\n\n| \u5c5e\u6027 | \u7c7b\u578b | \u9ed8\u8ba4\u503c | \u8bf4\u660e |\n| :--- | :--- | :--- | :--- |\n| refresh | Action | - | \u4e0b\u62c9\u5237\u65b0\u7684\u53c2\u6570\u914d\u7f6e |\n| load | Action | - | \u4e0a\u62c9\u52a0\u8f7d\u7684\u53c2\u6570\u914d\u7f6e |\n| animationDuration | number | 400 | \u52a8\u753b\u6267\u884c\u65f6\u95f4\uff0c\u5355\u4f4d\uff1a\u6beb\u79d2 |\n| stayTime | number | 1000 | \u52a0\u8f7d\u6210\u529f\u505c\u7559\u65f6\u95f4 |\n\n### Action \u7c7b\u578b\u5b9a\u4e49\n| \u5c5e\u6027 | \u7c7b\u578b | \u9ed8\u8ba4\u503c | \u8bf4\u660e |\n| :--- | :--- | :--- | :--- |\n| state | REFRESH_STATE &#124; LOAD_STATE | 0 | \u72b6\u6001\u679a\u4e3e |\n| startDistance | number | 30 | \u4e0b\u62c9\u65f6\u7684\u52a9\u8dd1\u8ddd\u79bb\uff0c\u5355\u4f4d\uff1apx |\n| distance | number | 30 | \u89e6\u53d1\u8ddd\u79bb\u9600\u503c\uff0c\u5355\u4f4d\uff1apx\uff1b\u4e0b\u62c9\u5237\u65b0\u9600\u503c\u9ed8\u8ba4\u4e3a30px\uff0c\u4e0a\u62c9\u52a0\u8f7d\u9600\u503c\u9ed8\u8ba4\u4e3a0 |\n| render | (refreshState: REFRESH_STATE &#124; LOAD_STATE, percent: number) => ReactNode | - | \u5404\u72b6\u6001\u6e32\u67d3\u7684\u56de\u8c03\u51fd\u6570 |\n| handler | () => void | - | \u8fbe\u5230\u9600\u503c\u540e\u91ca\u653e\u89e6\u53d1\u7684\u56de\u8c03\u51fd\u6570 |\n\n### REFRESH_STATE \u679a\u4e3e\u5b9a\u4e49\n| \u679a\u4e3e\u503c | \u8bf4\u660e |\n| :--- | :--- |\n| normal | \u666e\u901a\u72b6\u6001 |\n| pull | \u4e0b\u62c9\u72b6\u6001\uff08\u672a\u6ee1\u8db3\u5237\u65b0\u6761\u4ef6\uff09 |\n| drop | \u91ca\u653e\u7acb\u5373\u5237\u65b0\uff08\u6ee1\u8db3\u5237\u65b0\u6761\u4ef6\uff09 |\n| loading | \u52a0\u8f7d\u4e2d |\n| success | \u52a0\u8f7d\u6210\u529f |\n| failure | \u52a0\u8f7d\u5931\u8d25 |\n\n### LOAD_STATE \u679a\u4e3e\u5b9a\u4e49\n| \u679a\u4e3e\u503c | \u8bf4\u660e |\n| :--- | :--- |\n| normal | \u666e\u901a\u72b6\u6001 |\n| abort | \u7ec8\u6b62\u72b6\u6001 |\n| loading | \u52a0\u8f7d\u4e2d |\n| success | \u52a0\u8f7d\u6210\u529f |\n| failure | \u52a0\u8f7d\u5931\u8d25 |\n| complete | \u52a0\u8f7d\u5b8c\u6210 |"}}]);
//# sourceMappingURL=63.e2f9e9e1.js.map