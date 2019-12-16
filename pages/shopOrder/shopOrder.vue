<template>
	<view>
		<tabList :tabList="tabList" :isSelection="isSelection" @tabClick="tabClick" />
		<view class="orderlist" v-if="ticketOrder.length">
			<view class="order"  v-for="(item,index) in ticketOrder"
			 :key="index">
				<view class="top">
					<view>
						{{item.goods_name}}
					</view>
					<view v-if="item.state=='已支付'" class="green">
						{{item.state}}
					</view>
					<view v-if="item.state=='已领取'" class="blue">
						{{item.state}}
					</view>
					<view v-if="item.state=='已失效'"  class="red">
						{{item.state}}
					</view>
				</view>
				<view class="bottom">
					<view class="price">
						金额:{{item.price=='0.00'?'免费':item.price}}
					</view>
					<view>{{item.time}}</view>
				</view>
				
				
				<view class="receive">
					<view class="number">
						{{item.number}}
					</view>
					
					<view class="btn1" hover-class="btn11" @tap="receiveTicket(item.card_ticket_id,item.id)" v-if="item.state=='已支付'">
						立即领取
					</view>
				
					<view class="btn2"  v-if="item.state=='已领取'" @tap="noReceive('该卡券已经领取过了!')">
						已领取
					</view>
					
					<view class="btn2"  v-if="item.state=='已失效'" @tap="noReceive('该卡券已经失效!')">
						已失效
					</view>
				</view>
			</view>
		</view>
	
	
		<!-- 没有记录 -->
		<nodata height="800" text="暂无提现记录" v-else></nodata>
	</view>
</template>

<script>
	import tabList from '@/components/tabList.vue'
	import nodata from "@/components/nodata.vue";
	export default {
		components:{
			nodata,
			tabList
		},
		data() {
			return {
				tabList: ['全部', '已支付', '已领取','已失效'],
				isSelection: 0,
				ticketOrder: [] //卡券列表
			};
		},
		methods: {
			//领取卡券
			async receiveTicket(card_ticket_id,id) {
				let receiveTicket = await this.ajax(this.api.receiveTicket, {
					card_ticket_id,
				}, 'POST')
				if (receiveTicket.data.code == 200) {
					// 这里使用微信卡券
					wx.addCard({
						cardId: receiveTicket.data.card_ticket_id,
						cardExt: JSON.stringify(receiveTicket.data.signature),
						success: async res => {
							console.log(res.cardList) // 卡券添加结果 具体参数再定
							//解码code 并更新订单状态
							let ticketDecode = await this.ajax(this.api.ticketDecode, {
								encryptionCode: res.cardList.code,
								order_id: id,
							}, 'POST')
							if(ticketDecode.data.code==200){
								uni.showToast({
									title: ticketDecode.data.msg,
									duration: 2000,
									icon: 'none'
								})
							}
						}
					})
				}
			},
			tabClick(index) {
				if (index != this.isSelection) {
					this.isSelection = index
					this.getticketOrder()
				}
			},
			// 不能领取
			noReceive(text){
				uni.showToast({
					title: text,
					duration: 2000,
					icon: 'none'
				})
			},
			//获取卡券列表
			async getticketOrder(){
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				let ticketOrder = await this.ajax(this.api.ticketOrder,{
					state:this.isSelection
				})
				uni.hideLoading()
				if (ticketOrder.data.code == 200) {
					if (ticketOrder.data.data != 'null') {
						this.ticketOrder = ticketOrder.data.data
					}else{
						this.ticketOrder = []
					}
				}
			}
		},
		onShow(){
			this.getticketOrder()
		}
	}
</script>

<style lang="scss">
	.order {
		padding: 20rpx 20rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #dedede;
		&>view {
			padding: 10rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.top {
			font-size: 28rpx;
			.red{
				color: red;
			}
			.green{
				color: green;
			}
			.blue{
				color: blue;
			}
		}
		.receive{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.btn1,.btn2{
				width: 160rpx;
				height: 50rpx;
				background-color: #f00;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
			}
			.btn11{
				background-color: #EE3B3B;
			}
			.btn2{
				background-color: #999;
				color: #ccc;
			}
		}
	}
</style>
