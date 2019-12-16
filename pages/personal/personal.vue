<template>
	<view>
		<view class="header">
			<view v-if="userinfo" class="userinfo">
				<view class="avatarurl">
					<image :src="userinfo.avatarurl"></image>
				</view>
				<view class="username">
					{{userinfo.nickname}}
				</view>
			</view>

			<view v-else class="userinfo">
				<!-- #ifdef MP-WEIXIN -->

				<button class="absolute" lang="zh_CN" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信授权获取用户信息</button>

				<!-- #endif -->
				<view class="avatarurl">
					<image src="../../static/avatarurl.png" mode=""></image>
				</view>
				<view class="username">
					请先登录
				</view>
			</view>



		</view>
		
		<view class="menulist">
			
			<view class="menuTitle">我的服务</view>
			
			<view class="item" @tap="onMenu('../carlist/carlist')">
				<view class="left">
					<view class="icon iconfont" style="font-size: 50rpx;">
						&#xe743;
					</view>
					<view class="menuname">
						车辆管理
					</view>
				</view>

				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>

			<view class="item" @tap="onMenu('../shopOrder/shopOrder')">
				<view class="left">
					<view class="icon iconfont" >
						&#xe627;
					</view>
					<view class="menuname">
						卡券订单
					</view>
				</view>
			
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>

			<view class="item" @tap="onMenu('../exemptionLabelOrder/exemptionLabelOrder')">
				<view class="left">
					<view class="icon iconfont">
						&#xe607;
					</view>
					<view class="menuname">
						免检标订单
					</view>
				</view>

				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			
			
			<view class="item" @tap="onMenu('../testingOrder/testingOrder')">
				<view class="left">
					<view class="icon iconfont" >
						&#xe648;
					</view>
					<view class="menuname">
						检测站订单
					</view>
				</view>
			
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			
			
			<view class="item" @tap="onMenu('../carInsuranceQuoteOrder/carInsuranceQuoteOrder')">
				<view class="left">
					<view class="icon iconfont">
						&#xe61a;
					</view>
					<view class="menuname">
						车险报价订单
					</view>
				</view>
			
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			
			
			<view class="item" @tap="onMenu('../legalAdviserOrder/legalAdviserOrder')">
				<view class="left">
					<view class="icon iconfont" style="font-size: 50rpx;">
						&#xe80c;
					</view>
					<view class="menuname">
						法律咨询订单
					</view>
				</view>
			
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			
			<view class="item" @tap="onMenu('../subordinateOrder/subordinateOrder')">
				<view class="left">
					<view class="icon iconfont" >
						&#xe742;
					</view>
					<view class="menuname">
						下级订单动态
					</view>
				</view>
			
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			
			<view class="item" @tap="onMenu('../sharePoster/sharePoster')" style="border: 0;">
				<view class="left">
					<view class="icon iconfont" >
						&#xe691;
					</view>
					<view class="menuname">
						分享海报
					</view>
				</view>
			
				<view class="right">
					<view class="iconfont">
						&#xe615;
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {}
			};
		},
		async onShow() {
			// 获取用户头像 昵称
			if(!getApp().globalData.userinfo){
				let userinfo = await this.ajax(this.api.userinfo)
				if (userinfo.data.code == 200) {
					getApp().globalData.userinfo = userinfo.data.data
					this.userinfo = getApp().globalData.userinfo
				}
			}else{
				this.userinfo = getApp().globalData.userinfo
			}
		},
		methods: {
			onMenu(url) {
				if(!this.userinfo){
					uni.showToast({
						title: '请先登录!',
						duration: 2000,
						icon: 'none'
					})
					return false
				}
				uni.navigateTo({
					url: url
				})
			},
			// 获取用户信息并登陆
			async wxGetUserInfo(e) {
				console.log(e)
				uni.showLoading({
					title: '登陆中...',
					mask: true
				})
				if (e.detail.iv || e.detail.encryptedData) {
					// 获取code
					let [error, data] = await uni.login({
						provider: 'weixin'
					})
					// 登陆
					let res = await this.ajax(this.api.login, {
						code: data.code,
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
						pid: getApp().globalData.pid
					}, 'POST')
					uni.hideLoading()
					if (res.data.code == 200) {
						// 同意授权
						e.detail.userInfo
						let userinfo = {
							avatarurl:e.detail.userInfo.avatarUrl,
							nickname:e.detail.userInfo.nickName 
						}
						getApp().globalData.userinfo = userinfo
						this.userinfo = userinfo
						uni.setStorageSync('token', res.data.data)
						uni.showToast({
							title: '登陆成功!',
							duration: 2000,
							icon: 'none'
						})
						//检测用户是否完善信息并获取用户的uid
						let info = await this.ajax(this.api.isinfo)
						if (info.data.code == 200) {
							getApp().globalData.uid = info.data.data
							console.log('获取到了用户的uid---------'+getApp().globalData.uid)
						}
						
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.header {
		height: 400rpx;
		background: linear-gradient(to right, #6fcef2 0%, #0e93d8 100%);
		padding: 30rpx;
		box-sizing: border-box;
		
		
		
		.userinfo {
			position: relative;
			height: 100%;
			@include flex;
			

			.getuser {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 99;
				opacity: 0;
			}

			.avatarurl {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.username {
				font-size: 38rpx;
				color: #fff;
			}
		}
	}


	.menulist {
		padding: 10rpx 20rpx;
		border-radius: 20px 20px 0 0;
		margin-top: -40rpx;
		background-color: #fff;
		.menuTitle{
			padding: 20rpx;
			font-size: 32rpx;
			
		}
		.item {
			padding: 16rpx 0;
			border-bottom: 1rpx solid #dedede;
			@include flex(space-between);
			box-sizing: border-box;

			.left {
				@include flex(flex-start);

				.icon {
					width: 70rpx;
					height: 70rpx;
					box-sizing: border-box;
					@include flex;
					border-radius: 50%;
					padding: 10rpx;
					font-size: 42rpx;
					margin-right: 20rpx;
					// background-color: #F5DEB3;
					color: #0e93d8
				}

				.menuname {
					font-size: 30rpx;
				}
			}

			.right {
				.iconfont {
					font-size: 48rpx;
					
				}
			}
		}
	}
</style>
