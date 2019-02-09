<template>
    <div class="app-shop">
    <!--头部-->
    <div style="position: relative;clear: both;margin-bottom:3rem;">
        <div class="header_y">
            <router-link to="/Home"><span class="mui-icon mui-icon-back"></span></router-link>
            <span class="title">购物车</span>
            <a style="float:right;margin-right:1rem;" id="icon-home"><span class="mui-icon mui-icon-home" style="font-size:30px;margin-top:0.2rem;"></span></a>
        </div>
    </div>
        <!--购物车-->
        <div class="gwc" v-for="(item,index) in list" :key="index">
            <input type="checkbox" v-model="item.isChecked"   style="margin-top:4rem;margin-left:1rem;" >
            <div class="image">
                <img src="./img/3.jpg" style="width:100%;height:100%;" alt="">
            </div>
            <div class="float_right">
                <span>{{item.title}}</span>
                <router-link to=""><span :data-id="item.id" @click="gwc_delete"  class="mui-icon mui-icon-trash"></span></router-link>
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
    <div style="margin-top:5rem;">
    <div class="bottom_fixed">
        <div style="margin-top: 2rem;float: left;margin-left:0.5rem;">
        <input type="checkbox" v-model="AllChecked" @click="checkAll">
        <span style="margin-right:1rem;">全选</span>
        <span style="margin-right:0.2rem;">总计：</span>
        <span style="color:#16a086;">¥</span>
        <span  style="color:#16a086;">{{totalPrice}}</span>
        <!-- <span v-else style="color:#16a086;">0</span>-->
        </div>
        <router-link  class="jiesuan" to="" style="margin-top:1rem;">结算({{getTotal}})</router-link>
        <!--<router-link v-else class="jiesuan" to="" style="margin-top:1rem;">结算(0)</router-link>-->
    </div>
</div> 
</div>
</template>
<script>
import {Toast} from 'mint-ui'
 
export default {
    data(){
        return{
            list:[],
            //选中的商品数量
            // total:0,
            //商品总价
            totalPrice:0,
            //商品总数量
            totalcount:0,
            //是否已选中
            AllChecked:false,  
            // isChecked:[],    
        }
    },
    created() {
    this.pid = this.$route.params.pid;
    this.chaxun();
},
//计算属性
computed: {
      //计算
      getTotal(){
        //数量
        let count=0;
        let check=0;
        //商品的价格
        var  totalPrice=0;
        //拿到数组遍历
        var  list=this.list;
        if(!list){
            return
        }
        list.forEach((item,i)=>{
            if(item.isChecked){
                count+=item.count;
                check++;
                console.log(count);
                totalPrice += item.count * item.price;
            }
        });
        this.totalPrice = totalPrice;
        // this.total =count;
        this.AllChecked = check === this.list.length;
        console.log(this.AllChecked)
        return count;
      },
},

methods: {
    //全选和反全选
    checkAll(){
       let list = this.list;
       if(!list){
            return
        }
       if(this.AllChecked==false){
        this.AllChecked=true;
            list.forEach(item=>{
                item.isChecked=1;
            })
       }else if(this.AllChecked==true){
        this.AllChecked=false;
        list.forEach(item=>{
               item.isChecked=0;
           })
        }
   },
//购物车加减更新
add_cart(e){
    var  id = e.target.dataset.id;
    var count = this.list[0].count;
    console.log(count)
    var url = "http://127.0.0.1:3000/update_one";
    this.axios.get(url,{params:{id:id,count:count}}).then(result=>{
        if(result.data.code>0){
            Toast(result.data.msg)
        }
    })
},
//加减
jianhao(e){
    var id=e.target.dataset.id;
    for(var i=0;i<this.list.length;i++){
            var item=this.list[i];
            console.log(item.id)
        if(item.id==id && item.count>1){
            item.count--;
            this.add_cart(e);
        }
    }
},
jiahao(e){
    var id=e.target.dataset.id;
    for(var i=0;i<this.list.length;i++){
        var item=this.list[i];
        if(item.id==id){
            item.count++;
            this.add_cart(e);
        }
    }
},
chaxun(){
    var url="http://127.0.0.1:3000/getCartList";
    this.axios.get(url).then(result=>{
        this.list = result.data.data;
    })
   
},

//购物车删除
    gwc_delete(e){
         //获取e.target.dataset的id
        var id = e.target.dataset.id;
        console.log(id)
        var url="http://127.0.0.1:3000/cart_delect?id="+id;
        this.axios.get(url).then(result=>{
            Toast(result.data.msg);
            this.chaxun();
        })
    }
},
}
</script>
<style>
    .app-shop{
        position:relative
    }
    .header_y{
        height:3rem;
        background:#16a086;
        margin-bottom:1rem;
        position:fixed; 
        width:100%;
        top:0;
        z-index:1;
    }
    .header_y>a{
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
        z-index:1;
        background:#fff;
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
    border:1px solid #ddd;
    position: relative;
    }
.image{
    width:6rem;
    height:6rem;
    margin-top:1rem;
    /* border:1px solid red; */
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