// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入element ui
import axios from 'axios' // 进入ajax
import cookieUntil from './assets/js/cookieUntil'
import API from './assets/js/API'
// import VueQuillEditor from 'vue-quill-editor' // 引入富文本编辑器组件
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import echarts from 'echarts'  // 引入echarts插件

const api = new API()
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
// Vue.prototype.$echarts = echarts

Vue.use(element)
// Vue.use(VueQuillEditor)
/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: {
    App
  },
  beforeMount () {
    // 加载页面之前先判断设置登录用户的token信息并存入document.cookie中
    api.checkToken('token', this, 1)
    this.addInterceptors()
  },
  data: {
    // token: ''
  },
  methods: {
    addInterceptors () {
      var that = this
      var CancelToken = axios.CancelToken
      var source = CancelToken.source()
      axios.interceptors.request.use(
        config => {
          var token = ''
          // 获取cookie中存放的token的值
          if (cookieUntil.get('token')) {
            token = cookieUntil.get('token')
          }
          if (token) {
            config.headers.common.token = token
            return config
          }
          source.cancel('用户未登录停止请求')
          setTimeout(() => {
            api.reqFail(that, '用户未登录')
          }, 200)
          that.$router.push({path: '/error', query: {description: '用户未登录'}}) // 跳转错误页面
        },
        err => {
          console.log('123  :' + err)
          api.reqFail(that, '用户未登录')
          that.$router.push({path: '/error', query: {description: '用户未登录'}}) // 跳转错误页面
          return Promise.reject(err)
        })
      axios.interceptors.response.use(data => {
        const status = data.status // http状态码
        var state = data.data.code // 请求状态码
        if (status !== 200) {
          api.reqFail(that, '接口调用失败')
          return
        }
        if (state === '000201') { // 未登录
          setTimeout(() => {
            api.reqFail(that, '用户未登录')
          }, 200)
          that.$router.push({path: '/error', query: {description: '用户未登录'}}) // 跳转错误页面
          return
        }
        if (state !== '000000') { // 获取数据失败
          const message = data.data.message
          if (message) {
            api.reqFail(that, message)
            // that.$router.push({path: '/error', query: {description: message}}) // 跳转错误页面
            return data
          }
        }
        return data
      },
        error => {
          return Promise.reject(error)
        })
    }
  }
}).$mount('#app')
