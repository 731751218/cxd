(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/carInsuranceQuote/carInsuranceQuote"],{

/***/ 56:
/*!*****************************************************************************************!*\
  !*** D:/宾果智造项目管理/车检服务/main.js?{"page":"pages%2FcarInsuranceQuote%2FcarInsuranceQuote"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _carInsuranceQuote = _interopRequireDefault(__webpack_require__(/*! ./pages/carInsuranceQuote/carInsuranceQuote.vue */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_carInsuranceQuote.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 57:
/*!**********************************************************************!*\
  !*** D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carInsuranceQuote_vue_vue_type_template_id_6331f5f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carInsuranceQuote.vue?vue&type=template&id=6331f5f8& */ 58);
/* harmony import */ var _carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carInsuranceQuote.vue?vue&type=script&lang=js& */ 60);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carInsuranceQuote.vue?vue&type=style&index=0&lang=scss& */ 62);
/* harmony import */ var _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 11);






/* normalize component */

var component = Object(_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _carInsuranceQuote_vue_vue_type_template_id_6331f5f8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _carInsuranceQuote_vue_vue_type_template_id_6331f5f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 58:
/*!*****************************************************************************************************!*\
  !*** D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue?vue&type=template&id=6331f5f8& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_template_id_6331f5f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./carInsuranceQuote.vue?vue&type=template&id=6331f5f8& */ 59);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_template_id_6331f5f8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_template_id_6331f5f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 59:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue?vue&type=template&id=6331f5f8& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 60:
/*!***********************************************************************************************!*\
  !*** D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./carInsuranceQuote.vue?vue&type=script&lang=js& */ 61);
