import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import about from '../pages/about'
import voteManager from '../pages/voteManager'
import login from '../pages/login'
import editor from '../pages/editor'
import baseForm from '../pages/baseForm'
import userManager from '../pages/userManager'
import home from '../components/home'

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
      path: '/system',
      component: home,
      name: 'system',
      children: [
        {
          path: '/voteManager',
          component: voteManager
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
          path: '/editor',
          name: 'editor',
          component: editor
        },
        {
          path: '/baseForm',
          name: 'baseForm',
          component: baseForm
        },
        {
          path: '/userManager',
          name: 'userManager',
          component: userManager
        }
      ]
    }
  ]
})
