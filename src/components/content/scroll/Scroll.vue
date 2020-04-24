<template>
     <div class="wrapper" ref="wrapper">
       <div class="content"><slot></slot></div>
     </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probtype:Number,
      pullUpLoad:Boolean,
    },
    data() {
      return {
        bscroll:null,
      }
    },
    mounted() {
      this.bscroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probtype,
        pullUpLoad:this.pullUpLoad
      })

      this.bscroll.on('scroll',position => {
        this.$emit('scrollTop',position)
      })

      this.bscroll.on('pullingUp',() => {
        this.$emit('pullUpLoad')
      })

    },
    methods:{
      backTop(x,y,time) {
        this.bscroll.scrollTo(x,y,time)
      },
      finishUpLoad() {
        this.bscroll.finishPullUp()
      },
      refresh() {
        // console.log('this.bscroll');
        this.bscroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
