/**
 * grid cell fifter function
 * @param val
 * @param key
 * @returns {*}
 */
export default (val, key) => {
  if (key === 'sex') {
    if (val === '1') {
      return '男';
    } else if (val === '2') {
      return '女';
    } else {
      return val;
    }
  }

  return val;
};
