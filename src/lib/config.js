import {judgeType} from './utils/index'

/**
 * Former plug-in external param config
 * @param Vue
 * @param opts
 * @constructor
 */
export const ConfGrider = function (Vue, opts) {
  // console.log('插件设置传入的参数：')
  // console.log(opts);
  //default param
  let former = {
    stageName: 'gcx',//stage name config
    stageNamelink: '-',//stage name link config
    lan: 'ZH',//language config
    log: false,//log information show
  };
  //validate for param user config
  let _confValidate = (obj, key) => {
    if (!obj.hasOwnProperty(key)) return false;
    const t = judgeType(obj[key]);
    if (t === 'null' || t === 'undefined') return false;
    return true;
  };
  if (opts) {
    for (const key of Object.keys(opts)) {
      if (_confValidate(opts, key)) {
        if (key === 'keyRefer') {
          former[key] = Object.assign(former[key], opts[key]);
        }
        else {
            former[key] = opts[key];
        }

      }
      continue;
    }
  }
  Vue.prototype.$former = former;
  Vue.former = former
};



