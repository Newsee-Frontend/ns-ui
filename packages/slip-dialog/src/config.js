import {judgeType} from './utils/utils'

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
  let slipDialoger = {
    stageName: 'gcx',//stage name config
    stageNamelink: '-',//stage name link config
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
        if (key === 'fifter') {
          slipDialoger[key] = Object.assign(slipDialoger[key], opts[key]);
        }
        else if (key === 'validate') {
          // slipDialoger[key] = Object.assign(slipDialoger[key], opts[key]);
          /**
           * concat and remove duplicate array
           * 验证信息列表合并（内置和外置）并且去重（根据type值）
           * @param arr1        inside  validate list
           * @param arr2        outside validate list
           * @returns {T[] | string}
           * @private
           */
          let _concat = function (arr1, arr2) {
            let Arr = arr2.concat();
            for (let i = 0; i < arr1.length; i++) {
              const sw = arr2.some(item => {
                return item.type === arr1[i].type
              });
              !sw ? Arr.push(arr1[i]) : 0;
            }
            return Arr;
          };
          slipDialoger[key] = _concat(slipDialoger[key], opts[key]);
        }
        else {
          slipDialoger[key] = opts[key];
        }
      }
    }
  }
  // console.log('插件设置后参数：');
  // console.log(slipDialoger);
  Vue.prototype.$slipDialoger = slipDialoger;
  Vue.slipDialoger = slipDialoger
};
