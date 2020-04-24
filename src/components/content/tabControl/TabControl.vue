<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item">
      <span :class="{active:currentIndex === index}" @click="itemClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default() {
          return []
        }
      }
    },
    methods:{
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick',index )
      }
    }
  }
</script>

<style scoped>
.tab-control{
  position: sticky;
  top: 44px;
  display: flex;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item{
  height: 40px;
  line-height: 40px;
  text-align: center;
  flex: 1;
}
.active {
  padding: 3px;
  border-bottom:solid 4px var(--color-tint) ;
}
</style>
