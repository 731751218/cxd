(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/legalAdviserOrderDetails/legalAdviserOrderDetails"],{3412:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})},5532:function(e,t,n){"use strict";var a=n("583f"),r=n.n(a);r.a},"583f":function(e,t,n){},6662:function(e,t,n){"use strict";n.r(t);var a=n("bb9c"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);t["default"]=r.a},a859:function(e,t,n){"use strict";n.r(t);var a=n("3412"),r=n("6662");for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);n("5532");var u=n("2877"),o=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=o.exports},bb9c:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("a34a"));function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,a,r,i,u){try{var o=e[i](u),c=o.value}catch(l){return void n(l)}o.done?t(c):Promise.resolve(c).then(a,r)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(a,r){var u=e.apply(t,n);function o(e){i(u,a,r,o,c,"next",e)}function c(e){i(u,a,r,o,c,"throw",e)}o(void 0)})}}var o={data:function(){return{legalAdviserOrderDetails:{}}},methods:{delta:function(){e.navigateBack({delta:1})},loogImg:function(){var t=this.legalAdviserOrderDetails.accident_identification;e.previewImage({urls:[t]})}},onLoad:function(){var e=u(a.default.mark(function e(t){var n;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t.id),e.next=3,this.ajax(this.api.legalAdviserOrderDetails,{id:t.id},"POST");case 3:n=e.sent,200==n.data.code&&(this.legalAdviserOrderDetails=n.data.data);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()};t.default=o}).call(this,n("543d")["default"])},ef5d:function(e,t,n){"use strict";(function(e){n("f103");a(n("66fd"));var t=a(n("a859"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["ef5d","common/runtime","common/vendor"]]]);