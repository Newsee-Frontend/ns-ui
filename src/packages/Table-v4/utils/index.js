/**
 * get label by value
 * @param value
 * @param options
 * @returns {*}
 */
export const getLabelByValue = (value, options = []) => {
  for (let i of options) {
    if (i.value === value) {
      return i.label;
    }
  }
};
