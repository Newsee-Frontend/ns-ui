/**
 * delay event
 * @param vm
 * @param callback
 * @param speed
 */
export default (vm, callback, speed) => {
  clearTimeout(vm.timeout);
  vm.timeout = setTimeout(() => {
    callback();
  }, speed);
};
