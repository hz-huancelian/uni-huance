(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"567d":function(e,t,o){},6547:function(e,t,o){"use strict";(function(e){o("88c8");var t=d(o("66fd")),n=d(o("cf2e")),r=d(o("e86b")),a=p(o("4b57")),u=p(o("57e7")),c=p(o("4ab7")),l=p(o("a0dd")),f=d(o("009e"));function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function p(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=n?Object.getOwnPropertyDescriptor(e,r):null;a&&(a.get||a.set)?Object.defineProperty(o,r,a):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}function d(e){return e&&e.__esModule?e:{default:e}}function s(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function b(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?s(Object(o),!0).forEach((function(t){m(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function m(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}t.default.use(f.default);var y=function(){o.e("components/tabBar/index").then(function(){return resolve(o("ef1e"))}.bind(null,o)).catch(o.oe)};t.default.component("tabBar",y),t.default.prototype.$api=a,t.default.prototype.$common=c,t.default.prototype.$db=u,t.default.prototype.$config=l,t.default.config.productionTip=!1,n.default.mpType="app";var v=new t.default(b({store:r.default},n.default));e(v).$mount()}).call(this,o("543d")["createApp"])},"69f1":function(e,t,o){"use strict";var n=o("567d"),r=o.n(n);r.a},"833d":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(o("66fd"));function r(e){return e&&e.__esModule?e:{default:e}}var a={onLaunch:function(){e.getSystemInfo({success:function(e){n.default.prototype.StatusBar=e.statusBarHeight;var t=wx.getMenuButtonBoundingClientRect();n.default.prototype.Custom=t,n.default.prototype.CustomBar=t.bottom+t.top-e.statusBarHeight}}),n.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=a}).call(this,o("543d")["default"])},cda2:function(e,t,o){"use strict";o.r(t);var n=o("833d"),r=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},cf2e:function(e,t,o){"use strict";o.r(t);var n=o("cda2");for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);o("69f1");var a,u,c,l,f=o("f0c5"),i=Object(f["a"])(n["default"],a,u,!1,null,null,null,!1,c,l);t["default"]=i.exports}},[["6547","common/runtime","common/vendor"]]]);