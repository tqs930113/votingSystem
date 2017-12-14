// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入element ui
// import axios from 'axios' // 进入ajax
// import VueQuillEditor from 'vue-quill-editor' // 引入富文本编辑器组件
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import echarts from 'echarts'  // 引入echarts插件

Vue.config.productionTip = false
// Vue.prototype.$ajax = axios
// Vue.prototype.$echarts = echarts

Vue.use(element)
// Vue.use(VueQuillEditor)
/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
