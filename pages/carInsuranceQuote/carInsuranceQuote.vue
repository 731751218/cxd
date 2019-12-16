<template>
	<view>
		<!-- 车辆信息 -->
		<view class="wrap">
			<view class="titlewrap">
				<view class="borderstyle">
				</view>
				<view class="title">
					上传身份证
				</view>
			</view>
			<view class="image">
				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="idnumber" @tap="deleteimg(1)">
							&#xe612;
						</view>

						<image :src="idnumberimg" v-if="idnumber" @tap="lookImg(1)"></image>
						<view v-else @tap="uploadfile(1)">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传身份证正面
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(1)">
						查看示例
					</view>
				</view>
				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="idnumberplane" @tap="deleteimg(2)">
							&#xe612;
						</view>

						<image :src="idnumberplaneimg" v-if="idnumberplane" @tap="lookImg(2)"></image>
						<view v-else @tap="uploadfile(2)">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传身份证副面
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(2)">
						查看示例
					</view>
				</view>

			</view>


			<view class="titlewrap">
				<view class="borderstyle">
				</view>
				<view class="title">
					上传行车证
				</view>
			</view>
			<view class="image">
				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="vehiclelicencedisc" @tap="deleteimg(3)">
							&#xe612;
						</view>

						<image :src="vehiclelicencediscimg" v-if="vehiclelicencedisc" @tap="lookImg(3)"></image>
						<view v-else @tap="uploadfile(3)">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传行车证正面
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(3)">
						查看示例
					</view>
				</view>
				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="vehiclelicencediscplane" @tap="deleteimg(4)">
							&#xe612;
						</view>

						<image :src="vehiclelicencediscplaneimg" v-if="vehiclelicencediscplane" @tap="lookImg(4)"></image>
						<view v-else @tap="uploadfile(4)">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传行车证副面
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(4)">
						查看示例
					</view>
				</view>

			</view>

			<!-- 收货地址 -->
			<view class="wrap itemlist">
				<view class="titlewrap">
					<view class="borderstyle">
					</view>
					<view class="title">
						个人信息
					</view>
				</view>
				<view class="item">
					<view class="left">
						联系人:
					</view>
					<view class="right">
						<input type="text" v-model="name" placeholder="请输入联系人姓名" />
					</view>
				</view>

				<view class="item">
					<view class="left">
						联系电话:
					</view>
					<view class="right">
						<input type="number" v-model="phone" placeholder="请输入联系人电话" />
						<view class="getphone" hover-class="getphones" v-if="!phone.length">
							<button class="absolute" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
							</button>
							获取本机手机号</view>
					</view>
				</view>

				<view class="item">
					<view class="left">
						备注留言:
					</view>
					<view class="right">
						<input type="text" v-model="msg" placeholder="备注留言(选填)" />
					</view>
				</view>
			</view>

			<view style="height: 160rpx;"></view>
			<!-- 底部按钮 -->
			<view class="buttom">
				<view class="btn" hover-class="btns" @tap="submit">
					提交
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				settime: null,
				msg: '', //留言
				name: '', //姓名
				phone: '', //电话
				idnumber: '', //要上传的身份证正面
				idnumberimg: '', //身份证预览图
				idnumberplane: '', //身份证副面
				idnumberplaneimg: '', //身份证副面预览图
				vehiclelicencedisc: '', //要上传的行车证正面
				vehiclelicencediscimg: '', //行车证正面预览图
				vehiclelicencediscplane: '', //要上传的行车证副面
				vehiclelicencediscplaneimg: '', //要上传的行车证副面预览图
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
			
			
			//提交
			async submit() {
				let {
					name,
					phone,
					msg,
					idnumber,
					idnumberplane,
					vehiclelicencedisc,
					vehiclelicencediscplane
				} = this
				name = name.trim()
				if (!name.length) {
					uni.showToast({
						title: '请输入联系人',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (phone.length != 11) {
					uni.showToast({
						title: '请输入正确的联系电话',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!idnumber.length) {
					uni.showToast({
						title: '请输入上传身份证正面',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!idnumberplane.length) {
					uni.showToast({
						title: '请输入上传身份证副面',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!vehiclelicencedisc.length) {
					uni.showToast({
						title: '请输入上传行车证正面',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!vehiclelicencediscplane.length) {
					uni.showToast({
						title: '请输入上传行车证副面',
						duration: 2000,
						icon: 'none'
					})
					return false
				}
				//验证通过
				uni.showLoading({
					mask: true,
					title: '提交中...'
				})
				let carInsurance = await this.ajax(this.api.carInsurance, {
					msg,
					name,
					phone,
					idnumber,
					idnumberplane,
					vehiclelicencedisc,
					vehiclelicencediscplane
				}, 'POST')
				uni.hideLoading()
				if (carInsurance.data.code) {
					uni.showToast({
						title: carInsurance.data.msg,
						duration: 2000,
						icon: 'none',
						mask: true
					})
					if (carInsurance.data.code == 200) {
						this.settime = setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					}
				}

			},


			// 预览示例
			previewPictures(i) {
				console.log(i)
				let img = ''
				switch (i) {
					case 1:
						img = getApp().globalData.example.idnumber
						break
					case 2:
						img = getApp().globalData.example.idnumberplane
						break
					case 3:
						img = getApp().globalData.example.driving_license_just
						break
					case 4:
						img = getApp().globalData.example.driving_license_vice
						break
				}

				let arr = [img]
				uni.previewImage({
					urls: arr
				})
			},


			// 上传图片
			async uploadfile(i) {
				let [error, chooseImage] = await uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

				})
				if (!error) {
					switch (i) {
						case 1:
							this.idnumberimg = chooseImage.tempFilePaths[0]
							break
						case 2:
							this.idnumberplaneimg = chooseImage.tempFilePaths[0]
							break
						case 3:
							this.vehiclelicencediscimg = chooseImage.tempFilePaths[0]
							break
						case 4:
							this.vehiclelicencediscplaneimg = chooseImage.tempFilePaths[0]
							break
					}


					// 上传图片
					let [err, uploadres] = await uni.uploadFile({
						url: this.api.uplode_img,
						filePath: chooseImage.tempFilePaths[0],
						name: 'img',
					})
					if (!err) {
						//转化为json
						let data = JSON.parse(uploadres.data)
						//要上传的行驶证正页
						switch (i) {
							case 1:
								this.idnumber = data.url
								break
							case 2:
								this.idnumberplane = data.url
								break
							case 3:
								this.vehiclelicencedisc = data.url
								break
							case 4:
								this.vehiclelicencediscplane = data.url
								break
						}

					} else {
						uni.showToast({
							title: '上传失败',
							duration: 2000,
							icon: 'none'
						})
					}
				}
			},


			// 上传身份证
			// async uploadidnumber() {
			// 	let [error, chooseImage] = await uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

			// 	})
			// 	if (!error) {
			// 		this.idnumberimg = chooseImage.tempFilePaths[0]

			// 		// 上传图片
			// 		let [err, uploadres] = await uni.uploadFile({
			// 			url: this.api.uplode_img,
			// 			filePath: chooseImage.tempFilePaths[0],
			// 			name: 'img',
			// 		})
			// 		if (!err) {
			// 			//转化为json
			// 			let data = JSON.parse(uploadres.data)
			// 			//要上传的行驶证正页
			// 			this.idnumber = data.url

			// 		} else {
			// 			uni.showToast({
			// 				title: '上传失败',
			// 				duration: 2000,
			// 				icon: 'none'
			// 			})
			// 		}
			// 	}


			// },

			// 上传行车证
			// async uploadvehiclelicencedisc() {
			// 	let [error, chooseImage] = await uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

			// 	})
			// 	if (!error) {
			// 		this.vehiclelicencediscimg = chooseImage.tempFilePaths[0]
			// 		// 上传图片
			// 		let [err, uploadres] = await uni.uploadFile({
			// 			url: this.api.uplode_img,
			// 			filePath: chooseImage.tempFilePaths[0],
			// 			name: 'img',
			// 		})
			// 		if (!err) {
			// 			//转化为json
			// 			let data = JSON.parse(uploadres.data)
			// 			//要上传的行驶证正页
			// 			this.vehiclelicencedisc = data.url

			// 		} else {
			// 			uni.showToast({
			// 				title: '上传失败',
			// 				duration: 2000,
			// 				icon: 'none'
			// 			})
			// 		}
			// 	}
			// },

			// 查看上传的图片
			lookImg(i) {
				let img = ''
				switch (i) {
					case 1:
						img = this.idnumberimg
						break
					case 2:
						img = this.idnumberplaneimg
						break
					case 3:
						img = this.vehiclelicencediscimg
						break
					case 4:
						img = this.vehiclelicencediscplaneimg
						break
				}
				let arr = [img]
				uni.previewImage({
					urls: arr
				})
			},

			//删除图片
			deleteimg(i) {
				switch (i) {
					case 1:
						this.idnumberimg = ''
						this.idnumber = ''
						break
					case 2:
						this.idnumberplaneimg = ''
						this.idnumberplane = ''
						break
					case 3:
						this.vehiclelicencediscimg = ''
						this.vehiclelicencedisc = ''
						break
					case 4:
						this.vehiclelicencediscplaneimg = ''
						this.vehiclelicencediscplane = ''
						break
				}
			}
		},

		onUnload() {
			clearTimeout(this.settime)
		}
	}
</script>

<style lang="scss">
	.wrap {
		margin: 20rpx 0;
		background-color: #fff;

		.image {

			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 20rpx 0;

			.item {
				width: 30%;
				height: 100%;
				border: 1px solid #dedede;
				border-radius:10rpx;
				overflow:hidden;
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
					background-color:rgba(0,122,255,.7)
				}
			}
		}
	}


	.titlewrap {
		padding: 20rpx;
		color: #858B9C;
		height: 80rpx;
		@include flex(flex-start);



		.title {
			height: 100%;
			font-size: 28rpx;
			@include flex(flex-start);
		}

		.marginleft {
			margin-left: auto;
			width: 240rpx;
			padding: 14rpx;
			border-radius: 20rpx;
			background-color: #007AFF;
			color: #fff;
			@include flex;
		}

	}


	.itemlist {


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
					flex:1;
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


	.buttom {
		height: 160rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 100;
		@include flex;

		.btn {
			width: 60%;
			height: 75rpx;
			@include flex;
			background-color: #007AFF;
			font-size: 32rpx;
			letter-spacing: 10rpx;
			border-radius: 10rpx;
			color: #fff;
		}
		.btns{
			background-color: rgba(0,122,255,.7);
		}
	}
</style>
