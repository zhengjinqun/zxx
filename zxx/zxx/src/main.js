// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import'mint-ui/lib/style.css'

// import'./mui-master/examples/hello-mui/css/mui.min.css'
// import'./mui-master/examples/hello-mui/js/mui.min.js'

Vue.config.productionTip = false
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import {Button,Header,Swipe,SwipeItem} from "mint-ui"
Vue.component(Swipe.name,Swipe);
Vue.component(Button.name,Button);
Vue.component(Header.name,Header);
Vue.component(SwipeItem.name,SwipeItem);
/* eslint-disable no-new */
import axios from "axios"
//5:修改配置信息 跨域保存session值!!!!
axios.defaults.withCredentials=true
//6:注册组件
Vue.prototype.axios = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
