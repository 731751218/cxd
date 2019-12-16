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



		<!-- 上传行驶证 -->
		<view class="itemlist">
			<view class="titlewrap">
				<view class="borderstyle">

				</view>
				<view class="title">
					上传行驶证(正/副)页
				</view>
			</view>

			<!-- 上传行驶证 -->
			<view class="drivinglicensewrap">
				<view class="items">
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
					<view class="text" @tap="previewPictures(1)">
						查看示例
					</view>
				</view>

				<view class="items">
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
					<view class="text" @tap="previewPictures(2)">
						查看示例
					</view>
				</view>


			</view>

		</view>


		<!-- 车辆信息 -->
		<view class="itemlist">
			<view class="titlewrap">
				<view class="borderstyle">

				</view>
				<view class="title">
					车辆基本信息
				</view>
			</view>

			<view class="item">
				<view class="left">
					年检有效期:
				</view>
				<view class="right">
					<picker mode="date" @change="yearlyInspectionDateChange" :value="dateind" :range="datearr">
						<view class="date">{{yearly_inspection_date}}</view>
					</picker>
				</view>
			</view>

			<view class="item">
				<view class="left">
					车检有效期:
				</view>
				<view class="right">
					<picker mode="date" @change="carInspectionDateChange" :value="dateind" :range="datearr">
						<view class="date">{{car_inspection_date}}</view>
					</picker>
				</view>
			</view>
		</view>



		<!-- 智能识别结果 -->
		<view class="itemlist" v-if="distinguish">
			<view class="titlewrap">
				<view class="borderstyle">
				</view>
				<view class="title">
					智能识别结果
				</view>
			</view>

			<view class="item">
				<view class="left">
					车辆识别代:
				</view>
				<view class="right">
					<input type="text" v-model="vin" placeholder="请输入车辆识别代" />
				</view>
			</view>

			<view class="item">
				<view class="left">
					发动机号码:
				</view>
				<view class="right">
					<input type="text" v-model="engine_num" placeholder="请输入发动机号码" />
				</view>
			</view>

			<view class="item">
				<view class="left">
					注册日期:
				</view>
				<view class="right">
					<picker mode="date" @change="registerDateChange" :value="dateind" :range="datearr">
						<view class="date">{{register_date}}</view>
					</picker>
				</view>
			</view>

		</view>



		<view style="height: 140rpx;"></view>
		<view class="buttom">
			<view class="btn" @tap="sub">
				确定提交
			</view>
		</view>



	</view>
</template>

