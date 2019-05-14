import moduleRouter from './_routerFiles';

const otherRouter = [
  {
    path: '*',
    redirect: '/404',

    meta: {
      auth: false,
    },
  },
];

console.log('路由信息：');
console.log([...otherRouter, ...moduleRouter]);
export default [...otherRouter, ...moduleRouter];
