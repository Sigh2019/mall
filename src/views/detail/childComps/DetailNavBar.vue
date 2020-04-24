<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in navInfo"
             @click="navClick(index)"
             class="titles-item " :class="{active:currentIndex === index}" >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    data() {
      return {
        navInfo:["商品",'参数','评论','推荐'],
        currentIndex:0
      }
    },
    components:{
      NavBar
    },
    methods:{
      backClick() {
        this.$router.back()
      },
      navClick(index) {
        this.currentIndex = index
        this.$emit("detailNavClick",index)
      }
    }
  }
</script>

<style scoped>
.titles {
  display: flex;
}
  .titles-item {
    font-size: 13px;
    flex: 1;
  }
  .back {
    margin-top: 7px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
