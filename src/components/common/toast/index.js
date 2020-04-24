import Toast from "./Toast"
const toastPlugin = {}
toastPlugin.install = function (Vue) {
  //创建组件构造器
  const constractor = Vue.extend(Toast)
  // new 的方式 ，可以根据组件构造器，创造出一个组件对象

  const toast = new constractor()
  // console.log(toast);

    ///将创建出来的组件对象挂载到某个div中
    toast.$mount(document.createElement('div'))
    //将toast.$el添加到body中
    document.body.appendChild(toast.$el)
     Vue.prototype.$toast = toast
}

export default toastPlugin
