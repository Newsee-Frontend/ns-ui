import * as filters from './filters/index';//filter
import {ConfGrider} from './config'
import init from './init'
import {getStageName} from './rename'
//iconfont - config
import './utils/svgConfig'

/* ------------- About Form , its components and other components we need------------- */

//base table
import BaseGrid from './packages/base-grid/src/base-grid'
//grid operation
import gridOperation from "./packages/base-grid/src/render/gridOperation";


const components = [
  //base table
  BaseGrid,
  //grid operation
  gridOperation,
];

const install = function (Vue, opts = {}) {
  //grider plug-in external param config
  ConfGrider(Vue, opts);

  //init methods and ready handle
  init(Vue, Vue.grider);

  //binding component
  components.map((component, index) => {
    Vue.component(getStageName(component.name, Vue.grider.stageName, Vue.grider.stageNamelink, index), component)
  });

  //register global utility filters.
  Object.keys(filters).forEach(key => {
    console.log(key);
    console.log(filters[key]);
    Vue.filter(key, filters[key])
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: require('../../package.json').version,
  install,
  //base table
  BaseGrid,
  //grid operation
  gridOperation,

};

module.exports.default = module.exports;

