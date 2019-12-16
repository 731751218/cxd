<template>
	<view class="content">
		<an-layer ref="anRef" autoClose></an-layer>

		<!-- 日历 -->
		<uni-calendar :disable-before="true" ref="calendar" @confirm="calendar"></uni-calendar>


		<!-- 提交的信息 -->
		<view class="form">
			<view class="wrap">
				<view>
					车牌号:
				</view>
				<view class="carnumber">
					<licensePlateKey ref="licensePlateKey" />
				</view>
			</view>
			<view class="item">
				<view class="left">
					联系人:
				</view>
				<view class="right">
					<input class="val" type="text" v-model="name" placeholder="联系人" />
				</view>
			</view>
			<view class="item">
				<view class="left">
					联系电话:
				</view>
				<view class="right">
					<input class="val" type="number" v-model="phone" placeholder="联系电话" />
					
					<view class="getphone" hover-class="getphones" v-if="!phone.length">
						<button class="absolute" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
						</button>
						获取本机手机号</view>
				</view>
			</view>

			<view class="item">
				<view class="left">
					审车日期:
				</view>
				<view class="right">
					<view class="val" @tap="onCalendar">{{dataTime}}</view>
				</view>
			</view>


			<view class="item" v-if="isaddress">
				<view class="left">
					取车地址:
				</view>
				<view class="right">
					<input class="val" type="text" style="height: 140rpx;width: auto;" v-model="address" placeholder="取车地址(请填详细地址)" />

					<!-- 打开地图 -->
					<view class="map" @tap="onMap">
						打开地图
					</view>
				</view>
			</view>





			<view class="item">
				<view class="left">
					备注信息:
				</view>
				<view class="right">
					<input class="val" type="text" v-model="msg" placeholder="备注信息" />
				</view>
			</view>


		</view>



		<!-- 底部按钮 -->
		<view style="height: 100rpx;"></view>
		<view class="buttom">
			<view class="price">
				¥<text style="font-size: 32rpx;">{{price}}</text>
			</view>
			<view class="pay" @tap="pay">
				立即下单
			</view>
		</view>
	</view>
</template>

<script>
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue"
	import licensePlateKey from '@/components/license-plate-key'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import MD5Util from '@/common/md5.js'
