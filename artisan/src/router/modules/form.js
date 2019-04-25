const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const baseRouter = [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/input',
    name: '表单',
    children: [
      {
        path: 'input',
        component: () => import('../../pages/Form/input'),
        meta: {auth: true, key: 'input'},
        name: 'input 布局',
      },
      {
        path: 'datepicker',
        component: () => import('../../pages/Form/datepicker'),
        meta: {auth: true, key: 'datepicker'},
        name: 'datepicker 布局',
      },
      {
        path: 'timepicker',
        component: () => import('../../pages/Form/timepicker'),
        meta: {requireAuth: true, key: 'timepicker'},
        name: 'timepicker 布局',
      }
    ],
  },
];
