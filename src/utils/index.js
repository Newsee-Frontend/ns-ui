/**
 * judge type accurate
 * @param value
 * @returns {*}
 */
export function judgeType(value) {
  const t = Object.prototype.toString.call(value);
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (value instanceof Element) {
    return 'element';
  }
  return map[t];
}

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
 * get query
 * @param url
 * @param name
 * @returns {null}
 */
export function getQuery(url, name) {
  let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\area-linkage|&|$)", "i");
  if (url) {
    if (reg.test(url)) {
      const val = unescape(RegExp.$2.replace(/\+/g, " "));

      if (val !== null && val.toString().length >= 1) {
        return val;
      }
    }
  }
  return null;
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
