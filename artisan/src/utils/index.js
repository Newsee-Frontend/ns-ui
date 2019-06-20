/**
 * judge type accurate
 * @param value
 * @returns {*}
 */
export const judgeType = (value) => {
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
    '[object Object]': 'object',
  };
  if (value instanceof Element) {
    return 'element';
  }
  return map[t];
};

/**
 * debounce
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  const later = function() {
    const last = +new Date() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};
