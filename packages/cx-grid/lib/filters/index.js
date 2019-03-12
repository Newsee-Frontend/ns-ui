import {judgeType} from '../utils/index'


/**
 * Other formats convert to string format
 * @param val
 * @returns {*}
 * @constructor
 */
export function allToString(val) {
  if (judgeType(val) === 'array') {
    return val.join(",");
  }
  else if (judgeType(val) === 'string') {
    return val;
  }
  else if (judgeType(val) === 'boolean') {
    return val ? 'true' : 'false';
  }
  else {
    return val ? JSON.stringify(val) : '';
  }
}

/**
 * changeVal
 * @param val
 * @param key
 */
export function changeVal(val, key) {

}
