<template>
	<view class="page">
		<view class="wrap">
			<view class="bg">
				<view class="t">
					<view class="borderstyle">
					</view>
					<view class="title">
						填写资料
					</view>
				</view>

				<view class="item">
					<view class="left">
						姓名:
					</view>
					<view class="right">
						<input type="text"  v-model="name" placeholder="请输入姓名" />
					</view>
				</view>

				<view class="item">
					<view class="left">
						联系方式:
					</view>
					<view class="right">
						<input type="number" v-model="phone" placeholder="请输入联系方式" />
						<view class="getphone" hover-class="getphones" v-if="!phone.length">
							<button class="absolute" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
							</button>
							获取本机手机号</view>
					</view>
				</view>

				<view class="item">
					<view class="left">
						问题描述:
					</view>
					<view class="right">
						<input type="text" v-model="msg" placeholder="问题描述" />
					</view>
				</view>
			</view>


			<view class="bg">
				<view class="t">
					<view class="borderstyle">
					</view>
					<view class="title">
						上传事故认定书
					</view>
				</view>
				<view class="images">
					<view class="imgitem">
						<view class="img">
							<view class="close iconfont" v-if="accidentimg" @tap="deleteimg">
								&#xe612;
							</view>
							<image :src="accidentimg" v-if="accidentimg" @tap="lookImg"></image>
							<view v-else @tap="uploadFileAccident">
								<view class="iconfont">
									&#xe611;
								</view>
								<view>
									上传事故认定书
								</view>
							</view>
						</view>
						<view class="text" hover-class="texts" @tap="previewPictures">
							查看示例
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 提交按钮 -->
		<view class="button">
			<view class="btn" hover-class="btns" @tap="sub">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				phone: '',
				msg: '',
				accidentimg: '', //预览图片
				accident_identification: '', //要上传的事故认证书
			};
		},
		methods: {
			
			//获取手机号信息
			async getPhoneNumber(e) {
				let [err, code] = await uni.login({
					provider: 'weixin'
				})
			
				if (e.detail.encryptedData && e.detail.iv) {
					let res = await this.ajax(this.api.getPhone, {
						code: code.code,
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData
					}, 'POST')
					console.log(res)
					if (res.data.code == 200) {
						if (res.data.data != 'null') {
							console.log('获取手机号成功!')
							console.log(res.data.data)
							this.phone=res.data.data
						} else {
							uni.showToast({
								title: '获取手机号失败,请重试',
								duration: 2000,
								icon: 'none'
							})
						}
					}
			
				}
			},
			
			// 删除
			deleteimg() {
				this.accidentimg = ''
				this.accident_identification = ''
			},
			// 预览图片
			lookImg() {
				let arr = [this.accidentimg]
				uni.previewImage({
					urls: arr,
				})
			},
			// 上传事故认定书
			async uploadFileAccident() {
				let [error, chooseImage] = await uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机
				})
				if (!error) {
					this.accidentimg = chooseImage.tempFilePaths[0]
					// 上传图片
					let [err, uploadres] = await uni.uploadFile({
						url: this.api.uplode_img,
						filePath: chooseImage.tempFilePaths[0],
						name: 'img',
					})
					if (!err) {
						//转化为json
						let data = JSON.parse(uploadres.data)
						//要上传的事故认证书
						this.accident_identification = data.url
					} else {
						uni.showToast({
							title: '上传失败',
							duration: 2000,
							icon: 'none'
						})
					}

				}
			},
			// 查看示例
			previewPictures() {
				let url = getApp().globalData.example.accident_identification
				uni.previewImage({
					urls: [
						url
					]
				})
			},
			//表单数据提交
			async sub() {
				let {
					name,
					phone,
					msg,
					accident_identification
				} = this
				name = name.trim()
				if (!name.length) return uni.showToast({
					title: '请输入姓名',
					duration: 2000,
					icon:'none'
				})
				if (!(/^1[3456789]\d{9}$/.test(phone))) return uni.showToast({
					title: '请输入正确的手机号',
					duration: 2000,
					icon:'none'
				})
				if (!accident_identification.length) return uni.showToast({
					title: '请上传事故认定书',
					duration: 2000,
					icon:'none'
				})
				
				let res =  await this.ajax(this.api.legalOrder,{
					name,
					phone,
					msg,
					accident_identification
				},'POST')
				if(res.data.code){
					uni.showModal({
					    title: '提示',
					    content: res.data.msg,
						showCancel:false
					})
				} 
				
				
			}


		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;

	}

	.wrap {

		.bg {
			margin: 20rpx 0;
			background-color: #fff;
		}

		.t {
			padding: 20rpx;
			display: flex;
			align-items: center;
		}

		.item {
			background-color: #FFF;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			@include flex(flex-start);
			font-size: 28rpx;

			.left {
				width: 30%;
				text-align: center;
			}

			.right {
				flex: 1;
				display: flex;
				align-items: center;
				input{
					flex: 1;
				}
				.getphone{
					position: relative;
					padding: 10rpx;
					background: #007AFF;
					border-radius: 10rpx;
					color: #fff;
				}
				.getphones{
					background-color: #00BFFF;
				}
			}
		}

	}


	.images {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 40rpx 0;

		.imgitem {
			width: 30%;
			height: 100%;
			border: 1px solid #dedede;
			border-radius: 10rpx;
			overflow: hidden;
			.img {
				width: 100%;
				height: 160rpx;
				background-color: #fff;
				position: relative;

				.close {
					position: absolute;
					top: 0;
					right: 0;
					width: 40rpx;
					height: 40rpx;
					background-color: #f00;
					color: #fff;
				}

				&>view {
					color: #999;
					height: 100%;
					padding: 20rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					.iconfont {
						font-size: 60rpx;
					}
				}


			}

			.text {
				height: 56rpx;
				background-color: #007AFF;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.texts{
				background-color: rgba(0,122,255,.7);
			}
			
		}
	}


	.button {
		height: 70rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			border-radius: 10rpx;
			font-size: 30rpx;
			background-color: #007AFF;
		}
		.btns{
			background-color: rgba(0,122,255,.7);
		}
	}
</style>
