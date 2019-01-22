<template>
<div class="app-details">
<div  class="mt-header">
    <router-link to="/home" class="line_height"><span class="mui-icon mui-icon-arrowleft"></span></router-link>
    <a id="icon-more"><span class="mui-icon mui-icon-more"></span></a>
    <a class="line_height1"><span class="mui-icon-extra mui-icon-extra-cart"></span></a>
</div>
<!--图片-->
<div style="width:141%;">
       <mt-swipe class="lunbo" :auto="2500">
        <mt-swipe-item v-for="item,i in list" :key="i">
            <img :src="item"/>
        </mt-swipe-item>
     </mt-swipe>
 </div>
<!--商品价格-->
<div v-for="bl_details in details" :key="bl_details.id">
<div style="color:#fff;position:absolute;top:22rem;left:2rem;">{{bl_details.title}}</div>
<div class="price">
    <div class="float_price">¥{{bl_details.price}}</div>
    <div class="float_price1">
    <a>
    <span class="mui-icon mui-icon-starhalf"></span>
    <p>收藏</p>
    </a>
    </div>
    <div class="float_none">
        <span>市场价格:</span>
        <span class="text_decoation">¥{{bl_details.price_one}}</span>
    </div>
</div>
<!--快速发货-->
<div class="fahuo">
    <a class="border_raduis">
    <span class="mui-icon mui-icon-checkmarkempty"></span>
    </a>
    <span class="font_size">正品保障</span>
    <a class="float_right"><span class="mui-icon mui-icon-forward"></span></a>
    </a>
    <a class="border_raduis" style="margin-left:1rem;">
    <span class="mui-icon mui-icon-checkmarkempty"></span>
    </a>
    <span class="font_size">快速发货</span>
    </a>
</div>

<!--商品详情-->

<ul class="">
    <li class="line_decoration">产品详情</li>
    <li>产品参数</li>
    <li>产品评论</li>
</ul>
<div class="content" style="margin-left:1rem;">
    <p class="lianjie">
    <span>{{bl_details.details_a}}</span></p>
    <p style="width:140%">
        <p class="lianjie">{{bl_details.details_a}}</p>
        <p class="lianjie">{{bl_details.details_b}}</p>
        <p class="lianjie">{{bl_details.details_c}}</p>
        <p class="lianjie">{{bl_details.details_d}}</p>
        <p class="lianjie">{{bl_details.details_e}}</p>
        <p class="lianjie">{{bl_details.details_f}}</p>
        <p class="lianjie">{{bl_details.details_i}}</p>
        <p class="lianjie">{{bl_details.details_g}}</p>
        <p class="lianjie">{{bl_details.details_k}}</p>
    </p>
</div>
</div>
 <!--<div class="gongneng" style="text-indent: 1em;margin-bottom:1rem;">
    <span>{{bl_details.details_v}}</span>
    <a>编辑</a>
    </div>
<div class="content">
        <p style="width:140%;text-indent: 2em">
        <span>{{bl_details.details_aa}}</span>
         <router-link class="lianjie" to="">{{bl_details.details_bb}}</router-link>
         <span>{{bl_details.details_cc}}</span>
         <router-link class="lianjie" to="">{{bl_details.details_dd}}</router-link>
        <span>{{bl_details.details_ee}}</span>
    </p>
</div>
<div class="gongneng" style="text-indent: 1em;margin-bottom:1rem;">
     <span>{{bl_details.details_ff}}</span>
     <a>编辑</a>
     </div>
 <div class="content">
         <p style="width:140%;text-indent: 2em">
        <span>{{bl_details.details_gg}}</span>
    </p>
 </div>-->


<!--底部购买-->
<div class="fixed">
    <a @click="showCout" class="jiaru">
    <span>加入购物车</span>
    </a>
    <a class="like"><span>立刻购买</span></a>
</div>
<div class="show_hide">
  <div class="float_left"  v-for="bl_details in details" :key="bl_details.id">
      <div><img style="width:100%" src="http://127.0.0.1:3000/img/1.jpg" alt=""></div> 
      <div>
          <p>{{bl_details.title}}</p>
        <p>¥{{bl_details.price*count}}</p>
    </div>
    <div @click="showCout_1" class="qixiao">x</div>
    </div>
    

   <!-- 购买数量 -->
   <div class="flex_apse">
   <div>购买数量</div>
   <div class="mui-numbox">
        <button @click="jianhao" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number"  v-model="count">
        <button @click="jiahao" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</div>
<!-- 确认 -->
<div @click="add_cart" class="qieding">确定</div>
</div>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pid: 0,
            list:[],
            details:[],
            price:this.price,
            count:1,
        }
    },
    //当组件对象创建成功后即可发送ajax请求
    created() {
        this.pid = this.$route.params.pid;        
        this.getImages();
        this.get_details();
       
    },

    methods:{
        //加减
       jianhao(){
            if(this.count>1){
               this.count--;
            }
        }, 
        jiahao(){
           this.count++;
        },
        // 添加到购物车
        add_cart(){
            var pid = this.pid;//商品编号
            var title = this.title;
            var count =this.count;//商品数量
            var price =this.price;//商品价格
            console.log(pid);
            console.log(title);
            console.log(count);
            console.log(price);
            var url = "http://127.0.0.1:3000/addCart";
            this.axios.get(url,{
                params:{pid:pid,title:title,price:price,count:count}
            }).then(result=>{
                if(result.data.code > 0){
                    Toast(result.data.msg);
                }else{
                    Toast(result.data.msg);
                }
            })
        },
        showCout(){
            var show = document.querySelector(".show_hide");
            show.style.display="block";
        },
        showCout_1(){
            var hide = document.querySelector(".show_hide");
                hide.style.display="none";
        },
        getImages(){
            //完成一个功能,获取服务器端轮播图片
            //1:发送ajax请求
            var url = "http://127.0.0.1:3000/getImages1/"+this.pid;
            this.axios.get(url).then(result=>{
               // console.log(result.data.data[0].pic)
                this.list = result.data.data[0].pic;
                // this.list=JSON.parse(result.data.data[0].pic)
                var a=JSON.parse(this.list);
                 this.list=a;
                 console.log(this.list)
            })
            //2:获取返回数据保存list
        },
        get_details(){
            console.log(this.pid);
            var url = "http://127.0.0.1:3000/details/"+this.pid;
            this.axios.get(url).then(result=>{
                console.log(result.data)
                this.details = result.data.data;
                this.title=result.data.data[0].title;
                console.log(this.title)
                this.price=result.data.data[0].price;
                console.log(this.price)
            })
        },
    },
   
}
</script>
<style>
.app-details{
    position:absolute;
}
.mt-header{
   width:100%;
   height:3rem;
   background:#000;
   opacity:0.1;
   position:fixed;
   top:0px;
   z-index:9999;
}
 /*购买数量*/
