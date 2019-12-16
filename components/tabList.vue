<template>
	<view class="tabList">
		<view class="tab" @tap="tabSelection(index)" v-for="(tab,index) in tabList" :key="index" :class="{'isSelection':isSelection==index}">
			{{tab}}
		</view>
	</view>
</template>

<script>
	export default {
		props:['tabList','isSelection'],
		methods:{
			tabSelection(index){
				this.$emit('tabClick',index)
			}
		}
	}
</script>

<style lang="scss">
.tabList{
	display: flex;
	justify-content: space-between;
	height: 80rpx;
	background-color: #fff;
	.tab{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		border-bottom: 1rpx solid #dedede ;
	}
	
	.isSelection{
		font-weight: bold;
		color: #007AFF;
		border-bottom: 2rpx solid #007AFF ;
	}
}
</style>
