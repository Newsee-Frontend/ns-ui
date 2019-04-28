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
      {
        path: 'only-mmdd-picker',
        component: () => import('../../pages/Form/Only-MMDD-picker/Only-MMDD-picker'),
        meta: { requireAuth: true, key: 'only-mmdd-picker' },
        name: 'only-mmdd-picker',
      },
      {
        path: 'time-interval',
        component: () => import('../../pages/Form/Time-interval/Time-interval'),
        meta: { requireAuth: true, key: 'time-interval' },
        name: 'time-interval',
      },
    ],
  },
];
