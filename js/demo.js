(self.webpackChunksite=self.webpackChunksite||[]).push([[2594],{24281:function(e,t,n){"use strict";var r=n(80296),a=n(14041),o=n(32485),c=n.n(o),l=n(50816),i=n(44891),s=n(4580),u=n(11370),m=n(76325),f=n(14449),d=n(19793),p=n(85852),g=n(21659),h=l.A.createFromIconfont(d.assets.iconfont);t.A=function(e){var t=(0,a.useState)(window.localStorage.locale||"zhCN"),n=(0,r.A)(t,2),o=n[0],l=n[1],d=(0,a.useState)(window.localStorage.primaryColor||"#00bc70"),v=(0,r.A)(d,2),y=v[0],A=v[1],E=(0,a.useState)(window.localStorage.theme||"light"),P=(0,r.A)(E,2),b=P[0],C=P[1],w=e.className,S=e.children,k=c()("app-container",w),O="enUS"===o?p.A:g.A;return(0,a.useEffect)((function(){window.scrollTo(0,0),f.A.on(window,"message",(function(e){var t=e.data;t.locale&&l(t.locale)}))}),[y,b]),a.createElement(i.Ay,{theme:b,primaryColor:y,locale:O},a.createElement("div",{className:k},a.createElement("nav",null,a.createElement(s.A,{trigger:"click",content:a.createElement("div",{className:"setting-container"},a.createElement("ul",{className:"colors"},["#00bc70","#1890ff","#f5222d","#fa541b","#13c2c2","#2f54ec","#712fd1"].map((function(e,t){return a.createElement("li",{key:+t,style:{backgroundColor:e},onClick:function(){A(e),window.localStorage.primaryColor=e}})}))),a.createElement("div",{className:"themes"},a.createElement(u.A.Group,{compact:!0,type:"button",value:b,onChange:function(e){C(e),window.localStorage.theme=e}},a.createElement(u.A,{value:"light"},"默认主题"),a.createElement(u.A,{value:"dark"},"暗黑主题"))))},a.createElement("span",{className:"setting"})),window.frames.length===window.parent.frames.length&&a.createElement(a.Fragment,null,a.createElement("div",{className:"lang"},a.createElement(u.A.Group,{compact:!0,type:"button",value:o,onChange:function(e){l(e),window.localStorage.locale=e}},a.createElement(u.A,{value:"zhCN"},"中文"),a.createElement(u.A,{value:"enUS"},"EN"))),a.createElement("a",{className:"github",href:"https://github.com/ZhongAnTech/zarm"},a.createElement(h,{type:"github",size:"lg"})))),a.createElement(m.A.Provider,{value:{locale:o,primaryColor:y,theme:b}},S)))}},21501:function(e,t,n){"use strict";var r=n(14041),a=n(96350),o=n(64104),c=n(76325),l=n(38218);t.A=function(){var e=(0,r.useContext)(c.A).locale;return r.createElement(a.A,{locale:"zh-CN",messages:l.A[e]},r.createElement("footer",null,r.createElement("div",{className:"copyright"},r.createElement(o.A,{id:"app.demo.footer.copyright"}))))}},11498:function(e,t,n){"use strict";n(29279);var r=n(14041),a=n(63562),o=n(5553),c=n(45458),l=n(58168),i=n(24281),s=n(21501),u=n(64467),m=n(80296),f=n(58586),d=n(8959),p=n(76325),g=n(14243),h=n(68208),v=n(94639),y=n(8312),A=n(85852),E=n(21659),P=(n(28092),function(e){var t=e.location,o=e.globalContext,l=e.children,i="".concat(parseInt(1e9*Math.random(),10).toString(36)),s=l.match(/([^]*)\n?(```[^]+```)/),u=String(s[1]),m=(0,r.useRef)(),f=(0,r.useCallback)((function(){var e=s[2].match(/```(.*)\n?([^]+)```/);Promise.all([n.e(4117),n.e(3221)]).then(n.bind(n,63221)).then((function(e){var t={en_US:A.A,zh_CN:E.A};return{args:["context","React","ReactDOM","Zarm","GlobalContext","Locale","ZarmDesignIcons"],argv:[void 0,r,a,e,o,t,y]}})).then((function(t){var n=t.args,r=t.argv,a="ReactDOM.render(\n          <Zarm.ConfigProvider primaryColor={GlobalContext.primaryColor} theme={GlobalContext.theme} locale={Locale[GlobalContext.locale === 'zhCN' ? 'zh_CN' : 'en_US']}>\n            $1\n          </Zarm.ConfigProvider>,\n          document.getElementById('".concat(i,"'),\n        )"),o=e[2].replace(/import\s+\{\s+([\s\S]*)\s+\}\s+from\s+'react';/,"const { $1 } = React;").replace(/import\s+\{\s+([\s\S]*)\s+\}\s+from\s+'zarm';/,"const { $1 } = Zarm;").replace(/import\s+\{\s+([\s\S]*)\s+\}\s+from\s+'@zarm-design\/icons';/,"const { $1 } = ZarmDesignIcons;").replace(/import\s+([\s\S]*)\s+from\s+'@zarm-design\/icons';/,"const $1 = ZarmDesignIcons;").replace(/import\s+(.*)\s+from\s+'zarm\/lib\/config-provider\/locale\/(.*)';/g,"const $1 = Locale['$2'];").replace(/ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g,a).replace(/ReactDOM.render\(\s?([^]+?)(,([\r\n])(\s)*mountNode,(\s)*\))/g,a),l=(0,h.transform)(o,{presets:["es2015","react"],plugins:["proposal-class-properties"]}).code;n.push(l),(0,g.A)(Function,(0,c.A)(n)).apply(void 0,(0,c.A)(r))})).catch((function(e){}))}),[i,s,o]);return(0,r.useEffect)((function(){var e=m.current;return f(),function(){e&&a.unmountComponentAtNode(e)}}),[f]),"/panel"===t.pathname?r.createElement("div",{id:i,ref:m}):r.createElement(v.A,{title:u},r.createElement("div",{id:i,ref:m}))});function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){(0,u.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var S=function(e){var t=(0,r.useContext)(p.A),n=e.content,o=new Map,c=[];if("string"!=typeof n)return null;(0,r.useEffect)((function(){return function(){var e,t=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}(o);try{for(t.s();!(e=t.n()).done;){var n=(0,m.A)(e.value,2),r=n[0],l=n[1],i=document.getElementById(r);c.push(i),i instanceof HTMLElement&&a.render(l,i)}}catch(e){t.e(e)}finally{t.f()}}(),function(){c.forEach((function(e){a.unmountComponentAtNode(e)}))}}));var l=(0,f.xI)(n.replace(/## 自定义 Iconfont 图标\s?([^]+)/g,"").replace(/## API\s?([^]+)/g,"").replace(/##\s?([^]+?)((?=##)|$)/g,(function(n,a){var c=parseInt(1e9*Math.random(),10).toString(36);return o.set(c,r.createElement(P,C(C({},e),{},{globalContext:t,location:(0,d.zy)()}),a)),"<div id=".concat(c,"></div>")})),{renderer:new f.xI.Renderer});return r.createElement("main",{dangerouslySetInnerHTML:{__html:l}})},k=n(23029),O=n(92901),x=n(85501),T=n(21964),I=n(53954),N=n(94601),M=n(80982);N.Ts({dsn:"https://94149d955af0480aaef1edd42fa6c17e@ets.zhongan.io/8",release:"0.0.32",environment:"prd"});var D=function(e){(0,x.A)(o,e);var t,n,a=(t=o,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,I.A)(t);if(n){var a=(0,I.A)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,T.A)(this,e)});function o(e){var t;return(0,k.A)(this,o),(t=a.call(this,e)).state={error:null,eventId:null},t}return(0,O.A)(o,[{key:"componentDidCatch",value:function(e,t){var n=this;this.setState({error:e}),M.v4((function(r){r.setExtras(t);var a=M.Cp(e);n.setState({eventId:a})}))}},{key:"render",value:function(){var e=this.props.children,t=this.state,n=t.error,a=t.eventId;return n?r.createElement("button",{onClick:function(){return N.mn({eventId:a})}},"Report feedback"):e}}]),o}(r.Component),R=D,z=n(19793),j=n(55624),U=n(82780),B=n.n(U),F=n(57312),$=function(){return r.useEffect((function(){var e=F.A.show({icon:"loading",duration:0}).close;return function(){null==e||e()}}),[]),null},Z=function(e){var t={page:e.module},a=(0,j.fL)(e.key);return e.style&&(t.style=function(){return n(64445)("./".concat(a,"Page"))}),B().Map({loader:t,render:function(t,n){return r.createElement(i.A,{className:"".concat(e.key,"-page")},r.createElement(S,(0,l.A)({content:t.page.default,component:e},n)),r.createElement(s.A,null))},loading:function(){return r.createElement($,null)}})},_=function(){var e=z.components.general,t=z.components.form,a=z.components.feedback,o=z.components.view,l=z.components.navigation,i=z.components.hooks,s=z.components.other;return r.createElement(R,null,r.createElement(r.Suspense,{fallback:r.createElement($,null)},r.createElement(d.dO,null,r.createElement(d.qh,{exact:!0,path:"/",component:(0,r.lazy)((function(){return n.e(4326).then(n.bind(n,44326))}))}),[].concat((0,c.A)(e),(0,c.A)(t),(0,c.A)(a),(0,c.A)(o),(0,c.A)(l),(0,c.A)(i),(0,c.A)(s)).map((function(e,t){return r.createElement(d.qh,{key:+t,path:"/".concat(e.key),component:Z(e)})})),r.createElement(d.qh,{component:(0,r.lazy)((function(){return n.e(5783).then(n.bind(n,55783))}))}))))};a.render(r.createElement(o.I9,null,r.createElement(_,null)),document.getElementById("app"))},85852:function(e,t,n){"use strict";n.d(t,{A:function(){return r}});var r={locale:"en-US",ActionSheet:{cancelText:"Cancel"},Modal:{confirmText:"Ok",cancelText:"Cancel"},DatePicker:{cancelText:"Cancel",confirmText:"Ok",title:"please select"},DatePickerView:{year:"",month:"",week:"",weeks:["MON","TUE","WED","THU","FRI","SAT","SUN"],day:"",hour:"",minute:"",second:"",am:"AM",pm:"PM"},DateSelect:{placeholder:"please select"},Picker:{title:"please select",confirmText:"Ok",cancelText:"Cancel"},Cascader:{cancelText:"Cancel",confirmText:"Ok",title:"please select"},CascaderView:{unselectedTabText:"Select"},Pull:{pullText:"pull down to refresh",dropText:"release to refresh",loadingText:"loading",successText:"loaded successfully",failureText:"failed to load",completeText:"loading completed"},SearchBar:{placeholder:"Search",cancelText:"Cancel"},Select:{placeholder:"please select"},Keyboard:{confirmText:"Ok"},ImagePreview:{loadBefore:"load origin",loadStart:"loading",loadEnd:"loading completed"},Image:{loadFailed:"loading failed",loading:"loading"},Calendar:{weeks:["SUN","MON","TUE","WED","THU","FRI","SAT"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],yearMonthFormat:"MMM YYYY",weekStartsOn:"Sunday"}}},64445:function(e,t,n){var r={"./AffixPage":[25881,5881],"./BadgePage":[58424,8424],"./ButtonPage":[22515,2515],"./CalendarPage":[51893,1893],"./CarouselPage":[29541,9541],"./CellPage":[43339,3339],"./CheckboxPage":[11854,1854],"./ConfigProviderPage":[17480,7480],"./FilePickerPage":[67919,7919],"./GridPage":[79139,9139],"./IconPage":[92062,2062],"./ImagePage":[29254,9254],"./ImagePreviewPage":[99696,9696],"./MaskPage":[94899,4899],"./MessagePage":[98008,8008],"./ModalPage":[20482,482],"./NoticeBarPage":[91658,1658],"./PanelPage":[38025,8025],"./PickerPage":[20153,153],"./PopperPage":[49657,9657],"./PopupPage":[48485,8485],"./ProgressPage":[45812,5812],"./PullPage":[47976,7976],"./RadioPage":[11632,1632],"./SearchBarPage":[66802,6802],"./SkeletonPage":[12096,2096],"./TabsPage":[98535,8535],"./ToastPage":[20412,412],"./TooltipPage":[9288,6907]};function a(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],a=t[0];return n.e(t[1]).then((function(){return n(a)}))}a.keys=function(){return Object.keys(r)},a.id=64445,e.exports=a}},function(e){e.O(0,[9288,4971,6187],(function(){return e(e.s=11498)})),e.O()}]);