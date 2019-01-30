<template>
    <div class="app_tabbar">
        <nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item mui-active" href="#tabbar">
                <p><span class="mui-icon mui-icon-home"></span></p>
				<span class="mui-tab-label">首页</span>
            </router-link>
			
			<router-link to="/product" class="mui-tab-item" href="#tabbar-with-contact">
          <p><span class="mui-icon-extra mui-icon-extra-xiaoshuo"></span></p>
          <span class="mui-tab-label">产品列表</span>
			</router-link>
            <router-link to="/shop_cart" class="mui-tab-item" href="#tabbar-with-chat">
				<p><span class="mui-icon-extra mui-icon-extra-cart"></span></p> 
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item" href="#tabbar-with-map">
				<p><span class="mui-icon mui-icon-contact"></span></p>
				<span class="mui-tab-label">个人</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .app_tabbar{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .app_tabbar p{
        margin-bottom:0;
    }
    nav>a>span{
        font-size:12px;
        color:#333;
    }
</style>