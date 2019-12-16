<template>
	<view>

		<!-- 车牌照信息 -->
		<view class="wrap">
			<view class="titlewrap">
				<view class="borderstyle">
				</view>
				<view class="title">
					车牌信息
				</view>
			</view>

			<licensePlateKey ref="licensePlateKey" />

		</view>




		<!-- 车辆信息 -->
		<view class="wrap">
			<view class="titlewrap">
				<view class="borderstyle">

				</view>
				<view class="title">
					车辆信息
				</view>
			</view>
			<view class="image">

				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="drivinglicensejust" @tap="deleteimg(1)">
							&#xe612;
						</view>
						<image :src="drivinglicensejustimg" v-if="drivinglicensejust" @tap="lookImg(1)"></image>
						<view v-else @tap="uploadFileJust">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传行驶证正页
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(1)">
						查看示例
					</view>
				</view>
				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="drivinglicensevice" @tap="deleteimg(2)">
							&#xe612;
						</view>
						
						<image :src="drivinglicenseviceimg" v-if="drivinglicensevice" @tap="lookImg(2)"></image>
						<view v-else @tap="uploadFileVice">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传行驶证副页
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(2)">
						查看示例
					</view>
				</view>
				<view class="item">
					<view class="img">
						<view class="close iconfont" v-if="insurance" @tap="deleteimg(3)">
							&#xe612;
						</view>
						
						<image :src="insuranceimg" v-if="insurance" @tap="lookImg(3)"></image>
						<view v-else @tap="uploadFileInsurance">
							<view class="iconfont">
								&#xe611;
							</view>
							<view>
								上传保险单
							</view>

						</view>
					</view>
					<view class="text" hover-class="texts" @tap="previewPictures(3)">
						查看示例
					</view>
				</view>
			</view>


		</view>


		<!-- 收货地址 -->
		<view class="wrap itemlist">
			<view class="titlewrap">
				<view class="borderstyle">
				</view>
				<view class="title">
					收货信息
				</view>
				<view class="marginleft" hover-class="marginlefts" @tap="getaddress">
					点击获取收货信息
				</view>
			</view>

			<view class="item">
				<view class="left">
					收件人:
				</view>
				<view class="right">
					<input type="text" v-model="name" placeholder="请输入收货人姓名" />
				</view>
			</view>

			<view class="item">
				<view class="left">
					联系电话:
				</view>
				<view class="right">
					<input type="number" v-model="phone" placeholder="请输入收货人电话" />
				</view>
			</view>


			<view class="item">
				<view class="left">
					收货地址:
				</view>
				<view class="right">
					<input type="text" v-model="address" placeholder="请输入详细的收货地址" />
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					备注信息:
				</view>
				<view class="right">
					<input type="text" v-model="msg" placeholder="备注信息" />
				</view>
			</view>
			
		</view>


		<view style="height: 160rpx;"></view>

		<!-- 底部按钮 -->
		<view class="buttom">
			<view class="btn" hover-class="btns" @tap="submit">
				下单支付({{exemptionLabelPrice}}元)
			</view>
		</view>

	</view>
</template>

