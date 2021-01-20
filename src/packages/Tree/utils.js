//找到ev.target 最里层的 TreeLi组件
export const findNearestComponent = function(element, componentName) {
  let target = element;
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }
    target = target.parentNode;
  }
  return null;
};
