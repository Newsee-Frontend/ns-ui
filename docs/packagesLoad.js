import Vue from 'vue'

// ========= loading grid component ========
import cellFifter from './components/packages/bussiness-grid/cell-fifter'
import rulesInfo from './utils/validate/rulesInfo'

import '../packages/cx-grid/dist/cx-grid.min.css'
import cxGrid from '../packages/cx-grid/dist/cx-grid.min';//cx grid

// import 'cx-grid/dist/cx-grid.min.css'
// import cxGrid from 'cx-grid/dist/cx-grid.min';//cx grid

console.log(333333333);

console.log(cellFifter);
Vue.use(cxGrid, {stageName: 'cx', stageNamelink: '-', fifter: cellFifter, validate: rulesInfo});


import '../packages/slip-dialog/dist/cx-slip-dialog.min.css'
import slipDialog from '../packages/slip-dialog/dist/cx-slip-dialog.min.js';
Vue.use(slipDialog, {stageName: 'cx', stageNamelink: '-'});
