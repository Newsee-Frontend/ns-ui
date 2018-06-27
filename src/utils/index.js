import {getQuery} from "../lib/utils";

/**
 * judge array contain another Obj
 * @param arr
 * @param obj
 * @returns {boolean}
 */
export function arrContainObj(arr, obj) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }
  else {
    this.throw("the object of the judgment must be a array format ，you better find it");
  }
}

/**
 * get mock query
 * @param config
 * @param name
 * @returns {string}
 */
export function getMockQuery(config, name) {
  const url = encodeURI(config.url);
  const qn = getQuery(url, name);
  return decodeURI(decodeURI(qn));
}
