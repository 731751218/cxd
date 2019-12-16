<template>
	<view>
		<view class="item">
			<view class="left">姓名</view>
			<view class="right">{{exemptionLabelOrderDetails.name}}</view>
		</view>
		<view class="item">
			<view class="left">电话</view>
			<view class="right">{{exemptionLabelOrderDetails.phone}}</view>
		</view>
		<view class="item">
			<view class="left">车牌号</view>
			<view class="right">{{exemptionLabelOrderDetails.carnumber}}</view>
		</view>
		<view class="item">
			<view class="left">支付金额</view>
			<view class="right">{{exemptionLabelOrderDetails.price}}</view>
		</view>
		<view class="item">
			<view class="left">订单状态</view>
			<view class="right">{{exemptionLabelOrderDetails.status}}</view>
		</view>
		<view class="item" v-if="exemptionLabelOrderDetails.address">
			<view class="left">收货地址</view>
			<view class="right">{{exemptionLabelOrderDetails.address}}</view>
		</view>
		
		<view class="item">
			<view class="left">订单号</view>
			<view class="right">{{exemptionLabelOrderDetails.number}}</view>
		</view>
		<view class="item" v-if="exemptionLabelOrderDetails.msg">
			<view class="left">备注信息</view>
			<view class="right">{{exemptionLabelOrderDetails.msg}}</view>
		</view>
		<view class="item">
			<view class="left">下单时间</view>
			<view class="right">{{exemptionLabelOrderDetails.time}}</view>
		</view>
		<view class="item" v-if="exemptionLabelOrderDetails.express">
			<view class="left">快递公司</view>
			<view class="right">{{exemptionLabelOrderDetails.express}}</view>
		</view>
		<view class="item" v-if="exemptionLabelOrderDetails.courier_number">
			<view class="left">快递单号</view>
			<view class="right">{{exemptionLabelOrderDetails.courier_number}}</view>
		</view>
		<view class="item" v-if="exemptionLabelOrderDetails.deliver_time">
			<view class="left">发货时间</view>
			<view class="right">{{exemptionLabelOrderDetails.deliver_time}}</view>
		</view>
		
		<view class="item" v-if="exemptionLabelOrderDetails.refusetime">
			<view class="left">驳回时间</view>
			<view class="right">{{exemptionLabelOrderDetails.refusetime}}</view>
		</view>
		
		<view class="item" v-if="exemptionLabelOrderDetails.refuse">
			<view class="left">驳回原因</view>
			<view class="right">{{exemptionLabelOrderDetails.refuse}}</view>
		</view>
		
		<view class="delta err" hover-class="errs"  @tap="complete" v-if="exemptionLabelOrderDetails.status=='已发货'">
			确认签收
		</view>
		
		<view class="delta" hover-class="deltas" @tap="delta">
			返回上一页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exemptionLabelOrderDetails:{},
				settime:null
			};
		},
		methods:{
			delta(){
				uni.navigateBack({
					delta:1
				})
			},
			async complete(){
				uni.showLoading({
					title:'请求中...',
					mask:true
				})
				let exemptionLabelOrderComplete =  await this.ajax(this.api.exemptionLabelOrderComplete,{
					id:this.exemptionLabelOrderDetails.id
				},'POST')
				uni.hideLoading()
				if(exemptionLabelOrderComplete.data.code==200){
					uni.showToast({
						title:exemptionLabelOrderComplete.data.msg,
						duration:2000,
						icon:'none'
					})
					this.settime = setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},2000)
					return 
				}else{
					uni.showModal({
					    title: '提示',
					    content: exemptionLabelOrderComplete.data.msg,
						showCancel:false
					})
				}
			}
		},
		async onLoad(options) {
			if(options.id){
				let exemptionLabelOrderDetails =  await this.ajax(this.api.exemptionLabelOrderDetails,{
					id:options.id
				},'POST')
				if(exemptionLabelOrderDetails.data.code==200){
					if(exemptionLabelOrderDetails.data.data!='null'){
						this.exemptionLabelOrderDetails = exemptionLabelOrderDetails.data.data
					}
				}
			}
		},
		onUnload() {
			clearTimeout(this.settime)
		}
	}
</script>

<style lang="scss">
.item{
	padding: 20rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	border-bottom: 1rpx solid #dedede;
	.left{
		width: 30%;
	}
	.right{
		flex: 1;
		text-align: right;
	}
}

.delta{
	width: 60%;
	margin: 40rpx auto;
	height: 70rpx;
	border-radius: 10rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	background-color: #0e93d8;
	font-size: 32rpx;
}
.deltas{
	background-color: #7EC0EE;
}
.err{
	background-color: red;
}
.errs{
	background-color: #FF6347;
}
</style>
