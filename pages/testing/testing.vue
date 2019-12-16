<template>
	<view>
		<!-- 完善用户信息 -->
		<luPopupWrapper ref="userPop" type="bottom" transition="slider" backgroundColor="#fff" :active="active" height="36%"
		 width="100%" maskShow maskClick>
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
							<input type="number" v-model="phone" @input="phoneChange" placeholder="请输入手机号" />
							<view class="btn" v-if="show">
								<!-- 获取手机号 -->
								<button class="absolute" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">123</button>
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
		<swiper class="swiper" circular autoplay :interval="5000" indicator-dots :duration="1000">
			<swiper-item v-for="(item,index) in testing.swiper_imgs" :key="index">
				<image :src="item" @tap="swiperLink(index)" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="wrap">
			<view class="testingname">
				<view class="left">
					测试检测站
				</view>
				<view class="right">
					已预约:{{testing.appointments}}人
				</view>
			</view>
		</view>

		<view class="info">
			<view class="menu" @tap="callphone" style="border-bottom: 1rpx solid #dedede;">
				<view class="left">
					<view class="iconfont">
						&#xe619;
					</view>
					<view class="text">
						{{testing.phone}}
					</view>
				</view>
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			<view class="menu" @tap="address">
				<view class="left">
					<view class="iconfont">
						&#xe60f;
					</view>
					<view class="text">
						{{testing.address}}
					</view>
				</view>
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
		</view>
		<!-- 注意事项 -->
		<view class="tip" v-if="testing.tip">
			<view class="t">
				注意事项:
			</view>
			<text>
				{{testing.tip}}
			</text>
		</view>
		
		<view style="height: 100rpx;">
		</view>
		<view class="buttom" :style="{'bottom':isIphoneX ? '68rpx' : '0'}">
			<view class="home" @tap="onHome">
				<view class="iconfont">
					&#xe608;
				</view>
				<view class="text">
					首页
				</view>
			</view>

			<view class="driving_price" hover-class="driving_prices">
				<!-- 根据有没有uid 判断用户是否完善信息 -->
				<view class="absolute" v-if="isinfo" @tap="isinfoshow">
				</view>
				<view @tap="goPay(1)">
					<view class="price">
						¥{{testing.driving_price}}
					</view>
					<view class="text">
						代驾审车
					</view>
				</view>
			</view>

			<view class="appointment_price" hover-class="appointment_prices">
				<!-- 根据有没有uid 判断用户是否完善信息 -->
				<view class="absolute" v-if="isinfo" @tap="isinfoshow">
				</view>
				<view @tap="goPay(2)">
					<view class="price">
						¥{{testing.appointment_price}}
					</view>
					<view class="text">
						预约审车
					</view>

				</view>
			</view>
		</view>

		<view class="share" hover-class="shares" @tap="shareposter">
			<view class="iconfont">
				&#xe691;
			</view>
		</view>


	</view>
</template>

