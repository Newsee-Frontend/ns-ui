import Vue from 'vue';

//layout
import Layout from '../../../src/packages/Layout/Layout';
import Sidebar from '../../../src/packages/SideBar/Sidebar';
import Skiner from '../../../src/packages/Skiner/Skiner';
import UserDropdown from '../../../src/packages/UserDropdown/UserDropdown';

//basic
import IconSvg from '../../../src/packages/Icon-svg/Icon-svg';
import IconClass from '../../../src/packages/Icon-class/Icon-class';
import Col from '../../../src/packages/Col/Col';
import Row from '../../../src/packages/Row/Row';
import Button from '../../../src/packages/Button/Button';
import ButtonGroup from '../../../src/packages/Button-group/Button-group';


//form
import Input from '../../../src/packages/Input/Input.js';
import InputNumber from '../../../src/packages/InputNumber/InputNumber.js';
import DatePicker from '../../../src/packages/DatePicker/DatePicker.js';
import TimePicker from '../../../src/packages/TimePicker/TimePicker.js';
import OnlyMMDDPicker from '../../../src/packages/Only-MMDD-picker/Only-MMDD-picker';
import TimeInterval from '../../../src/packages/Time-interval/Time-interval.js';
import Select from '../../../src/packages/Select/Select.js';
import Cascader from '../../../src/packages/Cascader/Cascader.js';
import Checkbox from '../../../src/packages/Checkbox/Checkbox.js';
import Radio from '../../../src/packages/Radio/Radio.js';
import Switch from '../../../src/packages/Switch/Switch.js';
import Slider from '../../../src/packages/Slider/Slider.js';
import Upload from '../../../src/packages/Upload/Upload.js';
import TreeSelect from '../../../src/packages/Select-tree/Select-tree.js';
import Avatar from '../../../src/packages/Avatar/Avatar.js';
import ColorPicker from '../../../src/packages/ColorPicker/ColorPicker.js';
import Form from '../../../src/packages/Form/Form.js';
import FormItem from '../../../src/packages/Form-item/Form-item.js';


//other
import PageTabs from '../../../src/packages/PageTabs/PageTabs.js';
import Dialog from '../../../src/packages/Dialog/Dialog.js';
import FullscreenDialog from '../../../src/packages/Fullscreen-dialog/Fullscreen-dialog.js';
import SlipDialog from '../../../src/packages/Slip-dialog/Slip-dialog.js';
import Drawer from '../../../src/packages/Drawer/Drawer.js';
import Carousel from '../../../src/packages/Carousel/Carousel.js';
import Popover from '../../../src/packages/Popover/Popover.js';
import Timeline from '../../../src/packages/Timeline/Timeline.js';
import TimelineAxis from '../../../src/packages/TimelineAxis/TimelineAxis.js';
import Particles from '../../../src/packages/Particles/Particles';
import VideoBackground from '../../../src/packages/VideoBackground/VideoBackground';
import Editor from '../../../src/packages/Editor/Editor';
import Screenfull from '../../../src/packages/Screenfull/Screenfull';

//data
import Badge from '../../../src/packages/Badge/Badge.js';
import Progress from '../../../src/packages/Progress/Progress.js';
import Tree from '../../../src/packages/Tree/Tree.js';
import Pagination from '../../../src/packages/Pagination/Pagination';
import Table from '../../../src/packages/Table/Table.js';

//Navigation
import Steps from '../../../src/packages/Steps/Steps.js';
import Step from '../../../src/packages/Step/Step.js';
import Tabs from '../../../src/packages/Tabs/Tabs.js';
import TabPane from '../../../src/packages/Tab-pane/Tab-pane.js';

