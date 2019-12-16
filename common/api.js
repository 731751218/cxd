// const BaseApi = 'http://www.carservice.com/'; // 开发环境
// const BaseApi = 'https://www.xwaitl.cn/'; //我的服务器环境
const BaseApi = 'https://cxd.vhost.binguo.me/'; //公司服务器环境

module.exports = {
	// 高德地图的key
	mapkey: BaseApi + 'api/index/mapkey',
	//登录
	login: BaseApi + 'api/wxlogin/login',
	//获取检测站
	TestingList: BaseApi + 'api/index/TestingList',
	//轮播图
	swiperList: BaseApi + 'api/index/swiperList',
	//合作商家
	shopList: BaseApi + 'api/index/shopList',
	// 首页模块
	homeModule: BaseApi + 'api/index/homeModule',
	//卡券列表
	cardticketList: BaseApi + 'api/index/cardticketList',
	//解密手机号
	getPhone: BaseApi + 'api/wxlogin/getPhone',
	// 获取卡券购买页面信息
	cardTicket: BaseApi + 'api/index/cardTicket',
	// 图片上传
	uplode_img: BaseApi + 'api/index/uplode_img',
	// 识别图片
	distinguish: BaseApi + 'api/index/distinguish',
	// 效验是否完善用户信息
	isinfo: BaseApi + 'api/validation/isinfo',
	// 完善用户信息
	perfectuserinfo: BaseApi + 'api/validation/perfectuserinfo',
	// 用户信息
	userinfo: BaseApi + 'api/validation/userinfo',
	// 免检标支付订单
	exemptionMarkPay: BaseApi + 'api/WeChatPay/exemptionMarkPay',
	// 获取行驶证示例
	examplepictures : BaseApi + 'api/index/examplepictures',
	// 检测站信息 
	testing : BaseApi + 'api/index/testing',
	// 获取车辆列表
	carList : BaseApi + 'api/validation/carList',
	// 获取邀请列表
	invitationInfo : BaseApi + 'api/validation/invitationInfo',
	// 佣金列表
	commissionlist : BaseApi + 'api/validation/commissionlist',
	//车险报价
	carInsurance : BaseApi + 'api/validation/carInsurance',
	//商家列表
	shoptype : BaseApi + 'api/index/shoptype',
	//商家搜索
	searchShop : BaseApi + 'api/index/searchShop',
	// 提现记录
	withdrawal : BaseApi + 'api/validation/withdrawal',
	// 获取当前的金额
	nowMoney : BaseApi + 'api/validation/nowMoney',
	// 申请提现
	applyWithdrawal : BaseApi + 'api/validation/applyWithdrawal',
	// 接收formid
	formid : BaseApi + 'api/validation/formid',
	// 检测站支付
	testingPay : BaseApi + 'api/WeChatPay/testingPay',
	// 删除支付失败订单
	deleteTestingOrder : BaseApi + 'api/validation/deleteTestingOrder',
	// 免检标订单金额
	exemptionLabelPrice : BaseApi + 'api/index/exemptionLabelPrice',
	// 卡券支付
	cardTicketPay : BaseApi + 'api/WeChatPay/cardTicketPay',
	// 卡券订单
	ticketOrder : BaseApi + 'api/Validation/ticketOrder',
	// 领取卡券的参数
	receiveTicket : BaseApi + 'api/Validation/receiveTicket',
	// 卡券解码接口
	ticketDecode : BaseApi + 'api/Validation/ticketDecode',
	// 法律顾问订单
	legalOrder : BaseApi + 'api/Validation/legalOrder',
	// 添加车辆
	addCar: BaseApi + 'api/Validation/addCar',
	// 免检标订单列表
	exemptionLabelOrderList : BaseApi + 'api/Validation/exemptionLabelOrderList',
	// 车险报价订单列表
	carInsuranceOrderList:BaseApi + 'api/Validation/carInsuranceOrderList',
	// 法律咨询订单
	legalAdviserOrderList:BaseApi + 'api/Validation/legalAdviserOrderList',
	// 检测站订单
	testingOrderList:BaseApi + 'api/Validation/testingOrderList',
	// 删除车辆信息
	deleteCarInfo:BaseApi + 'api/Validation/deleteCarInfo',
	// 展示海报需要的数据
	posterParameter:BaseApi + 'api/Validation/posterParameter',
	// 查看订单详情数据
	testingOrderDetails:BaseApi + 'api/Validation/testingOrderDetails',
	// 检测站订单完成
	testingOrderComplete:BaseApi + 'api/Validation/testingOrderComplete',
	// 车险报价订单详情
	carInsuranceQuoteOrderDetails:BaseApi + 'api/Validation/carInsuranceQuoteOrderDetails',
	// 法律咨询订详情
	legalAdviserOrderDetails:BaseApi + 'api/Validation/legalAdviserOrderDetails',
	// 免检标订单详情 
	exemptionLabelOrderDetails:BaseApi + 'api/Validation/exemptionLabelOrderDetails',
	// 免检标订单完成
	exemptionLabelOrderComplete:BaseApi + 'api/Validation/exemptionLabelOrderComplete',
	// 一键拉取用户下级的检测站订单状态
	subordinateOrder:BaseApi + 'api/Validation/subordinateOrder',
	// 恢复卡券库存
	recoveryStock:BaseApi + 'api/Validation/recoveryStock',
	// 删除海报
	deletePoster:BaseApi + 'api/Validation/deletePoster',
	//获取订阅消息的模板id
	getMessageTemplateId:BaseApi + 'api/index/getMessageTemplateId',
}
