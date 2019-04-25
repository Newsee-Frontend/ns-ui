import Vue from 'vue';
import ElementUI from 'element-ui';
import 'cx-theme/dist/cx-theme.min.css';
import './assets/iconfont/iconfont';

Vue.use(ElementUI);

import Layout from '../../src/packages/Layout/Layout';
import Sidebar from '../../src/packages/SideBar/Sidebar';
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

Vue.component('Layout', Layout);
Vue.component('ns-sidebar', Sidebar);
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

import '../../src/packages/Layout/style/index.scss';
import '../../src/packages/SideBar/style/index.scss';
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
