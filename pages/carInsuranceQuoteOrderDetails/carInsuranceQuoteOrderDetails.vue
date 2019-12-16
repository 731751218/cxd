<template>
	<view>
		<view class="item">
			<view class="left">姓名</view>
			<view class="right">{{carInsuranceQuoteOrderDetails.name}}</view>
		</view>
		<view class="item">
			<view class="left">电话</view>
			<view class="right">{{carInsuranceQuoteOrderDetails.phone}}</view>
		</view>
		<view class="item">
			<view class="left">订单状态</view>
			<view class="right">{{carInsuranceQuoteOrderDetails.state}}</view>
		</view>
		<view class="item">
			<view class="left">订单号</view>
			<view class="right">{{carInsuranceQuoteOrderDetails.orderid}}</view>
		</view>
		<view class="item">
			<view class="left">下单时间</view>
			<view class="right">{{carInsuranceQuoteOrderDetails.time}}</view>
		</view>
		<view class="item">
			<view class="left">身份证正面</view>
			<view class="right">
				<view @tap="loogImg(1)">
					<image :src="carInsuranceQuoteOrderDetails.idnumber"></image>
				</view>
			</view>
		</view>

		<view class="item">
			<view class="left">身份证副面</view>
			<view class="right">
				<view @tap="loogImg(2)">
					<image :src="carInsuranceQuoteOrderDetails.idnumberplane"></image>
				</view>
			</view>
		</view>

		<view class="item">
			<view class="left">行车证正面</view>
			<view class="right">
				<view @tap="loogImg(3)">
					<image :src="carInsuranceQuoteOrderDetails.vehiclelicencedisc"></image>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="left">行车证副面</view>
			<view class="right">
				<view @tap="loogImg(4)">
					<image :src="carInsuranceQuoteOrderDetails.vehiclelicencediscplane"></image>
				</view>
			</view>
		</view>
		
		
		
		<view class="btn" hover-class="btns" @tap="delta">返回上一页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carInsuranceQuoteOrderDetails: {}
			};
		},
		methods: {
			//返回上一页
			delta(){
				uni.navigateBack({
					delta:1
				})
			},
			loogImg(i) {
				
				let url = '';
				switch (i) {
					case 1:
						url = this.carInsuranceQuoteOrderDetails.idnumber
						break;
					case 2:
						url = this.carInsuranceQuoteOrderDetails.idnumberplane
						break;
					case 3:
						url = this.carInsuranceQuoteOrderDetails.vehiclelicencedisc
						break;
					case 4:
						url = this.carInsuranceQuoteOrderDetails.vehiclelicencediscplane
						break;
				}
				uni.previewImage({
					urls: [url],
				});
				
			}
		},
		async onLoad(options) {
			console.log(options.id)
			let carInsuranceQuoteOrderDetails = await this.ajax(this.api.carInsuranceQuoteOrderDetails, {
				id: options.id
			}, 'POST')
			if (carInsuranceQuoteOrderDetails.data.code == 200) {
				this.carInsuranceQuoteOrderDetails = carInsuranceQuoteOrderDetails.data.data
			}
		}
	}
</script>

<style lang="scss">
	.item {
		font-size: 28rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #dedede;
		background-color: #fff;

		.left {
			width: 30%;
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;

			&>view {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
	
	.btn{
		height: 70rpx;
		width: 60%;
		margin: 40rpx auto;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #0e93d8;
		color: #fff;
	}
	.btns{
		background-color: #7EC0EE;
	}
</style>
