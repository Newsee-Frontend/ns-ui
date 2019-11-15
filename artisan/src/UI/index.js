import Vue from 'vue';

import './ElementUI/index';//load element-ui
import './Table/index.js';//load new table components

//load applaction style
import '../style/public.scss';
import '../style/common.scss';

//iconfont style
import '../assets/iconfont/iconfont';
import '../icons';

//load components
import '../components/index.js';


//测试 - 单独引入各个组件模块
// import './lib';
import Message from '../../../src/packages/Message/Message.js';

Vue.prototype.$message = Message;


//测试 - 全局挂载全部组件

import nsui from '../../../lib/ns-ui';
import '../../../lib/index.scss';

console.log('全局挂载全部组件');
console.log(nsui);
Vue.use(nsui, {
  prefix: 'ns', //stage name
  tie: '-',
  log: false, //show log information
  type: 'globle',
});


