<template>
  <view class="demo">
    <ss-select-city :hotCitys="hotCitys" v-model="value" @on-select="onSelect"></ss-select-city>
  </view>
</template>

<script>
  import ssSelectCity from '@/components/ss-select-city/ss-select-city.vue'
  export default {
	  components: {
	    ssSelectCity
	  },
    data() {
      return {
        hotCitys: ['周口'],
        value: ''
      }
    },
	
	onLoad(options) {
		this.value = options.city
	},
    
    methods: {
      onSelect(city) {
		// 把所选的城市放在全局变量里
		getApp().globalData.city = city
		uni.navigateBack({
		    delta: 1
		})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
