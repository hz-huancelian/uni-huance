(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sample/sample-term"],{"46f9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){n.e("uni_modules/uni-collapse/components/uni-collapse/uni-collapse").then(function(){return resolve(n("1c9f"))}.bind(null,n)).catch(n.oe)},i={0:"复核人",1:"确认人",2:"审核人"},l={props:{collapse:{type:Boolean,default:!1},status:{type:Boolean,default:!1},title:{type:String,default:"编辑"},editable:{type:Boolean,default:!1},detailStatus:{type:String,default:"1"},sampleData:{type:Object,default:{}}},computed:{},components:{uniCollapse:o},data:function(){return{STOKEN_STUTES:i,sampleStatusMap:{0:"待采样",1:"已采样",2:"待组长审核",3:"待负责人审核",4:"审核通过",5:"审核失败",6:"已入库",7:"部分出库",8:"已出库",9:"入库中",10:"待复核"},showCont:!1,value:["0"],collapseList:[]}},options:{styleIsolation:"shared"},created:function(){this.getApproveInfo(this.sampleData.sampItemId)},methods:{editTask:function(){console.log("点击进入样品编辑页面 / 详情页"),this.$common.navigateTo("/pages/detail/index?sampItemId="+this.sampleData.sampItemId+"&editable="+this.editable+"&title="+this.title+"&detailStatus="+this.detailStatus)},add:function(t){var e=this;this.showCont=!this.showCont,this.$nextTick((function(){e.$refs.collapse.resize()}))},getApproveInfo:function(t){var e=this;this.collapseList&&0!==this.collapseList.length||this.$api.commonForGet("sample/getSampleAuditRecordBySampItemId/"+t,(function(t){200===t.code&&e.$nextTick((function(){e.collapseList=t.result||[]}))}))},onClick:function(e){t.showToast({title:"列表被点击"})},change:function(t){console.log(t)}}};e.default=l}).call(this,n("543d")["default"])},5197:function(t,e,n){"use strict";var o=n("9dba"),i=n.n(o);i.a},"5dfc":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return l})),n.d(e,"a",(function(){return o}));var o={uniCollapse:function(){return n.e("uni_modules/uni-collapse/components/uni-collapse/uni-collapse").then(n.bind(null,"1c9f"))},uniCollapseItem:function(){return n.e("uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item").then(n.bind(null,"4c5c"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"753c"))}},i=function(){var t=this,e=t.$createElement;t._self._c},l=[]},"9dba":function(t,e,n){},a068:function(t,e,n){"use strict";n.r(e);var o=n("5dfc"),i=n("d502");for(var l in i)"default"!==l&&function(t){n.d(e,t,(function(){return i[t]}))}(l);n("5197");var a,s=n("f0c5"),u=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"0726f70a",null,!1,o["a"],a);e["default"]=u.exports},d502:function(t,e,n){"use strict";n.r(e);var o=n("46f9"),i=n.n(o);for(var l in o)"default"!==l&&function(t){n.d(e,t,(function(){return o[t]}))}(l);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sample/sample-term-create-component',
    {
        'components/sample/sample-term-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a068"))
        })
    },
    [['components/sample/sample-term-create-component']]
]);
