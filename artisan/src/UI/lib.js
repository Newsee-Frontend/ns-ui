import Vue from 'vue';

import Layout from '../../../src/packages/Layout/Layout';
import Sidebar from '../../../src/packages/SideBar/Sidebar';
import Skiner from '../../../src/packages/Skiner/Skiner';
import Screenfull from '../../../src/packages/Screenfull/Screenfull';
import UserDropdown from '../../../src/packages/UserDropdown/UserDropdown';

import IconSvg from '../../../src/packages/Icon-svg/Icon-svg';
import IconClass from '../../../src/packages/Icon-class/Icon-class';
import Col from '../../../src/packages/Col/Col';
import Row from '../../../src/packages/Row/Row';
import Button from '../../../src/packages/Button/Button';
import ButtonGroup from '../../../src/packages/Button-group/Button-group';

import DatePicker from '../../../src/packages/DatePicker/DatePicker.js';
import Input from '../../../src/packages/Input/Input.js';
import TimePicker from '../../../src/packages/TimePicker/TimePicker.js';
import OnlyMMDDPicker from '../../../src/packages/Only-MMDD-picker/Only-MMDD-picker';
import TimeInterval from '../../../src/packages/Time-interval/Time-interval.vue';
import Select from '../../../src/packages/Select/Select.js';
import Cascader from '../../../src/packages/Cascader/Cascader.js';
import Avatar from '../../../src/packages/Avatar/Avatar.js';
import Checkbox from '../../../src/packages/Checkbox/Checkbox.js';
import Radio from '../../../src/packages/Radio/Radio.js';
import Switch from '../../../src/packages/Switch/Switch.js';
import Slider from '../../../src/packages/Slider/Slider.js';
import Upload from '../../../src/packages/Upload/Upload.js';

import PageTabs from '../../../src/packages/PageTabs/PageTabs.js';
import Dialog from '../../../src/packages/Dialog/Dialog.js';
import FullscreenDialog from '../../../src/packages/Fullscreen-dialog/Fullscreen-dialog.js';
import SlipDialog from '../../../src/packages/Slip-dialog/Slip-dialog.js';
import Carousel from '../../../src/packages/Carousel/Carousel.js'
import Popover from '../../../src/packages/Popover/Popover.js'
import Timeline from '../../../src/packages/Timeline/Timeline.js'

import Badge from '../../../src/packages/Badge/Badge.js';
import Progress from '../../../src/packages/Progress/Progress.js';

import Steps from '../../../src/packages/Steps/Steps.js';
import Step from '../../../src/packages/Step/Step.js';
import Tabs from '../../../src/packages/Tabs/Tabs.js';
import TabPane from '../../../src/packages/Tab-pane/Tab-pane.js';

import Alert from '../../../src/packages/Alert/Alert.js';
// layout
Vue.component('ns-layout', Layout);
Vue.component('ns-sidebar', Sidebar);
Vue.component('ns-screenfull', Screenfull);
Vue.component('ns-skiner', Skiner);
Vue.component('ns-user-dropdown', UserDropdown);

// basic
Vue.component('ns-icon-svg', IconSvg);
Vue.component('ns-icon-class', IconClass);
Vue.component('ns-col', Col);
Vue.component('ns-row', Row);
Vue.component('ns-button', Button);
Vue.component('ns-button-group', ButtonGroup);

// form
Vue.component('ns-input', Input);
Vue.component('ns-date-picker', DatePicker);
Vue.component('ns-time-picker', TimePicker);
Vue.component('ns-onlyMMDD-picker', OnlyMMDDPicker);
Vue.component('ns-time-interval', TimeInterval);
Vue.component('ns-select', Select);
Vue.component('ns-cascader', Cascader);
Vue.component('ns-avatar', Avatar);
Vue.component('ns-checkbox', Checkbox);
Vue.component('ns-radio', Radio);
Vue.component('ns-switch', Switch);
Vue.component('ns-slider', Slider);
Vue.component('ns-upload', Upload);


// data
Vue.component('ns-badge', Badge);
Vue.component('ns-progress', Progress);

//navigation
Vue.component('ns-steps', Steps);
Vue.component('ns-step', Step);
Vue.component('ns-tabs', Tabs);
Vue.component('ns-tab-pane', TabPane);

// other
Vue.component('ns-page-tabs', PageTabs);
Vue.component('ns-dialog', Dialog);
Vue.component('ns-fullscreen-dialog', FullscreenDialog);
Vue.component('ns-slip-dialog', SlipDialog);
Vue.component('ns-carousel', Carousel);
Vue.component('ns-popover', Popover);
Vue.component('ns-timeline', Timeline);


//notice
Vue.component('ns-alert', Alert);


import '../../../src/packages/Layout/style/index.scss';
import '../../../src/packages/SideBar/style/index.scss';
import '../../../src/packages/Skiner/style/index.scss';
import '../../../src/packages/Screenfull/style/index.scss';
import '../../../src/packages/UserDropdown/style/index.scss';

import '../../../src/packages/Icon-svg/style/index.scss';
import '../../../src/packages/Icon-class/style/index.scss';
import '../../../src/packages/Col/style/index.scss';
import '../../../src/packages/Row/style/index.scss';
import '../../../src/packages/Button/style/index.scss';
import '../../../src/packages/Button-group/style/index.scss';

import '../../../src/packages/Input/style/index.scss';
import '../../../src/packages/DatePicker/style/index.scss';
import '../../../src/packages/TimePicker/style/index.scss';
import '../../../src/packages/Only-MMDD-picker/style/index.scss';
import '../../../src/packages/Time-interval/style/index.scss';
import '../../../src/packages/Cascader/style/index.scss';
import '../../../src/packages/Avatar/style/index.scss';
import '../../../src/packages/Checkbox/style/index.scss';
import '../../../src/packages/Radio/style/index.scss';


import '../../../src/packages/PageTabs/style/index.scss';
import '../../../src/packages/Dialog/style/index.scss';
import '../../../src/packages/Fullscreen-dialog/style/index.scss';
import '../../../src/packages/Slip-dialog/style/index.scss';
import '../../../src/packages/Carousel/style/index.scss';
import '../../../src/packages/Timeline/style/index.scss';

import '../../../src/packages/Step/style/index.scss';
import '../../../src/packages/Steps/style/index.scss';
import '../../../src/packages/Tabs/style/index.scss';
import '../../../src/packages/Select/style/index.scss';
import '../../../src/packages/Checkbox/style/index.scss';
import '../../../src/packages/Radio/style/index.scss';
import '../../../src/packages/Switch/style/index.scss';