.qieding{
    clear: both;
     width:96%;
     height:3rem;
     background:#16a086;
     height:3rem;
     margin-left:2%;
     margin-top: 1rem;
     text-align: center;
     line-height: 3rem;
 }
 .flex_apse{
     clear: both;
     width:100%;
     display: flex;
     align-items: center;
     justify-content: space-between;
     margin-top:12rem; 
 }
/*购物车*/
.show_hide .float_left{
    float: left;
    width:100%;
    border-bottom:1px solid #16a086;
    
}
.float_left>div:nth-child(2){
    float: left;
    margin-top:3rem;
    margin-left:1rem;
    width:6rem;
    height:8rem;
}
.show_hide .float_left>div:nth-child(1){
    float: left;
    margin-left:1rem;
    margin-top:2rem;
    width:5rem;
    height:8rem;
}
.qixiao{
    float:right;
    width:2rem;
    height:2rem;
    border: 1px solid #333;
    border-radius: 50px;
    text-align: center;
    line-height:2rem;
}
.show_hide{
    width:100%;
    height:20rem;
    background: #ddd;
    bottom: -30px;
    z-index: 11111;
    position:fixed;
    display: none;
}
.mt-header span{
    color:#000;
}
 #icon-more,.line_height,.line_height1{
     display:block;
     float:left;
     text-align:center;
    width:2rem;height:2rem;
    border-radius:50%;
    background:#fff;
    margin-top:0.5rem;
    line-height:2rem;
    }
 #icon-more,.line_height1{
     float:right !important;
 }
 #icon-more{margin-right:1rem;}
 .line_height1{margin-right:1rem;}
 /*商品图片 */
.lunbo img{
    width:100%;
    height:25rem;
}
.lunbo{height:25rem;}
/*商品价格*/
.price{
    width:141%;
    height:6rem;
    background:#ddd;
}
.float_price{
    float:left;
    color:#16a086;
    font-size:28px;
    line-height:4.1rem;
    margin-left:1rem;
}
.float_price1{
    float:right;
    color:#ddd;
    margin-right:1rem;
    margin-top:0.2rem;
}
.float_price1>a>p{font-size:14px;}
.float_price1>a>span{
    font-size:28px;
    color:#2e3231;
}
.float_none{
    clear:both;
    margin-left:1rem;
    opacity:0.5;
    }
.float_none>.text_decoation{
    text-decoration:line-through;
}
/*发货*/
.fahuo{
    width:135%;
    height:3rem;
    margin-left:1rem;
    margin-bottom:1rem;
}
.border_raduis{
    border:1px solid #16a086;
    border-radius:50%;
    line-height:3rem;
}
.fahuo>a>span{
    color:#16a086;
}
.fahuo>.font_size{
    opacity:0.5;
    font-size:16px;
}
.fahuo>.float_right{
    float:right;
    margin-right:1rem;
    line-height:3rem;
    
}
.fahuo>.float_right>span{
color:#000;
}
/*商品详细*/
ul{
   
    height:3rem;
    line-height:3rem;
    width:130%;
    margin-left:1rem;
    display:flex;
    flex:flex;
    justify-content:space-between;
    list-style:none;
    padding:0;
    }
.content{
    width:15.6rem;
}
.content .lianjie{
    width:130%;
    color: #136ec2;
    text-decoration: none;
    font-family: arial, 宋体, sans-serif;
    font-size: 1rem;
    line-height: 2.2rem;
    background-color: #ffffff;
}
.content p span{
    color: #333333;
    font-family: arial, 宋体, sans-serif;
    font-size: 1rem;
    line-height: 1.2rem;
    background-color: #ffffff;
}
.gongneng{margin-top:2rem;width:140%;}
.gongneng>span{
    font-size:26px;
}
.gongneng>a{
   color:#ddd;
   text-decoration:underline;
   float:right;
}
ul>.line_decoration{
    padding-bottom:1rem;
    color:#16a086;
    border-bottom:2px solid ;
}
/*底部固定*/
.fixed{
    position: fixed;
    z-index:666;
    width:100%;
    height:4.5rem;
    border:1px solid #ddd;
     bottom:0px;
     overflow:hidden;
     background:#fff;
}
.fixed>a{
    text-align:center;
    display:block;
    float:left;
    width:46%;
    border:2px solid #16a086;
    height:70%;
    line-height:70%;
    margin-top: 0.7rem;
    margin-left: 0.6rem;
}
.fixed>a>span{
    display:block;
    margin-top:10%;
    color:#16a086;
    }
.fixed>.like{
    background:#16a086;
  
}
.fixed>.like>span{
  color:#fff !important;
}
</style>