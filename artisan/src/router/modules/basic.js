const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const baseRouter = [
  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/gridLayout',
    name: '基础',
    children: [
      {
        path: 'gridLayout',
        component: () => import('../../pages/Basic/gridLayout/gridLayout'),
        meta: { auth: true, key: 'col' },
        name: '栅格布局',
      },
      {
        path: 'button',
        component: () => import('../../pages/Basic/Button/Button'),
        meta: { auth: true, key: 'button' },
        name: '按钮',
      },
    ],
  },
];
