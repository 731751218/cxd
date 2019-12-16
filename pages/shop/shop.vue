<template>
	<view>
		<an-layer ref="anRef" autoClose></an-layer>
		<!-- 轮播图 -->
		<swiper class="swiper" circular autoplay :interval="5000" indicator-dots :duration="1000">
			<swiper-item v-for="(item,index) in info.swiper" :key="index">
				<image :src="item" @tap="swiperLink(index)" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="wrap">
			<view class="title">
				{{info.card_name}}
			</view>
			<view class="pricenum">
				<view class="price">
					¥<text>{{info.price}}</text>
				</view>
				<view class="num">
					<uniNumberBox :min="1" @change="numChange" :value="num"></uniNumberBox>
				</view>
			</view>
			<!-- 限购和库存 -->
			<view class="flex">
				<view>总库存:{{info.stock}}张</view>
				<view v-if="info.totalpurchase!=0">总限购:{{info.totalpurchase}}张</view>
				<view v-else>不限购</view>
			</view>
			<!-- 商家地址 -->
			<view class="item shop_address">
				<view class="address">
					<view class="left" @tap="openMap">
						<view class="shopname">{{info.shop_name}}</view>
						<view class="specificaddress">
							<text class="iconfont">&#xe707;</text> <text>{{info.shop_address}}</text>
						</view>
					</view>
					<view class="right">
						<view class="km" @tap="openMap">{{info.km}}</view>
						<view class="iconfont" @tap="callphone">&#xe619;</view>
					</view>
				</view>
			</view>
			<!-- 购买须知 -->
			<view class="item pay_info">
				<view class="title">
					购买须知:
				</view>
				<view class="info">
					{{info.text}}
				</view>
			</view>
		</view>

		<view class="buttom" @tap="pay" :style="{'margin-bottom':isIphoneX ? '68rpx' : '0'}">
			立即购买
		</view>
	</view>
</template>

<script>
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue"
	import anLayer from '@/components/an-layer/an-layer'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import MD5Util from '@/common/md5.js'
	export default {
		components: {
			luPopupWrapper,
			uniNumberBox,
			anLayer,
		},
		data() {
			return {
				num: 1, //数量
				settime: null,
				info: {
					card_name: '',
					price: 0.00,
					shop_address: '',
					shop_name: '',
					text: '',
					km: '',
					stock: '',
					totalpurchase: ''
				}, //卡券信息
				isIphoneX: false,
				id: '', //保存当前的id
			};
		},
		onLoad(options) {
			let isIphoneX = getApp().globalData.isIphoneX;
			this.isIphoneX = isIphoneX
			if (options.id) this.id = options.id
		},
		async onShow() {
			uni.showLoading({
				title: '加载中..',
				mask: true
			})
			let [err, data] = await uni.getLocation({
				type: 'gcj02'
			})
			let longitude = ''
			let latitude = ''
			if (!err) {
				longitude = data.longitude //经度
				latitude = data.latitude //纬度
			} else {
				longitude = null //经度
				latitude = null //纬度
			}
			let res = await this.ajax(this.api.cardTicket, {
				id: this.id,
				longitude: longitude,
				latitude: latitude,
			}, 'POST')
			uni.hideLoading()
			if (res.data.code == 200) {
				this.info = res.data.data
				uni.setNavigationBarTitle({
					title: res.data.data.card_name
				})
			}
		},
		methods: {

			//确认支付
			async pay() {

				let {
					card_id,
					id,
					price
				} = this.info
				let num = this.num
				// this.$refs.luPopupWrapper.close()
				uni.showLoading({
					title: '支付中..',
					mask: true
				})

				let cardTicketPay = await this.ajax(this.api.cardTicketPay, {
					card_ticket_id: card_id,
					id,
					num,
					price
				}, 'POST')

				if (cardTicketPay.data.code == 200) {
					let appId = res.data.data.appid
					let timeStamp = parseFloat(res.data.data.timeStamp).toString()
					let pkg = 'prepay_id=' + res.data.data.prepay_id
					let nonceStr = res.data.data.nonce_str
					let sign = res.data.data.sign
					let paySign = MD5Util.MD5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg +
						'&signType=MD5&timeStamp=' + timeStamp + "&key=" + res.data.data.apikey)
					// 仅作为示例，非真实参数信息。
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
							//支付成功页面跳转
							setTimeout(() => {
								uni.navigateTo({
									url: '../shopOrder/shopOrder'
								})
								uni.hideLoading()
							}, 1000)
						},
						fail: async (err) => {
							this.$refs.anRef.show("支付失败！", {
								type: 'error'
							})
							//恢复卡券库存(只有支付失败才需要恢复库存)
							this.ajax(this.api.recoveryStock, {
								id,
								num
							}, 'POST')
						},
						complete: () => {
							uni.hideLoading()
						}

					})
				} else if (cardTicketPay.data.code == 201) {
					//免费的卡券
					this.$refs.anRef.show("支付成功！", {
						type: 'success'
					})
					this.settime = setTimeout(() => {
						uni.navigateTo({
							url: '../shopOrder/shopOrder'
						})
						uni.hideLoading()
					}, 1000)

				} else {
					this.$refs.anRef.show(cardTicketPay.data.msg, {
						type: 'success'
					})
					uni.hideLoading()
				}

			},
			// 打电话给商家
			callphone() {
				uni.makePhoneCall({
					phoneNumber: this.info.phone
				})
			},
			// 打开地图
			openMap() {
				uni.openLocation({
					latitude: Number(this.info.latitude),
					longitude: Number(this.info.longitude),
					name: this.info.shop_name
				})
			},

			// 订单数量
			numChange(num) {
				this.num = num
			},

			swiperLink(idnex) {
				// 预览图片
				uni.previewImage({
					current: idnex,
					urls: this.info.swiper,
				})

			}
		},
		onUnload() {
			clearTimeout(this.settime)
		}
	}
</script>

<style lang="scss">
	
	.info {
		margin-bottom: 100rpx;
	}

	.popwrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 0;

		.pay {
			width: 300rpx;
			height: 60rpx;
			background-color: #F32C1E;
			color: #fff;
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	// 轮播图
	.swiper {
		height: 500rpx;
		position: relative;

		// 城市选择
		.city {
			position: absolute;
			top: 60rpx;
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



	.wrap {
		padding: 30rpx;
		background-color: #fff;

		.flex {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
		}

		.title {
			font-size: 34rpx;
			padding-bottom: 30rpx;
		}

		.pricenum {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price {
				color: #F32C1E;

				text {
					font-size: 40rpx;
				}
			}

		}

		.item {
			margin: 20rpx 0;
		}

		// 商家地址
		.shop_address {
			padding: 30rpx 0;

			.title {
				padding-bottom: 20rpx;
			}

			.address {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					width: 60%;
					display: flex;
					justify-content: space-around;
					flex-direction: column;

					.shopname {
						font-weight: blod;
						font-size: 30rpx;
						margin-bottom: 20rpx;
					}

					.specificaddress {
						.iconfont {
							font-size: 32rpx;
						}

					}
				}

				.right {
					height: 100rpx;
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;

					&>view {
						width: 50%;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.km {
						border-right: 1rpx solid #dedede;
					}

					.iconfont {
						font-size: 60rpx;
					}


				}
			}
		}
	}


	.buttom {
		font-size: 34rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		background-color: #F32C1E;
		color: #fff;
		justify-content: center;
		align-items: center;
	}
</style>
