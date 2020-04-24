<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index"
  export default {
    name: "HomeSwiper",
    data() {
      return {
        isImgLoad:true
      }
    },
    props:{
      banners:{
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad() {
        if (this.isImgLoad) {
          this.$emit("swiperImgLoad")
          this.isImgLoad = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
