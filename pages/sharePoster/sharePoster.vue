<template>
	<view style="height:100%">
		<canvasPoster ref="poster" :img="posterParameter.img" :text="posterParameter.text" :code="posterParameter.code"
		 :saveCallback="saveCallback" :closeCallback="closeCallback"></canvasPoster>
	</view>
</template>

<script>
	import canvasPoster from "@/components/canvasPoster.vue"
	export default {
		components: {
			canvasPoster
		},
		data() {
			return {
				posterParameter: {}, //绘制海报的参数
				settime:null,
			};
		},
		onLoad() {
			this.shareposter()
		},
		methods: {
			//点击关闭回调
			closeCallback() {
				uni.navigateBack({
					delta: 1
				})
			},
			//绘制海报
			async shareposter() {
				let posterParameter = await this.ajax(this.api.posterParameter)
				if (posterParameter.data.code == 200) {
					if (posterParameter.data.data != 'null') {
						this.posterParameter = posterParameter.data.data
						//开始绘制!
						await this.$refs.poster.draw()
						//绘制完成 删除海报服务器上二维码!
						this.ajax(this.api.deletePoster)
					}
				}
				
			},
			
			//保存海报回调
			saveCallback(res) {
				if (res == 1) {
					uni.showToast({
						title: '保存成功!',
						icon: 'none',
						duration: 2000
					})
					this.settime = setTimeout(()=>{
						this.closeCallback()
					},2000)
					return 
				}
				uni.showToast({
					title: '保存失败',
					icon: 'none',
					duration: 2000
				})
			},
		},
		onUnload() {
			clearTimeout(this.settime)
		}
	}
</script>

<style lang="scss">

</style>
