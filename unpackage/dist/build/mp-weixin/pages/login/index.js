(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/index"],{"0b7f":function(e,t,n){"use strict";var o=n("5c0d"),r=n.n(o);r.a},"3e41":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"5c0d":function(e,t,n){},"5e47":function(e,t,n){"use strict";n.r(t);var o=n("5ed8"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},"5ed8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("a34a"));function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,o,r,a,u){try{var s=e[a](u),c=s.value}catch(i){return void n(i)}s.done?t(c):Promise.resolve(c).then(o,r)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var u=e.apply(t,n);function s(e){a(u,o,r,s,c,"next",e)}function c(e){a(u,o,r,s,c,"throw",e)}s(void 0)}))}}var s={data:function(){return{title:"环测链",login:"登录",pleaseLogin:"请登录",wxLogin:"微信登录",accountPlaceholder:"请输入您的账号",passwordPlaceholder:"请输入您的密码",loginForm:{username:"",password:""}}},onLoad:function(){},methods:{switchTabToTask:function(){var t=this;""!==this.loginForm.username&&""!==this.loginForm.password?this.$api.login(this.loginForm,function(){var n=u(o.default.mark((function n(r){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!r.success){n.next=8;break}return t.$common.successToShow("登录成功"),t.$db.set("userToken",r.result),e.removeStorage("SIGN"),n.next=6,t.getUserInfo();case 6:n.next=9;break;case 8:t.$common.errorToShow("登录条件不满足");case 9:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()):this.$common.errorToShow("请录入登录信息...")},getUserInfo:function(){var t=this;this.$api.getUserInfo((function(n){if(n.success&&n.result){if(t.$store.commit("SAVE_CUR_USER",n.result),n.result.appRoles.length>0)switch(t.$store.commit("SAVE_ROLE_LISTS",n.result.appRoles),n.result.appRoles[0]){case"2":t.$store.commit("SAVE_CUR_ROLE",{roleId:2,roleName:"采样员"});break;case"1":t.$store.commit("SAVE_CUR_ROLE",{roleId:1,roleName:"采样组长"});break;default:t.$store.commit("SAVE_CUR_ROLE",{})}else t.$store.commit("SAVE_ROLE_LISTS",n.result.appRoles);e.switchTab({url:"/pages/task/index"})}else t.$common.errorToShow(n.result)}))},navigateBack:function(){e.navigateBack()}}};t.default=s}).call(this,n("543d")["default"])},de25:function(e,t,n){"use strict";(function(e){n("88c8");o(n("66fd"));var t=o(n("efd7"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},efd7:function(e,t,n){"use strict";n.r(t);var o=n("3e41"),r=n("5e47");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("0b7f");var u,s=n("f0c5"),c=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=c.exports}},[["de25","common/runtime","common/vendor"]]]);