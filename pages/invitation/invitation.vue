<template>
	<view>
		<view class="header" :style="{'height':headerHeight}">
			<view class="wrapinfo">
				<view class="wrap">
					<!-- 上下布局 -->
					<view class="commission">
						<!-- 左右布局 -->
						<view>
							<view class="currentcommission">
								<text class="iconfont ">
									&#xe606;
								</text>
								当前佣金
							</view>
							<view class="currentcommissionnum">
								{{invitationInfo.current_price}}
							</view>
						</view>
						<view class="commissioninfo">
							<view>
								<view class="comcolor">{{invitationInfo.yesterday_profit}}</view>
								<view>昨日收益</view>
							</view>
							<view @tap="onLink('../commissionlist/commissionlist')">
								<view class="comcolor">{{invitationInfo.price}}</view>
								<view>累计收益</view>
							</view>
						</view>
					</view>
					<!-- 立即提现 佣金明细 -->
					<view class="withdrawals">
						<view class="withdrawalsbtn" hover-class="withdrawalsbtns" @tap="onLink('../withdrawal/withdrawal')">立即提现</view>
						<view class="withdrawalsbtn emptybtn" hover-class="emptybtns" @tap="onLink('../commissionlist/commissionlist')">佣金明细</view>
					</view>
				</view>
			</view>
		</view>


		<view style="height: 140rpx;"></view>
		<!-- 统计 -->

		<view class="statisticswrap">
			<!-- 标题 -->
			<view class="statisticstitle">
				<view class="icon">
					<text class="iconfont">&#xe617;</text>
					<text>车友统计</text>
				</view>
				<view>共{{invitationInfo.num}}人</view>
			</view>

			<!-- 邀请列表 -->
			<scroll-view v-if="listlength!=0" class="invitationlist" :style="{'height':height+'px'}" scroll-y @scrolltolower="scrolltolower">
				<view class="item" v-for="(item,index) in invitationInfo.list" :key="index">
					<view>
						<view class="avatarurl">
							<image :src="item.avatarurl"></image>
						</view>
						<view class="nickname">
							{{item.nickname}}
						</view>
					</view>
					<view>
						{{item.logintime}}
					</view>
				</view>
			</scroll-view>

			<nodata v-else :height="height*1.6" text="暂无邀请记录"></nodata>
		</view>
	</view>
</template>

<script>
	import nodata from "@/components/nodata.vue";
	export default {
		components: {
			nodata
		},
		data() {
			return {
				height: 0,
				headerHeight: 0,
				invitationInfo: {
					current_price:0,
					num:0,
					price:0,
					yesterday_profit:0
				}, //邀请信息
				listlength: 0,
				pages: 1, //页码
				isScroll:true, //是否可以下滑加载
			};
		},
		methods: {
			//跳转
			onLink(url) {
				uni.navigateTo({
					url
				})
			},

			// 获取邀请信息
			async getInvitationInfo() {
				uni.showLoading({
					title:'加载中...',
					mask:true,
				})
				let invitationInfo = await this.ajax(this.api.invitationInfo, {
					pages: this.pages
				}, 'POST')
				uni.hideLoading()
				if (invitationInfo.data.code == 200) {
					if (invitationInfo.data.data != 'null') {
						if(this.pages==1){
							this.invitationInfo = invitationInfo.data.data
						}else{
							if(invitationInfo.data.data.list.length!=0){
								this.invitationInfo.list = this.invitationInfo.list.concat(invitationInfo.data.data.list)
							}else{
								uni.showToast({
									title:'没有更多数据了',
									duration:2000,
									icon:'none'
								})
								this.isScroll=false
							}
						}
						if (invitationInfo.data.data.list.length != 0) {
							this.listlength = invitationInfo.data.data.list.length
						}
						
					}
				}
			},

			// 滑动到底部加载数据
			scrolltolower() {
				if(this.isScroll){
					this.pages++
					this.getInvitationInfo()
				}
			}
		},

		onShow() {
			this.pages=1
			this.isScroll=true
			//获取邀请信息
			this.getInvitationInfo()
		},
		async onLoad() {
			let [err, systemInfo] = await uni.getSystemInfo()
			console.log()
			let statusBarHeight = systemInfo.statusBarHeight
			if (statusBarHeight == 20) {
				this.headerHeight = '280rpx'
			} else {
				this.headerHeight = '320rpx'
			}
			this.height = systemInfo.screenHeight * 0.48
		}
	}
</script>

<style lang="scss">
	.header {
		position: relative;
		background: linear-gradient(to right, #6fcef2 0%, #0e93d8 100%);

		.wrapinfo {
			position: absolute;
			bottom: -140rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			height: 280rpx;

			.wrap {
				width: 90%;
				height: 100%;
				background-color: #fff;
				border-radius: 10rpx;
				padding: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.commission {
					display: flex;
					justify-content: space-between;
					align-items: center;
					text-align: center;
					padding: 0 20rpx;
					font-size: 26rpx;

					.currentcommission {
						font-size: 32rpx;
						font-weight: bold;

						.iconfont {
							font-size: 40rpx;
							margin-right: 10rpx;
							color: #0e93d8;
						}
					}

					.currentcommissionnum {
						color: #0e93d8;
						font-size: 36rpx;
					}

					.commissioninfo {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 50%;

						.comcolor {
							color: #0e93d8;
						}
					}
				}

				.withdrawals {
					padding: 0 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.withdrawalsbtn {
						width: 180rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #0e93d8;
						color: #fff;
						border-radius: 40rpx;
					}

					.withdrawalsbtns {
						background-color: #fff;
						color: #0e93d8;
					}

					.emptybtn {
						background-color: #fff;
						border: 1rpx solid #0e93d8;
						color: #0e93d8;
					}

					.emptybtns {
						background-color: #0e93d8;
						color: #fff;
					}
				}
			}
		}

	}

	.statisticswrap {
		border-radius: 10rpx;
		padding: 30rpx;
		background-color: #fff;
		width: 90%;
		margin: 40rpx auto 0;

		.statisticstitle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			font-size: 26rpx;
			font-weight: bold;

			.iconfont {
				margin-right: 20rpx;
				font-size: 48rpx;
				vertical-align: middle;
				color: #0e93d8;
			}
		}

		.invitationlist {

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 10rpx;
				border-bottom: 1rpx solid #dedede;

				&>view {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.avatarurl {
						width: 60rpx;
						height: 60rpx;
						margin-right: 10rpx;
						border-radius: 50%;
						overflow: hidden;
					}
				}

			}
		}
	}
</style>
