import { judgeType } from '../library/basic';

/**
 * convert width / height - units
 * @param val
 * @param type
 * @returns {*}
 */
export const convertUnits = function(val) {
  if (val || val === 0) {
    if (judgeType(val) === 'number') {
      return val + 'px';
    } else if (judgeType(val) === 'string') {
      return val;
    } else {
      throw 'the value of the units must be string or number format ，you better find it';
    }
  } else {
    throw 'the value is empty, please check you code';
  }
};
