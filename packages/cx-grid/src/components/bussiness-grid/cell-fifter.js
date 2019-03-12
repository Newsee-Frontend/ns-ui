export default {
  /**
   * grid cell fifter function
   * @param val
   * @param key
   * @returns {*}
   */
  cellFifter: (val, key) => {

    if (key === 'fifter') {
      if (val === 0) {
        return '否'
      }
      else if (val === 1) {
        return '是'
      }
      else {
        return val;
      }
    }

    return val;
  }
}
