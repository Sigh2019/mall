<template>
<div id="category">
  <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">
    <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
    <scroll id="tab-content" @scrollTop="contentScroll" :probtype="3"
            ref="scroll">
      <div>
        <tab-content-category :subcategories="categoryData" />

        <tab-control :titles="['流行', '新款', '销量']"
                     @tabClick="tabClick" ref="tabControl"/>
        <goods-list :goods="showGoods"/>
      </div>
    </scroll>
      <back-top  @click.native="backClick" v-show="showBackTop" ></back-top>

    </div>

</div>
</template>

<script>
  import {getCategory,getSubcategory,getCategoryDetail} from "network/category";
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/content/scroll/Scroll"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from 'components/content/goodsList/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  import {debounce} from "common/untils";

  import TabMenu from "views/category/childComp/TabMenu"
  import TabContentCategory from "views/category/childComp/TabContentCategory"

  export default {
    name: "Category",
    data() {
      return {
        categories:[],
        categoryData:{},
        currentIndex:0,
        currentType:'pop',
        goods:{
          'pop':[],
          'new':[],
          'sell':[]
        },
        showBackTop:false,

      }
    },
    components:{
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      TabControl,
      GoodsList,
      BackTop
    },
    created() {
      //获取menu的数据
      this._getCategory()
    },
    mounted(){
      // const refresh =  debounce(this.$refs.scroll.refresh,300)
      // refresh()
    },
    methods:{
      tabClick(index){
        switch (index) {
          case 0 : this.currentType = 'pop'
            break
          case 1 : this.currentType = 'new'
            break
          case 2 : this.currentType = 'sell'
            break
        }
        // console.log(this.goods[this.currentType]);
      },
      backClick(){
        this.$refs.scroll.backTop(0,0,333)
      },
      contentScroll(position) {
        // this.$refs.scroll.refresh()
        const refresh =  debounce(this.$refs.scroll.refresh,300)
        refresh()
        this.showBackTop = (- position.y)> 600
      },

      _getCategory(){
        getCategory().then(res => {
          console.log(res);
          this.categories = res.data.data.category.list
          // 请求第一个分类的数据
          this._getSubcategories(0)
          // this._getCategoryDetail(0,'pop')
          this._getCategoryDetail(this.currentIndex ,'pop')
          this._getCategoryDetail(this.currentIndex ,'new')
          this._getCategoryDetail(this.currentIndex ,'sell')

        })
      },
      _getSubcategories(index) {
        const mailkey = this.categories[index].maitKey
          getSubcategory(mailkey).then(res => {
            this.categoryData = res.data.data
            console.log(res);
          })
      },
      _getCategoryDetail(index,type) {
        const miniWallkey = this.categories[index].miniWallkey
        getCategoryDetail(miniWallkey, type).then( res => {
          this.goods[type].push(...res.data)
          console.log(res);
          console.log(this.goods);
        })
      },
      selectItem(index) {
        this.currentIndex = index
        this._getSubcategories(index)
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType]
      }
    }
  }
</script>

<style scoped>
#category{
  height: 100vh;
}
.nav-bar {
  position: relative;
  z-index: 999;
  color: #fff;
  font-weight: 600;
  background-color: var(--color-tint);
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>
