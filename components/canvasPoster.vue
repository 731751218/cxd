<template>
	<view class="posterPop">
		<canvas :style="{ 'width': canvasW + 'px', 'height': canvasH + 'px' }" canvas-id="posterPop"></canvas>
		<view class="save">
			<view class="clos" @tap="closeCallback">
				关闭
			</view>
			<view class="sav" @tap="saveposter">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			img: {
				type: String,
				default: ''
			},
			text:{
				type:String,
				default:'xxx'
			},
			code:{
				type:String,
				default: ''
			},
			saveCallback:{
				type:Function
			},
			closeCallback:{
				type:Function
			}
		},
		data() {
			return {
				ctx: null,
				canvasW: 0,
				canvasH: 0,
			};
		},
		mounted() {
			
		},
			
		methods: {
			async draw(){
				let [err, getSystemInfo] = await uni.getSystemInfo()
				this.canvasH = getSystemInfo.safeArea.height * 0.8
				this.canvasW = getSystemInfo.safeArea.width * 0.8
				this.ctx = uni.createCanvasContext('posterPop', this)
				let [error, getImageInfo] = await uni.getImageInfo({
					src: this.img
				})
				// 绘制背景
				this.ctx.setFillStyle('#fff')
				this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
				// 绘制上面图片
				this.ctx.drawImage(getImageInfo.path, 0, 0, this.canvasW, this.canvasH * 0.8)
				//绘制二维码
				let [er, code] = await uni.getImageInfo({
					src: this.code
				})
				this.ctx.drawImage(code.path, 0, this.canvasH * 0.8 + (this.canvasH * 0.2 - 90) / 2, 90, 90)
				this.ctx.beginPath()
				this.ctx.setFillStyle('#000')
				// 右边分享文字 
				this.ctx.setFontSize(16)
				this.ctx.setTextBaseline('middle')
				this.ctx.fillText(this.text,this.canvasW*0.4, this.canvasH * 0.9)
				this.ctx.draw(true)
				uni.hideLoading()
			},
			
			//保存海报
			async saveposter() {
				//导出画布内容
				let [error, data] = await uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: this.canvasW,
					height: this.canvasH,
					canvasId: 'posterPop',
				})
				let [err, save] = await uni.saveImageToPhotosAlbum({
					filePath: data.tempFilePath,
				})
				if (!err) {
					// 返回保存结果
					return this.saveCallback(1)
				}
				// 返回保存结果
				return this.saveCallback(0)
				
			},


		}
	}
</script>

<style lang="scss" scoped>
	.posterPop {
		width: 100%;
		height: 100%;
		background-color: #dedede;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		canvas{
			box-shadow: 1px 1px 3px #F0F8FF;
			overflow: hidden;
		}

		.save {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 80%;

			&>view {
				padding: 16rpx 24rpx;
				background-color: #007AFF;
				border-radius: 10rpx;
				color: #fff;
				width: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			
		}
	}
</style>
