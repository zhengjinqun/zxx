<template>
    <div class="app-upwd">
            <div class="header_f">
                    <router-link to="/member"><span class="mui-icon mui-icon-back"></span></router-link>
                    <span class="title">会员注册</span>
                </div>
                <div class="zhanghao">
                    <span>旧密码</span>
                    <input type="text" id="input_width" placeholder="旧密码">
                </div>
                <div class="mima">
                    <span>新密码</span>
                <input type="password" id="input_width" placeholder="新密码">
            </div>
            <div class="zhanghao">
                <span>新密码</span>
                <input type="password" id="input_width" placeholder="确认密码">
            </div>
            
            
        <!--记住-->

        <mt-button style="width:90%;margin-left:1rem;background:#16a086;color: #fff;font-size:20px;margin-top:0.5rem; opacity: 0.5;">保存</mt-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{}
        }
    }
</script>
<style>
.header_f{
        height:3rem;
        background:#16a086;
        margin-bottom:1rem;
    }
    .header_f>a{
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
        height:4rem;
        margin: auto;
        
    }
    #input_width{
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
    .checkbox_input>span{
        font-size:16px;
    }
</style>