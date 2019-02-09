<template>
    <div>
        <mt-header fixed title="商品列表"></mt-header>
        <!-- 商品列表 -->
        <div class="flex_item">
            <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id"> 
					<router-link to="">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
                            {{item.title}}
                            <a><span class="mui-icon-extra mui-icon-extra-cart"></span></a>
							<p class='mui-ellipsis'>
                                <span>{{item.ctime}} </span>
                                <span>点击: {{item.point}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
            </ul>
   <mt-button size="large" type="primary" @click="getMore()">加载更多</mt-button>
        </div>
    <my-tabbar></my-tabbar>
    </div>
</template>
<script>
import tabbar from '../sub/bottom_tabbar.vue'
export default {
    components:{
        "my-tabbar":tabbar
    },
    data(){
        return{
            list:[],        //返回数据
            pageIndex:0,     //当前页码
            pageSize:7,       //页大小
            pageCount:1        //总页数
        }
    },
    created() {
        this.getMore();
    },
    methods:{
        //加入购物车
        productCart(){
            // var url
        },
        getMore(){
            //加载下一页
            //pageIndex自增
            this.pageIndex++;
            //获得单曲页和页大小
            var pno = this.pageIndex;
            var ps  = this.pageSize;
            //发送ajax请求。拿回数据
            var url = "http://127.0.0.1:3000/getNews?pno="+pno+"&pageSize="+ps;
            this.axios.get(url).then(result=>{
                var rows = this.list.concat(result.data.data);
                console.log(rows)
                this.list = rows;
                this.pageCount = result.data.pageCount;
            })
        }
    },
}
</script>
<style>
    .mint-header{
       background-color:#16a086 !important;
     }
    .flex_item {
        margin-bottom:3.2rem;
        margin-top:2.5rem;
    }
    .flex_item .mui-ellipsis{
    display:flex;    /*弹性布局*/
    font-size:12px;  /*字体*/
    color:#16a086;   /*颜色*/
    justify-content:space-between;/*两端对齐*/
  }
  .mint-button--primary{
      background-color:#16a086;
  }
.mui-table-view-cell{
    height:8rem;

}
.mui-table-view-cell > a:not(.mui-btn){
    margin:16px -15px;
}
.mui-media-body>a{
    display: block;
    float: right;
    margin-left:-1.2rem; 
}
</style>