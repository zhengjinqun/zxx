<template>
    <div class="app-register">
                <div class="header">
                    <router-link to="/Home"><span class="mui-icon mui-icon-back"></span></router-link>
                    <span class="title">会员注册</span>
                </div>
    <form action="">
                <div class="zhanghao">
                    <span>账号</span>
                    <input type="text" class="input_width" placeholder="请输入帐号(必填)" value="" v-model="name" @blur.prevent="chekeName()" />
                </div> 
                <div class="zhanghao" >
                    <span>密码</span>
                <input type="password" class="input_width" placeholder="请输入密码(必填)" value="" v-model="pwd">
                </div>
                <div class="zhanghao">
                    <span>密码</span>
                    <input type="password" class="input_width" placeholder="请输入确认密码(必填)" alue="" v-model="pwd2">
                </div>
        <!--记住
                <div class="checkbox_input">
                    <input type="checkbox" style="margin-left:-3rem;margin-top:1rem;">
                    <span>我已经阅读并同意</span>
                    <router-link to="">《会员注册协议》</router-link>
                </div>-->
            <mt-button style="width:90%;margin-left:1rem;background:#16a086;color: #fff;font-size:20px;margin-top:0.5rem; opacity: 0.5;" @click="handleReg">注册</mt-button>
    </form>
</div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                name:"",
                pwd:"",
                pwd2:"",
                isSumit:false
            }
        },
        methods: {
            chekeName(){
                var n = this.name;
                var url = "http://127.0.0.1:3000/existsName";
                    url+= "?name="+n;
                this.axios.get(url).then(result=>{
                    if(result.data.code > 0){
                        Toast("欢迎使用")
                        this.isSumit=true;
                    }else{
                        Toast("用户名被占用")
                        this.isSumit=false;
                    }
                })
            },
            handleReg(){
                if(this.isSumit === false){//禁止提交
                    Toast("用户名已存在,请修改");
                    return;
                }
                var n = this.name;
                var p = this.pwd;
                var p2= this.pwd2;
                //验证
                var regname = /^[a-z0-9_]{8,12}$/i;
                var regpwd = /^[a-z0-9]{8,12}$/i
                //验证用户名
                if(!regname.test(n)){
                    Toast("用户名格式不正确");
                    return;
                }
                //验证密码
                if(!regpwd.test(p)){
                    Toast("密码格式不正确");
                    return;
                }
                //验证密码以确认密码一致
                if(p !=  p2){
                    Toast("两次密码不正确，请修改");
                    return;
                }
                //3发送axios请求、
                var url = "http://127.0.0.1:3000/register?";
                    url+= "name="+n;
                    url+= "&pwd="+p;
                this.axios.get(url).then(result=>{
                    Toast(result.data.msg)
                })
            }
        },
    }
</script>
<style>
.header{
        height:3rem;
        background:#16a086;
        margin-bottom:1rem;
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
        height:4rem;
        margin: auto;
        border:1px solid #ddd;
        line-height: 4rem;
    }
    .input_width{
        width: 75% !important;
        border:0 !important;
    }
    .input_width{
    line-height:4rem;
    margin-top:0.7rem;
    width: 71%;
    height: 43px;
    margin-bottom: 2px;
    padding: 10px 15px;
    -webkit-user-select: text;
    border: 0px solid rgba(0, 0, 0, .2);
    border-radius: 3px;
    outline: none;
    background-color: #fff;
    } 
    .zhanghao>span{
        font-size:16px;
         display: block; 
         float: left;
         text-indent: 20px;
    }
</style>