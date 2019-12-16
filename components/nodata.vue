<template>
	<view class="nodata" :style="{height:height+'rpx'}">
		<view class="iconfont">
			&#xe605;
		</view>
		<view class="text">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			text: {
				type: String, //属性类型
				
				default:'暂无数据'
			},
			height: {
				type: Number, //属性类型
				default:200
			}
		}
	}
</script>

<style lang="scss">
	.nodata {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.iconfont {
			font-size: 140rpx;
		}

		.text {
			font-size: 32rpx;
		}
	}
</style>
