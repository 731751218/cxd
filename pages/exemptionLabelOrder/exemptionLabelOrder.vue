<template>
	<view>
		<tabList :tabList="tabList" :isSelection="isSelection" @tabClick="tabClick" />
		<view class="list" v-if="exemptionLabelOrderList.length">
			<view class="item" v-for="(item,index) in exemptionLabelOrderList" :key="index">
				<view class="header">
					<view>
						{{item.number}}
					</view>
					<view class="state suc" v-if="item.status=='已付款'">
						{{item.status}}
					</view>
					<view class="state wan" v-if="item.status=='已发货'">
						{{item.status}}
					</view>
					<view class="state blu" v-if="item.status=='已签收'">
						{{item.status}}
					</view>
					<view class="state red" v-if="item.status=='已驳回'">
						{{item.status}}
					</view>

				</view>
				<view class="body">
					<view class="carnumber">
						车牌号: {{item.carnumber}}
					</view>
					<view class="price">
						¥{{item.price}}
					</view>
				</view>
				<view class="footer">
					<view class="time">
						{{item.time}}
					</view>
					<!-- 查看物流 -->
					<view class="details" hover-class="detailshover" @tap="details(item.id)">
						查看详情
					</view>
				</view>


			</view>
		</view>
		<nodata :height="1000" text="暂无免检标订单" v-else></nodata>
	</view>
</template>

<script>
	import tabList from '@/components/tabList.vue'
	import nodata from "@/components/nodata.vue";
	export default {
		components: {
			nodata,
			tabList
		},
		data() {
			return {
				tabList: ['全部', '已付款', '已发货', '已签收', '已驳回'],
				isSelection: 0,
				exemptionLabelOrderList: []
			};
		},
		methods: {
			details(id) {
				uni.navigateTo({
					url: `../exemptionLabelOrderDetails/exemptionLabelOrderDetails?id=${id}`
				})
			},

			async getexemptionLabelOrderList() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let exemptionLabelOrderList = await this.ajax(this.api.exemptionLabelOrderList, {
					status: this.isSelection
				})
				uni.hideLoading()
				if (exemptionLabelOrderList.data.code == 200) {
					if (exemptionLabelOrderList.data.data != 'null') {
						this.exemptionLabelOrderList = exemptionLabelOrderList.data.data
					} else {
						this.exemptionLabelOrderList = []
					}
				}
			},
			tabClick(index) {
				if (index != this.isSelection) {
					this.isSelection = index
					this.getexemptionLabelOrderList()
				}
			},
		},
		onShow() {
			this.getexemptionLabelOrderList()
		}
	}
</script>
<style lang="scss">
	.list {
		padding: 30rpx;
		background-color: #fff;

		.item {
			padding: 10rpx 0;
			border-bottom: 1rpx solid #dedede;
			font-size: 30rpx;

			&>view {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0;
			}

			.header {
				.state {
					color: #f00;
				}

				.suc {
					color: green;
				}

				.wan {
					color: orange;
				}

				.blu {
					color: blue;
				}
			}

			.footer {
				font-size: 26rpx;

				.time {
					color: #999;
				}

				.details {
					width: 168rpx;
					height: 60rpx;
					border-radius: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #0e93d8;
					color: #fff;
				}

				.detailshover {
					background-color: #7EC0EE;
				}
			}

			.reason {
				display: block;
				font-size: 26rpx;
			}
		}
	}
</style>
