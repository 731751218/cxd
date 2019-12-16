<template>
	<view>
		<view class="content">
			<view class="list" v-if="commissionlist.length">
				<view class="item" v-for="(item,index) in commissionlist" :key="index">
					<view>
						<view class="header">
							<view class="img">
								<image :src="item.showinfo.avatarurl"></image>
							</view>
							<view class="username">
								{{item.showinfo.nickname}}
							</view>
						</view>
						<view>
							{{item.valuechange}}元
						</view>
					</view>
					
					<view>
						<view class="time">{{item.time}}</view>
						<view  class="commissiontype" style="color: #007AFF;" v-if="item.type=='系统操作'||item.type=='下级返佣'">{{item.type}}</view>
						<view  class="commissiontype" style="color: #f00;" v-else>{{item.type}}</view>
					</view>
				</view>
			</view>
			
			
			<!-- 没有记录 -->
			<nodata height="1000" text="暂无佣金记录" v-else></nodata>
			
		</view>
		
	</view>
</template>

<script>
	
	import nodata from "@/components/nodata.vue";
	export default {
		components:{
			nodata
		},
		data() {
			return {
				pages:1,//页码
				commissionlist:[]//佣金明细列表
			};
		},
		onLoad() {
			this.loadCommissionList()
		},
		
		methods:{
			//加载佣金列表
			async loadCommissionList(){
				let commissionlist = await this.ajax(this.api.commissionlist,{pages:this.pages},'GET')
				if(commissionlist.data.code==200){
					if(commissionlist.data.data!='null'){
						if(this.pages==1){
							this.commissionlist = commissionlist.data.data
						}else{
							this.commissionlist =this.commissionlist.concat(commissionlist.data.data) 
						}
						
					}
				}
			}
		},
		
		// 触底事件
		onReachBottom(){
			console.log('触底')
			this.pages++
			this.loadCommissionList()
		}
	}
</script>

<style lang="scss">
.content{

	.list{
		padding: 20rpx;
		background-color: #fff;
		.item{
			@include flex(space-between,content,column);
			height: 160rpx;
			padding: 20rpx;
			border-bottom: 1rpx solid #DEDEDE;
			box-sizing: border-box;
			&>view{
				@include flex(space-between);
				font-size: 28rpx;
				.header{
					@include flex;
					.img{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 10rpx;
					}
				}
				
				
			}
			.time{
				font-size: 24rpx;
				color: #808080;
			}
			// 佣金类型
			.commissiontype{
				font-size: 26rpx;
				color: #007AFF;
			}
			
			
		}
	}


	
	
}
</style>
