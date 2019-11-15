import $Var from '../variable';
import { judgeType } from './library/basic';

function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function get(object, path) {
  const keys = path.split('.');
  let result = object;

  keys.forEach(key => {
    result = isDef(result[key]) ? result[key] : '';
  });

  return result;
}

const camelizeRE = /-(\w)/g;

/**
 * 首字母大写 ab-cd =》 AbCd
 * @param str
 * @returns {*}
 */
function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

function isAndroid() {
  /* istanbul ignore next */
  return isServer ? false : /android/.test(navigator.userAgent.toLowerCase());
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * prefix name
 * @param name
 * @param opts
 * @param $Var
 * @returns {*}
 */
function prefixName(name, opts, $Var) {
  const defname = $Var.prefix + $Var.tie;
  const newname = opts.prefix + opts.tie;
  // console.log('原始名称，前缀名，默认前缀名称：', name, defname, newname);
  if (!name)
    throw 'the component should be set with the initial name，' +
      "please check every component' name whether it's property is set";
  if (typeof opts.prefix !== 'string' || !opts.prefix) return name;
  if (typeof opts.tie !== 'string' || !opts.tie) return name;
  if (name.indexOf(defname) === 0) {
    const reg = new RegExp(defname, 'g'); //'[ default- ]' => prefix name + connector
    return name.replace(reg, newname);
  } else {
    return name;
  }
}

/**
 * merge options
 * @param opt1
 * @param opt2
 * @returns {*}
 */
function mergeOptions(opt1, opt2) {
  //validate for param user config
  let _confValidate = (obj, key) => {
    if (!obj.hasOwnProperty(key)) return false;
    const t = judgeType(obj[key]);
    if (t === 'null' || t === 'undefined') return false;
    return true;
  };
  let option = opt1 || {};
  if (opt2 && Object.keys(opt2).length !== 0) {
    for (const key of Object.keys(opt2)) {
      if (_confValidate(opt2, key)) {
        option[key] = opt2[key];
      }
    }
  }
  return option;
}

export { get, range, isObj, isDef, camelize, isAndroid, prefixName, mergeOptions };
