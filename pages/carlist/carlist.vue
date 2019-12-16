<template>
	<view>

		<view class="title">
			<view class="borderstyle">
			</view>
			<view>
				我的车辆
			</view>
		</view>

		<!-- 车辆列表 -->
		<view class="carlist">
			<view class="car" v-for="(car,index) in carList" :key="index">
				<view style="letter-spacing:10rpx">{{car.carnumber}}</view>
				<view class="remove" @tap="remove(car.id,car.carnumber)">删除</view>
			</view>

		</view>

		<!-- 添加车辆 -->
		<view class="addcar">
			<view class="wrap" @tap="addcar">
				<view class="icon iconfont">
					&#xe642;
				</view>
				<view class="txt">
					添加车辆
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				carList: [], // 车辆列表
			};
		},
		methods: {

			// 删除车辆
			remove(id, carnumber) {
				uni.showModal({
					title: '提示',
					content: `是否要删除车牌为:${carnumber}`,
					success: async (res) => {
						if (res.confirm) {
							let deleteCarInfo = await this.ajax(this.api.deleteCarInfo, {
								id
							}, 'POST')
							if (deleteCarInfo.data.code) {
								uni.showToast({
									icon: 'none',
									title: deleteCarInfo.data.msg,
									duration: 2000
								})
								this.getCarList()
							}

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},

			async getCarList() {
				let carList = await this.ajax(this.api.carList)
				if (carList.data.code == 200) {
					if (carList.data.data != 'null') {
						this.carList = carList.data.data
					}
				}
			},


			// 添加车辆
			addcar() {
				uni.navigateTo({
					url: '../addcar/addcar'
				})
			}
		},

		onShow() {
			this.getCarList()
		}
	}
</script>

<style lang="scss">
	.title {
		padding: 0 40rpx;
		font-size: 32rpx;
		height: 40rpx;
		margin: 20rpx 0;
		@include flex(flex-start, center);
	}


	.carlist {
		margin: 20rpx 0;

	}




	.addcar,
	.carlist {
		padding: 0 40rpx;

		.wrap,
		.car {
			border-radius: 10rpx;
			border: 1rpx solid #ABABAB;
			height: 160rpx;
			padding: 10rpx 0;
			box-sizing: border-box;
			color: #007AFF;
			box-sizing: border-box;
		}

		.wrap {
			@include flex(space-around, center, column);

			.icon {
				font-size: 62rpx;
			}

			.txt {
				font-size: 30rpx;
			}
		}

		.car {
			padding: 0 20rpx;
			@include flex(space-between, center);
			font-size: 44rpx;
			border: 1rpx solid #007AFF;
			margin: 20rpx 0;

			.remove {
				padding: 20rpx;
				background-color: #F08080;
				font-size: 36rpx;
				color: #fff;
				border-radius: 10rpx;
			}
		}
	}
</style>