<script>
	import licensePlateKey from '@/components/license-plate-key'
	export default {
		components: {
			licensePlateKey
		},
		data() {
			return {
				carnumber: '',
				datearr: [], //时间数组
				dateind: 0, //序列号

				drivinglicensejust: '', //上传的行驶证图片
				drivinglicensejustimg: '', //上传的行驶证图片临时展示图片
				drivinglicensevice: '', //上传行驶证副页
				drivinglicenseviceimg: '', //上传行驶证副页临时展示图片
				// distinguishres: {}, //识别结果

				vin: '', //车辆识别代
				engine_num: '', //发动机号码
				distinguish: false, //智能识别是否显示
				register_date: '', //注册日期
				car_inspection_date: '请选择车险有效期', //车险有效期
				yearly_inspection_date: '请选择年检有效期', //年检有效期
			};
		},
		methods: {
			// 查看上传的行驶证图片
			lookImg(i) {
				let img = ''
				switch (i) {
					case 1:
						img = this.drivinglicensejustimg
						break
					case 2:
						img = this.drivinglicenseviceimg
						break

				}
				uni.previewImage({
					urls: [img]
				})
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
						this.distinguish = true
						//转化为json
						let data = JSON.parse(uploadres.data)
						//要上传的行驶证正页
						this.drivinglicensejust = data.url

						let result = await this.ajax(this.api.distinguish, {
							img: data.url
						}, 'POST')

						if (result.data.code == 200) {
							// let {
							// 	addr,
							// 	engine_num,
							// 	issue_date,
							// 	model,
							// 	owner,
							// 	plate_num,
							// 	register_date,
							// 	use_character,
							// 	vehicle_type,
							// 	vin
							// } = result.data.data

							let {
								register_date,
								engine_num,
								vin
							} = result.data.data

							this.distinguish = true //显示识别的内容
							this.vin = vin
							this.engine_num = engine_num
							this.register_date = register_date
							// this.distinguishres.addr = addr
							// this.distinguishres.engine_num = engine_num
							// this.distinguishres.issue_date = issue_date
							// this.distinguishres.model = model
							// this.distinguishres.owner = owner
							// this.distinguishres.plate_num = plate_num
							// this.distinguishres.register_date = register_date
							// this.distinguishres.use_character = use_character
							// this.distinguishres.vehicle_type = vehicle_type
							// this.distinguishres.vin = vin

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
							// let {
							// 	plate_num_b,
							// 	prepare_quality,
							// 	record,
							// 	total_quality,
							// 	passengers_num
							// } = result.data.data
							// this.distinguishres.plate_num_b = plate_num_b
							// this.distinguishres.passengers_num = passengers_num
							// this.distinguishres.prepare_quality = prepare_quality
							// this.distinguishres.record = record
							// this.distinguishres.total_quality = total_quality
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


			// 删除上传的图片
			deleteimg(i) {
				switch (i) {
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
			previewPictures(i) {
				let url = ''
				switch (i) {
					case 1:
						url = getApp().globalData.example.driving_license_just
						break
					case 2:
						url = getApp().globalData.example.driving_license_vice
						break
				}

				uni.previewImage({
					urls: [url],
				})
			},




			registerDateChange(e) {
				console.log(e.detail.value)
				this.register_date = e.detail.value
			},

			// 年检有效期改变
			yearlyInspectionDateChange(e) {
				this.yearly_inspection_date = e.detail.value
			},

			//  车险有效期
			carInspectionDateChange(e) {
				this.car_inspection_date = e.detail.value
			},


			//提交
			async sub() {
				let carnumber = this.$refs.licensePlateKey.toBind()
				console.log(carnumber)
				if (!carnumber) {
					return uni.showToast({
						title: '请填写完整车牌号',
						duration: 2000,
						icon: 'none'
					});
				}
				
				let {
					drivinglicensejust,
					drivinglicensevice,
					vin,
					engine_num,
					register_date,
					car_inspection_date,
					yearly_inspection_date,
					
				} = this

				if (!drivinglicensejust.length) {
					return uni.showToast({
						title: '请上传正确的行驶证正面',
						duration: 2000,
						icon: 'none'
					});
				} else if (!drivinglicensevice.length) {
					return uni.showToast({
						title: '请上传正确的行驶证副面',
						duration: 2000,
						icon: 'none'
					});
				} else if (!vin.length) {
					return uni.showToast({
						title: '请添加车辆VIN',
						duration: 2000,
						icon: 'none'
					});
				} else if (!engine_num.length) {
					return uni.showToast({
						title: '请添加车辆发动机编号',
						duration: 2000,
						icon: 'none'
					});
				} else if (!register_date.length) {
					return uni.showToast({
						title: '请选择车辆注册日期',
						duration: 2000,
						icon: 'none'
					});
				} else if (!car_inspection_date.length) {
					return uni.showToast({
						title: '请选择车险有效期',
						duration: 2000,
						icon: 'none'
					});
				} else if (!yearly_inspection_date.length) {
					return uni.showToast({
						title: '请选择年险有效期',
						duration: 2000,
						icon: 'none'
					});
				}

				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let addCar = await this.ajax(this.api.addCar, {
						drivinglicensejust,
						drivinglicensevice,
						vin,
						engine_num,
						register_date,
						car_inspection_date,
						yearly_inspection_date,
						carnumber
					}, 'POST')
				if (addCar.data.code){
					uni.hideLoading()
					uni.showToast({
						title: addCar.data.msg,
						duration: 2000,
						icon: 'none'
					})
					if(addCar.data.code==200){
						uni.navigateBack({
							delta:1
						})
					}
				}
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f9f9f9;
	}

	.wrap {
		background-color: #fff;
	}

	.itemlist {
		background-color: #fff;
		margin-top: 30rpx;
		border-top: 1rpx solid #DEDEDE;
		border-bottom: 1rpx solid #DEDEDE;

		.item {
			background-color: #FFF;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			font-size: 34rpx;
			@include flex(flex-start);

			.left {

				width: 30%;
			}

			.right {
				width: 70%;
				text-align: right;

			}
		}



		// 上传行驶证
		.drivinglicensewrap {

			margin-bottom: 30rpx;
			@include flex(space-around);
			height: 220rpx;


			.items {
				width: 30%;
				height: 100%;
				border: 1rpx solid #dedede;
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
						@include flex(space-around);
						flex-direction: column;

						.iconfont {
							font-size: 60rpx;
						}
					}


				}

				.text {
					height: 60rpx;
					background-color: #007AFF;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
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

	}

	.buttom {
		position: fixed;
		bottom: 0;
		height: 140rpx;
		width: 100%;
		@include flex;
		box-sizing: border-box;
		z-index: 100;

		.btn {
			height: 80rpx;
			width: 60%;
			@include flex;
			font-size: 38rpx;
			background-color: #007AFF;
			color: #fff;
			border-radius: 10rpx;
		}
	}
</style>
