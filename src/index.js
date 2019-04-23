/* eslint-disable */
// This file is auto gererated by build/build-entry.js
  
import * as filters from './filters/index';//filter
import ui_extends from './ui-extends';
import $Var from './variable';
import resmount from './utils/resmount';
import {mergeOptions} from "./utils";
const version = '0.0.1';

import Col from './packages/Col/Col';
import Head from './packages/Head/Head';
import IconSvg from './packages/Icon-svg/Icon-svg';
import Input from './packages/Input/Input';
import Layout from './packages/Layout/Layout';
import Row from './packages/Row/Row';
import Screenfull from './packages/Screenfull/Screenfull';
import SideBar from './packages/SideBar/SideBar';
import Skin from './packages/Skin/Skin';
import SlipDialog from './packages/Slip-dialog/Slip-dialog';
import TestDemo from './packages/TestDemo/TestDemo';
import UserDropdown from './packages/UserDropdown/UserDropdown';


const components = [
  Col,
  Head,
  IconSvg,
  Input,
  Layout,
  Row,
  Screenfull,
  SideBar,
  Skin,
  SlipDialog,
  TestDemo,
  UserDropdown
];

const install = function (Vue, opts = {}) {
  //Former plug-in external param config
 const option = mergeOptions($Var, opts);
  Vue.prototype.$opts = option;
  Vue.$opts = option;
  console.log('===== 全局合并后参数：=====', option);


  //binding component
  components.forEach(Component => {
   let {name} = Component;
    name ? resmount(Vue, Component, opts) : Vue.use(Component);
  });

  //register global utility filters.
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  });
  
  ui_extends(Vue, option);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  Col,
  Head,
  IconSvg,
  Input,
  Layout,
  Row,
  Screenfull,
  SideBar,
  Skin,
  SlipDialog,
  TestDemo,
  UserDropdown
};

export default {
  install,
  version
};
