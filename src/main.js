import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store";
import VueLazyload from "vue-lazyload"
import FastClick from "fastclick"
import toastPlugin from "./components/common/toast";
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toastPlugin)

//图片懒加载
Vue.use(VueLazyload,{
  loading:require('assets/img/common/placeholder.png')
})

//解决移动前端点击300ms的延迟
FastClick.attach(document.body)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

