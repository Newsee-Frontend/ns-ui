/***
 * ['2012', '2013'] 转成 { GREATER_EQUAL_THEN： '2012'， LESS_EQUAL_THEN： '2021'}
 * 时间转换
 */

export const  dateFormula = function( date ) {
  let obj = {};
  if (Array.isArray(date) && date.length === 2) {
    let startTime = date[0];
    let endTime = date[1];
    if (startTime) {
      obj.GREATER_EQUAL_THAN = startTime;
    }
    if (endTime) {
      obj.LESS_EQUAL_THAN = endTime;
    }

  } else if (date) {
    obj = { EQUAL: date };
  }

  return Object.keys(obj).length > 0 ? JSON.stringify(obj) : '';
}
