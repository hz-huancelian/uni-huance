(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/scanCode/index"],{"29e4":function(n,e,o){"use strict";o.r(e);var t=o("7497"),u=o.n(t);for(var i in t)"default"!==i&&function(n){o.d(e,n,(function(){return t[n]}))}(i);e["default"]=u.a},"42ca":function(n,e,o){"use strict";var t=o("ded6"),u=o.n(t);u.a},7497:function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=function(){Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(function(){return resolve(o("d396"))}.bind(null,o)).catch(o.oe)},u=function(){Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(function(){return resolve(o("fca1"))}.bind(null,o)).catch(o.oe)},i=function(){o.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(function(){return resolve(o("1288"))}.bind(null,o)).catch(o.oe)},a={components:{uniForms:t,uniFormsItem:u,uniEasyinput:i},data:function(){return{customFormData:{sampleNo:""},customRules:{sampleNo:{rules:[{required:!0,errorMessage:"无效样品编号，请输入正确的样品编号"}]}}}},onShow:function(){},mounted:function(){},methods:{backScanCode:function(){var e=this;this.customFormData.sampleNo="",n.scanCode({scanType:["barCode"],success:function(n){e.customFormData.sampleNo=n.result,""!==e.customFormData.sampleNo&&e.checkSampleNo()},fail:function(n){e.$common.errorToShow("条码信息获取失败!")}})},submit:function(){var n=this;this.$refs.customForm.validate().then((function(e){n.checkSampleNo()})).catch((function(n){console.log("err",n)}))},checkSampleNo:function(){var n=this;this.$api.checkSampleNo("sample/checkSampleNo/"+this.customFormData.sampleNo,(function(e){200==e.code?n.navigateToCreate(e.result):setTimeout((function(){n.$common.errorToShow(e.message)}),1e3)}))},navigateToCreate:function(n){var e="true",o="录入",t="1";"0"==n&&(e="false",o="详情",t="0");var u=this.customFormData.sampleNo,i="/pages/detail/index?sampleNo="+u+"&editable="+e+"&title="+o+"&detailStatus="+t;this.$common.navigateTo(i)}}};e.default=a}).call(this,o("543d")["default"])},"7d9b":function(n,e,o){"use strict";o.r(e);var t=o("9e61"),u=o("29e4");for(var i in u)"default"!==i&&function(n){o.d(e,n,(function(){return u[n]}))}(i);o("42ca");var a,s=o("f0c5"),c=Object(s["a"])(u["default"],t["b"],t["c"],!1,null,"5b3d91f6",null,!1,t["a"],a);e["default"]=c.exports},"9e61":function(n,e,o){"use strict";o.d(e,"b",(function(){return u})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return t}));var t={uniForms:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(o.bind(null,"d396"))},uniFormsItem:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(o.bind(null,"fca1"))},uniEasyinput:function(){return o.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(o.bind(null,"1288"))}},u=function(){var n=this,e=n.$createElement;n._self._c},i=[]},ded6:function(n,e,o){},eff3:function(n,e,o){"use strict";(function(n){o("88c8");t(o("66fd"));var e=t(o("7d9b"));function t(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,o("543d")["createPage"])}},[["eff3","common/runtime","common/vendor"]]]);