<script>
	// 支付相关
	import MD5Util from '@/common/md5.js'
	
	import licensePlateKey from '@/components/license-plate-key'
	export default {
		components: {
			licensePlateKey
		},
		data() {
			return {
				drivinglicensejust: '', // 上传的行驶证正页
				drivinglicensejustimg: '', //预览的行驶证正页
				drivinglicensevice: '', //上传的行驶证副页
				drivinglicenseviceimg: '', //预览的行驶证副页
				insurance: '', // 上传的保险单
				insuranceimg: '', // 预览的保险单

				carnumber: '', //车牌信息

				distinguishres: {}, //识别结果

				name: '', //联系人
				phone: '', //联系电话
				address: '', //收货地址
				msg:'', //备注信息
				settime:null,
				
				exemptionLabelPrice:''  //免检标订单
			};
		},
		async mounted() {
			// 请求免检标价格
			let exemptionLabelPrice =  await this.ajax(this.api.exemptionLabelPrice)
			if(exemptionLabelPrice.data.code==200){
				this.exemptionLabelPrice = exemptionLabelPrice.data.data
			}
		},
		onLoad() {
			
			
		},
		methods: {
			// 删除上传的图片
			deleteimg(i){
				switch(i){
					case 1:
						this.drivinglicensejust = ''
						this.drivinglicensejustimg = ''
					break
					case 2:
						this.drivinglicensevice = ''
						this.drivinglicenseviceimg = ''
					break
					case 3:
						this.insurance = ''
						this.insuranceimg = ''
					break
				}
			},
			
			
			// 预览图片
			lookImg(i){
				let img = ''
				switch(i){
					case 1:
						img = this.drivinglicensejustimg 
					break
					case 2:
						img = this.drivinglicenseviceimg
					break
					case 3:
						img = this.insuranceimg 
					break
				}
				let arr = [img]
				uni.previewImage({
					urls: arr,
				    longPressActions: {
				        itemList: ['发送给朋友', '保存图片', '收藏']
				    }
				})
			},
			
			
			
			
			// 获取收货地址
			async getaddress() {
				let [error, chooseAddress] = await uni.chooseAddress()

				if (!error) {
					let address = chooseAddress.provinceName + chooseAddress.cityName + chooseAddress.countyName + chooseAddress.detailInfo
					let name = chooseAddress.userName
					let phone = chooseAddress.telNumber
					this.name = name
					this.phone = phone
					this.address = address
				} else {
					uni.showToast({
						title: '获取通信地址失败',
						icon: 'none',
						duration: 2000
					})
				}
			},


			// 上传行驶证正页
			async uploadFileJust() {
				let [error, chooseImage] = await uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

				})

				if (!error) {

					this.drivinglicensejustimg = chooseImage.tempFilePaths[0]


					// 上传图片
					let [err, uploadres] = await uni.uploadFile({
						url: this.api.uplode_img,
						filePath: chooseImage.tempFilePaths[0],
						name: 'img',
					})

					if (!err) {

						//转化为json
						let data = JSON.parse(uploadres.data)
						console.log(data)
						//要上传的行驶证正页
						this.drivinglicensejust = data.url
						console.log(this.drivinglicensejust)

						let result = await this.ajax(this.api.distinguish, {
							img: data.url
						}, 'POST')

						if (result.data.code == 200) {
							let {
								addr,
								engine_num,
								issue_date,
								model,
								owner,
								plate_num,
								register_date,
								use_character,
								vehicle_type,
								vin
							} = result.data.data
							this.distinguishres.addr = addr
							this.distinguishres.engine_num = engine_num
							this.distinguishres.issue_date = issue_date
							this.distinguishres.model = model
							this.distinguishres.owner = owner
							this.distinguishres.plate_num = plate_num
							this.distinguishres.register_date = register_date
							this.distinguishres.use_character = use_character
							this.distinguishres.vehicle_type = vehicle_type
							this.distinguishres.vin = vin

						} else {
							uni.showToast({
								title: '智能识别失败',
								duration: 2000,
								icon: 'none'
							})
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

			//上传行驶证副页
			async uploadFileVice() {
				let [error, chooseImage] = await uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机

				})

				if (!error) {
					this.drivinglicenseviceimg = chooseImage.tempFilePaths[0]


					// 上传图片
					let [err, uploadres] = await uni.uploadFile({
						url: this.api.uplode_img,
						filePath: chooseImage.tempFilePaths[0],
						name: 'img',
					})

					if (!err) {
						//转化为json
						let data = JSON.parse(uploadres.data)
						//要上传的行驶证副页
						this.drivinglicensevice = data.url

						let result = await this.ajax(this.api.distinguish, {
							img: data.url
						}, 'POST')

						if (result.data.code == 200) {
							let {
								plate_num_b,
								prepare_quality,
								record,
								total_quality,
								passengers_num
							} = result.data.data
							this.distinguishres.plate_num_b = plate_num_b
							this.distinguishres.passengers_num = passengers_num
							this.distinguishres.prepare_quality = prepare_quality
							this.distinguishres.record = record
							this.distinguishres.total_quality = total_quality
						} else {
							uni.showToast({
								title: '智能识别失败',
								duration: 2000,
								icon: 'none'
							})
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


			//上传保险单
			async uploadFileInsurance() {
				let [error, chooseImage] = await uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从哪里选择图片 相册和相机
				})
				if (!error) {
					this.insuranceimg = chooseImage.tempFilePaths[0]

					// 上传图片
					let [err, uploadres] = await uni.uploadFile({
						url: this.api.uplode_img,
						filePath: chooseImage.tempFilePaths[0],
						name: 'img',
					})
					if (!err) {
						//转化为json
						let data = JSON.parse(uploadres.data)
						//要上传的保险单
						this.insurance = data.url

					} else {
						uni.showToast({
							title: '上传失败',
							duration: 2000,
							icon: 'none'
						})
					}

				}
			},


			// 预览图片
			previewPictures(i) {
				let url = ''
				switch (i) {
					case 1:
						url = getApp().globalData.example.driving_license_just
						break
					case 2:
						url = getApp().globalData.example.driving_license_vice
						break
					case 3:
						url = getApp().globalData.example.insurance_img
						break
				}

				uni.previewImage({
					urls: [
						url
					],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},

			// 提交按钮
			submit() {
				let carnumber = this.$refs.licensePlateKey.toBind()
				
				if (carnumber) {
					this.carnumber = carnumber
				} else {
					uni.showToast({
						title: '请填写车牌号信息',
						duration: 2000,
						icon: 'none'
					})
					return false
				}


				// 获取要提交的数据
				let {
					drivinglicensejust,
					drivinglicensevice,
					insurance,
					distinguishres,
					name,
					phone,
					address,
					exemptionLabelPrice,
					msg
				} = this
				
				if(!exemptionLabelPrice){
					uni.showToast({
						title: '免检标订单金额错误!',
						duration: 2000,
						icon: 'none'
					})
					return false
				}
				
				if (carnumber.length < 7) {
					uni.showToast({
						title: '请填写完整的车牌号信息',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!drivinglicensejust.length) {
					uni.showToast({
						title: '请上传行驶证正页',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!drivinglicensevice.length) {
					uni.showToast({
						title: '请上传行驶证副页',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!insurance.length) {
					uni.showToast({
						title: '请上传保险单',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!name.length) {
					uni.showToast({
						title: '请填写收件人姓名',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!phone.length) {
					uni.showToast({
						title: '请填写收件人联系方式',
						duration: 2000,
						icon: 'none'
					})
					return false
				} else if (!address.length) {
					uni.showToast({
						title: '请填写收货地址',
						duration: 2000,
						icon: 'none'
					})
					return false
				}

				// 验证通过可以提交信息
				// uni.showLoading({
				// 	mask: true,
				// 	title: '提交中...'
				// })
				//发送订单请求 
				let res = this.ajax(this.api.exemptionMarkPay, {
					carnumber,
					drivinglicensejust,
					drivinglicensevice,
					insurance,
					distinguishres,
					name,
					phone,
					address,
					msg,
					price:exemptionLabelPrice
				}, 'POST')

				if (res.data.code == 200) {
					let appId = res.data.data.payinfo.appid
					let timeStamp = parseFloat(res.data.data.payinfo.timeStamp).toString()
					let pkg = 'prepay_id=' + res.data.data.payinfo.prepay_id
					let nonceStr = res.data.data.payinfo.nonce_str
					let sign = res.data.data.payinfo.sign
					let paySign = MD5Util.MD5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg +
						'&signType=MD5&timeStamp=' + timeStamp + "&key=" + res.data.data.payinfo.apikey)
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: timeStamp,
						nonceStr: nonceStr,
						package: pkg,
						signType: 'MD5',
						paySign: paySign,
						success: (res) => {
							this.settime = setTimeout(() => {
								uni.reLaunch({
									url: '../index/index'
								})
							}, 1000)
						},
						fail: (err) => {
							console.log('支付失败')
						},
						complete() {
							// uni.hideLoading()
						}
					})
				} else {

				}



			},

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
				border-radius: 10rpx;
				overflow: hidden;
				.img {
					width: 100%;
					height: 160rpx;
					background-color: #fff;
					position: relative;
					.close{
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
		.marginlefts{
			background-color: rgba(0,122,255,.7);
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
				width: 70%;

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
