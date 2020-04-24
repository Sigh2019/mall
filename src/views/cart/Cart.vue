<template>
  <div>
    <cart-nav-bar class="cart-nav-bar"><div slot="center">购物车({{cartCount}})</div></cart-nav-bar>
    <cart-list :cartList="cartList"></cart-list>
    <cart-bottom-bar :cartList="cartList"></cart-bottom-bar>
  </div>
</template>

<script>
  import CartNavBar from "components/common/navbar/NavBar"
  import CartList   from "./childComp/CartList"
  import CartBottomBar  from "./childComp/CartBottomBar"
  import {mapGetters} from "vuex"
  export default {
    name: "Cat",
    components:{
      CartNavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(["cartList","cartCount"])
    }
  }
</script>

<style scoped>
.cart-nav-bar{
  position: relative;
  z-index: 99;
  color: #fff;
  background-color: var(--color-tint);
}
</style>
