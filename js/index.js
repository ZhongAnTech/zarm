(self.webpackChunksite=self.webpackChunksite||[]).push([[4826],{16782:function(e,t,n){"use strict";n.d(t,{Z:function(){return j}});var a=n(87462),o=n(44925),r=n(2784),c=n(94184),i=n.n(c),l=n(70246),p=n(21141),s=(n(85891),n(75500)),m=(n(44014),n(77579)),u=n(70885),d=n(65235),f=n(42670),g=n(37940),h=n(66835),b=n(8496),x=n(13741),E=n(776),_=n(43604),y=n.n(_),v=n(90549),z=n(29282),k=n(72972),w=n(34610),Z=n(834),N=n(35929),P=(n(22388),h.Z.createFromIconfont(z.assets.iconfont)),C=function(e){var t=e.children,a=(0,r.useRef)(),o=(0,d.TH)(),c=(0,r.useState)(!1),l=(0,u.Z)(c,2),h=l[0],_=l[1],z=(0,r.useState)(!1),C=(0,u.Z)(z,2),j=C[0],O=C[1],S=(0,r.useState)(window.localStorage.locale||"zhCN"),T=(0,u.Z)(S,2),A=T[0],R=T[1],I=o.pathname.split("/")[1]||"/",B=function(e){83===e.keyCode&&e.target===document.body&&a.current.focus()},M=[{key:"docs",link:"#/docs",title:r.createElement(f.Z,{id:"app.home.nav.docs"})},{key:"components",link:"#/components",title:r.createElement(f.Z,{id:"app.home.nav.components"})},{key:"design",link:"#/design",title:r.createElement(f.Z,{id:"app.home.nav.resources"})},{key:"gitee",link:"https://zarm.gitee.io",title:"国内镜像"}];(document.location.host.indexOf("gitee")>-1||"enUS"===A)&&M.pop(),(0,r.useEffect)((function(){return k.Z.on(document,"keyup",B),y()({apiKey:"44e980b50447a3a5fac9dc2a4808c439",indexName:"zarm",inputSelector:".search input",debug:!1}),function(){k.Z.off(document,"keyup",B)}}),[]);var D="/"!==I&&r.createElement("div",{className:"header-icon header-icon-menu"},"design"!==I&&r.createElement(r.Fragment,null,r.createElement(P,{type:"menu",onClick:function(){return _(!h)}}),r.createElement(b.Z,{visible:h,direction:"left",onMaskClick:function(){return _(!h)}},r.createElement("div",{className:"header-menu"},r.createElement(v.Z,null))))),U=r.createElement("div",{className:"header-icon header-icon-more"},r.createElement(s.Z,{visible:j,onVisibleChange:O,direction:"bottom",content:r.createElement("div",{className:"header-nav"},r.createElement(m.Z,{selectedKeys:[I]},M.map((function(e){return r.createElement(m.Z.Item,{key:e.key},r.createElement("a",{href:e.link},e.title))})),r.createElement(m.Z.Item,null,r.createElement("a",{href:"https://github.com/ZhongAnTech/zarm",target:"_blank",rel:"noopener noreferrer"},"Github"))))},r.createElement(P,{type:"more"})));return r.createElement(g.Z,{locale:"zh-CN",messages:Z.Z[A]},r.createElement(w.Z.Provider,{value:{locale:A}},r.createElement("header",null,r.createElement("div",{className:"header-container"},D,r.createElement("div",{className:"logo"},r.createElement("a",{href:"#/"},r.createElement("img",{alt:"logo",src:n(80780)}),"Zarm",r.createElement("sup",{className:"logo-version"},"v",N.i8))),U,r.createElement("nav",null,r.createElement("div",{className:"search"},r.createElement(p.Search,null),r.createElement(f.Z,{id:"app.home.nav.search"},(function(e){return r.createElement("input",{placeholder:e,ref:a})}))),r.createElement("ul",null,M.map((function(e){return r.createElement("li",{key:e.key},r.createElement("a",{href:e.link,className:(t=[e.key],i()({active:t.indexOf(I)>-1}))},e.title));var t}))),r.createElement("div",{className:"version"},r.createElement(E.Z,{defaultValue:"",options:[{value:"",label:N.i8},{value:"2x",label:"2.x"},{value:"1x",label:"1.x"}],onChange:function(e){e&&(window.location.href="https://".concat(e,".zarm.design"))}})),r.createElement("div",{className:"lang"},r.createElement(x.Z.Group,{compact:!0,type:"button",value:A,onChange:function(e){R(e),window.localStorage.locale=e}},r.createElement(x.Z,{value:"zhCN"},"中文"),r.createElement(x.Z,{value:"enUS"},"EN"))),r.createElement("a",{className:"github",href:"https://github.com/ZhongAnTech/zarm",target:"_blank",rel:"noopener noreferrer"},r.createElement(P,{type:"github"}))))),t))},j=function(e){var t=e.className,n=e.children,c=(0,o.Z)(e,["className","children"]),s=i()("app-container",t);return r.createElement("div",(0,a.Z)({className:s},c),r.createElement(C,null,n),r.createElement(l.Z,null,r.createElement("div",{className:"scroll-to-top"},r.createElement(p.ArrowUp,{size:"sm"}))))}},90549:function(e,t,n){"use strict";n(44014);var a=n(77579),o=n(2784),r=n(65235),c=n(49464),i=n(42670),l=n(34610),p=n(29282);t.Z=function(){var e,t,n,s=(0,o.useContext)(l.Z).locale,m=(0,r.UO)();return(0,r.$B)("/components")?(e=[m.component],t=function(e,t){return Object.keys(e).map((function(n){return o.createElement(a.Z.ItemGroup,{key:n,title:o.createElement(o.Fragment,null,o.createElement(i.Z,{id:"app.components.group.".concat(n)}),"（",e[n].length,"）")},e[n].sort((function(e,t){return e.key.localeCompare(t.key)})).map((function(e){return o.createElement(a.Z.Item,{key:e.key},o.createElement("a",{href:"#/components/".concat(e.key)},o.createElement("span",null,"hooks"===n?e.key:(0,c.Ho)(e.key)),"zhCN"===t&&o.createElement("span",{className:"chinese"},e.name)))})))}))}(p.components,s)):(e=[m.doc],n=p.documents,t=Object.keys(n).map((function(e){return o.createElement(a.Z.ItemGroup,{key:e,title:o.createElement(i.Z,{id:"app.docs.group.".concat(e)})},n[e].map((function(e){return o.createElement(a.Z.Item,{key:e.key},o.createElement("a",{href:"#/docs/".concat(e.key)},o.createElement(i.Z,{id:"app.docs.article.".concat(e.key)})))})))}))),o.createElement("div",{className:"menu"},o.createElement(a.Z,{selectedKeys:e},t))}},39932:function(e,t,n){"use strict";var a=n(15671),o=n(43144),r=n(60136),c=n(64575),i=n(61120),l=n(2784),p=n(13980),s=n.n(p),m=n(18671);var u=function(e){(0,r.Z)(s,e);var t,n,p=(t=s,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(a,arguments,o)}else e=a.apply(this,arguments);return(0,c.Z)(this,e)});function s(){return(0,a.Z)(this,s),p.apply(this,arguments)}return(0,o.Z)(s,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.description;return l.createElement(m.q,{encodeSpecialCharacters:!1},l.createElement("html",{lang:"zh"}),l.createElement("title",null,t),l.createElement("meta",{name:"description",content:n}),l.createElement("meta",{property:"og:title",content:t}),l.createElement("meta",{property:"og:type",content:"website"}),l.createElement("meta",{property:"og:image",content:"https://zarm.design/images/logo.ce68565d.svg"}))}}]),s}(l.PureComponent);u.propTypes={title:s().string,description:s().string},u.defaultProps={title:"",description:""},t.Z=u},63097:function(e,t,n){"use strict";n(21926);var a=n(2784),o=n(89760),r=n(26213),c=n(70830),i=n(65235),l=function(){return a.createElement(i.rs,null,a.createElement(i.l_,{exact:!0,from:"/docs",to:"/docs/about-zarm"}),a.createElement(i.l_,{exact:!0,from:"/components",to:"/components/button"}),a.createElement(i.l_,{exact:!0,from:"/design",to:"/design/download"}),a.createElement(i.AW,{exact:!0,path:"/",component:n(77633).Z}),a.createElement(i.AW,{path:"/docs/:doc",component:n(87565).Z}),a.createElement(i.AW,{path:"/components/:component",component:n(87565).Z}),a.createElement(i.AW,{path:"/design/:page",component:n(37532).Z}),a.createElement(i.AW,{path:"*",component:n(77206).Z}),a.createElement(i.l_,{to:"/"}))};o.render(a.createElement(r.UT,null,a.createElement(c.ZP,{theme:{token:{colorPrimary:"#00bc70"}}},a.createElement(l,null))),document.getElementById("app"))},87565:function(e,t,n){"use strict";n.d(t,{Z:function(){return G}});var a=n(70885),o=n(87462),r=n(29282),c=n(34610),i=n(16782),l=n(15671),p=n(43144),s=n(60136),m=n(64575),u=n(61120),d=n(2784),f=n(42670);var g=function(e){(0,s.Z)(o,e);var t,n,a=(t=o,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,u.Z)(t);if(n){var o=(0,u.Z)(this).constructor;e=Reflect.construct(a,arguments,o)}else e=a.apply(this,arguments);return(0,m.Z)(this,e)});function o(){return(0,l.Z)(this,o),a.apply(this,arguments)}return(0,p.Z)(o,[{key:"render",value:function(){return d.createElement("footer",null,d.createElement("div",{className:"group"},d.createElement("h2",null,d.createElement(f.Z,{id:"app.home.footer.resources"})),d.createElement("ul",null,d.createElement("li",null,d.createElement("a",{href:"https://vue.zarm.design",rel:"noopener noreferrer",target:"_blank"},"Zarm Vue")," ","- Zarm of Vue"),d.createElement("li",null,d.createElement("a",{href:"https://web.zarm.design",rel:"noopener noreferrer",target:"_blank"},"Zarm Web")),d.createElement("li",null,d.createElement("a",{href:"/#/design/download"},d.createElement(f.Z,{id:"app.home.resources"}))))),d.createElement("div",{className:"group"},d.createElement("h2",null,d.createElement(f.Z,{id:"app.home.footer.community"})),d.createElement("ul",null,d.createElement("li",null,d.createElement("a",{href:"https://zhuanlan.zhihu.com/c_135293309",rel:"noopener noreferrer",target:"_blank"},d.createElement(f.Z,{id:"app.home.footer.community.zhihu"}))),d.createElement("li",null,d.createElement("a",{href:"https://app.mokahr.com/apply/zhongan/320",rel:"noopener noreferrer",target:"_blank"},d.createElement(f.Z,{id:"app.home.footer.community.joinus"}))))),d.createElement("div",{className:"group"},d.createElement("h2",null,d.createElement(f.Z,{id:"app.home.footer.help"})),d.createElement("ul",null,d.createElement("li",null,d.createElement("a",{href:"https://github.com/ZhongAnTech/zarm",rel:"noopener noreferrer",target:"_blank"},"Github")),d.createElement("li",null,d.createElement("a",{href:"/#/docs/change-log"},d.createElement(f.Z,{id:"app.home.footer.help.changelog"}))),d.createElement("li",null,d.createElement("a",{href:"https://github.com/ZhongAnTech/zarm/issues/new",rel:"noopener noreferrer",target:"_blank"},d.createElement(f.Z,{id:"app.home.footer.help.bug-report"}))),d.createElement("li",null,d.createElement("a",{href:"https://github.com/ZhongAnTech/zarm/issues",rel:"noopener noreferrer",target:"_blank"},d.createElement(f.Z,{id:"app.home.footer.help.bug-list"}))),d.createElement("li",null,d.createElement("a",{href:"https://gitter.im/ZhonganTech/zarm",rel:"noopener noreferrer",target:"_blank"},d.createElement(f.Z,{id:"app.home.footer.help.chat"}))))))}}]),o}(d.Component),h=g,b=n(39932),x=n(49464),E=n(57647),_=n.n(E),y=n(19870),v=n(53712),z=n.n(v),k=(n(18267),n(55744),n(64883),n(89651),n(63083),n(70662),n(43892),n(2416),n(58650),n(87973),n(53479)),w=n(66835),Z=n(67482),N=n(53302),P=n(35929),C=function(e){return-1===Object.values(r.documents).flat().findIndex((function(t){return t.key===e}))},j=w.Z.createFromIconfont(r.assets.iconfont),O=function(e){var t=(0,k.Z)(),o=e.document,r=e.component,i=(0,d.useContext)(c.Z).locale;d.useEffect((function(){var e=new(_())(".clipboard-code");return function(){e.destroy()}}),[]);var l={table:function(e,t){return'<div class="grid-container"><table class="grid"><thead>'.concat(e,"</thead><tbody>").concat(t,"</tbody></table></div>")},code:function(e,o){var c=Object.keys(z().languages).indexOf(o)>-1?z().highlight(e,z().languages[o],o):e;return C(r.key)?function(e){var t=e.code,o=e.component,r=e.preview,c=e.formatMessage,i="".concat(o.name," ").concat((0,x.Ho)(o.key)," - Zarm Design"),l="".concat(o.key,"-page"),p=t,s="import React from 'react';",m=/import(\D*)from 'react';/,u=p.match(m);u&&(s=(0,a.Z)(u,1)[0],p=p.replace(m,"").trim()),p=p.replace("mountNode","document.getElementById('container')");var d="\n".concat(s,"\nimport ReactDOM from 'react-dom';\nimport 'zarm/dist/zarm.css';\nimport './index.css';\n").concat(p,"\n").trim(),f='<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">\n  </head>\n  <body>\n    <div class="'.concat(l,'" id="container" style="padding: 24px" />\n  </body>\n</html>'),g={files:{"package.json":{content:{title:i,main:"index.js",dependencies:{zarm:P.i8,react:"^18","react-dom":"^18","react-scripts":"^5.0.0"},devDependencies:{typescript:"^4.0.5"},scripts:{start:"react-scripts start",build:"react-scripts build",test:"react-scripts test --env=jsdom",eject:"react-scripts eject"}}},"index.css":{content:""},"index.js":{content:d},"index.html":{content:f}}};o.style&&(g.files["index.css"]={content:n(25649)("./".concat((0,x.Ho)(o.key),"Page.scss")).default});var h=(0,N.Z)(g),b="clipboard-".concat(Math.random().toString(36).substring(4));return'<div class="code-preview">\n    <div class="actions">\n      <form\n        action="https://codesandbox.io/api/v1/sandboxes/define"\n        method="POST"\n        target="_blank"\n      >\n        <input type="hidden" name="parameters" value="'.concat(h,'" />\n        <button class="za-button za-button--sm za-button--radius za-button--link" type="submit" title="').concat(c({id:"app.components.preview.action.codesandbox"}),'">\n          <i class="za-icon za-icon--sm">\n            <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1000 1000">\n              <use xlink:href="#codesandbox"></use>\n            </svg>\n          </i>\n        </button>\n      </form>\n      <textarea class="clipboard-content ').concat(b,'">').concat(t,'</textarea>\n      <button class="za-button za-button--sm za-button--radius za-button--link clipboard-code" data-clipboard-target=".').concat(b,'" title="').concat(c({id:"app.components.preview.action.copy"}),'"">\n        <i class="za-icon za-icon--sm">\n          <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1000 1000">\n            <use xlink:href="#copy"></use>\n          </svg>\n        </i>\n      </button>\n    </div>\n    ').concat(r,"\n  </div>")}({code:e,component:r,preview:'<pre class="language-'.concat(o,'">').concat(c,"</pre>"),formatMessage:t.formatMessage}):'<pre class="language-'.concat(o,'">').concat(c,"</pre>")},heading:function(e,t){return 1===t?"":"<h".concat(t,">").concat(e,"</h").concat(t,">")}};if(y.TU.use({renderer:l}),(0,d.useEffect)((function(){window.scrollTo(0,0)}),[]),"string"==typeof o){var p=C(r.key)?"".concat("zhCN"===i?r.name:""," ").concat(0!==r.key.indexOf("use")?(0,x.Ho)(r.key):r.key):t.formatMessage({id:"app.docs.article.".concat(r.key)}),s="".concat(r.key,"-page"),m=(0,y.TU)(o.replace(/## API\s?([^]+)/g,"")),u=o.match(/## API\s?([^]+)/g),g=(0,y.TU)("[object Array]"===Object.prototype.toString.call(u)?u[0]:""),h="https://github.com/ZhongAnTech/zarm/blob/master/".concat(r.source.replace("zarm/","packages/zarm/src/").replace("@zarmDir/","packages/zarm/").replace("@/","packages/site/"));return d.createElement(d.Fragment,null,d.createElement(b.Z,{title:"".concat(p," - Zarm Design"),description:r.description||r.name}),d.createElement("div",{className:s},d.createElement("h1",null,p," ",d.createElement(Z.Z,{visible:!0,content:d.createElement(f.Z,{id:"app.home.components.action.edit"}),direction:"right"},d.createElement("a",{alt:"#",href:h,rel:"noreferrer",target:"_blank"},d.createElement(j,{type:"edit"})))),d.createElement("div",{className:"demo",dangerouslySetInnerHTML:{__html:m}}),d.createElement("div",{className:"api",dangerouslySetInnerHTML:{__html:g}})))}return d.createElement("span",null)},S=n(90549),T=function(){return d.createElement("div",{className:"side-bar"},d.createElement(S.Z,null))},A=n(94184),R=n.n(A),I=n(29782),B=n(89028),M=n.n(B),D=n(65235),U=n(30638),W=function(e){return M()({loader:e.module,render:function(t,n){return d.createElement(O,(0,o.Z)({document:t.default,component:e},n))},loading:function(){return null}})},F=w.Z.createFromIconfont(r.assets.iconfont),H=function(){var e=(0,D.UO)(),t=(0,d.useRef)(),n=(0,d.useContext)(c.Z).locale,o=(0,d.useState)(JSON.parse(window.localStorage["simulator-affix"]||!1)),r=(0,a.Z)(o,2),i=r[0],l=r[1];(0,d.useEffect)((function(){!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)&&t.current.contentWindow.postMessage({locale:n},"*")}),[n]);var p="".concat(window.location.protocol,"//").concat(window.location.host,"/demo.html#/").concat(e.component),s=function(){var e;null===(e=t.current)||void 0===e||e.contentWindow.location.reload()};return d.createElement("div",{className:R()("simulator",{"simulator--affix":i})},d.createElement("div",{className:"simulator__controls"},d.createElement(f.Z,{id:"app.home.components.simulator.".concat(i?"unaffix":"affix")},(function(e){return d.createElement("div",{className:R()("simulator__control",{"simulator__control--active":i}),onClick:function(){l(!i),window.localStorage["simulator-affix"]=!i},title:e},d.createElement(F,{type:"pin",size:"sm"}))})),d.createElement(f.Z,{id:"app.home.components.simulator.qrcode"},(function(e){return d.createElement(U.Z,{content:d.createElement(I.tv,{value:p,size:120,style:{display:"block"}}),direction:"left-top",className:"simulator__qrcode",mountContainer:!1},d.createElement("div",{className:"simulator__control",title:e},d.createElement(F,{type:"qrcode",size:"sm"})))})),d.createElement(f.Z,{id:"app.home.components.simulator.openwindow"},(function(e){return d.createElement("div",{className:"simulator__control",title:e,onClick:function(){return window.open(p)}},d.createElement(F,{type:"link",size:"sm"}))})),d.createElement(f.Z,{id:"app.home.components.simulator.reload"},(function(e){return d.createElement("div",{className:"simulator__control",title:e,onClick:s},d.createElement(F,{type:"reload",size:"sm"}))}))),d.createElement("iframe",{ref:t,src:p,title:"simulator",frameBorder:"0"}))},G=function(){var e=!!(0,D.$B)("/components"),t=R()("main-container","markdown",{"no-simulator":!e});return d.createElement(i.Z,{className:"components-page"},d.createElement("main",null,d.createElement(T,null),e&&d.createElement(H,null),d.createElement("div",{className:t},d.createElement(D.rs,null,Object.values(r.documents).flat().map((function(e,t){return d.createElement(D.AW,{key:+t,path:"/docs/".concat(e.key),component:W(e)})})),Object.values(r.components).flat().map((function(e,t){return d.createElement(D.AW,{key:+t,path:"/components/".concat(e.key),component:W(e)})})),d.createElement(D.l_,{to:"/"})))),d.createElement(h,null))}},37532:function(e,t,n){"use strict";var a=n(2784),o=n(65235),r=n(29282),c=n(16782);t.Z=function(){return a.createElement(a.Suspense,{fallback:function(){return null}},a.createElement(c.Z,{className:"design-page"},a.createElement("main",null,a.createElement("div",{className:"main-container markdown"},a.createElement(o.rs,null,r.design.map((function(e,t){return a.createElement(o.AW,{key:+t,path:"/design/".concat(e.key),component:(0,a.lazy)(e.module)})})),a.createElement(o.l_,{to:"/"}))))))}},77633:function(e,t,n){"use strict";var a=n(70885),o=n(2784),r=n(65235),c=n(42670),i=n(30638),l=n(29782),p=n(16782),s=n(39932);t.Z=function(){var e=(0,o.useState)(!1),t=(0,a.Z)(e,2),m=t[0],u=t[1],d=(0,r.k6)(),f="".concat(window.location.origin,"/demo.html");return o.createElement(p.Z,{className:"index-page"},o.createElement(c.Z,{id:"app.title"},(function(e){return o.createElement(s.Z,{title:"Zarm Design - ".concat(e)})})),o.createElement("main",null,o.createElement("div",{className:"banner"},o.createElement("img",{src:n(59964),alt:""})),o.createElement("div",{className:"introduce"},o.createElement("div",{className:"title"},o.createElement("span",null,"Zarm")," Design"),o.createElement("div",{className:"description"},o.createElement(c.Z,{id:"app.home.index.introduce"})),o.createElement("div",{className:"navigation"},o.createElement("button",{type:"button",onClick:function(){return d.push("/docs")}},o.createElement(c.Z,{id:"app.home.index.getting-started"})),o.createElement(i.Z,{trigger:"click",className:"qrcode",visible:m,onVisibleChange:u,direction:"bottom",content:o.createElement("a",{href:f},o.createElement(l.tv,{value:f,size:120})),destroy:!1},o.createElement("button",{type:"button",className:"ghost"},o.createElement(c.Z,{id:"app.home.index.scanning-code"})))))))}},77206:function(e,t,n){"use strict";var a=n(15671),o=n(43144),r=n(60136),c=n(64575),i=n(61120),l=n(2784),p=n(16782);var s=function(e){(0,r.Z)(m,e);var t,n,s=(t=m,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,a=(0,i.Z)(t);if(n){var o=(0,i.Z)(this).constructor;e=Reflect.construct(a,arguments,o)}else e=a.apply(this,arguments);return(0,c.Z)(this,e)});function m(){return(0,a.Z)(this,m),s.apply(this,arguments)}return(0,o.Z)(m,[{key:"render",value:function(){return l.createElement(p.Z,null,l.createElement("main",null,"Not Found Page"))}}]),m}(l.PureComponent);t.Z=s},82318:function(e,t,n){"use strict";n.r(t),t.default=".affix-page .seperator{height:500px}.affix-page .scrollable-container{height:100px;overflow-y:scroll}.affix-page .background{padding-top:60px;height:300px;background-image:url(https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg)}"},73092:function(e,t,n){"use strict";n.r(t),t.default=".badge-page .custom-panel{display:flex;justify-content:flex-start;padding:25px 0 0 0;width:100%;flex-flow:wrap}.badge-page .custom-panel .box{width:25%;margin-bottom:25px;text-align:center}.badge-page .custom-panel .box-item{background:#ccc;width:24px;height:24px}"},52967:function(e,t,n){"use strict";n.r(t),t.default=".button-page .za-panel__body{overflow:hidden;padding:15px 15px 0 15px}.button-page .za-panel__body .za-button{margin-bottom:15px;margin-right:15px}.button-page main>div:last-child .za-panel__body{background-color:#333}"},99777:function(e,t,n){"use strict";n.r(t),t.default=".calendar-page .za-calendar__body{max-height:50vh}.calendar-page .za-list-item--inline .za-list-item__title{width:120px}.calendar-page .custom{display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;width:100%;height:100%}.calendar-page .custom__text{position:absolute;left:50%;bottom:-12px;transform:translateX(-50%);font-size:10px;white-space:nowrap}"},9009:function(e,t,n){"use strict";n.r(t),t.default=".carousel-page .carousel__item__pic{display:flex}.carousel-page .carousel__item__pic img{width:100%;height:auto}.carousel-page .controls{display:flex;padding:10px 15px}.carousel-page .controls .za-button{margin-right:10px}.carousel-page .controls .za-button:last-of-type{margin-right:0}"},34489:function(e,t,n){"use strict";n.r(t),t.default=".cell-page .box{line-height:24px}.cell-page .box-description{color:gray}"},28559:function(e,t,n){"use strict";n.r(t),t.default=".checkbox-page .agreement-box{display:flex;align-items:center}.checkbox-page .agreement-box label{margin-left:8px}"},14857:function(e,t,n){"use strict";n.r(t),t.default=".config-provider-page{padding-bottom:50px}.config-provider-page .colors{display:flex;justify-content:center;align-items:center;list-style:none;margin:0;padding:0}.config-provider-page .colors li{display:inline-block;width:25px;height:25px;border-radius:2px;cursor:pointer}.config-provider-page .colors li:not(:last-child){margin-right:5px}.popup-box{background:#fff;height:300px;padding:20px 20px 100px}"},80071:function(e,t,n){"use strict";n.r(t),t.default=".file-picker-page .file-picker-wrapper{display:flex;flex-wrap:wrap;padding:15px 0 0 15px}.file-picker-page .file-picker-item,.file-picker-page .file-picker-btn{width:74px;height:74px;margin-bottom:15px}.file-picker-page .file-picker-item{display:inline-block;border:2px solid #ddd;margin-right:15px}.file-picker-page .file-picker-item-img{width:100%;height:100%;overflow:hidden}.file-picker-page .file-picker-item-img img{width:100%;height:100%;object-fit:cover}.file-picker-page .file-picker-btn{display:flex;align-items:center;justify-content:center;border:2px dashed #ddd}.file-picker-page .file-picker-btn .za-icon{color:#ddd}.file-picker-page .file-picker-closebtn{display:flex;align-items:center;justify-content:center;width:16px;height:16px;cursor:pointer}.file-picker-page .file-picker-closebtn .za-icon{font-size:10px;color:#fff}"},66684:function(e,t,n){"use strict";n.r(t),t.default=".grid-page .block{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:8px 16px}"},42296:function(e,t,n){"use strict";n.r(t),t.default='\ufeff@font-face{font-family:"zaicon";src:url("../zaicon.eot");src:url("../zaicon.eot?#iefix") format("embedded-opentype"),url("../zaicon.woff") format("woff"),url("../zaicon.ttf") format("truetype"),url("../zaicon.svg#zaicon") format("svg");font-weight:normal;font-style:normal}.za-icon__arrow-down:before{content:""}.za-icon__arrow-left:before{content:""}.za-icon__arrow-right:before{content:""}.za-icon__arrow-up:before{content:""}.za-icon__close:before{content:""}.za-icon__close-circle:before{content:""}.za-icon__close-circle-fill:before{content:""}.za-icon__delete-key:before{content:""}.za-icon__empty:before{content:""}.za-icon__info:before{content:""}.za-icon__info-circle:before{content:""}.za-icon__info-circle-fill:before{content:""}.za-icon__keyboard:before{content:""}.za-icon__minus:before{content:""}.za-icon__plus:before{content:""}.za-icon__plus-circle:before{content:""}.za-icon__search:before{content:""}.za-icon__star:before{content:""}.za-icon__star-fill:before{content:""}.za-icon__success:before{content:""}.za-icon__success-circle:before{content:""}.za-icon__volume:before{content:""}.za-icon__waiting:before{content:""}.za-icon__waiting-circle:before{content:""}.za-icon__waiting-circle-fill:before{content:""}.za-icon__warning:before{content:""}.za-icon__warning-circle:before{content:""}.icon-page .block{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column}.icon-page .block .za-icon{margin-bottom:8px}.icon-page .block .za-icon+span{font-size:12px}'},67019:function(e,t,n){"use strict";n.r(t),t.default=".image-page .block{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column}.image-page .block span{margin-top:4px;font-size:12px}"},61837:function(e,t,n){"use strict";n.r(t),t.default=".image-preview-page .carousel__item__pic img{width:100%;height:auto}.image-preview-page .za-pinch-zoom{height:100%}.image-preview-page .picture-item{display:inline-block;width:48px;height:48px;margin-right:10px;border-radius:5px;padding:5px 0;box-sizing:content-box}.image-preview-page .picture-item img{width:48px;height:48px;object-fit:cover}"},75212:function(e,t,n){"use strict";n.r(t),t.default=".mask-page .basic-demo .za-list-item__content{padding:60px 0;justify-content:center}"},11369:function(e,t,n){"use strict";n.r(t),t.default=".message-page .za-panel__body{padding:15px}.message-page .za-message{margin-bottom:15px}.message-page .za-message:last-of-type{margin-bottom:0}"},83262:function(e,t,n){"use strict";n.r(t),t.default=".modal-page .za-list-item__content .za-select{margin-right:15px}.modal-page .za-list-item__content .za-select__input{text-align:right}"},998:function(e,t,n){"use strict";n.r(t),t.default=".notice-bar-page .za-notice-bar{margin-bottom:15px}.notice-bar-page .za-notice-bar:last-of-type{margin-bottom:0}"},71763:function(e,t,n){"use strict";n.r(t),t.default=".panel-page .box{padding:10px 15px}"},73617:function(e,t,n){"use strict";n.r(t),t.default=".picker-page .picker-content{width:100%}.picker-page .show-right{width:100%;text-align:right}"},52238:function(e,t,n){"use strict";n.r(t),t.default=".popper-page .basic-demo .za-list-item__content{padding:60px 0;justify-content:center}.custom-content,.custom-arrow-content{padding:6px 12px;background:#ddd;font-size:12px;width:100px;height:50px;color:#333}.custom-content .za-popper__arrow,.custom-arrow-content .za-popper__arrow{position:absolute;width:0;height:0;border-color:rgba(0,0,0,0);border-style:solid}.custom-content[data-popper-placement^=top] .za-popper__arrow,.custom-arrow-content[data-popper-placement^=top] .za-popper__arrow{bottom:-4px;border-width:4px 4px 0;border-top-color:#ddd}.custom-content[data-popper-placement^=right] .za-popper__arrow,.custom-arrow-content[data-popper-placement^=right] .za-popper__arrow{left:-4px;border-width:4px 4px 4px 0;border-right-color:#ddd}.custom-content[data-popper-placement^=bottom] .za-popper__arrow,.custom-arrow-content[data-popper-placement^=bottom] .za-popper__arrow{top:-4px;border-width:0 4px 4px 4px;border-bottom-color:#ddd}.custom-content[data-popper-placement^=left] .za-popper__arrow,.custom-arrow-content[data-popper-placement^=left] .za-popper__arrow{right:-4px;border-width:4px 0 4px 4px;border-left-color:#ddd}.custom-content[data-popper-placement=top-start] .za-popper__arrow,.custom-content[data-popper-placement=bottom-start] .za-popper__arrow,.custom-arrow-content[data-popper-placement=top-start] .za-popper__arrow,.custom-arrow-content[data-popper-placement=bottom-start] .za-popper__arrow{left:10px}.custom-content[data-popper-placement=top-end] .za-popper__arrow,.custom-content[data-popper-placement=bottom-end] .za-popper__arrow,.custom-arrow-content[data-popper-placement=top-end] .za-popper__arrow,.custom-arrow-content[data-popper-placement=bottom-end] .za-popper__arrow{right:10px}.custom-content[data-popper-placement=left-start] .za-popper__arrow,.custom-content[data-popper-placement=right-start] .za-popper__arrow,.custom-arrow-content[data-popper-placement=left-start] .za-popper__arrow,.custom-arrow-content[data-popper-placement=right-start] .za-popper__arrow{top:4px}.custom-content[data-popper-placement=left-end] .za-popper__arrow,.custom-content[data-popper-placement=right-end] .za-popper__arrow,.custom-arrow-content[data-popper-placement=left-end] .za-popper__arrow,.custom-arrow-content[data-popper-placement=right-end] .za-popper__arrow{bottom:4px}.popper-page .direction-demo .za-button{width:60px;margin-right:10px;margin-bottom:10px}.popper-page .direction-demo .za-list-item__content{padding:15px 0;justify-content:center}"},2557:function(e,t,n){"use strict";n.r(t),t.default=".popup-box,.popup-box-right,.popup-box-left,.popup-box-bottom{background:#fff}.popup-box,.popup-box-right{width:100%;height:100%;padding:20px 20px 300px;-webkit-overflow-scrolling:touch}.popup-box-left{width:280px;height:100%;padding:20px 20px 100px}.popup-box-top{width:100%;padding:10px;color:rgba(255,255,255,.85);background:rgba(0,0,0,.7);font-size:14px;text-align:center}.popup-box-bottom{height:450px;padding:20px 20px 100px}body[data-theme=dark] .popup-box,body[data-theme=dark] .popup-box-right,body[data-theme=dark] .popup-box-left,body[data-theme=dark] .popup-box-bottom{background:#2b2c2d}body[data-theme=dark] .popup-box-top{background:rgba(255,255,255,.3)}"},58015:function(e,t,n){"use strict";n.r(t),t.default=".progress-page .progress-container{width:100%;padding:20px 20px 0}.progress-page .progress{margin-bottom:20px;text-align:center}.progress-page .progress-percent{font-size:14px}"},1184:function(e,t,n){"use strict";n.r(t),t.default='.pull-page .za-pull-load{position:relative;left:15px}.pull-page .za-pull-load:after{content:"";pointer-events:none;position:absolute;width:100%;height:100%;left:0;top:0;border-radius:0;border-top:1px solid var(--za-border-color)}@media(-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx){.pull-page .za-pull-load:after{width:200%;height:200%;transform:scale(0.5);transform-origin:0 0;border-radius:0}}.pull-page .custom-control{display:flex;align-items:center;padding:10px 0;height:50px;color:#999;font-size:13px}.pull-page .custom-control img{width:40px;height:40px}.pull-page .custom-control *+span{margin-left:8px}'},84856:function(e,t,n){"use strict";n.r(t),t.default=".radio-page .block-box{padding:10px;background:#fff}"},48746:function(e,t,n){"use strict";n.r(t),t.default=".search-bar-page .button-wrap{padding:2px 15px 10px 15px;justify-content:space-between;align-items:center;display:flex}.search-bar-page .search-bar-wrap{display:flex;align-items:center}"},96223:function(e,t,n){"use strict";n.r(t),t.default=".skeleton-page .skeleton{padding:12px}"},98760:function(e,t,n){"use strict";n.r(t),t.default=".tabs-page .za-tabs+.za-tabs{margin-top:10px}.tabs-page .content{display:flex;align-items:center;justify-content:center;padding:10px;height:150px}.tabs-page .za-tabs--vertical .content{height:100%}.tabs-page .za-tabs--vertical.custom-height{height:200px}"},4543:function(e,t,n){"use strict";n.r(t),t.default=".za-toast .box{width:70px}.za-toast .box-icon,.za-toast .box-text{margin:5px 0}.za-toast .box-icon{font-size:50px;color:#fff}"},51527:function(e,t,n){"use strict";n.r(t),t.default=".tooltip-page .direction-demo{display:flex;justify-content:center;padding:15px 0}.tooltip-page .za-button{width:60px;margin-right:10px;margin-bottom:10px}"},25649:function(e,t,n){var a={"./AffixPage.scss":82318,"./BadgePage.scss":73092,"./ButtonPage.scss":52967,"./CalendarPage.scss":99777,"./CarouselPage.scss":9009,"./CellPage.scss":34489,"./CheckboxPage.scss":28559,"./ConfigProviderPage.scss":14857,"./FilePickerPage.scss":80071,"./GridPage.scss":66684,"./IconPage.scss":42296,"./ImagePage.scss":67019,"./ImagePreviewPage.scss":61837,"./MaskPage.scss":75212,"./MessagePage.scss":11369,"./ModalPage.scss":83262,"./NoticeBarPage.scss":998,"./PanelPage.scss":71763,"./PickerPage.scss":73617,"./PopperPage.scss":52238,"./PopupPage.scss":2557,"./ProgressPage.scss":58015,"./PullPage.scss":1184,"./RadioPage.scss":84856,"./SearchBarPage.scss":48746,"./SkeletonPage.scss":96223,"./TabsPage.scss":98760,"./ToastPage.scss":4543,"./TooltipPage.scss":51527};function o(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}o.keys=function(){return Object.keys(a)},o.resolve=r,e.exports=o,o.id=25649},80780:function(e,t,n){"use strict";e.exports=n.p+"images/logo.1a6cfc30.svg"},59964:function(e,t,n){"use strict";e.exports=n.p+"images/banner@2x.27b77fc0.png"},86316:function(){},35929:function(e){"use strict";e.exports={i8:"3.0.15"}}},function(e){e.O(0,[4871,9844,8671,7030,8494,8188],(function(){return 63097,e(e.s=63097)})),e.O()}]);