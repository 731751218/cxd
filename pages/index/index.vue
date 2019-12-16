<template>
	<view class="app">

		<luPopupWrapper ref="luPopupWrapper" type="bottom" transition="slider" backgroundColor="#fff" :active="active" height="36%"
		 width="100%" maskShow maskClick :closeCallback="showtabbar">
			<view class="popwrap" style="width: 100%;height: 100%;">
				<view class="titlewrap">
					<view class="borderstyle">
					</view>
					<view class="title">
						完善个人信息
					</view>
				</view>

				<view class="itemlist">
					<view class="item">
						<view class="left">
							姓名:
						</view>
						<view class="right">
							<input type="text" v-model="name" placeholder="请输入真实姓名" />
						</view>
					</view>

					<view class="item">
						<view class="left">
							手机号:
						</view>
						<view class="right">
							<input type="number" v-model="phone" placeholder="请输入手机号" />
							<view class="btn" v-if="!phone.length">
								<!-- 获取手机号 -->
								<button class="absolute" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
								</button>
								获取本机手机号
							</view>
						</view>
					</view>

				</view>

				<view class="sub">
					<!-- #ifdef MP-WEIXIN -->

					<button class="absolute" lang="zh_CN" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信授权获取用户信息</button>

					<!-- #endif -->
					完成
				</view>
			</view>
		</luPopupWrapper>




		<!-- 轮播图 -->
		<view class="swiper">


			<!-- 城市 -->
			<view class="city" :style="{top:top+'px'}" @tap="switchCity">
				<text class="iconfont">&#xe707;</text>
				<text>{{city}}</text>
			</view>

			<!-- 轮播图 -->
			<swiper class="swiper" circular autoplay :interval="5000" indicator-dots :duration="1000">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.img" @tap="swiperLink(item.switch,item.url)"></image>
				</swiper-item>
			</swiper>
		</view>




		<view style="position: relative;">
			<!-- 根据有没有uid 判断用户是否完善信息 -->
			<view class="infoshow" v-if="isinfo" @tap="isinfoshow">

			</view>
			<!-- 本服务列表 -->
			<view class="severList">


				<!-- 绑定车辆 -->
				<view class="sever" v-for="(module,index) in moduleList" :key="index" @tap="link(module.url)">

					<view class="left">
						<image :src="module.img"></image>
					</view>
					<view class="right">
						{{module.text}}
					</view>
				</view>


				<view class="sever" v-for="(cardticket,index) in cardticketList" :key="index" @tap="cardlink(cardticket.id)">

					<view class="left">
						<image :src="cardticket.image"></image>
					</view>
					<view class="right">
						{{cardticket.text}}
					</view>
				</view>


			</view>


		</view>


	</view>
</template>

