/**
 * addEventListener（绑定Dom元素的监听事件）
 * @param target  监听对象
 * @param type    监听函数类型，如click,mouseover
 * @param func    监听函数
 */
export function addEventHandler(target, type, func) {
  if (target.addEventListener) {
    //监听IE9，谷歌和火狐
    target.addEventListener(type, func, false);
  } else if (target.attachEvent) {
    target.attachEvent("on" + type, func);
  } else {
    target["on" + type] = func;
  }
}

/**
 * removeEventHandler （移除Dom元素的监听事件）
 * target：监听对象
 * type：监听函数类型，如click,mouseover
 * func：监听函数
 */
export function removeEventHandler(target, type, func) {
  if (target.removeEventListener) {
    //监听IE9，谷歌和火狐
    target.removeEventListener(type, func, false);
  } else if (target.detachEvent) {
    target.detachEvent("on" + type, func);
  } else {
    delete target["on" + type];
  }
}

/**
 * array remove item
 * @param opts
 * @param opt
 */
export const arrayremove = (opts, opt) => {
  const index = opts.indexOf(opt);
  if (index > -1) {
    opts.splice(index, 1);
  }
};

/**
 * stop propagation
 * @param e
 */
export const stopPropagation = (e) => {
  if (e && e.stopPropagation) {
    e.stopPropagation();//W3C stop propagation
  } else {
    window.event.cancelBubble = true;//IE stop propagation
  }
};
