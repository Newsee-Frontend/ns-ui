const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const formRouter = [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/input',
    name: '表单',
    children: [
      {
        path: 'input',
        component: () => import('../../pages/Form/input'),
        meta: { auth: true, key: 'input' },
        name: 'input',
      },
      {
        path: 'datepicker',
        component: () => import('../../pages/Form/datepicker'),
        meta: { auth: true, key: 'datepicker' },
        name: 'datepicker',
      },
      {
        path: 'timepicker',
        component: () => import('../../pages/Form/timepicker'),
        meta: { requireAuth: true, key: 'timepicker' },
        name: 'timepicker',
      },
    ],
  },
];
