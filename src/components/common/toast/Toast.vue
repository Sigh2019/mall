<template>
  <div class="toast" v-show="showToast">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props:{
    //   message:{
    //     type:String,
    //     default:''
    //   }
    // },
    data() {
      return {
        message:'',
        showToast:false
      }
    },
    methods:{
      show(message,duration = 1000) {
        this.message = message
        this.showToast = true

        setTimeout(() => {
          this.message = ''
          this.showToast = false

        },duration)
      }
    }
  }
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  padding:5px 5px ;
  background-color: rgba(0,0,0,0.75);
  transform: translate(-50%,-50%);
  z-index: 9990;
}
</style>
