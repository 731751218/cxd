<template>
	<view style="height: 100%;">
		<luPopupWrapper ref="luPopupWrapper" type="top" transition="slider" backgroundColor="#fff" :active="active" height="30%"
		 width="100%" maskShow maskClick>
			<view class="wrap" style="width: 100%;height: 100%;">
				<!-- 弹出层 -->
				<view class="popuwrap">
					<view class="title">
						服务行业
					</view>
					<view class="content">
						<view class="item" @tap="onSelect(item.id)" :class="[item.select ? 'hover' : '']" v-for="(item,index) in populist"
						 :key="index">

							{{item.severtype}}
						</view>

					</view>
				</view>
			</view>
		</luPopupWrapper>



		<!-- 搜索栏 -->
		<view class="search">

			<view class="screen" @tap="screenShow">
				<text class="iconfont">&#xe714;</text>
				<text>筛选</text>
			</view>

			<!-- 搜索框 -->
			<view class="searchinput">
				<view class="searchicon iconfont">
					&#xe618;
				</view>
				<input type="text" v-model="searchValue" confirm-type="search" placeholder="请输入搜索的内容" @confirm="onSearch" @input="change"
				 @focus="change" @blur="blur" />

				<view class="clos iconfont" v-show="isClos" @tap="closValue">
					&#xe625;
				</view>

			</view>




		</view>

		<view style="height: 100rpx;"></view>

		<!-- 商家列表 -->
		<view class="shoplist" v-if="shopList.length">

			<view class="shop" v-for="(shop,index) in shopList" :key="index">
				<view class="left">
					<image :src="shop.img" mode="aspectFill"></image>
				</view>

				<!-- 内容 -->
				<view class="content">
					<view class="shopname">
						{{shop.shopname}}
					</view>

					<!-- 服务介绍 -->
					<view class="service">

						{{shop.shopsevice_type}}

					</view>

					<view class="shopaddress" @tap="onMap(shop.latitude,shop.longitude,shop.shopname)">
						{{shop.address}}
					</view>
				</view>

				<!-- 电话信息 -->
				<view class="right" @tap="phone(shop.phone)">
					<view class="iconfont">
						&#xe619;
					</view>
				</view>

			</view>

		</view>

		<nodata height="800" text="暂无商家" v-else></nodata>

	</view>
</template>

<script>
	import luPopupWrapper from "@/components/lu-popup-wrapper/lu-popup-wrapper.vue";
	import nodata from "@/components/nodata.vue";

	export default {
		components: {
			luPopupWrapper,
			nodata
		},

		data() {
			return {
				populist: [], //筛选标签


				shopList: [], //商家列表

				isClos: false, //输入框的删除按钮

				active: false,

				city: '', //城市信息
				searchValue: '', //搜索的内容

			};
		},
		onLoad() {

		},
		async onShow() {
			uni.showLoading({
				title: '请求中...',
				mask: true
			})

			//请求所有商家信息
			this.getshopList()

			// 获取商家分类
			let shoptype = await this.ajax(this.api.shoptype, {
				city: getApp().globalData.city || '周口',
			}, 'GET')
			if(shoptype.data.code==200){
				if(shoptype.data.data!='null'){
					shoptype.data.data.unshift({
						id: 0,
						severtype: '全部服务',
						select: true
					})
					this.populist = shoptype.data.data
				}
			}
			
			

		},
		methods: {
			
			// 打开地图
			onMap(latitude, longitude,shopname) {
				uni.openLocation({
					latitude:Number(latitude),
					longitude:Number(longitude),
					name:shopname
				});
			},

			// 获取商家列表
			async getshopList(shoptype = 0) {
				let shopList = await this.ajax(this.api.shopList, {
					shoptype,
					city: getApp().globalData.city || '周口',
				}, 'GET')
				uni.hideLoading()
				if (shopList.data.code == 200) {
					if (shopList.data.data != 'null') {
						this.shopList = shopList.data.data
					} else {
						this.shopList = []
					}
				}
			},


			// 筛选选中
			onSelect(id) {
				//控制选中状态的改变
				this.populist.forEach(item => item.id === id ? item.select = true : item.select = false)

				this.$refs.luPopupWrapper.close()
				uni.showLoading({
					title: '搜索中...'
				})
				this.getshopList(id)

			},


			// 清除输入的内容
			closValue() {
				this.searchValue = ''
			},
			// 打电话
			phone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				})
			},
			// 搜索事件
			async onSearch() {
				
				let searchValue = this.searchValue.trim()
				uni.showLoading({
					title:'搜索中...',
				})
				
				if(searchValue.length){
					let searchShop =  await this.ajax(this.api.searchShop,{
						value:searchValue
					},'GET')
					if(searchShop.data.code==200){
						if(searchShop.data.data!='null'){
							this.shopList = searchShop.data.data
						}else{
							this.shopList = []
						}
					}
					
				}else{
					this.getshopList()
				}
				uni.hideLoading()
			},


			// 输入框聚焦时
			 change() {
				if (this.searchValue.length) {
					this.isClos = true
				}
			},
			// 失去焦点
			blur() {
				this.isClos = false
			},

			// 筛选显示
			screenShow() {
				console.log('筛选显示')
				this.$refs.luPopupWrapper.show();
			},
		}
	}
