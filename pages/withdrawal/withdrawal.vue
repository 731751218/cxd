<template>
	<view>
		<view class="title">
			<view class="borderstyle">
			</view>
			<view class="txt">
				申请提现
			</view>
		</view>

		<!-- 提现申请 -->
		<view class="input">
			<view class="left">
				提现金额(元):
			</view>
			<view class="right">
				<input type="digit" v-model="price" :placeholder="inputtxt" />
			</view>
		</view>

		<!-- 提现记录 -->
		<view class="title">
			<view class="borderstyle">
			</view>
			<view class="txt">
				提现记录
			</view>
		</view>

		<!-- 提现记录 -->
		<view v-if="withdrawallist.length" class="withdrawallist">
			<view class="withdrawal" v-for="(item,index) in withdrawallist" :key="index">
				<view class="left">
					<view class="price">
						提现金额: {{item.price}}元
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="right" :class="[{ success: item.state=='提现成功'},{ error: item.state=='提现失败'},]">
					{{item.state}}
				</view>

			</view>
		</view>

		<!-- 没有记录 -->
		<nodata height="800" text="暂无提现记录" v-else></nodata>


		<view style="height: 100rpx;">

		</view>

		<!-- 提现按钮 -->
		<view class="buttom">
			<view class="btn">
				<view @tap="withdrawal">
					立即提现
				</view>
			</view>
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
				price: '',
				sureprice: 0,
				inputtxt: '', //输入框的提示信息
				withdrawallist: []
			};
		},
		watch: {
			// 输入框提示语
			sureprice(val) {
				this.inputtxt = `可提现金额为:${val}元`
			}
		},

		methods: {
			// 立即提现
			async withdrawal() {

				// 先判断不能为空
				if (!this.price.length) {
					uni.showToast({
						title: '提现金额不能为空!',
						duration: 2000,
						icon: "none"
					})
					return false
				}
				if (this.price.substring(0, 1) === '.' || parseFloat(this.price) < 1) {
					uni.showToast({
						title: '最低提现一元!',
						duration: 2000,
						icon: "none"
					})
					return false
				}
				// 判断提现金额是否大于可提现金额
				if (parseFloat(this.price) > parseFloat(this.sureprice)) {
					uni.showToast({
						title: '提现金额不能大于可提现金额',
						duration: 2000,
						icon: "none"
					})
					return false
				}
				uni.showLoading({
					title: '提现中..',
					mask: true
				})
				// 通过检测
				let applyWithdrawal = await this.ajax(this.api.applyWithdrawal, {
					price: this.price
				}, 'POST')
				uni.hideLoading()
				if (applyWithdrawal.data.code) {
					uni.showToast({
						title: applyWithdrawal.data.msg,
						duration: 2000,
						icon: "none"
					})
				}
				this.price = ''
				
				// 获取当前的金额
				this.getnowMoney()
				this.getwithdrawallist()
			},

			//获取当前金额
			async getnowMoney() {
				let nowMoney = await this.ajax(this.api.nowMoney)
				if (nowMoney.data.code == 200) {
					if (nowMoney.data.data != 'null') {
						this.sureprice = nowMoney.data.data
					}
				}
			},

			//获取提现列表
			async getwithdrawallist() {
				let withdrawal = await this.ajax(this.api.withdrawal)
				if (withdrawal.data.code == 200) {
					if (withdrawal.data.data != 'null') {
						this.withdrawallist = withdrawal.data.data
					}
				}

			},
		},
		async onLoad() {

			this.getnowMoney()

			//获取提现记录
			this.getwithdrawallist()
		},

		onShow() {

			this.sureprice = 88
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.title {
		padding: 20rpx;
		@include flex(flex-start);
		font-size: 28rpx;



	}

	.input {
		@include flex(flex-start);
		padding: 0 10rpx;
		height: 160rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		border-bottom: 1rpx solid #dedede;

		.left {
			width: 30%;
			text-align: center;
		}

		.right {
			width: 70%;
			height: 100%;
			@include flex(flex-start);

			input {
				width: 100%;
				height: 100%;
			}
		}
	}


	.buttom {
		position: fixed;
		bottom: 30rpx;
		width: 100%;
		height: 100rpx;
		@include flex;
		box-sizing: border-box;

		.btn {
			width: 70%;
			height: 80rpx;
			background-color: #007AFF;
			color: #fff;
			font-size: 32rpx;
			@include flex;
			border-radius: 40rpx;
		}
	}


	.withdrawallist {
		padding: 0 30rpx;

		.withdrawal {
			@include flex(space-between);
			margin: 30rpx 0;

			.left {
				.price {
					font-size: 26rpx;
					margin-bottom: 8rpx;
				}

				.time {
					color: #BCBCBC;
					font-size: 22rpx;
				}
			}

			.right {
				color: #007AFF;
			}

			.success {
				color: #00E676;
			}

			.error {
				color: #f00;
			}
		}
	}
</style>
