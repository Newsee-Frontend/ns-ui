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
        meta: { auth: true, key: 'timepicker' },
        name: 'timepicker',
      },
      {
        path: 'only-mmdd-picker',
        component: () => import('../../pages/Form/Only-MMDD-picker/Only-MMDD-picker'),
        meta: { auth: true, key: 'only-mmdd-picker' },
        name: 'only-mmdd-picker',
      },
      {
        path: 'time-interval',
        component: () => import('../../pages/Form/Time-interval/Time-interval'),
        meta: { auth: true, key: 'time-interval' },
        name: 'time-interval',
      },
      {
        path: 'select',
        component: () => import('../../pages/Form/Select/Select'),
        meta: { auth: true, key: 'select' },
        name: 'select',
      },
      {
        path: 'cascader',
        component: () => import('../../pages/Form/Cascader/Cascader'),
        meta: { auth: true, key: 'cascader' },
        name: 'cascader',
      },
      {
        path: 'avatar',
        component: () => import('../../pages/Form/Avatar/Avatar'),
        meta: { auth: true, key: 'avatar' },
        name: 'avatar',
      }
    ],
  },
];
