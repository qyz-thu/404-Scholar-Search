import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Homepage from '@/components/Homepage'
import Result from "../components/Result";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/result/:query',
      name: 'Result',
      component: Result
    }

  ]
})
