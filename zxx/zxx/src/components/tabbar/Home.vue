<template>
<div class="app-home">
<!--头部-->
    <div class="header" id="target1">
    <img class="img_raduis" src="././img/aaaa.gif"/>
    <span class="title_ont">小山沟在线商城</span>
    </div>
    <div class="top_nav">
    <!--第一个-->
        <div style="background:#158772;">
        <a id="icon-home"><span class="img_font_size mui-icon mui-icon-home"></span></a>
        <p>首页</p>
        </div>
    <!--第二个-->
        <div>
        <a><span class="img_font_size mui-icon-extra mui-icon-extra-cart"></span></a>
        <p>活动热销</p>
        </div>
    <!--第三个-->
        <div>
        <a><span class="img_font_size mui-icon-extra mui-icon-extra-outline"></span></a>
        <p>新品上市</p>
        </div>
    <!--第四个-->
        <div>
        <a><span class="img_font_size mui-icon-extra mui-icon-extra-express"></span></a>
        <p>全部商品</p>
        </div>
    <!--第五个-->
        <div>
        <a id="icon-personadd"><span class="mui-icon mui-icon-personadd"></span></a>
        <!--<a id="icon-person"><span class="img_font_size mui-icon mui-icon-person"></span></a>-->
        <p>会员专区</p>
        </div>
    </div>
    <!--注册登录-->
    <div class="register_login">
        <a>
        <span class="img_font_size1 mui-icon-extra mui-icon-extra-addpeople"></span>
         <router-link v-if="sflogin" to="/login" class="color_font login_name">登录</router-link>
         <router-link v-else to=""  class="color_font login_name">{{uname}}<span  @click="logout">退出</span></router-link>
        </a>
       
         <a>
         <span class="img_font_size1 mui-icon mui-icon-paperclip"></span>
           <router-link to="/register" class="color_font">注册</router-link>
         </a>
       
         <a>
         <span class="img_font_size1 mui-icon-extra mui-icon-extra-cart"></span>
         <span class="color_font"><router-link style="color: #16a086" to="/shop_cart">购物车(0)</router-link>   </span>
         </a>
    </div>
    <!--图片-->
    <div style="height:18rem;">
    <img src="././img/bbbb.jpg" style="width:100%;" />
    <img src="././img/7.jpg" style="width:100%;margin-top:-0.5rem;" />
    </div>
    <!--轮播图-->
    <mt-swipe  id="target2" class="lunbo" :auto="2500">
        <mt-swipe-item v-for="item in list" :key="item.id">
            <img :src="item.img_url" />
        </mt-swipe-item>
     </mt-swipe>
    <!--主体-->
    <div class="center" style="clear:both">
        <div  v-for="item_yi in list_one">
            <div style="float:left;margin:0;">
                <router-link :to="'/details/'+item_yi.pid">
                <img style="margin-top:1rem;margin-right:1.4rem;" :src="item_yi.pic"/>
                <p>{{item_yi.index_title}}</p>
                </router-link>
            </div>
        </div>
        <!--底部-->
        <div class="footer">
        <a   @click="test()">
            <span class="mui-icon-extra mui-icon-extra-top"></span>
        </a>
        </div>
        <div @click="test1" class="footer1">
        </div>
        <!--tabbar-->
        <my-tabbar></my-tabbar>
    </div>
</div>
</template>
<script>
import {Toast} from 'mint-ui'
import tabbar from '../sub/bottom_tabbar.vue'
export default {
 components:{
        "my-tabbar":tabbar
    },
created() {
//当组件对象创建成功后即可发送ajax请求
this.getImages();
this.getImages1();
this.login();
},

methods:{
//  退出登陆
 logout(){
     console.log(1)
     sessionStorage.removeItem("name");
     this.sflogin=true;
     Toast("退出成功")
 },
 //登陆用户名
 login(){
    var name =sessionStorage.getItem("name");
    console.log(name);
    if(name==null){
        this.sflogin=true;
    }else{
        this.uname=name;
        this.sflogin=false
    }
    },
   
 //点击回到顶部
test(){
    target1.scrollIntoView();
},
test1(){
    target2.scrollIntoView();
},
//滚动
// mounted () {
//   window.addEventListener('scroll', this.scrollToTop)
// },
// scrollToTop() { 
// 　　var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
// 　　console.log(scrollTop) 
// },
getImages(){
       //完成一个功能,获取服务器端轮播图片
       //1:发送ajax请求
var url = "http://127.0.0.1:3000/getImages";
this.axios.get(url).then(result=>{
this.list = result.data;
        })
       //2:获取返回数据保存list
     },
     getImages1(){
       //完成一个功能,获取服务器端轮播图片
       //1:发送ajax请求
var url = "http://127.0.0.1:3000/index_sp";
this.axios.get(url).then(result=>{
this.list_one = result.data.data;
    console.log(this.list_one);
        })
       //2:获取返回数据保存list
     }
   },
   data(){
    return { 
        list:[],
        list_one:[],
        uname:'',
        sflogin:true
     }
    },
}
</script>

<style>
   *{margin:0;padding:0;}
    .app-home{}
    .header{
        height:3rem;
        background:#16a086;
    }
    .img_raduis{
        width:2.1rem;
        margin:0.6rem;
        border-radius:0.2rem;
        float:left;
    }
     .title_ont{
        font-size:18px;
        float:left;
        color:#fff;
        margin-top:1rem;
        margin-left:0.2rem;
        }
    .top_nav{
        width:100%;
        height:4rem;
        background:rgba(22,160,134,0.9);
        overflow:hidden;
    }
    .top_nav>div{
       float:left;
        /*border:1px solid red; */
        text-align:center;
        height:100%;
        width:4.64rem;
        }
    .top_nav>div>p{color:#fff;font-size:14px;}
    .img_font_size,.mui-icon-personadd{
        font-size:32px;
        color:#fff;
        margin-top:0.3rem;
    }
    /*注册登录*/
    .register_login{
        width:100%;
        height:2rem;
        background:rgb(233, 255, 251);
    }
    .register_login .img_font_size1{
        color:#16a086;
        font-size:20px;
        vertical-align: middle;
    }
    .register_login .color_font{
        font-size:14px;
        color:#16a086;
        
    }
    .register_login>a{
        display:block;
        float:left;
        margin-top:0.3rem;
        margin-left:0.5rem;
        }
    /*图片轮播*/
    .lunbo{
        height:10rem;
    }
    /*主体*/
    .center{
        width:100%;
    }
    .center>div{float:left;}
    .center>div img{
        width:10rem;
    }
    .center>div>p{
        font-size:16px !important;
        opacity:1 !important;
        color:#000;
    }
    /*底部*/
    .footer{
        width:100%;
        background:#87b4ac;
        height:2.2rem;
    }
    .footer>a{
        display:block;
        float:right;
        margin-top:0.3rem;
        margin-right:0.3rem;
        color:#fff;
    }
    .footer1{
        width:100%;
        height:3rem;
        background:#d8eae7;
    }
</style>