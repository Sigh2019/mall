<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImg">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  export default {
    name: "DetailSwiper",
    props:{
      topImg:Array
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>
