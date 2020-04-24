import {debounce} from "common/untils";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh,100)

    this.itemImgListener = () => {
      newRefresh()
    }

    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

export const backTopMinx = {
  data() {
    return {

    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.backTop(0,0,333)
    }
  }
}
