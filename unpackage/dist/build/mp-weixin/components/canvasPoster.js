(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/canvasPoster"],{"1c7c":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},"31e4":function(t,e,n){"use strict";n.r(e);var a=n("1c7c"),r=n("896f");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("c21c");var s=n("2877"),c=Object(s["a"])(r["default"],a["a"],a["b"],!1,null,"c9530642",null);e["default"]=c.exports},6645:function(t,e,n){},"896f":function(t,e,n){"use strict";n.r(e);var a=n("e461"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=r.a},c21c:function(t,e,n){"use strict";var a=n("6645"),r=n.n(a);r.a},e461:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return u(t)||c(t,e)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function c(t,e){var n=[],a=!0,r=!1,i=void 0;try{for(var s,c=t[Symbol.iterator]();!(a=(s=c.next()).done);a=!0)if(n.push(s.value),e&&n.length===e)break}catch(u){r=!0,i=u}finally{try{a||null==c["return"]||c["return"]()}finally{if(r)throw i}}return n}function u(t){if(Array.isArray(t))return t}function o(t,e,n,a,r,i,s){try{var c=t[i](s),u=c.value}catch(o){return void n(o)}c.done?e(u):Promise.resolve(u).then(a,r)}function l(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var i=t.apply(e,n);function s(t){o(i,a,r,s,c,"next",t)}function c(t){o(i,a,r,s,c,"throw",t)}s(void 0)})}}var f={props:{img:{type:String,default:""},text:{type:String,default:"xxx"},code:{type:String,default:""},saveCallback:{type:Function},closeCallback:{type:Function}},data:function(){return{ctx:null,canvasW:0,canvasH:0}},mounted:function(){},methods:{draw:function(){var e=l(a.default.mark(function e(){var n,r,s,c,u,o,l,f,h;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getSystemInfo();case 2:return n=e.sent,r=i(n,2),r[0],s=r[1],this.canvasH=.8*s.safeArea.height,this.canvasW=.8*s.safeArea.width,this.ctx=t.createCanvasContext("posterPop",this),e.next=11,t.getImageInfo({src:this.img});case 11:return c=e.sent,u=i(c,2),u[0],o=u[1],this.ctx.setFillStyle("#fff"),this.ctx.fillRect(0,0,this.canvasW,this.canvasH),this.ctx.drawImage(o.path,0,0,this.canvasW,.8*this.canvasH),e.next=20,t.getImageInfo({src:this.code});case 20:l=e.sent,f=i(l,2),f[0],h=f[1],this.ctx.drawImage(h.path,0,.8*this.canvasH+(.2*this.canvasH-90)/2,90,90),this.ctx.beginPath(),this.ctx.setFillStyle("#000"),this.ctx.setFontSize(16),this.ctx.setTextBaseline("middle"),this.ctx.fillText(this.text,.4*this.canvasW,.9*this.canvasH),this.ctx.draw(!0),t.hideLoading();case 32:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),saveposter:function(){var e=l(a.default.mark(function e(){var n,r,s,c,u,o;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.canvasToTempFilePath({x:0,y:0,width:this.canvasW,height:this.canvasH,canvasId:"posterPop"});case 2:return n=e.sent,r=i(n,2),r[0],s=r[1],e.next=8,t.saveImageToPhotosAlbum({filePath:s.tempFilePath});case 8:if(c=e.sent,u=i(c,2),o=u[0],u[1],o){e.next=14;break}return e.abrupt("return",this.saveCallback(1));case 14:return e.abrupt("return",this.saveCallback(0));case 15:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()}};e.default=f}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/canvasPoster-create-component',
    {
        'components/canvasPoster-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("31e4"))
        })
    },
    [['components/canvasPoster-create-component']]
]);