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
        name: '对话框',
      },
      {
        path: 'slip-dialog',
        component: () => import('../../pages/Others/Slip-dialog/Slip-dialog'),
        meta: { auth: true, key: 'slip-dialog' },
        name: '滑动对话框',
      },
    ],
  },
];
