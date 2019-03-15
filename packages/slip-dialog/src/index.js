import {ConfGrider} from './config'
import init from './init'
import {getStageName} from './rename'
import slipDialog from './index.vue'

const version = require('../package.json').version;
const components = [
  //base table
  slipDialog,
];

const install = function (Vue, opts = {}) {
  //slipDialoger plug-in external param config
  ConfGrider(Vue, opts);

  //init methods and ready handle
  init(Vue, Vue.slipDialoger);

  //binding component
  components.map((component, index) => {
    console.log(getStageName(component.name, Vue.slipDialoger.stageName, Vue.slipDialoger.stageNamelink, index))
    Vue.component(getStageName(component.name, Vue.slipDialoger.stageName, Vue.slipDialoger.stageNamelink, index), component)
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  slipDialog

};
export default {
  install,
  version
};


