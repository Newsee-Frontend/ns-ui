import ExtendsFn from './extends';

export default (Vue, options, isglobal = true) => {
  Object.keys(ExtendsFn).forEach(key => {
    if (isglobal) {
      Vue.prototype[key] = ExtendsFn[key];
    } else {
      if (options.ui_extends.indexOf(key) > -1) {
        console.log('包含： ', key);
        try {
          Vue.prototype[key] = ExtendsFn[key];
        } catch (e) {
          console.warn('Attributes or methods do not exist');
        }
      }
    }
  });
};
