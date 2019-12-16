<template>
	<view>
		<view class="wrap" v-if="testingList.length">
			<view class="servicestationlist">
				<!-- 一个服务站 -->
				<view @tap="linkTesting(testing.id)" class="servicestationitem" v-for="(testing,index) in testingList" :key="index">
					<!-- 左边图片 -->
					<view class="left">
						<image :src="testing.img" mode="aspectFill"></image>
					</view>
					<!-- 中间内容 -->
					<view class="center">
						<view class="title">
							{{testing.testingname}}
						</view>
						<!-- 介绍 -->
						<view class="introduce">
							服务热线:{{testing.phone}}
						</view>
						<view class="address">
							{{testing.address}}
						</view>
					</view>
					<!-- 右侧距离 -->
					<view class="right">
						<!-- 累计预约车辆 -->
						<view class="appointmentnum">
							已预约: <text>{{testing.appointments}}</text>
						</view>
						<!-- 当前距离 -->
						<view class="distance">
							<text class="iconfont ">
								&#xe711;
							</text>
							<text class="km">
								{{testing.km}}KM
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 暂无数据 -->
		<view v-else class="nodata">
			<view class="iconfont">
				&#xe605;
			</view>
			<view class="txt">
				本地暂无服务点
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				testingList: [],
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: getApp().globalData.city + '检测站' || '本地检测站'
			})
			this.getTestingList()
		},
		methods: {
			// 跳转检测站详情
			linkTesting(id) {
				uni.navigateTo({
					url: `../testing/testing?id=${id}`
				})
			},


			//获取检测站列表
			async getTestingList() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let latitude = '34.75'
				let longitude = '113.62'
				let [err, location] = await uni.getLocation({
					type: 'gcj02'
				})
				if (!err) {
					longitude = location.longitude
					latitude = location.latitude
				}

				let res = await this.ajax(this.api.TestingList, {
					latitude: latitude, //纬度
					longitude: longitude, //经度
					city: this.city || getApp().globalData.city
				}, 'POST')
				uni.hideLoading()
				if (res.data.code == 200) {
					if (res.data.data != 'null') {
						this.testingList = res.data.data
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.wrap {
		padding: 20rpx;
	}

	.servicestationlist {

		// 每个服务站
		.servicestationitem {
			@include flex(space-between);
			height: 200rpx;
			padding: 20rpx 10rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #F8F8F8;
			.left {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;
			}

			.center {
				width: 50%;
				height: 100%;
				@include flex(space-between, flex-start, column);

				&>view {
					width: 100%;
					@include hidden;
				}

				.title {
					font-size: 32rpx;

				}

				.introduce {
					font-size: 26rpx;
					color: #C0C0C0;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp:1;
					overflow: hidden;
					white-space:normal; 
				}

			}

			.right {
				flex: 1;
				height: 100%;
				@include flex(space-between, center, column);

				.appointmentnum {
					color: #C0C0C0;
					text-align: center;
				}

				.distance {
					@include flex(space-between, center, column);
					color: #007AFF;

					.iconfont {
						font-size: 48rpx;

					}
				}
			}
		}
	}


	// 无提现记录
	.nodata {
		width: 100%;
		height: 800rpx;
		@include flex(center, center, column);

		.iconfont {
			font-size: 140rpx;
		}

		.txt {
			font-size: 30rpx;
		}
	}
</style>
