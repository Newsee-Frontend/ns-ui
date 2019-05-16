/* eslint-disable */
// This file is auto gererated by build/build-entry.js

import * as filters from './filters/index';//filter
import ui_extends from './ui-extends';
import $Var from './variable';
import resmount from './utils/resmount';
import {mergeOptions} from "./utils";
const version = '0.0.13';

import Alert from './packages/Alert/Alert';
import Avatar from './packages/Avatar/Avatar';
import Badge from './packages/Badge/Badge';
import Button from './packages/Button/Button';
import ButtonGroup from './packages/Button-group/Button-group';
import Carousel from './packages/Carousel/Carousel';
import Cascader from './packages/Cascader/Cascader';
import Checkbox from './packages/Checkbox/Checkbox';
import Col from './packages/Col/Col';
import DatePicker from './packages/DatePicker/DatePicker';
import Dialog from './packages/Dialog/Dialog';
import Form from './packages/Form/Form';
import FormItem from './packages/Form-item/Form-item';
import FullscreenDialog from './packages/Fullscreen-dialog/Fullscreen-dialog';
import Header from './packages/Header/Header';
import IconClass from './packages/Icon-class/Icon-class';
import IconSvg from './packages/Icon-svg/Icon-svg';
import Input from './packages/Input/Input';
import Layout from './packages/Layout/Layout';
import Levelbar from './packages/Levelbar/Levelbar';
import PageTabs from './packages/PageTabs/PageTabs';
import Particles from './packages/Particles/Particles';
import Popover from './packages/Popover/Popover';
import Progress from './packages/Progress/Progress';
import Radio from './packages/Radio/Radio';
import Row from './packages/Row/Row';
import Screenfull from './packages/Screenfull/Screenfull';
import Select from './packages/Select/Select';
import SelectTree from './packages/Select-tree/Select-tree';
import SideBar from './packages/SideBar/SideBar';
import Skiner from './packages/Skiner/Skiner';
import Slider from './packages/Slider/Slider';
import SlipDialog from './packages/Slip-dialog/Slip-dialog';
import Step from './packages/Step/Step';
import Steps from './packages/Steps/Steps';
import Switch from './packages/Switch/Switch';
import TabPane from './packages/Tab-pane/Tab-pane';
import Tabs from './packages/Tabs/Tabs';
import Timeline from './packages/Timeline/Timeline';
import TimelineAxis from './packages/TimelineAxis/TimelineAxis';
import TimePicker from './packages/TimePicker/TimePicker';
import Upload from './packages/Upload/Upload';
import UserDropdown from './packages/UserDropdown/UserDropdown';


const components = [
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  FullscreenDialog,
  Header,
  IconClass,
  IconSvg,
  Input,
  Layout,
  Levelbar,
  PageTabs,
  Particles,
  Popover,
  Progress,
  Radio,
  Row,
  Screenfull,
  Select,
  SelectTree,
  SideBar,
  Skiner,
  Slider,
  SlipDialog,
  Step,
  Steps,
  Switch,
  TabPane,
  Tabs,
  Timeline,
  TimelineAxis,
  TimePicker,
  Upload,
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
  Carousel,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  FullscreenDialog,
  Header,
  IconClass,
  IconSvg,
  Input,
  Layout,
  Levelbar,
  PageTabs,
  Particles,
  Popover,
  Progress,
  Radio,
  Row,
  Screenfull,
  Select,
  SelectTree,
  SideBar,
  Skiner,
  Slider,
  SlipDialog,
  Step,
  Steps,
  Switch,
  TabPane,
  Tabs,
  Timeline,
  TimelineAxis,
  TimePicker,
  Upload,
  UserDropdown
};

export default {
  install,
  version
};
