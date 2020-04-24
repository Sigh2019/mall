<template>
  <div id="home">
    <nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                 v-show="showTabControl" ref="topTabControl"
                  ></tab-control>
    <scroll class="content" ref="scroll" :probtype="3" :pull-up-load="true"
            @pullUpLoad="loadMore"
            @scrollTop="contentScroll">
        <home-swiper :banners="banners" @swiperImgLoad="getTabControlOffsetTop"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view class="feature"></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                     ref="tabControl"
                     @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  import HomeSwiper from "views/home/childComps/HomeSwiper"
  import RecommendView from "views/home/childComps/RecommendView"
  import FeatureView from "views/home/childComps/FeatureView"

  import {debounce} from "common/untils"
  import Scroll from "components/content/scroll/Scroll"

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "network/home";


  export default {
    name: "Home",
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]}
        },
        currType:'pop',
        showBackTop:false,
        showTabControl:false,
        tabControlOffsetTop:0,
        saveY:0
      }
    },
    components:{
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      BackTop,
      Scroll,
      RecommendView,
      FeatureView
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on("imgLoad",() =>{
        // this.$refs.scroll.refresh()
        refresh()

      })


    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.bscroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.bscroll.y
    },
    methods:{
      //防抖//节流
      // debounce(func) {
      //   let timer = null
      //   return function (...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(()=>{
      //       func.apply(this,args)
      //     },300)
      //   }
      // },
      tabClick(index){
        switch (index) {
          case 0 : this.currType = 'pop'
            break
          case 1 : this.currType = 'new'
            break
          case 2 : this.currType = 'sell'
            break
        }
         this.$refs.topTabControl.currentIndex = index
         this.$refs.tabControl.currentIndex = index

      },
      backClick(){
        this.$refs.scroll.backTop(0,0,333)
      },
      contentScroll(position) {
        this.showBackTop = (- position.y)> 1000
        // this.showTabControl = (- position.y)> 545 这种做法不能适配多种机型
        this.showTabControl = (- position.y) > this.tabControlOffsetTop
      },
      //获取tabcontrol的offsettop
      getTabControlOffsetTop() {
        this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop

      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        }).catch(err => {
          console.log(err);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
        })
      },
      loadMore() {
        this.getHomeGoods(this.currType)
        this.$refs.scroll.finishUpLoad()

      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currType].list
      }
    }
  }
</script>

<style scoped>
#home{
  position: relative;
  padding-top: 44px;
  height: 100vh;
}

.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color:var(--color-tint) ;
  color: #fff;
}
.showTabControl{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
.feature img {
  width: 100%;
}
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
