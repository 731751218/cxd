<template>
	<view>
		<tabList :tabList="tabList" :isSelection="isSelection" @tabClick="tabClick" />
		<view v-if="legalAdviserOrderList.length">

			<view class="orderitem" v-for="(item,index) in legalAdviserOrderList" :key="index" @tap="details(item.id)">
				<view class="top">
					<view>
						{{item.name}}
					</view>
					<view>
						15617661546
					</view>
				</view>
				<view class="body">
					<view>
						订单编号
					</view>
					<view>
						{{item.orderid}}
					</view>
				</view>
				<view class="bottom">
					<view>
						处理进度
					</view>
					<view :class="[item.status=='已处理'?'suc':'err']">
						{{item.status}}
					</view>
				</view>
			</view>
		</view>
		<!-- 没有记录 -->
		<nodata height="800" text="暂无订单记录" v-else></nodata>
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
				tabList: ['全部', '未处理', '已处理'],
				isSelection: 0,
				legalAdviserOrderList: []
			};
		},
		onLoad() {
			this.getlegalAdviserOrderList()
		},
		methods: {
			details(id) {
				uni.navigateTo({
					url: `../legalAdviserOrderDetails/legalAdviserOrderDetails?id=${id}`
				})
			},

			tabClick(index) {
				if (index != this.isSelection) {
					this.isSelection = index
					this.getlegalAdviserOrderList()
				}
			},
			//获取车险报价订单列表
			async getlegalAdviserOrderList() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let legalAdviserOrderList = await this.ajax(this.api.legalAdviserOrderList, {
					status: this.isSelection
				})
				uni.hideLoading()
				if (legalAdviserOrderList.data.code == 200) {
					if (legalAdviserOrderList.data.data != 'null') {
						this.legalAdviserOrderList = legalAdviserOrderList.data.data
					} else {
						this.legalAdviserOrderList = []
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderitem {
		padding: 30rpx;
		border-bottom: 1rpx solid #dedede;
		font-size: 28rpx;
		background-color: #fff;

		.top,
		.body,
		.bottom {
			display: flex;
			justify-content: space-between;
			margin: 10rpx 0;
		}

		.bottom {
			.suc {
				color: green;
			}

			.err {
				color: red;
			}
		}
	}
</style>
