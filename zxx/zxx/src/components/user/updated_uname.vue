<template>
        <div class="app-uname">
                <div class="header_z">
                        <router-link to="/member"><span class="mui-icon mui-icon-back"></span></router-link>
                        <span class="title">个人资料</span>
                    </div>
                    <div class="zhanghao">
                        <span>账户号</span>
                        <input type="text" disabled="disabled" id="input_width" placeholder="15119511079">
                    </div>
                    <div class="user_uname">
                        <span>姓名</span>
                    <input type="text" id="input_width" placeholder="郑进群">
                </div>
                
                <div class="zhanghao">
                        <span>手机</span>
                        <input type="number" id="input_width">
                    </div>
                    <div class="zhanghao">
                            <span>电话</span>
                            <input type="number" id="input_width">
                        </div>
                    <div class="email">
                            <span>邮箱</span>
                            <input type="email" id="input_width" placeholder="请输入邮箱">
                        </div>
            <!--记住-->
    
            <input text="button" style="
            height:3.6rem;border:0;text-align:center;width:90%;margin-left:1rem;background:#16a086;color: #fff;font-size:20px;margin-top:0.5rem; opacity:1;"value="保存"> 
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
    .header_z{
            height:3rem;
            background:#16a086;
            margin-bottom:1rem;
        }
        .header_z>a{
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
        
        .zhanghao , .user_uname , .email{
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
        border: 0px solid rgba(0, 0, 0, 1);
        border-radius: 3px;
        outline: none;
        background-color: #fff;
        }
        .checkbox_input>span{
            font-size:16px;
        }
    </style>