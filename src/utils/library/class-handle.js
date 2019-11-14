/**
 * hasClass
 * @param elements
 * @param cName
 * @returns {boolean}
 */
export const hasClass = (elements, cName) => {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)')); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
};

/**
 * add class
 * @param elements
 * @param cName
 */
export const addClass = (elements, cName) => {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName;
  }
};

/**
 * remove class
 * @param elements
 * @param cName
 */
export const removeClass = (elements, cName) => {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' '); // replace方法是替换
  }
};
