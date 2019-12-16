<template>
	<view>
		<view class="item">
			<view class="left">车检类型</view>
			<view class="right">{{testingOrderDetails.isreplace}}</view>
		</view>
		<view class="item">
			<view class="left">姓名</view>
			<view class="right">{{testingOrderDetails.name}}</view>
		</view>
		<view class="item">
			<view class="left">电话</view>
			<view class="right">{{testingOrderDetails.phone}}</view>
		</view>
		<view class="item">
			<view class="left">车牌号</view>
			<view class="right">{{testingOrderDetails.carnumber}}</view>
		</view>
		<view class="item">
			<view class="left">支付金额</view>
			<view class="right">{{testingOrderDetails.price}}</view>
		</view>
		<view class="item">
			<view class="left">订单状态</view>
			<view class="right">{{testingOrderDetails.state}}</view>
		</view>
		<view class="item" v-if="testingOrderDetails.replace_address">
			<view class="left">代驾审车地址</view>
			<view class="right">{{testingOrderDetails.replace_address}}</view>
		</view>
		<view class="item">
			<view class="left">预约时间</view>
			<view class="right">{{testingOrderDetails.appointment_time}}</view>
		</view>
		<view class="item">
			<view class="left">检测站名称</view>
			<view class="right">{{testingOrderDetails.testingname}}</view>
		</view>
		<view class="item">
			<view class="left">订单号</view>
			<view class="right">{{testingOrderDetails.number}}</view>
		</view>
		<view class="item">
			<view class="left">备注信息</view>
			<view class="right">{{testingOrderDetails.msg}}</view>
		</view>
		<view class="item">
			<view class="left">下单时间</view>
			<view class="right">{{testingOrderDetails.time}}</view>
		</view>
		<view class="item" v-if="testingOrderDetails.acceptance_time">
			<view class="left">受理时间</view>
			<view class="right">{{testingOrderDetails.acceptance_time}}</view>
		</view>
		
		<view class="delta err" hover-class="errs" @tap="complete" v-if="testingOrderDetails.state=='订单受理'">
			确认完成
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
				testingOrderDetails:{},
				settime:null,
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
				let testingOrderComplete =  await this.ajax(this.api.testingOrderComplete,{
					id:this.testingOrderDetails.id
				},'POST')
				uni.hideLoading()
				if(testingOrderComplete.data.code==200){
					uni.showToast({
						title:testingOrderComplete.data.msg,
						duration:2000,
						icon:'none'
					})
					this.settime =  setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},2000)
					return 
				}else{
					uni.showModal({
					    title: '提示',
					    content: testingOrderComplete.data.msg,
						showCancel:false
					})
				}
			}
		},
		async onLoad(options) {
			if(options.id){
				
				let testingOrderDetails =  await this.ajax(this.api.testingOrderDetails,{
					id:options.id
				},'POST')
				if(testingOrderDetails.data.code==200){
					if(testingOrderDetails.data.data!='null'){
						this.testingOrderDetails = testingOrderDetails.data.data
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
