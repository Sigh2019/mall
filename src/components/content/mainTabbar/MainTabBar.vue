<template>
  <tabbar>
    <tabbarItem path="/home" activeColor="aqua" >
      <img slot="slot-img" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="slot-img-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="slot-text">首页</div>
    </tabbarItem>

    <tabbarItem path="/category" >
      <img slot="slot-img" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="slot-img-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="slot-text">分类</div>
    </tabbarItem>

    <tabbarItem path="/cart" >
      <img slot="slot-img" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="slot-img-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="slot-text">购物车</div>
    </tabbarItem>

    <tabbarItem path="/profile" >
      <img slot="slot-img" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="slot-img-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="slot-text">我的</div>
    </tabbarItem>
  </tabbar>
</template>

<script>
  import tabbar from "components/common/tabbar/Tabbar"
  import tabbarItem from "components/common/tabbar/TabbarItem"
  export default {
    name: "MainTabBar",
    components:{
      tabbar,
      tabbarItem
    }
  }
</script>

<style scoped>

</style>
