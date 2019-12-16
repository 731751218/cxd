<template>
	<view>
		<view class="item">
			<view class="left">姓名</view>
			<view class="right">{{legalAdviserOrderDetails.name}}</view>
		</view>
		<view class="item">
			<view class="left">电话</view>
			<view class="right">{{legalAdviserOrderDetails.phone}}</view>
		</view>
		<view class="item">
			<view class="left">订单状态</view>
			<view class="right">{{legalAdviserOrderDetails.status}}</view>
		</view>
		<view class="item">
			<view class="left">订单号</view>
			<view class="right">{{legalAdviserOrderDetails.orderid}}</view>
		</view>
		<view class="item">
			<view class="left">下单时间</view>
			<view class="right">{{legalAdviserOrderDetails.time}}</view>
		</view>
		<view class="item">
			<view class="left">备注留言</view>
			<view class="right">{{legalAdviserOrderDetails.msg}}</view>
		</view>
		<view class="item">
			<view class="left">事故认定书</view>
			<view class="right">
				<view @tap="loogImg">
					<image :src="legalAdviserOrderDetails.accident_identification"></image>
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
				legalAdviserOrderDetails: {}
			};
		},
		methods: {
			//返回上一页
			delta(){
				uni.navigateBack({
					delta:1
				})
			},
			loogImg() {
				let url = this.legalAdviserOrderDetails.accident_identification
				uni.previewImage({
					urls: [url],
				});
				
			}
		},
		async onLoad(options) {
			console.log(options.id)
			let legalAdviserOrderDetails = await this.ajax(this.api.legalAdviserOrderDetails, {
				id: options.id
			}, 'POST')
			if (legalAdviserOrderDetails.data.code == 200) {
				this.legalAdviserOrderDetails = legalAdviserOrderDetails.data.data
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
