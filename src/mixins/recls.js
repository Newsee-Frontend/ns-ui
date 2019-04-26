/**
 * recls user helper - button component
 * -----------------------------------------
 * recls() // 'button'
 * recls('text') // 'button__text'
 * recls({ disabled }) // 'button button--disabled'
 * recls('text', { disabled }) // 'button__text button__text--disabled'
 * recls(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

const ELEMENT = '__';
const MODS = '--';

const join = (name, el, symbol) => (el ? name + symbol + el : name);

const prefix = (name, mods) => {
  if (typeof mods === 'string') {
    return join(name, mods, MODS);
  }

  if (Array.isArray(mods)) {
    return mods.map(item => prefix(name, item));
  }

  const ret = {};
  Object.keys(mods).forEach(key => {
    ret[name + MODS + key] = mods[key];
  });
  return ret;
};

export default {
  methods: {
    recls(el, mods) {
      const { name } = this.$options;

      if (el && typeof el !== 'string') {
        mods = el;
        el = '';
      }
      el = join(name, el, ELEMENT);

      return mods ? [el, prefix(el, mods)] : el;
    },
  },
};
