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
import './utils/mock/index';//mock
import GlobalCom from './components';//components
import mounts from './utils/mounts';
//use
Vue.use(ElementUI);
Vue.use(mounts);
//config
Vue.config.productionTip = false;
Vue.config.debug = true;//开启错误提示

//loading grid component
import '../dist/cx-grid.min.css'
import cxGrid from '../dist/cx-grid.min';//cx grid
Vue.use(cxGrid, {stageName: 'cx', stageNamelink: '-'});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  GlobalCom,
  components: {App},
  template: '<App/>'
});
