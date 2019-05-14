/**
 * nav mouse event
 * @param e
 * @param vm
 * @param maxheight
 */
export const compute = (e, vm, maxheight = 350 || window.screen.height * 0.6) => {
  let finalHeight = 0;

  const targetkey = 'target';
  e = e || window.event;

  const target = e.target || e.srcElement;

  const childList = Array.prototype.slice
    .call(e[targetkey].childNodes)
    .filter(node => node.nodeType !== 3 && node.nodeName === 'UL');

  if (!childList || childList.length === 0) {
    return;
  }

  const secNavH = childList[0].offsetHeight; //second nav height
  const headerH = document.getElementsByClassName('header-wrapper')[0].offsetHeight || 50; //header component height

  const CH = document.documentElement.clientHeight; //client height
  const TH = e[targetkey].offsetTop + headerH; //to top
  const BH = CH - TH; //to bottom

  finalHeight = secNavH > maxheight ? maxheight : secNavH;

  if (BH < finalHeight) {
    vm.second_nav_top = -Math.abs(finalHeight - target.offsetHeight) + 'px'; //top
    vm.secNavASC = false;
  } else {
    vm.second_nav_top = 0;
    vm.secNavASC = true;
  }
  vm.maxSecNavHeight = secNavH > maxheight ? maxheight + 'px' : null;
};

/**
 * delay nav
 * @param vm
 * @param callback
 * @param speed
 */
export const delaynav = (vm, callback, speed) => {
  clearTimeout(vm.timeout);
  vm.timeout = setTimeout(() => {
    callback();
  }, speed);
};

export const debounce = (func, wait, immediate = false) => {
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
};