</script>

<style lang="scss">
	// 弹出层
	.popuwrap {
		padding: 20rpx;

		.title {
			font-size: 32rpx;
			margin-bottom: 20rpx;
			text-align: center;
		}

		.content {
			@include flex(flex-start);
			flex-wrap: wrap;

			.item {
				border: 1rpx solid #ABABAB;
				color: #ABABAB;
				border-radius: 30rpx;
				width: 160rpx;
				height: 60rpx;
				margin: 0 10rpx 30rpx 10rpx;
				@include flex;
				box-sizing: border-box;

			}

			.hover {
				background-color: #007AFF;
				color: #fff;
				border: 1rpx solid #007AFF;
			}

		}

	}


	.search {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100rpx;
		padding: 10rpx;
		@include flex(space-between);
		box-sizing: border-box;
		background-color: #fff;
		border-bottom: 2rpx solid #EEE;

		.screen {
			flex: 2;
			@include flex;
			font-size: 28rpx;

			.iconfont {
				font-size: 34rpx;
			}
		}

		// 搜索框
		.searchinput {
			flex: 9;
			background-color: #F7F8FA;
			padding: 8rpx;
			@include flex(flex-start);
			border-radius: 30rpx;
			box-sizing: border-box;

			.searchicon {
				margin: 0 10rpx;
			}

			&>input {
				flex: 1;
			}

			.clos {
				padding-left: 20rpx;
				padding-right: 20rpx;

				font-size: 38rpx;
				color: #C0C0C0;
			}

		}


	}

	// 商家列表
	.shoplist {
		background-color: #fff;
		padding: 10rpx 20rpx;

		.shop {
			height: 210rpx;
			padding: 20rpx 10rpx;
			border-bottom: 2rpx solid #EEE;
			@include flex(space-between);
			margin-bottom: 20rpx;


			.left {
				width: 180rpx;
				height: 100%;
				margin-right: 20rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}

			.content {
				@include flex(space-between, flex-start, column);
				height: 100%;
				width: 60%;

				border-right: 2rpx solid #EEE;

				.service {
					padding: 4rpx 8rpx;
					border: 2rpx solid #007AFF;
					color: #007AFF;
					font-size: 20rpx;
					border-radius: 4rpx;
					box-sizing: border-box;
				}

				.shopname {
					width: 100%;
					font-size: 32rpx;
					@include hidden;
				}

				.shopaddress {
					width: 100%;
					color: #C8C7CC;
					font-size: 26rpx;
					@include hidden;
				}
			}

			.right {
				height: 100%;
				flex: 2;
				font-size: 40rpx;
				@include flex;

				.iconfont {
					font-size: 60rpx;
					color: #007AFF;
				}
			}
		}
	}


	
</style>
