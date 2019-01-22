<template>
    <div class="app-shop">
    <!--头部-->
        <div class="header">
            <router-link to="/Home"><span class="mui-icon mui-icon-back"></span></router-link>
            <span class="title">购物车</span>
            <a style="float:right;margin-right:1rem;" id="icon-home"><span class="mui-icon mui-icon-home" style="font-size:30px;margin-top:0.2rem;"></span></a>
        </div>
        <!--购物车-->
        <div class="gwc" v-for="item in list" :key="item.id">
            <input type="checkbox" style="margin-top:4rem;margin-left:1rem;">
            <div class="image">
                <img src="./img/3.jpg" style="width:100%;height:100%;" alt="">
            </div>
            <div class="float_right">
                <span>{{item.title}}</span>
                <router-link><span @click="delect" class="mui-icon mui-icon-trash"></span></router-link>
            </div>
            <div class="float_right1">
                    <div class="mui-numbox">
                        <button @click="jianhao" :data-id="item.id" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                        <input class="mui-input-numbox" type="number" v-model="item.count"/>
                        <button @click="jiahao" :data-id="item.id" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                    </div>
                <span>¥{{item.count*item.price}}</span>
            </div>
        </div>
        <!--<div class="gwc" style="margin-top:0;">
                <input type="checkbox" style="margin-top:4rem;margin-left:1rem;">
                <div class="image">
                    <img src="./img/3.jpg" style="width:100%;height:100%;" alt="">
                </div>
                <div class="float_right">
                    <span>天然甜桂圆</span>
                    <a><span class="mui-icon mui-icon-trash"></span></a>
                </div>
                <div class="float_right1">
                        <div class="mui-numbox">
                                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                <input class="mui-input-numbox" type="number" value="1"/>
                                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                            </div>
                   
                    <span>¥8.00</span>
                </div>
            </div>-->
        <!--底部固定-->
    <div class="bottom_fixed">
        <div style="margin-top: 2rem;float: left;margin-left:0.5rem;">
        <input type="checkbox">
        <span style="margin-right:1rem;">全选</span>
        <span style="margin-right:0.2rem;">总计：</span>
        <span style="color:#16a086;">¥</span>
        <span style="color:#16a086;">{{my_count}}</span>
        </div>
        <router-link class="jiesuan" to="" style="margin-top:1rem;">结算({{my_count1}})</router-link>
    </div>
    </div>
</template>
<script>
export default {
computed: {
    my_count:function(){
        var sum = 0;
        for(var i=0;i<this.list.length;i++){
            var item=this.list[i];
            console.log(item)
            sum+=item.count*item.price;
        }
        return sum
    },
my_count1:function(){
    var sum = 0;
    for(var i=0;i<this.list.length;i++){
        var item=this.list[i];
        console.log(item)
        sum+=item.count;
    }
    return sum
},
},
created() {
    this.pid = this.$route.params.pid;
    this.chaxun();
},
data(){
    return{
    list:[],
    }
},
methods: {
    //加减
jianhao(e){
    var id=e.target.dataset.id
    for(var i=0;i<this.list.length;i++){
            var item=this.list[i];
            console.log(item.id)
        if(item.id==id && item.count>1){
                item.count--;
        }
    }
},
jiahao(e){
    var id=e.target.dataset.id;
        for(var i=0;i<this.list.length;i++){
            var item=this.list[i];
            if(item.id==id){
                item.count++;
        }
    }
},
chaxun(){
    var url="http://127.0.0.1:3000/getCartList";
    this.axios.get(url).then(result=>{
        this.list = result.data.data;
        console.log(this.list)
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
        position:fixed;
        width:100%;
        top:0;
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
    .bottom_fixed{
        border: 1px solid #ddd;
        position: fixed;
        width:100%;
        height:5rem;
        bottom: 0;
    }
    /* 购物车底部 */
    .jiesuan{
        display:block;
        width:8rem;
        height:3rem;
        background:#16a086;
        color:#fff;
        float: right;
        margin-right: 1rem;
        text-align: center;
        line-height:3rem;
    }
.gwc{
    width:100%;
    height:8rem;
    border:1px solid red;
    margin-top:3.2rem;
    position: relative;
    }
.image{
    width:6rem;
    height:6rem;
    margin-top:1rem;
    border:1px solid red;
    float:right;
    margin-right: 14rem;
}
/*购物车详情*/
.float_right>span{
    margin-right:2rem;
   
}
.float_right,.float_right1{
    float:right;
    margin-top: -6rem;
    margin-right:0.5rem !important;
}
.float_right1{
    margin-top:-2rem !important;
  
}
.float_right1>span{
    color:#16a086;
    margin-left:10.5rem;
    margin-top:-1.5rem;
    position: absolute;
    }
.mui-numbox{
    margin-top:-0.2rem;
    margin-right:5.5rem; 
}
</style>