export default {
  install: function(Vue, options) {
    Vue.prototype.reNumModel = model => {
      return model || 0;
    };
  },
};