/* harmony import */ var _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 61:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 8));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      settime: null,
      msg: '', //留言
      name: '', //姓名
      phone: '', //电话
      idnumber: '', //要上传的身份证正面
      idnumberimg: '', //身份证预览图
      idnumberplane: '', //身份证副面
      idnumberplaneimg: '', //身份证副面预览图
      vehiclelicencedisc: '', //要上传的行车证正面
      vehiclelicencediscimg: '', //行车证正面预览图
      vehiclelicencediscplane: '', //要上传的行车证副面
      vehiclelicencediscplaneimg: '' //要上传的行车证副面预览图
    };
  },
  methods: {
    //获取手机号信息
    getPhoneNumber: function () {var _getPhoneNumber = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {var _ref, _ref2, err, code, res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                  uni.login({
                    provider: 'weixin' }));case 2:_ref = _context.sent;_ref2 = _slicedToArray(_ref, 2);err = _ref2[0];code = _ref2[1];if (!(


                e.detail.encryptedData && e.detail.iv)) {_context.next = 12;break;}_context.next = 9;return (
                  this.ajax(this.api.getPhone, {
                    code: code.code,
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData },
                  'POST'));case 9:res = _context.sent;
                console.log(res);
                if (res.data.code == 200) {
                  if (res.data.data != 'null') {
                    console.log('获取手机号成功!');
                    console.log(res.data.data);
                    this.phone = res.data.data;
                  } else {
                    uni.showToast({
                      title: '获取手机号失败,请重试',
                      duration: 2000,
                      icon: 'none' });

                  }
                }case 12:case "end":return _context.stop();}}}, _callee, this);}));function getPhoneNumber(_x) {return _getPhoneNumber.apply(this, arguments);}return getPhoneNumber;}(),





    //提交
    submit: function () {var _submit = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var name, phone, msg, idnumber, idnumberplane, vehiclelicencedisc, vehiclelicencediscplane, carInsurance;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

                name =






                this.name, phone = this.phone, msg = this.msg, idnumber = this.idnumber, idnumberplane = this.idnumberplane, vehiclelicencedisc = this.vehiclelicencedisc, vehiclelicencediscplane = this.vehiclelicencediscplane;
                name = name.trim();if (
                name.length) {_context2.next = 7;break;}
                uni.showToast({
                  title: '请输入联系人',
                  duration: 2000,
                  icon: 'none' });return _context2.abrupt("return",

                false);case 7:if (!(
                phone.length != 11)) {_context2.next = 12;break;}
                uni.showToast({
                  title: '请输入正确的联系电话',
                  duration: 2000,
                  icon: 'none' });return _context2.abrupt("return",

                false);case 12:if (
                idnumber.length) {_context2.next = 17;break;}
                uni.showToast({
                  title: '请输入上传身份证正面',
                  duration: 2000,
                  icon: 'none' });return _context2.abrupt("return",

                false);case 17:if (
                idnumberplane.length) {_context2.next = 22;break;}
                uni.showToast({
                  title: '请输入上传身份证副面',
                  duration: 2000,
                  icon: 'none' });return _context2.abrupt("return",

                false);case 22:if (
                vehiclelicencedisc.length) {_context2.next = 27;break;}
                uni.showToast({
                  title: '请输入上传行车证正面',
                  duration: 2000,
                  icon: 'none' });return _context2.abrupt("return",

                false);case 27:if (
                vehiclelicencediscplane.length) {_context2.next = 30;break;}
                uni.showToast({
                  title: '请输入上传行车证副面',
                  duration: 2000,
                  icon: 'none' });return _context2.abrupt("return",

                false);case 30:

                //验证通过
                uni.showLoading({
                  mask: true,
                  title: '提交中...' });_context2.next = 33;return (

                  this.ajax(this.api.carInsurance, {
                    msg: msg,
                    name: name,
                    phone: phone,
                    idnumber: idnumber,
                    idnumberplane: idnumberplane,
                    vehiclelicencedisc: vehiclelicencedisc,
                    vehiclelicencediscplane: vehiclelicencediscplane },
                  'POST'));case 33:carInsurance = _context2.sent;
                uni.hideLoading();
                if (carInsurance.data.code) {
                  uni.showToast({
                    title: carInsurance.data.msg,
                    duration: 2000,
                    icon: 'none',
                    mask: true });

                  if (carInsurance.data.code == 200) {
                    this.settime = setTimeout(function () {
                      uni.navigateBack({
                        delta: 1 });

                    }, 2000);
                  }
                }case 36:case "end":return _context2.stop();}}}, _callee2, this);}));function submit() {return _submit.apply(this, arguments);}return submit;}(),




    // 预览示例
    previewPictures: function previewPictures(i) {
      console.log(i);
      var img = '';
      switch (i) {
        case 1:
          img = getApp().globalData.example.idnumber;
          break;
        case 2:
          img = getApp().globalData.example.idnumberplane;
          break;
        case 3:
          img = getApp().globalData.example.driving_license_just;
          break;
        case 4:
          img = getApp().globalData.example.driving_license_vice;
          break;}


      var arr = [img];
      uni.previewImage({
        urls: arr });

    },


    // 上传图片
    uploadfile: function () {var _uploadfile = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(i) {var _ref3, _ref4, error, chooseImage, _ref5, _ref6, err, uploadres, data;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                  uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'] //从哪里选择图片 相册和相机
                  }));case 2:_ref3 = _context3.sent;_ref4 = _slicedToArray(_ref3, 2);error = _ref4[0];chooseImage = _ref4[1];if (

                error) {_context3.next = 40;break;}_context3.t0 =
                i;_context3.next = _context3.t0 ===
                1 ? 10 : _context3.t0 ===


                2 ? 12 : _context3.t0 ===


                3 ? 14 : _context3.t0 ===


                4 ? 16 : 18;break;case 10:this.idnumberimg = chooseImage.tempFilePaths[0];return _context3.abrupt("break", 18);case 12:this.idnumberplaneimg = chooseImage.tempFilePaths[0];return _context3.abrupt("break", 18);case 14:this.vehiclelicencediscimg = chooseImage.tempFilePaths[0];return _context3.abrupt("break", 18);case 16:
                this.vehiclelicencediscplaneimg = chooseImage.tempFilePaths[0];return _context3.abrupt("break", 18);case 18:_context3.next = 20;return (





                  uni.uploadFile({
                    url: this.api.uplode_img,
                    filePath: chooseImage.tempFilePaths[0],
                    name: 'img' }));case 20:_ref5 = _context3.sent;_ref6 = _slicedToArray(_ref5, 2);err = _ref6[0];uploadres = _ref6[1];if (

                err) {_context3.next = 39;break;}
                //转化为json
                data = JSON.parse(uploadres.data);
                //要上传的行驶证正页
                _context3.t1 = i;_context3.next = _context3.t1 ===
                1 ? 29 : _context3.t1 ===


                2 ? 31 : _context3.t1 ===


                3 ? 33 : _context3.t1 ===


                4 ? 35 : 37;break;case 29:this.idnumber = data.url;return _context3.abrupt("break", 37);case 31:this.idnumberplane = data.url;return _context3.abrupt("break", 37);case 33:this.vehiclelicencedisc = data.url;return _context3.abrupt("break", 37);case 35:
                this.vehiclelicencediscplane = data.url;return _context3.abrupt("break", 37);case 37:_context3.next = 40;break;case 39:




                uni.showToast({
                  title: '上传失败',
                  duration: 2000,
                  icon: 'none' });case 40:case "end":return _context3.stop();}}}, _callee3, this);}));function uploadfile(_x2) {return _uploadfile.apply(this, arguments);}return uploadfile;}(),






    // 上传身份证
    // async uploadidnumber() {
    // 	let [error, chooseImage] = await uni.chooseImage({
    // 		count: 1, //默认9
    // 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    // 		sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

    // 	})
    // 	if (!error) {
    // 		this.idnumberimg = chooseImage.tempFilePaths[0]

    // 		// 上传图片
    // 		let [err, uploadres] = await uni.uploadFile({
    // 			url: this.api.uplode_img,
    // 			filePath: chooseImage.tempFilePaths[0],
    // 			name: 'img',
    // 		})
    // 		if (!err) {
    // 			//转化为json
    // 			let data = JSON.parse(uploadres.data)
    // 			//要上传的行驶证正页
    // 			this.idnumber = data.url

    // 		} else {
    // 			uni.showToast({
    // 				title: '上传失败',
    // 				duration: 2000,
    // 				icon: 'none'
    // 			})
    // 		}
    // 	}


    // },

    // 上传行车证
    // async uploadvehiclelicencedisc() {
    // 	let [error, chooseImage] = await uni.chooseImage({
    // 		count: 1, //默认9
    // 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    // 		sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

    // 	})
    // 	if (!error) {
    // 		this.vehiclelicencediscimg = chooseImage.tempFilePaths[0]
    // 		// 上传图片
    // 		let [err, uploadres] = await uni.uploadFile({
    // 			url: this.api.uplode_img,
    // 			filePath: chooseImage.tempFilePaths[0],
    // 			name: 'img',
    // 		})
    // 		if (!err) {
    // 			//转化为json
    // 			let data = JSON.parse(uploadres.data)
    // 			//要上传的行驶证正页
    // 			this.vehiclelicencedisc = data.url

    // 		} else {
    // 			uni.showToast({
    // 				title: '上传失败',
    // 				duration: 2000,
    // 				icon: 'none'
    // 			})
    // 		}
    // 	}
    // },

    // 查看上传的图片
    lookImg: function lookImg(i) {
      var img = '';
      switch (i) {
        case 1:
          img = this.idnumberimg;
          break;
        case 2:
          img = this.idnumberplaneimg;
          break;
        case 3:
          img = this.vehiclelicencediscimg;
          break;
        case 4:
          img = this.vehiclelicencediscplaneimg;
          break;}

      var arr = [img];
      uni.previewImage({
        urls: arr });

    },

    //删除图片
    deleteimg: function deleteimg(i) {
      switch (i) {
        case 1:
          this.idnumberimg = '';
          this.idnumber = '';
          break;
        case 2:
          this.idnumberplaneimg = '';
          this.idnumberplane = '';
          break;
        case 3:
          this.vehiclelicencediscimg = '';
          this.vehiclelicencedisc = '';
          break;
        case 4:
          this.vehiclelicencediscplaneimg = '';
          this.vehiclelicencediscplane = '';
          break;}

    } },


  onUnload: function onUnload() {
    clearTimeout(this.settime);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 62:
/*!********************************************************************************************************!*\
  !*** D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../下载/HBuilderX.2.2.2.20190816/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./carInsuranceQuote.vue?vue&type=style&index=0&lang=scss& */ 63);
/* harmony import */ var _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_HBuilderX_2_2_2_20190816_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_carInsuranceQuote_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 63:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/宾果智造项目管理/车检服务/pages/carInsuranceQuote/carInsuranceQuote.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[56,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/carInsuranceQuote/carInsuranceQuote.js.map