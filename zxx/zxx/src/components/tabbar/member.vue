<template>
<div calss="app-member">
    <div class="header_t">
        <router-link to="/Home"><span class="mui-icon mui-icon-back"></span></router-link>
        <span class="title">会员中心</span>
    </div>
    <!-- 个人 -->
    <div class="mem_geren">
        <div class="mem_geren1" style="border-radius:100%; overflow:hidden;width:4rem;height:4rem;">
            <img  style="width:4rem;" src="./img/tx1.png" alt="">
        </div>
    <div class="margin_top">
        <router-link v-if="sflogin"  to="/login" class="uname">登录</router-link >
         <span v-else class="uname">{{uname}}</span>
        <!--<span>普通会员</span>-->
    </div>
    <!-- 个人资料 -->
    <router-link to="/updated_uname">
    <div class="grzl">
            <router-link to="/updated_uname" id="icon-person"><span class="mui-icon mui-icon-person"></span></router-link>
            <div>个人资料</div>
            <router-link to="/updated_uname">
                <span class="mui-icon mui-icon-forward"></span>
            </router-link>
    </div>
</router-link>
<router-link to="/updated_upwd">
    <div class="grzl">
            <router-link to="/updated_upwd" id="icon-person"><span class="mui-icon mui-icon-locked"></span></router-link>
            <div>修改密码</div>
            <router-link to="/updated_upwd">
                <span class="mui-icon mui-icon-forward"></span>
            </router-link>
    </div>
</router-link>
    <!-- 退出登陆 -->
    <div class="logout">
        <a><span class="mui-icon-extra mui-icon-extra-arrowrightcricle"></span></a>
        <span class="logout_dl"  @click="lougot">退出当前登陆</span>
    </div> 
</div>
<my-tabbar></my-tabbar>
</div>
</template>
<script>
import {Toast} from 'mint-ui'
import tabbar from '../sub/bottom_tabbar.vue'
export default {
   components:{
        "my-tabbar":tabbar
    },
    created(){
        this.login()
        console.log(1)
    },
methods: {
    //登陆
    login(){
        var name=sessionStorage.getItem("name");
        if(name==null){
            this.sflogin=true;
        }else{
            console.log(this.uname)
            this.uname=name;
            this.sflogin=false;
            Toast("登陆成功");
        }
    },
    //退出登陆
    lougot(){
        sessionStorage.removeItem("name");
        var url="http://127.0.0.1:3000/logout";
        this.axios.get(url).then(res=>{
            console.log(res)
        })
        this.sflogin=true;
        Toast("退出成功")
    },
    
},
data(){
        return{
            uname:'',
            sflogin:true
        }
    },
}
</script>
<style>
.header_t{
        height:3rem;
        background:#16a086;
        margin-bottom:1rem;
        
    }
    .header_t>a{
        color:#fff;
        line-height:3rem;
    }
     .title{
        font-size:22px;
        color:#fff;
        margin-left:30%; 
        line-height:3rem;
    }
.mem_geren1{
    margin-left:1rem;
    float: left; 
    margin-bottom:1rem;
}
.margin_top{
    float: left;
    margin-top:1.2rem; 
    margin-left:0.6rem;
}
.margin_top>.uname{
    color:#333;
}
.margin_top>span{
    color:#fd8668;
}
/*个人资料*/
.grzl{
    clear: both;
    width:100%;
    height:3rem;
    border-top:1px solid #ddd;
    border-bottom:1px solid #ddd;
}
.grzl>div{
    margin-top:0.8rem;
    float: left;
    margin-left:4rem; 
}
#icon-person{
    display: block;
    float: left;
    margin-top:0.6rem;
    margin-left:1rem; 
    color: #16a086;
}
.grzl .mui-icon-forward{
    display: block;
    float: right;
    margin-top:0.6rem;
    color:#000;
}
/*退出登陆*/
.logout{
    position: fixed;
    bottom: 0;
    clear: both;
    margin-left:1rem; 
    height:3rem;
    width:100%;
    margin-bottom:3rem;
}
.logout>a>span{
    color:#333;
    margin-top:1rem;
    font-size:18px;
}
.logout>.logout_dl{
    font-size:18px;
    margin-left:0.5rem; 
 
}
</style>