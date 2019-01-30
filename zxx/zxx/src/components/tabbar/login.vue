<template>
    <div class="app-login">
        <div class="header_2">
            <router-link to="/Home"><span class="mui-icon mui-icon-back"></span></router-link>
            <span class="title_1">会员登录</span>
        </div>
        <!--输入框-->
        <div class="zhanghao_1">
            <span>用户名</span>
            <input type="text" class="input_width_1" placeholder="请输入账号" value="" v-model="name">
        </div>
        <div class="mima_1">
                <span>密码</span>
                <input type="password" class="input_width_1" placeholder="请输入密码" value="" v-model="pwd">
        </div>
        <!--记住
        <div class="checkbox_input">
        <input type="checkbox" style="margin-left:1.2rem;margin-top:1rem;">
        <span>记住我（两周内免登录）</span>
        </div>-->
        <mt-button style="width:90%;margin-left:1rem;background:#16a086;color: #fff;font-size:20px;margin-top:0.5rem;" @click="handleLogin">登录</mt-button>
        <router-link style="display:block;float: right;color:#16a086;margin-right:1.2rem;margin-top: 0.5rem; " to="/register">立刻注册</router-link>
        <div>{{name}}</div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    //保存用户名
   data(){
       return{
           name:"",
           pwd:""
       }
   },
   methods: {
       handleLogin(){
           //保存用户名
           
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
            var url = "http://127.0.0.1:3000/login?";
            this.axios.post(url,`name=${n}&pwd=${p}`).then(result=>{
                if(result.data.code == 1){
                    var a =sessionStorage.setItem("name",n);
                        console.log(a)
                        // alert("3秒跳回到首页");
                        // setTimeout(function(){
                        //     location.href="Home.vue";
                        // },3000)
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
    .header_2{
        height:3rem;
        background:#16a086;
        margin-bottom: 2rem;
    }
    .header_2>a{
        color:#fff;
        line-height:3rem;
    }
     .title_1{
        font-size:22px;
        color:#fff;
        margin-left:30%; 
        line-height:3rem;
    }
    /*输入框*/
    
    .zhanghao_1 , .mima_1{
        width:90%;
        text-align: center;
        border:1px solid #ddd;
        height:3rem;
        margin: auto;
        
    }
    .input_width_1{
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
    .checkbox_input_1>span{
        font-size:16px;
    }
</style>