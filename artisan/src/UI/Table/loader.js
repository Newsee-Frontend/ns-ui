import Vue from 'vue';

import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';
import '../../style/cover/vxe-table/index.scss';

import VXETablePluginElement from 'vxe-table-plugin-element';

VXETable.use(VXETablePluginElement);

Vue.use(VXETable);