//notice
import Alert from '../../../src/packages/Alert/Alert.js';
import LoadingBlock from '../../../src/packages/Loading-block/Loading-block.js';

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
Vue.component('ns-input-number', InputNumber);
Vue.component('ns-date-picker', DatePicker);
Vue.component('ns-time-picker', TimePicker);
Vue.component('ns-onlyMMDD-picker', OnlyMMDDPicker);
Vue.component('ns-time-interval', TimeInterval);
Vue.component('ns-select', Select);
Vue.component('ns-cascader', Cascader);
Vue.component('ns-checkbox', Checkbox);
Vue.component('ns-radio', Radio);
Vue.component('ns-switch', Switch);
Vue.component('ns-slider', Slider);
Vue.component('ns-upload', Upload);
Vue.component('ns-select-tree', TreeSelect);
Vue.component('ns-color-picker', ColorPicker);
Vue.component('ns-avatar', Avatar);
Vue.component('ns-form', Form);
Vue.component('ns-form-item', FormItem);


// data
Vue.component('ns-badge', Badge);
Vue.component('ns-progress', Progress);
Vue.component('ns-tree', Tree);
Vue.component('ns-pagination', Pagination);
Vue.component('ns-table', Table);

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
Vue.component('ns-drawer', Drawer);

Vue.component('ns-carousel', Carousel);
Vue.component('ns-popover', Popover);
Vue.component('ns-timeline', Timeline);
Vue.component('ns-timeline-axis', TimelineAxis);

Vue.component('ns-editor', Editor);
Vue.component('ns-particles', Particles);
Vue.component('ns-video-background', VideoBackground);

//notice
Vue.component('ns-alert', Alert);
Vue.component('ns-Loading-block', LoadingBlock);

//icons
import '../../../src/style/base.scss';

//layput
import '../../../src/packages/Layout/style/index.scss';
import '../../../src/packages/SideBar/style/index.scss';
import '../../../src/packages/UserDropdown/style/index.scss';

//basic
import '../../../src/packages/Icon-svg/style/index.scss';
import '../../../src/packages/Icon-class/style/index.scss';
import '../../../src/packages/Col/style/index.scss';
import '../../../src/packages/Row/style/index.scss';
import '../../../src/packages/Button/style/index.scss';
import '../../../src/packages/Button-group/style/index.scss';

//form
import '../../../src/packages/Input/style/index.scss';
import '../../../src/packages/InputNumber/style/index.scss';
import '../../../src/packages/DatePicker/style/index.scss';
import '../../../src/packages/TimePicker/style/index.scss';
import '../../../src/packages/Only-MMDD-picker/style/index.scss';
import '../../../src/packages/Time-interval/style/index.scss';
import '../../../src/packages/Select/style/index.scss';
import '../../../src/packages/Cascader/style/index.scss';
import '../../../src/packages/Checkbox/style/index.scss';
import '../../../src/packages/Radio/style/index.scss';
import '../../../src/packages/Switch/style/index.scss';
import '../../../src/packages/Upload/style/index.scss';
import '../../../src/packages/Select-tree/style/index.scss';
import '../../../src/packages/ColorPicker/style/index.scss';
import '../../../src/packages/Avatar/style/index.scss';
import '../../../src/packages/Form/style/index.scss';

//data
import '../../../src/packages/Tree/style/index.scss';
import '../../../src/packages/Pagination/style/index.scss';
import '../../../src/packages/Table/style/index.scss';

//navigation
import '../../../src/packages/Step/style/index.scss';
import '../../../src/packages/Steps/style/index.scss';
import '../../../src/packages/Tabs/style/index.scss';

//other
import '../../../src/packages/Skiner/style/index.scss';
import '../../../src/packages/Screenfull/style/index.scss';
import '../../../src/packages/PageTabs/style/index.scss';
import '../../../src/packages/Dialog/style/index.scss';
import '../../../src/packages/Fullscreen-dialog/style/index.scss';
import '../../../src/packages/Slip-dialog/style/index.scss';
import '../../../src/packages/Drawer/style/index.scss';
import '../../../src/packages/Carousel/style/index.scss';
import '../../../src/packages/Timeline/style/index.scss';
import '../../../src/packages/TimelineAxis/style/index.scss';
import '../../../src/packages/Particles/style/index.scss';
import '../../../src/packages/VideoBackground/style/index.scss';
import '../../../src/packages/Editor/style/index.scss';

//notice
import '../../../src/packages/Loading-block/style/index.scss';
