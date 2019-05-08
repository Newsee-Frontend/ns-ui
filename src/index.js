/* eslint-disable */
// This file is auto gererated by build/build-entry.js
  
import * as filters from './filters/index';//filter
import ui_extends from './ui-extends';
import $Var from './variable';
import resmount from './utils/resmount';
import {mergeOptions} from "./utils";
const version = '0.0.8';

import Alert from './packages/Alert/Alert';
import Avatar from './packages/Avatar/Avatar';
import Badge from './packages/Badge/Badge';
import Button from './packages/Button/Button';
import ButtonGroup from './packages/Button-group/Button-group';
import Cascader from './packages/Cascader/Cascader';
import Col from './packages/Col/Col';
import DatePicker from './packages/DatePicker/DatePicker';
import Dialog from './packages/Dialog/Dialog';
import FullscreenDialog from './packages/Fullscreen-dialog/Fullscreen-dialog';
import Header from './packages/Header/Header';
import IconClass from './packages/Icon-class/Icon-class';
import IconSvg from './packages/Icon-svg/Icon-svg';
import Layout from './packages/Layout/Layout';
import Levelbar from './packages/Levelbar/Levelbar';
import PageTabs from './packages/PageTabs/PageTabs';
import Progress from './packages/Progress/Progress';
import Row from './packages/Row/Row';
import Screenfull from './packages/Screenfull/Screenfull';
import SideBar from './packages/SideBar/SideBar';
import Skiner from './packages/Skiner/Skiner';
import SlipDialog from './packages/Slip-dialog/Slip-dialog';
import Step from './packages/Step/Step';
import Steps from './packages/Steps/Steps';
import TimePicker from './packages/TimePicker/TimePicker';
import UserDropdown from './packages/UserDropdown/UserDropdown';


const components = [
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Cascader,
  Col,
  DatePicker,
  Dialog,
  FullscreenDialog,
  Header,
  IconClass,
  IconSvg,
  Layout,
  Levelbar,
  PageTabs,
  Progress,
  Row,
  Screenfull,
  SideBar,
  Skiner,
  SlipDialog,
  Step,
  Steps,
  TimePicker,
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
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Cascader,
  Col,
  DatePicker,
  Dialog,
  FullscreenDialog,
  Header,
  IconClass,
  IconSvg,
  Layout,
  Levelbar,
  PageTabs,
  Progress,
  Row,
  Screenfull,
  SideBar,
  Skiner,
  SlipDialog,
  Step,
  Steps,
  TimePicker,
  UserDropdown
};

export default {
  install,
  version
};