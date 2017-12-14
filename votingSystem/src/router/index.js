import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import about from '../pages/about'
import voteManager from '../pages/voteManager'
import login from '../pages/login/login'
import systemSetting from '../pages/systemSetting'
import webSetting from '../pages/webSetting'
import userManager from '../pages/userManager'
import home from '../components/home'
import createNewItem from '../pages/createNewItem'
import statisticalAnalysis from '../pages/statisticalAnalysis'
import editVote from '../pages/editVote'
import error from '../pages/login/error'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '/system',
      component: home,
      name: 'system',
      children: [
        {
          path: '/editVote/:name/:voteId',
          component: editVote
        },
        {
          path: '/voteManager',
          component: voteManager
        },
        {
          path: '/statisticalAnalysis',
          component: statisticalAnalysis
        },
        {
          path: '/',
          redirect: '/about'
        },
        {
          path: '/about',
          name: 'about',
          component: about
        },
        {
          path: '/systemSetting',
          name: 'systemSetting',
          component: systemSetting
        },
        {
          path: '/webSetting',
          name: 'webSetting',
          component: webSetting
        },
        {
          path: '/userManager',
          name: 'userManager',
          component: userManager
        },
        {
          path: '/createNewItem',
          name: 'createNewItem',
          component: createNewItem
        }
      ]
    }
  ]
})
