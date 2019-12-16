<template>
	<view>
		<view class="title">
			<view>用户</view>
			<view>金额</view>
			<view>时间</view>
			<view>状态</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="center" v-if="subordinateOrder.length">
			<view class="item" v-for="(item,index) in subordinateOrder" :key="index">
				<view>{{item.nickname}}</view>
				<view>{{item.price}}</view>
				<view>{{item.time}}</view>
				<view class="suc" v-if="item.state=='支付成功'">{{item.state}}</view>
				<view class="err" v-if="item.state=='订单受理'">{{item.state}}</view>
				<view class="yel" v-if="item.state=='订单完成'">{{item.state}}</view>
				<view class="err" v-if="item.state=='订单退回'">{{item.state}}</view>
			</view>
		</view>
		<!-- 没有记录 -->
		<nodata :height="800" text="暂无记录" v-else></nodata>
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
				subordinateOrder: []
			};
		},
		async onLoad() {
			let subordinateOrder = await this.ajax(this.api.subordinateOrder)
			if (subordinateOrder.data.code == 200) {
				if (subordinateOrder.data.data != 'null') {
					this.subordinateOrder = subordinateOrder.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.title {
		display: flex;
		align-items: center;
		height: 100rpx;
		background-color: #0e93d8;
		position: fixed;
		top: 0;
		width: 100%;
		color: #fff;
		font-size: 28rpx;

		&>view {
			width: 25%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.center {
		font-size: 28rpx;

		.item {
			display: flex;
			align-items: center;
			height: 100rpx;
			border-bottom: 1rpx solid #dedede;

			&>view {
				width: 25%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.suc {
				color: #1AAD19;
			}

			.err {
				color: #FD2E32;
			}

			.yel {
				color: orange;
			}
		}
	}
</style>