import anLayer from '@/components/an-layer/an-layer'
	export default {
		components: {
			luPopupWrapper,
			uniCalendar,
			licensePlateKey,
			anLayer
		},
		data() {
			return {
				address: '', //取车地址
				dataTime: '打开日历选择审车日期',
				msg: '', //备注信息
				name: '', //联系人
				phone: '', //电话
				carnumber: '', //车牌号
				type: null, //审车类型 1=代驾 2=预约
				isaddress: true,
				testing_id: null, //检测站id
				price: '', //支付金额
				settime: null,
			};
		},
		methods: {
			
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
							console.log('获取手机号成功!')
							console.log(res.data.data)
							this.phone=res.data.data
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
			
			
			// 打开日历
			onCalendar() {
				this.$refs.calendar.open()
			},
			//日历改变
			calendar(e) {
				console.log(e.fulldate)
				this.dataTime = e.fulldate
			},
			onMap() {
				uni.chooseLocation({
					success: (res) => {
						this.address = res.address
					}
				})
			},
			// 支付
			async pay() {
				
				//订阅消息(先判断用户微信是否支持订阅消息)
				if(wx.requestSubscribeMessage){
					if(JSON.stringify(getApp().globalData.messageTemplateId)!='{}'){
						console.log('开始订阅!!')
						let testing_message_template_id = getApp().globalData.messageTemplateId.testing_message_template_id
						wx.requestSubscribeMessage({
						  tmplIds: [testing_message_template_id],
						  success :(res)=>{
							  uni.showToast({
							  	title: '订阅成功!',
							  	icon: 'none',
							  	duration: 2000
							  })
						  }
						})
					}
				}
				
				let {
					name,
					phone,
					dataTime,
					type,
					msg,
					testing_id,
					price,
					address,
				} = this
				name = name.trim()
				let carnumber = this.$refs.licensePlateKey.toBind()
				if (carnumber) {
					if (!name.length) {
						uni.showToast({
							title: '请输入联系人',
							icon: 'none',
							duration: 2000
						})
						return false
					} else if (!(/^1[3456789]\d{9}$/.test(phone))) {
						uni.showToast({
							title: '请输入有效的手机号',
							icon: 'none',
							duration: 2000
						})
						return false
					} else if (dataTime == '打开日历选择审车日期') {
						uni.showToast({
							title: '请打开日历选择审车日期',
							icon: 'none',
							duration: 2000
						})
						return false
					}
					if (type == 1) {
						let address = this.address.trim()
						if (!address.length) {
							uni.showToast({
								title: '请填写详细的取车地址',
								icon: 'none',
								duration: 2000
							})
							return false
						}
					}
					// 可以下单
					console.log('可以下单')
					let res = await this.ajax(this.api.testingPay, {
						type,
						name,
						phone,
						carnumber,
						msg,
						testing_id,
						price,
						address,
						datatime: dataTime
					}, 'POST')
					let order_id = res.data.data.order_id
					if (res.data.code == 200) {
						let data = JSON.parse(res.data.data.payinfo)
						if (data.return_code == 'FAIL') {
							uni.showModal({
								title: '提示',
								content: data.return_msg,
								showCancel: false
							})
						}
						let appId = data.appid
						let timeStamp = parseFloat(data.timeStamp).toString()
						let pkg = 'prepay_id=' + data.prepay_id
						let nonceStr = data.nonce_str
						let sign = data.sign
						let paySign = MD5Util.MD5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg +
							'&signType=MD5&timeStamp=' + timeStamp + "&key=" + data.apikey)
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: timeStamp,
							nonceStr: nonceStr,
							package: pkg,
							signType: 'MD5',
							paySign: paySign,
							success: (res) => {
								this.$refs.anRef.show("支付成功！", {
									type: 'success'
								})
								this.settime = setTimeout(() => {
									uni.reLaunch({
										url: '../testingOrder/testingOrder'
									})
								}, 1000)
							},
							fail: (err) => {
								this.$refs.anRef.show("支付失败！", {
									type: 'error'
								})
							},
							complete() {
								uni.hideLoading()
							}
						})
					} else {
						// uni.showModal({
						//     title: '提示',
						//     content: res.data.msg,
						//     showCancel:false
						// })
						// //删除该订单
						// this.ajax(this.api.deleteTestingOrder,{
						// 	order_id
						// },'POST')
						return false
					}

				} else {
					uni.showToast({
						title: '请输入车牌号',
						icon: 'none',
						duration: 2000
					})
				}
			}
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type
			let title = ''
			switch (options.type) {
				case '1':
					title = '代驾审车下单'
					break
				case '2':
					title = '预约审车下单'
					this.isaddress = false
					break
			}
			uni.setNavigationBarTitle({
				title
			})
			this.price = options.price
			this.testing_id = options.testing_id
		},
		onUnload() {
			clearTimeout(this.settime)
		}
	}
</script>
<style lang="scss">
	.wrap {
		padding: 20rpx;
		background-color: #fff;
	}

	.carnumber {
		padding: 20rpx;

		&>view {
			font-size: 28rpx;
		}
	}


	// 填写的数据
	.form {
		font-size: 28rpx;

		.item {
			display: flex;
			align-items: center;
			padding: 20rpx;
			margin: 10rpx 0;
			background-color: #fff;

			.left {
				width: 26%;

			}

			.right {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.val {
					flex: 1;
				}
				.getphone{
					position: relative;
					padding: 10rpx;
					background: #007AFF;
					border-radius: 10rpx;
					color: #fff;
				}
				.getphones{
					background-color: #00BFFF;
				}

				.map,
				.calendar {
					width: 100rpx;
					margin-left: 20rpx;
					padding: 10rpx 20rpx;
					text-align: center;
					background-color: #007AFF;
					border-radius: 10rpx;
					color: #fff;
				}

			}




		}
	}



	.buttom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;

		.price {
			width: 70%;
			height: 100%;
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			color: #f00;
		}

		.pay {
			position: relative;
			height: 100%;
			font-size: 28rpx;
			background-color: #007AFF;
			color: #fff;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