<script>
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue"
	export default {
		components: {
			luPopupWrapper,
		},
		data() {
			return {
				testing: {
					appointments:0,
					phone:'',
					address:'',
					appointment_price:0.00,
					driving_price:0.00
				},
				show: true, //获取手机号按钮
				isinfo: true, //判断用户是否完善用户信息
				name: '',
				phone: '',
				canvasisShow:false, //绘制海报是否隐藏
				posterCode:'',//海报需要的二维码
				isIphoneX:false,
			}
		},
		methods: {
			
			// 去绘制海报
			shareposter(){
				uni.navigateTo({
					url:'../sharePoster/sharePoster'
				})
			},
			
			// 跳转首页
			onHome() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			// 获取用户信息并登陆
			async wxGetUserInfo(e) {
				let {name,phone} = this
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
						}, 'POST')
						uni.hideLoading()
						if (login.data.code == 200) {
							// 同意授权
							uni.setStorageSync('token', login.data.data)
							let perfectuserinfo = await this.ajax(this.api.perfectuserinfo, {
								name,
								phone
							}, 'POST')
							if (perfectuserinfo.data.code == 200) {
								uni.showToast({
									title: perfectuserinfo.data.msg,
									duration: 2000,
									icon: 'none'
								})
								//关闭遮罩
								this.$refs.userPop.close()
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
			// 获取手机号
			async getPhoneNumber(e) {
				if (e.detail.encryptedData && e.detail.iv) {
					let [err, code] = await uni.login({
						provider: 'weixin'
					})
					let res = await this.ajax(this.api.getPhone, {
						code: code.code,
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData
					}, 'POST')
					console.log(res)
					if (res.data.code == 200) {
						if (res.data.data != 'null') {
							this.phone = res.data.data
							this.show = false
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

			// 手机号更改
			phoneChange(e) {
				console.log(e)
				if (e.detail.cursor > 0) {
					this.show = false
				} else {
					this.show = true
				}
			},
			// 填写用户信息
			isinfoshow() {
				this.$refs.userPop.show()
			},
			// 打开地图
			address() {
				uni.openLocation({
					latitude: Number(this.testing.latitude),
					longitude: Number(this.testing.longitude),
					name: this.testing.testingname
				})
			},
			//打电话
			callphone() {
				uni.makePhoneCall({
					phoneNumber: this.testing.phone
				})
			},
			//预览图片
			swiperLink(idnex) {
				// 预览图片
				uni.previewImage({
					current: idnex,
					urls: this.testing.swiper_imgs,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏']
					}
				})
			},
			// 跳转支付
			goPay(i) {
				let price = ''
				if (i == 1) {
					price = this.testing.driving_price
				} else {
					price = this.testing.appointment_price
				}
				let testing_id = this.testing.id
				uni.navigateTo({
					url: `../testingPay/testingPay?type=${i}&price=${price}&testing_id=${testing_id}`
				})
			},
		},
		async onLoad(options) {
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			if(!getApp().globalData.uid){
				let info = await this.ajax(this.api.isinfo)
				if (info.data.code == 200) {
					getApp().globalData.uid = info.data.data
					this.isinfo = false
				}
			}else{
				this.isinfo = false
			}
			if (options.id) {
				let testing = await this.ajax(this.api.testing, {
					id: options.id
					// id: 1
				}, 'POST')
				uni.hideLoading()
				if (testing.data.code == 200) {
					this.testing = testing.data.data

					uni.setNavigationBarTitle({
						title: testing.data.data.testingname
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	
	.share {
		position: fixed;
		bottom: 200rpx;
		right: 60rpx;
		z-index: 99;
		padding: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #007AFF;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		.iconfont{
			font-size: 80rpx;
			color: #fff;
		}
	}
	.shares{
		background-color: #15668A;
	}


	.tip {
		padding: 30rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		background-color: #fff;

		.t {
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}
	}


	// 轮播图
	.swiper {
		height: 500rpx;
	}


	.wrap {
		padding: 30rpx;
		background-color: #fff;
		margin: 20rpx 0;

		.testingname {
			.left {
				font-size: 38rpx;
			}

			.right {
				margin-top: 20rpx;
				color: #999;
			}
		}
	}

	.info {
		margin: 20rpx 0;
		background-color: #fff;

		// 菜单
		.menu {
			margin: 0 30rpx;
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				align-items: center;
				width: 90%;
				height: 100%;

				.iconfont {
					font-size: 42rpx;
					margin-right: 20rpx;
					color: #0081FF;
				}

				.text {
					color: #999;
				}
			}

			.right {
				height: 100%;
				width: 10%;
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					font-size: 42rpx;
				}

			}
		}




	}





	//底部按钮
	.buttom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		background-color: #fff;
		border-top: 1rpx solid #dedede;

		.home {
			flex: 2;
			.iconfont {
				font-size: 44rpx;
			}
			.text{
				font-size: 26rpx;
			}
		}

		.driving_price,
		.appointment_price,
		.home {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-size: 28rpx;
		}

		.driving_price,
		.appointment_price {
			flex: 4;
			position: relative;

			&>view {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

			}
		}

		.driving_price {
			background-color: #FCCB34;
			color: #fff;
		}
		.driving_prices{
			background-color: #F0AD4E;
		}

		.price {
			text-align: center;
		}

		.appointment_price {
			background-color: #007AFF;
			color: #fff;
		}
		.appointment_prices{
			background-color: #15668A;
		}
	}


	// 遮罩层
	.popwrap {
		.title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			margin: 20rpx 0;
		}
	}



	// 完善信息

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








	// 确定提交

	.btns {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 160rpx;

		.submit {
			width: 50%;
			height: 80rpx;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			background-color: #007AFF;
			color: #fff;
		}
	}
</style>