<script>
	import amap from '@/common/amap-wx.js'
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue"
	export default {
		components: {
			luPopupWrapper
		},
		data() {
			return {
				top: '', //地区距离顶部的距离
				swiperList: [],
				city: '定位中', //所在城市
				amapPlugin: null, //高德地图
				key: '', //key
				moduleList: [], //检测站列表
				latitude: '', //纬度
				longitude: '', //经度
				cardticketList: [], //卡券列表
				isinfo: true, //判断用户是否完善用户信息
				name: '', //真实姓名
				phone: '', //手机号
				
			}
		},
		async onShow() {
			this.city = getApp().globalData.city
		},

		async onLoad(options) {
			if (wx.getMenuButtonBoundingClientRect) {
				let top = wx.getMenuButtonBoundingClientRect().top
				this.top = top
			}
			console.log('这是传的参数' + JSON.stringify(options))

			// 获取轮播图
			let swiper = await this.ajax(this.api.swiperList)
			if (swiper.data.code == 200) {
				if (swiper.data.data != 'null') {
					this.swiperList = swiper.data.data
				}
			}

			//用户扫码进入
			if (options.scene) {
				let scene = decodeURIComponent(options.scene)
				getApp().globalData.pid = scene

				// 获取code
				let [error, data] = await uni.login({
					provider: 'weixin'
				})
				// 自动登录
				let login = await this.ajax(this.api.login, {
					code: data.code,
				}, 'POST')
				if (login.data.code == 200) {
					uni.setStorageSync('token', login.data.data)
					//是否完善用户信息
					let info = await this.ajax(this.api.isinfo)
					if (info.data.code == 200) {
						getApp().globalData.uid = info.data.data
						this.isinfo = false
					}
				}
			} else {
				if (options.pid) {
					getApp().globalData.pid = options.pid
				}
				// 获取code
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


			//检测用户是否完善信息
			let info = await this.ajax(this.api.isinfo)
			if (info.data.code == 200) {
				getApp().globalData.uid = info.data.data
				this.isinfo = false
			}


			// 获取高德地图key
			let res = await this.ajax(this.api.mapkey)
			if (res.data.data != 'null') {
				this.key = res.data.data
			}

			uni.showLoading({
				title: '加载中...'
			})
			//获取首页模块
			let module = await this.ajax(this.api.homeModule)
			uni.hideLoading()
			if (module.data.code == 200) {
				if (module.data.data != 'null') {
					this.moduleList = module.data.data
				} else {
					uni.showToast({
						title: '暂无数据!',
						duration: 2000,
						icon: 'none'
					})
				}
			} else {
				uni.showToast({
					title: '模块获取失败!',
					duration: 2000,
					icon: 'none'
				})
			}


			// 获取卡券列表
			let cardticketList = await this.ajax(this.api.cardticketList)
			if (cardticketList.data.code == 200) {
				if (cardticketList.data.data != 'null') {
					this.cardticketList = cardticketList.data.data
				}
			}



			// 创建高德地图实例
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			})
			// 高德地图获取位置信息
			this.amapPlugin.getRegeo({
				success: (data) => {
					this.latitude = data[0].latitude //纬度
					this.longitude = data[0].longitude //经度
					// let city = data[0].regeocodeData.addressComponent.city
					// 截取最后一个字符
					// getApp().globalData.city = city.slice(0, city.length - 1)
					uni.showToast({
						title: '默认城市:周口',
						duration: 2000,
						icon: 'none'
					})
					getApp().globalData.city = "周口"
					this.city = getApp().globalData.city
				},
				fail: err => {
					//如果拒绝获取地理位置 默认周口
					getApp().globalData.city = '周口'
					this.city = getApp().globalData.city
					uni.showToast({
						title: '默认城市:周口',
						duration: 2000,
						icon: 'none'
					})
				}
			})


		},


		//分享页面
		onShareAppMessage(res) {
			const uid = getApp().globalData.uid

			return {
				title: '分享小程序',
				path: `pages/index/index?pid=${uid}`
			}
		},

		methods: {


			// 获取用户信息并登陆
			async wxGetUserInfo(e) {
				let {
					name,
					phone
				} = this
				name = name.trim()
				phone = phone.trim()
				if (name.length && phone.length == 11) {
					uni.showLoading({
						title: '提交中...',
						mask: true
					})
					if (e.detail.iv || e.detail.encryptedData) {
						// 获取code
						let [error, data] = await uni.login({
							provider: 'weixin'
						})
						// 登陆
						let login = await this.ajax(this.api.login, {
							code: data.code,
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
							pid: getApp().globalData.pid
						}, 'POST')
						uni.hideLoading()
						if (login.data.code == 200) {
							// 同意授权
							uni.setStorageSync('token', login.data.data)

							let perfectuserinfo = await this.ajax(this.api.perfectuserinfo, {
								name,
								phone
							}, 'POST')
							console.log(perfectuserinfo)

							if (perfectuserinfo.data.code == 200) {
								uni.showToast({
									title: perfectuserinfo.data.msg,
									duration: 2000,
									icon: 'none'
								})
								let userinfo = await this.ajax(this.api.userinfo)
								if (userinfo.data.code == 200) {
									getApp().globalData.userinfo = userinfo.data.data
								}
								//检测用户是否完善信息并获取用户的uid
								let info = await this.ajax(this.api.isinfo)
								if (info.data.code == 200) {
									getApp().globalData.uid = info.data.data
									console.log('获取到了用户的uid---------' + getApp().globalData.uid)
								}

								//关闭遮罩
								this.$refs.luPopupWrapper.close()
								this.showtabbar()
								this.isinfo = false
							}
						} else {
							uni.showModal({
								title: '提示',
								content: login.data.msg,
								showCancel: false
							})
						}
					}
				} else {
					uni.showToast({
						title: '请输入完整信息',
						duration: 2000,
						icon: 'none'
					})
				}


			},

			// 填写用户信息
			async isinfoshow() {
				let [err, succ] = await uni.hideTabBar({
					animation: true,
				})
				if (!err) {
					this.$refs.luPopupWrapper.show()
				}

			},
			// 显示tabbar
			async showtabbar() {
				console.log(1)
				let [err, succ] = await uni.showTabBar({
					animation: true,
				})
			},

			cardlink(id) {
				console.log(id)
				uni.navigateTo({
					url: `../shop/shop?id=${id}`
				})
			},

			// 轮播图跳转
			swiperLink(islink, url) {
				if (islink == 1) {
					uni.navigateTo({
						url
					})
				}
			},

			// 模块跳转
			link(url) {

				uni.navigateTo({
					url
				})
			},



			// 切换城市
			switchCity() {
				uni.navigateTo({
					url: `../city/city?city=${this.city}`
				})
			},


			//获取手机号信息
			async getPhoneNumber(e) {
				let [err, code] = await uni.login({
					provider: 'weixin'
				})
				if (e.detail.encryptedData && e.detail.iv) {
					let res = await this.ajax(this.api.getPhone, {
						code: code.code,
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData
					}, 'POST')
					console.log(res)
					if (res.data.code == 200) {
						if (res.data.data != 'null') {
							this.phone = res.data.data
						} else {
							uni.showToast({
								title: '获取手机号失败,请重试',
								duration: 2000,
								icon: 'none'
							})
						}
					}

				}
			},

			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFF5EE;
	}

	.app {

		// 轮播图
		.swiper {
			height: 360rpx;
			position: relative;

			// 城市选择
			.city {
				position: absolute;
				z-index: 999;
				padding: 16rpx 30rpx;
				border-top-right-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				color: $uni-text-color;
				background-color: $uni-bg-color;

				.iconfont {
					margin-right: 10rpx;
					font-size: 32rpx;
				}
			}

		}

		.infoshow {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}

		// 服务列表
		.severList {
			padding: $layoutpadding;




			.sever {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 200rpx;
				margin: 40rpx 0;
				border-radius: 20rpx;
				background-color: #fff;

				.left {
					width: 60%;
					height: 100%;
					border-radius: 20rpx;
					border-right: 1px solid #dedede;
					overflow: hidden;
				}

				.right {
					height: 100%;
					font-size: 30rpx;
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					padding: 30rpx;
					overflow: hidden;
				}
			}
		}
	}


	.itemlist {
		background-color: #fff;
		margin-top: 30rpx;
		border-top: 1rpx solid #DEDEDE;
		border-bottom: 1rpx solid #DEDEDE;

		.item {
			background-color: #FFF;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			@include flex(flex-start);

			.left {

				width: 30%;
			}

			.right {
				width: 70%;

				display: flex;

				input {
					flex: 1;
				}

				.btn {
					height: 100%;
					position: relative;
					text-align: center;
					background-color: #007AFF;
					color: #fff;
					font-size: 26rpx;
					padding: 10rpx 26rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.titlewrap {
		padding: 20rpx;
		color: #858B9C;
		height: 80rpx;
		@include flex(flex-start);



		.title {
			height: 100%;
			font-size: 28rpx;
			@include flex(flex-start);
		}
	}



	.sub {
		position: relative;
		margin: 40rpx;
		padding: 20rpx 30rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
	}
</style>
