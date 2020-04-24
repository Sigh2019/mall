<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
.back-top{
  z-index: 999;
  position: fixed;
  right:15px;
  bottom: 70px;
}
  .back-top img{
    width: 44px;
    height: 44px;
  }
</style>
