const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const othersRouter = [
  {
    path: '/other',
    component: Layout,
    redirect: '/other/dialog',
    name: '其他',
    children: [
      {
        path: 'dialog',
        component: () => import('../../pages/Others/Dialog/Dialog'),
        meta: { auth: true, key: 'dialog' },
        name: 'dialog',
      },
    ],
  },
];
