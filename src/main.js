// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from '@/router/router'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import VueAxios from 'vue-axios'
import Axios from 'axios'
import { getAjax, postAjax } from './http/http'

// import $ from 'jquery'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'


//import './http/common.js'
import '../static/common/common.js'
import { WechatPlugin, ToastPlugin, AlertPlugin, DatetimePlugin,XImg } from 'vux'

Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(DatetimePlugin)

Vue.component('x-img', XImg)

// console.log(WechatPlugin)

Vue.prototype.$http = Axios;
Vue.prototype.$getAjax = getAjax;
Vue.prototype.$postAjax = postAjax;

require('../static/less/base.less')

//去掉点击延迟300秒
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 手机端调试工具
require('eruda').init()
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV !== 'production') {
//   require('eruda').init()
// }