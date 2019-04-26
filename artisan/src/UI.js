import Vue from 'vue';
import ElementUI from 'element-ui';
import 'cx-theme/dist/cx-theme.min.css';
import './assets/iconfont/iconfont';

Vue.use(ElementUI);

import Layout from '../../src/packages/Layout/Layout';
import Sidebar from '../../src/packages/SideBar/Sidebar';
import Skiner from '../../src/packages/Skiner/Skiner';
import Screenfull from '../../src/packages/Screenfull/Screenfull';
import UserDropdown from '../../src/packages/UserDropdown/UserDropdown';

import IconSvg from '../../src/packages/Icon-svg/Icon-svg';
import Col from '../../src/packages/Col/Col';
import Row from '../../src/packages/Row/Row';

import DatePicker from '../../src/packages/DatePicker/DatePicker.js';
import Input from '../../src/packages/Input/Input.js';
import TimePicker from '../../src/packages/TimePicker/TimePicker.js';
import PageTabs from '../../src/packages/PageTabs/PageTabs.js';
import Dialog from '../../src/packages/Dialog/Dialog.js';
import SlipDialog from '../../src/packages/Slip-dialog/Slip-dialog.js';

import Badge from '../../src/packages/Badge/Badge.js';
import Progress from '../../src/packages/Progress/Progress.js';

import Steps from '../../src/packages/Steps/Steps.js';
import Step from '../../src/packages/Step/Step.js';
import Tabs from '../../src/packages/Tabs/Tabs.js';
import TabPane from '../../src/packages/Tab-pane/Tab-pane.js';

Vue.component('ns-layout', Layout);
Vue.component('ns-sidebar', Sidebar);
Vue.component('ns-screenfull', Screenfull);
Vue.component('ns-skiner', Skiner);
Vue.component('UserDropdown', UserDropdown);

Vue.component('ns-icon-svg', IconSvg);
Vue.component('ns-col', Col);
Vue.component('ns-row', Row);

Vue.component('ns-input', Input);
Vue.component('ns-date-picker', DatePicker);
Vue.component('ns-time-picker', TimePicker);
Vue.component('ns-page-tabs', PageTabs);
Vue.component('ns-dialog', Dialog);
Vue.component('ns-slip-dialog', SlipDialog);

Vue.component('ns-badge', Badge);
Vue.component('ns-progress', Progress);

Vue.component('ns-steps', Steps);
Vue.component('ns-step', Step);
Vue.component('ns-tabs', Tabs);
Vue.component('ns-tab-pane', TabPane);

import '../../src/packages/Layout/style/index.scss';
import '../../src/packages/SideBar/style/index.scss';
import '../../src/packages/Skiner/style/index.scss';
import '../../src/packages/Screenfull/style/index.scss';
import '../../src/packages/UserDropdown/style/index.scss';

import '../../src/packages/Icon-svg/style/index.scss';
import '../../src/packages/Col/style/index.scss';
import '../../src/packages/Row/style/index.scss';

import '../../src/packages/Input/style/index.scss';
import '../../src/packages/DatePicker/style/index.scss';
import '../../src/packages/TimePicker/style/index.scss';
import '../../src/packages/PageTabs/style/index.scss';
import '../../src/packages/Dialog/style/index.scss';
import '../../src/packages/Slip-dialog/style/index.scss';

import '../../src/packages/Step/style/index.scss';
import '../../src/packages/Steps/style/index.scss';
import  '../../src/packages/Tabs/style/index.scss'
