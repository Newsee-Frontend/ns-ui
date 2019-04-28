/* eslint-disable */
// This file is auto gererated by build/build-entry.js
  
import * as filters from './filters/index';//filter
import ui_extends from './ui-extends';
import $Var from './variable';
import resmount from './utils/resmount';
import {mergeOptions} from "./utils";
const version = '0.0.1';

import Badge from './packages/Badge/Badge';
import Button from './packages/Button/Button';
import ButtonGroup from './packages/Button-group/Button-group';
import Col from './packages/Col/Col';
import DatePicker from './packages/DatePicker/DatePicker';
import Dialog from './packages/Dialog/Dialog';
import Header from './packages/Header/Header';
import IconClass from './packages/Icon-class/Icon-class';
import IconSvg from './packages/Icon-svg/Icon-svg';
import Input from './packages/Input/Input';
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
import TabPane from './packages/Tab-pane/Tab-pane';
import Tabs from './packages/Tabs/Tabs';
import TestDemo from './packages/TestDemo/TestDemo';
import TimePicker from './packages/TimePicker/TimePicker';
import UserDropdown from './packages/UserDropdown/UserDropdown';


const components = [
  Badge,
  Button,
  ButtonGroup,
  Col,
  DatePicker,
  Dialog,
  Header,
  IconClass,
  IconSvg,
  Input,
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
  TabPane,
  Tabs,
  TestDemo,
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
  Badge,
  Button,
  ButtonGroup,
  Col,
  DatePicker,
  Dialog,
  Header,
  IconClass,
  IconSvg,
  Input,
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
  TabPane,
  Tabs,
  TestDemo,
  TimePicker,
  UserDropdown
};

export default {
  install,
  version
};
