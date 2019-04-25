const files = require.context('./modules', true, /\.js/);

let modules = [];

files.keys().forEach(key => {
  // var mk = key.replace(/(^\.\/|\.js$)/g, '')
  const m = files(key);
  const item = Object.keys(m).reduce((s, e) => {
    if (e !== 'default') {
      if (Array.isArray(m[e])) {
        modules = modules.concat(m[e]);
        return s;
      } else s[e] = m[e];
    }
    return s;
  }, m.default || {});
  if (item && item.path) modules.push(item);
});
console.log(modules);

export default modules;
