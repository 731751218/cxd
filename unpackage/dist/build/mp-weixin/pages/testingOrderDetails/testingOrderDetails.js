(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/testingOrderDetails/testingOrderDetails"],{"09cb":function(t,e,n){"use strict";n.r(e);var a=n("1821"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=r.a},"177a":function(t,e,n){},1821:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,r,i,u){try{var o=t[i](u),c=o.value}catch(s){return void n(s)}o.done?e(c):Promise.resolve(c).then(a,r)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var u=t.apply(e,n);function o(t){i(u,a,r,o,c,"next",t)}function c(t){i(u,a,r,o,c,"throw",t)}o(void 0)})}}var o={data:function(){return{testingOrderDetails:{},settime:null}},methods:{delta:function(){t.navigateBack({delta:1})},complete:function(){var e=u(a.default.mark(function e(){var n;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"请求中...",mask:!0}),e.next=3,this.ajax(this.api.testingOrderComplete,{id:this.testingOrderDetails.id},"POST");case 3:if(n=e.sent,t.hideLoading(),200!=n.data.code){e.next=11;break}return t.showToast({title:n.data.msg,duration:2e3,icon:"none"}),this.settime=setTimeout(function(){t.navigateBack({delta:1})},2e3),e.abrupt("return");case 11:t.showModal({title:"提示",content:n.data.msg,showCancel:!1});case 12:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()},onLoad:function(){var t=u(a.default.mark(function t(e){var n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=5;break}return t.next=3,this.ajax(this.api.testingOrderDetails,{id:e.id},"POST");case 3:n=t.sent,200==n.data.code&&"null"!=n.data.data&&(this.testingOrderDetails=n.data.data);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onUnload:function(){clearTimeout(this.settime)}};e.default=o}).call(this,n("543d")["default"])},"2c45":function(t,e,n){"use strict";n.r(e);var a=n("5dcd"),r=n("09cb");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("4dfd");var u=n("2877"),o=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},"4dfd":function(t,e,n){"use strict";var a=n("177a"),r=n.n(a);r.a},"5dcd":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},"706b":function(t,e,n){"use strict";(function(t){n("f103");a(n("66fd"));var e=a(n("2c45"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["706b","common/runtime","common/vendor"]]]);