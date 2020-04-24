const actions = {

  addCart({state,commit},payload) {
    // let oldProduct = null
    // for(let i of state.cartList) {
    //   if (i.iid === payload.iid ) {
    //     oldProduct = i
    //   }
    // }
    // if(oldProduct) {
    //   oldProduct.count += 1
    // }else {
    //   state.cartList.push(payload)
    //   payload.count = 1
    // }  这种方法也可以往shopCatDatas里面push商品
    return new Promise((resolve,reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)//这句代码和上面for循环效果一样
      if (oldProduct) {
        commit("addCounter",oldProduct)
        resolve("当前商品数量+1")
      }else {

        payload.count = 1
        payload.isChecked = true
        commit("addToCart",payload)
        resolve("加入购物车成功")
      }

    })
  }
}
export default actions
