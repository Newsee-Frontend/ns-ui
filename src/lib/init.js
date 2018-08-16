
/**
 * init methods and ready handle
 * @param Vue
 * @param opts    Vue.grider
 */
const init = (Vue, opts) => {
  Vue.prototype.$SN = opts.stageName + opts.stageNamelink;//add dynamic custom stage name
};

export default init;
