<template>
    <div class="tabbar-item" @click="itemClick">
      <div v-if="!isactive"><slot name="slot-img"></slot></div>
      <div v-else><slot name="slot-img-active"></slot></div>
      <div :style="activeStyle"><slot name="slot-text"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "TabbarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:"red"
      }
    },
    data() {
      return {

      }
    },
    methods:{
      itemClick() {
        if(!this.isactive) {
          this.$router.replace(this.path)
        }
      }
    },
    computed:{
      isactive() {
        // return this.$route.path.indexOf(this.path) !== -1  下面这种也可以
        return this.$route.path === this.path
      },
      activeStyle() {
        return this.isactive ? {color:this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tabbar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tabbar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
