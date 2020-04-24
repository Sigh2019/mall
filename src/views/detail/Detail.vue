<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @detailNavClick="detailNavClick" ref="detailNav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" @scrollTop="contentScroll" :probtype="3">
      <detail-swiper :top-img="topImg" ></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info  ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend"  class="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top  @click.native="backClick" v-show="showBackTop" ></back-top>
<!--    <toast></toast>-->
  </div>
</template>

<script>
  import {getDetailData,Goods,Shop,GoodsParam,getDetailRecommend} from "network/detail";
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"
  import GoodsList from 'components/content/goodsList/GoodsList'
  // import BackTop from 'components/content/backTop/BackTop' 用混入了
  // import Toast from "components/common/toast/Toast"

  import {debounce} from 'common/untils'
  import {backTopMinx} from 'common/mixin'

  import Scroll from "components/content/scroll/Scroll"

  export default {
    name: "Detail",
    mixins:[backTopMinx],
    data() {
      return {
        iid:null,
        topImg: [],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeY:[],
        themeYs:null,
        showBackTop:false,
        // message:'',
        // showToast:false
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      // BackTop,
      // Toast,
      Scroll
    },
    methods:{
      addCart(){
        const product = {}
        product.image = this.topImg[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        product.isActive = true
        //2.将商品添加到购物车里
        this.$store.dispatch("addCart",product)
            .then((res) =>{
              console.log(res);
              this.$toast.show(res)
          // this.message = res
          // this.showToast = true
          // setTimeout(() => {
          //   this.message = ''
          //   this.showToast = false
          // },1000)
        })

        console.log(this.$store.state.cartList);
      },
      imageLoad(){
        this.$refs.scroll.refresh()

        //保存对应的主题的offsetTopY值
        this.themeY = []
        this.themeY.push(0)
        this.themeY.push(this.$refs.param.$el.offsetTop)
        this.themeY.push(this.$refs.comment.$el.offsetTop)
        this.themeY.push(this.$refs.recommend.$el.offsetTop)
        this.themeY.push(Number.MAX_VALUE)
        // console.log(this.themeY)

      },
      // backClick(){
      //   this.$refs.scroll.backTop(0,0,333)
      // },
      contentScroll(position) {
        this.showBackTop = (- position.y)> 1000
        const positionY = -position.y
        for (let i = 0; i < this.themeY.length-1; i++){
          if (this.currentIndex !== i && (positionY >this.themeY[i] && positionY < this.themeY[i+1])) {
            this.$refs.detailNav.currentIndex = i;
          }
        }
      },
      detailNavClick(index) {
        // console.log('asss');
        this.$refs.scroll.bscroll.scrollTo(0,-this.themeY[index],333)
      }

    },
    created() {

      this.iid = this.$route.params.iid

      getDetailData(this.iid).then(res => {
        console.log(res);
        //获取详情页的轮播图片
        this.topImg = res.data.result.itemInfo.topImages
        //获取详情页的轮播图片下面的商品信息
        this.goods = new Goods(
            res.data.result.itemInfo,
            res.data.result.columns,
            res.data.result.shopInfo.services,)
        //获取商家店铺信息
        this.shop = new Shop(res.data.result.shopInfo)
        //获取详情页的评论以及下面的详情图片信息
        this.detailInfo = res.data.result.detailInfo
        //获取详情页的产品参数详情信息
        this.paramInfo = new GoodsParam(res.data.result.itemParams.info,res.data.result.itemParams.rule)
        //获取详情页的产品评论信息
        if(res.data.result.rate.cRate !== 0 ) {
          this.commentInfo = res.data.result.rate.list[0]
        }


      })
      //获取详情页的推荐的商品信息
      getDetailRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.data.list
      })
    },
    mounted() {

    }
  }
</script>

<style scoped>
.detail-nav-bar {
  z-index: 9;
  position: relative;
  background-color: #fff;
  left: 0;
  top: 0;
  right: 0;
}
#detail {
  height: 100vh;

}
.detail-scroll {
  z-index: 1;
  position: relative;
  height: calc(100% - 44px);
  background-color: #fff;
}
.recommend {
  padding-bottom: 49px;
}

</style>
