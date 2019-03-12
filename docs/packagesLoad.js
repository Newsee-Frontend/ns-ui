import Vue from 'vue'

// ========= loading grid component ========
import cellFifter from './components/packages/bussiness-grid/cell-fifter'
import rulesInfo from './utils/validate/rulesInfo'
import '../packages/cx-grid/dist/cx-grid.min.css'
import cxGrid from '../packages/cx-grid/dist/cx-grid.min';//cx grid
// import cxGrid from '../packages/cx-grid/src/lib/index';//cx grid
Vue.use(cxGrid, {stageName: 'cx', stageNamelink: '-', fifter: cellFifter, validate: rulesInfo});
