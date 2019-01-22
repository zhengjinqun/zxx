import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Home from "./components/tabbar/Home.vue"
import details from './components/tabbar/details.vue'
import login from './components/tabbar/login.vue'
import register from './components/tabbar/register.vue'
import shop_cart from './components/tabbar/shop_cart.vue'
import member from './components/tabbar/member.vue'
import updated_uname from './components/user/updated_uname.vue'
import updated_upwd from './components/user/updated_upwd.vue'
Vue.use(Router)
export default new Router({
  routes: [
    /*用户访问 / 重新定位 /Home Home显示*/
    {path:'/',redirect:"/Home"},
    {path:'/HelloContainer',component:HelloContainer},
    {path:'/Home',component:Home},
    {path:'/details/:pid',component:details},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/shop_cart',component:shop_cart},
    {path:'/member',component:member},
    {path:'/updated_uname',component:updated_uname},
    {path:'/updated_upwd',component:updated_upwd},
  ]
})