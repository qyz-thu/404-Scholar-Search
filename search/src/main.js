// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Element from 'element-ui';
import ECharts from 'vue-echarts';
import 'element-ui/lib/theme-chalk/index.css';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'

Vue.use(Element);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.component('v-chart', ECharts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
