// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import comments from 'components/comments/comments';
import buyer from 'components/buyer/buyer';

import 'common/sass/index.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

const routes = [
  {
    path: '/',
    component: goods
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/comments',
    component: comments
  },
  {
    path: '/buyer',
    component: buyer
  }
];
const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(app)
}).$mount('#app');
