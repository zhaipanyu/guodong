import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
/*import './assets/theme/theme-green/index.css'*/
import '../static/css/color-dark.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import * as selfFilters  from './common/js/selfFilters'
import {$axios} from './api/api';
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
/*import Mock from './mock'
Mock.bootstrap();*/
import 'font-awesome/css/font-awesome.min.css'
import './common/css/base.css'
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Object.keys(selfFilters).forEach(key => {
    Vue.filter(key, selfFilters[key])
});
Vue.prototype.USER_ID = sessionStorage.getItem('user_id');
Vue.prototype.USER_ROLE = sessionStorage.getItem('user_role');
//NProgress.configure({ showSpinner: false });
const router = new VueRouter({
  routes
});
Vue.prototype.$axios = $axios;
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
//router.afterEach(transition => {
//NProgress.done();
//});
let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

