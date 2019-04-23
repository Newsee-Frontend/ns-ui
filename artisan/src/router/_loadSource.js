const files = require.context('../../../src/packages/', false, /^\.\//);

console.log(22222222222222222222)
console.log(22222222222222222222)
console.log(files.keys())
console.log(22222222222222222222)
console.log(22222222222222222222)
let modules = [];

// files.keys().forEach(key => {
//   // var mk = key.replace(/(^\.\/|\.js$)/g, '')
//   const m = files(key);
//   const item = Object.keys(m).reduce((s, e) => {
//     if (e !== 'default') {
//       if (Array.isArray(m[e])) {
//         modules = modules.concat(m[e]);
//         return s
//       } else s[e] = m[e]
//     }
//     return s
//   }, m.default || {});
//   if (item && item.path) modules.push(item)
// });

export default modules
