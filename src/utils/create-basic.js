/**
 * Create a basic component with common options
 */
import $Var from '../variable';
import recls from '../mixins/recls';
import formsize from '../mixins/formsize';
import i18n from './i18n';
import resmount from './resmount';
import ui_extends from '../ui-extends';
import { isDef, judgeType, mergeOptions } from '.';

/**
 * component install
 * @param Vue
 * @param opts
 */
function install(Vue, opts = {}) {
  resmount(Vue, this, opts, false);
  if (judgeType(opts) !== 'object') {
    throw 'Opts should be in object format. Check it';
  }
  //局部引入组件的时候，Vue.$opts是不存在的，Vue.$opts为全局引入时候的配置参数
  const option = mergeOptions(Vue.$opts || $Var, opts);
  Vue.prototype.$opts = option;
  Vue.$opts = option;
  console.log('===== 局部合并后参数：=====', option);
  console.log(Vue.$opts);

  ui_extends(Vue, option, false);
}

function returnArray() {
  return [];
}

function defaultProps(props) {
  Object.keys(props).forEach(key => {
    if (props[key] === Array) {
      props[key] = {
        type: Array,
        default: returnArray,
      };
    } else if (props[key] === Number) {
      props[key] = {
        type: Number,
        default: 0,
      };
    }
  });
}

export default function(sfc) {
  sfc.name = $Var.prefix + $Var.tie + sfc.name;
  sfc.install = sfc.install || install;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(i18n, recls, formsize);
  sfc.methods = sfc.methods || {};
  sfc.methods.isDef = isDef;
  sfc.props && defaultProps(sfc.props);

  return sfc;
}
