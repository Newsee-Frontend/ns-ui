// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill';
import Vue from 'vue';
import App from './App';

//load  UI / plugins / style / components
import './UI/index';

//load vuex for data store
import store from './store';

//load router && page
import router from './router';

import loadTinyMCE from '../src/utils/loadTinyMCE'


import {
  getTransformTime,
  getRangeTime,
  getFormatTime,
} from './components/Biz-table/Biz-table-v4/utils/time';

Vue.prototype.getTransformTime = getTransformTime;
Vue.prototype.getRangeTime = getRangeTime;
Vue.prototype.getFormatTime = getFormatTime;


if (typeof window !== 'undefined') {
  window.__loadTinyMCE = loadTinyMCE
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
