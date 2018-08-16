// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//theme
import 'cx-theme/dist/cx-theme.min.css'
import './assets/css/theme-cover.scss'
import './assets/css/public.scss'
import './lib/utils/svgConfig'//iconfont - config
import ElementUI from 'element-ui';//element-ui js
//other
import './mock/index';//mock
import GlobalCom from './components';//components
import mounts from './utils/mounts';
//use
Vue.use(ElementUI);
Vue.use(mounts);
//config
Vue.config.productionTip = false;
Vue.config.debug = true;//开启错误提示

// ========= loading grid component ========
import cellFifter from './components/bussiness-grid/cell-fifter'
import rulesInfo from './utils/validate/rulesInfo'
import '../dist/cx-grid.min.css'
import cxGrid from '../dist/cx-grid.min';//cx grid
Vue.use(cxGrid, {stageName: 'cx', stageNamelink: '-', fifter: cellFifter, validate: rulesInfo});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  GlobalCom,
  components: {App},
  template: '<App/>'
});
