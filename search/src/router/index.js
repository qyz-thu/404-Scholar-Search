import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Homepage from '../components/Homepage'
import Result from "../components/Result";
import Detail from "../components/Detail";

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
      path: '/result/:query/:type/:timespan',
      name: 'Result',
      component: Result
    },
    {
      path: '/detail/:title',
      name: 'Detail',
      component: Detail
    }

  ]
})
