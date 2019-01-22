<template>
    <div class="app-login">
        <div class="header">
            <router-link to="/Home"><span class="mui-icon mui-icon-back"></span></router-link>
            <span class="title">会员登录</span>
        </div>
        <!--输入框-->
        <div class="zhanghao">
            <span>用户名</span>
            <input type="text" class="input_width" placeholder="请输入账号" value="" v-model="name">
        </div>
        <div class="mima">
                <span>密码</span>
                <input type="password" class="input_width" placeholder="请输入密码" value="" v-model="pwd">
        </div>
        <!--记住
        <div class="checkbox_input">
        <input type="checkbox" style="margin-left:1.2rem;margin-top:1rem;">
        <span>记住我（两周内免登录）</span>
        </div>-->
        <mt-button style="width:90%;margin-left:1rem;background:#16a086;color: #fff;font-size:20px;margin-top:0.5rem;" @click="handleLogin">登录</mt-button>
        <router-link style="display:block;float: right;color:#16a086;margin-right:1.2rem;margin-top: 0.5rem; " to="/register">立刻注册</router-link>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
   data(){
       return{
           name:"",
           pwd:""
       }
   },
   methods: {
       handleLogin(){
           //获取输入用户和密码
           var n = this.name;
           var p = this.pwd;
           //验证
           var reg = /^[a-z0-9_]{3,12}$/i;
           //验证失败提示消息
            if(!reg.test(n)){
               Toast("用户名格式不正确");
               return;
            }
            if(!reg.test(p)){
               Toast("密码格式不正确");
               return;
            }
           //发送ajax请求
            var url = "http://127.0.0.1:3000";
               url+= "/login?name="+n;
               url+= "&pwd="+p
            this.axios.get(url).then(result=>{
                if(result.data.code == 1){
                    Toast("登陆成功");
                    this.$router.push("/Home")
                }else{
                    Toast("用户名或密码不正确")
                }
            })
       }
   },
}
</script>
<style>
    .header{
        height:3rem;
        background:#16a086;
        margin-bottom: 2rem;
    }
    .header>a{
        color:#fff;
        line-height:3rem;
    }
     .title{
        font-size:22px;
        color:#fff;
        margin-left:30%; 
        line-height:3rem;
    }
    /*输入框*/
    
    .zhanghao , .mima{
        width:90%;
        text-align: center;
        border:1px solid #ddd;
        height:3rem;
        margin: auto;
        
    }
    .input_width{
    line-height:1rem;
    width:71% !important;
    height: 43px;
    margin-bottom: 2px;
    padding: 10px 15px;
    -webkit-user-select: text;
    border: 0px solid rgba(255, 255, 255, .2);
    border-radius: 3px;
    outline: none;
    background-color: #fff !important;
    }
    .checkbox_input>span{
        font-size:16px;
    }
</style>