
/**
 * Promise封装微信请求
 */
function request(url, data = {}, method = "GET") {

	return new Promise((resolve, reject)=> {
		uni.request({
			url: url,
			data: data,
			method: method,
			header: {
				'Content-Type': 'application/json',
				'Token': uni.getStorageSync('token')
			},
			success: async res=> {
				// token失效 自动登录
				if(res.data.code==300){
					// // 获取code
					let [error, data] = await uni.login({
						provider: 'weixin'
					})
					// 自动登录
					let login = await this.ajax(this.api.login, {
						code: data.code,
					}, 'POST')
					if (login.data.code == 200) {
						uni.setStorageSync('token', login.data.data)
					}
				}
				resolve(res)
			},
			fail: err=>{
				reject(err)
			}
		})
	})
}


export default {
	request,
}
