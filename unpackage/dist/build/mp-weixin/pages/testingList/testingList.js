(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/testingList/testingList"],{"77de":function(t,n,e){},"7b87":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})},b706:function(t,n,e){"use strict";var i=e("77de"),a=e.n(i);a.a},bfd3:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,n){return c(t)||o(t,n)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(t,n){var e=[],i=!0,a=!1,r=void 0;try{for(var u,o=t[Symbol.iterator]();!(i=(u=o.next()).done);i=!0)if(e.push(u.value),n&&e.length===n)break}catch(c){a=!0,r=c}finally{try{i||null==o["return"]||o["return"]()}finally{if(a)throw r}}return e}function c(t){if(Array.isArray(t))return t}function s(t,n,e,i,a,r,u){try{var o=t[r](u),c=o.value}catch(s){return void e(s)}o.done?n(c):Promise.resolve(c).then(i,a)}function l(t){return function(){var n=this,e=arguments;return new Promise(function(i,a){var r=t.apply(n,e);function u(t){s(r,i,a,u,o,"next",t)}function o(t){s(r,i,a,u,o,"throw",t)}u(void 0)})}}var f={data:function(){return{testingList:[]}},onLoad:function(){t.setNavigationBarTitle({title:getApp().globalData.city+"检测站"||!1}),this.getTestingList()},methods:{linkTesting:function(n){t.navigateTo({url:"../testing/testing?id=".concat(n)})},getTestingList:function(){var n=l(i.default.mark(function n(){var e,a,u,o,c,s,l;return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"加载中...",mask:!0}),e="34.75",a="113.62",n.next=5,t.getLocation({type:"gcj02"});case 5:return u=n.sent,o=r(u,2),c=o[0],s=o[1],c||(a=s.longitude,e=s.latitude),n.next=12,this.ajax(this.api.TestingList,{latitude:e,longitude:a,city:this.city||getApp().globalData.city},"POST");case 12:l=n.sent,t.hideLoading(),200==l.data.code&&"null"!=l.data.data&&(this.testingList=l.data.data);case 15:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}()}};n.default=f}).call(this,e("543d")["default"])},c0bb:function(t,n,e){"use strict";e.r(n);var i=e("7b87"),a=e("eb80");for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);e("b706");var u=e("2877"),o=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,null,null);n["default"]=o.exports},d8b0:function(t,n,e){"use strict";(function(t){e("f103");i(e("66fd"));var n=i(e("c0bb"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},eb80:function(t,n,e){"use strict";e.r(n);var i=e("bfd3"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);n["default"]=a.a}},[["d8b0","common/runtime","common/vendor"]]]);