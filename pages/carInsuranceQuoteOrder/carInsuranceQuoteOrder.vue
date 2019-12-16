<template>
	<view>
		<tabList :tabList="tabList" :isSelection="isSelection" @tabClick="tabClick" />
		<view v-if="carInsuranceOrderList.length">
			
			<view class="orderitem" v-for="(item,index) in carInsuranceOrderList" :key="index" @tap="onDetails(item.id)">
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
					<view :class="[item.state=='已处理'?'suc':'err']">
						{{item.state}}
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
			tabList,
			nodata
		},
		data() {
			return {
				tabList: ['全部', '未处理', '已处理'],
				isSelection: 0,
				carInsuranceOrderList: []
			};
		},
		onLoad() {
			this.getcarInsuranceOrderList()
		},
		methods: {
			onDetails(id){
				uni.navigateTo({
					url:`../carInsuranceQuoteOrderDetails/carInsuranceQuoteOrderDetails?id=${id}`
				})
			},
			
			tabClick(index) {
				if (index != this.isSelection) {
					this.isSelection = index
					this.getcarInsuranceOrderList()
				}
			},
			//获取车险报价订单列表
			async getcarInsuranceOrderList() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				let carInsuranceOrderList = await this.ajax(this.api.carInsuranceOrderList, {
					state: this.isSelection
				})
				uni.hideLoading()
				if (carInsuranceOrderList.data.code == 200) {
					if (carInsuranceOrderList.data.data != 'null') {
						this.carInsuranceOrderList = carInsuranceOrderList.data.data
					} else {
						this.carInsuranceOrderList = []
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
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
			.suc{
				color: green;
			}
			.err{
				color: red;
			}
		}
	}
</style>
