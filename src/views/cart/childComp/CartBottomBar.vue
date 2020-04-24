<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="checkAllSelect" :value="isAllChecked"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{calculate}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
		name: "BottomBar",
    props:{
		  cartList:{
		    Array:{
		      type:Array,
          default:[]
        }
      }
    },
    data() {
		  return {

      }
    },
    components: {
		  CheckButton
    },

    methods:{
      checkAllSelect() {

        // for (let item of this.cartList) {
        //   console.log(item);
        //   if(!this.isAllChecked) {
        //     item.isChecked = true
        //   }else {
        //     item.isChecked = false
        //   }
        // }

        if(this.isAllChecked) {//全部选中
          this.cartList.forEach(item => item.isChecked = false)
        }else {//部分或全部不选中
          this.cartList.forEach(item => item.isChecked = true)
        }
      }
    },
    computed:{
      totalPrice() {
       return this.cartList.filter(item => item.isChecked).reduce((preValue,item) => {
         return preValue + item.count * item.price
       },0)
      },
      calculate() {
        return this.cartList.filter(item => item.isChecked).length
      },
      isAllChecked() {
        if(this.cartList.length === 0) return false
        // return !this.cartList.find(item => item.isChecked === false )
        return !this.cartList.find(item => !item.isChecked)


        // for(let item of this.cartList) { for 循环遍历也可以
        //   if(!item.isChecked) {
        //     return false
        //   }
        // }
        // return true
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
