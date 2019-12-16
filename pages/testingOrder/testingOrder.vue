<template>
	<view>
		<tabList :tabList="tabList" :isSelection="isSelection" @tabClick="tabClick" />
		<view class="list" v-if="testingOrderList.length">
			<view class="item" v-for="(item,index) in testingOrderList" :key="index">
				<view class="row">
					<view class="left">审车类型</view>
					<view class="right suc" v-if="item.isreplace=='预约审车'">{{item.isreplace}}</view>
					<view class="right blu" v-else>{{item.isreplace}}</view>
				</view>
				<view class="row">
					<view class="left">{{item.carnumber}}</view>
					<view class="right">{{item.price}}</view>
				</view>
				<view class="row">
					<view class="left">订单编号:{{item.number}}</view>
				</view>
				<view class="row">
					<view class="left suc" v-if="item.state=='支付成功'">{{item.state}}</view>
					<view class="left err" v-if="item.state=='订单受理'">{{item.state}}</view>
					<view class="left yel" v-if="item.state=='订单完成'">{{item.state}}</view>
					<view class="left err" v-if="item.state=='订单退回'">{{item.state}}</view>
					<view class="right btn" hover-class="btns"  @tap="onOrderDetails(item.id)">查看订单详情</view>
				</view>
			</view>
		</view>
		<nodata height="800" text="暂无提现记录" v-else></nodata>
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
				tabList: ['全部', '支付成功', '订单受理','订单完成','订单退回'],
				testingOrderList:[],
				isSelection: 0
			};
		},
		onShow() {
			this.getTestingOrderList()
		},
		
		methods: {
			//订单详情
			onOrderDetails(id){
				uni.navigateTo({
					url:`../testingOrderDetails/testingOrderDetails?id=${id}`
				})
			},
			
			tabClick(index) {
				if (index != this.isSelection) {
					this.isSelection = index
					this.getTestingOrderList()
				}
			},

			async getTestingOrderList() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				let testingOrderList = await this.ajax(this.api.testingOrderList, {
					state: this.isSelection
				})
				uni.hideLoading()
				if (testingOrderList.data.code == 200) {
					if (testingOrderList.data.data != 'null') {
						this.testingOrderList = testingOrderList.data.data
					} else {
						this.testingOrderList = []
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.list{
	font-size: 28rpx;
	.item{
		padding: 30rpx;
		margin: 10rpx 0;
		background-color: #fff;
		.row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 0;
			
			.btn{
				background-color: #0e93d8;
				color: #fff;
				width: 200rpx;
				height: 60rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.btns{
				background-color: #87CEEB;
			}
			
			.suc{
				color: green;
			}
			.blu{
				color: blue;
			}
			.yel{
				color: orange;
			}
			.err{
				color: red;
			}
		}
	}
}
</style>
