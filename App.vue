<script>
	export default {

		async onLaunch() {
			//判断手机是否为iphoneX
			let [err, getSystemInfo] = await uni.getSystemInfo()
			let modelmes = getSystemInfo.model;
			if (modelmes.search('iPhone X') != -1) {
				getApp().globalData.isIphoneX = true
			}

			// 获取示例图片
			let examplepictures = await this.ajax(this.api.examplepictures)
			if (examplepictures.data.code == 200) {
				getApp().globalData.example = examplepictures.data.data
			}
			// 获取code
			let [error, data] = await uni.login({
				provider: 'weixin'
			})
			// 自动登录
			// let login = await this.ajax(this.api.login, {
			// 	code: data.code,
			// }, 'POST')
			// if (login.data.code == 200) {
			// 	uni.setStorageSync('token', login.data.data)
			// 	//获取用户头像 昵称
			// 	let userinfo = await this.ajax(this.api.userinfo)
			// 	if (userinfo.data.code == 200) {
			// 		getApp().globalData.userinfo = userinfo.data.data
			// 	}
			// }
			
			// 获取订阅消息的模板id
			let getMessageTemplateId =  await this.ajax(this.api.getMessageTemplateId)
			if(getMessageTemplateId.data.code==200){
				getApp().globalData.messageTemplateId = getMessageTemplateId.data.data
			}

			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			example: null, //示例图片
			city: '定位中',
			userinfo: null, //用户信息  (头像昵称)
			uid: null, //用户id
			pid: 0, //用户上级
			isIphoneX:false,
			messageTemplateId:{},
		}
	}
</script>

<style lang="scss">
	
</style>
