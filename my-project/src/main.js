// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

const routes = [
  /*路由重定向*/
  { path: '/', redirect: 'goods' },
  // 路由定向
  { name: goods, path: '/goods', component: goods },
  { name: ratings, path: '/ratings', component: ratings },
  { name: seller, path: '/seller', component: seller }


];
// 接着创建路由实例
const router = new VueRouter({
  // ES6缩写语法，相当于routes:routes
  routes,
  linkActiveClass:'active'
});

/* eslint-disable no-new */
// 有这条规则new Vue就不用赋值给变量
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
