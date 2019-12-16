import Vue from 'vue'
import App from './App'
// import copyright from '@/components/copyright'
import _function from '@/common/_function'
import api from '@/common/api'
//引入公共css样式
import '@/static/main.scss'

// Vue.component('copyright', copyright)
//挂载请求方法 和 api 到vue原型上
Vue.prototype.ajax = _function.request
Vue.prototype.api = api
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
