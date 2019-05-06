import Vue from 'vue';
import ElementUI from 'element-ui';
import 'cx-theme/dist/cx-theme.min.css';
import '../assets/iconfont/iconfont';
import '../components/index.js';

Vue.use(ElementUI);


//测试 - 单独引入各个组件模块
import './lib';

// 测试 - 全局挂载全部组件
// import nsui from '../../../lib/ns-ui.min';
// import '../../../lib/index.scss';
//
// console.log('全局挂载全部组件');
// console.log(nsui);
// Vue.use(nsui, {
//   prefix: 'ns', //stage name
//   tie: '-',
//   log: false, //show log information
//   type: 'globle',
// });


